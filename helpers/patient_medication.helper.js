import { valueHelper } from "./value.helper"
import { dateHelper } from "./date.helper"
import { fieldHelper } from "./field.helper"
import { apiHelper } from "./api.helper"
import { patientHelper } from "./patient.helper"
import { pharmacyStoreHelper } from "./pharmacy_store.helper"
import { medicationHelper, physicianHelper } from "./admin"
import { userHelper } from "./user.helper"

export const patientMedicationHelper = {
  additionalInformation,
  buildChanged,
  buildNewChanged,
  changeField,
  daysSupply,
  directions,
  displayFilledAt,
  displayFilledOn,
  displayHasPreviousFill,
  filledAt,
  hasPreviousFill,
  healthPlanId,
  id,
  indication,
  medication,
  medicationIcon,
  medicationId,
  medicationLabel,
  mpr,
  patient,
  patientName,
  pharmacyStore,
  pharmacyStoreId,
  pharmacyStoreIdentification,
  pharmacyStoreName,
  physician,
  physicianId,
  physicianName,
  physicianNameAndNpi,
  startDate,
  strength,
  strengthUnits,
  toJSON,
  type,
  uploadExternalMedical,
  user,
  userId
}

const patientMedicationKeys = [
  "id",
  "additional_information",
  "days_supply",
  "directions",
  "filled_at",
  "indication",
  "medication_id",
  "patient_id",
  "pharmacy_store_id",
  "physician_id",
  "start_date",
  "strength",
  "strength_units",
  "type"
]

function additionalInformation(patientMedication) {
  return fieldHelper.getField(patientMedication, "additional_information")
}

function buildChanged(patientMedication, changedPatientMedication) {
  if (valueHelper.isValue(changedPatientMedication)) {
    return changedPatientMedication
  }

  if (valueHelper.isValue(patientMedication.id)) {
    return copyIdentifiers(patientMedication)
  }

  return patientMedicationHelper.buildNewChanged(patientMedication)

  function copyIdentifiers(patientMedication) {
    return {
      id: patientMedication.id,
      medication_id: patientMedication.medication_id,
      patient_id: patientMedication.patient_id,
      type: patientMedication.type
    }
  }
}

function buildNewChanged(patientMedication) {
  return {
    ...patientMedication
  }
}

function changeField(patientMedication, changedPatientMedication, name, value) {
  return fieldHelper.changeField('patientMedication', patientMedication, changedPatientMedication, name, value, patientMedicationHelper.buildChanged)
}

function daysSupply(patientMedication) {
  return fieldHelper.getField(patientMedication, "days_supply")
}

function directions(patientMedication) {
  return fieldHelper.getField(patientMedication, "directions")
}

function displayFilledAt(patientMedication) {
  const filledAt = patientMedicationHelper.filledAt(patientMedication)
  if (!valueHelper.isValue(filledAt)) {
    return ""
  }

  return dateHelper.displayDateTime(filledAt)
}

function displayFilledOn(patientMedication) {
  const filledAt = patientMedicationHelper.filledAt(patientMedication)
  if (!valueHelper.isValue(filledAt)) {
    return ""
  }

  return dateHelper.displayDate(filledAt)
}

function displayHasPreviousFill(patientMedication) {
  return valueHelper.yesNo(patientMedicationHelper.hasPreviousFill(patientMedication))
}

function filledAt(patientMedication) {
  return fieldHelper.getField(patientMedication, "filled_at")
}

function hasPreviousFill(patientMedication) {
  return fieldHelper.getField(patientMedication, 'has_previous_fill')
}

function healthPlanId(patientMedication) {
  return patientHelper.healthPlanId(patientMedicationHelper.patient(patientMedication))
}

function id(patientMedication) {
  return fieldHelper.getField(patientMedication, "id")
}

function indication(patientMedication) {
  return fieldHelper.getField(patientMedication, "indication")
}

function medication(patientMedication) {
  return fieldHelper.getField(patientMedication, "medication")
}

function medicationId(patientMedication) {
  return fieldHelper.getField(patientMedication, "medication_id")
}

function medicationIcon(patientMedication) {
  return medicationHelper.icon(patientMedicationHelper.medication(patientMedication))
}

function medicationLabel(patientMedication) {
  return medicationHelper.label(patientMedicationHelper.medication(patientMedication))
}

function mpr(patientMedication) {
  return fieldHelper.getField(patientMedication, 'mpr')
}

function patient(patientMedication) {
  return fieldHelper.getField(patientMedication, "patient")
}

function patientName(patientMedication, prefix = "") {
  return patientHelper.name(patientMedicationHelper.patient(patientMedication), prefix)
}

function pharmacyStore(patientMedication) {
  return fieldHelper.getField(patientMedication, "pharmacy_store")
}

function pharmacyStoreId(patientMedication) {
  return fieldHelper.getField(patientMedication, "pharmacy_store_id")
}

function pharmacyStoreIdentification(patientMedication) {
  return pharmacyStoreHelper.identification(patientMedicationHelper.pharmacyStore(patientMedication))
}

function pharmacyStoreName(patientMedication) {
  return pharmacyStoreHelper.name(patientMedicationHelper.pharmacyStore(patientMedication))
}

function physician(patientMedication) {
  return fieldHelper.getField(patientMedication, "physician")
}

function physicianId(patientMedication) {
  return fieldHelper.getField(patientMedication, "physician_id")
}

function physicianName(patientMedication) {
  return physicianHelper.name(patientMedicationHelper.physician(patientMedication))
}

function physicianNameAndNpi(patientMedication) {
  return physicianHelper.nameAndNpi(patientMedicationHelper.physician(patientMedication))
}

function startDate(patientMedication) {
  return fieldHelper.getField(patientMedication, "start_date")
}

function strength(patientMedication) {
  return fieldHelper.getField(patientMedication, "strength")
}

function strengthUnits(patientMedication) {
  return fieldHelper.getField(patientMedication, "strength_units")
}

function toJSON(patientMedication) {
  return apiHelper.toJSON(patientMedication, patientMedicationKeys)
}

function type(patientMedication) {
  return fieldHelper.getField(patientMedication, "type")
}

function uploadExternalMedical(patientMedication) {
  return fieldHelper.getField(patientMedication, "upload_external_medical")
}

function user(patientMedication) {
  return fieldHelper.getField(patientMedication, "user")
}

function userId(patientMedication) {
  return userHelper.id(patientMedicationHelper.user(patientMedication))
}
