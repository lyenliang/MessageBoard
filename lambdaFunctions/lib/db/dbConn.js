const mysql = require('mysql')
const dbConfig = require(`./../../config/dbConfig.${process.env.ENV}`)

let instance

class DBConnection {
  constructor () {
    instance = this

    this.conn = mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.username,
      password: dbConfig.password,
      database: dbConfig.database
    })

    this.conn.connect((err) => {
      if (err) {
        console.error('mysql connect error', err)
      } else {
        console.log('mysql Connected')
      }
    })
  }

  connection () {
    return this.conn
  }
}

instance = new DBConnection()

module.exports = instance
