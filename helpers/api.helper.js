import { valueHelper } from "./value.helper"

export const apiHelper = {
  toJSON
}

function findKey(modelKeys, matchKey) {
  return modelKeys.find(
    (modelKey) => {
      if (valueHelper.isStringValue(modelKey)) {
        return modelKey == matchKey
      }

      const { key } = modelKey
      return key == matchKey
    }
  )
}

function filterKey(modelKeys, matchKey) {
  return valueHelper.isValue(findKey(modelKeys, matchKey))
}

function mapJSON(model, modelKeys, matchKey) {
  const modelKey = findKey(modelKeys, matchKey)
  if (valueHelper.isStringValue(modelKey)) {
    return {
      jsonKey: modelKey, json: model[modelKey]
    }
  }

  const { key, jsonKey, childKeys } = modelKey
  return { jsonKey, json: apiHelper.toJSON(model[key], childKeys) }
}

function toJSON(model, modelKeys) {
  if (Array.isArray(model)) {
    return mapArray(model, modelKeys)
  }

  return mapHash(model, modelKeys)

  function mapArray(model, modelKeys) {
    return model.map((entry) => toJSON(entry, modelKeys))
  }

  function mapHash(model, modelKeys) {
    return Object.keys(model)
      .filter((matchKey) => filterKey(modelKeys, matchKey))
      .reduce(
        (newJson, matchKey) => {
          const { jsonKey, json } = mapJSON(model, modelKeys, matchKey)

          newJson[jsonKey] = json
          return newJson
        },
        {}
      )
  }
}
