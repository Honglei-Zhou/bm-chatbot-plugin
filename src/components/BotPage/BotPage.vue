<template>
  <div
    :class="{opened: isOpen, closed: !isOpen}"
    class="sc-bot-page"
  >
    <!-- <BotPageHeader
      :title="title"
      :imageUrl="titleImageUrl"
      :onClose="onClose"
      :colors="colors"
      :disableUserListToggle="disableUserListToggle"
      @userList="handleUserListToggle"
    /> -->
    <!-- <UserList
      v-if="showUserList"
      :participants="participants"
    /> -->
    <Aboutus ref="aboutUs"/>
    <InventoryList ref="inventoryList" :key="randomKey" @sendItem="sendItem"/>
    <!-- <InventoryList ref="inventoryList" :messages="inventoryElements" :key="randomKey" @sendItem="sendItem"/> -->
    <ContactInformation ref="contactInformation"/>
    <WorkingHours ref="workingHours"/>
    <SMSPage ref="smsPage"/>
  </div>
</template>

<script>
import BotPageHeader from '@/components/BotPage/BotPageHeader.vue'
import UserList from '@/components/BotUI/UserList.vue'
import Aboutus from '@/components/BotPage/Aboutus'
import InventoryList from '@/components/BotPage/InventoryList'
import ContactInformation from '@/components/BotPage/ContactInformation'
import WorkingHours from '@/components/BotPage/WorkingHours'
import SMSPage from '@/components/BotPage/SMSPage'
import { mapState } from 'vuex'

export default {
  name: 'BotPage',
  components: {
    BotPageHeader,
    UserList,
    Aboutus,
    InventoryList,
    ContactInformation,
    WorkingHours,
    SMSPage
  },
  props: {
    // participants: {
    //   type: Array,
    //   required: true
    // },
    // title: {
    //   type: String,
    //   required: true
    // },
    // titleImageUrl: {
    //   type: String,
    //   default: ''
    // },
    onClose: {
      type: Function,
      required: true
    },
    isOpen: {
      type: Boolean,
      default: () => false
    },
    colors: {
      type: Object,
      required: true
    },
    disableUserListToggle: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showUserList: false,
      inventoryElements: []
    }
  },
  computed: {
    ...mapState('telleChat', ['dealer']),
    messages() {
      const messages = this.messageList

      return messages
    },
    randomKey() {
      var length = 5
      var result = ''
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      var charactersLength = characters.length
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
      }
      console.log(result)
      return result
    }
  },
  methods: {
    getRandomKey() {
      var length = 5
      var result = ''
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      var charactersLength = characters.length
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
      }
      console.log(result)
      return result
    },
    handleUserListToggle(showUserList) {
      this.showUserList = showUserList
    },
    sendItem(item) {
      this.$emit('sendItem', item)
    },
    _showAboutus() {
      this.$refs.aboutUs.show()
    },
    _hideAboutus() {
      this.$refs.aboutUs.hide()
    },
    _showProfile() {
      this.showUserList = true
    },
    _hideProfile() {
      this.showUserList = false
    },
    _showInventory() {
      this.$refs.inventoryList.show()
    },
    _hideInventory() {
      this.$refs.inventoryList.hide()
    },
    _showContact() {
      this.$refs.contactInformation.show()
    },
    _hideContact() {
      this.$refs.contactInformation.hide()
    },
    _showHours() {
      this.$refs.workingHours.show()
    },
    _hideHours() {
      this.$refs.workingHours.hide()
    },
    _showSMS() {
      this.$refs.smsPage.show()
    },
    _hideSMS() {
      this.$refs.smsPage.hide()
    },
    _hideAll() {
      this._hideProfile()
      this._hideAboutus()
      this._hideInventory()
      this._hideContact()
      this._hideHours()
      this._hideSMS()
    },
    pageHandler(name) {
      this._hideAll()
      if (name === 'profile') {
        this._showProfile()
      } else if (name === 'hours') {
        this._showHours()
      } else if (name === 'info') {
        this._showAboutus()
      } else if (name === 'inventory') {
        // this.$store.dispatch('bmbot/getNewCars', 1)
        this._showInventory()
      } else if (name === 'contact') {
        this._showContact()
      } else if (name === 'sms') {
        this._showSMS()
      }
    }
  }
}
</script>
<style scoped>
.sc-bot-page {
  width: 334px;
  height: 564px;
  bottom: 0px;
  left: 0px;
  /* margin: 2px 0px 2px 2px; */
  position: fixed;
  box-sizing: border-box;
  box-shadow: 0 0 1px 1px rgba(0,0,0,0.2);
  border-top-left-radius: 9px;
  border-bottom-left-radius: 9px;
  border: 1px solid rgba(0,0,0,0.1);
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  overflow-y: scroll;
}

.sc-bot-page.closed {
  opacity: 0;
  visibility: hidden;
}

.sc-message--me {
  text-align: right;
}
.sc-message--them {
  text-align: left;
}

/* @media (max-width: 450px) {
  .sc-bot-page {
    width: 100%;
    height: 100%;
    right: 0px;
    bottom: 0px;
    position: fixed;
    border-radius: 0px;
  }
  .sc-bot-page {
    transition: 0.1s ease-in-out;
  }
  .sc-bot-page.closed {
    bottom: 0px;
  }
} */
</style>
