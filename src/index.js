const express = require ('express');
const socket = require ('socket.io');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
//authentication packages
const session = require('express-session');

const app = express();

const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`server is running on port ${port}`));

import { realtimeRouter } from './routes/index';
import { userRouter } from './routes/users';
import { loginRouter } from './routes/login';


//static files
app.use(express.static('public'));


//logger
app.use(morgan('combined'));

// app.use(cors({
//   origin:'*',
//   methods:['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

// express sessions
app.use(session({
  secret: 'thedudeabides',
  name: 'sid',
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 2
  }
  // cookie: { secure: true }
}))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Socket Setup
const io = socket(server);

app.use('/realtime', realtimeRouter);
app.use('/users', userRouter);
app.use('/login', loginRouter);

app.get('/', (req, res, next) => {
  req.session.name = 'nico';

  console.log(session.req.name)
})



// io.on('connection', function(socket){
//   socket.on('connect', function() {
//     io.emit('user connected');
//   });
//   socket.on('disconnect', function () {
//     io.emit('user disconnected');
//   });
//   console.log('socket connected', socket.id)
//   socket.emit('messageChannel', 'hello')
//   socket.on('pingServer', (data) => {
//     console.log(data)
//   })
//   socket.on('join', (data) => {
//     console.log('username: ', data.username);
//     console.log('room: ', data.room)
//     console.log('id: ', socket.id)
//     const user = data.username;
//     const room = data.room;
//     const userId = socket.id;
//     socket.emit('roomCreation', {
//     user: user,
//     room: room,
//     userId: userId
//     });
//     socket.join(room, console.log(`${user} has joined ${room}`));
//     socket.emit('joiningEvent', `${user} has joined the room ${room}`);
//     socket.broadcast.to(room).emit('joiningEvent', `${user} has joined the room ${room}`);
//     })
//   });
