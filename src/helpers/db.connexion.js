'user strict'

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "OmnivizTest",
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("DB Connected!");

  // création de la dB
  connection.query("CREATE DATABASE IF NOT EXISTS OmnivizTest CHARACTER SET 'utf8'", function (err, result) {
    if (err) throw err;
    console.log("database created");
  });

  connection.query("CREATE TABLE IF NOT EXISTS OmnivizTest.users (userID INT NOT NULL UNIQUE AUTO_INCREMENT, username VARCHAR(50) NOT NULL UNIQUE, email VARCHAR(250) NOT NULL UNIQUE, createdat TIMESTAMP, firstname VARCHAR(255), lastname VARCHAR(255), avatar VARCHAR(500), university VARCHAR(255), password VARCHAR(255) NOT NULL, role VARCHAR(30))", function(err, result) {
    if (err) throw err;
    console.log("Table users created")
  });

  connection.query("CREATE TABLE IF NOT EXISTS OmnivizTest.rooms (roomID INT NOT NULL UNIQUE AUTO_INCREMENT, authorID INT NOT NULL, authorUsername VARCHAR(50), authorFirstname VARCHAR(255), authorLastname VARCHAR(255), title VARCHAR(255) NOT NULL, description TEXT, createdat TIMESTAMP , startClass INT, endClass INT, PRIMARY KEY(roomID), FOREIGN KEY(authorID) REFERENCES users(userID))", function(err, result) {
    if (err) throw err;
    console.log("Table rooms created")
  });

  connection.query("CREATE TABLE IF NOT EXISTS OmnivizTest.tags (tagID INT NOT NULL UNIQUE AUTO_INCREMENT, userID INT NOT NULL, roomID INT NOT NULL, time INT NOT NULL, color VARCHAR(40), PRIMARY KEY(tagID), FOREIGN KEY(userID) REFERENCES users(userID), FOREIGN KEY(roomID) REFERENCES rooms(roomID))", function(err, result) {
    if (err) throw err;
    console.log("Table tags created")
  });
});

module.exports = connection