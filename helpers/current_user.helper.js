import { patientApi, userApi, userHelper } from '@aprexis/aprexis-api-utility'
import { apiEnvironmentHelper } from './api_environment.helper'

export const currentUserHelper = {
  loadCurrentPatient,
  loadCurrentUser
}

function loadCurrentPatient(userCredentials, currentUser, onSuccess, onFailure) {
  if (!userHelper.hasRole(currentUser, "patient_user_role")) {
    onSuccess(currentUser)
    return
  }

  patientApi.showForUser(userCredentials, currentUser.id, (currentPatient) => { onSuccess(currentUser, currentPatient) }, onFailure)
}

function loadCurrentUser(userCredentials, onSuccess, onFailure) {
  userApi.account(apiEnvironmentHelper.apiEnvironment(userCredentials), userCredentials.id, (currentUser) => { currentUserHelper.loadCurrentPatient(userCredentials, currentUser, onSuccess, onFailure) }, onFailure)
}
