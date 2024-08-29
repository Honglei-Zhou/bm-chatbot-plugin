<template>
  <div v-show="showFlag" class="sc-contact--information">
    <div :style="colors.header" class="sc-contact--information-header">
      <div class="sc-contact--information-header-title">
        {{ contactConfig.title }}
      </div>
    </div>
    <!-- <div class="sc-contact--information-text" :style="colors.content" v-if="data.subtitle">{{data.subtitle}}</div>
    <div class="sc-contact--information-text" :style="colors.content" v-if="data.text">{{data.text}}</div> -->
    <input v-model="email" placeholder="Email">
    <input v-model="phone" placeholder="Phone Number">
    <div :style="colors.content" class="sc-contact--information-text">{{ contactConfig.toc }}</div>
    <button :disabled="!isAuthorized" :style="colors.button" @click="sendItem">SUBMIT</button>

    <p v-show="errorMessage !== ''" class="error">{{ errorMessage }}</p>
    <p v-show="successMessage !== ''" class="success">{{ successMessage }}</p>
  </div>
</template>

<script>
import { smsService } from '@/api/smsService'
import { validator } from '@/api/validator'
import { mapState } from 'vuex'

export default {
  name: 'Contactinformation',
  data() {
    return {
      email: '',
      phone: '',
      isAuthorized: true,
      showFlag: false,
      contactConfig: {
        title: 'Please provide a mobile phone number and/or email so we may send you a permanent link to this conversation',
        toc: 'By clicking on "Submit" I agree to receive text messages from our representatives and understand that no consent to texting is required for purchase of products or services. Standard text messaging rates may apply based on your mobile phone carrier.'
      },
      colors: {
        header: { backgroundColor: '#19be6b', color: 'white' },
        content: { backgroundColor: 'white', color: 'rgba(0,0,0,0.6)' },
        button: { backgroundColor: '#19be6b', color: 'white' }
      },
      errorMessage: '',
      successMessage: ''
    }
  },
  computed: {
    ...mapState('telleChat', ['roomId', 'bot']),
    payload() {
      return 'You have submited the following information: ' + 'Email: ' + this.email + ' ' + 'Phone: ' + this.phone
    }
  },
  methods: {
    show() {
      this.showFlag = true
    },
    hide() {
      this.showFlag = false
    },
    sendItem() {
      if (this.bot.cId && this.bot.origin) {
        if (validator.validatePhonenNmber(this.phone) || validator.validateEmail(this.email)) {
          this.errorMessage = ''
          // this.$emit('sendItem', {payload: this.payload})
          var leads = {
            dealerId: this.bot.cId,
            customer: 'customer',
            email: this.email,
            phone: this.phone,
            note: '',
            sessionId: this.roomId
          }

          smsService.sendSMSMessage(leads).then((resp) => {
            this.successMessage = 'Thank you for submitting contanct information.'
            setTimeout(() => {
              this.successMessage = ''
              this.name = ''
              this.email = ''
              this.phone = ''
              this.message = ''
            }, 2000)
          }).catch(() => {
            this.errorMessage = 'Failed to submit, please retry.'
          })
          // smsService.sendProfile(localStorage.key, localStorage.origin, this.email, this.phone).then(()=> {
          //     this.successMessage = 'Thank you for submitting message.'
          //     setTimeout(()=>{
          //       this.successMessage = ''
          //       this.email = ''
          //       this.phone = ''
          //     },2000)
          // }).catch(()=>{
          //   this.errorMessage = 'Error: failed to send message. Please retry.'
          // })
        } else {
          this.errorMessage = 'Error: failed to submit. Please enter a valid phone number or email.'
          // setTimeout(()=>{
          //       this.errorMessage = ''
          //       this.email = ''
          //       this.phone = ''
          //     },2000)
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
  width: 100%;
  height: 100%;
  font-weight: 300;
  /* white-space: pre-wrap; */
  -webkit-font-smoothing: subpixel-antialiased;
}

.sc-contact--information-header {
  /* color: white; */
  /* height: 100px; */
  padding: 15px;
  text-align: center;
  border-top-left-radius: 9px;
}

.sc-contact--information-header-title{
  padding: 5px;
  font-size: 16px;
  line-height: 30px;
  font-weight: 500;
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

.sc-contact--information input:last-of-type {
    width: 80%;
    height: 26px;
    line-height: 1.5;
    margin-top: 15px;
    margin-bottom: 15px;
    padding: 4px 7px;
    font-size: 12px;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    color: #515a6e;
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
}

.sc-contact--information-text{
  width: 80%;
  display: inline-block;
  /* padding: 5px; */
  text-align: justify;
  font-weight: 300;
  font-size: 14px;
  line-height: 1.4;
  /* white-space: pre-wrap; */
  -webkit-font-smoothing: subpixel-antialiased
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
</style>
