<template>
  <div v-show="showFlag" class="sc-sms--information">
    <div :style="colors.header" class="sc-sms--information-header">
      <div class="sc-sms--information-header-title">
        {{ smsConfig.title }}
      </div>
    </div>
    <input v-model="name" placeholder="Name">
    <input v-model="email" placeholder="Email">
    <input v-model="phone" placeholder="Phone Number">
    <textarea v-model="message" placeholder="Message"/>
    <div :style="colors.content" class="sc-sms--information-text">{{ smsConfig.toc }}</div>
    <button :disabled="!isAuthorized" :style="colors.button" @click="sendItem">TEXT ME</button>

    <p v-show="errorMessage !== ''" class="error">{{ errorMessage }}</p>
    <p v-show="successMessage !== ''" class="success">{{ successMessage }}</p>
  </div>
</template>

<script>
import { smsService } from '@/api/smsService'
import { validator } from '@/api/validator'
import { mapState } from 'vuex'

export default {
  name: 'SMSInformation',
  // props: {
  //   colors: {
  //     type: Object,
  //     required: true
  //   }
  // },
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      message: '',
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
    ...mapState('telleChat', ['roomId', 'bot']),
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
    sendItem() {
      if (this.bot.cId && this.bot.origin) {
        if (validator.validatePhonenNmber(this.phone)) {
          this.errorMessage = ''
          // this.$emit('sendItem', {payload: this.payload})
          var leads = {
            dealerId: this.bot.cId,
            customer: this.name,
            email: this.email,
            phone: this.phone,
            note: this.message,
            sessionId: this.roomId
          }

          smsService.sendSMSMessage(leads).then((resp) => {
            this.successMessage = 'Thank you for submitting message.'
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
          // this.$store.dispatch('bmbot/createLeads', leads)
          // this.successMessage = 'Thank you for submitting message.'

          // setTimeout(()=>{
          //       this.successMessage = ''
          //       this.name = ''
          //       this.email = ''
          //       this.phone = ''
          //       this.message = ''
          //     },2000)
        } else {
          this.errorMessage = 'Error: invalid phone number. Please enter a valid phone number.'
        }
      } else {
        this.isAuthorized = false
      }
    }
  }
}
</script>

<style scoped>
.sc-sms--information {
  width: 100%;
  height: 100%;
  /* white-space: pre-wrap; */
  -webkit-font-smoothing: subpixel-antialiased
}

.sc-sms--information-header {
  /* color: white; */
  /* height: 100px; */
  padding: 15px;
  text-align: center;
  border-top-left-radius: 9px;
}

.sc-sms--information-header-title{
  padding: 5px;
  font-size: 16px;
  line-height: 30px;
  font-weight: 500;
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

.sc-sms--information input {
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

.sc-sms--information textarea {
    width: 80%;
    height: 100px;
    line-height: 1.5;
    margin-top: 15px;
    margin-bottom: 15px;
    padding: 4px 7px;
    font-size: 12px;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    color: #515a6e;
}

/* .sc-sms--information input:last-of-type {
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
} */

.sc-sms--information button {
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

.sc-sms--information-text{
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

/* .sc-sms--information-button {
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
  cursor: pointer;
} */

</style>
