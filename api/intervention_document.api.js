import { API } from './api'

export const interventionDocumentApi = {
  download,
  listForIntervention,
  profile,
  show
}

function download(userCredentials, intervention_document_id, onSuccess, onFailure) {
  if (!API.validateId("intervention document ID", intervention_document_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/intervention_documents/${intervention_document_id}/download`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure, { isDownload: true })
}

function listForIntervention(userCredentials, intervention_id, params, onSuccess, onFailure) {
  if (!API.validateId("intervention ID", intervention_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/interventions/${intervention_id}/intervention_documents/list`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function profile(userCredentials, id, onSuccess, onFailure) {
  if (!API.validateId("intervention document ID", id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/intervention_documents/${id}/profile`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}

function show(userCredentials, id, onSuccess, onFailure) {
  if (!API.validateId("intervention document ID", id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/intervention_documents/${id}`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}
