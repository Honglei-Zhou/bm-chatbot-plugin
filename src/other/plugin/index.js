import './bmbot.less'
// import { config } from '@/api/config'
// import { type } from 'os'

const toChatBtn = document.createElement('div')
toChatBtn.setAttribute('id', 'bmbot-pane-btn')

const chatIcon = document.createElement('div')
chatIcon.setAttribute('class', 'bm-icon icon-talk')
// chatIcon.setAttribute('class', 'icon-talk')

const messageCount = document.createElement('div')
messageCount.setAttribute('class', 'sc-new-messsages-count')
messageCount.innerText = 0

toChatBtn.appendChild(chatIcon)
toChatBtn.appendChild(messageCount)

const toChatPane = document.createElement('div')
toChatPane.setAttribute('id', 'bmbot-pane-chat')

const toChatPaneSmall = document.createElement('div')
toChatPaneSmall.setAttribute('id', 'bmbot-pane-chat-small')

const toChatImg = document.createElement('img')
toChatImg.setAttribute('class', 'chat-img')

// let notifySound=document.createElement('audio')
// notifySound.setAttribute('id','notifyAudio')
let endpointUrl = `http://localhost:9900/bmchat/index.html#/?cId=${window.bmbot.obj.cId}`
let mobileUrl = `http://localhost:9901/bmchat/index.html#/?cId=${window.bmbot.obj.cId}`

// const stage = 'dev'

if (process.env.NODE_ENV === 'dev') {
  endpointUrl = `https://telle-ai-csdn.s3.amazonaws.com/dev/desktop/views/bmchat/index.html#/?cId=${window.bmbot.obj.cId}`
  mobileUrl = `https://telle-ai-csdn.s3.amazonaws.com/dev/mobile/mobileviews/bmchat/index.html#/?cId=${window.bmbot.obj.cId}`
} else if (process.env.NODE_ENV === 'prod') {
  endpointUrl = `https://telle-ai-csdn.s3.amazonaws.com/v1/desktop/views/bmchat/index.html#/?cId=${window.bmbot.obj.cId}`
  mobileUrl = `https://telle-ai-csdn.s3.amazonaws.com/v1/mobile/mobileviews/bmchat/index.html#/?cId=${window.bmbot.obj.cId}`
}

const soundUrl = 'https://blissmotorsimages.s3.us-east-2.amazonaws.com/notification.mp3'

const clientWidth = document.documentElement.getBoundingClientRect().width
const mobileSrc = mobileUrl
const pcSrc = endpointUrl

// if (process.env.NODE_ENV === 'production') {
//   mobileSrc = mobileUrl
//   pcSrc = endpointUrl
// }

let innerText = ''

// notifySound.setAttribute('src', soundUrl)

// Suppose > 640 as PC
if (clientWidth > 700) {
  innerText = `<iframe id="iframeT2L12B07" src="${pcSrc}" frameborder="0" allowtransparency="no" scrolling="no" cId="${window.bmbot.obj.cId}"></iframe>`
  toChatPane.setAttribute('class', 'pc')
  toChatBtn.setAttribute('class', 'pc')
  toChatPaneSmall.setAttribute('class', 'pc')
} else {
  innerText = `<iframe id="iframeT2L12B07" src="${mobileSrc}" frameborder="0" allowtransparency="no" scrolling="no" cId="${window.bmbot.obj.cId}"></iframe>`
  toChatPane.setAttribute('class', 'mobile')
  toChatBtn.setAttribute('class', 'mobile')
  toChatPaneSmall.setAttribute('class', 'mobile')
}

toChatPane.innerHTML = innerText
toChatPaneSmall.innerHTML = innerText

document.body.appendChild(toChatBtn)
document.body.appendChild(toChatPane)
document.body.appendChild(toChatPaneSmall)

const iframe = document.getElementById('iframeT2L12B07')

const togglePane = function() {
  toChatPane.style.display = getComputedStyle(toChatPane).display === 'block' ? 'none' : 'block'
  toChatBtn.style.display = getComputedStyle(toChatBtn).display === 'block' ? 'none' : 'block'
  toChatPaneSmall.style.display = getComputedStyle(toChatPaneSmall).display === 'block' ? 'none' : 'none'
}

const toggleChatPane = function() {
  // toChatPaneSmall.style.display='none'
  var u = window.location.href
  iframe.contentWindow.postMessage(JSON.stringify({ key: 'openChatWindow', data: u }), '*')
  togglePane()
}

function playSound(sound) {
  if (sound) {
    var audio = new Audio(sound)
    audio.play()
  }
}

// Click to chat
function clickToChatBtn() {
  toChatBtn.addEventListener('click', function() {
    // toChatPaneSmall.style.display='none'
    var u = window.location.href
    iframe.contentWindow.postMessage(JSON.stringify({ key: 'openChatWindow', data: u }), '*')
    togglePane()
    messageCount.style.display = 'none'
    toChatPaneSmall.style.display = 'none'
  }, false)
  toChatBtn.addEventListener('mouseenter', function() {
    var u = window.location.href
    if (toChatPane.style.display === 'none' && toChatPaneSmall.style.display === 'none') {
      iframe.contentWindow.postMessage(JSON.stringify({ key: 'updateSmallWindow', data: u }), '*')
      toChatPaneSmall.style.display = 'block'
    }
  })
  toChatBtn.addEventListener('mouseleave', function() {
    var u = window.location.href
    if (toChatPane.style.display === 'none' && toChatPaneSmall.style.display === 'block') {
      iframe.contentWindow.postMessage(JSON.stringify({ key: 'closeSmallWindow', data: u }), '*')
      toChatPaneSmall.style.display = 'none'
    }
  })
}

clickToChatBtn()

setTimeout(function() {
  iframe.contentWindow.postMessage(JSON.stringify({ key: 'getCId', data: window.bmbot.obj.cId }), '*')
}, 5000)

function showChatPane(chatPaneOpen, smallChatPaneOpen) {
  if (chatPaneOpen) {
    toChatBtn.style.display = 'none'
    toChatPaneSmall.style.display = 'none'
    toChatPane.style.display = 'block'
    messageCount.style.display = 'none'
  } else {
    toChatBtn.style.display = 'block'
    toChatPane.style.display = 'none'
    messageCount.style.display = 'none'
    // toChatPaneSmall.style.display = 'block'
    toChatPaneSmall.style.display = smallChatPaneOpen ? 'block' : 'none'
    // if (smallChatPaneOpen) {
    //   iframe.contentWindow.postMessage(JSON.stringify({ key: 'updateSmallWindow', data: true }), '*')
    // }
  }
}

// let updateMessageCount = function (count) {
//   if(count===0){
//     messageCount.style.display='none'
//   }else if(getComputedStyle(toChatBtn).display==='block'){
//     messageCount.innerText = count
//     messageCount.style.display = 'flex'
//   }
// }

const updateMessageCount = function(count) {
  if (getComputedStyle(toChatBtn).display === 'none') {
    messageCount.style.display = 'none'
  } else if (getComputedStyle(toChatPaneSmall).display === 'none') {
    messageCount.innerText = count
    messageCount.style.display = 'flex'
  }
}

var stringConstructor = 'test'.constructor
var arrayConstructor = [].constructor
var objectConstructor = {}.constructor

function whatIsIt(object) {
  if (object === null) {
    return 'null'
  } else if (object === undefined) {
    return 'undefined'
  } else if (object.constructor === stringConstructor) {
    return 'String'
  } else if (object.constructor === arrayConstructor) {
    return 'Array'
  } else if (object.constructor === objectConstructor) {
    return 'Object'
  } else {
    return 'unknown'
  }
}

function checkUrl() {
  var q = null
  function refresh() {
    var u = window.location.href
    iframe.contentWindow.postMessage(JSON.stringify({ key: 'updatePageView', data: u }), '*')
  }
  function x() { clearTimeout(q); a() }
  function a() { q = setTimeout(refresh, 1000) }

  // window.onload = x
  document.body['onload'] = x
}

checkUrl()

// Receive message from chat window
window.addEventListener('message', function(e) {
  // console.log(e)
  if (e && e.data && whatIsIt(e.data) === 'String') {
    const data = JSON.parse(e.data)
    const key = data.key
    if (key === 'close') {
      togglePane()
      var u = window.location.href
      iframe.contentWindow.postMessage(JSON.stringify({ key: 'closeChatWindow', data: u }), '*')
    }
    if (key === 'initialCId') {
      iframe.contentWindow.postMessage(JSON.stringify({ key: 'initialCId', data: window.bmbot.obj.cId }), '*')
      // iframe.contentWindow.postMessage(JSON.stringify({ key: 'getCId', data: window.location }), '*')
    }
    if (key === 'getCId') {
      iframe.contentWindow.postMessage(JSON.stringify({ key: 'getCId', data: window.bmbot.obj.cId }), '*')
      // iframe.contentWindow.postMessage(JSON.stringify({ key: 'getCId', data: window.location }), '*')
    }
    if (key === 'newMessage') {
      const count = data.value
      // let count = 1
      // playSound(soundUrl)
      updateMessageCount(count)
    }
    if (key === 'toggleLeft') {
      // toChatPane.style.width = getComputedStyle(toChatPane).width === '960px'?'480px':'960px'
      toChatPane.style.width = toChatPane.style.width === '668px' ? '334px' : '668px'
      // this.console.log(toChatPane.style.width === '668px')
    }

    if (key === 'closeChatPaneSmall') {
      toChatPaneSmall.style.display = 'none'
      iframe.contentWindow.postMessage(JSON.stringify({ key: 'closeSmallWindow', data: u }), '*')
    }

    if (key === 'openChatPaneSmall') {
      toChatPaneSmall.style.display = 'block'
    }

    if (key === 'openChatPane') {
      toggleChatPane()
    }

    if (key === 'initChatButton') {
      showChatPane(false, true)
    }

    if (key === 'initChatButtonExt') {
      showChatPane(false, false)
    }
  }
}, false)

