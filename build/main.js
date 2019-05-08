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
  connection.query("CREATE TABLE IF NOT EXISTS OmnivizTest.users (userID INT NOT NULL UNIQUE AUTO_INCREMENT, username VARCHAR(50) NOT NULL UNIQUE, createdat TIMESTAMP, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, avatarUrl VARCHAR(500), university VARCHAR(255), password VARCHAR(40) NOT NULL, role VARCHAR(30))", function (err, result) {
    if (err) throw err;
    console.log("Table users created");
  });
});
module.exports = connection;

/***/ }),

/***/ "./src/helpers/jwt.js":
/*!****************************!*\
  !*** ./src/helpers/jwt.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var dotenv_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dotenv/config */ "dotenv/config");
/* harmony import */ var dotenv_config__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dotenv_config__WEBPACK_IMPORTED_MODULE_1__);


const secretKey = process.env.key;
/* harmony default export */ __webpack_exports__["default"] = ({
  //Sign Token
  issue(payload, expiresIn) {
    return jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default.a.sign(payload, secretKey, {
      expiresIn: 10800
    });
  }

});

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _routes_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./routes/index */ "./src/routes/index.js");
/* harmony import */ var _routes_users__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./routes/users */ "./src/routes/users.js");
/* harmony import */ var _routes_login__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./routes/login */ "./src/routes/login.js");
const express = __webpack_require__(/*! express */ "express");

const socket = __webpack_require__(/*! socket.io */ "socket.io");

const cors = __webpack_require__(/*! cors */ "cors");

const morgan = __webpack_require__(/*! morgan */ "morgan");

const app = express();
const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`server is running on port ${port}`));


 //static files

app.use(express.static('public')); // Socket Setup

const io = socket(server);
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use('/realtime', _routes_index__WEBPACK_IMPORTED_MODULE_0__["realtimeRouter"]);
app.use('/users', _routes_users__WEBPACK_IMPORTED_MODULE_1__["userRouter"]);
app.use('/login', _routes_login__WEBPACK_IMPORTED_MODULE_2__["loginRouter"]);
io.on('connection', function (socket) {
  console.log('socket connected', socket.id);
  socket.on('join', data => {
    console.log('username: ', data.username);
    console.log('room: ', data.room);
    console.log('id: ', socket.id);
    const user = data.username;
    const room = data.room;
    socket.join(room, console.log(`${user} has joined ${room}`));
    socket.emit('joiningEvent', `${user} has joined the room ${room}`);
    socket.broadcast.to(room).emit('joiningEvent', `${user} has joined the room ${room}`);
  });
});

/***/ }),

/***/ "./src/routes/index.js":
/*!*****************************!*\
  !*** ./src/routes/index.js ***!
  \*****************************/
/*! exports provided: realtimeRouter, userRouter, loginRouter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _realtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./realtime */ "./src/routes/realtime.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "realtimeRouter", function() { return _realtime__WEBPACK_IMPORTED_MODULE_0__["realtimeRouter"]; });

/* harmony import */ var _users__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./users */ "./src/routes/users.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "userRouter", function() { return _users__WEBPACK_IMPORTED_MODULE_1__["userRouter"]; });

/* harmony import */ var _login__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login */ "./src/routes/login.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "loginRouter", function() { return _login__WEBPACK_IMPORTED_MODULE_2__["loginRouter"]; });





/***/ }),

/***/ "./src/routes/login.js":
/*!*****************************!*\
  !*** ./src/routes/login.js ***!
  \*****************************/
/*! exports provided: loginRouter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loginRouter", function() { return loginRouter; });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helpers_jwt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/jwt */ "./src/helpers/jwt.js");
/* harmony import */ var dotenv_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dotenv/config */ "dotenv/config");
/* harmony import */ var dotenv_config__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dotenv_config__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _helpers_db_connexion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/db.connexion */ "./src/helpers/db.connexion.js");
/* harmony import */ var _helpers_db_connexion__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_helpers_db_connexion__WEBPACK_IMPORTED_MODULE_3__);




const secret = process.env.key;
const loginRouter = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();
loginRouter.post('/', (req, res) => {
  const {
    password,
    username
  } = req.body; // const user = _users.find((user) => user.username === req.body.username);

  let query = `SELECT * FROM users WHERE username = '${username}'`;
  _helpers_db_connexion__WEBPACK_IMPORTED_MODULE_3___default.a.query(query, (err, results) => {
    if (!results) res.status(404).send('User not found');
    if (results[0].password !== password) return res.status(404).send('Password incorrect');
    const token = _helpers_jwt__WEBPACK_IMPORTED_MODULE_1__["default"].issue({
      username
    }, secret, {
      expiresIn: 18000
    });
    console.log(token);
    res.json({
      'token': token
    });
  });
});

/***/ }),

/***/ "./src/routes/realtime.js":
/*!********************************!*\
  !*** ./src/routes/realtime.js ***!
  \********************************/
/*! exports provided: realtimeRouter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "realtimeRouter", function() { return realtimeRouter; });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);

const realtimeRouter = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();
realtimeRouter.post('/createCourse', (req, res) => {
  const {
    username,
    courseName,
    description
  } = req.body;
});

/***/ }),

/***/ "./src/routes/users.js":
/*!*****************************!*\
  !*** ./src/routes/users.js ***!
  \*****************************/
/*! exports provided: userRouter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "userRouter", function() { return userRouter; });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helpers_db_connexion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/db.connexion */ "./src/helpers/db.connexion.js");
/* harmony import */ var _helpers_db_connexion__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_helpers_db_connexion__WEBPACK_IMPORTED_MODULE_1__);



const mysql = __webpack_require__(/*! mysql */ "mysql");

const userRouter = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();
userRouter.get('/', (req, res) => {
  _helpers_db_connexion__WEBPACK_IMPORTED_MODULE_1___default.a.query('SELECT * FROM users ', (err, results, fields) => {
    if (err) {
      console.log(err);
      res.status(400).send({
        status: false,
        message: 'User not created'
      }); // res.send({
      //   err
      // })
    } else {
      console.log(results);
      res.status(200).send({
        status: true,
        content: results
      });
    }
  });
});
userRouter.post('/', (req, res) => {
  const body = req.body;
  let username = body.username;
  let password = body.password;
  let firstname = body.firstname;
  let lastname = body.lastname;
  let avatarUrl = body.avatarUrl;
  let university = body.university;
  let role = body.role;

  if (!username || !password) {
    res.status(412).send('Username and password are missing');
  } else {
    let query = `INSERT INTO users (username, password, firstname, lastname, avatarUrl, university, role) VALUES ('${username}', '${password}', '${firstname}', '${lastname}', '${avatarUrl}', '${university}', '${role}')`;
    _helpers_db_connexion__WEBPACK_IMPORTED_MODULE_1___default.a.query(query, (err, results, fields) => {
      if (err) {
        console.log(err);
        res.status(400).send({
          status: false,
          message: 'User not created'
        }); // res.send({
        //   err
        // })
      } else {
        console.log(results);
        res.send({
          status: 200,
          "success": "new user registered sucessfully",
          content: results
        });
      }
    });
  }
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

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),

/***/ "dotenv/config":
/*!********************************!*\
  !*** external "dotenv/config" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dotenv/config");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

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