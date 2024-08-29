// import $socket from '@/api/socket-instance'
import { messageService } from '@/api/messageService'
import { create_UUID } from '@/api/tools'
import { updateUser, updatePageView } from '@/api/user'
import moment from 'moment-timezone'
import AdminAvatar from '@/assets/icons/admin.png'
import ChatAvatar from '@/assets/icons/bmbot.png'
import TelephoneIcon from '@/assets/icons/telephone.png'
import SalesIcon from '@/assets/icons/sales.png'
import ServiceIcon from '@/assets/icons/tools.png'
import PartsIcon from '@/assets/icons/parts.png'
// import ChatAvatar from '@/assets/icons/bmbot.png'
import { botAuthService } from '@/api/botAuthService'

const state = {
  version: '0.0.3',
  bot: {
    acceptFormat: 'text/image',
    dialogState: '',
    isInterrupting: false,
    isProcessing: false,
    intentName: '',
    message: 'Hi',
    responseCard: null,
    sessionAttributes: {},
    lastLoginTime: '',
    slots: {},
    cId: '',
    origin: '',
    authorized: false,
    smallPageOpen: true,
    muted: false,
    adminId: '',
    stage: 'dev'
  },
  dealer: {
    dealerName: 'Telle',
    supportName: 'Telle',
    latitude: 41.9022635,
    longitude: -87.6330796,
    defaultImage: 'https://telle-ai-resources.s3.us-east-2.amazonaws.com/telle_ai.png',
    titleImageUrl: ChatAvatar,
    imagePrefix: '',
    chatWindowTitle: 'Telle AI',
    botInitText: `Hi, this is Henri, how can I help you?`,
    botInitSuggestions: ['trade in', 'service', 'new car sales', 'used car sales', 'dealer information'],
    participants: [
      {
        id: 'support',
        name: 'Telle',
        imageUrl: ChatAvatar
      },
      {
        id: 'admin',
        name: 'John',
        imageUrl: AdminAvatar
      }
    ],
    workingHours: {
      contact: {
        title: 'Telle AI',
        address: '160 E Grand Ave, Chicago, IL-60611'
      },
      items: [
        { name: 'Phone Numbers',
          icon: TelephoneIcon,
          content: [
            { key: 'Main:', value: '(312) 500-8535' },
            { key: 'Sales:', value: '(312) 500-8535' },
            { key: 'Service:', value: '(312) 500-8535' },
            { key: 'Parts:', value: '(312) 500-8535' }
          ]
        },
        { name: 'Sales Hours',
          icon: SalesIcon,
          content: [
            { key: 'Mon - Thu:', value: '9:00 AM - 8:00 PM' },
            { key: 'Fri - Sat:', value: '9:00 AM - 6:00 PM' },
            { key: 'Sun:', value: 'Closed' }
          ]
        },
        { name: 'Service Hours',
          icon: ServiceIcon,
          content: [
            { key: 'Mon - Thu:', value: '7:00 AM - 7:00 PM' },
            { key: 'Fri - Sat:', value: '7:00 AM - 6:00 PM' },
            { key: 'Sun:', value: 'Closed' }
          ]
        },
        { name: 'Parts Hours',
          icon: PartsIcon,
          content: [
            { key: 'Mon - Thu:', value: '8:00 AM - 6:00 PM' },
            { key: 'Fri - Sat:', value: '8:00 AM - 5:00 PM' },
            { key: 'Sun:', value: 'Closed' }
          ]
        }
      ]
    }
  },
  isConnected: false,
  messageList: [],
  newMessagesCount: 0,
  isRunningEmbedded: false,
  isUiMinimized: false,
  alwaysScrollToBottom: true,
  isChatOpen: false,
  tokens: {},
  roomId: '',
  lastMessageTime: '',
  lastSentUid: '',
  showTypingIndicator: '',
  lastMessage: {}
  // lastMessage: { type: 'text', author: 'support', data: { text: `Hi, this is Henri, how can I help you?` }, suggestions: ['trade in', 'service', 'new car sales', 'used car sales', 'dealer information']}
}

// actions
const actions = {
  /** ********************************************************************************
   *
   *  Initialization Actions
   *
   *********************************************************************************/
  initCredentials({ commit, state }, credentials) {
    console.log(credentials)
  },

  getConfigFromParent({ commit, state }) {
    console.log('get config from parent')
  },

  initConfig({ commit, state }, configObj) {
    console.log(configObj)
  },

  initMessageList({ commit, state }) {
    console.log('Init Message List')
  },

  reInitBot({ commit, state }) {
    console.log('Reinit Bot')
  },

  initBotState({ commit, state }, data) {
    // console.log(localStorage.telleBot)
    commit('clearBot')
    // commit('resetBotState')
    var storage = window.localStorage.getItem(data)
    // console.log(storage)
    if (storage) {
      storage = JSON.parse(storage)
      // console.log(storage)
      if (storage.version !== '0.0.3') {
        console.log('reset variables')
        window.localStorage.removeItem(data)
        commit('resetBotState')
        // window.localStorage.setItem(data, JSON.stringify(state))
        botAuthService.isAuthorizedBot(data, 'telle.ai').then((resp) => {
          // console.log(resp)
          if (resp.data.isAuthorized) {
            commit('updateBotConfiguration', resp.data)
          }
        })
      } else {
        commit('initState', storage)
      }
    } else {
      botAuthService.isAuthorizedBot(data, 'telle.ai').then((resp) => {
        // console.log(resp)
        if (resp.data.isAuthorized) {
          commit('updateBotConfiguration', resp.data)
        }
      })
      // window.localStorage.setItem(data, JSON.stringify(state))
    }
  },

  initBot({ commit, state }, credential) {
    // messageService.aplayAudio()
    console.log('*****************init bot **********************')
    commit('updateBotID', credential)

    if (!state.bot.authorized) {
      commit('updateAuthorization')
    }

    if (credential.config !== undefined) {
      console.log(credential.config)
      commit('updateBotConfiguration', credential.config)
    }

    if (state.bot.lastLoginTime !== '') {
      var lastTime = moment.tz(state.bot.lastLoginTime, 'Europe/London')
      var curTime = moment.tz(Date.now(), 'Europe/London')
      var ms = moment(curTime, 'DD/MM/YYYY HH:mm:ss').diff(moment(lastTime, 'DD/MM/YYYY HH:mm:ss'))
      var d = moment.duration(ms)
      var h = Math.floor(d.asHours())
      var m = Math.floor(d.asMinutes())
      if (m >= 8) {
        commit('updateSmallPageStatus', true)
      }
      if (h >= 8) {
        commit('clearBot')
        var initMessage = { type: 'text', author: 'support', data: { text: state.dealer.botInitText }, suggestions: state.dealer.botInitSuggestions }
        commit('pushMessage', initMessage)
        commit('updateLastMessageTime')
      } else {
        commit('initLastMessage')
      }
    } else {
      commit('clearBot')
      var message = { type: 'text', author: 'support', data: { text: state.dealer.botInitText }, suggestions: state.dealer.botInitSuggestions }
      commit('pushMessage', message)
      commit('updateLastMessageTime')
    }
    commit('updateLastLoginTime')
  },

  /** *******************************************************************************
   *
   * Message List Actions
   *
   ********************************************************************************/
  pushMessage({ commit, state }, message) {
    commit('pushMessage', message)
  },

  pushErrorMessage({ commit, state }, text, dialogState = 'Failed') {
    commit('pushMessage', {
      type: 'bot',
      text,
      dialogState
    })
  },

  /** *********************************************************************
   *
   * UI and Parent Communication Actions
   *
   **********************************************************************/

  toggleIsUiMinimized({ dispatch, commit, state }) {
    commit('toggleIsUiMinimized')
    return dispatch(
      'sendMessageToParentWindow',
      { event: 'toggleMinimizeUi' }
    )
  },
  toggleIsLoggedIn({ dispatch, commit, state }) {
    commit('toggleIsLoggedIn')
    return dispatch(
      'sendMessageToParentWindow',
      { event: 'toggleIsLoggedIn' }
    )
  },

  /**
   * sendMessageToParentWindow will either dispatch an event using a CustomEvent to a handler when
   * the lex-web-ui is running as a VUE component on a page or will send a message via postMessage
   * to a parent window if an iFrame is hosting the VUE component on a parent page.
   * isRunningEmbedded === true indicates running withing an iFrame on a parent page
   * isRunningEmbedded === false indicates running as a VUE component directly on a page.
   * @param context
   * @param message
   * @returns {Promise<any>}
   */
  sendMessageToParentWindow({ state }, message) {
    if (!state.isRunningEmbedded) {
      return new Promise((resolve, reject) => {
        try {
          const myEvent = new CustomEvent('fullpagecomponent', { detail: message })
          document.dispatchEvent(myEvent)
          resolve(myEvent)
        } catch (err) {
          reject(err)
        }
      })
    }
    return new Promise((resolve, reject) => {
      const messageChannel = new MessageChannel()
      messageChannel.port1.onmessage = (evt) => {
        messageChannel.port1.close()
        messageChannel.port2.close()
        if (evt.data.event === 'resolve') {
          resolve(evt.data)
        } else {
          const errorMessage =
            `error in sendMessageToParentWindow: ${evt.data.error}`
          reject(new Error(errorMessage))
        }
      }
      window.parent.postMessage(
        message,
        state.config.ui.parentOrigin,
        [messageChannel.port2]
      )
    })
  },

  sendMessage({ commit, state, dispatch }, message) {
    var uid = create_UUID()
    var new_message = {
      type: 'UPDATE_MSG',
      dealerId: state.bot.cId,
      groupId: state.roomId,
      muted: state.bot.muted,
      // muted: state.bot.muted,
      message: message,
      user: 'customer',
      // adminId: state.bot.adminId,
      unread: 0,
      uid: uid
    }
    var curTime = moment.tz(Date.now(), 'Europe/London')
    var localTime = curTime.clone().tz('America/Chicago')
    var sysMessage = { type: 'system', author: 'support', data: { text: 'Sent: ', meta: localTime.format('MMMM Do, h:mm a') }}
    commit('pushMessage', sysMessage)

    commit('pushMessage', message)
    commit('updateLastSentUid', uid)
    console.log(new_message)
    this._vm.$socket.emit('customer_message', JSON.stringify(new_message))
    commit('showIndicator')
  },

  sendMetaInfo({ state, dispatch }, md) {
    var deviceDetail = 'Desktop'
    var message = {
      deviceType: 'Desktop',
      deviceDetail: deviceDetail,
      sessionId: state.roomId,
      dealerId: state.bot.cId,
      dealerName: state.dealer.dealerName
    }
    updateUser(message)
  },

  sendPageViewInfo({ state, dispatch }, data) {
    var message = {
      sessionId: state.roomId,
      page: data.data,
      dealerId: state.bot.cId,
      botClicked: data.clicked
    }
    updatePageView(message)
  },

  createLeads({ state, dispatch }, message) {
    // var new_message = {
    //   dealerId: localStorage.key,
    //   customer: message.customer,
    //   email: message.email,
    //   phone: message.phone,
    //   note: message.message
    // }
    // console.log(message)
    this._vm.$socket.emit('create_leads', JSON.stringify(message))
  },

  joinChatRoom({ commit, state }) {
    if (state.bot.cId) {
      var roomId = state.roomId
      if (roomId === undefined || roomId === '') {
        roomId = create_UUID()
        // localStorage.roomId = roomId
      }
      // console.log(roomId)
      var joinMessage = {
        'type': 'CLIENT_JOIN',
        'dealerId': state.bot.cId,
        'groupId': roomId,
        'user': 'customer',
        'online': true
      }
      this._vm.$socket.emit('client_join', JSON.stringify(joinMessage))

      // this._vm.$socket.emit('join', JSON.stringify({ username: 'user', room: roomId, from: 'mobile' }))
      commit('updateRoomID', roomId)
    }
  },

  SOCKET_RECEIVED_MESSAGE({ commit }, message) {
    console.log(message)
  },

  SOCKET_CLOSE_CHAT({ commit, state }, message) {
    console.log(message)
    var parsedMessage = JSON.parse(message)
    if (parsedMessage.dealerId === state.bot.cId) {
      this._vm.$socket.close()
      commit('closeSocket')
    }
  },
  /** ******************************************************
   *
   *Socket Actions
   *
   *******************************************************/
  SOCKET_ON_CONNECTION({ commit, state }, message) {
    console.log('PC Connected' + message)
    // var roomId = state.roomId
    // if (roomId === undefined || roomId === '') {
    //   roomId = create_UUID()
    //   // localStorage.roomId = roomId
    // }
    // // console.log(roomId)
    // var joinMessage = {
    //   'type': 'CLIENT_JOIN',
    //   'dealerId': state.bot.cId,
    //   'groupId': roomId,
    //   'user': 'customer',
    //   'online': true
    // }
    // this._vm.$socket.emit('client_join', JSON.stringify(joinMessage))

    // // this._vm.$socket.emit('join', JSON.stringify({ username: 'user', room: roomId, from: 'mobile' }))
    // commit('updateRoomID', roomId)
  },

  SOCKET_MUTE_STATE({ commit, state }, message) {
    console.log(message)
    var parsedMessage = JSON.parse(message)
    if (parsedMessage.dealerId === state.bot.cId) {
      commit('updateMuteState', parsedMessage)
    }
  },

  SOCKET_CHAT_MESSAGE({ commit, state }, message) {
    console.log(message)

    var parsedMessage = JSON.parse(message)
    if (parsedMessage.dealerId === state.bot.cId) {
      commit('updateLastMessageTime')

      var received_messages = parsedMessage.message
      var richMessage = false
      var texts = []
      var curTime = moment.tz(Date.now(), 'Europe/London')
      var localTime = curTime.clone().tz('America/Chicago')
      var sysMessage = { type: 'system', author: 'support', data: { text: 'Received: ', meta: localTime.format('MMMM Do, h:mm a') }}
      if (parsedMessage.user !== 'bot') {
        commit('hideIndicator')
        if (parsedMessage.user !== 'customer') {
          commit('pushMessage', sysMessage)
          received_messages.author = 'admin'
          commit('pushMessage', received_messages)
        } else if (state.lastSentUid !== parsedMessage.uid) {
          sysMessage = { type: 'system', author: 'support', data: { text: 'Sent: ', meta: localTime.format('MMMM Do, h:mm a') }}
          commit('pushMessage', sysMessage)

          received_messages.author = 'me'
          commit('pushMessage', received_messages)
          commit('showIndicator')
        }
      } else {
        commit('hideIndicator')
        sysMessage = { type: 'system', author: 'support', data: { text: 'Received: ', meta: localTime.format('MMMM Do, h:mm a') }}
        commit('pushMessage', sysMessage)

        received_messages.forEach((item, index) => {
          console.log(item)
          if ('platform' in item && item['platform'].toLowerCase() === 'facebook') {
            if ('quickReplies' in item) {
            // Quick Reply

              var qr_msg = {
                type: 'text',
                author: 'support',
                data: { text: item.quickReplies.title },
                suggestions: item.quickReplies.quickReplies
              }
              commit('pushMessage', qr_msg)
              richMessage = true
            // If quick reply, only one message allowed.
            } else if ('text' in item) {
              if (index === 0) {
                var textMsgs = messageService.getTextMessage(item)
                // console.log(textMsgs)
                textMsgs.forEach((textMsg, index) => {
                  commit('pushMessage', textMsg)
                })
              // richMessage = true
              } else {
                texts.push({ text: item, index: index })
              }
            } else if ('payload' in item) {
              var msgType = item.payload.facebook.attachment.payload.template_type
              switch (msgType) {
                case 'list':
                  var listMsg = messageService.getPayloadListMessage(item)
                  commit('pushMessage', listMsg)
                  richMessage = true
                  break
                case 'generic':
                  var cardMsg = messageService.getPayloadCardMessage(item)
                  commit('pushMessage', cardMsg)
                  richMessage = true
                  break
                case 'button':
                  var buttonMsg = messageService.getPayloadButtonMessage(item)
                  commit('pushMessage', buttonMsg)
                  richMessage = true
                  break
                case 'media':
                  var videoMsgs = messageService.getPayloadVideoMessage(item)
                  videoMsgs.forEach((videoMsg, index) => {
                    commit('pushMessage', videoMsg)
                  })
                  richMessage = true
                  break
                case 'form':
                  var formMsg = messageService.getFormMessage(item)
                  commit('pushMessage', formMsg)
                  richMessage = true
                  break
                default:
                  break
              }
            } else if ('image' in item) {
              var imageMsg = messageService.getImageMessage(item)
              commit('pushMessage', imageMsg)
              richMessage = true
            }
          } else {
            if ('text' in item) {
              texts.push({ text: item, index: index })
            }
          }
        })
      }

      if (!richMessage) {
        texts.forEach((item, index) => {
          var textMsgs = messageService.getTextMessage(item.text)
          textMsgs.forEach((textMsg, index) => {
            commit('pushMessage', textMsg)
          })
        })
      }
    }
    // var ackMessage = { type: 'ack', author: `support`, data: { text: `Sent`, meta: new Date().toLocaleString() } }
    // commit('pushMessage', ackMessage)
    // commit('pushMessage', JSON.parse(message))
  },

  openChat({ commit, state }) {
    commit('openChat')
  },

  closeChat({ commit }) {
    commit('closeChat')
    window.parent.postMessage(JSON.stringify({ key: 'close' }), '*')
  }
}

// mutations
const mutations = {
  /**
  * used to track the expand/minimize status of the window when
  * running embedded in an iframe
  */
  toggleIsUiMinimized(state) {
    state.isUiMinimized = !state.isUiMinimized
  },

  /**
   * Update tokens from cognito authentication
   * @param state
   * @param tokens
   */
  setTokens(state, tokens) {
    if (tokens) {
      state.tokens.idtokenjwt = tokens.idtokenjwt
      state.tokens.accesstokenjwt = tokens.accesstokenjwt
      state.tokens.refreshtoken = tokens.refreshtoken
      state.lex.sessionAttributes.idtokenjwt = tokens.idtokenjwt
      state.lex.sessionAttributes.accesstokenjwt = tokens.accesstokenjwt
      state.lex.sessionAttributes.refreshtoken = tokens.refreshtoken
    } else {
      state.tokens = undefined
    }
  },

  initState(state, data) {
    for (var key in state) {
      // console.log(key)
      if (data[key]) {
        if (typeof (data[key]) === Object) {
          for (var subKey in data[key]) {
            state[key][subKey] = data[key][subKey]
          }
        } else {
          state[key] = data[key]
        }
      }
    }
    this.state.bmbot.imagePrefix = state.dealer.imagePrefix
  },
  /**
   * Push new message into messages array
   */
  pushMessage(state, message) {
    console.log(message)
    state.messageList.push(message)
    if (message.author !== 'me' && message.type !== 'system') {
      state.lastMessage = message
      if (state.isChatOpen) {
        state.newMessagesCount = 0
      } else {
        state.newMessagesCount += 1
      }
      // console.log(state.newMessagesCount)
      window.parent.postMessage(JSON.stringify({ key: 'newMessage', value: state.newMessagesCount }), '*')
    }
    // localStorage.setItem('telleBot', JSON.stringify(state))
    window.localStorage.setItem(state.bot.cId, JSON.stringify(state))
    // window.parent.postMessage(JSON.stringify({key:'newMessage', value: state.newMessagesCount > 1?1:state.newMessagesCount}), '*')
  },

  openChat(state) {
    state.isChatOpen = true
    state.newMessagesCount = 0
  },

  closeChat(state) {
    state.newMessagesCount = 0
  },

  updateRoomID(state, roomId) {
    state.roomId = roomId
    window.localStorage.setItem(state.bot.cId, JSON.stringify(state))
  },
  updateLastMessageTime(state) {
    state.lastMessageTime = Date.now()
  },
  resetMessageList(state) {
    state.messageList = []
  },
  updateLastSentUid(state, uid) {
    state.lastSentUid = uid
  },
  showIndicator(state) {
    state.showTypingIndicator = 'bot'
  },
  hideIndicator(state) {
    state.showTypingIndicator = ''
  },
  initLastMessage(state) {
    state.lastMessage = { type: 'text', author: 'support', data: { text: state.dealer.botInitText }, suggestions: state.dealer.botInitSuggestions }
  },
  clearBot(state) {
    state.messageList = []
    state.newMessagesCount = 0
    state.lastMessage = {}
    state.lastMessageTime = ''
  },
  resetBotState(state) {
    state.version = '0.0.3'
    // var key = state.bot.cId
    state.bot = {
      acceptFormat: 'text/image',
      dialogState: '',
      isInterrupting: false,
      isProcessing: false,
      intentName: '',
      message: 'Hi',
      responseCard: null,
      sessionAttributes: {},
      lastLoginTime: '',
      slots: {},
      cId: '',
      origin: '',
      authorized: false,
      smallPageOpen: true,
      muted: false,
      adminId: '',
      stage: 'dev'
    }
    // window.localStorage.setItem(key, JSON.stringify(state))
  },
  updateBotID(state, credential) {
    state.bot.cId = credential.key
    state.bot.origin = credential.origin
    window.localStorage.setItem(state.bot.cId, JSON.stringify(state))
  },
  updateSmallPageStatus(state, flag) {
    state.bot.smallPageOpen = flag
    window.localStorage.setItem(state.bot.cId, JSON.stringify(state))
  },
  updateAuthorization(state) {
    state.bot.authorized = true
  },
  updateLastLoginTime(state) {
    state.bot.lastLoginTime = Date.now()
    window.localStorage.setItem(state.bot.cId, JSON.stringify(state))
  },
  updateMuteState(state, data) {
    state.bot.muted = data.muted
    state.bot.adminId = data.adminId
  },
  closeSocket(state) {
    state.bot.muted = false
    state.bot.adminId = ''
  },
  updateBotConfiguration(state, config) {
    state.dealer.dealerName = config.dealer_name
    state.dealer.latitude = config.dealer_latitude
    state.dealer.longitude = config.dealer_longitude
    state.dealer.defaultImage = config.dealer_default_image
    state.dealer.titleImageUrl = config.dealer_title_image
    state.dealer.imagePrefix = config.dealer_image_prefix
    state.dealer.chatWindowTitle = config.dealer_chat_window_title

    this.state.bmbot.imagePrefix = config.dealer_image_prefix

    state.dealer.botInitText = config.bot_init_text
    state.dealer.botInitSuggestions = []

    config.bot_init_suggestions.split(',').forEach(item => {
      state.dealer.botInitSuggestions.push(item)
    })

    state.dealer.supportName = config.support_name
    state.dealer.participants = []
    state.dealer.participants.push({
      id: 'support',
      name: config.support_name,
      imageUrl: config.support_image
    })
    state.dealer.participants.push({
      id: 'admin',
      name: config.admin_name,
      imageUrl: config.admin_image
    })

    var phones = []
    config.phone_numbers.split(',').forEach(item => {
      var vals = item.split('|')
      phones.push({
        key: vals[0],
        value: vals[1]
      })
    })

    var salesHours = []
    config.sales_hours.split(',').forEach(item => {
      var vals = item.split('|')
      salesHours.push({
        key: vals[0],
        value: vals[1]
      })
    })

    var serviceHours = []
    config.service_hours.split(',').forEach(item => {
      var vals = item.split('|')
      serviceHours.push({
        key: vals[0],
        value: vals[1]
      })
    })

    var partsHours = []
    config.parts_hours.split(',').forEach(item => {
      var vals = item.split('|')
      partsHours.push({
        key: vals[0],
        value: vals[1]
      })
    })
    state.dealer.workingHours = {
      contact: {
        title: config.dealer_name,
        address: config.dealer_address
      },
      items: [
        { name: 'Phone Numbers',
          icon: TelephoneIcon,
          content: phones
        },
        { name: 'Sales Hours',
          icon: SalesIcon,
          content: salesHours
        },
        { name: 'Service Hours',
          icon: ServiceIcon,
          content: serviceHours
        },
        { name: 'Parts Hours',
          icon: PartsIcon,
          content: partsHours
        }
      ]
    }
    console.log(state.dealer)
    window.localStorage.setItem(state.bot.cId, JSON.stringify(state))
  }

}

export const telleChat = {
  namespaced: true,
  state,
  //   getters,
  actions,
  mutations
}
