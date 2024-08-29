<template>
  <div :style="messageColors" class="sc-message--form">
    <div :style="messageColors" class="sc-message--form-title">
      {{ data.title }}
    </div>
    <div v-if="data.subtitle" :style="messageColors" class="sc-message--form-text">{{ data.subtitle }}</div>
    <!-- <div class="sc-message--form-text" :style="messageColors" v-if="data.text">{{data.text}}<p v-if="data.meta" class='sc-message--meta' :style="messageColors">{{data.meta}}</p></div> -->
    <input v-model="firstName" placeholder="First Name">
    <input v-model="lastName" placeholder="Last Name">
    <input v-model="email" placeholder="Email">
    <input v-model="phone" placeholder="Phone Number">
    <div v-if="data.text" :style="messageColors" class="sc-message--form-text">{{ data.text }}<p v-if="data.meta" :style="messageColors" class="sc-message--meta">{{ data.meta }}</p></div>
    <div v-if="data.buttons && data.buttons.length > 0">
      <button v-for="(formButton, idx) in data.buttons" :disabled="isSubmitted" :key="idx" :style="messageColors" @click="sendItem">{{ formButton.title }}</button>
    </div>

    <!-- <div class='sc-message--form-icon'>
        <img :src="item.image_url" class="sc-image">
    </div>
    <div class='sc-message--form-title' :style="messageColors">
        {{item.title}}
    </div>
    <div class="sc-message--form-text" :style="messageColors" v-if="item.subtitle">{{item.subtitle}}</div>
    <div class="sc-message--form-text" :style="messageColors" v-if="data.text">{{data.text}}<p v-if="data.meta" class='sc-message--meta' :style="messageColors">{{data.meta}}</p></div>
    <div v-if="item.buttons && item.buttons.length > 0">
        <button class="sc-message--form-button" v-for="(formButton, idx) in item.buttons" v-on:click="$emit('sendItem', formButton)"
        :style="messageColors" :key="idx">{{formButton.title}}</button>
    </div> -->
  </div>
</template>

<script>

export default {
  name: 'FormMessage',
  props: {
    data: {
      type: Object,
      required: true
    },
    messageColors: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      isSubmitted: false
    }
  },
  computed: {
    payload() {
      return this.firstName + ' ' + this.lastName + ' ' + this.email + ' ' + this.phone
    }
  },
  methods: {
    sendItem() {
      console.log(this.payload)
      this.isSubmitted = true
      this.$emit('sendItem', { payload: this.payload })
    }
  }
}
</script>

<style scoped>
.sc-message--form {
  width: 100%;
  border-radius: 6px;
  font-weight: 300;
  font-size: 14px;
  line-height: 1.4;
  /* white-space: pre-wrap; */
  -webkit-font-smoothing: subpixel-antialiased
}

.sc-message--form input {
    width: 80%;
    height: 26px;
    line-height: 1.5;
    margin-top: 5px;
    padding: 4px 7px;
    font-size: 12px;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    color: #515a6e;
}

.sc-message--form input:last-of-type {
    width: 80%;
    height: 26px;
    line-height: 1.5;
    margin-top: 5px;
    margin-bottom: 5px;
    padding: 4px 7px;
    font-size: 12px;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    color: #515a6e;
}

.sc-message--form button {
    color: rgb(255, 255, 255);
    background-color: rgb(45, 140, 240);
    border-color: rgb(45, 140, 240);
    display: inline-block;
    margin-bottom: 5px;
    font-weight: 400;
    text-align: center;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    white-space: nowrap;
    user-select: none;
    font-size: 12px;
    border-width: 1px;
    border-style: solid;
    border-image: initial;
    padding: 5px 15px 6px;
    border-radius: 4px;
/*
    height: 30px;
    width: 100%;
    height: 32px;
    line-height: 1.5;
    padding: 4px 7px;
    font-size: 12px;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    color: #515a6e; */
}

.sc-message--content.sent .sc-message--form {
  word-wrap: break-word;
}

.sc-message--form-next {
  /* position: absolute; */
  margin-right: 10px;
}

.sc-message--form-icon {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0px;
  margin-bottom: 0px;
}

.sc-image {
  border-radius: 6px 6px 1px 1px;
  max-width: 100%;
  min-width: 100%;
}

.sc-message--form-text {
  padding: 5px;
  border-radius: 6px;
  font-weight: 300;
  font-size: 12px;
  line-height: 1.4;
  /* white-space: pre-wrap; */
  -webkit-font-smoothing: subpixel-antialiased
}

.sc-message--form-name {
  color: white;
  padding: 5px;
  font-size: x-small;
  text-align: center;
}

.sc-message--form-title {
  /* color: white; */
  color: rgba(0, 0, 0, 1);
  padding: 5px;
  font-weight: 500;
  text-align: center;
  border-radius: 6px;
}

.sc-message--form-subtitle {
  padding: 17px 20px;
  border-radius: 6px;
  font-weight: 300;
  font-size: 12px;
  line-height: 1.4;
  /* white-space: pre-wrap; */
  -webkit-font-smoothing: subpixel-antialiased
}

.sc-message--form-name a {
  text-decoration: none;
  color: #ece7e7;
}

.sc-message--form-name a:hover {
  color: white;
}

.sc-message--form-button {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2px;
  font-size: 14px;
  line-height: 40px;
  width: 100%;
  height: 40px;
  overflow: hidden;
  border: 1px solid rgba(78, 140, 255, 0.4);
  border-radius: 6px;
  /* border: none; */
  cursor: pointer;
}

.sc-message--content.sent .sc-message--form-text {
  color: white;
  background-color: #4e8cff;
  word-wrap: break-word;
}

.sc-message--content.received .sc-message--form {
  color: #263238;
  background-color: #f4f7f9;
  margin-right: 40px;
}

.sc-message--content.received .sc-message--form-name {
  color: #000;
}

.sc-message--content.received .sc-message--form a {
  color: rgba(43, 40, 40, 0.7);
}

.sc-message--content.received .sc-message--form a:hover {
  color: #0c0c0c;
}

@media (max-width: 450px) {
  .sc-message--form {
  width: 80%;
  border-radius: 6px;
  font-weight: 300;
  font-size: 14px;
  line-height: 1.4;
  /* white-space: pre-wrap; */
  -webkit-font-smoothing: subpixel-antialiased
  }
}
</style>
