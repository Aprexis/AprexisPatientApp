import { API } from "./api"
import { patientAllergyHelper } from "../helpers"

export const patientAllergyApi = {
  buildNew,
  create,
  destroy,
  edit,
  listForPatient,
  profile,
  show,
  update
}

function toJSON(patientAllergy) {
  return {
    patient_allergy: patientAllergyHelper.toJSON(patientAllergy)
  }
}

function buildNew(userCredentials, patient_id, onSuccess, onFailure) {
  if (!API.validateId("patient ID", patient_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/patients/${patient_id}/patient_allergies/new`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}

function destroy(userCredentials, patient_allergy_id, onSuccess, onFailure) {
  if (!API.validateId("patient allergy ID", patient_allergy_id, onFailure)) {
    return
  }

  const method = "DELETE"
  const path = `/patient_allergies/${patient_allergy_id}`
  API.perform(method, path, '', userCredentials, undefined, onSuccess, onFailure)
}

function create(userCredentials, patientAllergy, onSuccess, onFailure) {
  if (!API.validateId("patient ID", patientAllergy.patient_id, onFailure)) {
    return
  }

  const method = "POST"
  const path = `/patients/${patientAllergy.patient_id}/patient_allergies`
  API.perform(method, path, "", userCredentials, toJSON(patientAllergy), onSuccess, onFailure)
}

function edit(userCredentials, patient_allergy_id, onSuccess, onFailure) {
  if (!API.validateId("patient allergy ID", patient_allergy_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/patient_allergies/${patient_allergy_id}/edit`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}

function listForPatient(userCredentials, patient_id, params, onSuccess, onFailure) {
  if (!API.validateId("patient ID", patient_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/patients/${patient_id}/patient_allergies/list`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function profile(userCredentials, patient_allergy_id, onSuccess, onFailure) {
  if (!API.validateId("patient allergy ID", patient_allergy_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/patient_allergies/${patient_allergy_id}/profile`
  API.perform(method, path, '', userCredentials, undefined, onSuccess, onFailure)
}

function show(userCredentials, patient_allergy_id, onSuccess, onFailure) {
  if (!API.validateId("patient allergy ID", patient_allergy_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/patient_allergies/${patient_allergy_id}`
  API.perform(method, path, '', userCredentials, undefined, onSuccess, onFailure)
}

function update(userCredentials, patientAllergy, onSuccess, onFailure) {
  if (!API.validateId("patient allergy ID", patientAllergy.id, onFailure)) {
    return
  }

  const method = "PUT"
  const path = `/patient_allergies/${patientAllergy.id}`
  API.perform(method, path, "", userCredentials, toJSON(patientAllergy), onSuccess, onFailure)
}
