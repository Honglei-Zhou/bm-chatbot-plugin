<template>
  <div class="sc-message">
    <div
      :class="{
        sent: message.author === 'me',
        received: message.author !== 'me' && message.type !== 'system',
        system: message.type === 'system'
      }"
      class="sc-message--content">
      <div
        v-tooltip="authorName"
        v-if="message.type !== 'system' && message.type !== 'ack'"
        :title="authorName"
        :style="{
          backgroundImage: `url(${chatImageUrl})`
        }"
        class="sc-message--avatar"/>
      <TextMessage v-if="message.type === 'text'" :data="message.data" :message-colors="determineMessageColors()" :message-styling="messageStyling" />
      <EmojiMessage v-else-if="message.type === 'emoji'" :data="message.data" />
      <FileMessage v-else-if="message.type === 'file'" :data="message.data" :message-colors="determineMessageColors()" />
      <TypingMessage v-else-if="message.type === 'typing'" :message-colors="determineMessageColors()" />
      <SystemMessage v-else-if="message.type === 'system'" :data="message.data" :message-colors="determineMessageColors()" />
      <CardMessage v-else-if="message.type === 'card'" :data="message.data" :message-colors="determineMessageColors()" @sendItem="sendItem"/>
      <ImageMessage v-else-if="message.type === 'image'" :data="message.data" :message-colors="determineMessageColors()" />
      <VideoMessage v-else-if="message.type === 'video'" :data="message.data" :message-colors="determineMessageColors()" />
      <ButtonMessage v-else-if="message.type === 'button'" :data="message.data" :message-colors="determineMessageColors()" @sendItem="sendItem"/>
      <ListMessage v-else-if="message.type === 'list'" :data="message.data" :message-colors="determineMessageColors()" @sendItem="sendItem"/>
      <FormMessage v-else-if="message.type === 'form'" :data="message.data" :message-colors="determineMessageColors()" @sendItem="sendItem"/>
      <AckMessage v-else-if="message.type === 'ack'" :data="message.data"/>
    </div>
  </div>
</template>

<script>
import TextMessage from './TextMessage'
import FileMessage from './FileMessage'
import EmojiMessage from './EmojiMessage'
import TypingMessage from './TypingMessage'
import SystemMessage from './SystemMessage'
import CardMessage from './CardMessage'
import ImageMessage from './ImageMessage'
import ListMessage from './ListMessage'
import VideoMessage from './VideoMessage'
import ButtonMessage from './ButtonMessage'
import AckMessage from './AckMessage'
import FormMessage from './FormMessage'
import chatIcon from '@/assets/icons/chat-icon.svg'

export default {
  components: {
    TextMessage,
    FileMessage,
    EmojiMessage,
    TypingMessage,
    SystemMessage,
    CardMessage,
    ImageMessage,
    ListMessage,
    VideoMessage,
    ButtonMessage,
    AckMessage,
    FormMessage
  },
  props: {
    message: {
      type: Object,
      required: true
    },
    chatImageUrl: {
      type: String,
      default: chatIcon
    },
    colors: {
      type: Object,
      required: true
    },
    authorName: {
      type: String,
      default: 'support'
    },
    messageStyling: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {

    }
  },
  methods: {
    sentColorsStyle() {
      return {
        color: this.colors.sentMessage.text,
        backgroundColor: this.colors.sentMessage.bg
      }
    },
    receivedColorsStyle() {
      return {
        color: this.colors.receivedMessage.text,
        backgroundColor: this.colors.receivedMessage.bg
      }
    },
    determineMessageColors() {
      return this.message.author === 'me' ? this.sentColorsStyle() : this.receivedColorsStyle()
    },
    sendItem(item) {
      this.$emit('sendItem', item)
    }
  }
}
</script>
<style lang="scss">
.sc-message {
  // width: 300px;
  width: 80%;
  min-width: 322px;
  margin: auto;
  padding-bottom: 10px;
  display: flex;
}

.sc-message--content {
  width: 100%;
  display: flex;
}

.sc-message--content.sent {
  justify-content: flex-end;
  margin-right: 10px;
}

.sc-message--content.system {
  justify-content: center;
}

.sc-message--content.sent .sc-message--avatar {
  display: none;
}

.sc-message--avatar {
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
  min-width: 30px;
  min-height: 30px;
  border-radius: 50%;
  align-self: center;
  margin-left: 10px;
  margin-right: 15px;
}

.sc-message--meta {
  font-size: xx-small;
  margin-bottom: 0px;
  color: white;
  text-align: center;
}

@media (max-width: 450px) {
  .sc-message {
    width: 80%;
    min-width: 322px;
  }
}

.sc-message--text {
  padding: 5px 20px;
  border-radius: 30px;
  font-weight: 300;
  font-size: 14px;
  line-height: 1.4;
  // white-space: pre-wrap;
  -webkit-font-smoothing: subpixel-antialiased
}
.sc-message--content.sent .sc-message--text {
  color: white;
  background-color: #4e8cff;
  max-width: calc(100% - 120px);
  word-wrap: break-word;
}

.sc-message--text code {
  font-family: 'Courier New', Courier, monospace !important;
}

.sc-message--content.received .sc-message--text {
  color: #263238;
  background-color: #f4f7f9;
  margin-right: 40px;
}

.tooltip {
  display: block !important;
  z-index: 10000;
  font-size: 14px;
  .tooltip-inner {
    background: black;
    color: white;
    border-radius: 16px;
    padding: 5px 10px 4px;
  }
  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: black;
    z-index: 1;
  }
  &[x-placement^="top"] {
    margin-bottom: 5px;
    .tooltip-arrow {
      border-width: 5px 5px 0 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }
  &[x-placement^="bottom"] {
    margin-top: 5px;
    .tooltip-arrow {
      border-width: 0 5px 5px 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      top: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }
  &[x-placement^="right"] {
    margin-left: 5px;
    .tooltip-arrow {
      border-width: 5px 5px 5px 0;
      border-left-color: transparent !important;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
      left: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }
  &[x-placement^="left"] {
    margin-right: 5px;
    .tooltip-arrow {
      border-width: 5px 0 5px 5px;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      right: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }
  &[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity .15s, visibility .15s;
  }
  &[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity .15s;
  }
  &.info {
    $color: rgba(#004499, .9);
    .tooltip-inner {
      background: $color;
      color: white;
      padding: 24px;
      border-radius: 5px;
      box-shadow: 0 5px 30px rgba(black, .1);
    }
    .tooltip-arrow {
      border-color: $color;
    }
  }
  &.popover {
    $color: #f9f9f9;
    .popover-inner {
      background: $color;
      color: black;
      padding: 24px;
      border-radius: 5px;
      box-shadow: 0 5px 30px rgba(black, .1);
    }
    .popover-arrow {
      border-color: $color;
    }
  }
}
</style>
