<template>
  <div class="sc-user-input--picker-wrapper">
    <button
      class="sc-user-input--emoji-icon-wrapper"
      @click.prevent="_openPicker"
    >
      <!-- <svg
        t="1561661187263"
        class="sc-user-input--picker-icon" :class="{active: isActive}"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="6631"
        width="48"
        height="48"
        xmlns:xlink="http://www.w3.org/1999/xlink">
        <g>
            <path :style="{fill: color}" d="M512 0C229.376 0 0 229.376 0 512s229.376 512 512 512 512-229.376 512-512S794.624 0 512 0z m0 955.904c-244.736
            0-443.904-199.168-443.904-443.904S267.264 68.096 512 68.096s443.904 199.168 443.904 443.904-199.168 443.904-443.904 443.904z
            m243.2-382.464c0 18.944-15.36 34.304-34.304 34.304H483.328c-18.944 0-34.304-15.36-34.304-34.304V335.872a34.304 34.304 0 0 1
            68.608 0v203.776h203.776c18.432 0 33.792 15.36 33.792 33.792z" p-id="5522">
            </path>
        </g>
     </svg> -->
      <svg
        :class="{active: isActive}"
        t="1561661187263"
        class="sc-user-input--picker-icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="6631"
        width="48"
        height="48"
        xmlns:xlink="http://www.w3.org/1999/xlink">
        <g>
          <path
            :style="{fill: color}"
            d="M834.6 757.5h-59.5V651.3c0-14.1-11.5-25.7-25.7-25.7h-8.7c-14.1 0-25.7 11.5-25.7 25.7v128.5c-0.1 1.1-0.2 2.2-0.2 3.4v8.7c0 14.1
            11.5 25.7 25.7 25.7h94.1c14.1 0 25.7-11.5 25.7-25.7v-8.7c-0.1-14.1-11.6-25.7-25.7-25.7z"
            p-id="6632"
            fill="#515151"/>
        </g>
        <g>
          <path
            :style="{fill: color}"
            d="M745.5 529c-119 0-215.5 96.5-215.5 215.5S626.5 960 745.5 960 961 863.5 961 744.5 864.5 529 745.5 529z m110 325.5c-29.4 29.4-68.4
            45.5-110 45.5s-80.6-16.2-110-45.5S590 786 590 744.5s16.2-80.6 45.5-110S704 589 745.5 589s80.6 16.2 110 45.5S901 703 901
            744.5s-16.2 80.6-45.5 110z"
            p-id="6633"
            fill="#515151"/>
        </g>
        <g>
          <path
            :style="{fill: color}"
            d="M458 859H125V404.7h727V449c0 16.5 13.5 30 30 30s30-13.5 30-30V180c0-33-27-60-60-60H706V94c0-16.5-13.5-30-30-30s-30 13.5-30
            30v26H333V94c0-16.5-13.5-30-30-30s-30 13.5-30 30v26H125c-33 0-60 27-60 60v679c0 33 27 60 60 60h333c16.5 0 30-13.5 30-30s-13.5-30-30-30zM273 180v22c0
            16.5 13.5 30 30 30s30-13.5 30-30v-22h313v22c0 16.5 13.5 30 30 30s30-13.5 30-30v-22h146v164.7H125V180h148z"
            p-id="6634"
            fill="#515151"/>
        </g>
        <g>
          <path
            :style="{fill: color}"
            d="M330.1 504.6c0-5.5-4.5-10-10-10h-84.4c-5.5 0-10 4.5-10 10V589c0 5.5 4.5 10 10 10h84.4c5.5 0 10-4.5 10-10v-84.4zM320.1 677.9h-84.4c-5.5
            0-10 4.5-10 10v84.5c0 5.5 4.5 10 10 10h84.4c5.5 0 10-4.5 10-10v-84.5c0-5.5-4.5-10-10-10zM446.3 494.6c-5.5 0-10 4.5-10 10V589c0 5.5 4.5 10 10
            10h84.4c5.5 0 10-4.5 10-10v-84.5c0-5.5-4.5-10-10-10h-84.4zM446.3 677.9c-5.5 0-10 4.5-10 10v84.5c0 5.5 4.5 10 10 10h57.1c-1.6-10.7-2.5-21.7-2.5-32.8
            0-25.1 4.3-49.2 12.2-71.6h-66.8z"
            p-id="6635"
            fill="#515151"/>
        </g>
      </svg>
    </button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      isActive: false
    }
  },
  computed: {
    color() {
      if (this.isActive) return '#1296db'
      else return '#565867'
    }
  },
  methods: {
    _openPicker(e) {
      this.isActive = !this.isActive
      this.$emit('toggleDateTimePicker', this.isActive)
    },
    _closePicker() {
      this.isActive = false
    }
  }
}
</script>

<style scoped>
.sc-user-input--emoji-icon-wrapper {
  background: none;
  border: none;
  padding: 0px;
  margin: 0px;
  outline: none;
}

.sc-user-input--emoji-icon-wrapper:focus {
  outline: none;
}

.sc-user-input--picker-icon {
  height: 20px;
  cursor: pointer;
  align-self: center;
}

.sc-user-input--emoji-icon-wrapper:focus .sc-user-input--picker-icon path,
.sc-user-input--emoji-icon-wrapper:focus .sc-user-input--picker-icon circle,
.sc-user-input--picker-icon.active path,
.sc-user-input--picker-icon.active circle,
.sc-user-input--picker-icon:hover path,
.sc-user-input--picker-icon:hover circle {
  filter: contrast(15%);
}
</style>
