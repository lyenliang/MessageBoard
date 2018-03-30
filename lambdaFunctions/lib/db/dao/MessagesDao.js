'use strict'

const dateTime = require('date-time')

const dbConn = require('../dbConn').connection()
// const dbConfig = require(`./../../../config/dbConfig.${process.env.ENV}`)

let instance

class MessagesDao {
  constructor () {
    instance = this
  }

  /**
   * 
   * TODO: use the techniques mentioned here(http://blog.amowu.com/2016/03/error-handling-in-aws-api-gateway-with.html) to handle errors
   * @param {object} reqBody 
   * @param {function} callback 
   * @memberof MessagesDao
   */
  create (reqBody, callback) {
    let message = this._parseReqBody(reqBody, callback)
    if (message === false) {
      // something goes wrong with the validation
      return
    }

    const utcDateTime = dateTime({local: false})
    // TODO: Return new message's id and createdAt time so that the client can display the new message without location.reload()
    /*
    let lastIdSql = `SELECT AUTO_INCREMENT FROM  INFORMATION_SCHEMA.TABLES WHERE \
      TABLE_SCHEMA = '${dbConfig.database}' AND TABLE_NAME = 'Messages';`
    dbConn.query(lastIdSql, (err, result, fields) => {
      if (err) {
        dbConn.end()
        console.error(err)
        callback(err)
      } else {
      }
    })
    */
    let sql = `INSERT INTO Messages (content, author, isDeleted, createdAt, updatedAt) \
      VALUES ('${message.content}', '${message.author}', false, '${utcDateTime}', '${utcDateTime}')`
    this._executeSql(sql, false, callback)
  }

  /**
   * 
   * @param {function} callback 
   * @memberof MessagesDao
   */
  read (callback) {
    let sql = 'SELECT id, content, author, createdAt FROM Messages WHERE isDeleted = 0 ORDER BY createdAt DESC;'
    this._executeSql(sql, true, callback)
  }

  /**
   * 
   * @param {integer} id 
   * @param {object} reqBody 
   * @param {function} callback 
   * @memberof MessagesDao
   */
  update (id, reqBody, callback) {
    // input variables validation
    let message = this._parseReqBody(reqBody, callback)
    if (message === false) {
      // something goes wrong with the validation
      return
    }
    const utcDateTime = dateTime({local: false})
    let sql = `UPDATE Messages SET content = '${message.content}', author = '${message.author}', updatedAt = '${utcDateTime}' WHERE id = ${id};`
    this._executeSql(sql, false, callback)
  }

  /**
   * 
   * @param {integer} id 
   * @param {function} callback 
   * @memberof MessagesDao
   */
  delete (id, callback) {
    let sql = `UPDATE Messages SET isDeleted = true WHERE id = ${id};`
    this._executeSql(sql, false, callback)
  }

  _parseReqBody (reqBody, callback) {
    let message
    try {
      message = JSON.parse(reqBody)
      return message
    } catch (err) {
      console.error(err)
      const utcDateTime = dateTime({
        local: false,
        showTimeZone: true
      })
      let res = {
        Status: 'Failure',
        ErrorMessage: `Request message is not json formatted. ${err}`,
        Data: null,
        TimeStamp: utcDateTime
      }
      callback(err, {
        statusCode: 400,
        body: JSON.stringify({
          Error: err
        }),
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
      return false
    }
  }

  _executeSql (sql, returnResult, callback) {
    try {
      dbConn.query(sql, (err, result, fields) => {
        if (err) {
          dbConn.end()
          console.error(err)
          callback(err)
        } else {
          console.log(result)
          const utcDateTime = dateTime({
            local: false,
            showTimeZone: true
          })
          const res = {
            Status: 'Success',
            ErrorMessage: null,
            Data: returnResult ? result : null,
            TimeStamp: utcDateTime
          }
          callback(null, {
            statusCode: 200,
            body: JSON.stringify(res),
            headers: {
              'Access-Control-Allow-Origin': '*'
            }
          })
        }
      })
    } catch (err) {
      // Avoid keeping getting 'Cannot enqueue Query after invoking quit' error
      dbConn.end()
    }
  }
}

instance = new MessagesDao()

module.exports = instance
