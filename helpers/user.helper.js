import { valueHelper } from "./value.helper"
import { fieldHelper } from "./field.helper"
import { userRoles } from "../types"
import { contactHelper } from "./contact.helper"

export const userHelper = {
  displayRole,
  email,
  firstName,
  fullName,
  hasRole,
  healthPlans,
  id,
  isAccessLocked,
  isExpired,
  isLoginAllowed,
  lastName,
  patient,
  patientId,
  pharmacistDisplay,
  pharmacistNPI,
  pharmacyChains,
  pharmacyStores,
  phone,
  role,
  roleLabel,
  rolesToOptions,
  setCurrentUser,
  state,
  timeZone,
  username
}

function displayRole(user) {
  return userRoles[userHelper.role(user)].label
}

function email(user) {
  return contactHelper.email(user)
}

function firstName(user) {
  return fieldHelper.getField(user, "first_name")
}

function fullName(user) {
  if (!valueHelper.isValue(user)) {
    return ""
  }

  return `${userHelper.firstName(user)} ${userHelper.lastName(user)}`
}

function hasRole(user, role) {
  const userRole = userHelper.role(user)

  if (Array.isArray(role)) {
    return role.includes(userRole)
  }

  return userRole == role
}

function healthPlans(user) {
  return fieldHelper.getField(user, "health_plans")
}

function id(user) {
  return fieldHelper.getField(user, "id")
}

function isAccessLocked(user) {
  return valueHelper.isSet(fieldHelper.getField(user, "access_locked"))
}

function isExpired(user) {
  return valueHelper.isSet(fieldHelper.getField(user, "expired"))
}

function isLoginAllowed(user) {
  return valueHelper.isSet(fieldHelper.getField(user, "allow_login"))
}

function lastName(user) {
  return fieldHelper.getField(user, "last_name")
}


function patient(user) {
  return fieldHelper.getField(user, "patient")
}

function patientId(user) {
  return fieldHelper.getField(user, "id")
}

function pharmacistDisplay(user) {
  if (!valueHelper.isValue(user)) {
    return '(no pharmacist)'
  }

  if (userHelper.hasRole(user, ['pharmacy_store_admin', 'pharmacy_store_user'])) {
    return "(no pharmacist)"
  }

  return `${userHelper.fullName(user)} - #${userHelper.pharmacistNPI(user)}`
}

function pharmacistNPI(user) {
  return fieldHelper.getField(user, "pharmacist_npi")
}

function pharmacyChains(user) {
  return fieldHelper.getField(user, "pharmacies")
}

function pharmacyStores(user) {
  return fieldHelper.getField(user, "pharmacy_stores")
}

function phone(user) {
  return contactHelper.phone(user)
}

function role(user) {
  return fieldHelper.getField(user, "role")
}

function roleLabel(user) {
  const role = userHelper.role(user)

  return valueHelper.capitalizeWords(valueHelper.humanize(role))
}

function rolesToOptions() {
  return Object.keys(userRoles).map(
    (key) => {
      return {
        id: key,
        value: userRoles[key].label
      }
    }
  )
}

function setCurrentUser(currentUser) {
  const currentUserJson = JSON.stringify(currentUser)

  sessionStorage.setItem("aprexis-api-ui-current-user", currentUserJson)
}

function state(user) {
  return fieldHelper.getField(user, "state")
}

function timeZone(user) {
  return fieldHelper.getField(user, "time_zone")
}

function username(user) {
  return fieldHelper.getField(user, "username")
}
