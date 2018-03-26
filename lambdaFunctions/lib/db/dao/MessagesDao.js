const dateTime = require('date-time')

const dbConn = require('../dbConn').connection()

let instance

class MessagesDao {
  constructor () {
    instance = this
  }

  create (message, callback) {
    const utcDateTime = dateTime({local: false})
    let sql = `INSERT INTO Messages (content, author, isDeleted, createdAt, updatedAt) \
      VALUES ('${message.content}', '${message.author}', false, '${utcDateTime}', '${utcDateTime}')`
    dbConn.query(sql, (err, result, fields) => {
      if (err) {
        console.error(err)
        callback(err)
      } else {
        console.log(result)
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(result),
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        })
      }
    })
  }

  read (callback) {
    let sql = 'SELECT * FROM Messages WHERE isDeleted = 0;'
    dbConn.query(sql, (err, result, fields) => {
      if (err) {
        console.error(err)
        callback(err)
      } else {
        console.log(result)
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(result),
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        })
      }
    })
  }

  update () {}
  delete () {}
}

instance = new MessagesDao()

module.exports = instance
