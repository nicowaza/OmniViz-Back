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

  connection.query("CREATE TABLE IF NOT EXISTS OmnivizTest.users (userID INT NOT NULL UNIQUE AUTO_INCREMENT, username VARCHAR(50) NOT NULL UNIQUE, createdat TIMESTAMP, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, avatarUrl VARCHAR(500), university VARCHAR(255), password VARCHAR(40) NOT NULL, role VARCHAR(30), mail VARCHAR(255), telephoneNumber VARCHAR(255))", function(err, result) {
    if (err) throw err;
    console.log("Table users created")
  })
});

module.exports = connection