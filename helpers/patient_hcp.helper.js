import { valueHelper } from './value.helper'
import { fieldHelper } from './field.helper'
import { apiHelper } from './api.helper'
import { patientHelper } from './patient.helper'
import { hcpHelper } from './hcp.helper'

export const patientHcpHelper = {
  buildChanged,
  buildNewChanged,
  changeField,
  hcp,
  hcpLabel,
  hcpName,
  healthPlanId,
  id,
  modelName,
  patient,
  patientName,
  primary,
  toJSON
}

const patientHcpKeys = [
  'id',
  'patient_id',
  'physician_id',
  'primary'
]
function buildChanged(patientHcp, changedPatientHcp) {
  if (valueHelper.isValue(changedPatientHcp)) {
    return changedPatientHcp
  }

  if (valueHelper.isValue(patientHcp.id)) {
    return copyIdentifiers(patientHcp)
  }

  return patientHcpHelper.buildNewChanged(patientHcp)

  function copyIdentifiers(patientHcp) {
    return {
      id: patientHcp.id,
      patient_id: patientHcp.patient_id,
      physician_id: patientHcp.physician_id
    }
  }
}

function buildNewChanged(patientHcp) {
  return {
    ...patientHcp
  }
}

function changeField(patientHcp, changedPatientHcp, name, value) {
  return fieldHelper.changeField('patientHcp', patientHcp, changedPatientHcp, name, value, patientHcpHelper.buildChanged)
}

function hcp(patientHcp) {
  return fieldHelper.getField(patientHcp, 'physician')
}

function hcpLabel(patientHcp) {
  if (!valueHelper.isValue(patientHcp)) {
    return ''
  }

  return hcpHelper.label(patientHcpHelper.hcp(patientHcp))
}

function hcpName(patientHcp) {
  if (!valueHelper.isValue(patientHcp)) {
    return ''
  }

  return hcpHelper.name(patientHcpHelper.hcp(patientHcp))
}


function healthPlanId(patientHcp) {
  return patientHelper.healthPlanId(patientHcpHelper.patient(patientHcp))
}

function id(patientHcp) {
  return fieldHelper.getField(patientHcp, 'id')
}

function modelName() {
  return 'patientHcp'
}

function patient(patientHcp) {
  return fieldHelper.getField(patientHcp, 'patient')
}

function patientName(patientHcp) {
  return patientHelper.name(patientHcpHelper.patient(patientHcp))
}

function primary(patientHcp) {
  return fieldHelper.getField(patientHcp, 'primary')
}

function toJSON(patientHcp) {
  return apiHelper.toJSON(patientHcp, patientHcpKeys)
}

