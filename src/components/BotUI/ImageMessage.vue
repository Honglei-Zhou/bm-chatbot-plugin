<template>
  <div :style="messageColors" class="sc-message--image">
    <div v-for="(item, idx) in data.elements" :key="idx" class="sc-message--image-wrap">
      <div class="sc-message--image-icon">
        <img :src="item.url" class="sc-image" @click="openPreview(item)">
      </div>
      <div v-if="item.title" :style="messageColors" class="sc-message--image-title">
        {{ item.title }}
      </div>

      <div v-if="item.text" :style="messageColors" class="sc-message--image-text">
        {{ item.text }}
      </div>
    </div>

    <!-- <div class='sc-message--image-icon'>
      <img :src="data.image.url" class="sc-image">
    </div>
    <div class='sc-message--image-title' :style="messageColors" v-if="data.image.title">
      {{data.image.title}}
    </div>

    <div class='sc-message--image-text' :style="messageColors" v-if="data.image.text">
      {{data.image.text}}
    </div> -->
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
  methods: {
    openPreview(message) {
      var images = []
      images.push(message.url)
      this.$parent.$parent.$parent.openPreview(images)
    }
  }
}
</script>

<style scoped>
.sc-message--image {
  border-radius: 6px;
  -webkit-font-smoothing: subpixel-antialiased
}

.sc-message--content.sent .sc-message--image {
  word-wrap: break-word;
}

.sc-message--image-wrap {
  width: 100%;
}

.sc-message--image-icon {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0px;
  margin-bottom: 0px;
}

.sc-image {
  border-radius: 6px;
  max-width: 100%;
  min-width: 100%;
}

.sc-message--image-title {
  padding: 5px 10px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.4;
  /* white-space: pre-wrap; */
  -webkit-font-smoothing: subpixel-antialiased
}

.sc-message--image-text {
  padding: 5px 20px;
  border-radius: 6px;
  font-weight: 300;
  font-size: 12px;
  line-height: 1.4;
  /* white-space: pre-wrap; */
  -webkit-font-smoothing: subpixel-antialiased
}

.sc-message--content.sent .sc-message--image-text {
  color: white;
  background-color: #4e8cff;
  word-wrap: break-word;
}

.sc-message--content.received .sc-message--image {
  color: #263238;
  background-color: #f4f7f9;
  margin-right: 40px;
}

.sc-message--content.received .sc-message--image-name {
  color: #000;
}

.sc-message--content.received .sc-message--image a {
  color: rgba(43, 40, 40, 0.7);
}

.sc-message--content.received .sc-message--image a:hover {
  color: #0c0c0c;
}
</style>
