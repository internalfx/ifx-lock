'use strict'

var locks = {}

var getLock = function (id) {
  return new Promise((resolve, reject) => {
    if (locks[id] === undefined) {
      locks[id] = []
      resolve(releaseLock.bind(this, id))
    } else {
      locks[id].push(resolve)
    }
  })
}

var releaseLock = function (id) {
  if (locks[id].length > 0) {
    let resolve = locks[id].shift()
    resolve(releaseLock.bind(this, id))
  } else {
    delete locks[id]
  }
}

module.exports = getLock
