import { API } from './api'

export const hcpApi = {
  list,
  search,
  show
}

function list(userCredentials, params, onSuccess, onFailure) {
  const method = "GET"
  const path = "/admin/physicians/list"
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function search(userCredentials, params, onSuccess, onFailure) {
  const method = "GET"
  const path = "/admin/physicians/search"
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function show(userCredentials, id, onSuccess, onFailure) {
  if (!API.validateId("physician ID", id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/admin/physicians/${id}`
  API.perform(method, path, "", userCredentials, undefined, onSuccess, onFailure)
}
