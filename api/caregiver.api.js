import { API } from './api'
import { caregiverHelper } from '../helpers/caregiver.helper'

function toJSON(caregiver) {
  return {
    caregiver: caregiverHelper.toJSON(caregiver)
  }
}

export const caregiverApi = {
  buildNew,
  create,
  destroy,
  edit,
  listForPatient,
  profile,
  show,
  update
}

function buildNew(userCredentials, patient_id, onSuccess, onFailure) {
  if (!API.validateId('patient ID', patient_id, onFailure)) {
    return
  }

  const method = 'GET'
  const path = `/patients/${patient_id}/caregivers/new`
  API.perform(
    method,
    path,
    '',
    userCredentials,
    undefined,
    onSuccess,
    onFailure
  )
}

function create(userCredentials, caregiver, onSuccess, onFailure) {
  if (!API.validateId('patient ID', caregiver.patient_id, onFailure)) {
    return
  }

  const method = 'POST'
  const path = `/patients/${caregiver.patient_id}/caregivers`
  API.perform(method, path, '', userCredentials, toJSON(caregiver), onSuccess, onFailure)
}

function destroy(userCredentials, caregiver_id, onSuccess, onFailure) {
  const method = 'DELETE'
  const path = `/caregivers/${caregiver_id}`
  API.perform(method, path, '', userCredentials, undefined, onSuccess, onFailure)
}

function edit(userCredentials, id, onSuccess, onFailure) {
  if (!API.validateId('caregiver ID', id, onFailure)) {
    return
  }

  const method = 'GET'
  const path = `/caregivers/${id}/edit`
  API.perform(method, path, '', userCredentials, undefined, onSuccess, onFailure)
}

function listForPatient(userCredentials, patient_id, params, onSuccess, onFailure) {
  if (!API.validateId('patient ID', patient_id, onFailure)) {
    return
  }

  const method = 'GET'
  const path = `/patients/${patient_id}/caregivers/list`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function profile(userCredentials, id, onSuccess, onFailure) {
  if (!API.validateId('caregiver ID', id, onFailure)) {
    return
  }

  const method = 'GET'
  const path = `/caregivers/${id}/profile`
  API.perform(method, path, '', userCredentials, undefined, onSuccess, onFailure)
}

function show(userCredentials, id, onSuccess, onFailure) {
  if (!API.validateId('caregiver ID', id, onFailure)) {
    return
  }

  const method = 'GET'
  const path = `/caregivers/${id}`
  API.perform(method, path, '', userCredentials, undefined, onSuccess, onFailure)
}

function update(userCredentials, caregiver, onSuccess, onFailure) {
  const method = 'PUT'
  const path = `/caregivers/${caregiver.id}`
  API.perform(method, path, '', userCredentials, toJSON(caregiver), onSuccess, onFailure)
}
