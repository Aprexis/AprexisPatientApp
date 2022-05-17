import { patientApi } from "../api/patient.api"
import { userApi } from "../api/user.api"
import { userHelper } from "./user.helper"

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
  userApi.account(userCredentials, userCredentials.id, (currentUser) => { currentUserHelper.loadCurrentPatient(userCredentials, currentUser, onSuccess, onFailure) }, onFailure)
}
