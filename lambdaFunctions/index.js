'use strict'

exports.handler = function (event, context, callback) {
  // Declare messagesDao inside handler in order stop reusing mysql connection
  // This avoids "cannot enqueue Query after fatal error" problem
  // reference: https://www.jeremydaly.com/reuse-database-connections-aws-lambda/
  const messagesDao = require('./lib/db/dao/MessagesDao')

  context.callbackWaitsForEmptyEventLoop = false

  console.log('event.httpMethod:', event.httpMethod)
  console.log('event.body:', event.body)
  console.log('event:', event)

  if (event.httpMethod === 'POST') {
    messagesDao.create(event.body, callback)
  } else if (event.httpMethod === 'GET') {
    messagesDao.read(callback)
  } else if (event.httpMethod === 'PUT') {
    messagesDao.update(event.pathParameters.id, event.body, callback)
  } else if (event.httpMethod === 'DELETE') {
    messagesDao.delete(event.pathParameters.id, callback)
  }
}
