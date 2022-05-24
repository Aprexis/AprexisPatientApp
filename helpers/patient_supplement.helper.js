import { fieldHelper } from "./field.helper"
import { patientHelper } from "./patient.helper"
import { physicianHelper } from "./admin"
import { valueHelper } from "./value.helper"
import { dateHelper } from "./date.helper"

export const patientSupplementHelper = {
  canDelete,
  canEdit,
  displayStartDate,
  id,
  label,
  name,
  patient,
  patientName,
  physician,
  physicianFirstName,
  physicianLastName,
  physicianMiddleName,
  physicianName,
  physicianNameAndNpi,
  physicianNpi,
  startDate
}

function canDelete(_user, _patientSupplement) {
  return false
}

function canEdit(_user, _patientSupplement) {
  return false
}

function displayStartDate(patientSupplement) {
  const startDate = patientSupplementHelper.startDate(patientSupplement)
  if (!valueHelper.isValue(startDate)) {
    return ""
  }

  return dateHelper.displayDate(startDate)
}

function id(patientSupplement) {
  return fieldHelper.getField(patientSupplement, "id")
}

function label(patientSupplement) {
  if (!valueHelper.isValue(patientSupplement)) {
    return ""
  }

  return `${patientSupplementHelper.name(patientSupplement)} started on ${patientSupplementHelper.displayStartDate(patientSupplement)}`
}

function name(patientSupplement) {
  return fieldHelper.getField(patientSupplement, "name")
}

function patient(patientSupplement) {
  return fieldHelper.getField(patientSupplement, "patient")
}

function patientName(patientSupplement) {
  return patientHelper.name(patientSupplementHelper.patient(patientSupplement))
}

function physician(patientSupplement) {
  return fieldHelper.getField(patientSupplement, "physician")
}

function physicianFirstName(patientSupplement) {
  return physicianHelper.firstName(patientSupplementHelper.physician(patientSupplement))
}

function physicianLastName(patientSupplement) {
  return physicianHelper.lastName(patientSupplementHelper.physician(patientSupplement))
}

function physicianMiddleName(patientSupplement) {
  return physicianHelper.middleName(patientSupplementHelper.physician(patientSupplement))
}

function physicianName(patientSupplement) {
  return physicianHelper.name(patientSupplementHelper.physician(patientSupplement))
}

function physicianNameAndNpi(patientSupplement) {
  return physicianHelper.nameAndNpi(patientSupplementHelper.physician(patientSupplement))
}

function physicianNpi(patientSupplement) {
  return physicianHelper.npi(patientSupplementHelper.physician(patientSupplement))
}

function startDate(patientSupplement) {
  return fieldHelper.getField(patientSupplement, "start_date")
}
