import { API } from "./api"
import { reminderHelper } from "../helpers/reminder.helper"

export const reminderApi = {
  buildNew,
  create,
  destroy,
  edit,
  listForPatient,
  profile,
  show,
  update
}

function toJSON(reminder) {
  return {
    reminder: reminderHelper.toJSON(reminder)
  }
}

function buildNew(userCredentials, patient_id, onSuccess, onFailure) {
  if (!API.validateId("patient ID", patient_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/patients/${patient_id}/reminders/new`
  API.perform(
    method,
    path,
    "",
    userCredentials,
    undefined,
    onSuccess,
    onFailure
  )
}

function create(userCredentials, reminder, onSuccess, onFailure) {
  if (!API.validateId("patient ID", reminder.patient_id, onFailure)) {
    return
  }

  const method = "POST"
  const path = `/patients/${reminder.patient_id}/reminders`
  API.perform(method, path, "", userCredentials, toJSON(reminder), onSuccess, onFailure)
}

function destroy(userCredentials, reminder_id, onSuccess, onFailure) {
  if (!API.validateId("reminder ID", reminder_id, onFailure)) {
    return
  }

  const method = "DELETE"
  const path = `/reminders/${reminder_id}`
  API.perform(method, path, '', userCredentials, undefined, onSuccess, onFailure)
}

function edit(userCredentials, reminder_id, onSuccess, onFailure) {
  if (!API.validateId("reminder ID", reminder_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/reminders/${reminder_id}/edit`
  API.perform(method, path, '', userCredentials, undefined, onSuccess, onFailure)
}

function listForPatient(userCredentials, patient_id, params, onSuccess, onFailure) {
  if (!API.validateId("patient ID", patient_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/patients/${patient_id}/reminders/list`
  API.perform(method, path, API.buildQueryString(params), userCredentials, undefined, onSuccess, onFailure)
}

function profile(userCredentials, reminder_id, onSuccess, onFailure) {
  if (!API.validateId("reminder ID", reminder_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/reminders/${reminder_id}/profile`
  API.perform(method, path, '', userCredentials, undefined, onSuccess, onFailure)
}

function show(userCredentials, reminder_id, onSuccess, onFailure) {
  if (!API.validateId("reminder ID", reminder_id, onFailure)) {
    return
  }

  const method = "GET"
  const path = `/reminders/${reminder_id}`
  API.perform(method, path, '', userCredentials, undefined, onSuccess, onFailure)
}

function update(userCredentials, reminder, onSuccess, onFailure) {
  const method = "PUT"
  const path = `/reminders/${reminder.id}`
  API.perform(method, path, "", userCredentials, toJSON(reminder), onSuccess, onFailure)
}
