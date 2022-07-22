import { API } from "./"
import { labTestValueHelper, valueHelper } from "../helpers"

export const labTestValueApi = {
  buildNewForPatient,
  create,
  edit,
  listForIntervention,
  listForPatient,
  show,
  profile,
  update
}

function toJSON(labTestValue) {
  return {
    lab_test_value: labTestValueHelper.toJSON(labTestValue)
  }
}

function buildNewForPatient(userCredentials, patient_id, pharmacy_store_id, onSuccess, onFailure) {
  if (!API.validateId("patient ID", patient_id, onFailure)) {
    return
  }

  let queryString = ""
  if (valueHelper.isNumberValue(pharmacy_store_id)) {
    if (!API.validateId("pharmacy store ID", pharmacy_store_id, onFailure)) {
      return
    }

    queryString = `?pharmacy_store_id=${pharmacy_store_id}`
  }

  const method = "GET"
  const path = `/patients/${patient_id}/lab_test_values/new`

  API.perform(method, path, queryString, userCredentials, undefined, onSuccess, onFailure)
}

function create(userCredentials, labTestValue, onSuccess, onFailure) {
  if (!API.validateId("lab test ID", labTestValue.lab_test_id, onFailure)) {
    return
  }
  if (!API.validateId("patient ID", labTestValue.patient_id, onFailure)) {
    return
  }
  if (!API.validateId("pharmacy store ID", labTestValue.pharmacy_store_id, onFailure, true)) {
    return
  }
  if (!API.validateId("user ID", labTestValue.user_id, onFailure)) {
    return
  }

  const method = "POST"
  const path = `/patients//${labTestValue.patient_id}/lab_test_values`
  API.perform(method, path, "", userCredentials, toJSON(labTestValue), onSuccess, onFailure)
}

function edit(userCredentials, lab_test_value_id, onSuccess, onFailure) {
  if (!API.validateId("lab test value ID", lab_test_value_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/lab_test_values/${lab_test_value_id}/edit`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}

function listForIntervention(userCredentials, intervention_id, params, onSuccess, onFailure) {
  if (!API.validateId("intervention ID", intervention_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/interventions/${intervention_id}/lab_test_values/list`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function listForPatient(userCredentials, patient_id, params, onSuccess, onFailure) {
  if (!API.validateId("patient ID", patient_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/patients/${patient_id}/lab_test_values/list`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function profile(userCredentials, lab_test_value_id, onSuccess, onFailure) {
  if (!API.validateId("lab test value ID", lab_test_value_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/lab_test_values/${lab_test_value_id}/profile`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}

function show(userCredentials, lab_test_value_id, onSuccess, onFailure) {
  if (!API.validateId("lab test value ID", lab_test_value_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/lab_test_values/${lab_test_value_id}`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}

function update(userCredentials, lab_test_value, onSuccess, onFailure) {
  const method = "PUT"
  const path = `/lab_test_values/${lab_test_value.id}`
  API.perform(method, path, "", userCredentials, toJSON(lab_test_value), onSuccess, onFailure)
}
