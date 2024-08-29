// const stage = 'dev'
// import { config } from '@/api/config'

const initBot = function(m, ei, q, i, a, j, s) {
  var script = document.getElementById('T2L12B07')
  var cId = '2019123456001'
  if (script !== null) {
    cId = script.getAttribute('cId')
  }

  m[i] = m[i] || {}
  m[i].obj = { cId: cId }
  // m[i].obj = { cId: a }
  j = ei.createElement(q)
  s = ei.getElementsByTagName(q)[0]
  j.async = true
  j.charset = 'UTF-8'
  if (process.env.NODE_ENV === 'test') j.src = 'http://localhost:9900/js/bmbot.js'
  else if (process.env.NODE_ENV === 'dev') j.src = 'https://telle-ai-csdn.s3.amazonaws.com/dev/desktop/js/bmbot.js'
  else j.src = 'https://telle-ai-csdn.s3.amazonaws.com/v1/desktop/js/bmbot.js'
  s.parentNode.insertBefore(j, s)
  // j.onload = j.onreadystatechange = function() {
  //   // eslint-disable-next-line no-undef
  //   bmbot.showChatPane(false)
  // }
}

initBot(window, document, 'script', 'bmbot')
