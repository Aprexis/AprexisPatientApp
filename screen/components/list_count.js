import React from 'react'
import { Text, View } from 'react-native'
import { valueHelper } from '@aprexis/aprexis-api-utility'

function ListCount({ label, lastPage, listLength, pluralLabel }) {
  return (
    <View style={{ flex: 0, flexGrow: 1, justifyContent: 'flex-end' }}>
      <Text style={{ fontSize: 8 }}>{buildCountLabel(label, pluralLabel, lastPage, listLength)} Last Updated: {new Date().toLocaleString("en-US")}</Text>
    </View>
  )

  function buildCountLabel(label, pluralLabel, lastPage, listLength) {
    let objectCount = 0

    if (valueHelper.isValue(lastPage)) {
      objectCount = lastPage.total
    } else if (valueHelper.isNumberValue(listLength)) {
      objectCount = listLength
    }

    if (objectCount === 1) {
      return `1 ${label}`
    }

    if (valueHelper.isValue(pluralLabel)) {
      return `${objectCount} ${pluralLabel}`
    }

    return `${objectCount} ${label}s`
  }
}

export { ListCount }
