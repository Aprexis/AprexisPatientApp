import { valueHelper } from "./value.helper"
import { fieldHelper } from "./field.helper"

export const contactHelper = {
  email,
  fax,
  gender,
  info,
  keys,
  mobilePhone,
  name,
  person,
  phone,
  phoneExtension,
  phoneWithExtension
}

const contactKeys = [
  "email",
  "fax",
  "gender",
  "contract_info",
  "mobile_phone",
  "contact_name",
  "contact_person",
  "phone",
  "phone_extension"
]

function email(contact, prefix) {
  return fieldHelper.getField(contact, "email", prefix)
}

function fax(contact, prefix) {
  return fieldHelper.getField(contact, "fax", prefix)
}

function gender(contact, prefix) {
  return valueHelper.capitalizeWords(fieldHelper.getField(contact, "gender", prefix))
}

function info(contact, prefix) {
  return fieldHelper.getField(contact, "contact_info", prefix)
}

function keys(prefix, allowMobile = true) {
  let workingKeys = contactKeys
  if (!valueHelper.isSet(allowMobile)) {
    workingKeys = contactKeys.filter((key) => key != "mobile_phone")
  }

  if (!valueHelper.isStringValue(prefix)) {
    return workingKeys
  }

  return workingKeys.map((key) => fieldHelper.fieldName(key, prefix))
}

function mobilePhone(contact, prefix) {
  return fieldHelper.getField(contact, "mobile_phone", prefix)
}

function name(contact, prefix) {
  return fieldHelper.getField(contact, "contact_name", prefix)
}

function person(contact, prefix) {
  return fieldHelper.getField(contact, "contact_person", prefix)
}

function phone(contact, prefix) {
  return fieldHelper.getField(contact, "phone", prefix)
}

function phoneExtension(contact, prefix) {
  return fieldHelper.getField(contact, "phone_extension", prefix)
}

function phoneWithExtension(contact, prefix) {
  const phone = contactHelper.phone(contact, prefix)
  const extension = contactHelper.phoneExtension(contact, prefix)

  if (!valueHelper.isStringValue(extension)) {
    return phone
  }

  return `${phone} Ext. ${extension}`
}
