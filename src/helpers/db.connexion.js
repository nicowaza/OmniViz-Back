'user strict'

const mysql = require('mysql');

const db_config = {
  conncectionLimit: 15,
  host: "eu-cdbr-west-02.cleardb.net",
  user: "b7482ad97fe0f8",
  password: "21d314c9",
  port: "3306",
  database: "heroku_7d8051b18f89a33",
  multipleStatements: true,
};

let pool;

function handleDisconnect() {
  console.log('1. connecting to db:');
  pool = mysql.createPool(db_config); // Recreate the connection, since
                        // the old one cannot be reused.

  pool.getConnection(function(err, connection) {              	// The server is either down
      if (err) {                                     // or restarting (takes a while sometimes).
          console.log('2. error when connecting to db:', err);
          setTimeout(handleDisconnect, 1000); // We introduce a delay before attempting to reconnect,
      } // to avoid a hot loop, and to allow our node script to
                                    	// process asynchronous requests in the meantime.
                        // If you're also serving http, display a 503 error.
      else {
        console.log("DB Connected!");

        connection.query("CREATE TABLE IF NOT EXISTS heroku_7d8051b18f89a33.users (userID INT NOT NULL UNIQUE AUTO_INCREMENT, username VARCHAR(50) NOT NULL UNIQUE, email VARCHAR(250) NOT NULL UNIQUE, createdat TIMESTAMP, firstname VARCHAR(255), lastname VARCHAR(255), avatar VARCHAR(500), university VARCHAR(255), password VARCHAR(255) NOT NULL, role VARCHAR(30))", function(err, result) {
          console.log("Table users created")
          if (err) throw err;
        });

        connection.query("CREATE TABLE IF NOT EXISTS heroku_7d8051b18f89a33.rooms (roomID INT NOT NULL UNIQUE AUTO_INCREMENT, authorID INT NOT NULL, authorUsername VARCHAR(50), authorFirstname VARCHAR(255), authorLastname VARCHAR(255), title VARCHAR(255) NOT NULL, description TEXT, createdat TIMESTAMP , startClass INT, endClass INT, participantsID INT, PRIMARY KEY(roomID), FOREIGN KEY(participantsID) REFERENCES users(userID), FOREIGN KEY(authorID) REFERENCES users(userID))", function(err, result) {
          console.log("Table rooms created")
          if (err) throw err;
        });

        connection.query("CREATE TABLE IF NOT EXISTS heroku_7d8051b18f89a33.tags (tagID INT NOT NULL UNIQUE AUTO_INCREMENT, userID INT NOT NULL, roomID INT NOT NULL, time BIGINT UNSIGNED NOT NULL, color VARCHAR(40), PRIMARY KEY(tagID), FOREIGN KEY(userID) REFERENCES users(userID), FOREIGN KEY(roomID) REFERENCES rooms(roomID))", function(err, result) {
          console.log("Table tags created")
          if (err) throw err;
        });

        // création d'une table de composition (association many to many) avec clé primaire composite et 2 foreign key
        connection.query("CREATE TABLE IF NOT EXISTS heroku_7d8051b18f89a33.Participants (roomID INT NOT NULL, userID INT NOT NULL, CONSTRAINT FK_ParticipantsRooms FOREIGN KEY(roomID) REFERENCES rooms(roomID), CONSTRAINT FK_ParticipantsUsers FOREIGN KEY(userID) REFERENCES users(userID), CONSTRAINT PK_Participants PRIMARY KEY(roomID, userID))", function(err, result) {
          console.log("Table Participants created")
          connection.release();
          if (err) throw err;
        });
      }
  });


  pool.on('error', function(err) {
      console.log('3. db error', err);
      if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.fatal) {
        console.log(err.fatal);	// Connection to the MySQL server is usually
        connection.destroy()
        handleDisconnect();                      	// lost due to either server restart, or a
      } else {                                      	// connnection idle timeout (the wait_timeout
          throw err;                                  // server variable configures this)
      }
  });
}

handleDisconnect();


module.exports = pool