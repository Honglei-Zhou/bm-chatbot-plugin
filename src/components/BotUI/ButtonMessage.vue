<template>
  <div :style="messageColors" class="sc-message--button">
    <div v-if="data.text" :style="messageColors" class="sc-message--button-text">
      {{ data.text }}
    </div>
    <div v-if="data.buttons.length > 0" :style="messageColors" class="sc-message--button-row">
      <button
        v-for="(item, idx) in data.buttons"
        :key="idx"
        class="sc-message--button-element"
        @click="$emit('sendItem', item)">{{ item.title }}</button>
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
.sc-message--button {
  border-radius: 6px;
  font-weight: 300;
  font-size: 14px;
  line-height: 1.4;
  /* white-space: pre-wrap; */
  -webkit-font-smoothing: subpixel-antialiased
}

.sc-message--content.sent .sc-message--button {
  word-wrap: break-word;
}

.sc-message--button-icon {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;
  margin-bottom: 0px;
}

.sc-image {
  max-width: 100%;
  min-width: 100%;
}

.sc-message--button-text {
  padding: 17px 20px;
  border-radius: 6px;
  font-weight: 300;
  font-size: 14px;
  line-height: 1.4;
  /* white-space: pre-wrap; */
  -webkit-font-smoothing: subpixel-antialiased
}

.sc-message--button-name {
  color: white;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 0;
  font-size: x-small;
  text-align: center;
}

.sc-message--button-row {
  text-align: center;
  background: inherit;
  padding-bottom: 5px;
  border-radius: 6px;
}

.sc-message--button-element {
  /* text-align: center;
  font-size: 12px;
  line-height: 30px;
  height: 30px;
  overflow: hidden;
  border: 1px solid rgba(78, 140, 255, 0.4);
  border-radius: 10px;
  border: none;
  cursor: pointer; */
  margin: 3px;
  padding: 5px 10px 5px 10px;
  border: 1px solid rgba(78, 140, 255, 0.4);
  color:#4e8cff;
  border-radius: 15px;
  font-size: 14px;
  background: inherit;
  cursor: pointer;
}

.sc-message--button-name a {
  text-decoration: none;
  color: #ece7e7;
}

.sc-message--button-name a:hover {
  color: white;
}

.sc-message--content.sent .sc-message--button-text {
  color: white;
  background-color: #4e8cff;
  word-wrap: break-word;
}

.sc-message--content.received .sc-message--button {
  color: #263238;
  background-color: #f4f7f9;
  margin-right: 40px;
}

.sc-message--content.received .sc-message--button-name {
  color: #000;
}

.sc-message--content.received .sc-message--button a {
  color: rgba(43, 40, 40, 0.7);
}

.sc-message--content.received .sc-message--button a:hover {
  color: #0c0c0c;
}
</style>
