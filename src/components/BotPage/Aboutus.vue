<template>
  <div v-show="showFlag" class="sc-about--us">
    <div :style="colors.header" class="sc-about--us-header">
      <div class="sc-about--us-header-title">{{ contact.title }}</div>
      <div class="sc-about--us-header-text">{{ contact.address }}</div>
      <div v-show="contact.email" class="sc-about--us-header-text">Email: {{ contact.email }}</div>
      <div v-show="contact.phone" class="sc-about--us-header-text">Phone: {{ contact.phone }}</div>
    </div>
    <!-- <div class="sc-about--us-content">
      <GoogleMap :name="name"></GoogleMap>
    </div> -->
  </div>
</template>

<script>
// import GoogleMap from '@/components/BotPage/Map'

export default {
  name: 'Aboutus',
  // props: {
  //   colors: {
  //     type: Object,
  //     required: true
  //   }
  // },
  // components: {
  //   GoogleMap
  // },
  data() {
    return {
      showFlag: true,
      colors: {
        header: { backgroundColor: '#19be6b', color: 'white' },
        content: { backgroundColor: 'white', color: 'rgba(0,0,0,0.6)' },
        button: { backgroundColor: '#19be6b', color: 'white' }
      },
      map: null,
      name: 'Telle AI',
      contact: {
        title: 'Telle AI',
        address: '160 E Grand Ave, Chicago, IL-60611',
        email: 'telle@telle.ai',
        phone: '312-500-8535'
      }
    }
  },
  computed: {
    payload() {
      return this.firstName + ' ' + this.lastName + ' ' + this.email + ' ' + this.phone
    }
  },
  methods: {
    show() {
      this.showFlag = true
    },
    hide() {
      this.showFlag = false
    }
  }
}
</script>

<style scoped>
.sc-about--us {
  width: 100%;
  height: 100%;
  font-weight: 300;
  /* white-space: pre-wrap; */
  -webkit-font-smoothing: subpixel-antialiased
}

.sc-about--us-header {
  /* color: white; */
  height: 110px;
  padding: 15px;
  text-align: center;
  border-top-left-radius: 9px;
}

.sc-about--us-header-title {
  padding: 5px;
  font-size: 16px;
  line-height: 30px;
  font-weight: 700;
}

.sc-about--us-header-text {
  padding: 5px;
  font-size: 14px;
  line-height: 14px;
  font-weight: 300;
}
.sc-about--us-content {
    width: 100%;
    padding-top: 10px;
}

</style>
