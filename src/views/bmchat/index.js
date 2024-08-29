import Vue from 'vue'
import App from './App'
import router from '@/router'
import VTooltip from 'v-tooltip'
import VueSocketIO from 'vue-socket.io'
import store from '@/store'
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'
import commonConfig from '@/api/common'

Vue.use(VueMoment, {
  moment
})

Vue.use(VTooltip)

// console.log('....loading....')
if (!Vue.prototype.$socket) {
  Vue.use(new VueSocketIO({
    debug: false,
    connection: commonConfig.socketUrl,
    // connection: 'https://middleware.bmhax.com',
    vuex: {
      store,
      actionPrefix: 'SOCKET_'
    }
  }))
  console.log(Vue.prototype.$socket)
} else if (!Vue.prototype.$socket.connected) {
  Vue.prototype.$socket.connect()
}

// Vue.use(new VueSocketIO({
//   debug: false,
//   // connection: 'https://middleware-dev.bmhax.com',
//   connection: commonConfig.socketUrl,
//   // options:   {secure: true},
//   vuex: {
//     store,
//     actionPrefix: 'SOCKET_'
//   }
// }))

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  beforeCreate: () => {
    console.log(window.location)
    console.log(window.location.href)
    var cId = window.location.href.split('?')[1].split('=')[1]
    console.log(cId)
    store.dispatch('telleChat/initBotState', cId)
  },
  template: '<App/>'
})
