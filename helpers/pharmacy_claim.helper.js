import { valueHelper } from "./value.helper"
import { dateHelper } from './date.helper'
import { fieldHelper } from "./field.helper"
import { patientHelper } from "./patient.helper"
import { pharmacyStoreHelper } from "./pharmacy_store.helper"
import { medicationHelper, physicianHelper } from "./admin"

export const pharmacyClaimHelper = {
  claimNumber,
  daysSupply,
  displayFillDate,
  dose,
  doseUnits,
  drugClass,
  drugName,
  fillDate,
  frequency,
  frequencyUnits,
  healthPlanPatientPharmacyClaimIdentifier,
  id,
  medication,
  medicationIcon,
  medicationLabel,
  memberNumber,
  modelName,
  ndc,
  patient,
  patientName,
  personNumber,
  pharmacyNpi,
  pharmacyStore,
  pharmacyStoreIdentification,
  physician,
  physicianName,
  physicianNpi,
  prescriptionNumber,
  processedDate,
  quantity,
  strength,
  strengthUnits,
  uploadId,
  uploadType,
  wasUploaded
}

function claimNumber(pharmacyClaim) {
  return fieldHelper.getField(pharmacyClaim, "claim_number")
}

function daysSupply(pharmacyClaim) {
  return fieldHelper.getField(pharmacyClaim, "days_supply")
}

function displayFillDate(pharmacyClaim) {
  const fillDate = pharmacyClaimHelper.fillDate(pharmacyClaim)

  return dateHelper.displayDate(fillDate)
}


function dose(pharmacyClaim) {
  return fieldHelper.getField(pharmacyClaim, "dose")
}

function doseUnits(pharmacyClaim) {
  return fieldHelper.getField(pharmacyClaim, "dose_units")
}

function drugClass(pharmacyClaim) {
  return fieldHelper.getField(pharmacyClaim, "drug_class")
}

function drugName(pharmacyClaim) {
  return fieldHelper.getField(pharmacyClaim, "drug_name")
}

function fillDate(pharmacyClaim) {
  return fieldHelper.getField(pharmacyClaim, "fill_date")
}

function frequency(pharmacyClaim) {
  return fieldHelper.getField(pharmacyClaim, "frequency")
}

function frequencyUnits(pharmacyClaim) {
  return fieldHelper.getField(pharmacyClaim, "frequency_units")
}

function healthPlanPatientPharmacyClaimIdentifier(pharmacyClaim) {
  return fieldHelper.getField(pharmacyClaim, "health_plan_patient_pharmacy_claim_identifier")
}

function id(pharmacyClaim) {
  return fieldHelper.getField(pharmacyClaim, 'id')
}

function medication(pharmacyClaim) {
  return fieldHelper.getField(pharmacyClaim, "medication")
}

function medicationIcon(pharmacyClaim) {
  return medicationHelper.icon(pharmacyClaimHelper.medication(pharmacyClaim))
}

function medicationLabel(pharmacyClaim) {
  return medicationHelper.label(pharmacyClaimHelper.medication(pharmacyClaim))
}

function memberNumber(pharmacyClaim) {
  return fieldHelper.getField(pharmacyClaim, "member_number")
}

function modelName() {
  return "pharmacyClaim"
}

function ndc(pharmacyClaim) {
  return fieldHelper.getField(pharmacyClaim, "ndc")
}

function patient(pharmacyClaim) {
  return fieldHelper.getField(pharmacyClaim, "patient")
}

function patientName(pharmacyClaim) {
  return patientHelper.name(pharmacyClaimHelper.patient(pharmacyClaim))
}

function personNumber(pharmacyClaim) {
  return fieldHelper.getField(pharmacyClaim, "person_number")
}

function pharmacyNpi(pharmacyClaim) {
  return fieldHelper.getField(pharmacyClaim, "pharmacy_npi")
}

function pharmacyStore(pharmacyClaim) {
  return fieldHelper.getField(pharmacyClaim, "pharmacy_store")
}

function pharmacyStoreIdentification(pharmacyClaim) {
  return pharmacyStoreHelper.identification(pharmacyClaimHelper.pharmacyStore(pharmacyClaim))
}

function physician(pharmacyClaim) {
  return fieldHelper.getField(pharmacyClaim, "physician")
}

function physicianName(pharmacyClaim) {
  return physicianHelper.name(pharmacyClaimHelper.physician(pharmacyClaim))
}

function physicianNpi(pharmacyClaim) {
  return fieldHelper.getField(pharmacyClaim, "physician_npi")
}

function prescriptionNumber(pharmacyClaim) {
  return fieldHelper.getField(pharmacyClaim, "prescription_number")
}

function processedDate(pharmacyClaim) {
  return fieldHelper.getField(pharmacyClaim, "processed_date")
}

function quantity(pharmacyClaim) {
  return fieldHelper.getField(pharmacyClaim, "quantity")
}

function strength(pharmacyClaim) {
  return fieldHelper.getField(pharmacyClaim, "strength")
}

function strengthUnits(pharmacyClaim) {
  return fieldHelper.getField(pharmacyClaim, "strength_units")
}

function uploadId(pharmacyClaim) {
  return fieldHelper.getField(pharmacyClaim, "upload_id")
}

function uploadType(pharmacyClaim) {
  return fieldHelper.getField(pharmacyClaim, "upload_type")
}

function wasUploaded(pharmacyClaim) {
  return valueHelper.isStringValue(pharmacyClaimHelper.uploadType(pharmacyClaim)) &&
    valueHelper.isValue(pharmacyClaimHelper.uploadId(pharmacyClaim))
}
