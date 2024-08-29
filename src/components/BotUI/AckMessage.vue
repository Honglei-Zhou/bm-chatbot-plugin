<template>
  <div :style="messageColors" class="sc-message--ack"><p class="sc-message--ack-meta">{{ data.text }}</p> <p v-if="data.meta" :style="{color: messageColors.color}" class="sc-message--ack-meta">{{ data.meta }}</p>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
    // messageColors: {
    //   type: Object,
    //   required: true
    // }
  },
  data() {
    return {
      messageColors: {
        backgroundColor: '#ffffff',
        color: '#222222'
      }
    }
  }
}
</script>

<style scoped>
.sc-message--ack {
  /* padding: 8px 20px; */
  border-radius: 6px;
  font-weight: 300;
  font-size: 10px;
  line-height: 1.2;
  /* white-space: pre-wrap; */
  -webkit-font-smoothing: subpixel-antialiased;
  /* font-style: italic; */
  opacity: .6;
  text-align: right;
}

.sc-message--ack-meta {
  /* font-size: xx-small; */
  display: inline-block;
  /* margin-bottom: 0px; */
  /* margin-top: 5px; */
  /* opacity: .5; */
  /* text-align: center; */
}
</style>
