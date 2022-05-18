import { patientApi } from "../api/patient.api"
import { userApi } from "../api/user.api"
import { userHelper } from "./user.helper"
import { valueHelper } from "./value.helper"

export const currentUserHelper = {
  getCurrentProps,
  loadCurrentPatient,
  loadCurrentUser
}

function getCurrentProps(props) {
  const currentUser = getCurrentUser(props)
  const currentPatient = getCurrentPatient(props)

  return { currentUser, currentPatient }

  function getCurrentUser(props) {
    return getCurrentEntry(props, 'currentUser')
  }

  function getCurrentPatient(props) {
    return getCurrentEntry(props, 'currentPatient')
  }

  function getCurrentEntry(props, entryName) {
    if (valueHelper.isValue(props.route) && valueHelper.isValue(props.route.params)) {
      const value = props.route.params[entryName]
      if (valueHelper.isValue(value)) {
        return value
      }
    }

    return props[entryName]
  }
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
