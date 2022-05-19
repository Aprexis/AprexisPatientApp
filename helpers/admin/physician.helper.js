import { fieldHelper } from "../field.helper"
import { addressHelper } from "../address.helper"
import { nameHelper } from "../name.helper"
import { valueHelper } from "../value.helper"

export const physicianHelper = {
  businessFax,
  businessPhone,
  city,
  clinic,
  credentials,
  displayBusinessPhone,
  einNumber,
  firstName,
  fullAddress,
  label,
  lastName,
  middleName,
  name,
  nameAndNpi,
  npi,
  npiDeactivationDate,
  npiDeactivationReasonCode,
  npiReactivationDate,
  phone,
  phoneExtension,
  practiceSpecialty,
  providerLastUpdateDate,
  sourceId,
  sourceNotes,
  sourceType,
  state
}

function businessFax(physician) {
  return fieldHelper.getField(physician, "business_fax")
}

function businessPhone(physician) {
  return fieldHelper.getField(physician, "business_phone")
}


function city(physician) {
  return addressHelper.city(physician)
}

function clinic(physician) {
  return fieldHelper.getField(physician, "clinic")
}

function credentials(physician) {
  return fieldHelper.getField(physician, "credentials")
}

function displayBusinessPhone(physician) {
  const businessPhone = physicianHelper.businessPhone(physician)
  return fieldHelper.phoneNumberForDisplay(businessPhone)
}

function einNumber(physician) {
  return fieldHelper.getField(physician, "ein_number")
}

function firstName(physician, prefix = "") {
  return nameHelper.firstName(physician, prefix)
}

function fullAddress(physician) {
  return addressHelper.fullAddress(physician)
}

function label(physician) {
  if (!valueHelper.isValue(physician)) {
    return ""
  }

  return `${physicianHelper.nameAndNpi(physician)}`
}

function lastName(physician, prefix = "") {
  return nameHelper.lastName(physician, prefix)
}

function middleName(physician, prefix = "") {
  return nameHelper.middleName(physician, prefix)
}

function name(physician, prefix = "") {
  return nameHelper.name(physician, "physician", prefix)
}

function nameAndNpi(physician) {
  if (!valueHelper.isValue(physician)) {
    return ""
  }

  return `${physicianHelper.name(physician)} [${physicianHelper.npi(physician)}]`
}

function npi(physician) {
  return fieldHelper.getField(physician, "npi")
}

function npiDeactivationDate(physician) {
  return fieldHelper.getField(physician, "npi_deactivation_date")
}

function npiDeactivationReasonCode(pysician) {
  return fieldHelper.getField(pysician, "npi_deactivation_reason_code")
}

function npiReactivationDate(physician) {
  return fieldHelper.getField(physician, "npi_reactivation_date")
}

function phone(physician) {
  return fieldHelper.getField(physician, "phone")
}

function phoneExtension(physician) {
  return fieldHelper.getField(physician, "phone_extension")
}

function practiceSpecialty(physician) {
  return fieldHelper.getField(physician, "practice_specialty")
}

function providerLastUpdateDate(physician) {
  return fieldHelper.getField(physician, "provider_last_update_date")
}

function sourceId(physician) {
  return fieldHelper.getField(physician, "source_id")
}

function sourceNotes(physician) {
  return fieldHelper.getField(physician, "source_notes")
}

function sourceType(physician) {
  return fieldHelper.getField(physician, "source_type")
}

function state(physician) {
  return addressHelper.state(physician)
}
