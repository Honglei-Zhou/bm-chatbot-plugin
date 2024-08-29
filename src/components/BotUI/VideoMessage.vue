<template>
  <div :style="messageColors" class="sc-message--video">
    <iframe v-if="data.video.source && data.video.source.toLowerCase()==='youtube'" :src="data.video.url" class="sc-message--video-iframe"/>
    <div v-else class="sc-message--video-icon">
      <video class="sc-video" controls><source :src="data.video.url" type="video/mp4"></video>
    </div>
    <div v-if="data.video.title" :style="messageColors" class="sc-message--video-title">
      {{ data.video.title }}
    </div>
    <div v-if="data.video.text" :style="messageColors" class="sc-message--video-text">
      {{ data.video.text }}
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
  }
}
</script>

<style scoped>
.sc-message--video {
  border-radius: 6px;
  border: 1px solid rgba(0,0,0,0.1);
  -webkit-font-smoothing: subpixel-antialiased
}

.sc-message--content.sent .sc-message--video {
  word-wrap: break-word;
}

.sc-message--video-iframe {
    /* border-radius: 6px; */
    margin-top: 3px;
    border: none;
    max-width: 98%;
    min-width: 98%;
}

.sc-message--video-icon {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0px;
  margin-bottom: 0px;
}

.sc-video {
  border-radius: 6px;
  max-width: 100%;
  min-width: 100%;
}

.sc-message--video-title {
  padding: 5px 10px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.4;
  /* white-space: pre-wrap; */
  -webkit-font-smoothing: subpixel-antialiased
}

.sc-message--video-text {
  padding: 5px 10px;
  border-radius: 6px;
  font-weight: 300;
  font-size: 12px;
  line-height: 1.4;
  /* white-space: pre-wrap; */
  -webkit-font-smoothing: subpixel-antialiased
}

.sc-message--content.sent .sc-message--video-text {
  color: white;
  background-color: #4e8cff;
  word-wrap: break-word;
}

.sc-message--content.received .sc-message--video {
  color: #263238;
  background-color: #f4f7f9;
  margin-right: 40px;
}

.sc-message--content.received .sc-message--video-name {
  color: #000;
}

.sc-message--content.received .sc-message--video a {
  color: rgba(43, 40, 40, 0.7);
}

.sc-message--content.received .sc-message--video a:hover {
  color: #0c0c0c;
}
</style>
