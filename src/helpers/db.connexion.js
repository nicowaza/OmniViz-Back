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

connection.connect(function(err) {
  if (err) throw err;
  console.log("DB Connected!");

  // // création de la dB
  // connection.query("CREATE DATABASE IF NOT EXISTS OmnivizTest CHARACTER SET 'utf8'", function (err, result) {
  //   if (err) throw err;
  //   console.log("database created");
  // });

  connection.query("CREATE TABLE IF NOT EXISTS heroku_7d8051b18f89a33.users (userID INT NOT NULL UNIQUE AUTO_INCREMENT, username VARCHAR(50) NOT NULL UNIQUE, email VARCHAR(250) NOT NULL UNIQUE, createdat TIMESTAMP, firstname VARCHAR(255), lastname VARCHAR(255), avatar VARCHAR(500), university VARCHAR(255), password VARCHAR(255) NOT NULL, role VARCHAR(30))", function(err, result) {
    if (err) throw err;
    console.log("Table users created")
  });

  connection.query("CREATE TABLE IF NOT EXISTS heroku_7d8051b18f89a33.rooms (roomID INT NOT NULL UNIQUE AUTO_INCREMENT, authorID INT NOT NULL, authorUsername VARCHAR(50), authorFirstname VARCHAR(255), authorLastname VARCHAR(255), title VARCHAR(255) NOT NULL, description TEXT, createdat TIMESTAMP , startClass INT, endClass INT, participantsID INT, PRIMARY KEY(roomID), FOREIGN KEY(participantsID) REFERENCES users(userID), FOREIGN KEY(authorID) REFERENCES users(userID))", function(err, result) {
    if (err) throw err;
    console.log("Table rooms created")
  });

  connection.query("CREATE TABLE IF NOT EXISTS heroku_7d8051b18f89a33.tags (tagID INT NOT NULL UNIQUE AUTO_INCREMENT, userID INT NOT NULL, roomID INT NOT NULL, time INT NOT NULL, color VARCHAR(40), PRIMARY KEY(tagID), FOREIGN KEY(userID) REFERENCES users(userID), FOREIGN KEY(roomID) REFERENCES rooms(roomID))", function(err, result) {
    if (err) throw err;
    console.log("Table tags created")
  });

  // création d'une table de composition (association many to many) avec clé primaire composite et 2 foreign key
  connection.query("CREATE TABLE IF NOT EXISTS heroku_7d8051b18f89a33.Participants (roomID INT NOT NULL, userID INT NOT NULL, CONSTRAINT FK_ParticipantsRooms FOREIGN KEY(roomID) REFERENCES rooms(roomID), CONSTRAINT FK_ParticipantsUsers FOREIGN KEY(userID) REFERENCES users(userID), CONSTRAINT PK_Participants PRIMARY KEY(roomID, userID))", function(err, result) {
    if (err) throw err;
    console.log("Table Participants created")
  });
});

module.exports = connection