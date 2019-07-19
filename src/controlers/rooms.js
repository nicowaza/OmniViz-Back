const connection = require('../helpers/db.connexion');

function createRoom(body) {
  const { title, description, authorID, createdat, startClass, endClass } = body
  let query = `INSERT INTO rooms (authorID, title, description, createdat, startClass, endClass) VALUES ('${authorID}', '${title}', '${description}', '${createdat}', '${startClass}', '${endClass}')`;

  console.log(query)

    connection.query(query, (errors, results, fields) => {
      return [errors, results]
  })
}

module.exports = createRoom;