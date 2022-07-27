import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { dateHelper, valueHelper } from '../../helpers'

function DisplayField({ checkMethod, fieldName, fieldType, humanize, method, model, suffix }) {
  if (!checkField(checkMethod, fieldType, method, model)) {
    return null
  }

  let value = method(model)
  if (valueHelper.isSet(humanize)) {
    value = valueHelper.humanize(value)
  }

  if (valueHelper.isStringValue(suffix)) {
    value = `${value} ${suffix}`
  }

  return (
    <View style={inlineStyles.fieldView}>
      <Text style={inlineStyles.fieldName}>{fieldName}</Text>
      <Text style={inlineStyles.fieldValue}>{value}</Text>
    </View>
  )

  function checkField(checkMethod, fieldType, method, model) {
    const myCheckMethod = valueHelper.isFunction(checkMethod) ? checkMethod : method
    const checkValue = myCheckMethod(model)

    if (!valueHelper.isStringValue(fieldType)) {
      return valueHelper.isValue(checkValue)
    }

    switch (fieldType.toLowerCase()) {
      case 'boolean':
        return dateHelper.isSet(checkValue)

      case 'date', 'datetime':
        return dateHelper.isDateValue(checkValue)

      case 'string':
        return valueHelper.isStringValue(checkValue)

      default:
        return valueHelper.isValue(checkValue)
    }
  }
}

export { DisplayField }

const inlineStyles = StyleSheet.create(
  {
    fieldView: { flexDirection: "row", margin: 2 },
    fieldName: { fontWeight: "bold", marginRight: 5 },
    fieldValue: {}
  }
)
