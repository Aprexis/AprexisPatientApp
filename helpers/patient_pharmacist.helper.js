import { fieldHelper } from './field.helper'
import { userHelper } from './user.helper'

export const patientPharmacistHelper = {
  ...userHelper,
  pharmacistNpi
}

function pharmacistNpi(patientPharmacist) {
  return fieldHelper.getField(patientPharmacist, 'pharmacist_npi')
}
