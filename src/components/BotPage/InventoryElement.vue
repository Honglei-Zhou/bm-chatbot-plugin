<template>
  <div :style="messageColors" class="sc-inventory--element">
    <div class="sc-inventory--element-icon">
      <Swiper v-if="data.image_urls.length>0" ref="swiper" :auto-play="false" :show-indicator="false">
        <Slide v-for="(item, index) in data.image_urls" :key="index">
          <img :src="item" class="sc-image">
        </Slide>
      </Swiper>
      <Swiper v-else ref="swiper" :auto-play="false" :show-indicator="false">
        <Slide>
          <!-- <img src="https://di-uploads-development.dealerinspire.com/hondaofdowntownchicago/uploads/2017/12/Honda-of-Downtown-Chicago-Logo.png" class="sc-image"> -->
          <img :src="dealer.defaultImage" class="sc-image">
        </Slide>
      </Swiper>
    </div>
    <div :style="messageColors" class="sc-inventory--element-title">
      {{ data.name }}
    </div>
    <div class="sc-inventory--element-details">
      <div class="sc-inventory--element-stock">
        <div v-if="data.title" :style="messageColors" class="sc-inventory--element-text">{{ data.title }}</div>
        <div v-if="data.subtitle" :style="messageColors" class="sc-inventory--element-text">{{ data.subtitle }}</div>
      </div>
      <div class="sc-inventory--element-price">
        <div v-if="data.meta" :style="messageColors" class="sc-inventory--element-text">{{ data.meta.title }}</div>
        <div v-if="data.meta" class="sc-inventory--element-text-price">{{ data.meta.value }} <p v-if="data.meta.msrp && data.meta.msrp !== '$null'">{{ data.meta.msrp }}</p></div>
      </div>
    </div>
    <!-- <button class="sc-inventory--element-button" @click="$emit('sendItem', {payload: data.subtitle})">Select and View</button> -->
    <button class="sc-inventory--element-button" @click="openUrl(data.buttons[0])">Select and View</button>
    <button class="sc-inventory--element-best-price" @click="openContactForm">Get Best Price</button>
    <ContactForm ref="contactForm" :data="data"/>
  </div>
</template>

<script>
import { Slide, Swiper } from '@/components/Util'
import ContactForm from '@/components/BotPage/ContactForm'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'InventoryElement',
  components: {
    Slide,
    Swiper,
    ContactForm
  },
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
  computed: {
    ...mapState('telleChat', ['dealer'])
  },
  methods: {
    ...mapActions('telleChat', ['sendPageViewInfo']),
    openUrl(messageButton) {
      if (messageButton.type === 'url') {
        // console.log(messageButton.payload)
        window.open(messageButton.payload, '_blank')
        this.sendPageViewInfo({ data: messageButton.payload, clicked: 1 })
      } else {
        // window.open('https://www.telle.ai', '_blank')
        this.$emit('sendItem', messageButton)
      }
    },
    openContactForm() {
      this.$refs.contactForm.show()
    }
  }
}
</script>

<style scoped>
.sc-inventory--element {
  width: 100%;
  border-radius: 15px;
  margin-top: 20px;
  box-shadow: 0 0 1px 1px rgba(0,0,0,0.2);
  /* white-space: pre-wrap; */
  -webkit-font-smoothing: subpixel-antialiased
}

.sc-inventory--element:first-of-type{
    margin-top: 0px;
}

.sc-inventory--element-next {
  /* position: absolute; */
  margin-right: 10px;
}

.sc-inventory--element-icon {
  text-align: center;
  margin: 0px;
  /* margin-left: auto;
  margin-right: auto;
  margin-top: 0px;
  margin-bottom: 0px; */
}

.sc-image {
  border-radius: 15px 15px 1px 1px;
  width: 100%;
  max-height: 290px;
  object-fit: cover;
}

.sc-inventory--element-details {
    padding: 5px 15px;
    display: flex;
    flex-direction: row;
}

.sc-inventory--element-stock {
    width: 70%;
}

.sc-inventory--element-price {
    width: 30%;
}

.sc-inventory--element-text {
  /* padding-left: 15px; */
  font-weight: 300;
  font-size: 14px;
  line-height: 1.4;
  text-align: left;
  /* white-space: pre-wrap; */
  -webkit-font-smoothing: subpixel-antialiased
}

.sc-inventory--element-text-price {
  /* padding-left: 15px; */
  font-weight: 700;
  color: red;
  font-size: 14px;
  line-height: 1.4;
  text-align: right;
  /* white-space: pre-wrap; */
  -webkit-font-smoothing: subpixel-antialiased
}

.sc-inventory--element-text-price p {
  /* padding-left: 15px; */
  display: inline;
  font-weight: 300;
  color: black;
  font-size: 14px;
  line-height: 1.4;
  text-align: right;
  text-decoration: line-through;
  /* white-space: pre-wrap; */
  -webkit-font-smoothing: subpixel-antialiased
}

.sc-inventory--element-title {
  /* color: white; */
  color: rgba(0, 0, 0, 1);
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 10px;
  font-size: 16px;
  line-height: 1.6;
  font-weight: 700;
  text-align: center;
  border-radius: 15px;
}

.sc-inventory--element-subtitle {
  padding-left: 15px;
  font-weight: 300;
  font-size: 14px;
  line-height: 1.4;
  /* white-space: pre-wrap; */
  -webkit-font-smoothing: subpixel-antialiased
}

.sc-inventory--element-button {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 15px;
  font-size: 14px;
  line-height: 1.4;
  width: 70%;
  height: 40px;
  overflow: hidden;
  border: 1px solid rgb(31, 149, 231);
  background-color: rgb(31, 149, 231);
  color: white;
  border-radius: 20px;
  /* border: none; */
  cursor: pointer;
}

.sc-inventory--element-best-price {
  text-align: center;
  margin-bottom: 15px;
  font-size: 14px;
  line-height: 1.4;
  width: 70%;
  height: 40px;
  overflow: hidden;
  border: 1px solid #008000;
  background-color: #008000;
  color: white;
  border-radius: 20px;
  /* border: none; */
  cursor: pointer;
}

@media (max-width: 450px) {
  .sc-inventory--element {
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
