import { API } from "./api"
import { patientMedicationHelper } from "../helpers/patient_medication.helper"
import { valueHelper } from "../helpers/value.helper"

export const patientMedicationApi = {
  buildNew,
  create,
  edit,
  listForPatient,
  searchForPatient,
  profile,
  show,
  update
}

function toJSON(patientMedication) {
  return {
    patient_medication: patientMedicationHelper.toJSON(patientMedication)
  }
}

function buildNew(userCredentials, patient_id, pharmacy_store_id, onSuccess, onFailure) {
  if (!API.validateId("patient ID", patient_id, onFailure)) {
    return
  }

  if (!API.validateId("pharmacy store ID", pharmacy_store_id, onFailure, true)) {
    return
  }

  let queryString = ""
  if (valueHelper.isValue(pharmacy_store_id)) {
    queryString = API.buildQueryString({ pharmacy_store_id })
  }

  const method = "GET"
  const path = `/patients/${patient_id}/patient_medications/new`
  API.perform(
    method,
    path,
    queryString,
    userCredentials,
    undefined,
    onSuccess,
    onFailure
  )
}

function create(userCredentials, patientMedication, onSuccess, onFailure) {
  if (!API.validateId("patient ID", patientMedication.patient_id, onFailure)) {
    return
  }
  if (!API.validateId("pharmacy store ID", patientMedication.pharmacy_store_id, onFailure, true)) {
    return
  }

  const method = "POST"
  const path = `/patients/${patientMedication.patient_id}/patient_medications`
  API.perform(method, path, "", userCredentials, toJSON(patientMedication), onSuccess, onFailure)
}

function edit(userCredentials, patient_medication_id, onSuccess, onFailure) {
  if (!API.validateId("patient medication ID", patient_medication_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/patient_medications/${patient_medication_id}/edit`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}

function listForPatient(userCredentials, patient_id, params, onSuccess, onFailure) {
  if (!API.validateId("patient ID", patient_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/patients/${patient_id}/patient_medications/list`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function profile(userCredentials, patient_medication_id, onSuccess, onFailure) {
  if (!API.validateId("patient medication ID", patient_medication_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/patient_medications/${patient_medication_id}/profile`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}

function searchForPatient(userCredentials, patient_id, params, onSuccess, onFailure) {
  if (!API.validateId("patient ID", patient_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/patients/${patient_id}/patient_medications/search`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function show(userCredentials, patient_medication_id, onSuccess, onFailure) {
  if (!API.validateId("patient medication ID", patient_medication_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/patient_medications/${patient_medication_id}`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}

function update(userCredentials, patientMedication, onSuccess, onFailure) {
  const method = "PUT"
  const path = `/patient_medications/${patientMedication.id}`
  API.perform(method, path, "", userCredentials, toJSON(patientMedication), onSuccess, onFailure)
}
