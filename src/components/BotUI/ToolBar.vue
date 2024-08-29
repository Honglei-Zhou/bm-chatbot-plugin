<template>
  <div>
    <div class="sc-tool-bar--buttons">

      <div class="sc-tool-bar--button">
        <ContactButton v-tooltip="contactName" v-if="contactButtonClicked" ref="contactButton" :on-click="_hideContact" :color="colors.toolBar.active"/>
        <ContactButton v-tooltip="contactName" v-else ref="contactButton" :on-click="_showContact" :color="colors.toolBar.inactive"/>
      </div>

      <div class="sc-tool-bar--button">
        <SMSButton v-tooltip="smsName" v-if="smsButtonClicked" ref="smsButton" :on-click="_hideSMS" :color="colors.toolBar.active"/>
        <SMSButton v-tooltip="smsName" v-else ref="smsButton" :on-click="_showSMS" :color="colors.toolBar.inactive"/>
      </div>
      <!--
        <div class="sc-tool-bar--button">
          <InfoButton v-if="infoButtonClicked"  ref="infoButton" :onClick="_hideInfo" :color="colors.toolBar.active" v-tooltip="infoName"/>
          <InfoButton v-else ref="infoButton" :onClick="_showInfo" :color="colors.toolBar.inactive" v-tooltip="infoName"/>
        </div> -->

      <div class="sc-tool-bar--button">
        <HoursButton v-tooltip="hourName" v-if="hoursButtonClicked" ref="hoursButton" :on-click="_hideHours" :color="colors.toolBar.active"/>
        <HoursButton v-tooltip="hourName" v-else ref="hoursButton" :on-click="_showHours" :color="colors.toolBar.inactive"/>
      </div>

      <div v-show="false" class="sc-tool-bar--button">
        <FileIcons v-tooltip="fileName" :on-change="_handleFileSubmit" :color="colors.toolBar.inactive"/>
      </div>

      <div v-show="false" class="sc-tool-bar--button">
        <TradeInButton v-tooltip="tradeInName" v-if="tradeInButtonClicked" ref="tradeInButton" :on-click="_hideInventory" :color="colors.toolBar.active"/>
        <TradeInButton v-tooltip="tradeInName" v-else ref="tradeInButton" :on-click="_showInventory" :color="colors.toolBar.inactive"/>
      </div>

      <div class="sc-tool-bar--button">
        <InventoryButton v-tooltip="inventoryName" v-if="inventoryButtonClicked" ref="inventoryButton" :on-click="_hideInventory" :color="colors.toolBar.active"/>
        <InventoryButton v-tooltip="inventoryName" v-else ref="inventoryButton" :on-click="_showInventory" :color="colors.toolBar.inactive"/>
      </div>

      <!--
        <div class="sc-tool-bar--button">
          <ProfileButton v-if="profileButtonClicked" ref="profileButton" :onClick="_hideProfile" :color="colors.toolBar.active" v-tooltip="profileName"/>
          <ProfileButton v-else ref="profileButton" :onClick="_showProfile" :color="colors.toolBar.inactive" v-tooltip="profileName"/>
        </div> -->

    </div>
  </div>
</template>

<script>
import FileIcons from './FileIcons'
import FileIcon from '@/assets/icons/file.svg'
import CloseIconSvg from '@/assets/icons/close.svg'
import SMSIcons from './SMSIcons'
import ProfileButton from '@/components/BotUI/Buttons/ProfileButton'
import HoursButton from '@/components/BotUI/Buttons/HoursButton'
// import InfoButton from '@/components/BotUI/Buttons/InfoButton'
import SMSButton from '@/components/BotUI/Buttons/SMSButton'
import ContactButton from '@/components/BotUI/Buttons/ContactButton'
import TradeInButton from '@/components/BotUI/Buttons/TradeInButton'
import InventoryButton from '@/components/BotUI/Buttons/InventoryButton'

export default {
  components: {
    FileIcons,
    SMSIcons,
    ProfileButton,
    HoursButton,
    // InfoButton,
    SMSButton,
    ContactButton,
    TradeInButton,
    InventoryButton
  },
  props: {
    icons: {
      type: Object,
      required: false,
      default: function() {
        return {
          file: {
            img: FileIcon,
            name: 'default'
          },
          closeSvg: {
            img: CloseIconSvg,
            name: 'default'
          }
        }
      }
    },
    handleBotPageToggle: {
      type: Function,
      required: true
    },
    showEmoji: {
      type: Boolean,
      default: () => false
    },
    suggestions: {
      type: Array,
      default: () => []
    },
    showFile: {
      type: Boolean,
      default: () => false
    },
    onSubmit: {
      type: Function,
      required: true
    },
    placeholder: {
      type: String,
      default: 'Enter your message'
    },
    colors: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      file: null,
      inputActive: false,
      tradeInName: 'Trade in',
      contactName: 'Your profile',
      hourName: 'Our hours',
      infoName: 'About us',
      profileName: 'Customer Service',
      smsName: 'Text us',
      fileName: 'Upload file',
      inventoryName: 'View Inventory',
      profileButtonClicked: false,
      hoursButtonClicked: false,
      infoButtonClicked: false,
      smsButtonClicked: false,
      tradeInButtonClicked: false,
      inventoryButtonClicked: false,
      contactButtonClicked: false
    }
  },
  methods: {
    hideButton() {
      this.profileButtonClicked = false
      this.hoursButtonClicked = false
      this.infoButtonClicked = false
      this.smsButtonClicked = false
      this.inventoryButtonClicked = false
      this.contactButtonClicked = false
    },
    _hideProfile(event) {
      this.profileButtonClicked = false
      this.handleBotPageToggle({ name: 'profile', show: this.profileButtonClicked })
    },
    _showProfile(event) {
      this.hideButton()
      this.profileButtonClicked = !this.profileButtonClicked
      this.handleBotPageToggle({ name: 'profile', show: this.profileButtonClicked })
    },
    _hideHours(event) {
      this.hoursButtonClicked = false
      this.handleBotPageToggle({ name: 'hours', show: this.hoursButtonClicked })
    },
    _showHours(event) {
      this.hideButton()
      this.hoursButtonClicked = !this.hoursButtonClicked
      this.handleBotPageToggle({ name: 'hours', show: this.hoursButtonClicked })
    },
    _hideInfo(event) {
      this.infoButtonClicked = false
      this.handleBotPageToggle({ name: 'info', show: this.infoButtonClicked })
    },
    _showInfo(event) {
      this.hideButton()
      this.infoButtonClicked = !this.infoButtonClicked
      this.handleBotPageToggle({ name: 'info', show: this.infoButtonClicked })
    },
    _hideSMS(event) {
      this.smsButtonClicked = false
      this.handleBotPageToggle({ name: 'sms', show: this.smsButtonClicked })
    },
    _showSMS(event) {
      this.hideButton()
      this.smsButtonClicked = !this.smsButtonClicked
      this.handleBotPageToggle({ name: 'sms', show: this.smsButtonClicked })
    },
    _hideInventory(event) {
      this.inventoryButtonClicked = false
      this.handleBotPageToggle({ name: 'inventory', show: this.inventoryButtonClicked })
    },
    _showInventory(event) {
      this.hideButton()
      this.inventoryButtonClicked = !this.inventoryButtonClicked
      this.handleBotPageToggle({ name: 'inventory', show: this.inventoryButtonClicked })
    },
    _hideContact(event) {
      this.contactButtonClicked = false
      this.handleBotPageToggle({ name: 'contact', show: this.contactButtonClicked })
    },
    _showContact(event) {
      this.hideButton()
      this.contactButtonClicked = !this.contactButtonClicked
      this.handleBotPageToggle({ name: 'contact', show: this.contactButtonClicked })
    },
    cancelFile() {
      this.file = null
    },
    _handleFileSubmit(file) {
      this.file = file
    }
  }
}
</script>

<style>
.sc-tool-bar {
  /* min-height: 55px; */
  height: 55px;
  margin: 0px;
  position: relative;
  bottom: 0;
  width: 100%;
  display: flex;
  /* flex-direction: row;
  justify-content: center; */
  /* align-items: center; */
  background-color: #f4f7f9;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
}

.sc-tool-bar--buttons {
  /* width: 100px; */
  width: 100%;
  /* position: absolute; */
  border-top: 1px solid rgba(0,0,0,0.1);
  /* height: 100%; */
  display: flex;
  flex-direction: row-reverse;
  justify-content:space-evenly;
}

.sc-tool-bar--button:first-of-type {
  width: 50px;
}

.sc-tool-bar--button {
   /* change to 100% if only one icon available */
  width: 50px;
  height: 55px;
  margin-left: 2px;
  margin-right: 2px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.sc-tool-bar.active {
  box-shadow: none;
  background-color: white;
  box-shadow: 0px -5px 20px 0px rgba(150, 165, 190, 0.2);
}

.sc-tool-bar--button label {
  position: relative;
  height: 24px;
  padding-left: 3px;
  cursor: pointer;
}

.sc-tool-bar--button:hover path {
  /* fill: rgba(86, 88, 103, 1); */
  fill: #1f95e7;
  cursor: point;
}

.sc-tool-bar--button input {
  /* position: absolute;
  left: 0;
  top: 0;
  width: 100%; */
  position: absolute;
  left: 0;
  top: 0;
  width: 50px;
  z-index: 99999;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  overflow: hidden;
}

.file-container {
  background-color: #f4f7f9;
  border-top-left-radius: 10px;
  padding: 5px 20px;
  color: #565867;
}

.delete-file-message {
  font-style: normal;
  float: right;
  cursor: pointer;
  color: #c8cad0;
}

.delete-file-message:hover {
  color: #5d5e6d;
}

.icon-file-message {
  margin-right: 5px;
}
</style>
