<template>
  <!-- <div :class="{opened: isSmallChatOpen, closed: !isSmallChatOpen}" class="small-chat-block"> -->
  <div :class="{opened: isSmallChatOpen, closed: !isSmallChatOpen}" :key="randomKey" class="small-chat-block">
    <div class="small-chat-window-welcome">
      <div class="small-chat-window-welcome-profile">
        <img :src="iconUrl" class="small-chat-window-welcome-profile-icon">
        <div class="small-chat-window-welcome-profile-text">
          <!-- <div v-for="item in supportName" :key="item.key" class="small-chat-name">{{ item.value }}</div>
          <div v-for="item in dealerName" :key="item.key" class="small-chat-title">{{ item.value }}</div> -->
          <div class="small-chat-name">{{ dealer.supportName }}</div>
          <div class="small-chat-title">{{ dealer.dealerName }}</div>
        </div>
        <div class="small-chat-window-welcome-close-icon" @click="closeSmallPane">
          <img :src="closeUrl" style="width: 10px; height: 10px; margin-top:10px;">
        </div>
      </div>
      <div class="small-chat-window-welcome-message">
        <div v-if="getLastMessage.type === 'text'" class="small-chat-window-welcome-message-text" @click="openChatPane">
          {{ getLastMessage.data.text }}
        </div>
        <div v-else class="small-chat-window-welcome-message-text" @click="openChatPane">
          {{ getLastMessage }}
        </div>
        <Suggestions :small="true" :suggestions="getSuggestions" :colors="colors" @sendSuggestion="_submitSuggestion"/>
      </div>
    </div>
    <form :style="{background: colors.userInput.bg}" class="small-chat-window-input">
      <div
        ref="userInput"
        :placeholder="placeholder"
        :style="{color: colors.userInput.text}"
        role="button"
        tabIndex="0"
        contentEditable="true"
        class="small-chat-window-input--text"
        @keydown="handleKey"
      />
      <div class="small-chat-window-input--buttons">
        <div class="small-chat-window-input--button">
          <SendIcon :on-click="_submitText" :color="colors.userInput.text" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import SendIcon from '@/components/BotUI/SendIcon'
import IconURL from '@/assets/icons/bmbot.png'
import CloseURL from '@/assets/icons/close-icon.png'
import Suggestions from '@/components/BotUI/SuggestionsSmall'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'SmallPage',
  components: {
    Suggestions,
    SendIcon
  },
  props: {
    colors: {
      type: Object,
      required: true
    },
    smallChatOpen: {
      type: Boolean,
      required: true
    }
    // dealerName: {
    //   type: String,
    //   required: true
    // },
    // supportName: {
    //   type: String,
    //   required: true
    // }
  },
  data() {
    return {
      isSmallChatOpen: true,
      placeholder: 'Enter your message',
      messageStyling: true, // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown),
      iconUrl: IconURL,
      closeUrl: CloseURL
    }
  },
  computed: {
    ...mapState('telleChat', ['lastMessage', 'dealer']),
    getLastMessage() {
      if (this.lastMessage.type === 'text') {
        return this.lastMessage
      } else if (this.lastMessage.type === 'card' || this.lastMessage.type === 'image' || this.lastMessage.type === 'video' || this.lastMessage.type === 'button') {
        return 'You have a new incoming message!'
      } else {
        return { type: 'text', author: 'support', data: { text: this.dealer.botInitText }, suggestions: this.dealer.botInitSuggestions }
      }
    },
    getSuggestions() {
      var message = this.getLastMessage
      return message.suggestions ? message.suggestions : []
    }
  },
  created() {
    console.log(this.isSmallChatOpen)
  },
  mounted() {
    this.show()
    console.log('mounted')
  },
  methods: {
    ...mapActions('telleChat', ['sendMessage', 'sendMetaInfo']),
    show() {
      this.isSmallChatOpen = true
    },
    hide() {
      this.isSmallChatOpen = false
      this.$store.commit('telleChat/updateSmallPageStatus', false)
    },
    randomKey() {
      var length = 5
      var result = ''
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      var charactersLength = characters.length
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
      }
      return result
    },
    _submitText(event) {
      const text = this.$refs.userInput.textContent
      if (text && text.length > 0) {
        //   this.hide()
        //   window.parent.postMessage(JSON.stringify({key:'closeChatPaneSmall'}),'*')
        window.parent.postMessage(JSON.stringify({ key: 'openChatPane' }), '*')
        var message = { author: 'me', type: 'text', data: { text: text }}
        this.sendMessage(message)
        this.$refs.userInput.innerHTML = ''
      }
    },
    handleKey(event) {
      if (event.keyCode === 13 && !event.shiftKey) {
        this._submitText(event)
        event.preventDefault()
      }
    },
    closeSmallPane() {
      // this.hide()
      window.parent.postMessage(JSON.stringify({ key: 'closeChatPaneSmall' }), '*')
      // this.closeChat()
      // this.$store.commit('telleChat/closeChat')
    },
    openChatPane() {
      // this.hide()
      window.parent.postMessage(JSON.stringify({ key: 'openChatPane' }), '*')
    },
    _submitSuggestion(suggestion) {
    //   this.hide()
    //   window.parent.postMessage(JSON.stringify({key:'closeChatPaneSmall'}),'*')
      window.parent.postMessage(JSON.stringify({ key: 'openChatPane' }), '*')
      var message = { author: 'me', type: 'text', data: { text: suggestion }}
      this.sendMessage(message)
      // this.sendItem(suggestion)
    }

  }
}
</script>

<style scoped>
  .small-chat-block{
    position: absolute;
    right: 0px;
    bottom: 0px;
    width: 280px;
    height: 200px;
    display: flex;
    flex-direction: column;
    /* box-shadow: 0 20px 20px 0 rgba(26, 34, 40, 0.19); */
  }

  .closed {
  opacity: 0;
  visibility: hidden;
}

  .small-chat-window-welcome{
    height: 150px;
    display: flex;
    z-index: 10;
    flex-direction: column;
    background-color: white;
    border-radius: 9px;
    border: 1px solid rgba(0,0,0,0.1);
    overflow: hidden;
  }

  .small-chat-window-welcome-profile{
    height: 25%;
    display: flex;
  }

  .small-chat-window-welcome-profile-icon{
    margin: 15px 5px 15px 40px;
    width: 30px;
    height: 30px;
  }

  .small-chat-window-welcome-close-icon {
    position: absolute;
    right: 10px;
    top: 10px;
    background-color: #1f95e7;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    opacity: 0.5;
  }

  .small-chat-window-welcome-close-icon:hover {
    opacity: 1;
  }

  .small-chat-window-welcome-profile-text{
    margin: 10px 10px;
    font-size: 14px;
    text-align: left;
  }

  .small-chat-name {
    font-size: 14px;
  }

  .small-chat-title {
    font-size: 12px;
    color: rgba(0,0,0,0.4);
  }

  .small-chat-window-welcome-message{
    padding: 3px 20px;
    text-align: left;
  }

  .small-chat-window-welcome-message-text{
    margin: 10px 0px;
    max-height: 80px;
    font-size: 14px;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .small-chat-window-welcome-message-text:hover{
    cursor: pointer;
  }

  .small-chat-window-input {
    height: 40px;
    margin:2px;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 9px;
    background-color: rgba(0,0,0,0.1);
    display: flex;
  }
  .small-chat-window-input--text {
    width: 75%;
    height: 100%;
    padding: 10px 15px;
    resize: none;
    border: none;
    outline: none;
    box-sizing: border-box;
    font-size: 15px;
    font-weight: 400;
    line-height: 1.33;
    white-space: pre-wrap;
    word-wrap: break-word;
    color: #565867;
    -webkit-font-smoothing: antialiased;
    overflow: hidden;
    text-align: left;
  }

  .small-chat-window-input--text:empty:before {
    content: attr(placeholder);
    display: block;
    filter: contrast(15%);
    outline: none;
  }

  .small-chat-window-input--buttons{
    width: 15%;
    padding: 10px 15px;
  }
</style>
