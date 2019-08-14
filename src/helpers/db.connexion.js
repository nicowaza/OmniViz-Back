'user strict'

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "eu-cdbr-west-02.cleardb.net",
  user: "b7482ad97fe0f8",
  password: "21d314c9",
  port: "3306",
  database: "heroku_7d8051b18f89a33",
  multipleStatements: true,
});


function handleDisconnect() {
  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
       throw err;                                 // server variable configures this)
    }
  })

  connection.query("CREATE TABLE IF NOT EXISTS heroku_7d8051b18f89a33.users (userID INT NOT NULL UNIQUE AUTO_INCREMENT, username VARCHAR(50) NOT NULL UNIQUE, email VARCHAR(250) NOT NULL UNIQUE, createdat TIMESTAMP, firstname VARCHAR(255), lastname VARCHAR(255), avatar VARCHAR(500), university VARCHAR(255), password VARCHAR(255) NOT NULL, role VARCHAR(30))", function(err, result) {
    if (err) throw err;
    console.log("Table users created")
  });

  connection.query("CREATE TABLE IF NOT EXISTS heroku_7d8051b18f89a33.rooms (roomID INT NOT NULL UNIQUE AUTO_INCREMENT, authorID INT NOT NULL, authorUsername VARCHAR(50), authorFirstname VARCHAR(255), authorLastname VARCHAR(255), title VARCHAR(255) NOT NULL, description TEXT, createdat TIMESTAMP , startClass INT, endClass INT, participantsID INT, PRIMARY KEY(roomID), FOREIGN KEY(participantsID) REFERENCES users(userID), FOREIGN KEY(authorID) REFERENCES users(userID))", function(err, result) {
    if (err) throw err;
    console.log("Table rooms created")
  });

  connection.query("CREATE TABLE IF NOT EXISTS heroku_7d8051b18f89a33.tags (tagID INT NOT NULL UNIQUE AUTO_INCREMENT, userID INT NOT NULL, roomID INT NOT NULL, time BIGINT UNSIGNED NOT NULL, color VARCHAR(40), PRIMARY KEY(tagID), FOREIGN KEY(userID) REFERENCES users(userID), FOREIGN KEY(roomID) REFERENCES rooms(roomID))", function(err, result) {
    if (err) throw err;
    console.log("Table tags created")
  });

  // création d'une table de composition (association many to many) avec clé primaire composite et 2 foreign key
  connection.query("CREATE TABLE IF NOT EXISTS heroku_7d8051b18f89a33.Participants (roomID INT NOT NULL, userID INT NOT NULL, CONSTRAINT FK_ParticipantsRooms FOREIGN KEY(roomID) REFERENCES rooms(roomID), CONSTRAINT FK_ParticipantsUsers FOREIGN KEY(userID) REFERENCES users(userID), CONSTRAINT PK_Participants PRIMARY KEY(roomID, userID))", function(err, result) {
    if (err) throw err;
    console.log("Table Participants created")
  });
};

handleDisconnect()

// connection.connect(function(err) {
//   if (err) {
//     console.log('error when connecting to db:', err);
//     setTimeout(handleDisconnect, 2000);
//   } else console.log("DB Connected!");

  // création de la dB
  // connection.query("CREATE DATABASE IF NOT EXISTS OmnivizTest CHARACTER SET 'utf8'", function (err, result) {
  //   if (err) throw err;
  //   console.log("database created");
  // });


module.exports = connection