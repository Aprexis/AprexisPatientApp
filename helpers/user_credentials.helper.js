import { alertHelper } from "./alert.helper"
import { valueHelper } from "./value.helper"
import * as SecureStore from 'expo-secure-store'

export const userCredentialsHelper = {
  getUserCredentials,
  removeUserCredentials,
  storeUserCredentials
}

async function getUserCredentials(handler) {
  try {
    const stringCredentials = await SecureStore.getItemAsync("userCredentials")
    if (valueHelper.isStringValue(stringCredentials)) {
      const userCredentials = JSON.parse(stringCredentials)
      if (valueHelper.isSet(userCredentials.success)) {
        handler(userCredentials)
      }
    }

  } catch (error) {
    alertHelper.error(error)
  }

  handler()
}

async function removeUserCredentials(handler) {
  try {
    await SecureStore.deleteItemAsync("userCredentials")
  } catch (error) {
    alertHelper.error(error)
  }

  handler()
}

async function storeUserCredentials(userCredentials, handler) {
  try {
    await SecureStore.setItemAsync("userCredentials", JSON.stringify(userCredentials))
  } catch (error) {
    alertHelper.error(error)
  }

  handler(userCredentials)
}
