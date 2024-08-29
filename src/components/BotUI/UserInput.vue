<template>
  <div>
    <Suggestions :suggestions="suggestions" :colors="colors" @sendSuggestion="_submitSuggestion"/>
    <div v-if="file" :style="{backgroundColor: colors.userInput.text, color: colors.userInput.bg}" class="file-container">
      <span class="icon-file-message"><img :src="icons.file.img" :alt="icons.file.name" height="15" ></span>
      {{ file.name }}
      <span class="delete-file-message" @click="cancelFile()" ><img :src="icons.closeSvg.img" :alt="icons.closeSvg.name" height="10" title="Remove the file" ></span>
    </div>
    <form :class="{active: inputActive}" :style="{background: colors.userInput.bg}" class="sc-user-input">
      <div
        ref="userInput"
        :placeholder="placeholder"
        :style="{color: colors.userInput.text}"
        role="button"
        tabIndex="0"
        contentEditable="true"
        class="sc-user-input--text"
        @focus="setInputActive(true)"
        @blur="setInputActive(false)"
        @keydown="handleKey"
      />
      <div class="sc-user-input--buttons">
        <!-- <div class="sc-user-input--button"></div>
        <div v-if="showEmoji" class="sc-user-input--button">
          <EmojiIcon :onEmojiPicked="_handleEmojiPicked" :color="colors.userInput.text" />
        </div>
        <div v-if="showFile" class="sc-user-input--button">
          <FileIcons :onChange="_handleFileSubmit" :color="colors.userInput.text" />
        </div> -->
        <div class="sc-user-input--button">
          <DateTimeIcon ref="dateIcon" :color="colors.userInput.text" @toggleDateTimePicker="_toggleDateTimePicker"/>
        </div>
        <div v-if="showFile" class="sc-user-input--button">
          <FileIcons :on-change="_handleFileSubmit" :color="colors.userInput.text" />
        </div>
        <div class="sc-user-input--button">
          <SendIcon :on-click="_submitText" :color="colors.userInput.text" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import EmojiIcon from './EmojiIcon'
import DateTimeIcon from './DateTimeIcon'
import FileIcons from './FileIcons'
import SendIcon from './SendIcon'
import Suggestions from './Suggestions'
import FileIcon from '@/assets/icons/file.svg'
import CloseIconSvg from '@/assets/icons/close.svg'
import SMSIcons from './SMSIcons'

export default {
  components: {
    EmojiIcon,
    FileIcons,
    SMSIcons,
    SendIcon,
    Suggestions,
    DateTimeIcon
  },
  props: {
    icons: {
      type: Object,
      required: false,
      default: function() {
        return {
          file: {
            img: FileIcon,
            name: 'default'
          },
          closeSvg: {
            img: CloseIconSvg,
            name: 'default'
          }
        }
      }
    },
    showEmoji: {
      type: Boolean,
      default: () => false
    },
    suggestions: {
      type: Array,
      default: () => []
    },
    showFile: {
      type: Boolean,
      default: () => false
    },
    onSubmit: {
      type: Function,
      required: true
    },
    placeholder: {
      type: String,
      default: 'Enter your message'
    },
    colors: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      file: null,
      inputActive: false
    }
  },
  methods: {
    cancelFile() {
      this.file = null
    },
    setInputActive(onoff) {
      this.inputActive = onoff
    },
    handleKey(event) {
      if (event.keyCode === 13 && !event.shiftKey) {
        this._submitText(event)
        event.preventDefault()
      }
      this.$emit('onType')
    },
    _submitSuggestion(suggestion) {
      this.onSubmit({ author: 'me', type: 'text', data: { text: suggestion }})
    },
    _submitText(event) {
      const text = this.$refs.userInput.textContent
      const file = this.file
      if (file) {
        if (text && text.length > 0) {
          this.onSubmit({
            author: 'me',
            type: 'file',
            data: { text, file }
          })
          this.file = null
          this.$refs.userInput.innerHTML = ''
        } else {
          this.onSubmit({
            author: 'me',
            type: 'file',
            data: { file }
          })
          this.file = null
        }
      } else {
        if (text && text.length > 0) {
          this.onSubmit({
            author: 'me',
            type: 'text',
            data: { text }
          })
          this.$refs.userInput.innerHTML = ''
        }
      }
    },
    _handleEmojiPicked(emoji) {
      this.onSubmit({
        author: 'me',
        type: 'emoji',
        data: { emoji }
      })
    },
    _handleFileSubmit(file) {
      this.file = file
    },
    _toggleDateTimePicker(isActive) {
      this.$emit('toggleDateTimePicker', isActive)
    },
    closeDateIcon() {
      this.$refs.dateIcon._closePicker()
    }
  }
}
</script>

<style>
.sc-user-input {
  /* min-height: 55px; */
  height: 55px;
  margin: 0px;
  position: relative;
  bottom: 0;
  width: 100%;
  display: flex;
  /* flex-direction: row;
  justify-content: center; */
  /* align-items: center; */
  background-color: #f4f7f9;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
}

.sc-user-input--text {
  /* width: 300px; */
  width: 75%;
  resize: none;
  border: none;
  outline: none;
  border-bottom-left-radius: 10px;
  box-sizing: border-box;
  padding: 18px;
  /* padding-left: 18px; */
  font-size: 15px;
  font-weight: 400;
  line-height: 1.33;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: #565867;
  -webkit-font-smoothing: antialiased;
  /* max-height: 200px; */
  /* overflow: scroll; */
  overflow: hidden;
  bottom: 0;
  /* overflow-x: hidden;
  overflow-y: auto; */
  text-align: left;
}

.sc-user-input--text:empty:before {
  content: attr(placeholder);
  display: block; /* For Firefox */
  /* color: rgba(86, 88, 103, 0.3); */
  filter: contrast(15%);
  outline: none;
}

.sc-user-input--buttons {
  /* width: 100px; */
  width: 25%;
  /* position: absolute; */
  height: 100%;
  display: flex;
  flex-direction: row-reverse;
}

.sc-user-input--button:first-of-type {
  width: 50px;
}

.sc-user-input--button {
  width: 50%; /* change to 100% if only one icon available */
  height: 55px;
  margin-left: 2px;
  margin-right: 2px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.sc-user-input.active {
  box-shadow: none;
  background-color: white;
  box-shadow: 0px -5px 20px 0px rgba(150, 165, 190, 0.2);
}

.sc-user-input--button label {
  position: relative;
  height: 24px;
  padding-left: 3px;
  cursor: pointer;
}

.sc-user-input--button label:hover path {
  fill: rgba(86, 88, 103, 1);
}

.sc-user-input--button input {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 99999;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  overflow: hidden;
}

.file-container {
  background-color: #f4f7f9;
  border-top-left-radius: 10px;
  padding: 5px 20px;
  color: #565867;
}

.delete-file-message {
  font-style: normal;
  float: right;
  cursor: pointer;
  color: #c8cad0;
}

.delete-file-message:hover {
  color: #5d5e6d;
}

.icon-file-message {
  margin-right: 5px;
}
</style>
