import { fieldHelper } from '../field.helper'
import { valueHelper } from '../value.helper'

export const labTestHelper = {
  category,
  displayVital,
  fullName,
  isVital,
  keyCode,
  label,
  modelName,
  name,
  normalValue,
  units,
  vital
}

function category(labTest) {
  return fieldHelper.getField(labTest, 'category')
}

function displayVital(labTest) {
  if (!labTestHelper.isVital(labTest)) {
    return ''
  }

  return 'Vital'
}

function fullName(labTest) {
  return fieldHelper.getField(labTest, 'full_name')
}

function label(labTest) {
  if (!valueHelper.isValue(labTest)) {
    return ''
  }

  let value = `${labTestHelper.fullName(labTest)} [${labTestHelper.category(labTest)}`
  if (labTestHelper.isVital(labTest)) {
    value = `${value} (${labTestHelper.displayVital(labTest)})`
  }
  value = `${value}]`

  return value
}

function isVital(labTest) {
  return valueHelper.isSet(labTestHelper.vital(labTest))
}

function keyCode(labTest) {
  return fieldHelper.getField(labTest, 'key_code')
}

function modelName() {
  return 'labTest'
}

function name(labTest) {
  return fieldHelper.getField(labTest, 'name')
}

function normalValue(labTest) {
  return fieldHelper.getField(labTest, 'normal_value')
}

function units(labTest) {
  return fieldHelper.getField(labTest, 'units')
}

function vital(labTest) {
  return fieldHelper.getField(labTest, 'vital')
}
