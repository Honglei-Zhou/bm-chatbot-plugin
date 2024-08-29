<template>
  <button
    class="sc-tool-bar-hours-icon-wrapper"
    @click.prevent="onClick"
  >
    <svg
      t="1561661187263"
      class="sc-tool-bar-hours-icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="5521"
      width="48"
      height="48"
      xmlns:xlink="http://www.w3.org/1999/xlink">
      <g>
        <path
          :style="{fill: color}"
          d="M512 0C229.376 0 0 229.376 0 512s229.376 512 512 512 512-229.376 512-512S794.624 0 512 0z m0 955.904c-244.736
            0-443.904-199.168-443.904-443.904S267.264 68.096 512 68.096s443.904 199.168 443.904 443.904-199.168 443.904-443.904 443.904z
            m243.2-382.464c0 18.944-15.36 34.304-34.304 34.304H483.328c-18.944 0-34.304-15.36-34.304-34.304V335.872a34.304 34.304 0 0 1
            68.608 0v203.776h203.776c18.432 0 33.792 15.36 33.792 33.792z"
          p-id="5522"/>
      </g>
    </svg>
  </button>
</template>

<script>

export default {
  props: {
    onClick: {
      type: Function,
      required: true
    },
    color: {
      type: String,
      required: true
    }
  }
}

</script>

<style scoped>
.sc-tool-bar-hours-icon-wrapper {
  background: none;
  border: none;
  padding: 0px;
  margin: 0px;
  outline: none;
}

.sc-tool-bar-hours-icon-wrapper:focus {
  outline: none;
}

.sc-tool-bar-hours-icon {
  height: 26px;
  width: 26px;
  cursor: pointer;
  align-self: center;
  outline: none;
}

.sc-tool-bar-hours-icon:hover path {
  filter: contrast(15%);
}
</style>
