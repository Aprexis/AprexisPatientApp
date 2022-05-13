import React from 'react'

export const alertHelper = {
  error,
  info,
  success,
  warning
}

// TODO needs to be thought through.

function messageText(message) {
  if (typeof message === 'string') {
    return message
  }

  return JSON.stringify(message)
}


function error(message) {
  const text = messageText(message)
  console.log(`ERROR: ${text}`)
  console.trace()
  //alert(message)
}

function info(message) {
  const text = messageText(message)
  console.log(`'INFO: ${text}`)
  //alert(message)
}

function success(message) {
  const text = messageText(message)
  console.log(`SUCCESS: ${text}`)
  alert(message)
}

function warning(message) {
  const text = messageText(message)
  console.log(`WARNING: ${text}`)
  console.trace()
  //alert(message)
}
