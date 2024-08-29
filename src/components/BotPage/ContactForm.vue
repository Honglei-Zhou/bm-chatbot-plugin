<template>
  <div v-show="showFlag" class="sc-contact--information">
    <div class="sc-inventory--element-icon">
      <img v-if="data.image_urls.length>0" :src="data.image_urls[0]" class="sc-image">
      <img v-else :src="dealer.defaultImage" class="sc-image">
      <!-- <img v-else src="https://di-uploads-development.dealerinspire.com/hondaofdowntownchicago/uploads/2017/12/Honda-of-Downtown-Chicago-Logo.png" class="sc-image"> -->
      <div class="sc-inventory--element-title">
        {{ data.name }}
      </div>
      <div class="sc-inventory--element-close" @click="onClose">
        <img :src="icons.close.img" :alt="icons.close.name" >
      </div>

    </div>
    <div class="sc-inventory--element-details">
      <div class="sc-inventory--element-stock">
        <div v-if="data.title" class="sc-inventory--element-text">{{ data.title }}</div>
        <div v-if="data.subtitle" class="sc-inventory--element-text">{{ data.subtitle }}</div>

      </div>
    </div>
    <p v-show="errorMessage !== ''" class="error">{{ errorMessage }}</p>
    <p v-show="successMessage !== ''" class="success">{{ successMessage }}</p>
    <input v-model="name" placeholder="Name">
    <input v-model="email" placeholder="Email">
    <input v-model="phone" placeholder="Phone Number">
    <input v-model="zipcode" placeholder="Zip Code">
    <button :disabled="!isAuthorized" @click="sendItem">GET BEST PRICE NOW</button>
  </div>
</template>

<script>
import { smsService } from '@/api/smsService'
import { validator } from '@/api/validator'
import { mapState } from 'vuex'
import CloseIcon from '@/assets/icons/close-icon.png'

export default {
  name: 'ContactForm',
  props: {
    data: {
      type: Object,
      required: true
    },
    icons: {
      type: Object,
      default: function() {
        return {
          close: {
            img: CloseIcon,
            name: 'default'
          }
        }
      }
    }
  },
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      zipcode: '',
      isSubmitted: false,
      showFlag: false,
      smsConfig: {
        title: 'Please provide a mobile phone number so we may send you a response by text messages',
        toc: 'By clicking on "TEXT ME" I agree to receive text messages from our representatives and understand that no consent to texting is required for purchase of products or services. Standard text messaging rates may apply based on your mobile phone carrier.'
      },
      colors: {
        header: { backgroundColor: '#19be6b', color: 'white' },
        content: { backgroundColor: 'white', color: 'rgba(0,0,0,0.6)' },
        button: { backgroundColor: '#19be6b', color: 'white' }
      },
      isAuthorized: true,
      errorMessage: '',
      successMessage: ''
    }
  },
  computed: {
    ...mapState('telleChat', ['roomId', 'bot', 'dealer']),
    payload() {
      return 'My name is: ' + this.name + '. My phone number is ' + this.phone + ' ' + 'My message: ' + this.message
    }
  },
  methods: {
    show() {
      this.showFlag = true
    },
    hide() {
      this.showFlag = false
    },
    onClose() {
      this.hide()
    },
    sendItem() {
      if (this.bot.cId !== '') {
        if (validator.validateEmail(this.email)) {
          var vin = ''
          var stock = ''
          if (this.data.title) {
            var items = this.data.title.split('#')
            vin = items.length === 2 ? items[1] : ''
          }

          if (this.data.subtitle) {
            var stockItems = this.data.subtitle.split('#')
            stock = stockItems.length === 2 ? stockItems[1] : ''
          }
          this.errorMessage = ''
          var leads = {
            dealerId: this.bot.cId,
            customer: this.name,
            email: this.email,
            phone: this.phone,
            zipcode: this.zipcode,
            sessionId: this.roomId,
            vin: vin,
            stock: stock,
            title: this.data.name,
            price: this.data.meta.price
          }

          smsService.sendInquiryMessage(leads).then((resp) => {
            this.successMessage = 'Thank you for submitting message.'
            setTimeout(() => {
              this.successMessage = ''
              this.name = ''
              this.email = ''
              this.phone = ''
              this.zipcode = ''
              this.hide()
            }, 2000)
          }).catch((err) => {
            console.log(err)
            this.errorMessage = 'Failed to submit, please retry.'
            setTimeout(() => {
              this.errorMessage = ''
            }, 2000)
          })
        } else {
          this.errorMessage = 'Error: invalid email. Please enter a valid email.'
          setTimeout(() => {
            this.errorMessage = ''
          }, 2000)
        }
      } else {
        this.isAuthorized = false
      }
    }
  }
}
</script>

<style scoped>
.sc-contact--information {
  -webkit-font-smoothing: subpixel-antialiased;
  width: 334px;
  height: 100%;
  z-index: 999999999;
  position: fixed;
  overflow-y: scroll;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.9);
  opacity: 1;
}

.error {
  color: #ed4014;
  text-shadow: none;
  font-size: 14px;
}

.success {
  color: #19be6b;
  text-shadow: none;
  font-size: 14px;
}

.sc-contact--information input {
    width: 80%;
    height: 26px;
    line-height: 1.5;
    margin-top: 15px;
    padding: 4px 7px;
    font-size: 12px;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    color: #515a6e;
}

.sc-inventory--element-icon {
  text-align: center;
  margin: 0px;
  position: relative;
}

.sc-image {
  /* border-radius: 15px 15px 1px 1px; */
  width: 100%;
  max-height: 290px;
  object-fit: cover;
}

.sc-inventory--element-title {
  /* color: white; */
  position: absolute;
  bottom: 30px;
  /* color: rgba(0, 0, 0, 1); */
  color: white;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 10px;
  font-size: 16px;
  line-height: 1.6;
  font-weight: 700;
  text-align: center;
  border-radius: 15px;
}

.sc-inventory--element-close {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 40px;
    align-self: center;
    height: 40px;
    margin-right: 10px;
    box-sizing: border-box;
    cursor: pointer;
    border-radius: 50%;
    /* background: rgb(31, 149, 231); */
    border: 1px solid #008000;
    background-color: #008000;
}

.sc-inventory--element-close:hover {
  box-shadow: 0px 2px 5px rgba(0.2, 0.2, 0.5, .1);
}

.sc-inventory--element-close img {
  width: 100%;
  height: 100%;
  padding: 13px;
  box-sizing: border-box;
}

.sc-inventory--element-details {
    padding: 5px 15px;
    display: flex;
    flex-direction: row;
}

.sc-inventory--element-stock {
    width: 70%;
}

.sc-inventory--element-text {
  /* padding-left: 15px; */
  font-weight: 300;
  font-size: 14px;
  line-height: 1.4;
  text-align: left;
  color: white;
  /* white-space: pre-wrap; */
  -webkit-font-smoothing: subpixel-antialiased
}

.sc-inventory--element-subtitle {
  padding-left: 15px;
  font-weight: 300;
  font-size: 14px;
  line-height: 1.4;
  color: white;
  /* white-space: pre-wrap; */
  -webkit-font-smoothing: subpixel-antialiased
}

.sc-contact--information button {
    width: 80%;
    height: 40px;
    display: inline-block;
    margin-top: 15px;
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
    border: 1px solid #008000;
    background-color: #008000;
    color: white;
}

.sc-contact--information-text{
  width: 80%;
  display: inline-block;
  text-align: justify;
  font-weight: 300;
  font-size: 14px;
  line-height: 1.4;
  -webkit-font-smoothing: subpixel-antialiased
}

</style>
