import Constants from 'expo-constants'
import { Platform } from 'react-native'
import { valueHelper } from '@aprexis/aprexis-api-utility'

export const apiEnvironmentHelper = {
  apiEnvironment
}

const apiPathValues = apiPath()

function apiPath() {
  const baseApiUrl = determineApi()
  const railsUrlRoot = determineRails(baseApiUrl)

  return { baseApiUrl, railsUrlRoot }

  function determineApi() {
    if (valueHelper.isStringValue(Constants.manifest.extra.api.environment)) {
      return Constants.manifest.api.environment
    }

    if (__DEV__) {
      if (Platform.OS === 'android') {
        return Constants.manifest.extra.api.development.android
      }

      return Constants.manifest.extra.api.development.other
    }

    if (process.env.MY_ENVIRONMENT === 'staging') {
      return Constants.manifest.extra.api.staging
    }

    return Constants.manifest.extra.api.production
  }

  function determineRails(baseApiUrl) {
    switch (process.env.MY_ENVIRONMENT) {
      case 'staging':
      case 'production':
        return `${baseApiUrl}/api`

      default:
        return baseApiUrl
    }
  }
}

function apiEnvironment(userCredentials) {
  return { ...apiPathValues, userCredentials }
}
