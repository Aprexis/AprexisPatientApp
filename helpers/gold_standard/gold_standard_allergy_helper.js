import { fieldHelper } from "../field.helper"

export const goldStandardAllergyHelper = {
  allergyDescription,
  allergyId,
  allergyName,
  label
}

function allergyDescription(goldStandardAllergy) {
  return fieldHelper.getField(goldStandardAllergy, "allergy_description")
}

function allergyId(goldStandardAllergy) {
  return fieldHelper.getField(goldStandardAllergy, "allergy_id")
}

function allergyName(goldStandardAllergy) {
  return fieldHelper.getField(goldStandardAllergy, "allergy_name")
}

function label(goldStandardAllergy) {
  return goldStandardAllergyHelper.allergyName(goldStandardAllergy)
}
