const stringConstructor = 'test'.constructor
const arrayConstructor = [].constructor
const objectConstructor = {}.constructor

export function create_UUID() {
  var dt = new Date().getTime()
  var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (dt + Math.random() * 16) % 16 | 0
    dt = Math.floor(dt / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
  return uuid
}

export function whatIsIt(object) {
  if (object === null) {
    return 'null'
  } else if (object === undefined) {
    return 'undefined'
  } else if (object.constructor === stringConstructor) {
    return 'String'
  } else if (object.constructor === arrayConstructor) {
    return 'Array'
  } else if (object.constructor === objectConstructor) {
    return 'Object'
  } else {
    return 'unknown'
  }
}
