'use strict'

const messagesDao = require('./lib/db/dao/MessagesDao')

exports.handler = function (event, context, callback) {
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
