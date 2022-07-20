import { API } from "./api"
import { patientPharmacistHelper } from "../helpers/patient_pharmacist.helper"

function toJSON(patientPharmacist) {
  return {
    patient_pharmacist: patientPharmacistHelper.toJSON(patientPharmacist)
  }
}

export const patientPharmacistApi = {
  listForPatient
}

function listForPatient(pharmacistCredentials, patient_id, params, onSuccess, onFailure) {
  if (!API.validateId("patient ID", patient_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/patients/${patient_id}/patient_pharmacists/list`
  API.perform(method, path, API.buildQueryString(params), pharmacistCredentials, undefined, onSuccess, onFailure)
}
