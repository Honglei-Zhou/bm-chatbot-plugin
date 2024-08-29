<template>
  <div v-show="showDateTimePicker">
    <div class="sc-datetime-picker-container">
      <flat-pickr
        id="datetime-input"
        :config="dateTimePicker"
        v-model="dateTime"
        class="sc-datetime-picker"
        placeholder="Please choose your time"/>
      <button class="sc-datetime-picker-button" @click="selectTime">Select</button>
    </div>
  </div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'

export default {
  components: {
    flatPickr
  },
  data() {
    return {
      dateTime: null,
      dateTimePicker: {
        enableTime: true,
        dateFormat: 'Y-m-d h:i K'
      },
      showDateTimePicker: false
    }
  },
  methods: {
    show() {
      this.showDateTimePicker = true
    },
    hide() {
      this.dateTime = null
      this.showDateTimePicker = false
    },
    selectTime() {
      console.log(this.dateTime)
      if (this.dateTime !== null && this.dateTime !== '') this.$emit('sendItem', { payload: this.dateTime })
      this.$emit('closeDateTimePicker')
      this.hide()
    }
  }
}
</script>

<style>
.sc-datetime-picker-container {
  /* min-height: 55px; */
  height: 40px;
  margin: 0px;
  position: relative;
  width: 100%;
  /* padding: 0px 2px; */
  background-color: #f4f7f9;
  border-top: 1px solid rgba(0,0,0,0.1);
  border-bottom: 1px solid rgba(0,0,0,0.1);
  /* border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px; */
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
}

.sc-datetime-picker {
  /* width: 100px; */
  width: 80%;
  /* position: absolute; */
  height: 95%;
  border: none;
}

.sc-datetime-picker-button {
  /* width: 100px; */
  width: 20%;
  /* position: absolute; */
  height: 90%;
  margin-top: 2.5px;
  text-align: center;
  font-size: 14px;
  line-height: 1.4;
  overflow: hidden;
  border: 1px solid rgb(31, 149, 231);
  background-color: rgb(31, 149, 231);
  color: white;
  border-radius: 20px;
  /* border: none; */
  cursor: pointer;
}
</style>
