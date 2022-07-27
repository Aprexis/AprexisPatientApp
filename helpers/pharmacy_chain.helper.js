import { valueHelper } from "./value.helper"
import { fieldHelper } from "./field.helper"
import { addressHelper } from "./address.helper"
import { contactHelper } from "./contact.helper"

export const pharmacyChainHelper = {
  address,
  ccdCode,
  chain,
  city,
  einNumber,
  fullAddress,
  id,
  logo,
  name,
  notes,
  npi,
  parentOrganizationLbn,
  pharmacyStoreCount,
  phone,
  state,
  zipCode
}

function address(pharmacyChain) {
  return addressHelper.address(pharmacyChain)
}

function ccdCode(pharmacyChain) {
  return fieldHelper.getField(pharmacyChain, "ccd_code")
}

function chain(pharmacyChain) {
  const name = pharmacyChainHelper.name(pharmacyChain)
  const state = pharmacyChainHelper.state(pharmacyChain)
  const city = pharmacyChainHelper.city(pharmacyChain)
  let chain = ""

  if (valueHelper.isStringValue(name)) {
    chain = name
  }

  if (valueHelper.isStringValue(state)) {
    chain = `${chain}, ${state}`
  }

  if (valueHelper.isStringValue(city)) {
    chain = `${chain}, ${city}`
  }

  return chain
}

function city(pharmacyChain) {
  return addressHelper.city(pharmacyChain)
}

function einNumber(pharmacyChain) {
  return fieldHelper.getField(pharmacyChain, "ein_number")
}

function fullAddress(pharmacyChain) {
  return addressHelper.fullAddress(pharmacyChain)
}

function id(pharmacyChain) {
  return fieldHelper.getField(pharmacyChain, "id")
}

function logo(pharmacyChain) {
  return fieldHelper.getField(pharmacyChain, "logo")
}

function name(pharmacyChain) {
  return fieldHelper.getField(pharmacyChain, "name")
}

function notes(pharmacyChain) {
  return fieldHelper.getField(pharmacyChain, "notes")
}

function npi(pharmacyChain) {
  return fieldHelper.getField(pharmacyChain, "npi")
}

function parentOrganizationLbn(pharmacyChain) {
  return fieldHelper.getField(pharmacyChain, "parent_organization_lbn")
}

function pharmacyStoreCount(pharmacyChain) {
  return fieldHelper.getField(pharmacyChain, "pharmacy_store_count")
}

function phone(pharmacyChain) {
  return contactHelper.phone(pharmacyChain)
}

function state(pharmacyChain) {
  return addressHelper.state(pharmacyChain)
}

function zipCode(pharmacyChain) {
  return addressHelper.zipCode(pharmacyChain)
}
