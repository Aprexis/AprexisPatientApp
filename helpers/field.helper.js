import { valueHelper } from "./value.helper.js"

export const fieldHelper = {
  fieldName,
  getField
}

function fieldName(fieldName, prefix) {
  if (!valueHelper.isStringValue(prefix)) {
    return fieldName
  }

  return `${prefix}_${fieldName} `
}

function getField(object, fieldName, prefix) {
  if (!valueHelper.isValue(object)) {
    return
  }

  return object[fieldHelper.fieldName(fieldName, prefix)]
}
