import { API } from "./api"
import { patientHcpHelper } from "../helpers"

export const patientHcpApi = {
  buildNew,
  create,
  destroy,
  edit,
  listForPatient,
  profile,
  show,
  update
}

function toJSON(patientphysician) {
  return {
    patient_physician: patientHcpHelper.toJSON(patientphysician)
  }
}

function buildNew(userCredentials, patient_id, onSuccess, onFailure) {
  if (!API.validateId("patient ID", patient_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/patients/${patient_id}/patient_physicians/new`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}

function destroy(userCredentials, patient_hcp_id, onSuccess, onFailure) {
  if (!API.validateId("patient HCP ID", patient_hcp_id, onFailure)) {
    return
  }

  const method = "DELETE"
  const path = `/patient_physicians/${patient_hcp_id}`
  API.perform(method, path, '', userCredentials, undefined, onSuccess, onFailure)
}

function create(userCredentials, patientHcp, onSuccess, onFailure) {
  if (!API.validateId("patient ID", patientHcp.patient_id, onFailure)) {
    return
  }

  const method = "POST"
  const path = `/patients/${patientHcp.patient_id}/patient_physicians`
  API.perform(method, path, "", userCredentials, toJSON(patientHcp), onSuccess, onFailure)
}

function edit(userCredentials, patient_hcp_id, onSuccess, onFailure) {
  if (!API.validateId("patient HCP ID", patient_hcp_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/patient_physicians/${patient_hcp_id}/edit`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}

function listForPatient(userCredentials, patient_id, params, onSuccess, onFailure) {
  if (!API.validateId("patient ID", patient_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/patients/${patient_id}/patient_physicians/list`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function profile(userCredentials, patient_hcp_id, onSuccess, onFailure) {
  if (!API.validateId("patient HCP ID", patient_hcp_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/patient_physicians/${patient_hcp_id}/profile`
  API.perform(method, path, '', userCredentials, undefined, onSuccess, onFailure)
}

function show(userCredentials, patient_hcp_id, onSuccess, onFailure) {
  if (!API.validateId("patient HCP ID", patient_hcp_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/patient_physicians/${patient_hcp_id}`
  API.perform(method, path, '', userCredentials, undefined, onSuccess, onFailure)
}

function update(userCredentials, patienHcp, onSuccess, onFailure) {
  if (!API.validateId("patient HCP ID", patientHcp.id, onFailure)) {
    return
  }

  const method = "PUT"
  const path = `/patient_physicians/${patientHcp.id}`
  API.perform(method, path, "", userCredentials, toJSON(patientHcp), onSuccess, onFailure)
}
