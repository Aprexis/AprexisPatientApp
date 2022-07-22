import { API } from "./"

export const pharmacyClaimApi = {
  listForPatient,
  profile,
  show
}

function listForPatient(userCredentials, patient_id, params, onSuccess, onFailure) {
  if (!API.validateId("patient ID", patient_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/patients/${patient_id}/pharmacy_claims/list`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function profile(userCredentials, id, onSuccess, onFailure) {
  if (!API.validateId("pharmacy claim ID", id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/pharmacy_claims/${id}/profile`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}

function show(userCredentials, id, onSuccess, onFailure) {
  if (!API.validateId("pharmacy claim ID", id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/pharmacy_claims/${id}`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}
