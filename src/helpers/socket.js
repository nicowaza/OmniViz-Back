// import connection from './db.connexion';
// const socket = require ('socket.io');
// require('./helpers/passport').default(passport)
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
//         // console.log(user)
//         const firstname = user[0].firstname;
//         const email = user[0].email;
//         const username = user[0].username;

//         console.log([firstname, username, email])
//         return socket.emit('welcome', `hello ${firstname} you are connected as ${username}`)
//       }
//     })
//     //on disconnect
//   socket.on('disconnect', function () {
//     delete userSockets[ID];
//     return console.log('The client has disconnected');
//   });
// });

// export default {
//   io: io,
//   userSockets: userSockets
// };