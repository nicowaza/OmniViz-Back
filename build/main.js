<<<<<<< Updated upstream
require("source-map-support/register"),module.exports=function(e){var o={};function s(t){if(o[t])return o[t].exports;var r=o[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,s),r.l=!0,r.exports}return s.m=e,s.c=o,s.d=function(e,o,t){s.o(e,o)||Object.defineProperty(e,o,{enumerable:!0,get:t})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,o){if(1&o&&(e=s(e)),8&o)return e;if(4&o&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(s.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&o&&"string"!=typeof e)for(var r in e)s.d(t,r,function(o){return e[o]}.bind(null,r));return t},s.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(o,"a",o),o},s.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},s.p="/",s(s.s=9)}([function(e,o,s){const t=s(4).createConnection({host:"eu-cdbr-west-02.cleardb.net",user:"b7482ad97fe0f8",password:"21d314c9",port:"3306",database:"heroku_7d8051b18f89a33",multipleStatements:!0});t.connect(function(e){if(e)throw e;console.log("DB Connected!"),t.query("CREATE TABLE IF NOT EXISTS heroku_7d8051b18f89a33.users (userID INT NOT NULL UNIQUE AUTO_INCREMENT, username VARCHAR(50) NOT NULL UNIQUE, email VARCHAR(250) NOT NULL UNIQUE, createdat TIMESTAMP, firstname VARCHAR(255), lastname VARCHAR(255), avatar VARCHAR(500), university VARCHAR(255), password VARCHAR(255) NOT NULL, role VARCHAR(30))",function(e,o){if(e)throw e;console.log("Table users created")}),t.query("CREATE TABLE IF NOT EXISTS heroku_7d8051b18f89a33.rooms (roomID INT NOT NULL UNIQUE AUTO_INCREMENT, authorID INT NOT NULL, authorUsername VARCHAR(50), authorFirstname VARCHAR(255), authorLastname VARCHAR(255), title VARCHAR(255) NOT NULL, description TEXT, createdat TIMESTAMP , startClass INT, endClass INT, participantsID INT, PRIMARY KEY(roomID), FOREIGN KEY(participantsID) REFERENCES users(userID), FOREIGN KEY(authorID) REFERENCES users(userID))",function(e,o){if(e)throw e;console.log("Table rooms created")}),t.query("CREATE TABLE IF NOT EXISTS heroku_7d8051b18f89a33.tags (tagID INT NOT NULL UNIQUE AUTO_INCREMENT, userID INT NOT NULL, roomID INT NOT NULL, time INT NOT NULL, color VARCHAR(40), PRIMARY KEY(tagID), FOREIGN KEY(userID) REFERENCES users(userID), FOREIGN KEY(roomID) REFERENCES rooms(roomID))",function(e,o){if(e)throw e;console.log("Table tags created")}),t.query("CREATE TABLE IF NOT EXISTS heroku_7d8051b18f89a33.Participants (roomID INT NOT NULL, userID INT NOT NULL, CONSTRAINT FK_ParticipantsRooms FOREIGN KEY(roomID) REFERENCES rooms(roomID), CONSTRAINT FK_ParticipantsUsers FOREIGN KEY(userID) REFERENCES users(userID), CONSTRAINT PK_Participants PRIMARY KEY(roomID, userID))",function(e,o){if(e)throw e;console.log("Table Participants created")})}),e.exports=t},function(e,o){e.exports=require("express")},function(e,o){e.exports=require("bcrypt")},function(e,o){e.exports=function(e,o,s){if(e.isAuthenticated())return console.log("verifiedAuth :",e.isAuthenticated()),s();console.log("not authenticated user :",e.isAuthenticated()),o.send({status:401,message:"unauthorized",isAuthenticated:e.isAuthenticated()})}},function(e,o){e.exports=require("mysql")},function(e,o){e.exports=require("express-validator")},function(e,o){e.exports=require("socket.io")},function(e,o){e.exports=require("passport")},function(e,o,s){"use strict";s.r(o);const t=s(19).Strategy,r=s(2),n=s(0);o.default=function(e){e.use(new t({usernameField:"email",passwordField:"password",passReqToCallback:!0},function(e,o,s,t){n.query("SELECT * FROM users WHERE email = ?",[o],function(e,o,n,a){if(e)return t(e);if(0===o.length)return t(null,!1,{message:"no user found"});{let e=o[0].password;r.compare(s,e,function(e,s){if(s){const e=o[0];return console.log("user :",e),t(null,e,{message:"user identified"})}return console.log("wrong password"),t(null,!1,{message:"incorrect password"})})}})})),e.serializeUser(function(e,o){console.log("serialize usr_id: ",e.userID),o(null,e)}),e.deserializeUser(function(e,o){const s=e.userID;console.log("deserialize usr id: ",s),n.query("SELECT * FROM users WHERE userID = ? ",[s],function(e,s){o(null,s)})})}},function(e,o,s){e.exports=s(10)},function(e,o,s){const t=s(1),r=s(11),n=s(12),a=s(13),u=s(14),i=s(15),c=s(5),l=(s(2),s(3)),d=s(16),m=s(17),E=s(18)(m),f=s(7);s(8).default(f);const p=t();p.use(t.static("public")),console.log("process.env","production"),p.use(t.static("production")),p.get(/.*/,(e,o)=>o.sendFile("/production/index.html",{root:"/app"}));const g=process.env.PORT||5e3,I=d(p.listen(g,()=>console.log(`server is running on port ${g}`)));p.use(a("combined")),p.use(n({policies:{"default-src":[n.NONE],"img-src":[n.SELF]}})),p.use(r({origin:"http://localhost:8080",methods:["GET","POST","PUT","DELETE"],credentials:!0})),p.use(t.json()),p.use(t.urlencoded({extended:!0})),p.use(u.json()),p.use(u.urlencoded({extended:!1})),p.use(i()),p.use(c());const R=m({secret:"thedudeabides",name:"sid",store:new E({host:"eu-cdbr-west-02.cleardb.net",user:"b7482ad97fe0f8",password:"21d314c9",port:"3306",database:"heroku_7d8051b18f89a33"}),resave:!1,saveUninitialized:!1,cookie:{maxAge:54e5}});p.use(R),I.use(function(e,o){R(e.request,e.request.res,o)}),p.use(f.initialize()),p.use(f.session());const T=s(20).default(I,f,p),h=s(21).default(I,f,p);p.use("/users",T),p.use("/rooms",h),p.get("/",l,(e,o,s)=>{const t=e.user[0];t.username,t.email,t.role;console.log("isAuthenticated :",e.isAuthenticated())})},function(e,o){e.exports=require("cors")},function(e,o){e.exports=require("express-csp-header")},function(e,o){e.exports=require("morgan")},function(e,o){e.exports=require("body-parser")},function(e,o){e.exports=require("cookie-parser")},function(e,o,s){const t=s(0),r=s(6);e.exports=function(e){const o=r(e);return o.on("connection",function(e,s){console.log("A client has connected"),e.on("createRoom",o=>{console.log(o),e.emit("roomCreation",function(e){console.log(e)})}),e.on("join",s=>{if(e.request.session.passport.user){const r=e.request.session.passport.user;console.log("scoket user",r);const n=r.username,a=r.userID,u=r.role,i=s,c=s.roomName,l=s.roomID,d=s.authorLastname;s.authorFirstname,console.log("socket:",r),e.join(l,function(){console.log("room data",i),console.log(`${n} has joined ${c}`),console.log("author last name",d),o.in(l).emit("joiningEvent",{message:`${n} has joined room ${c}`,username:n,user_id:a,user_role:u,roomData:i});let e=`INSERT IGNORE INTO Participants (userID, roomID) VALUES ('${a}', '${l}')`;t.query(e,(e,o,s)=>{e?console.log(e):console.log(o)})}),e.on("tag",o=>{console.log("tag datas",o);const s=o.tag,r=o.timestamp;console.log(n),e.broadcast.to(l).emit("event",{color:s,username:n,user_id:a,roomName:c,time:r});let u=`INSERT INTO tags (userID, roomID, time, color) VALUES ('${a}', '${l}', '${r}', '${s}')`;t.query(u,(e,o,s)=>{e?console.log(e):console.log(o)})}),e.on("disconnect",e=>{console.log("disconnection :",e)}),e.on("leave",function(o){console.log(`${n} has left the ${c}`),console.log(o),e.leave(l,function(o){e.broadcast.to(l).emit("leavingEvent",{message:`${n} has left ${c}`,username:n,user_id:a,user_role:u})})}),e.on("closeRoom",function(o){console.log("classe fermée :",o),e.broadcast.to(l).emit("closeRoom")})}else console.log("c'est la merde")})}),o}},function(e,o){e.exports=require("express-session")},function(e,o){e.exports=require("express-mysql-session")},function(e,o){e.exports=require("passport-local")},function(e,o,s){"use strict";s.r(o);const t=s(1),r=s(0),n=(s(3),s(4),s(5),s(2)),a=(s(6),s(7));s(8).default(a);const u=t.Router();o.default=function(e,o,s){return u.post("/register",(e,o)=>{e.checkBody("username","Username field cannot be empty.").notEmpty(),e.checkBody("username","Username must be between 4-15 characters long.").len(4,15),e.checkBody("email","The email you entered is invalid, please try again.").isEmail(),e.checkBody("email","Email address must be between 4-100 characters long, please try again.").len(4,100),e.checkBody("email","Email field cannot be empty.").notEmpty(),e.checkBody("password","Password field cannot be empty.").notEmpty(),e.checkBody("password","Password must be between 8-100 characters long.").len(8,100),e.checkBody("password","Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/,"i"),e.checkBody("confirmedPassword","Password must be between 8-100 characters long.").len(8,100),e.checkBody("confirmedPassword","Passwords do not match, please try again.").equals(e.body.password);const s=e.validationErrors();if(s)console.log(`errors: ${JSON.stringify(s)}`),o.send({status:400,errors:s});else{let t=e.body,a=t.email,u=t.username,i=t.password,c=(t.confirmedPassword,t.firstname),l=t.lastname,d=t.avatar,m=t.university,E=t.role;const f=10;n.hash(i,f,function(e,t){let n=`INSERT INTO users (email, username, password, firstname, lastname, avatar, university, role) VALUES ('${a}', '${u}', '${t}', '${c}', '${l}', '${d}', '${m}', '${E}')`;r.query(n,(e,t,r)=>{s?(console.log(s),o.send({status:400,errors:s})):(console.log(t),o.send({status:200,success:"new user registered sucessfully",content:t}))})})}}),u.post("/login",(e,s,t)=>{o.authenticate("local",(o,t,r)=>{o?s.send({status:403,errors:r}):e.login(t,o=>{o&&console.log(o),console.log("authentifié",e.isAuthenticated()),s.send({user:t,isAuthenticated:e.isAuthenticated(),message:r.message})})})(e,s,t)}),u.get("/logout",(e,o)=>{e.logout(),e.session.destroy(),o.clearCookie("sid"),o.send({status:200,isAuthenticated:e.isAuthenticated()})}),u}},function(e,o,s){"use strict";s.r(o);const t=s(1),r=s(0),n=s(3),a=(s(4),s(22)),u=t.Router();o.default=function(e,o,s){return u.get("/",n,(e,o)=>{r.query("SELECT * FROM rooms ",(e,s,t)=>{e?(console.log(e),o.send({err:e})):(console.log(s),o.status(200).send({status:!0,results:s}))})}),u.get("/myRooms/:id",n,(e,o)=>{const s=e.params.id;console.log(s);const t=`SELECT * FROM rooms WHERE roomID IN (SELECT roomID FROM Participants WHERE userID = ${s})`;r.query(t,(e,s,t)=>{e?(console.log(e),o.send({err:e})):(console.log(s),o.status(200).send({status:!0,results:s}))})}),u.get("/startDate",n,(e,o)=>{r.query("SELECT * FROM rooms ORDER BY `startClass` DESC",(e,s,t)=>{e?(console.log(e),o.send({err:e})):(console.log(s),o.status(200).send({status:!0,results:s}))})}),u.get("/classOfTheDay",n,(e,o)=>{const s=a(),t=`SELECT * FROM rooms WHERE startClass >= ${s.startOf("day").format("X")} AND startClass <= ${s.endOf("day").format("X")}`;r.query(t,(e,s,t)=>{e?(console.log(e),o.send({err:e})):(console.log(s),o.status(200).send({status:!0,results:s}))})}),u.get("/:id",n,(e,o)=>{const s=e.params.id;let t=`SELECT rooms.roomID, rooms.authorID, rooms.authorUsername, rooms.authorFirstname, rooms.authorLastname, rooms.title, rooms.startClass, rooms.endClass\n    FROM rooms\n    WHERE rooms.roomID = ${s}; SELECT tags.tagID, tags.userID, tags.time, tags.color\n    FROM tags\n    WHERE tags.roomID = ${s}`;r.query(t,(e,s,t)=>{e?(console.log(e),o.send({status:400,errors:e})):(console.log(s[0]),console.log(s[1]),o.send({status:200,content1:s[0],content2:s[1]}))})}),u.post("/",n,(e,o)=>{e.checkBody("title","Title field cannot be empty.").notEmpty();const s=e.validationErrors();if(s)console.log(`errors: ${JSON.stringify(s)}`),o.send({status:400,errors:s});else{let s=e.body;const{title:t,description:n,authorID:a,authorLastname:u,authorFirstname:i,authorUsername:c,startClass:l,endClass:d}=s;let m=`INSERT INTO rooms (authorID, authorLastname, authorFirstname, authorUsername, title, description, startClass, endClass) VALUES ('${a}', '${u}', '${i}', '${c}', '${t}', '${n}', '${l}', '${d}')`;console.log(m),r.query(m,(e,s,t)=>{e?(console.log(e),o.send({status:400,errors:e})):(console.log(s),o.send({status:200,success:"new class created",content:s}))})}}),u}},function(e,o){e.exports=require("moment")}]);
=======
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

const db_config = {
  host: "eu-cdbr-west-02.cleardb.net",
  user: "b7482ad97fe0f8",
  password: "21d314c9",
  port: "3306",
  database: "heroku_7d8051b18f89a33",
  multipleStatements: true
};
let connection;

function handleDisconnect() {
  console.log('1. connecting to db:');
  connection = mysql.createConnection(db_config); // Recreate the connection, since
  // the old one cannot be reused.

  connection.connect(function (err) {
    // The server is either down
    if (err) {
      // or restarting (takes a while sometimes).
      console.log('2. error when connecting to db:', err);
      setTimeout(handleDisconnect, 1000); // We introduce a delay before attempting to reconnect,
    } // to avoid a hot loop, and to allow our node script to
    // process asynchronous requests in the meantime.
    // If you're also serving http, display a 503 error.
    else {
        console.log("DB Connected!");
        connection.query("CREATE TABLE IF NOT EXISTS heroku_7d8051b18f89a33.users (userID INT NOT NULL UNIQUE AUTO_INCREMENT, username VARCHAR(50) NOT NULL UNIQUE, email VARCHAR(250) NOT NULL UNIQUE, createdat TIMESTAMP, firstname VARCHAR(255), lastname VARCHAR(255), avatar VARCHAR(500), university VARCHAR(255), password VARCHAR(255) NOT NULL, role VARCHAR(30))", function (err, result) {
          if (err) throw err;
          console.log("Table users created");
        });
        connection.query("CREATE TABLE IF NOT EXISTS heroku_7d8051b18f89a33.rooms (roomID INT NOT NULL UNIQUE AUTO_INCREMENT, authorID INT NOT NULL, authorUsername VARCHAR(50), authorFirstname VARCHAR(255), authorLastname VARCHAR(255), title VARCHAR(255) NOT NULL, description TEXT, createdat TIMESTAMP , startClass INT, endClass INT, participantsID INT, PRIMARY KEY(roomID), FOREIGN KEY(participantsID) REFERENCES users(userID), FOREIGN KEY(authorID) REFERENCES users(userID))", function (err, result) {
          if (err) throw err;
          console.log("Table rooms created");
        });
        connection.query("CREATE TABLE IF NOT EXISTS heroku_7d8051b18f89a33.tags (tagID INT NOT NULL UNIQUE AUTO_INCREMENT, userID INT NOT NULL, roomID INT NOT NULL, time BIGINT UNSIGNED NOT NULL, color VARCHAR(40), PRIMARY KEY(tagID), FOREIGN KEY(userID) REFERENCES users(userID), FOREIGN KEY(roomID) REFERENCES rooms(roomID))", function (err, result) {
          if (err) throw err;
          console.log("Table tags created");
        }); // création d'une table de composition (association many to many) avec clé primaire composite et 2 foreign key

        connection.query("CREATE TABLE IF NOT EXISTS heroku_7d8051b18f89a33.Participants (roomID INT NOT NULL, userID INT NOT NULL, CONSTRAINT FK_ParticipantsRooms FOREIGN KEY(roomID) REFERENCES rooms(roomID), CONSTRAINT FK_ParticipantsUsers FOREIGN KEY(userID) REFERENCES users(userID), CONSTRAINT PK_Participants PRIMARY KEY(roomID, userID))", function (err, result) {
          if (err) throw err;
          console.log("Table Participants created");
        });
      }
  });
  connection.on('error', function (err) {
    console.log('3. db error', err);

    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      // Connection to the MySQL server is usually
      handleDisconnect(); // lost due to either server restart, or a
    } else {
      // connnection idle timeout (the wait_timeout
      throw err; // server variable configures this)
    }
  });
}

handleDisconnect();
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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const express = __webpack_require__(/*! express */ "express");

const cors = __webpack_require__(/*! cors */ "cors");

const morgan = __webpack_require__(/*! morgan */ "morgan");

const bodyParser = __webpack_require__(/*! body-parser */ "body-parser");

const cookieParser = __webpack_require__(/*! cookie-parser */ "cookie-parser");

const expressValidator = __webpack_require__(/*! express-validator */ "express-validator");

const bcrypt = __webpack_require__(/*! bcrypt */ "bcrypt"); // import { verifiedAuth } from './helpers/verifyAuth';


const verifiedAuth = __webpack_require__(/*! ./helpers/verifyAuth */ "./src/helpers/verifyAuth.js");

const connectIO = __webpack_require__(/*! ./sockets/sockets.js */ "./src/sockets/sockets.js"); // import connection from './helpers/db.connexion';
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

const mysql = __webpack_require__(/*! mysql */ "mysql");

const moment = __webpack_require__(/*! moment */ "moment"); // import { verifiedAuth } from '../helpers/verifyAuth'


const roomRouter = express.Router();
/* harmony default export */ __webpack_exports__["default"] = (function (app, passport, io) {
  //cours classés par ordre id (ordre de création)
  roomRouter.get('/', verifiedAuth, (req, res) => {
    // console.log(req.isAuthenticated())
    // const query =`
    // SELECT *, Participants.userID
    // FROM rooms
    // INNER JOIN Participants
    // ON rooms.roomID = Participants.roomID`;
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
  }); // liste des cours auquels à participé le user

  roomRouter.get('/myRooms/:id', verifiedAuth, (req, res) => {
    // récupération de l'id du user
    const id = req.params.id;
    console.log(id); // utilisation d'une subquery pour d'abord récupérer l'id des cours auquel le user à participé (table participants). On passe ensuite ces id à la query qui liste les cours

    const query = `SELECT * FROM rooms WHERE roomID IN (SELECT roomID FROM Participants WHERE userID = ${id})`;
    connection.query(query, (err, results, fields) => {
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
  }); // cours classés par heure de début de classe

  roomRouter.get('/startDate', verifiedAuth, (req, res) => {
    connection.query('SELECT * FROM rooms ORDER BY `startClass` DESC', (err, results, fields) => {
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
  }); // cours du jour

  roomRouter.get('/classOfTheDay', verifiedAuth, (req, res) => {
    const now = moment(); // date de début du jour sous forme de timestamp en secondes

    const startOfDay = now.startOf('day').format('X'); // date de fin du jour sous forme de timestamp en secondes

    const endOfDay = now.endOf('day').format('X'); // renvoie uniquement les cours de la journée (dont la date de début est compris entre le début de la fin du jour 0h 00m 00sec et 23h 59m 59sec)

    const query = `SELECT * FROM rooms WHERE startClass >= ${startOfDay} AND startClass <= ${endOfDay}`;
    connection.query(query, (err, results, fields) => {
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
  }); // timeline séléctionnée par ID

  roomRouter.get('/timeline/:id', verifiedAuth, (req, res) => {
    const id = req.params.id;
    let query = `SELECT rooms.roomID, rooms.authorID, rooms.authorUsername, rooms.authorFirstname, rooms.authorLastname, rooms.title, rooms.startClass, rooms.endClass
    FROM rooms
    WHERE rooms.roomID = ${id};

    SELECT tags.tagID, tags.userID, tags.time, tags.color, users.userID, users.username, users.firstname, users.lastname, users.email, users.avatar
    FROM tags
    INNER JOIN users
    ON tags.userID = users.userID
    WHERE tags.roomID = ${id}
    `; // SELECT tags.tagID, tags.userID, tags.time, tags.color
    // FROM tags
    // WHERE tags.roomID = ${id};
    // SELECT *
    // FROM users
    // WHERE userID
    // IN (SELECT userID FROM Participants WHERE roomID = ${id})
    // let query = `SELECT rooms.roomID, rooms.authorID, rooms.authorUsername, rooms.authorFirstname, rooms.authorLastname, rooms.title, rooms.startClass, rooms.endClass, tags.tagID, tags.userID, tags.time, tags.color
    // FROM rooms
    // INNER JOIN tags ON rooms.roomID = tags.roomID
    // WHERE rooms.roomID = ${id}`

    connection.query(query, (err, results, fields) => {
      if (err) {
        console.log(err);
        res.send({
          status: 400,
          errors: err
        });
      } else {
        console.log(results[0]);
        console.log(results[1]);
        res.send({
          status: 200,
          content1: results[0],
          content2: results[1]
        });
      }

      ;
    });
  }); // single cours (par id)

  roomRouter.get('/:id', verifiedAuth, (req, res) => {
    const id = req.params.id;
    let query = `SELECT rooms.roomID, rooms.authorID, rooms.authorUsername, rooms.authorFirstname, rooms.authorLastname, rooms.title, rooms.startClass, rooms.endClass
    FROM rooms
    WHERE rooms.roomID = ${id}`;
    connection.query(query, (err, results, fields) => {
      if (err) {
        console.log(err);
        res.send({
          status: 400,
          errors: err
        });
      } else {
        console.log(results);
        res.send({
          status: 200,
          results
        });
      }

      ;
    });
  }); // séléctionne tous les participants à un cours et récupère leur datas utilisateur

  roomRouter.get('/participants/:id', verifiedAuth, (req, res) => {
    const id = req.params.id;
    const query = `SELECT Participants.userID, users.username, users.firstname, users.lastname
      FROM Participants
      INNER JOIN users
      ON Participants.userID = users.userID
      WHERE roomID = ${id}`;
    connection.query(query, (err, results, fields) => {
      if (err) {
        console.log(err);
        res.send({
          status: 400,
          errors: err
        });
      } else {
        console.log(results);
        res.send({
          status: 200,
          results
        });
      }
    });
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
        authorLastname,
        authorFirstname,
        authorUsername,
        startClass,
        endClass
      } = body;
      let query = `INSERT INTO rooms (authorID, authorLastname, authorFirstname, authorUsername, title, description, startClass, endClass) VALUES ('${authorID}', '${authorLastname}', '${authorFirstname}', '${authorUsername}', '${title}', '${description}', '${startClass}', '${endClass}')`;
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
      let avatar = body.avatar;
      let university = body.university;
      let role = body.role;
      const saltRounds = 10;
      bcrypt.hash(password, saltRounds, function (err, hash) {
        let query = `INSERT INTO users (email, username, password, firstname, lastname, avatar, university, role) VALUES ('${email}', '${username}', '${hash}', '${firstname}', '${lastname}', '${avatar}', '${university}', '${role}')`;
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
    console.log('A client has connected'); // console.log('the socket session object', socket.request.session);
    // console.log('the actual serialized user from passport', socket.request.session.passport);
    // const { username } = socket.request.session.passport.user
    // console.log(`${username} has opened a socket`)

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
        const roomData = data;
        const roomName = data.roomName;
        const roomID = data.roomID;
        const authorLastname = data.authorLastname;
        const authorFirstname = data.authorFirstname; // console.log('room data', roomData)

        console.log('socket:', socketUser);
        socket.join(roomID, function () {
          console.log('room data', roomData);
          console.log(`${username} has joined ${roomName}`);
          console.log('author last name', authorLastname);
          io.in(roomID).emit('joiningEvent', {
            message: `${username} has joined room ${roomName}`,
            username,
            user_id,
            user_role,
            roomData
          }); // insert les participants au cours dans la table participants que si ils ne sont pas déjà enregistré pour ce cours

          let query = `INSERT IGNORE INTO Participants (userID, roomID) VALUES ('${user_id}', '${roomID}')`;
          connection.query(query, (err, results, fields) => {
            if (err) {
              console.log(err);
            } else {
              console.log(results);
            }
          });
        });
        socket.on('tag', data => {
          console.log('tag datas', data);
          const color = data.tag;
          const time = data.timestamp;
          console.log('time', time);
          console.log(username);
          socket.broadcast.to(roomID).emit('event', {
            color,
            username,
            user_id,
            roomName,
            time
          });
          let query = `INSERT INTO tags (userID, roomID, time, color) VALUES ('${user_id}', '${roomID}', '${time}', '${color}')`;
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
        socket.on('leave', data => {
          console.log(`${username} has left the ${roomName}`);
          console.log(data);
          socket.leave(roomID, data => {
            socket.broadcast.to(roomID).emit('leavingEvent', {
              message: `${username} has left ${roomName}`,
              username,
              user_id,
              user_role
            });
          });
        });
        socket.on('closeRoom', () => {
          // on devrait pouvoir récupérer le username envoyé depuis le front via closeRoom mais data ne marche pas...pkoi ?
          console.log('classe fermée :', username);
          socket.broadcast.to(roomID).emit('closeRoom', username);
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

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("moment");

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
>>>>>>> Stashed changes
//# sourceMappingURL=main.map