import { valueHelper } from "./value.helper"
import { fieldHelper } from "./field.helper"
import { addressHelper } from "./address.helper"
import { contactHelper } from "./contact.helper"
import { userHelper } from "./user.helper"

export const healthPlanHelper = {
  active,
  activePatients,
  address,
  allowManuallyAddedPatients,
  billingClaimsGateway,
  ccdGenerator,
  city,
  code,
  currentlyImportingData,
  enableReminders,
  fullAddress,
  generateCompletedInterventionsReport,
  importingPatientData,
  insuranceDetailType,
  isSegmented,
  name,
  notes,
  pharmacyClaimsUploader,
  phone,
  requiresExplicitAuthorization,
  requiresPersonNumber,
  saveClaimSubmissionFiles,
  segmentedUploader,
  showPharmacyClaims,
  state,
  twoSeventySixMode,
  zipCode,
  zirmedPayerNameMatching
}

function active(healthPlan) {
  return fieldHelper.getField(healthPlan, "active")
}

function activePatients(healthPlan) {
  return fieldHelper.getField(healthPlan, "active_patients")
}

function address(healthPlan) {
  return addressHelper.address(healthPlan)
}

function allowManuallyAddedPatients(healthPlan) {
  return fieldHelper.getField(healthPlan, "allow_manually_added_patients")
}

function billingClaimsGateway(healthPlan) {
  return fieldHelper.getField(healthPlan, "billing_claims_gateway")
}

function ccdGenerator(healthPlan) {
  return fieldHelper.getField(healthPlan, "ccd_generator")
}

function city(healthPlan) {
  return addressHelper.city(healthPlan)
}

function code(healthPlan) {
  return fieldHelper.getField(healthPlan, "code")
}

function currentlyImportingData(healthPlan) {
  return fieldHelper.getField(healthPlan, "currently_importing_data")
}

function enableReminders(healthPlan) {
  return fieldHelper.getField(healthPlan, "enable_reminders")
}

function fullAddress(healthPlan) {
  return addressHelper.fullAddress(healthPlan)
}

function generateCompletedInterventionsReport(healthPlan) {
  return fieldHelper.getField(healthPlan, "generated_completed_interventions_report")
}

function importingPatientData(healthPlan) {
  return fieldHelper.getField(healthPlan, "importing_patient_data")
}

function insuranceDetailType(healthPlan) {
  return fieldHelper.getField(healthPlan, "insurance_detail_type")
}

function isSegmented(healthPlan) {
  return valueHelper.isStringValue(healthPlanHelper.segmentedUploader(healthPlan))
}

function name(healthPlan) {
  return fieldHelper.getField(healthPlan, "name")
}

function notes(healthPlan) {
  return fieldHelper.getField(healthPlan, "notes")
}

function pharmacyClaimsUploader(healthPlan) {
  return fieldHelper.getField(healthPlan, "pharmacy_claims_uploader")
}

function phone(healthPlan) {
  return contactHelper.phone(healthPlan)
}

function requiresExplicitAuthorization(healthPlan) {
  return fieldHelper.getField(healthPlan, "requires_explicit_authorization")
}

function requiresPersonNumber(healthPlan) {
  return fieldHelper.getField(healthPlan, "requires_person_number")
}

function saveClaimSubmissionFiles(healthPlan) {
  return fieldHelper.getField(healthPlan, "save_claim_submission_files")
}

function segmentedUploader(healthPlan) {
  return fieldHelper.getField(healthPlan, "segmented_uploader")
}

function showPharmacyClaims(healthPlan) {
  return fieldHelper.getField(healthPlan, "show_pharmacy_claims")
}

function state(healthPlan) {
  return addressHelper.state(healthPlan)
}


function twoSeventySixMode(healthPlan) {
  return fieldHelper.getField(healthPlan, "two_seventy_six_mode")
}

function zipCode(healthPlan) {
  return addressHelper.zipCode(healthPlan)
}

function zirmedPayerNameMatching(healthPlan) {
  return fieldHelper.getField(healthPlan, "zirmed_payer_name_matching")
}
