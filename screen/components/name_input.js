import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-paper'
import { valueHelper, nameHelper } from '@aprexis/aprexis-api-utility'
import { styles } from '../../assets/styles'

function NameInput({ allowMiddleName, named, onChangeValue }) {
  return (
    <View>
      <View style={inlineStyles.nameFieldView}>
        <Text style={inlineStyles.nameFieldName}>First Name</Text>
        <TextInput
          style={styles.inputField}
          onChangeText={(firstName) => { onChangeValue('first_name', firstName) }}
          value={nameHelper.firstName(named)}
        />
      </View>

      {
        valueHelper.isSet(allowMiddleName) &&
        <View style={inlineStyles.nameFieldView}>
          <Text style={inlineStyles.nameFieldName}>Middle Name</Text>
          <TextInput
            style={styles.inputField}
            onChangeText={(middleName) => { onChangeValue('middle_name', middleName) }}
            value={nameHelper.middleName(named)}
          />
        </View>
      }

      <View style={inlineStyles.nameFieldView}>
        <Text style={inlineStyles.nameFieldName}>Last Name</Text>
        <TextInput
          style={styles.inputField}
          onChangeText={(lastName) => { onChangeValue('last_name', lastName) }}
          value={nameHelper.lastName(named)}
        />
      </View>
    </View>
  )
}

export { NameInput }


const inlineStyles = StyleSheet.create(
  {
    nameFieldView: { flexDirection: "row", margin: 5, alignItems: 'center' },
    nameFieldName: { fontWeight: "bold", marginRight: 5, display: 'flex', justifyContent: 'flex-end' },
    nameFieldValue: {}
  }
)
