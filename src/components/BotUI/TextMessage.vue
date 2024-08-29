<template>
  <div :style="messageColors" class="sc-message--text">
    <p v-html="messageText"/>
    <p v-if="data.meta" :style="{color: messageColors.color}" class="sc-message--meta">{{ data.meta }}</p>
  </div>
</template>

<script>
import escapeGoat from 'escape-goat'
import Autolinker from 'autolinker'
// eslint-disable-next-line no-unused-vars
const fmt = require('msgdown')

export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    messageColors: {
      type: Object,
      required: true
    },
    messageStyling: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    messageText() {
      try {
        var escaped = escapeGoat.escape(this.data.text)
        // return Autolinker.link(this.messageStyling ? fmt(escaped) : escaped, {
        //   className: 'chatLink',
        //   truncate: { length: 50, location: 'smart' }
        // })
        return Autolinker.link(escaped, {
          className: 'chatLink',
          truncate: { length: 50, location: 'smart' }
        })
      } catch (err) {
        console.log(err)
        return this.data.text
      }
    }
  }
}
</script>

<style scoped>
a.chatLink {
  color: inherit !important;
}
</style>
