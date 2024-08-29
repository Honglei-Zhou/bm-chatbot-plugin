<template>
  <div :style="messageColors" class="sc-message--media">
    <iframe v-if="data.media.source && data.media.source.toLowerCase()==='youtube'" :src="data.media.url" class="sc-message--media-iframe"/>
    <div v-else class="sc-message--media-icon">
      <media class="sc-media" controls><source :src="data.media.url" type="media/mp4"></media>
    </div>
    <div v-if="data.media.title" :style="messageColors" class="sc-message--media-title">
      {{ data.media.title }}
    </div>
    <div v-if="data.media.text" :style="messageColors" class="sc-message--media-text">
      {{ data.media.text }}
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
.sc-message--media {
  border-radius: 6px;
  border: 1px solid rgba(0,0,0,0.1);
  -webkit-font-smoothing: subpixel-antialiased
}

.sc-message--content.sent .sc-message--media {
  word-wrap: break-word;
}

.sc-message--media-iframe {
    /* border-radius: 6px; */
    margin-top: 3px;
    border: none;
    max-width: 98%;
    min-width: 98%;
}

.sc-message--media-icon {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0px;
  margin-bottom: 0px;
}

.sc-media {
  border-radius: 6px;
  max-width: 100%;
  min-width: 100%;
}

.sc-message--media-title {
  padding: 5px 10px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.4;
  /* white-space: pre-wrap; */
  -webkit-font-smoothing: subpixel-antialiased
}

.sc-message--media-text {
  padding: 5px 10px;
  border-radius: 6px;
  font-weight: 300;
  font-size: 12px;
  line-height: 1.4;
  /* white-space: pre-wrap; */
  -webkit-font-smoothing: subpixel-antialiased
}

.sc-message--content.sent .sc-message--media-text {
  color: white;
  background-color: #4e8cff;
  word-wrap: break-word;
}

.sc-message--content.received .sc-message--media {
  color: #263238;
  background-color: #f4f7f9;
  margin-right: 40px;
}

.sc-message--content.received .sc-message--media-name {
  color: #000;
}

.sc-message--content.received .sc-message--media a {
  color: rgba(43, 40, 40, 0.7);
}

.sc-message--content.received .sc-message--media a:hover {
  color: #0c0c0c;
}
</style>
