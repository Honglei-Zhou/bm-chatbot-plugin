// import { config } from './config'

let baseUrl = 'https://919swyodhj.execute-api.us-east-1.amazonaws.com/redis-master'
let socketUrl = 'https://client-prod.telle.ai/'
let pageUrl = 'https://service-prod.telle.ai'

// const stage = 'dev'
if (process.env.NODE_ENV === 'dev') {
  baseUrl = 'https://36e21nqd9i.execute-api.us-east-1.amazonaws.com/telle'
  pageUrl = 'https://service.telle.ai'
  // socketUrl = 'https://middleware-dev.bmhax.com'
  socketUrl = 'https://client.telle.ai/'
} else if (process.env.NODE_ENV === 'test') {
  // baseUrl = 'https://36e21nqd9i.execute-api.us-east-1.amazonaws.com/telle'
  pageUrl = 'https://service.telle.ai'
  // socketUrl = 'https://client.telle.ai/'

  baseUrl = 'http://127.0.0.1:5003'
  // pageUrl = 'http://127.0.0.1:5002'
  socketUrl = 'http://127.0.0.1:5000'
}

export default {
  baseUrl: baseUrl,
  socketUrl: socketUrl,
  pageUrl: pageUrl,
  stage: process.env.NODE_ENV
}
