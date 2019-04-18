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

/***/ "./src/api/helpers/db.connexion.js":
/*!*****************************************!*\
  !*** ./src/api/helpers/db.connexion.js ***!
  \*****************************************/
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

/***/ "./src/api/users.js":
/*!**************************!*\
  !*** ./src/api/users.js ***!
  \**************************/
/*! exports provided: userRouter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "userRouter", function() { return userRouter; });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! passport */ "passport");
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _helpers_db_connexion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers/db.connexion */ "./src/api/helpers/db.connexion.js");
/* harmony import */ var _helpers_db_connexion__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_helpers_db_connexion__WEBPACK_IMPORTED_MODULE_2__);




const mysql = __webpack_require__(/*! mysql */ "mysql");

const userRouter = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();
userRouter.get('/', (req, res) => {
  _helpers_db_connexion__WEBPACK_IMPORTED_MODULE_2___default.a.query('SELECT * FROM users ', (err, results, fields) => {
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
    _helpers_db_connexion__WEBPACK_IMPORTED_MODULE_2___default.a.query(query, (err, results, fields) => {
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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cors */ "cors");
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var morgan__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! morgan */ "morgan");
/* harmony import */ var morgan__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(morgan__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _api_users__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./api/users */ "./src/api/users.js");
/* harmony import */ var _api_helpers_db_connexion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./api/helpers/db.connexion */ "./src/api/helpers/db.connexion.js");
/* harmony import */ var _api_helpers_db_connexion__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_api_helpers_db_connexion__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! passport */ "passport");
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_5__);







const LdapStrategy = __webpack_require__(/*! passport-ldapauth */ "passport-ldapauth");

const app = express__WEBPACK_IMPORTED_MODULE_0___default()();
const port = process.env.PORT || 5000;
app.use(morgan__WEBPACK_IMPORTED_MODULE_2___default()('combined'));
app.use(cors__WEBPACK_IMPORTED_MODULE_1___default()());
app.use(express__WEBPACK_IMPORTED_MODULE_0___default.a.json());
app.use(express__WEBPACK_IMPORTED_MODULE_0___default.a.urlencoded({
  extended: true
}));
app.use('/users', _api_users__WEBPACK_IMPORTED_MODULE_3__["userRouter"]);

let getLDAPConfiguration = function (req, callback) {
  process.nextTick(function () {
    var opts = {
      server: {
        url: "ldap://127.0.0.1:4000",
        bindDn: `uid=${req.body.username}`,
        bindCredentials: `${req.body.password}`,
        searchBase: 'test',
        searchFilter: `uid=${req.body.username}`,
        reconnect: true
      }
    };
    callback(null, opts);
  });
};

passport__WEBPACK_IMPORTED_MODULE_5___default.a.use(new LdapStrategy(getLDAPConfiguration, function (user, done) {
  morgan__WEBPACK_IMPORTED_MODULE_2___default.a.info("LDAP user ", user.username, "is logged in.");
  return done(null, user);
}));
passport__WEBPACK_IMPORTED_MODULE_5___default.a.serializeUser(function (user, done) {
  done(null, user.uid);
});
passport__WEBPACK_IMPORTED_MODULE_5___default.a.deserializeUser(function (id, done) {
  User.findOne({
    uid: id
  }).exec().then(user => {
    if (!user) {
      done(new Error(`Cannot find user with uid=${id}`));
    } else {
      done(null, user);
    }
  });
});
app.post('/login', passport__WEBPACK_IMPORTED_MODULE_5___default.a.authenticate('ldapauth', {
  session: false
}), function (req, res) {
  res.send({
    error: err,
    status: 'ok',
    content: data
  });
});
app.listen(port, () => console.log(`server is running on port ${port}`));

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

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

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

/***/ "passport-ldapauth":
/*!************************************!*\
  !*** external "passport-ldapauth" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("passport-ldapauth");

/***/ })

/******/ });
//# sourceMappingURL=main.map