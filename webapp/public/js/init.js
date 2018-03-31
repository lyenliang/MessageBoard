var updateMessageDialog
var messageDisplayer = document.getElementById('messageDisplayer')

function loadOldDataIntoUpdateDialog (updateBtn) {
  var msgClassName = updateBtn.parentNode.className
  var msgId = msgClassName.slice(6) // 6 is the length of 'msgId_'
  var oldAuthor = $('.author_' + msgId).text()
  var oldContent = $('.content_' + msgId).text()
  $('#message-id').text(msgId)
  $('#message-author').val(oldAuthor)
  $('#message-content').val(oldContent)
}

function assembleMessage (message) {
  var msgBox = document.createElement('div')
  msgBox.className = 'msgId_' + message.id

  var contentBox = document.createElement('div')
  contentBox.innerText = message.content
  contentBox.className = 'content_' + message.id

  var para = document.createElement('p')
  para.className = 'para_wrap'

  var authorSpan = document.createElement('span')
  authorSpan.className = 'author'
  authorSpan.innerText = message.author
  authorSpan.className = 'author_' + message.id

  var postedAtSpan = document.createElement('span')
  postedAtSpan.innerText = ' posted at '
  postedAtSpan.className = 'postedAt_' + message.id

  var timeSpan = document.createElement('span')
  timeSpan.innerText = message.createdAt

  // Delete Button
  var deleteBtn = document.createElement('input')
  deleteBtn.type = 'button'
  deleteBtn.value = 'Delete'
  deleteBtn.addEventListener('click', function () {
    deleteMessage(message.id)
  })

  var updateBtn = document.createElement('input')
  updateBtn.type = 'button'
  updateBtn.value = 'Update'
  updateBtn.className = 'updateClass'
  updateBtn.addEventListener('click', function () {
    loadOldDataIntoUpdateDialog(updateBtn)
    updateMessageDialog.dialog('open')
  })

  // var bottomLine = document.createElement('br')

  para.appendChild(authorSpan)
  para.appendChild(postedAtSpan)
  para.appendChild(timeSpan)

  msgBox.appendChild(contentBox)
  msgBox.appendChild(para)
  msgBox.appendChild(deleteBtn)
  msgBox.appendChild(updateBtn)
  // msgBox.appendChild(bottomLine)
  // msgBox.parentNode.insertBefore(bottomLine)
  return msgBox
}

function showMessages (messages) {
  for (var i = 0; i < messages.length; i += 1) {
    var msgBox = assembleMessage(messages[i])
    messageDisplayer.appendChild(msgBox)
  }
}

function createMessage (author, content) {
  $.ajax({
    method: 'POST',
    url: window._config.api.url + '/v1/message',
    data: JSON.stringify({
      author: author,
      content: content
    }),
    success: function (response) {
      location.reload()
    // alert(response)
    // var message = assembleMessage()
    // messageDisplayer
    }
  })
}

function updateMessage () {
  var msgId = $('#message-id').text()
  var msgAuthor = $('#message-author').val()
  var msgContent = $('#message-content').val()
  $.ajax({
    method: 'PUT',
    url: window._config.api.url + '/v1/message/' + msgId,
    data: JSON.stringify({
      author: msgAuthor,
      content: msgContent
    }),
    success: function (response) {
      $('.content_' + msgId).text(msgContent)
      $('.author_' + msgId).text(msgAuthor)
      updateMessageDialog.dialog('close')
    }
  })
// alert(id)
// alert(id)
}

function deleteMessage (id) {
  $.ajax({
    method: 'DELETE',
    url: window._config.api.url + '/v1/message/' + id,
    success: function (response) {
      $('.msgId_' + id).remove()
    }
  })
}

function init () {
  $.ajax({
    method: 'GET',
    url: window._config.api.url + '/v1/messages',
    success: function (response) {
      showMessages(response.Data)
    }
  })

  updateMessageDialog = $('#update-form').dialog({
    autoOpen: false,
    height: 400,
    width: 500,
    modal: true,
    buttons: {
      'Update message': updateMessage,
      'Cancel': function () {
        updateMessageDialog.dialog('close')
      }
    }
  })
}

init()
