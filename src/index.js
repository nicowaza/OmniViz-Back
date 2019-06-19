const express = require ('express');
const socket = require ('socket.io');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const bcrypt = require('bcrypt');
import { verifiedAuth } from './helpers/verifyAuth';
import connection from './helpers/db.connexion';

//authentication packages
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const passport = require('passport');
const passportSocketIo = require("passport.socketio");

require('./helpers/passport').default(passport);


const app = express();

const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`server is running on port ${port}`));


// Socket Setup
const io = socket(server);

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
app.use(cookieParser());
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

io.use(passportSocketIo.authorize({
  cookieParser: cookieParser,
  key: 'sid',
  secret: 'thedudeabides',
  store: sessionStore,
  success: onAuthorizeSuccess,
  fail: onAuthorizeFail,
}));

function onAuthorizeSuccess(data, accept){
  console.log('successful connection to socket.io');
  // console.log(data)
  accept();
}

function onAuthorizeFail(data, message, error, accept){

  // error indicates whether the fail is due to an error or just a unauthorized client
  if(error)  {
    // console.log(error)
    throw new Error(message);
  }
  // send the (not-fatal) error-message to the client and deny the connection
  console.log(error)
  console.log("unauthorized: you're not logged in");
  return accept(new Error(message));
}


//passport session
app.use(passport.initialize());
app.use(passport.session());



// io.use((socket,next) => {
//   sessionMiddleware(socket.request, socket.request.res || {}, next);
// });

// app.use('/realtime', realtimeRouter);
const userRouter = require('./routes/users').default(io, passport, app);
const roomRouter = require('./routes/rooms').default(io, passport, app);
app.use('/users', userRouter);
app.use('/rooms', roomRouter)


app.get('/', verifiedAuth, (req, res) => {
  res.send('hello world')
  console.log('get req session user', req.session.passport)
  console.log('username', req.username)
  console.log('authenticated :', req.isAuthenticated())
  // })(req,res,next);
})

io.of('/socket').on('connection', function(socket, message) {
  socket.on('join', (data) => {
    if (socket.request.user && socket.request.user.logged_in) {

      const socketUser = socket.request.user
      // console.log('username: ', socketUser.username);
      // console.log('room: ', data.room)
      // console.log('id: ', socket.id)
      const username = socketUser[0].username;
      const user_id = socketUser[0].userID
      const room = data.room;
      console.log('socket:', socketUser)
      console.log('socket user :', socket.request.user)
      console.log('username :', username)
      // const socketId = socket.id
      socket.emit('roomCreation', {
      username: username,
      room: room,
      });
      socket.join(room, console.log(`${username} has joined ${room}`));
      // socket.emit('joiningEvent', {
      //   message: `${username} has joined the room ${room}`
      // });

      socket.broadcast.to(room).emit('joiningEvent', ({ message: `${username} has joined the room ${room}`}));// console.log(socket.request.user);

      socket.on('tag', (data) => {
        // const datagreen = data;
        // console.log(datagreen);
        socket.broadcast.to(room).emit('event', {
          color: data.tag,
          username: username,
          user_id: user_id,
          room: room,
          time: data.timestamp,
          },
        )
      })
      //



      // socket.on('leave', function () {
      //   console.log(`${username} has disconnected`)
      //       io.emit('user disconnected');
          // });
      } else {
        //Ne marche pas...trouver la solution
        console.log('unauthorized')
    }
  });
  socket.on('unsubscribe', (data) => {
    const username = socketUser[0].username;
    const user_id = socketUser[0].userID
    const room = data.room;
    socket.leave(room, console.log(`${username} has left ${room}`));
    socket.to(room).emit('leavingEvent',({ message: `${username} has left the room ${room}`}));
  })
});
// io.on('connection', function(socket, message) {


//   socket.on('join', (data) => {
//     if (socket.request.user && socket.request.user.logged_in) {

//       const socketUser = socket.request.user
//       // console.log('username: ', socketUser.username);
//       // console.log('room: ', data.room)
//       // console.log('id: ', socket.id)
//       const username = socketUser[0].username;
//       const room = data.room;
//       console.log('socket:', socketUser)
//       console.log('socket user :', socket.request.user)
//       console.log('username :', username)
//       // const socketId = socket.id
//       socket.emit('roomCreation', {
//       username: username,
//       room: room,
//       });
//       socket.join(room, console.log(`${username} has joined ${room}`));
//       socket.emit('joiningEvent', `${username} has joined the room ${room}`);
//       socket.broadcast.to(room).emit('joiningEvent', `${username} has joined the room ${room}`);// console.log(socket.request.user);
//     } else if(!socket.request.user.logged_in){

//     }
// });
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
    // })

