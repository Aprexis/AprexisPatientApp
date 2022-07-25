import { apiHelper } from "./api.helper"
import { dateHelper } from "./date.helper"
import { fieldHelper } from "./field.helper"
import { interventionHelper } from "./intervention.helper"
import { pharmacyStoreHelper } from "./pharmacy_store.helper"
import { userHelper } from "./user.helper"
import { valueHelper } from "./value.helper"
import { labTestHelper } from "./admin"
import { patientHelper } from "./patient.helper"
import { labTestValueTypes } from "../types"

export const labTestValueHelper = {
  buildChanged,
  buildNewChanged,
  calculated,
  confirmed,
  displayCalculated,
  displayConfirmed,
  displayType,
  displayValueTakenAt,
  id,
  intervention,
  interventionIdentification,
  labTest,
  labTestCategory,
  labTestId,
  labTestKeyCode,
  labTestFullName,
  labTestName,
  modelName,
  patient,
  patientName,
  pharmacyStore,
  pharmacyStoreId,
  pharmacyStoreIdentification,
  programName,
  toJSON,
  type,
  user,
  userFullName,
  userId,
  value,
  valueTakenAt
}

const labTestValueKeys = [
  "id",
  "intervention_id",
  "lab_test_id",
  "patient_id",
  "pharmacy_store_id",
  "user_id",
  "calculated",
  "confirmed",
  "type",
  "value_taken_at",
  "value"
]

function buildChanged(labTestValue, changedLabTestValue) {
  if (valueHelper.isValue(changedLabTestValue)) {
    return changedLabTestValue
  }

  if (valueHelper.isValue(labTestValue.id)) {
    return copyIdentifiers(labTestValue)
  }

  return labTestValueHelper.buildNewChanged(labTestValue)

  function copyIdentifiers(labTestValue) {
    return {
      id: labTestValue.id,
      intervention_id: labTestValue.intervention_id,
      lab_test_id: labTestValue.lab_test_id,
      patient_id: labTestValue.patient_id,
      pharmacy_store_id: labTestValue.pharmacy_store_id,
      type: labTestValue.type,
      user_id: labTestValue.user_id
    }
  }
}

function buildNewChanged(labTestValue) {
  return {
    ...labTestValue
  }
}

function calculated(labTestValue) {
  return fieldHelper.getField(labTestValue, "calculated")
}

function confirmed(labTestValue) {
  return fieldHelper.getField(labTestValue, "confirmed")
}

function displayCalculated(labTestValue) {
  const calculated = labTestValueHelper.calculated(labTestValue)
  return valueHelper.yesNo(calculated)
}

function displayConfirmed(labTestValue) {
  const confirmed = labTestValueHelper.confirmed(labTestValue)
  return valueHelper.yesNo(confirmed)
}

function displayType(labTestValue) {
  const type = labTestValueHelper.type(labTestValue)

  if (!valueHelper.isValue(type)) {
    return labTestValueTypes[""]
  }

  return labTestValueTypes[type]
}

function displayValueTakenAt(labTestValue) {
  const valueTakenAt = this.valueTakenAt(labTestValue)

  return dateHelper.displayDateTime(valueTakenAt)
}

function id(labTestValue) {
  return fieldHelper.getField(labTestValue, "id")
}

function intervention(labTestValue) {
  return fieldHelper.getField(labTestValue, "intervention")
}

function interventionIdentification(labTestValue) {
  const intervention = labTestValueHelper.intervention(labTestValue)
  if (!valueHelper.isValue(intervention)) {
    return
  }

  return interventionHelper.identification(intervention)
}

function labTest(labTestValue) {
  return fieldHelper.getField(labTestValue, "lab_test")
}

function labTestCategory(labTestValue) {
  return labTestHelper.category(labTestValueHelper.labTest(labTestValue))
}

function labTestId(labTestValue) {
  return fieldHelper.getField(labTestValue, "lab_test_id")
}

function labTestKeyCode(labTestValue) {
  return labTestHelper.keyCode(labTestValueHelper.labTest(labTestValue))
}

function labTestFullName(labTestValue) {
  return labTestHelper.fullName(labTestValueHelper.labTest(labTestValue))
}

function labTestName(labTestValue) {
  return labTestHelper.name(labTestValueHelper.labTest(labTestValue))
}

function modelName() {
  return "labTestValue"
}

function patient(labTestValue) {
  return fieldHelper.getField(labTestValue, "patient")
}

function patientName(labTestValue) {
  return patientHelper.name(labTestValueHelper.patient(labTestValue))
}

function pharmacyStore(labTestValue) {
  return fieldHelper.getField(labTestValue, "pharmacy_store")
}

function pharmacyStoreId(labTestValue) {
  return fieldHelper.getField(labTestValue, "pharmacy_store_id")
}

function pharmacyStoreIdentification(labTestValue) {
  return pharmacyStoreHelper.identification(labTestValueHelper.pharmacyStore(labTestValue))
}

function programName(labTestValue) {
  return interventionHelper.programName(fieldHelper.getField(labTestValue, "intervention"))
}

function toJSON(labTestValue) {
  return apiHelper.toJSON(labTestValue, labTestValueKeys)
}

function type(labTestValue) {
  return fieldHelper.getField(labTestValue, "type")
}

function user(labTestValue) {
  return fieldHelper.getField(labTestValue, "user")
}

function userFullName(labTestValue) {
  return userHelper.fullName(labTestValueHelper.user(labTestValue))
}

function userId(labTestValue) {
  return fieldHelper.getField(labTestValue, "user_id")
}

function value(labTestValue) {
  return fieldHelper.getField(labTestValue, "value")
}

function valueTakenAt(labTestValue) {
  return fieldHelper.getField(labTestValue, "value_taken_at")
}
