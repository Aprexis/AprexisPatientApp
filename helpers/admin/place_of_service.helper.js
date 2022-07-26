import { fieldHelper } from '../field.helper'

export const placeOfServiceHelper = {
  name
}

function name(placeOfService) {
  return fieldHelper.getField(placeOfService, 'name')
}
