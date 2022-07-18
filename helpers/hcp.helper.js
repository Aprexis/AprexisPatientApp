import { valueHelper } from './value.helper'
import { fieldHelper } from './field.helper'
import { nameHelper } from './name.helper'

export const hcpHelper = {
  id,
  label,
  name,
  nameAndNpi,
  npi
}

function id(hcp) {
  return fieldHelper.getField(hcp, 'id')
}

function label(hcp) {
  if (!valueHelper.isValue(hcp)) {
    return ""
  }

  return `${hcpHelper.nameAndNpi(hcp)}`
}

function name(hcp) {
  return nameHelper.name(hcp)
}

function nameAndNpi(hcp) {
  if (!valueHelper.isValue(hcp)) {
    return ""
  }

  return `${hcpHelper.name(hcp)} [${hcpHelper.npi(hcp)}]`
}

function npi(hcp) {
  return fieldHelper.getField(hcp, "npi")
}
