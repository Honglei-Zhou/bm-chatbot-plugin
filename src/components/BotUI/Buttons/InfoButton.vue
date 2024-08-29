<template>
  <button
    class="sc-tool-bar-info-icon-wrapper"
    @click.prevent="onClick"
  >
    <svg
      t="1561661935963"
      class="sc-tool-bar-info-icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="2063"
      width="48"
      height="48"
      xmlns:xlink="http://www.w3.org/1999/xlink">
      <g>
        <path
          :style="{fill: color}"
          d="M512.670266 959.469288c-246.343571 0-446.760137-200.63146-446.760137-447.240067S266.325671 64.979944 512.670266
            64.979944s446.760137 200.641693 446.760137 447.2503S759.013837 959.469288 512.670266 959.469288zM512.670266 130.429585c-210.29147
            0-381.381104 171.283038-381.381104 381.800659S302.378795 894.019647 512.670266 894.019647s381.381104-171.272805 381.381104-381.790426S722.961736
            130.429585 512.670266 130.429585z"
          p-id="2064"/>
      </g>
      <g>
        <path
          :style="{fill: color}"
          d="M447.290209 317.17171a63.891 63.959 0 1 0 130.760113 0 63.891 63.959
            0 1 0-130.760113 0Z"
          p-id="2065"/>
      </g>
      <g>
        <path
          :style="{fill: color}"
          d="M512.197498 820.218804c-30.093389 0-54.235229-24.416086-54.235229-54.541197L457.96227
            482.062154c0-30.126134 24.14184-54.541197 54.235229-54.541197 30.093389 0 54.235229 24.416086 54.235229
            54.541197l0 283.615453C566.432727 795.802718 542.290887 820.218804 512.197498 820.218804z"
          p-id="2066"/>
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
.sc-tool-bar-info-icon-wrapper {
  background: none;
  border: none;
  padding: 0px;
  margin: 0px;
  outline: none;
}

.sc-tool-bar-info-icon-wrapper:focus {
  outline: none;
}

.sc-tool-bar-info-icon {
  height: 30px;
  width: 30px;
  cursor: pointer;
  align-self: center;
  outline: none;
}

.sc-tool-bar-info-icon:hover path {
  filter: contrast(15%);
}
</style>
