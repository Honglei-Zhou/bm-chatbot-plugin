<template>
  <div
    :style="messageColors"
    class="sc-message--ls"
  >
    <div
      v-for="(message, idx) in data.elements"
      :key="idx"
      class="sc-message--ls-message"
    >
      <div
        v-if="data.top_element_style.toLowerCase() === 'large' && idx === 0"
        class="sc-message--ls-icon"
      >
        <img
          :src="message.image_url"
          class="sc-image"
        >
        <div
          :style="messageColors"
          class="sc-message--ls-title"
        >
          {{ message.title }}
        </div>
        <div
          v-if="message.subtitle"
          :style="messageColors"
          class="sc-message--ls-subtitle"
        >{{ message.subtitle }}</div>
        <!-- Add Title and Subtitle -->
      </div>
      <div v-else class="sc-message--ls-wrap">
        <div class="sc-message--ls-content">
          <div
            :style="messageColors"
            class="sc-message--ls-title"
          >
            {{ message.title }}
          </div>
          <div
            v-if="message.subtitle"
            :style="messageColors"
            class="sc-message--ls-subtitle"
          >{{ message.subtitle }}</div>
          <div
            v-if="message.text"
            :style="messageColors"
            class="sc-message--ls-text"
          >{{ message.text }}<p
            v-if="message.meta"
            :style="messageColors"
            class="sc-message--meta"
          >{{ message.meta }}</p>
          </div>
          <div v-if="message.buttons && message.buttons.length > 0" class="sc-message--ls-button-wrap">
            <button
              v-for="(messageButton, idx) in message.buttons"
              :style="messageColors"
              :key="idx"
              class="sc-message--ls-button"
              @click="openUrl(messageButton)"
            >{{ messageButton.title }}</button>
          </div>
        </div>
        <div class="sc-message--ls-image">
          <img :src="message.image_url" class="sc-image" @click="openPreview(message)">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    messageColors: {
      type: Object,
      required: true
    }
  },
  // data() {
  //   return {
  //     showPreview: false,
  //     slideImages: []
  //   }
  // },
  methods: {
    openPreview(message) {
      var images = []
      message.images.forEach((item) => {
        images.push(item)
      })
      this.$parent.$parent.$parent.openPreview(images)
    },
    openUrl(messageButton) {
      if (messageButton.type === 'url') {
        window.open(messageButton.payload, '_blank')
      } else {
        // window.open('https://www.telle.ai', '_blank')
        this.$emit('sendItem', messageButton)
      }
    }
  }
}
</script>

<style scoped>
.sc-message--ls {
  /* background-color: white; */
  border-radius: 6px;
  font-weight: 300;
  font-size: 14px;
  line-height: 1.4;
  /* border: 1px solid rgba(0, 0, 0, 0.1); */
  /* white-space: pre-wrap; */
  -webkit-font-smoothing: subpixel-antialiased;
}

.sc-message--content.sent .sc-message--ls {
  word-wrap: break-word;
}

.sc-message--ls-message {
  font-weight: 300;
  font-size: 14px;
  line-height: 1.4;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  /* width: 80%; */
  /* height: 100px; */
}

.sc-message--ls-message:first-child {
  border-top: none;
  /* width: 80%; */
  /* height: 100px; */
}

.sc-message--ls-icon {
  text-align: center;
  /* height: 60px; */
}

.sc-image {
  border-radius: 6px;
  max-width: 100%;
  min-width: 100%;
}

.sc-message--ls-wrap{
  display: flex;
}

.sc-message--ls-image {
  flex: 0 0 30%;
  padding: 5px 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.sc-message--ls-content {
  -webkit-flex: 1; /* Safari 6.1+ */
  -ms-flex: 1; /* IE 10 */
  flex: 1;
  padding: 5px 10px;
  display: flex;
  flex-direction: column;
  justify-content: left;
  /* height: 100px; */
}

.sc-message--ls-text {
  border-radius: 6px;
  font-weight: 300;
  font-size: 12px;
  line-height: 1.4;
  /* white-space: pre-wrap; */
  -webkit-font-smoothing: subpixel-antialiased;
}

.sc-message--ls-title {
  /* color: white; */
  color: rgba(0, 0, 0, 1);
  font-size: 14px;
  line-height: 1.4;
  font-weight: 700;
  text-align: left;
}

.sc-message--ls-subtitle {
  border-radius: 6px;
  margin-top: 5px;
  font-weight: 300;
  font-size: 12px;
  line-height: 1.4;
  text-align: left;
  /* white-space: pre-wrap; */
  -webkit-font-smoothing: subpixel-antialiased;
}

.sc-message--ls-button-wrap{
  /* padding-left: 0px; */
  margin-top: 5px;
  text-align: left;
}

.sc-message--ls-button {
  text-align: center;
  font-size: 12px;
  line-height: 30px;
  height: 30px;
  overflow: hidden;
  border: 1px solid rgba(78, 140, 255, 0.4);
  border-radius: 10px;
  /* border: none; */
  cursor: pointer;
}

.sc-message--content.sent .sc-message--ls-text {
  color: white;
  background-color: #4e8cff;
  word-wrap: break-word;
}

.sc-message--content.received .sc-message--ls {
  color: #263238;
  /* background-color: #f4f7f9; */
  background-color: white;
  margin-right: 40px;
}

.sc-message--content.received .sc-message--ls-name {
  color: #000;
}

.sc-message--content.received .sc-message--ls a {
  color: rgba(43, 40, 40, 0.7);
}

.sc-message--content.received .sc-message--ls a:hover {
  color: #0c0c0c;
}
</style>
