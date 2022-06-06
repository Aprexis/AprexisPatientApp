import { valueHelper } from "./value.helper.js"

export const fieldHelper = {
  addEntryToList,
  addEntry,
  changeField,
  changeValue,
  fieldName,
  getField,
  removeEntry
}

function addEntryToList(model, field, newEntry) {
  const entries = model[field]
  if (!valueHelper.isValue(entries)) {
    return [newEntry]
  }

  return [...entries, newEntry]
}

function addEntry(modelName, model, changedModel, field, matchField, newEntry) {
  const entries = model[field]
  const changedEntries = changedModel[field]
  if (valueHelper.isValue(entries)) {
    const existingEntry = entries.find((entry) => entry[matchField] == newEntry[matchField])
    if (valueHelper.isValue(existingEntry)) {
      return unchanged(modelName, model, changedModel, `${field} already has an entry`)
    }
  }

  if (valueHelper.isValue(changedEntries)) {
    const existingChangedEntry = changedEntries.find((changedEntry) => changedEntry[matchField] == newEntry[matchField])
    if (valueHelper.isValue(existingChangedEntry)) {
      return restoreOldEntry(modelName, model, changedModel, field, existingChangedEntry)
    }
  }

  return addNewEntry(modelName, model, changedModel, field, newEntry)

  function addNewEntry(modelName, model, changedModel, field, newEntry) {
    return {
      [modelName]: { ...model, [field]: addEntryToList(model, field, newEntry) },
      [valueHelper.changedModelName(modelName)]: { ...changedModel, [field]: addEntryToList(changedModel, field, newEntry) }
    }
  }

  function restoreOldEntry(modelName, model, changedModel, field, oldEntry) {
    const restoredEntry = [...oldEntry]
    delete restoredEntry['_destroy']
    const newChangedEntries = changedModel[field].filter((changedEntry) => changedEntry != oldEntry)

    return {
      [modelName]: { ...model, [field]: addEntryToList(model, field, restoredEntry) },
      [valueHelper.changedModelName(modelName)]: { ...changedModel, newChangedEntries }
    }
  }
}

function changeField(modelName, model, changedModel, name, value, buildChanged) {
  return fieldHelper.changeValue(
    modelName,
    model,
    buildChanged(model, changedModel),
    name,
    value
  )
}

function changeValue(modelName, model, changedModel, name, value) {
  return {
    [modelName]: {
      ...model,
      [name]: value
    },
    [valueHelper.changedModelName(modelName)]: {
      ...changedModel,
      [name]: value
    }
  }
}

function fieldName(fieldName, prefix) {
  if (!valueHelper.isStringValue(prefix)) {
    return fieldName
  }

  return `${prefix}_${fieldName} `
}

function getField(object, fieldName, prefix) {
  if (!valueHelper.isValue(object)) {
    return
  }

  return object[fieldHelper.fieldName(fieldName, prefix)]
}

function removeEntry(modelName, model, changedModel, field, matchField, oldEntry) {
  if (valueHelper.isNumberValue(oldEntry.id)) {
    return destroyExistingEntry(modelName, model, changedModel, field, matchField, oldEntry)
  }

  return removeAddedEntry(modelName, model, changedModel, field, matchField, oldEntry)

  function destroyExistingEntry(modelName, model, changedModel, field, matchField, oldEntry) {
    const entries = model[field]
    if (!valueHelper.isValue(entries)) {
      return fieldHelper.unchanged(modelName, model, changedModel, `${field} does not have entries to remove`)
    }

    const newEntries = entries.filter((entry) => entry[matchField] != oldEntry[matchField])
    const destroyEntry = { ...oldEntry, "_destroy": true }
    const newChangedEntries = addEntryToList(changedModel, field, destroyEntry)
    return {
      [modelName]: { ...model, [field]: newEntries },
      [valueHelper.changedModelName(modelName)]: { ...changedModel, [field]: newChangedEntries }
    }
  }

  function removeAddedEntry(modelName, model, changedModel, field, matchField, addedEntry) {
    const entries = model[field]
    if (!valueHelper.isValue(entries)) {
      return fieldHelper.unchanged(modelName, model, changedModel, `${field} does not have entries to remove`)
    }

    const changedEntries = changedModel[field]
    if (!valueHelper.isValue(changedEntries)) {
      return fieldHelper.unchanged(modelName, model, changedModel, `${field} does not contain an added entry to remove`)
    }

    const newEntries = entries.filter((entry) => entry[matchField] != oldEntry[matchField])
    const newChangedEntries = changedEntries.filter((changedEntry) => changedEntry[matchField] == oldEntry[matchField])
    return {
      [modelName]: { ...model, [field]: newEntries },
      [valueHelper.changedModelName(modelName)]: { ...changedModel, [field]: newChangedEntries }
    }
  }
}
