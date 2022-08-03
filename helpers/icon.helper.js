import { valueHelper, medicationHelper, patientMedicationHelper, pharmacyClaimHelper } from '@aprexis/aprexis-api-utility'

export const iconHelper = {
  medicationIcon,
  patientMedicationIcon,
  pharmacyClaimMedicationIcon
}

const medicationLabelMap = {
  'capsule': 'capsules',
  'tablet': 'tablets',
  'syringe': 'syringe',
  'needle': 'syringe',
  'topical spray': 'spray-can',
  'drops': 'eye-dropper',
  'pressurized inhalation': 'inhaler',
  'for compounding': 'mortar-pestle'
}

function medicationIcon(medication) {
  if (!valueHelper.isValue(medication)) {
    return null
  }

  const medicationLabel = medicationHelper.label(medication).toLowerCase()
  const medicationLabelKey = Object.keys(medicationLabelMap).find((key) => medicationLabel.includes(key))
  if (valueHelper.isStringValue(medicationLabelKey)) {
    return medicationLabelMap[medicationLabelKey]
  }

  return 'prescription'
}

function patientMedicationIcon(patientMedication) {
  return iconHelper.medicationIcon(patientMedicationHelper.medication(patientMedication))
}

function pharmacyClaimMedicationIcon(pharmacyClaim) {
  return iconHelper.medicationIcon(pharmacyClaimHelper.medication(pharmacyClaim))
}
