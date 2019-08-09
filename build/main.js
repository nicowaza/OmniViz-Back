require("source-map-support/register"),module.exports=function(e){var o={};function s(t){if(o[t])return o[t].exports;var r=o[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,s),r.l=!0,r.exports}return s.m=e,s.c=o,s.d=function(e,o,t){s.o(e,o)||Object.defineProperty(e,o,{enumerable:!0,get:t})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,o){if(1&o&&(e=s(e)),8&o)return e;if(4&o&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(s.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&o&&"string"!=typeof e)for(var r in e)s.d(t,r,function(o){return e[o]}.bind(null,r));return t},s.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(o,"a",o),o},s.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},s.p="/",s(s.s=9)}([function(e,o,s){const t=s(4).createConnection({host:"eu-cdbr-west-02.cleardb.net",user:"b7482ad97fe0f8",password:"21d314c9",port:"3306",database:"heroku_7d8051b18f89a33",multipleStatements:!0});t.connect(function(e){if(e)throw e;console.log("DB Connected!"),t.query("CREATE TABLE IF NOT EXISTS heroku_7d8051b18f89a33.users (userID INT NOT NULL UNIQUE AUTO_INCREMENT, username VARCHAR(50) NOT NULL UNIQUE, email VARCHAR(250) NOT NULL UNIQUE, createdat TIMESTAMP, firstname VARCHAR(255), lastname VARCHAR(255), avatar VARCHAR(500), university VARCHAR(255), password VARCHAR(255) NOT NULL, role VARCHAR(30))",function(e,o){if(e)throw e;console.log("Table users created")}),t.query("CREATE TABLE IF NOT EXISTS heroku_7d8051b18f89a33.rooms (roomID INT NOT NULL UNIQUE AUTO_INCREMENT, authorID INT NOT NULL, authorUsername VARCHAR(50), authorFirstname VARCHAR(255), authorLastname VARCHAR(255), title VARCHAR(255) NOT NULL, description TEXT, createdat TIMESTAMP , startClass INT, endClass INT, participantsID INT, PRIMARY KEY(roomID), FOREIGN KEY(participantsID) REFERENCES users(userID), FOREIGN KEY(authorID) REFERENCES users(userID))",function(e,o){if(e)throw e;console.log("Table rooms created")}),t.query("CREATE TABLE IF NOT EXISTS heroku_7d8051b18f89a33.tags (tagID INT NOT NULL UNIQUE AUTO_INCREMENT, userID INT NOT NULL, roomID INT NOT NULL, time INT NOT NULL, color VARCHAR(40), PRIMARY KEY(tagID), FOREIGN KEY(userID) REFERENCES users(userID), FOREIGN KEY(roomID) REFERENCES rooms(roomID))",function(e,o){if(e)throw e;console.log("Table tags created")}),t.query("CREATE TABLE IF NOT EXISTS heroku_7d8051b18f89a33.Participants (roomID INT NOT NULL, userID INT NOT NULL, CONSTRAINT FK_ParticipantsRooms FOREIGN KEY(roomID) REFERENCES rooms(roomID), CONSTRAINT FK_ParticipantsUsers FOREIGN KEY(userID) REFERENCES users(userID), CONSTRAINT PK_Participants PRIMARY KEY(roomID, userID))",function(e,o){if(e)throw e;console.log("Table Participants created")})}),e.exports=t},function(e,o){e.exports=require("express")},function(e,o){e.exports=require("bcrypt")},function(e,o){e.exports=function(e,o,s){if(e.isAuthenticated())return console.log("verifiedAuth :",e.isAuthenticated()),s();console.log("not authenticated user :",e.isAuthenticated()),o.send({status:401,message:"unauthorized",isAuthenticated:e.isAuthenticated()})}},function(e,o){e.exports=require("mysql")},function(e,o){e.exports=require("express-validator")},function(e,o){e.exports=require("socket.io")},function(e,o){e.exports=require("passport")},function(e,o,s){"use strict";s.r(o);const t=s(19).Strategy,r=s(2),n=s(0);o.default=function(e){e.use(new t({usernameField:"email",passwordField:"password",passReqToCallback:!0},function(e,o,s,t){n.query("SELECT * FROM users WHERE email = ?",[o],function(e,o,n,a){if(e)return t(e);if(0===o.length)return t(null,!1,{message:"no user found"});{let e=o[0].password;r.compare(s,e,function(e,s){if(s){const e=o[0];return console.log("user :",e),t(null,e,{message:"user identified"})}return console.log("wrong password"),t(null,!1,{message:"incorrect password"})})}})})),e.serializeUser(function(e,o){console.log("serialize usr_id: ",e.userID),o(null,e)}),e.deserializeUser(function(e,o){const s=e.userID;console.log("deserialize usr id: ",s),n.query("SELECT * FROM users WHERE userID = ? ",[s],function(e,s){o(null,s)})})}},function(e,o,s){e.exports=s(10)},function(e,o,s){const t=s(1),r=s(11),n=s(12),a=s(13),u=s(14),c=s(15),i=s(5),l=(s(2),s(3)),d=s(16),m=s(17),E=s(18)(m),f=s(7);s(8).default(f);const p=t();p.use(t.static("public")),console.log("process.env","production"),p.use(t.static("/production"));const g=process.env.PORT||5e3,I=d(p.listen(g,()=>console.log(`server is running on port ${g}`)));p.use(a("combined")),p.use(n({policies:{"default-src":[n.NONE],"img-src":[n.SELF]}})),p.use(r({origin:"http://localhost:8080",methods:["GET","POST","PUT","DELETE"],credentials:!0})),p.use(t.json()),p.use(t.urlencoded({extended:!0})),p.use(u.json()),p.use(u.urlencoded({extended:!1})),p.use(c()),p.use(i());const R=m({secret:"thedudeabides",name:"sid",store:new E({host:"eu-cdbr-west-02.cleardb.net",user:"b7482ad97fe0f8",password:"21d314c9",port:"3306",database:"heroku_7d8051b18f89a33"}),resave:!1,saveUninitialized:!1,cookie:{maxAge:54e5}});p.use(R),I.use(function(e,o){R(e.request,e.request.res,o)}),p.use(f.initialize()),p.use(f.session());const T=s(20).default(I,f,p),N=s(21).default(I,f,p);p.use("/users",T),p.use("/rooms",N),p.get("/",l,(e,o,s)=>{const t=e.user[0];t.username,t.email,t.role;console.log("isAuthenticated :",e.isAuthenticated())})},function(e,o){e.exports=require("cors")},function(e,o){e.exports=require("express-csp-header")},function(e,o){e.exports=require("morgan")},function(e,o){e.exports=require("body-parser")},function(e,o){e.exports=require("cookie-parser")},function(e,o,s){const t=s(0),r=s(6);e.exports=function(e){const o=r(e);return o.on("connection",function(e,s){console.log("A client has connected"),e.on("createRoom",o=>{console.log(o),e.emit("roomCreation",function(e){console.log(e)})}),e.on("join",s=>{if(e.request.session.passport.user){const r=e.request.session.passport.user;console.log("scoket user",r);const n=r.username,a=r.userID,u=r.role,c=s,i=s.roomName,l=s.roomID,d=s.authorLastname;s.authorFirstname,console.log("socket:",r),e.join(l,function(){console.log("room data",c),console.log(`${n} has joined ${i}`),console.log("author last name",d),o.in(l).emit("joiningEvent",{message:`${n} has joined room ${i}`,username:n,user_id:a,user_role:u,roomData:c});let e=`INSERT IGNORE INTO Participants (userID, roomID) VALUES ('${a}', '${l}')`;t.query(e,(e,o,s)=>{e?console.log(e):console.log(o)})}),e.on("tag",o=>{console.log("tag datas",o);const s=o.tag,r=o.timestamp;console.log(n),e.broadcast.to(l).emit("event",{color:s,username:n,user_id:a,roomName:i,time:r});let u=`INSERT INTO tags (userID, roomID, time, color) VALUES ('${a}', '${l}', '${r}', '${s}')`;t.query(u,(e,o,s)=>{e?console.log(e):console.log(o)})}),e.on("disconnect",e=>{console.log("disconnection :",e)}),e.on("leave",function(o){console.log(`${n} has left the ${i}`),console.log(o),e.leave(l,function(o){e.broadcast.to(l).emit("leavingEvent",{message:`${n} has left ${i}`,username:n,user_id:a,user_role:u})})}),e.on("closeRoom",function(o){console.log("classe fermée :",o),e.broadcast.to(l).emit("closeRoom")})}else console.log("c'est la merde")})}),o}},function(e,o){e.exports=require("express-session")},function(e,o){e.exports=require("express-mysql-session")},function(e,o){e.exports=require("passport-local")},function(e,o,s){"use strict";s.r(o);const t=s(1),r=s(0),n=(s(3),s(4),s(5),s(2)),a=(s(6),s(7));s(8).default(a);const u=t.Router();o.default=function(e,o,s){return u.post("/register",(e,o)=>{e.checkBody("username","Username field cannot be empty.").notEmpty(),e.checkBody("username","Username must be between 4-15 characters long.").len(4,15),e.checkBody("email","The email you entered is invalid, please try again.").isEmail(),e.checkBody("email","Email address must be between 4-100 characters long, please try again.").len(4,100),e.checkBody("email","Email field cannot be empty.").notEmpty(),e.checkBody("password","Password field cannot be empty.").notEmpty(),e.checkBody("password","Password must be between 8-100 characters long.").len(8,100),e.checkBody("password","Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/,"i"),e.checkBody("confirmedPassword","Password must be between 8-100 characters long.").len(8,100),e.checkBody("confirmedPassword","Passwords do not match, please try again.").equals(e.body.password);const s=e.validationErrors();if(s)console.log(`errors: ${JSON.stringify(s)}`),o.send({status:400,errors:s});else{let t=e.body,a=t.email,u=t.username,c=t.password,i=(t.confirmedPassword,t.firstname),l=t.lastname,d=t.avatar,m=t.university,E=t.role;const f=10;n.hash(c,f,function(e,t){let n=`INSERT INTO users (email, username, password, firstname, lastname, avatar, university, role) VALUES ('${a}', '${u}', '${t}', '${i}', '${l}', '${d}', '${m}', '${E}')`;r.query(n,(e,t,r)=>{s?(console.log(s),o.send({status:400,errors:s})):(console.log(t),o.send({status:200,success:"new user registered sucessfully",content:t}))})})}}),u.post("/login",(e,s,t)=>{o.authenticate("local",(o,t,r)=>{o?s.send({status:403,errors:r}):e.login(t,o=>{o&&console.log(o),console.log("authentifié",e.isAuthenticated()),s.send({user:t,isAuthenticated:e.isAuthenticated(),message:r.message})})})(e,s,t)}),u.get("/logout",(e,o)=>{e.logout(),e.session.destroy(),o.clearCookie("sid"),o.send({status:200,isAuthenticated:e.isAuthenticated()})}),u}},function(e,o,s){"use strict";s.r(o);const t=s(1),r=s(0),n=s(3),a=(s(4),s(22)),u=t.Router();o.default=function(e,o,s){return u.get("/",n,(e,o)=>{r.query("SELECT * FROM rooms ",(e,s,t)=>{e?(console.log(e),o.send({err:e})):(console.log(s),o.status(200).send({status:!0,results:s}))})}),u.get("/myRooms/:id",n,(e,o)=>{const s=e.params.id;console.log(s);const t=`SELECT * FROM rooms WHERE roomID IN (SELECT roomID FROM Participants WHERE userID = ${s})`;r.query(t,(e,s,t)=>{e?(console.log(e),o.send({err:e})):(console.log(s),o.status(200).send({status:!0,results:s}))})}),u.get("/startDate",n,(e,o)=>{r.query("SELECT * FROM rooms ORDER BY `startClass` DESC",(e,s,t)=>{e?(console.log(e),o.send({err:e})):(console.log(s),o.status(200).send({status:!0,results:s}))})}),u.get("/classOfTheDay",n,(e,o)=>{const s=a(),t=`SELECT * FROM rooms WHERE startClass >= ${s.startOf("day").format("X")} AND startClass <= ${s.endOf("day").format("X")}`;r.query(t,(e,s,t)=>{e?(console.log(e),o.send({err:e})):(console.log(s),o.status(200).send({status:!0,results:s}))})}),u.get("/:id",n,(e,o)=>{const s=e.params.id;let t=`SELECT rooms.roomID, rooms.authorID, rooms.authorUsername, rooms.authorFirstname, rooms.authorLastname, rooms.title, rooms.startClass, rooms.endClass\n    FROM rooms\n    WHERE rooms.roomID = ${s}; SELECT tags.tagID, tags.userID, tags.time, tags.color\n    FROM tags\n    WHERE tags.roomID = ${s}`;r.query(t,(e,s,t)=>{e?(console.log(e),o.send({status:400,errors:e})):(console.log(s[0]),console.log(s[1]),o.send({status:200,content1:s[0],content2:s[1]}))})}),u.post("/",n,(e,o)=>{e.checkBody("title","Title field cannot be empty.").notEmpty();const s=e.validationErrors();if(s)console.log(`errors: ${JSON.stringify(s)}`),o.send({status:400,errors:s});else{let s=e.body;const{title:t,description:n,authorID:a,authorLastname:u,authorFirstname:c,authorUsername:i,startClass:l,endClass:d}=s;let m=`INSERT INTO rooms (authorID, authorLastname, authorFirstname, authorUsername, title, description, startClass, endClass) VALUES ('${a}', '${u}', '${c}', '${i}', '${t}', '${n}', '${l}', '${d}')`;console.log(m),r.query(m,(e,s,t)=>{e?(console.log(e),o.send({status:400,errors:e})):(console.log(s),o.send({status:200,success:"new class created",content:s}))})}}),u}},function(e,o){e.exports=require("moment")}]);
//# sourceMappingURL=main.map