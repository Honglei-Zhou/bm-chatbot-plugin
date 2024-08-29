<template>
  <button
    class="sc-tool-bar-profile-icon-wrapper"
    @click="onClick"
  >
    <!-- <svg
        version='1.1'
        class="sc-tool-bar-profile-icon"
        xmlns='http://www.w3.org/2000/svg'
        x='0px'
        y='0px'
        width='37.393px'
        height='37.393px'
        viewBox='0 0 37.393 37.393'
        enableBackground='new 0 0 37.393 37.393'>
        <g id='Layer_2'>
          <path :style="{fill: color}" d='M36.511,17.594L2.371,2.932c-0.374-0.161-0.81-0.079-1.1,0.21C0.982,3.43,0.896,3.865,1.055,4.241l5.613,13.263
          L2.082,32.295c-0.115,0.372-0.004,0.777,0.285,1.038c0.188,0.169,0.427,0.258,0.67,0.258c0.132,0,0.266-0.026,0.392-0.08
          l33.079-14.078c0.368-0.157,0.607-0.519,0.608-0.919S36.879,17.752,36.511,17.594z M4.632,30.825L8.469,18.45h8.061
          c0.552,0,1-0.448,1-1s-0.448-1-1-1H8.395L3.866,5.751l29.706,12.757L4.632,30.825z' />
        </g>
      </svg> -->
    <svg
      t="1561654575247"
      class="sc-tool-bar-profile-icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="2128"
      width="48"
      height="48"
      xmlns:xlink="http://www.w3.org/1999/xlink">
      <g>
        <path
          :style="{fill: color}"
          d="M513 733.23a233.63 233.63 0 1 1 165.21-68.42A232.14 232.14 0 0 1 513 733.23zM513 326c-95.75 0-173.65 77.88-173.65 173.62S417.25
        673.23 513 673.23s173.65-77.88 173.65-173.61S608.75 326 513 326z"
          p-id="2129"/>
      </g>
      <g>
        <path
          :style="{fill: color}"
          d="M795.82 850.77a29.91 29.91 0 0 1-22-9.59c-64.29-69.25-159.36-109-260.82-109-99.79 0-193.85 38.65-258.06 106a30 30 0 0 1-43.44-41.39C287
        717.64 396.88 672.21 513 672.21c118.09 0 229.19 46.71 304.79 128.15a30 30 0 0 1-22 50.41z"
          p-id="2130"/>
      </g>
      <g>
        <path
          :style="{fill: color}"
          d="M512 962a448.11 448.11 0 0 1-174.39-860.78 448.11 448.11 0 0 1 348.78 825.56A445.19 445.19 0 0 1 512 962z m0-836c-213.94 0-388 174.06-388
        388s174.06 388 388 388 388-174.06 388-388-174.06-388-388-388z"
          p-id="2131"/>
      </g>
    </svg>
    <!-- <img v-if = "isActive"  :src="activeIcon" width="36" height="36">
     <img v-else :src="inActiveIcon" width="36" height="36"> -->
  </button>
</template>

<script>
import ActiveIcon from '@/assets/icons/profile-active.svg'
import InActiveIcon from '@/assets/icons/profile-inactive.svg'

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
  },
  data() {
    return {
      activeIcon: ActiveIcon,
      inActiveIcon: InActiveIcon,
      isActive: false
    }
  },

  methods: {
    _showActiveIcon() {
      this.isActive = !this.isActive
    }
  }
}

</script>

<style scoped>
.sc-tool-bar-profile-icon-wrapper {
  background: none;
  border: none;
  padding: 0px;
  margin: 0px;
  outline: none;
}

.sc-tool-bar-profile-icon-wrapper:focus {
  outline: none;
}

.sc-tool-bar-profile-icon {
  height: 30px;
  width: 30px;
  cursor: pointer;
  align-self: center;
  outline: none;
}

.sc-tool-bar-profile-icon:hover path {
  filter: contrast(15%);
}
</style>
