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

//passportSocket.io lib : socket sessions
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

// passport session
app.use(passport.initialize());
app.use(passport.session());

//routes
const userRouter = require('./routes/users').default(io, passport, app);
const roomRouter = require('./routes/rooms').default(io, passport, app);
app.use('/users', userRouter);
app.use('/rooms', roomRouter)


app.get('/', verifiedAuth, (req, res) => {
  res.send('hello world')
  console.log('get req session user', req.session.passport)
  console.log('username', req.username)
  console.log('authenticated :', req.isAuthenticated())
})

// sockets
io.on('connection', function(socket, message) {
  const socketUser = socket.request.user
  const username = socketUser[0].username;
  console.log(`${username} has opened a socket`)

  socket.on('createRoom', (data) => {
    console.log(data);

    socket.emit('roomCreation', function(data) {
      console.log(data)
    });
  })

  socket.on('join', (data) => {
    if (socket.request.user && socket.request.user.logged_in) {

      const socketUser = socket.request.user
      const username = socketUser[0].username;
      const user_id = socketUser[0].userID;
      const user_role = socketUser[0].role;
      const room = data.room;

      console.log('socket:', socketUser)

      socket.join(room, function(data) {
        console.log(`${username} has joined ${room}`);
        io.in(room).emit('joiningEvent', ({
          message: `${username} has joined ${room}`,
          username,
          user_id,
          user_role,
          room,
        }));
      });

      socket.on('tag', (data) => {
        console.log(data)
        socket.broadcast.to(room).emit('event', {
          color: data.tag,
          username: username,
          user_id: user_id,
          room: room,
          time: data.timestamp,
          },
        )
      })
      socket.on('disconnect', (data) => {
        console.log('disconnection :', data)
        // const username = socketUser[0].username;
        // const user_id = socketUser[0].userID
        // const room = data.room;
        // console.log(room)
        // socket.leave(room, console.log(`${username} has left ${room}`));
        // socket.broadcast.to(room).emit('leavingEvent',({ message: `${username} has left the room ${room}`}));
      })
      socket.on('leave', function (data) {
        console.log(`${username} has left the ${room}`)
        console.log(data)

        socket.leave(room, function(data) {
          socket.broadcast.to(room).emit('leavingEvent', ({
            message: `${username} has left ${room}`,
            username,
            user_id,
            user_role,
          }));
        });
      });

      socket.on('closeRoom', function(data) {
        console.log('classe fermée :', data)
        socket.broadcast.to(room).emit('closeRoom')
      })
    } else {
      //Ne marche pas...trouver la solution
      console.log('unauthorized')
    }
  });
});


