import axios from 'axios'
import commonConfig from './common'

const baseUrl = commonConfig.baseUrl

export const botAuthService = {
  isAuthorizedBot
}

// const baseUrl = 'https://9w7b1r8iy1.execute-api.us-east-1.amazonaws.com/dev'
// const baseUrl = 'https://fqvrhq3xy0.execute-api.us-east-1.amazonaws.com/v1/'
const timeout = 4000

function isAuthorizedBot(cId, origin) {
  return new Promise((resolve, reject) => {
    var bodyFormData = new FormData()
    bodyFormData.append('cId', cId)
    bodyFormData.append('origin', origin)
    axios({
      url: '/bots/authentication',
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: bodyFormData,
      baseURL: baseUrl,
      timeout: timeout
    }).then((resp) => {
      // console.log(resp.data)
      resolve(resp.data)
    }).catch(err => {
      reject(err)
    })
  })
}
