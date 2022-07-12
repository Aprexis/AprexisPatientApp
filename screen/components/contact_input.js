import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { contactHelper } from '../../helpers'
import { NumberInput } from './number_input'
import { styles } from '../../assets/styles'

function ContactInput({ contactable, onChangeValue }) {
  return (
    <View>
      <View style={inlineStyles.contactFieldView}>
        <Text style={inlineStyles.contactFieldName}>Phone</Text>
        <NumberInput
          style={styles.inputField}
          onChangeText={(phone) => { onChangeValue('phone', phone) }}
          value={contactHelper.phone(contactable)}
        />
        <Text style={inlineStyles.contactFieldName}>Ext.</Text>
        <TextInput
          style={styles.inputField}
          onChangeText={(phoneExtension) => { onChangeValue('phone_extension', phoneExtension) }}
          value={contactHelper.phoneExtension(contactable)}
        />
      </View>

      <View style={inlineStyles.contactFieldView}>
        <Text style={inlineStyles.contactFieldName}>Mobile</Text>
        <TextInput
          style={styles.inputField}
          onChangeText={(mobilePhone) => { onChangeValue('mobile_phone', mobilePhone) }}
          value={contactHelper.mobilePhone(contactable)}
        />
      </View>

      <View style={inlineStyles.contactFieldView}>
        <Text style={inlineStyles.contactFieldName}>Email</Text>
        <TextInput
          style={styles.inputField}
          onChangeText={(email) => { onChangeValue('email', email) }}
          value={contactHelper.email(contactable)}
        />
      </View>
    </View>
  )
}

export { ContactInput }

const inlineStyles = StyleSheet.create(
  {
    contactFieldView: { flexDirection: "row", margin: 5, alignItems: 'center' },
    contactFieldName: { fontWeight: "bold", marginRight: 5, display: 'flex', justifyContent: 'flex-end' },
    contactFieldValue: {}
  }
)
