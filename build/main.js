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
    _helpers_db_connexion__WEBPACK_IMPORTED_MODULE_0___default.a.query("SELECT * FROM users WHERE email = ?", [email], function (err, results, fields) {
      if (err) return done(err);

      if (results.length === 0) {
        console.log('no user found');
        return done(null, false);
      } else {
        let hashedPassword = results[0].password; // if the user is found but the password is wrong

        bcrypt.compare(password, hashedPassword, function (err, response) {
          // console.log('hashedpassword :', hashedPassword)
          // console.log('password :', password)
          if (response == true) {
            // all is well, return successful user
            console.log(results);
            const user = results[0];
            console.log('user :', user);
            return done(null, user);
          } else {
            console.log('wrong password');
            return done(null, false); // create the loginMessage and save it to session as flashdata
          }
        });
      }
    });
  }));
  passport.serializeUser(function (user, done) {
    console.log('serialize usr_id: ', user.userID);
    done(null, user.userID);
  }); // used to deserialize the user

  passport.deserializeUser(function (id, done) {
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
/*! exports provided: verifiedAuth */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "verifiedAuth", function() { return verifiedAuth; });
const verifiedAuth = function (req, res, next) {
  if (req.isAuthenticated()) {
    // req.user is available for use here
    return next();
  } else {
    res.send({
      status: 401,
      message: 'unauthorized'
    });
  }
};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers_verifyAuth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/verifyAuth */ "./src/helpers/verifyAuth.js");
/* harmony import */ var _helpers_db_connexion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/db.connexion */ "./src/helpers/db.connexion.js");
/* harmony import */ var _helpers_db_connexion__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_helpers_db_connexion__WEBPACK_IMPORTED_MODULE_1__);
const express = __webpack_require__(/*! express */ "express");

const socket = __webpack_require__(/*! socket.io */ "socket.io");

const cors = __webpack_require__(/*! cors */ "cors");

const morgan = __webpack_require__(/*! morgan */ "morgan");

const bodyParser = __webpack_require__(/*! body-parser */ "body-parser");

const expressValidator = __webpack_require__(/*! express-validator */ "express-validator");

const bcrypt = __webpack_require__(/*! bcrypt */ "bcrypt");


 //authentication packages

const session = __webpack_require__(/*! express-session */ "express-session");

const MySQLStore = __webpack_require__(/*! express-mysql-session */ "express-mysql-session")(session);

const passport = __webpack_require__(/*! passport */ "passport");

__webpack_require__(/*! ./helpers/passport */ "./src/helpers/passport.js").default(passport);

const app = express();
const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`server is running on port ${port}`)); // import { realtimeRouter } from './routes/index';
// import { userRouter } from './routes/users';
//static files

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
    maxAge: 1000 * 60 * 60 * 2 // cookie: { secure: true }

  }
});
app.use(sessionMiddleware); //passport session

app.use(passport.initialize());
app.use(passport.session()); // Socket Setup

const io = socket(server);
io.use((socket, next) => {
  sessionMiddleware(socket.request, socket.request.res || {}, next);
}); // app.use('/realtime', realtimeRouter);

const userRouter = __webpack_require__(/*! ./routes/users */ "./src/routes/users.js").default(io, passport, app);

app.use('/users', userRouter);
app.get('/', _helpers_verifyAuth__WEBPACK_IMPORTED_MODULE_0__["verifiedAuth"], (req, res) => {
  res.send('hello world');
  console.log('get req session user', req.session.passport);
  console.log('username', req.username);
  console.log('authenticated :', req.isAuthenticated()); // })(req,res,next);
}); // // error handler
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

/***/ }),

/***/ "./src/routes/users.js":
/*!*****************************!*\
  !*** ./src/routes/users.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helpers_db_connexion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/db.connexion */ "./src/helpers/db.connexion.js");
/* harmony import */ var _helpers_db_connexion__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_helpers_db_connexion__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _helpers_verifyAuth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/verifyAuth */ "./src/helpers/verifyAuth.js");




const mysql = __webpack_require__(/*! mysql */ "mysql");

const expressValidator = __webpack_require__(/*! express-validator */ "express-validator");

const bcrypt = __webpack_require__(/*! bcrypt */ "bcrypt");

const socket = __webpack_require__(/*! socket.io */ "socket.io");

const passport = __webpack_require__(/*! passport */ "passport");

__webpack_require__(/*! ../helpers/passport */ "./src/helpers/passport.js").default(passport); // import { io } from '../index';


const userRouter = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();
/* harmony default export */ __webpack_exports__["default"] = (function (app, passport, io) {
  userRouter.get('/', _helpers_verifyAuth__WEBPACK_IMPORTED_MODULE_2__["verifiedAuth"], (req, res, next) => {
    //les data du user authentifié peuvent être retrouvées dans l'objet req.user
    const user = req.user[0];
    const userdata = {
      username: user.username,
      email: user.email
    };
    console.log('user data', userdata);
    console.log('the request session object', req.session);
    console.log('the serialized user from passport', req.user);
    console.log('the socket session object', socket.request.session);
    console.log('the actual serialized user from passport', socket.request.session.passport.user);
    res.send({
      status: 200,
      userdata: userdata
    }); // passport.authenticate('local', (errors, user) =>{
    //   if(errors) {
    //     throw errors
    //   } else {
    //     // console.log('username', req.user.username)
    //     res.send(JSON.stringify(user.username))
    //   }
    // })(req,res,next);
    // connection.query('SELECT * FROM users ', (err, results, fields) => {
    //   if (err) {
    //     console.log(err);
    //     res.status(400).send({ status: false, message: 'User not created'})
    //     // res.send({
    //     //   err
    //     // })
    //   }else {
    //     console.log(results)
    //     res.status(200).send({status: true, content: results});
    //   }
    // });
  });
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
        _helpers_db_connexion__WEBPACK_IMPORTED_MODULE_1___default.a.query(query, (err, results, fields) => {
          if (errors) {
            console.log(errors);
            res.status(400).send({
              status: false,
              message: 'User not created'
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
    passport.authenticate('local', (errors, user) => {
      if (errors) {
        res.send({
          status: 500,
          message: 'something went wrong'
        });
      } else {
        req.login(user, err => {
          if (err) throw err; // console.log('req login :', user)
          // console.log('login req.session', req.session)
          // console.log('req.user :' ,req.user)

          console.log('authenticated :', req.isAuthenticated());
          res.send(JSON.stringify(user));
        });
        console.log(io);
        const userSockets = {};
        io.on('connection', function (socket) {
          console.log('A client has connected');
          console.log('the socket session object', socket.request.session);
          console.log('the actual serialized user from passport', socket.request.session.passport.user); //store '_id' of connected user in order to access it easily

          const ID = socket.request.session.passport.user; //store actual socket of connected user in order to access it easily
          //from other modules e.g. from router

          userSockets[ID] = socket;
          _helpers_db_connexion__WEBPACK_IMPORTED_MODULE_1___default.a.query("SELECT * FROM users WHERE userID = ? ", [ID], function (err, user) {
            if (err) {
              console.log(err);
              throw err;
            } else {
              // console.log(user)
              const firstname = user[0].firstname;
              const email = user[0].email;
              const username = user[0].username;
              console.log([firstname, username, email]);
              return socket.emit('welcome', `hello ${firstname} you are connected as ${username}`);
            }
          });
        });
      }
    })(req, res, next);
  });
  userRouter.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    console.log('authenticated :', req.isAuthenticated());
    res.send({
      status: 200,
      message: 'user has logged out'
    });
  });
  return userRouter;
});

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