import { nameHelper } from "./name.helper"

export const patientHelper = {
  firstName,
  initials,
  lastName,
  middleName,
  name
}

function firstName(patient) {
  return nameHelper.firstName(patient)
}

function initials(patient) {
  return nameHelper.initials(patient)
}

function lastName(patient) {
  return nameHelper.lastName(patient)
}

function middleName(patient) {
  return nameHelper.middleName(patient)
}

function name(patient) {
  return nameHelper.name(patient)
}
