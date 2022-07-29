import { API } from '../api'

export const medicationApi = {
  index,
  list,
  profile,
  search,
  show
}

function index(userCredentials, params, onSuccess, onFailure) {
  const method = 'GET'
  const path = '/admin/medications'
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function list(userCredentials, params, onSuccess, onFailure) {
  const method = 'GET'
  const path = '/admin/medications/list'
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function profile(userCredentials, id, onSuccess, onFailure) {
  if (!API.validateId('medication ID', id, onFailure)) {
    return
  }

  const method = 'GET'
  const path = `/admin/medications/${id}/profile`
  API.perform(method, path, '', userCredentials, undefined, onSuccess, onFailure)
}

function search(userCredentials, params, onSuccess, onFailure) {
  const method = 'GET'
  const path = '/admin/medications/search'
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function show(userCredentials, id, onSuccess, onFailure) {
  if (!API.validateId('medication ID', id, onFailure)) {
    return
  }

  const method = 'GET'
  const path = `/admin/medications/${id}`
  API.perform(method, path, '', userCredentials, undefined, onSuccess, onFailure)
}
