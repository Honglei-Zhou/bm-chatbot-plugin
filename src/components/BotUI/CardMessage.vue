<template>
  <div :style="messageColors" class="sc-message--card">
    <Swiper v-if="data.elements.length>0" ref="swiper" :auto-play="false" :show-indicator="false">
      <Slide v-for="(item,index) in data.elements" :key="index">
        <div class="sc-message--card-icon">
          <img :src="item.image_url" class="sc-image" @click="openPreview(item)">
        </div>
        <div :style="messageColors" class="sc-message--card-title">
          {{ item.title }}
        </div>
        <div v-if="item.subtitle" :style="messageColors" class="sc-message--card-text">{{ item.subtitle }}</div>
        <div v-if="item.text" :style="messageColors" class="sc-message--card-text">{{ item.text }}<p v-if="item.meta" :style="messageColors" class="sc-message--meta">{{ item.meta }}</p></div>
        <div v-if="item.buttons && item.buttons.length > 0">
          <button
            v-for="(cardButton, idx) in item.buttons"
            :style="messageColors"
            :key="idx"
            class="sc-message--card-button"
            @click="$emit('sendItem', cardButton)">{{ cardButton.title }}</button>
        </div>
      </Slide>
    </Swiper>
  </div>
</template>

<script>
import { Slide, Swiper } from '@/components/Util'

export default {
  name: 'CardMessage',
  components: {
    Slide,
    Swiper
  },
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
  methods: {
    openPreview(message) {
      var images = []
      message.images.forEach((item) => {
        images.push(item)
      })
      this.$parent.$parent.$parent.openPreview(images)
    }
  }
}
</script>

<style scoped>
.sc-message--card {
  width: 100%;
  border-radius: 6px;
  font-weight: 300;
  font-size: 14px;
  line-height: 1.4;
  /* white-space: pre-wrap; */
  -webkit-font-smoothing: subpixel-antialiased
}

.sc-message--content.sent .sc-message--card {
  word-wrap: break-word;
}

.sc-message--card-next {
  /* position: absolute; */
  margin-right: 10px;
}

.sc-message--card-icon {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0px;
  margin-bottom: 0px;
}

.sc-image {
  border-radius: 6px 6px 1px 1px;
  max-width: 100%;
  min-width: 100%;
}

.sc-message--card-text {
  padding: 17px 20px;
  border-radius: 6px;
  font-weight: 300;
  font-size: 14px;
  line-height: 1.4;
  /* white-space: pre-wrap; */
  -webkit-font-smoothing: subpixel-antialiased
}

.sc-message--card-name {
  color: white;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 0;
  font-size: x-small;
  text-align: center;
}

.sc-message--card-title {
  /* color: white; */
  color: rgba(0, 0, 0, 1);
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 0;
  font-weight: 700;
  text-align: center;
}

.sc-message--card-subtitle {
  padding: 17px 20px;
  border-radius: 6px;
  font-weight: 300;
  font-size: 14px;
  line-height: 1.4;
  /* white-space: pre-wrap; */
  -webkit-font-smoothing: subpixel-antialiased
}

.sc-message--card-name a {
  text-decoration: none;
  color: #ece7e7;
}

.sc-message--card-name a:hover {
  color: white;
}

.sc-message--card-button {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2px;
  font-size: 14px;
  line-height: 40px;
  width: 100%;
  height: 40px;
  overflow: hidden;
  border: 1px solid rgba(78, 140, 255, 0.4);
  border-radius: 6px;
  /* border: none; */
  cursor: pointer;
}

.sc-message--content.sent .sc-message--card-text {
  color: white;
  background-color: #4e8cff;
  word-wrap: break-word;
}

.sc-message--content.received .sc-message--card {
  color: #263238;
  background-color: #f4f7f9;
  margin-right: 40px;
}

.sc-message--content.received .sc-message--card-name {
  color: #000;
}

.sc-message--content.received .sc-message--card a {
  color: rgba(43, 40, 40, 0.7);
}

.sc-message--content.received .sc-message--card a:hover {
  color: #0c0c0c;
}

@media (max-width: 450px) {
  .sc-message--card {
  width: 80%;
  border-radius: 6px;
  font-weight: 300;
  font-size: 14px;
  line-height: 1.4;
  /* white-space: pre-wrap; */
  -webkit-font-smoothing: subpixel-antialiased
  }
}
</style>
