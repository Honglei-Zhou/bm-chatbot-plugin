<template>
  <div ref="scrollList" :style="{backgroundColor: colors.messageList.bg}" class="sc-message-list" @scroll="handleScroll">
    <Message v-for="(message, idx) in messages" :message="message" :chat-image-url="chatImageUrl(message.author)" :author-name="authorName(message.author)" :key="idx" :colors="colors" :message-styling="messageStyling" @sendItem="sendItem" @openContactForm="$emit('openContactForm')"/>
    <Message v-show="showTypingIndicator !== ''" :message="{author: showTypingIndicator, type: 'typing'}" :chat-image-url="chatImageUrl(showTypingIndicator)" :colors="colors" :message-styling="messageStyling" @sendItem="sendItem"/>
  </div>
</template>
<script>
import Message from './Message.vue'
import chatIcon from '@/assets/icons/chat-icon.svg'

export default {
  components: {
    Message
  },
  props: {
    participants: {
      type: Array,
      required: true
    },
    messages: {
      type: Array,
      required: true
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
    }
  },
  computed: {
    defaultChatIcon() {
      return chatIcon
    }
  },
  mounted() {
    this._scrollDown()
  },
  updated() {
    if (this.shouldScrollToBottom()) { this.$nextTick(this._scrollDown()) }
  },
  methods: {
    scrollDown() {
      this.$refs.scrollList.scrollTop = this.$refs.scrollList.scrollHeight
    },
    _scrollDown() {
      this.$refs.scrollList.scrollTop = this.$refs.scrollList.scrollHeight
    },
    handleScroll(e) {
      if (e.target.scrollTop === 0) {
        this.$emit('scrollToTop')
      }
    },
    shouldScrollToBottom() {
      return this.alwaysScrollToBottom || (this.$refs.scrollList.scrollTop > this.$refs.scrollList.scrollHeight - 600)
    },
    profile(author) {
      const profile = this.participants.find(profile => profile.id === author)

      // A profile may not be found for system messages or messages by 'me'
      return profile || { imageUrl: '', name: '' }
    },
    chatImageUrl(author) {
      return this.profile(author).imageUrl
    },
    authorName(author) {
      return this.profile(author).name
    },
    sendItem(item) {
      this.$emit('sendItem', item)
    }
  }
}
</script>

<style scoped>
.sc-message-list {
  height: 80%;
  overflow-y: auto;
  overflow-x: hidden;
  background-size: 100%;
  padding: 20px 0px;
}
</style>
