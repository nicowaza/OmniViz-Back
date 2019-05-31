const express = require ('express');
const socket = require ('socket.io');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const bcrypt = require('bcrypt');
import { verifiedAuth } from './helpers/verifyAuth';
//authentication packages
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const passport = require('passport');
require('./helpers/passport').default(passport)

const app = express();

const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`server is running on port ${port}`));

import { realtimeRouter } from './routes/index';
import { userRouter } from './routes/users';

//static files
app.use(express.static('../public'));

//logger
app.use(morgan('combined'));

//CROSS ORIGINS
app.use(cors({
  origin:'http://localhost:8080',
  methods:['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

//mySQLStore
const options = {
  host: 'localhost',
  // port: 5000,
  user: 'root',
  password: '',
  database: 'OmnivizTest'
};
const sessionStore = new MySQLStore(options);

// express sessions
app.use(session({
  secret: 'thedudeabides',
  name: 'sid',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 2
  }
  // cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());

// Socket Setup
const io = socket(server);

app.use('/realtime', realtimeRouter);
app.use('/users', userRouter);


app.get('/', verifiedAuth, (req, res) => {
  res.send('hello world')
  console.log('get req session user', req.session.passport)
  console.log('username', req.username)
  console.log('authenticated :', req.isAuthenticated())
  // })(req,res,next);
})

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
// })
// // io.on('connection', function(socket){
// //   socket.on('connect', function() {
// //     io.emit('user connected');
// //   });
// //   socket.on('disconnect', function () {
// //     io.emit('user disconnected');
// //   });
// //   console.log('socket connected', socket.id)
// //   socket.emit('messageChannel', 'hello')
// //   socket.on('pingServer', (data) => {
// //     console.log(data)
// //   })
// //   socket.on('join', (data) => {
// //     console.log('username: ', data.username);
// //     console.log('room: ', data.room)
// //     console.log('id: ', socket.id)
// //     const user = data.username;
// //     const room = data.room;
// //     const userId = socket.id;
// //     socket.emit('roomCreation', {
// //     user: user,
// //     room: room,
// //     userId: userId
// //     });
// //     socket.join(room, console.log(`${user} has joined ${room}`));
// //     socket.emit('joiningEvent', `${user} has joined the room ${room}`);
// //     socket.broadcast.to(room).emit('joiningEvent', `${user} has joined the room ${room}`);
// //     })

