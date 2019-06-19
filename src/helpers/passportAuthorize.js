// const passportSocketIo = require("passport.socketio");

// const verifyIoConnection = function () {
//   io.use(passportSocketIo.authorize({
//     cookieParser: cookieParser,
//     key: 'sid',
//     secret: 'thedudeabides',
//     store: sessionStore,
//     passport: passport,
//     success: onAuthorizeSuccess,
//     fail: onAuthorizeFail,
//   }));

//   function onAuthorizeSuccess(data, accept){
//     console.log('successful connection to socket.io');
//     // console.log(data)
//     accept();
//   }

//   function onAuthorizeFail(data, message, error, accept){

//     // error indicates whether the fail is due to an error or just a unauthorized client
//     if(error)  {
//       console.log(error)
//       throw new Error(message);
//     }
//     // send the (not-fatal) error-message to the client and deny the connection
//     console.log(error)
//     console.log("unauthorized: you're not logged in");
//     return accept(new Error(message));
//   }
// }

// module.exports = verifyIoConnection;
const onAuthorizeSuccess = (data, accept) => {
  console.log('successful connection to socket.io');
  // console.log(data)
  accept();
}

const onAuthorizeFail = (data, message, error, accept) => {

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

module.exports = {
  onAuthorizeSuccess,
  onAuthorizeFail,
}