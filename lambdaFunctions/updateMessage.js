'use strict'

const messagesDao = require('./lib/db/dao/MessagesDao')

exports.handler = function (event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false
  messagesDao.update(event.pathParameters.id, event.body, callback)
}
