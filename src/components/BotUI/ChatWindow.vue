<template>
  <div
    :class="{opened: isOpen, closed: !isOpen}"
    class="sc-chat-window"
  >
    <BotHeader
      :title="dealer.chatWindowTitle"
      :image-url="dealer.titleImageUrl"
      :on-close="onClose"
      :colors="colors"
      :disable-user-list-toggle="disableUserListToggle"
      @userList="handleUserListToggle"
    />
    <UserList
      v-if="showUserList"
      :participants="dealer.participants"
    />
    <MessageList
      v-if="!showUserList"
      ref = "messages"
      :messages="messages"
      :participants="dealer.participants"
      :show-typing-indicator="showTypingIndicator"
      :colors="colors"
      :always-scroll-to-bottom="alwaysScrollToBottom"
      :message-styling="messageStyling"
      @scrollToTop="$emit('scrollToTop')"
      @sendItem="sendItem"
    />
    <DateTimePicker
      ref="timePicker"
      @sendItem="sendItem"
      @closeDateTimePicker="closeDateTimePicker"
    />
    <UserInput
      v-if="!showUserList"
      ref="userInput"
      :show-emoji="showEmoji"
      :on-submit="onUserInputSubmit"
      :suggestions="getSuggestions()"
      :show-file="showFile"
      :placeholder="placeholder"
      :colors="colors"
      @onType="$emit('onType')"
      @toggleDateTimePicker="toggleDateTimePicker"
    />
    <ToolBar
      v-if="!showUserList && showToolBar"
      ref="toolBar"
      :show-emoji="showEmoji"
      :on-submit="onUserInputSubmit"
      :suggestions="getSuggestions()"
      :show-file="showFile"
      :placeholder="placeholder"
      :handle-bot-page-toggle="handleBotPageToggle"
      :colors="colors"
      @onType="$emit('onType')"
    />
    <!-- <div v-show="showPreview" class="image-preview-box">
      <div class="image-preview">
        <vue-preview v-if="showPreview" ref="vuePreview" v-click-outside="onClickOutside" :slides="slideImages" @close="handleClose"></vue-preview>
        <vue-preview v-else ref="vuePreview" :slides="slideImages" @close="handleClose"></vue-preview>
      </div>
    </div> -->
    <VueGallery v-show="showPreview" :images="slideImages" :index="index" @close="handleClose"/>
  </div>
</template>

<script>
import BotHeader from '@/components/BotUI/Header.vue'
import MessageList from '@/components/BotUI/MessageList.vue'
import UserInput from '@/components/BotUI/UserInput.vue'
import UserList from '@/components/BotUI/UserList.vue'
import ToolBar from '@/components/BotUI/ToolBar'
import VueGallery from 'vue-gallery'
import DateTimePicker from '@/components/BotUI/DateTimePicker'
import { mapState } from 'vuex'

export default {
  name: 'Chat',
  components: {
    BotHeader,
    MessageList,
    UserInput,
    UserList,
    ToolBar,
    VueGallery,
    DateTimePicker
  },
  props: {
    showEmoji: {
      type: Boolean,
      default: false
    },
    showFile: {
      type: Boolean,
      default: false
    },
    // participants: {
    //   type: Array,
    //   required: true
    // },
    // title: {
    //   type: String,
    //   required: true
    // },
    // titleImageUrl: {
    //   type: String,
    //   default: ''
    // },
    onUserInputSubmit: {
      type: Function,
      required: true
    },
    handleBotPageToggle: {
      type: Function,
      required: true
    },
    onClose: {
      type: Function,
      required: true
    },
    messageList: {
      type: Array,
      default: () => []
    },
    isOpen: {
      type: Boolean,
      default: () => false
    },
    placeholder: {
      type: String,
      default: 'Write a reply'
    },
    showTypingIndicator: {
      type: String,
      required: true
    },
    colors: {
      type: Object,
      required: true
    },
    alwaysScrollToBottom: {
      type: Boolean,
      required: true
    },
    messageStyling: {
      type: Boolean,
      required: true
    },
    disableUserListToggle: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showUserList: false,
      showPreview: false,
      showToolBar: true,
      slideImages: [],
      // slideImages: ['https://s3.us-east-2.amazonaws.com/blissmotorsimages/dthonda/images/thumbs/big/91f18ac9de4cfff44b784142b13e56f86d859692.jpg'],
      // vcoConfig: {
      //   handler: this.handler,
      //   middleware: this.middleware,
      //   events: ['dblclick', 'click'],
      //   // Note: The default value is true, but in case you want to activate / deactivate
      //   //       this directive dynamically use this attribute.
      //   isActive: true
      // },
      index: null
    }
  },
  computed: {
    ...mapState('telleChat', ['dealer']),
    messages() {
      const messages = this.messageList
      return messages
    }
  },
  created() {
    console.log('---------Chat Bot----------')
    console.log(this.dealer.participants)
  },
  methods: {
    handleUserListToggle(showUserList) {
      this.showUserList = showUserList
    },
    getSuggestions() {
      return this.messages.length > 0 ? this.messages[this.messages.length - 1].suggestions : []
    },
    sendItem(item) {
      this._send(item)
    },
    _send(item) {
      this.$refs.userInput._submitSuggestion(item.payload)
    },
    scrollDown() {
      this.$refs.messages.scrollDown()
    },
    handleClose(event) {
      console.log('Image close clicked')
      // this.showPreview = false
      this.index = null
      console.log(event)
    },
    openPreview(message) {
      this.slideImages = message
      // message.images.forEach(item => {
      //     this.slideImages.push(item)
      //   })
      this.index = 0
    },
    toggleDateTimePicker(isActive) {
      if (isActive) {
        this.$refs.timePicker.show()
      } else {
        this.$refs.timePicker.hide()
      }
    },
    closeDateTimePicker() {
      this.$refs.userInput.closeDateIcon()
      console.log('Close')
    }
    // onClickOutside (event) {
    //   if (this.showPreview) this.showPreview = false
    //   this.slideImages = []
    //   this.index = 0
    //   console.log('Clicked outside. Event: ', event)
    // }
  }
}
</script>
<style scoped>
.sc-chat-window {
  width: 334px;
  height: 564px;
  bottom: 0px;
  right: 0px;
  /* margin: 2px 2px 2px 0px; */
  position: fixed;
  box-sizing: border-box;
  box-shadow: 0 0 1px 1px rgba(0,0,0,0.2);
  border: 1px solid rgba(0,0,0,0.1);
  /* border-top-left-radius: 9px; */
  border-top-right-radius: 9px;
  border-bottom-right-radius: 9px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: 0.3s ease-in-out;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
.image-preview-box {
  position: absolute;
  top: 0px;
  height: 100%;
  width: 100%;
  background: rgba(0,0,0,0.7);
  z-index: 100;
}

.image-preview {
  /* background: #606266; */
  width: 100%;
  margin-top: 200px;
}
.sc-chat-window.closed {
  opacity: 0;
  visibility: hidden;
}

.sc-message--me {
  text-align: right;
}
.sc-message--them {
  text-align: left;
}

@media (max-width: 480px) {
  .sc-chat-window {
    width: 334px;
    height: 564px;
    right: 0px;
    bottom: 0px;
    /* margin: 2px; */
    position: fixed;
    border-radius: 9px;
    box-shadow: 0 0 1px 1px rgba(0,0,0,0.2);
    /* box-shadow: 0 0 2px 2px rgba(0,0,0,0.4);  */
  }
  .sc-chat-window {
    transition: 0.1s ease-in-out;
  }
  .sc-chat-window.closed {
    bottom: 0px;
  }
}

@media (max-width: 380px) {
  .sc-chat-window {
    width: 334px;
    height: 564px;
    right: 0px;
    bottom: 0px;
    position: fixed;
    border-radius: 9px;
  }
  .sc-chat-window {
    transition: 0.1s ease-in-out;
  }
  .sc-chat-window.closed {
    bottom: 0px;
  }
}
</style>
