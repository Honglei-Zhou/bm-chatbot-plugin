
export const messageService = {
  getSuggestionMessage,
  getPayloadCardMessage,
  getPayloadListMessage,
  getPayloadButtonMessage,
  getTextMessage,
  getPayloadVideoMessage,
  getImageMessage,
  getFormMessage
}

function getSuggestionMessage(message) {
  var qrMsg = {
    type: 'text',
    author: 'support',
    data: { text: message.quickReplies.title },
    suggestions: message.quickReplies.quickReplies
  }
  return qrMsg
}

function getPayloadCardMessage(message) {
  // Payload Version
  var elements = message.payload.facebook.attachment.payload.elements
  var templateType = message.payload.facebook.attachment.payload.template_type

  var cardMsg =
    { type: 'card',
      author: 'support',
      data: {
        // text: 'No forget the story.',
        template_type: templateType,
        elements: elements }}
  return cardMsg
}

function getPayloadListMessage(message) {
  // Payload Version
  var payload = message.payload.facebook.attachment.payload
  // var topElementStyle = message.payload.facebook.attachment.payload.top_element_style

  var listMsg =
    { type: 'list',
      author: 'support',
      data: payload
    }
  return listMsg
}

function getPayloadButtonMessage(message) {
  var payload = message.payload.facebook.attachment.payload

  var buttonMsg = {
    type: 'button',
    author: 'support',
    data: payload
  }

  return buttonMsg
}

function getTextMessage(message) {
  var textMsgs = []
  message.text.text.forEach((item, index) => {
    // console.log(item)
    var textMsg = {
      type: 'text',
      author: 'support',
      data: { text: item }
    }
    textMsgs.push(textMsg)
  })

  return textMsgs
}

function getPayloadVideoMessage(message) {
  //   { type: 'video', author: `support`, data: { text: '...or not?', video: {title: 'Honda 2019', text: 'Hello', url: ''} } },
  //   { type: 'video', author: `support`, data: { text: `...or not?`, video: {title: 'Honda 2019', text: 'Hello', source: 'youtube', url: ''} } },
  var elements = message.payload.facebook.attchement.payload.elements

  var videoMsgs = []

  elements.forEach((item, index) => {
    var videoMsg = {
      type: 'video',
      author: 'support',
      data: {
        text: item.text ? item.text : null,
        media_type: item.media_type,
        source: item.source ? item.source : null,
        url: item.url
      }
    }
    videoMsgs.push(videoMsg)
  })

  return videoMsgs
}

function getImageMessage(message) {
  var imageMsg = {
    type: 'image',
    author: 'support',
    data: {
      elements:
        [
          { url: message.image.imageUri }
        ]
    }
  }
  return imageMsg
}

function getFormMessage(message) {
  var payload = message.payload.facebook.attachment.payload
  var formMessage = {
    type: 'form',
    author: 'support',
    data: payload
  }
  // {
  //   text: message.
  //   title: 'Hello',
  //   subtitle: 'World',
  //   buttons: [{title: 'Submit'}]
  // }
  return formMessage
}
