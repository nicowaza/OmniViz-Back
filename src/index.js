const express = require ('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const bcrypt = require('bcrypt');
// import { verifiedAuth } from './helpers/verifyAuth';
const verifiedAuth = require('./helpers/verifyAuth');
const connectIO = require('./sockets/sockets.js')
// import connection from './helpers/db.connexion';

//authentication packages
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const passport = require('passport');
// const passportSocketIo = require("passport.socketio");

require('./helpers/passport').default(passport);


const app = express();

//static files
app.use(express.static('../public'));

// Handle production
if (process.env.NODE_ENV === 'production') {
  // Static folder
  app.use(express.static('../production/dist'));

  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile('../production/dist/index.html'));
}

const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`server is running on port ${port}`));

const io = connectIO(server)



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
    maxAge: 5400000
  }
  // cookie: { secure: true }
});
app.use(sessionMiddleware);

// map la session express avec une session socket
io.use(function (socket, next) {
  sessionMiddleware(socket.request, socket.request.res, next);
});

// passport session
app.use(passport.initialize());
app.use(passport.session());


//routes
const userRouter = require('./routes/users').default(io, passport, app);
const roomRouter = require('./routes/rooms').default(io, passport, app);
app.use('/users', userRouter);
app.use('/rooms', roomRouter)


app.get('/', verifiedAuth, (req, res, next) => {
  const user = req.user[0];
  const userdata = {
    username: user.username,
    email: user.email,
    role: user.role
  };
  // res.send({userdata: userdata, isAuthenticated: req.isAuthenticated()})
  // console.log('get req session user', req.session.passport)
  // console.log('username', req.username)
  console.log('isAuthenticated :', req.isAuthenticated())
})
