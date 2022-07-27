import { valueHelper } from './value.helper'
import { fieldHelper } from './field.helper'
import { caregiverHelper } from './caregiver.helper'
import { healthPlanHelper } from './health_plan.helper'
import { patientHelper } from './patient.helper'
import { pharmacyStoreHelper } from './pharmacy_store.helper'
import { programHelper } from './program.helper'
import { userHelper } from './user.helper'
import { diagnosisCodeHelper, placeOfServiceHelper } from './admin'
import { dateHelper } from './date.helper'

export const interventionHelper = {
  billLater,
  closedReason,
  closedReasonDetail,
  consentFormInitiatedAt,
  consentFormInitiator,
  consentFormOnFile,
  consentObtainedFrom,
  consentVia,
  consultEnded,
  consultSessionDuration,
  consultSessionDurationExact,
  consultSessionDurationFaceToFace,
  consultStarted,
  contactAttempts,
  dateOfService,
  diagnosisCode,
  diagnosisCodeLongDescription,
  displayConsentObtainedFrom,
  displayConsultEnded,
  displayConsultStarted,
  displayDateOfServce,
  displayPendingUntil,
  displayUserEnded,
  displayUserStarted,
  dryRunProgramPatientAssignmentId,
  faxBypassed,
  healthPlanName,
  id,
  identification,
  medicarePaymentAmount,
  medicarePaymentStatus,
  memberNumber,
  modelName,
  newPatient,
  patient,
  patientName,
  pendingUntil,
  personNumber,
  pharmacist,
  pharmacistAgreedToSubmitClaimAt,
  pharmacistDisplay,
  pharmacyClaimTrackingNumber,
  pharmacyStore,
  pharmacyStoreDisplay,
  physiciansResponse,
  physiciansResponseRecordedAt,
  program,
  programDisplay,
  programName,
  programType,
  providerFee,
  serviceLocation,
  state,
  user,
  userEnded,
  userName,
  userStarted,
  venue
}

function billLater(intervention) {
  return fieldHelper.getField(intervention, 'bill_later')
}

function closedReason(intervention) {
  return fieldHelper.getField(intervention, 'closed_reason')
}

function closedReasonDetail(intervention) {
  return fieldHelper.getField(intervention, 'closed_reason_detail')
}

function consentFormInitiatedAt(intervention) {
  return fieldHelper.getField(intervention, 'consent_form_initiated_at')
}

function consentFormInitiator(intervention) {
  return userHelper.fullName(fieldHelper.getField(intervention, 'consent_form_initiator'))
}

function consentFormOnFile(intervention) {
  return fieldHelper.getField(intervention, 'consent_form_on_file')
}

function consentObtainedFrom(intervention) {
  return fieldHelper.getField(intervention, 'consent_obtained_from')
}

function consentVia(intervention) {
  return fieldHelper.getField(intervention, 'consent_via')
}

function consultEnded(intervention) {
  return fieldHelper.getField(intervention, 'consult_end_date')
}

function consultSessionDuration(intervention) {
  return fieldHelper.getField(intervention, 'consult_session_duration')
}

function consultSessionDurationExact(intervention) {
  return fieldHelper.getField(intervention, 'consult_session_duration_exact')
}

function consultSessionDurationFaceToFace(intervention) {
  return fieldHelper.getField(intervention, 'consult_session_duration_face_to_face')
}

function consultStarted(intervention) {
  return fieldHelper.getField(intervention, 'consult_start_date')
}

function contactAttempts(intervention) {
  return fieldHelper.getField(intervention, 'contact_attempts')
}

function dateOfService(intervention) {
  return fieldHelper.getField(intervention, 'date_of_service')
}

function diagnosisCode(intervention) {
  return diagnosisCodeHelper.code(fieldHelper.getField(intervention, 'diagnosis_code'))
}

function diagnosisCodeLongDescription(intervention) {
  return diagnosisCodeHelper.longDescription(fieldHelper.getField(intervention, 'diagnosis_code'))
}

function displayConsentObtainedFrom(intervention) {
  const consenter = interventionHelper.consentObtainedFrom(intervention)
  if (!valueHelper.isValue(consenter)) {
    return 'Not Obtained'
  }
  if (consenter.relationship == 'Patient') {
    return 'Patient'
  }

  return caregiverHelper.displayCaregiverAndRelationship(consenter)
}

function displayConsultEnded(intervention) {
  return dateHelper.displayDate(interventionHelper.consultEnded(intervention))
}

function displayConsultStarted(intervention) {
  return dateHelper.displayDate(interventionHelper.consultStarted(intervention))
}

function displayDateOfServce(intervention) {
  return dateHelper.displayDate(interventionHelper.dateOfService(intervention))
}

function displayPendingUntil(intervention) {
  return dateHelper.displayDate(interventionHelper.pendingUntil(intervention))
}

function displayUserEnded(intervention) {
  return dateHelper.displayDateTime(interventionHelper.userEnded(intervention))
}

function displayUserStarted(intervention) {
  return dateHelper.displayDateTime(interventionHelper.userStarted(intervention))
}

function dryRunProgramPatientAssignmentId(intervention) {
  return fieldHelper.getField(intervention, 'dry_run_program_patient_id')
}

function faxBypassed(intervention) {
  return fieldHelper.getField(intervention, 'fax_bypassed')
}

function healthPlanName(intervention) {
  return healthPlanHelper.name(fieldHelper.getField(intervention, 'health_plan'))
}

function id(intervention) {
  return fieldHelper.getField(intervention, 'id')
}

function identification(intervention) {
  return `${interventionHelper.programName(intervention)} ${interventionHelper.dateOfService(intervention)}`
}

function medicarePaymentAmount(intervention) {
  return fieldHelper.getField(intervention, 'medicare_payment_amount')
}

function medicarePaymentStatus(intervention) {
  return fieldHelper.getField(intervention, 'medicare_payment_status')
}

function memberNumber(intervention) {
  return patientHelper.memberNumber(interventionHelper.patient(intervention))
}

function modelName() {
  return 'intervention'
}

function newPatient(intervention) {
  return fieldHelper.getField(intervention, 'new_patient')
}

function patient(intervention) {
  return fieldHelper.getField(intervention, 'patient')
}

function patientName(intervention, prefix = '', allowBlank = false) {
  return patientHelper.name(interventionHelper.patient(intervention), prefix, allowBlank)
}

function pendingUntil(intervention) {
  return fieldHelper.getField(intervention, 'pending_until')
}

function personNumber(intervention) {
  return patientHelper.personNumber(interventionHelper.patient(intervention))
}

function pharmacist(intervention) {
  return fieldHelper.getField(intervention, 'pharmacist')
}

function pharmacistAgreedToSubmitClaimAt(intervention) {
  return fieldHelper.getField(intervention, 'pharmacist_agreed_to_submit_claim_at')
}

function pharmacistDisplay(intervention) {
  return userHelper.pharmacistDisplay(interventionHelper.pharmacist(intervention))
}

function pharmacyClaimTrackingNumber(intervention) {
  return fieldHelper.getField(intervention, 'pharmacy_claim_tracking_number')
}

function pharmacyStore(intervention) {
  return fieldHelper.getField(intervention, 'pharmacy_store')
}

function pharmacyStoreDisplay(intervention) {
  return pharmacyStoreHelper.display(interventionHelper.pharmacyStore(intervention))
}

function physiciansResponse(intervention) {
  return fieldHelper.getField(intervention, 'physicians_response')
}

function physiciansResponseRecordedAt(intervention) {
  return fieldHelper.getField(intervention, 'physicians_response_recorded_at')
}

function program(intervention) {
  return fieldHelper.getField(intervention, 'program')
}

function programDisplay(intervention) {
  return programHelper.display(interventionHelper.program(intervention))
}

function programName(intervention) {
  return programHelper.name(interventionHelper.program(intervention))
}

function programType(intervention) {
  return programHelper.type(interventionHelper.program(intervention))
}

function providerFee(intervention) {
  return fieldHelper.getField(intervention, 'provider_fee')
}

function serviceLocation(intervention) {
  return placeOfServiceHelper.name(fieldHelper.getField(intervention, 'service_location'))
}

function state(intervention) {
  return valueHelper.titleize(fieldHelper.getField(intervention, 'state'))
}

function user(intervention) {
  return fieldHelper.getField(intervention, 'user')
}

function userEnded(intervention) {
  return fieldHelper.getField(intervention, 'user_end_date')
}

function userName(intervention) {
  return userHelper.fullName(interventionHelper.user(intervention))
}

function userStarted(intervention) {
  return fieldHelper.getField(intervention, 'user_start_date')
}

function venue(intervention) {
  return fieldHelper.getField(intervention, 'venue')
}
