<template>
  <div :style="{background: '#ffffff'}" class="sc-suggestions-row">
    <button
      v-for="(suggestion, idx) in suggestions"
      :class="small?'sc-suggestions-element-small':'sc-suggestions-element'"
      :style="{borderColor: colors.sentMessage.bg, color: colors.sentMessage.bg}"
      :key="idx"
      @click="$emit('sendSuggestion', suggestion)">{{ suggestion }}</button>
  </div>
</template>

<script>
export default {
  props: {
    suggestions: {
      type: Array,
      default: () => []
    },
    colors: {
      type: Object,
      required: true
    },
    small: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  }
}
</script>

<style>
.sc-suggestions-row {
  text-align: center;
  background: inherit;
}

.sc-suggestions-element {
  margin: 3px;
  padding: 5px 10px 5px 10px;
  border: 1px solid;
  border-radius: 15px;
  font-size: 14px;
  background: inherit;
  cursor: pointer;
}

.sc-suggestions-element-small {
  margin: 3px;
  padding: 5px 5px;
  border: 1px solid;
  border-radius: 15px;
  font-size: 12px;
  background: inherit;
  cursor: pointer;
}
</style>
