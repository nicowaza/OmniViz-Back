require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/helpers/db.connexion.js":
/*!*************************************!*\
  !*** ./src/helpers/db.connexion.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

'user strict';

const mysql = __webpack_require__(/*! mysql */ "mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "OmnivizTest"
});
connection.connect(function (err) {
  if (err) throw err;
  console.log("DB Connected!"); // création de la dB

  connection.query("CREATE DATABASE IF NOT EXISTS OmnivizTest CHARACTER SET 'utf8'", function (err, result) {
    if (err) throw err;
    console.log("database created");
  });
  connection.query("CREATE TABLE IF NOT EXISTS OmnivizTest.users (userID INT NOT NULL UNIQUE AUTO_INCREMENT, username VARCHAR(50) NOT NULL UNIQUE, email VARCHAR(250) NOT NULL UNIQUE, createdat TIMESTAMP, firstname VARCHAR(255), lastname VARCHAR(255), avatarUrl VARCHAR(500), university VARCHAR(255), password VARCHAR(40) NOT NULL, role VARCHAR(30))", function (err, result) {
    if (err) throw err;
    console.log("Table users created");
  });
  connection.query("CREATE TABLE IF NOT EXISTS OmnivizTest.rooms (roomID INT NOT NULL UNIQUE AUTO_INCREMENT, authorID INT NOT NULL, title VARCHAR(255) NOT NULL, description TEXT(600), createdat TIMESTAMP , startClass INT, endClass INT, PRIMARY KEY(roomID), FOREIGN KEY(authorID) REFERENCES users(userID))", function (err, result) {
    if (err) throw err;
    console.log("Table rooms created");
  });
  connection.query("CREATE TABLE IF NOT EXISTS OmnivizTest.tags (tagID INT NOT NULL UNIQUE AUTO_INCREMENT, userID INT NOT NULL, roomID INT NOT NULL, time INT NOT NULL, color VARCHAR(40), PRIMARY KEY(tagID), FOREIGN KEY(userID) REFERENCES users(userID), FOREIGN KEY(roomID) REFERENCES rooms(roomID))", function (err, result) {
    if (err) throw err;
    console.log("Table tags created");
  });
});
module.exports = connection;

/***/ }),

/***/ "./src/helpers/passport.js":
/*!*********************************!*\
  !*** ./src/helpers/passport.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers_db_connexion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/db.connexion */ "./src/helpers/db.connexion.js");
/* harmony import */ var _helpers_db_connexion__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_helpers_db_connexion__WEBPACK_IMPORTED_MODULE_0__);
const LocalStrategy = __webpack_require__(/*! passport-local */ "passport-local").Strategy;

const bcrypt = __webpack_require__(/*! bcrypt */ "bcrypt");

 // expose this function to our app using module.exports

/* harmony default export */ __webpack_exports__["default"] = (function (passport) {
  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session
  // used to serialize the user for the session
  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'
  // passport.use(
  //     'local-signup',
  //     new LocalStrategy({
  //         // by default, local strategy uses username and password, we will override with email
  //         usernameField : 'email',
  //         passwordField : 'password',
  //         passReqToCallback : true // allows us to pass back the entire request to the callback
  //     },
  //     function(req, email, password, done) {
  //         // find a user whose email is the same as the forms email
  //         // we are checking to see if the user trying to register already exists
  //         connection.query("SELECT * FROM users WHERE email = ?",[email], function(err, result, fields) {
  //             if (err)
  //                 return done(err);
  //             if (result.length > 0) {
  //                 console.log('email already in use')
  //                 return done(null, false, req.flash('signupMessage', 'Email is already in use.'));
  //             } else {
  //                 // if there is no user with that email
  //                 // create the user
  //                 var newUserMysql = {
  //                     username: email,
  //                     password: bcrypt.hashSync(password, null, null)  // use the generateHash function in our user model
  //                 };
  //                 var insertQuery = "INSERT INTO users ( email, password ) values (?,?)";
  //                 connection.query(insertQuery,[newUserMysql.email, newUserMysql.password],function(err, rows) {
  //                     newUserMysql.id = rows.insertId;
  //                     return done(null, newUserMysql);
  //                 });
  //             }
  //         });
  //     })
  // );
  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  passport.use(new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback

  }, function (req, email, password, done) {
    // callback with email and password from our form
    _helpers_db_connexion__WEBPACK_IMPORTED_MODULE_0___default.a.query("SELECT * FROM users WHERE email = ?", [email], function (err, results, fields, user) {
      if (err) return done(err);

      if (results.length === 0) {
        // console.log('no user found');
        // res.send('no user found')
        return done(null, false, {
          message: 'no user found'
        });
      } else {
        let hashedPassword = results[0].password; // if the user is found but the password is wrong

        bcrypt.compare(password, hashedPassword, function (err, response) {
          if (response) {
            // all is well, return successful user
            const user = results[0];
            console.log('user :', user); // res.send({status: 200, user: user})

            return done(null, user, {
              message: 'user identified'
            });
          } else {
            console.log('wrong password'); // res.send({status: 403, errors: 'wrong password'})

            return done(null, false, {
              message: 'incorrect password'
            }); // create the loginMessage and save it to session as flashdata
          } // if(err) {
          //     console.log(err);
          //     return done(null, false, {err: err});
          // } else if(response) {
          //     const user = results[0];
          //     console.log('identified user', user);
          //     return done(null, user);
          //     }

        });
      }
    });
  }));
  passport.serializeUser(function (user, done) {
    console.log('serialize usr_id: ', user.userID);
    done(null, user);
  }); // used to deserialize the user

  passport.deserializeUser(function (user, done) {
    const id = user.userID;
    console.log('deserialize usr id: ', id);
    _helpers_db_connexion__WEBPACK_IMPORTED_MODULE_0___default.a.query("SELECT * FROM users WHERE userID = ? ", [id], function (err, user) {
      done(null, user); // console.log('user : ', user)
    });
  });
});
;

/***/ }),

/***/ "./src/helpers/verifyAuth.js":
/*!***********************************!*\
  !*** ./src/helpers/verifyAuth.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

const verifiedAuth = function (req, res, next) {
  // if (req.isAuthenticated()) {
  //   // req.user is available for use here
  //   return next(); }
  //   else {res.send({status: 401, message:'unauthorized'})}
  if (req.isAuthenticated()) {
    console.log('verifiedAuth :', req.isAuthenticated()); // req.user is available for use here
    // res.send({status: 200, message: 'user identified', isAuthenticated: req.isAuthenticated()})

    return next();
  } else {
    console.log('not authenticated user :', req.isAuthenticated());
    res.send({
      status: 401,
      message: 'unauthorized',
      isAuthenticated: req.isAuthenticated()
    });
  }
};

module.exports = verifiedAuth;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers_db_connexion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/db.connexion */ "./src/helpers/db.connexion.js");
/* harmony import */ var _helpers_db_connexion__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_helpers_db_connexion__WEBPACK_IMPORTED_MODULE_0__);
const express = __webpack_require__(/*! express */ "express");

const cors = __webpack_require__(/*! cors */ "cors");

const morgan = __webpack_require__(/*! morgan */ "morgan");

const bodyParser = __webpack_require__(/*! body-parser */ "body-parser");

const cookieParser = __webpack_require__(/*! cookie-parser */ "cookie-parser");

const expressValidator = __webpack_require__(/*! express-validator */ "express-validator");

const bcrypt = __webpack_require__(/*! bcrypt */ "bcrypt"); // import { verifiedAuth } from './helpers/verifyAuth';


const verifiedAuth = __webpack_require__(/*! ./helpers/verifyAuth */ "./src/helpers/verifyAuth.js");

const connectIO = __webpack_require__(/*! ./sockets/sockets.js */ "./src/sockets/sockets.js");

 //authentication packages

const session = __webpack_require__(/*! express-session */ "express-session");

const MySQLStore = __webpack_require__(/*! express-mysql-session */ "express-mysql-session")(session);

const passport = __webpack_require__(/*! passport */ "passport"); // const passportSocketIo = require("passport.socketio");


__webpack_require__(/*! ./helpers/passport */ "./src/helpers/passport.js").default(passport);

const app = express();
const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`server is running on port ${port}`));
const io = connectIO(server); //static files

app.use(express.static('../public')); //logger

app.use(morgan('combined')); //CROSS ORIGINS

app.use(cors({
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(expressValidator()); //mySQLStore

const options = {
  host: 'localhost',
  // port: 5000,
  user: 'root',
  password: '',
  database: 'OmnivizTest'
};
const sessionStore = new MySQLStore(options); // express sessions

const sessionMiddleware = session({
  secret: 'thedudeabides',
  name: 'sid',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 5400000 // cookie: { secure: true }

  }
});
app.use(sessionMiddleware); // map la session express avec une session socket

io.use(function (socket, next) {
  sessionMiddleware(socket.request, socket.request.res, next);
}); // passport session

app.use(passport.initialize());
app.use(passport.session()); //routes

const userRouter = __webpack_require__(/*! ./routes/users */ "./src/routes/users.js").default(io, passport, app);

const roomRouter = __webpack_require__(/*! ./routes/rooms */ "./src/routes/rooms.js").default(io, passport, app);

app.use('/users', userRouter);
app.use('/rooms', roomRouter);
app.get('/', verifiedAuth, (req, res, next) => {
  const user = req.user[0];
  const userdata = {
    username: user.username,
    email: user.email,
    role: user.role
  }; // res.send({userdata: userdata, isAuthenticated: req.isAuthenticated()})
  // console.log('get req session user', req.session.passport)
  // console.log('username', req.username)

  console.log('isAuthenticated :', req.isAuthenticated());
});

/***/ }),

/***/ "./src/routes/rooms.js":
/*!*****************************!*\
  !*** ./src/routes/rooms.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const express = __webpack_require__(/*! express */ "express");

const connection = __webpack_require__(/*! ../helpers/db.connexion */ "./src/helpers/db.connexion.js");

const verifiedAuth = __webpack_require__(/*! ../helpers/verifyAuth */ "./src/helpers/verifyAuth.js");

const mysql = __webpack_require__(/*! mysql */ "mysql"); // import { verifiedAuth } from '../helpers/verifyAuth'


const roomRouter = express.Router();
/* harmony default export */ __webpack_exports__["default"] = (function (app, passport, io) {
  roomRouter.get('/', verifiedAuth, (req, res) => {
    // console.log(req.isAuthenticated())
    connection.query('SELECT * FROM rooms ', (err, results, fields) => {
      if (err) {
        console.log(err);
        res.send({
          err
        });
      } else {
        console.log(results);
        res.status(200).send({
          status: true,
          results: results
        });
      }
    });
    ;
  });
  roomRouter.post('/', verifiedAuth, (req, res) => {
    req.checkBody('title', 'Title field cannot be empty.').notEmpty();
    const errors = req.validationErrors();

    if (errors) {
      console.log(`errors: ${JSON.stringify(errors)}`);
      res.send({
        status: 400,
        errors: errors
      });
    } else {
      let body = req.body;
      const {
        title,
        description,
        authorID,
        createdat,
        startClass,
        endClass
      } = body;
      let query = `INSERT INTO rooms (authorID, title, description, createdat, startClass, endClass) VALUES ('${authorID}', '${title}', '${description}', '${createdat}', '${startClass}', '${endClass}')`;
      console.log(query); // const [errors, results] = createRoom(body)

      connection.query(query, (errors, results, fields) => {
        if (errors) {
          console.log(errors);
          res.send({
            status: 400,
            errors: errors
          });
        } else {
          console.log(results);
          res.send({
            status: 200,
            "success": "new class created",
            content: results
          });
        }

        ;
      });
    }
  });
  return roomRouter;
});

/***/ }),

/***/ "./src/routes/users.js":
/*!*****************************!*\
  !*** ./src/routes/users.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers_db_connexion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/db.connexion */ "./src/helpers/db.connexion.js");
/* harmony import */ var _helpers_db_connexion__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_helpers_db_connexion__WEBPACK_IMPORTED_MODULE_0__);
const express = __webpack_require__(/*! express */ "express");

 // import { verifiedAuth } from '../helpers/verifyAuth';

const verifiedAuth = __webpack_require__(/*! ../helpers/verifyAuth */ "./src/helpers/verifyAuth.js");

const mysql = __webpack_require__(/*! mysql */ "mysql");

const expressValidator = __webpack_require__(/*! express-validator */ "express-validator");

const bcrypt = __webpack_require__(/*! bcrypt */ "bcrypt");

const socket = __webpack_require__(/*! socket.io */ "socket.io");

const passport = __webpack_require__(/*! passport */ "passport");

__webpack_require__(/*! ../helpers/passport */ "./src/helpers/passport.js").default(passport); // import { io } from '../index';


const userRouter = express.Router();
/* harmony default export */ __webpack_exports__["default"] = (function (app, passport, io) {
  // userRouter.get('/', verifiedAuth, (req, res, next) => {
  //   //les data du user authentifié peuvent être retrouvées dans l'objet req.user
  //   const user = req.user[0];
  //   const userdata = {
  //     username: user.username,
  //     email: user.email,
  //     role: user.role
  //   };
  //   //renvoie le user + isAuthenticated à true dans le front
  //   res.send({status: 200, userdata: userdata, isAuthenticated: req.isAuthenticated()})
  // });
  userRouter.post('/register', (req, res) => {
    req.checkBody('username', 'Username field cannot be empty.').notEmpty();
    req.checkBody('username', 'Username must be between 4-15 characters long.').len(4, 15);
    req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
    req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
    req.checkBody('email', 'Email field cannot be empty.').notEmpty();
    req.checkBody('password', 'Password field cannot be empty.').notEmpty();
    req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100);
    req.checkBody("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
    req.checkBody('confirmedPassword', 'Password must be between 8-100 characters long.').len(8, 100);
    req.checkBody('confirmedPassword', 'Passwords do not match, please try again.').equals(req.body.password);
    const errors = req.validationErrors();

    if (errors) {
      console.log(`errors: ${JSON.stringify(errors)}`);
      res.send({
        status: 400,
        errors: errors
      });
    } else {
      let body = req.body;
      let email = body.email;
      let username = body.username;
      let password = body.password;
      let confirmedPassword = body.confirmedPassword;
      let firstname = body.firstname;
      let lastname = body.lastname;
      let avatarUrl = body.avatarUrl;
      let university = body.university;
      let role = body.role;
      const saltRounds = 10;
      bcrypt.hash(password, saltRounds, function (err, hash) {
        let query = `INSERT INTO users (email, username, password, firstname, lastname, avatarUrl, university, role) VALUES ('${email}', '${username}', '${hash}', '${firstname}', '${lastname}', '${avatarUrl}', '${university}', '${role}')`;
        _helpers_db_connexion__WEBPACK_IMPORTED_MODULE_0___default.a.query(query, (err, results, fields) => {
          if (errors) {
            console.log(errors);
            res.send({
              status: 400,
              errors: errors
            });
          } else {
            console.log(results);
            res.send({
              status: 200,
              "success": "new user registered sucessfully",
              content: results
            });
          }

          ;
        });
      });
    }

    ;
  });
  userRouter.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, message) => {
      if (err) {
        res.send({
          status: 403,
          errors: message
        });
      } else {
        req.login(user, err => {
          if (err) {
            console.log(err);
          }

          console.log('authentifié', req.isAuthenticated());
          res.send({
            user: user,
            isAuthenticated: req.isAuthenticated(),
            message: message.message
          });
        });
      }
    })(req, res, next);
  });
  userRouter.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.clearCookie('sid'); //envoie isAuthenticated à false dans le front

    res.send({
      status: 200,
      isAuthenticated: req.isAuthenticated()
    });
  });
  return userRouter;
});

/***/ }),

/***/ "./src/sockets/sockets.js":
/*!********************************!*\
  !*** ./src/sockets/sockets.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const connection = __webpack_require__(/*! ../helpers/db.connexion */ "./src/helpers/db.connexion.js");

const socket = __webpack_require__(/*! socket.io */ "socket.io");

function connectIO(server) {
  // Socket Setup
  const io = socket(server); // sockets

  io.on('connection', function (socket, message) {
    //  on peut récupérer le user serialisé par passport et présent dans l'objet socket.request.session. Les infos de ce user sont disponible pour utilisation dans le reste de l'app
    console.log('A client has connected');
    console.log('the socket session object', socket.request.session);
    console.log('the actual serialized user from passport', socket.request.session.passport);
    const {
      username
    } = socket.request.session.passport.user;
    console.log(`${username} has opened a socket`);
    socket.on('createRoom', data => {
      console.log(data);
      socket.emit('roomCreation', function (data) {
        console.log(data);
      });
    });
    socket.on('join', data => {
      console.log('room data :', data);

      if (socket.request.session.passport.user) {
        const socketUser = socket.request.session.passport.user;
        console.log('scoket user', socketUser);
        const username = socketUser.username;
        const user_id = socketUser.userID;
        const user_role = socketUser.role;
        const room = data.room;
        const roomID = data.roomID;
        console.log('socket:', socketUser);
        socket.join(room, function (data) {
          console.log(`${username} has joined ${room}`);
          io.in(room).emit('joiningEvent', {
            message: `${username} has joined ${room}`,
            username,
            user_id,
            user_role,
            room
          });
        });
        socket.on('tag', data => {
          console.log('tag datas', data);
          const color = data.tag;
          const time = data.timestamp;
          console.log(username);
          socket.broadcast.to(room).emit('event', {
            color,
            username,
            user_id,
            room,
            time
          });
          let query = `INSERT INTO tags (userID, roomID, time, color) VALUES ('${user_id}', '${roomID}', '${time}', '${color}')`;
          console.log('tag query :', query);
          connection.query(query, (err, results, fields) => {
            if (err) {
              console.log(err);
            } else {
              console.log(results);
            }
          });
        });
        socket.on('disconnect', data => {
          console.log('disconnection :', data); // const username = socketUser[0].username;
          // const user_id = socketUser[0].userID
          // const room = data.room;
          // console.log(room)
          // socket.leave(room, console.log(`${username} has left ${room}`));
          // socket.broadcast.to(room).emit('leavingEvent',({ message: `${username} has left the room ${room}`}));
        });
        socket.on('leave', function (data) {
          console.log(`${username} has left the ${room}`);
          console.log(data);
          socket.leave(room, function (data) {
            socket.broadcast.to(room).emit('leavingEvent', {
              message: `${username} has left ${room}`,
              username,
              user_id,
              user_role
            });
          });
        });
        socket.on('closeRoom', function (data) {
          console.log('classe fermée :', data);
          socket.broadcast.to(room).emit('closeRoom');
        });
      } else {
        //Ne marche pas...trouver la solution
        console.log("c'est la merde");
      }
    });
  });
  return io;
}

module.exports = connectIO;

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/tech/workspace/cproh/OmniViz-Back/src/index.js */"./src/index.js");


/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bcrypt");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "express-mysql-session":
/*!****************************************!*\
  !*** external "express-mysql-session" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express-mysql-session");

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),

/***/ "express-validator":
/*!************************************!*\
  !*** external "express-validator" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express-validator");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),

/***/ "mysql":
/*!************************!*\
  !*** external "mysql" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mysql");

/***/ }),

/***/ "passport":
/*!***************************!*\
  !*** external "passport" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),

/***/ "passport-local":
/*!*********************************!*\
  !*** external "passport-local" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ })

/******/ });
//# sourceMappingURL=main.map