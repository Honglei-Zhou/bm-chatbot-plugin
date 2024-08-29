<template>
  <button
    class="sc-tool-bar-contact-icon-wrapper"
    @click.prevent="onClick"
  >
    <svg
      t="1561663585546"
      class="sc-tool-bar-contact-icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="7125"
      width="48"
      height="48"
      xmlns:xlink="http://www.w3.org/1999/xlink">
      <g>
        <path
          :style="{fill: color}"
          d="M832 64H256a128 128 0 0 0-128 128v64h-32a32 32 0 0 0 0 64H128v160h-32a32 32 0 0 0 0 64H128V704h-32a32 32 0 0 0 0 64H128v64a128 128 0 0 0
     128 128h576a128 128 0 0 0 128-128V192a128 128 0 0 0-128-128z m64 768a64 64 0 0 1-64 64H256a64 64 0 0 1-64-64v-64h32a32 32 0 0 0 0-64H192V544h32a32
     32 0 0 0 0-64H192V320h32a32 32 0 0 0 0-64H192V192a64 64 0 0 1 64-64h576a64 64 0 0 1 64 64v640z"
          p-id="7126"/>
      </g>

      <g>
        <path
          :style="{fill: color}"
          d="M544 576a192 192 0 0 0-192 192h64a128 128 0 0 1 256 0h64a192 192 0 0 0-192-192zM544 512a128 128 0 1 0-0.064-256.064A128 128 0 0 0 544
        512z m0-191.488a63.488 63.488 0 1 1 0 126.976 63.488 63.488 0 0 1 0-126.976z"
          p-id="7127"/>
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
.sc-tool-bar-contact-icon-wrapper {
  background: none;
  border: none;
  padding: 0px;
  margin: 0px;
  outline: none;
}

.sc-tool-bar-contact-icon-wrapper:focus {
  outline: none;
}

.sc-tool-bar-contact-icon {
  height: 30px;
  width: 30px;
  cursor: pointer;
  align-self: center;
  outline: none;
}

.sc-tool-bar-contact-icon:hover path {
  filter: contrast(15%);
}
</style>
