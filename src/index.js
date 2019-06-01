const express = require ('express');
const socket = require ('socket.io');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const bcrypt = require('bcrypt');
import { verifiedAuth } from './helpers/verifyAuth';
import connection from './helpers/db.connexion';

//authentication packages
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const passport = require('passport');
require('./helpers/passport').default(passport);


const app = express();

const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`server is running on port ${port}`));

// import { realtimeRouter } from './routes/index';
// import { userRouter } from './routes/users';

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
const sessionMiddleware = session({
  secret: 'thedudeabides',
  name: 'sid',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 2
  }
  // cookie: { secure: true }
});
app.use(sessionMiddleware);

//passport session
app.use(passport.initialize());
app.use(passport.session());

// Socket Setup
const io = socket(server);

io.use((socket,next) => {
  sessionMiddleware(socket.request, socket.request.res || {}, next);
});

// app.use('/realtime', realtimeRouter);
const userRouter = require('./routes/users').default(io, passport, app);
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
// const userSockets = {}
// io.on('connection', function(socket) {
//   console.log('A client has connected');
//   console.log('the socket session object', socket.request.session);
//   console.log('the actual serialized user from passport', socket.request.session.passport.user);
//   //store '_id' of connected user in order to access it easily
//   const ID = socket.request.session.passport.user;
//   //store actual socket of connected user in order to access it easily
//   //from other modules e.g. from router
//   userSockets[ID] = socket;
//   connection.query("SELECT * FROM users WHERE userID = ? ",[ID], function(err, user){
//     if(err){
//       console.log(err)
//       throw(err)
//     } else {
//       // console.log(user)
//       const firstname = user[0].firstname;
//       const email = user[0].email;
//       const username = user[0].username;

//       console.log([firstname, username, email])
//       return socket.emit('welcome', `hello ${firstname} you are connected as ${username}`)
//     }
//     })
//   });
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

