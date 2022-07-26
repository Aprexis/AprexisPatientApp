import { API } from './api'

export const interventionApi = {
  list,
  listForPatient,
  listForPharmacyStore,
  profile,
  show
}

function list(userCredentials, params, onSuccess, onFailure) {
  const method = 'GET'
  const path = `/interventions/list`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function listForPatient(userCredentials, patient_id, params, onSuccess, onFailure) {
  const method = 'GET'
  const path = `/patients/${patient_id}/interventions/list`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function listForPharmacyStore(userCredentials, pharmacy_store_id, params, onSuccess, onFailure) {
  const method = 'GET'
  const path = `/pharmacy_stores/${pharmacy_store_id}/interventions/list`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function profile(userCredentials, id, onSuccess, onFailure) {
  if (!API.validateId('intervention ID', id, onFailure)) {
    return
  }

  const method = 'GET'
  const path = `/interventions/${id}/profile`
  API.perform(method, path, '', userCredentials, undefined, onSuccess, onFailure)
}

function show(userCredentials, id, onSuccess, onFailure) {
  if (!API.validateId('intervention ID', id, onFailure)) {
    return
  }

  const method = 'GET'
  const path = `/interventions/${id}`
  API.perform(method, path, '', userCredentials, undefined, onSuccess, onFailure)
}
