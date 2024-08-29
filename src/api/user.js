import axios from 'axios'
import commonConfig from './common'

// const baseUrl = commonConfig.baseUrl
const pageUrl = commonConfig.pageUrl

// const baseUrl = 'http://127.0.0.1:5000'
// const baseUrl = 'https://fqvrhq3xy0.execute-api.us-east-1.amazonaws.com/v1/'
// const baseUrl = 'https://9w7b1r8iy1.execute-api.us-east-1.amazonaws.com/dev'
const timeout = 4000

export function updateUser(message) {
  return new Promise((resolve, reject) => {
    axios({
      url: '/api/user/ip',
      method: 'GET',
      params: {
        deviceType: message.deviceType,
        deviceDetail: message.deviceDetail,
        sessionId: message.sessionId,
        dealerId: message.dealerId,
        dealerName: message.dealerName
      },
      baseURL: pageUrl,
      // baseURL: baseUrl,
      timeout: timeout
    }).then((resp) => {
      console.log(resp.data)
      resolve(resp.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function updatePageView(message) {
  return new Promise((resolve, reject) => {
    var bodyFormData = new FormData()
    bodyFormData.append('sessionId', message.sessionId)
    bodyFormData.append('page', message.page)
    bodyFormData.append('dealerId', message.dealerId)
    bodyFormData.append('botClicked', message.botClicked)
    axios({
      url: '/api/user/pageview',
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: bodyFormData,
      baseURL: pageUrl,
      // baseURL: baseUrl,
      timeout: timeout
    }).then((resp) => {
      // console.log(resp.data)
      resolve(resp.data)
    }).catch(err => {
      reject(err)
    })
  })
}
