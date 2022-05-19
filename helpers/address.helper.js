import { valueHelper } from "./value.helper"
import { fieldHelper } from "./field.helper"

export const addressHelper = {
  address,
  city,
  country,
  displayZipCode,
  fullAddress,
  keys,
  state,
  zipCode
}

const addressKeys = [
  "address",
  "city",
  "country",
  "state",
  "zip_code"
]

function address(address, prefix) {
  return fieldHelper.getField(address, "address", prefix)
}

function city(address, prefix) {
  return fieldHelper.getField(address, "city", prefix)
}

function country(address, prefix) {
  return fieldHelper.getField(address, "country", prefix)
}

function displayZipCode(address, prefix) {
  const zipCode = addressHelper.zipCode(address, prefix)
  if (!valueHelper.isStringValue(zipCode)) {
    return ""
  }

  if (zipCode.includes("-") || zipCode.length <= 5) {
    return zipCode
  }

  return `${zipCode.substring(0, 5)}-${zipCode.substring(5)}`
}

function fullAddress(address, prefix) {
  const addressLine = addressHelper.address(address, prefix)
  const city = addressHelper.city(address, prefix)
  const state = addressHelper.state(address, prefix)
  const zipCode = addressHelper.displayZipCode(address, prefix)
  const country = addressHelper.country(address, prefix)
  let result = ""
  let resultPrefix = ""

  if (valueHelper.isStringValue(addressLine) && addressLine != "N/A" && addressLine != "NA") {
    result = addressLine
    resultPrefix = ", "
  }

  if (valueHelper.isStringValue(city)) {
    result = `${result}${resultPrefix}${city}`
    resultPrefix = ", "
  }

  result = `${result}${resultPrefix}${state} ${zipCode}`

  if (valueHelper.isStringValue(country) && country != "US" && country != "USA") {
    result = `${result}, ${country}`
  }

  return result
}

function keys(prefix) {
  if (!valueHelper.isStringValue(prefix)) {
    return addressKeys
  }

  return addressKeys.map((key) => fieldHelper.fieldName(key, prefix))
}

function state(address, prefix) {
  return fieldHelper.getField(address, "state", prefix)
}

function zipCode(address, prefix) {
  return fieldHelper.getField(address, "zip_code", prefix)
}
