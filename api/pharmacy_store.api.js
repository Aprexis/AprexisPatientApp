import { API } from './api'

export const pharmacyStoreApi = {
  list,
  listForPharmacyChain,
  listForUser,
  search,
  show
}

function list(userCredentials, params, onSuccess, onFailure) {
  const method = "GET"
  const path = "/pharmacy_stores/list"
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function listForPharmacyChain(userCredentials, pharmacy_chain_id, params, onSuccess, onFailure) {
  if (!API.validateId("pharmacy chain ID", pharmacy_chain_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/pharmacies/${pharmacy_chain_id}/pharmacy_stores/list`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function listForUser(userCredentials, user_id, params, onSuccess, onFailure) {
  if (!API.validateId("user ID", user_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/admin/users/${user_id}/pharmacy_stores/list`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function search(userCredentials, params, onSuccess, onFailure) {
  const method = "GET"
  const path = "/pharmacy_stores/search"
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function show(userCredentials, id, onSuccess, onFailure) {
  if (!API.validateId("pharmacy store ID", id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/pharmacy_stores/${id}`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}
