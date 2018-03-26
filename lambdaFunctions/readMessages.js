const messagesDao = require('./lib/db/dao/MessagesDao')

exports.handler = function (event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false;
  messagesDao.read(callback)
}
