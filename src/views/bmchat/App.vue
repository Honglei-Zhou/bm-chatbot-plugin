<template>
  <div id="app">
    <transition name="right">
      <BotPage
        v-if="isPageOpen"
        ref="botPage"
        :participants="dealer.participants"
        :title="dealer.chatWindowTitle"
        :title-image-url="dealer.titleImageUrl"
        :is-open="isPageOpen"
        :on-close="closePage"
        :colors="colors"
        :disable-user-list-toggle="disableUserListToggle"
        @sendItem="sendItem"
      />
    </transition>
    <ChatWindow
      ref="chatWindow"
      :message-list="messageList"
      :on-user-input-submit="onMessageWasSent"
      :is-open="isChatOpen"
      :on-close="closeChat"
      :show-emoji="false"
      :show-file="false"
      :placeholder="placeholder"
      :show-typing-indicator="showTypingIndicator"
      :colors="colors"
      :always-scroll-to-bottom="alwaysScrollToBottom"
      :message-styling="messageStyling"
      :disable-user-list-toggle="disableUserListToggle"
      :handle-bot-page-toggle="handleBotPageToggle"
      @scrollToTop="handleScrollToTop"
      @onType="handleOnType"
    />

    <SmallPage ref="smallPage" :key="randomKey" :small-chat-open="isSmallChatOpen" :colors="colors" />

  </div>
</template>

<script>
import CloseIcon from '@/assets/icons/close-icon.png'
import OpenIcon from '@/assets/icons/logo-no-bg.svg'
import FileIcon from '@/assets/icons/file.svg'
import CloseIconSvg from '@/assets/icons/close.svg'
import ChatWindow from '@/components/BotUI/ChatWindow'
import { mapActions, mapState } from 'vuex'
// import ChatAvatar from '@/assets/icons/bmbot.png'
import { botAuthService } from '@/api/botAuthService'
import BotPage from '@/components/BotPage/BotPage'
import { whatIsIt } from '@/api/tools'
// import AdminAvatar from '@/assets/icons/admin.png'
import SmallPage from '@/components/BotPage/SmallPage'

export default {
  name: 'App',
  components: {
    ChatWindow,
    BotPage,
    // Suggestions,
    // SendIcon,
    SmallPage
  },
  data() {
    return {
      icons: {
        open: {
          img: OpenIcon,
          name: 'default'
        },
        close: {
          img: CloseIcon,
          name: 'default'
        },
        file: {
          img: FileIcon,
          name: 'default'
        },
        closeSvg: {
          img: CloseIconSvg,
          name: 'default'
        }
      },
      // participants: [
      //   {
      //     id: 'support',
      //     name: 'Telle',
      //     imageUrl: ChatAvatar
      //   },
      //   {
      //     id: 'admin',
      //     name: 'John',
      //     imageUrl: AdminAvatar
      //   }
      // ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
      // chatWindowTitle: 'Honda of Downtown Chicago',
      // titleImageUrl: ChatAvatar,
      isPageOpen: false,
      isSmallChatOpen: false,
      isChatOpen: false, // to determine whether the chat window should be open or closed
      // showTypingIndicator: '', // when set to a value matching the participant.id it shows the typing indicator for the specific user
      placeholder: 'Enter your message',
      disableUserListToggle: true,
      colors: {
        header: {
          bg: '#1f95e7',
          text: '#ffffff'
        },
        launcher: {
          bg: '#1f95e7'
        },
        messageList: {
          bg: '#F5F5F5'
        },
        sentMessage: {
          bg: '#1f95e7',
          text: '#ffffff'
        },
        receivedMessage: {
          bg: '#ffffff',
          text: '#222222'
        },
        userInput: {
          bg: '#ffffff',
          text: '#565867'
        },
        toolBar: {
          active: '#1296db',
          inactive: '#565867'
        }
      }, // specifies the color scheme for the component
      alwaysScrollToBottom: true, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
      messageStyling: true, // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown),
      pageName: 'profile'
    }
  },
  computed: {
    ...mapState('telleChat', ['messageList', 'newMessagesCount', 'showTypingIndicator', 'bot', 'dealer'])
  },
  created() {
    window.addEventListener('message', (e) => {
      if (e && e.data && whatIsIt(e.data) === 'String') {
        const eData = JSON.parse(e.data)
        const key = eData.key
        const data = eData.data
        // console.log(e)
        if (key === 'getCId') {
          // this.initBotState(data)
          if (!this.bot.authorized) {
            botAuthService.isAuthorizedBot(data, e.origin).then((resp) => {
              // console.log(resp)
              if (resp.data.isAuthorized) {
                this.initBot({ key: data, origin: e.origin, config: resp.data })
                this.$store.dispatch('telleChat/joinChatRoom')
                if (this.bot.smallPageOpen === false) {
                  this.isSmallChatOpen = false
                  window.parent.postMessage(JSON.stringify({ key: 'initChatButtonExt' }), '*')
                } else {
                  this.isSmallChatOpen = true
                  window.parent.postMessage(JSON.stringify({ key: 'initChatButton' }), '*')
                  // this.$refs.smallPage.show()
                }
                console.log(this.bot.smallPageOpen)
                setTimeout(() => {
                  this.getAllCars({ pageNum: 1, key: data })
                }, 2000)
                setTimeout(() => {
                  var md = {}
                  if (md) {
                    this.sendMetaInfo(md)
                  }
                }, 10000)
              } else {
                this.$socket.close()
              }
            }).catch(() => {
              this.$socket.close()
            })
          } else {
            this.initBot({ key: data, origin: e.origin })
            this.$store.dispatch('telleChat/joinChatRoom')
            if (this.bot.smallPageOpen === false) {
              this.isSmallChatOpen = false
              window.parent.postMessage(JSON.stringify({ key: 'initChatButtonExt' }), '*')
            } else {
              // this.isSmallChatOpen = true
              this.isSmallChatOpen = true
              window.parent.postMessage(JSON.stringify({ key: 'initChatButton' }), '*')
            }
            // window.parent.postMessage(JSON.stringify({ key: 'initChatButton' }), '*')
            console.log(this.bot.smallPageOpen)
            // this.$refs.smallPage.show()
            setTimeout(() => {
              this.getAllCars({ pageNum: 1, key: data })
            }, 2000)
            setTimeout(() => {
              var md = {}
              if (md) {
                this.sendMetaInfo(md)
              }
            }, 10000)
          }
        } else if (key === 'openChatWindow') {
          this.isSmallChatOpen = false
          if (this.$refs.smallPage) {
            this.$refs.smallPage.hide()
          } else {
            this.$store.commit('telleChat/updateSmallPageStatus', false)
          }
          this.isChatOpen = true
          // console.log(this.$refs.chatWindow)
          if (this.$refs.chatWindow) {
            this.$refs.chatWindow.scrollDown()
          }
          this.sendPageViewInfo({ data: data, clicked: 1 })
        } else if (key === 'closeChatWindow') {
          this.sendPageViewInfo({ data: data, clicked: 2 })
        } else if (key === 'updatePageView') {
          this.sendPageViewInfo({ data: data, clicked: 0 })
        } else if (key === 'closeSmallWindow') {
          if (this.$refs.smallPage) {
            this.$refs.smallPage.hide()
            this.isSmallChatOpen = false
            this.smallChatOpen = false
          } else {
            this.$store.commit('telleChat/updateSmallPageStatus', false)
          }
          this.$store.commit('telleChat/closeChat')
        } else if (key === 'updateSmallWindow') {
          this.isSmallChatOpen = true
          this.showSmallChat()
        }
      }
    }, false)
    // window.parent.postMessage(JSON.stringify({ key: 'getCId' }), '*')
  },
  methods: {
    ...mapActions('telleChat', ['sendMessage', 'initBotState', 'initBot', 'closeChat', 'sendMetaInfo', 'sendPageViewInfo']),
    ...mapActions('bmbot', ['getAllCars']),
    onMessageWasSent(message) {
      this.sendMessage(message)
      this.$store.commit('telleChat/showIndicator')
      setTimeout(() => {
        this.$store.commit('telleChat/hideIndicator')
      }, 10000)
    },
    showSmallChat() {
      this.$refs.smallPage.show()
    },
    handleScrollToTop() {
      // called when the user scrolls message list to top
      // leverage pagination for loading another page of messages
      console.log('Scroll')
    },
    handleOnType() {
      this.$root.$emit('onType')
      this.userIsTyping = true
    },
    // handleTyping(text) {
    //   // Bug here
    //   this.showTypingIndicator =
    //     text.length > 0
    //       ? this.participants[this.participants.length - 1].id
    //       : ''
    // },
    closePage() {
      this.isPageOpen = false
      window.parent.postMessage(JSON.stringify({ key: 'toggleLeft' }), '*')
    },
    openPage() {
      this.isPageOpen = true
      window.parent.postMessage(JSON.stringify({ key: 'toggleLeft' }), '*')
    },
    handleBotPageToggle(item) {
      // console.log(this.$refs)
      this.pageName = item.name
      if (item.show) {
        if (!this.isPageOpen) {
          this.openPage()
          this.$nextTick(() => {
            // console.log(this.$refs)
            this.$refs.botPage.pageHandler(item.name)
          })
        } else {
          this.$refs.botPage.pageHandler(item.name)
        }
      } else {
        this.closePage()
      }
    },
    sendItem(item) {
      this.$refs.chatWindow.sendItem(item)
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
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  width: 100%;
  height: 100%;
  padding: 10px;
}
/* .chat_panel_left{
  width: 390px;
  height: 100%;
}
.chat_panel_right{
  width: 390px;
  height: 100%;
} */

.right-enter, .right-leave-to {
    transform: translate3d(100%, 0, 0)
}
.right-leave, .right-enter-to {
  transform: translate3d(0, 0, 0)
}
.right-enter-active, .right-leave-active {
  transition: all .6s
}
.travel-map {
  height: 400px;
}

</style>
