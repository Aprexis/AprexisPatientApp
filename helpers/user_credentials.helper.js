import { Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { alertHelper } from "./alert.helper"
import { valueHelper } from "./value.helper"
import * as SecureStore from 'expo-secure-store'

export const userCredentialsHelper = {
  getUserCredentials,
  removeUserCredentials,
  storeUserCredentials
}

const storeMethods = {
  secure: {
    delete: SecureStore.deleteItemAsync,
    get: SecureStore.getItemAsync,
    set: SecureStore.setItemAsync
  },
  unsecure: {
    delete: AsyncStorage.removeItem,
    get: AsyncStorage.getItem,
    set: AsyncStorage.setItem
  }
}

function storage() {
  if (Platform.OS === "web") {
    return storeMethods.unsecure
  }

  return storeMethods.secure
}

async function getUserCredentials(handler) {
  try {
    const stringCredentials = await storage().get("userCredentials")
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
    await storage().delete("userCredentials")
  } catch (error) {
    alertHelper.error(error)
  }

  handler()
}

async function storeUserCredentials(userCredentials, handler) {
  try {
    await storage().set("userCredentials", JSON.stringify(userCredentials))
  } catch (error) {
    alertHelper.error(error)
  }

  handler(userCredentials)
}
