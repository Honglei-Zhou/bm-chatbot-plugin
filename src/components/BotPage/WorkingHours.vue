<template>

  <div v-show="showFlag" class="working-hours-wrapper" >
    <div class="working-hours-header">
      <div class="working-hours-header-title">{{ dealer.workingHours.contact.title }}</div>
      <div class="working-hours-header-text">{{ dealer.workingHours.contact.address }}</div>
    </div>

    <div class="working-hours-content-wrapper">
      <div v-for="(item, index) in dealer.workingHours.items" :key="index" class="working-hours-content-items">
        <div class="working-hours-content-header">
          <div class="working-hours-content-header-icon"><img :src="item.icon" style="width: 25px; height: 25px;"></div>
          <div class="working-hours-content-header-text">{{ item.name }}</div>
        </div>
        <div v-for="(content, idx) in item.content" :key="idx" :class="{'row-odd': idx%2==0}" class="working-hours-content">
          <div class="working-hours-content-title">{{ content.key }}</div>

          <div class="working-hours-content-time">{{ content.value }}</div>
        </div>

      </div>
    </div>

    <div class="working-hours-map-content">
      <GoogleMap :name="dealer.dealerName"/>
    </div>
  </div>

</template>

<script>
import GoogleMap from '@/components/BotPage/Map'
// import TelephoneIcon from '@/assets/icons/telephone.png'
// import SalesIcon from '@/assets/icons/sales.png'
// import ServiceIcon from '@/assets/icons/tools.png'
// import PartsIcon from '@/assets/icons/parts.png'
import { mapState } from 'vuex'

export default {
  name: 'WorkingHours',
  components: {
    GoogleMap
  },
  data() {
    return {
      showFlag: false,
      // workingHours: {
      //   contact: {
      //     title: 'Honda of Downtown Chicago',
      //     address: '1111 North Clark Street Suite 2, Chicago, IL 60610'
      //   },
      //   items: [
      //     { name: 'Phone Numbers',
      //       icon: TelephoneIcon,
      //       content: [
      //         { key: 'Main:', value: '(312) 429­-4937' },
      //         { key: 'Sales:', value: '(312) 429­-4937' },
      //         { key: 'Service:', value: '(312) 265-2932' },
      //         { key: 'Parts:', value: '(312) 267-1253' }
      //       ]
      //     },
      //     { name: 'Sales Hours',
      //       icon: SalesIcon,
      //       content: [
      //         { key: 'Mon - Thu:', value: '9:00 AM - 8:00 PM' },
      //         { key: 'Fri - Sat:', value: '9:00 AM - 6:00 PM' },
      //         { key: 'Sun:', value: 'Closed' }
      //       ]
      //     },
      //     { name: 'Service Hours',
      //       icon: ServiceIcon,
      //       content: [
      //         { key: 'Mon - Thu:', value: '7:00 AM - 7:00 PM' },
      //         { key: 'Fri - Sat:', value: '7:00 AM - 6:00 PM' },
      //         { key: 'Sun:', value: 'Closed' }
      //       ]
      //     },
      //     { name: 'Parts Hours',
      //       icon: PartsIcon,
      //       content: [
      //         { key: 'Mon - Thu:', value: '8:00 AM - 6:00 PM' },
      //         { key: 'Fri - Sat:', value: '8:00 AM - 5:00 PM' },
      //         { key: 'Sun:', value: 'Closed' }
      //       ]
      //     }
      //   ]
      // },
      map: null
      // name: 'Honda of Downtown Chicago'
    }
  },
  computed: {
    ...mapState('telleChat', ['dealer'])
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

.working-hours-wrapper{
    height: 100%;
    /* overflow-y: auto; */
    background-size: 100%;
}

.working-hours-header {
  /* color: white; */
  /* height: 100px; */
  padding: 15px;
  background-color: #19be6b;
  text-align: center;
  color: white;
  border-bottom: 1px solid white;
  border-top-left-radius: 9px;
}

.working-hours-header-title {
    padding: 5px;
    font-size: 16px;
    line-height: 30px;
    font-weight: 700;
}
.working-hours-header-text {
  padding: 5px;
  font-size: 14px;
  line-height: 14px;
  font-weight: 300;
}

.row-odd {
    background-color: white;
}

.working-hours-map-content {
    /* width: 100%; */
    margin: 20px 10px;
    /* padding-top: 10px; */
}

.working-hours-content-wrapper {
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}

.working-hours-content-header{
  /* width: 100%; */
  margin: 10px 5px;
  text-align: left;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  display: flex;
}

.working-hours-content-header-icon {
  margin: 0px 5px;
}

.working-hours-content-header-text {
  margin: 0px 10px;
}

.working-hours-content {
  width: 100%;
  display: flex;
}

.working-hours-content-items {
  /* width: 100%; */
  margin: 0px 20px;
}

.working-hours-content-title {
  width: 50%;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  margin-left: 20px;
  text-align: left;
}

.working-hours-content-time {
  width: 50%;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  margin-right: 20px;
  text-align: right;
}
</style>

