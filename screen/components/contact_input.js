import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-paper'
import { contactHelper } from '../../helpers'
import { NumberInput } from './number_input'
import { themeColor, styles } from '../../assets/styles'

function ContactInput({ contactable, onChangeValue }) {
  return (
    <View>
      <View style={styles.row}>
        <View style={[styles.column, { width:'70%' }]}>
          <NumberInput
            onChangeText={(phone) => { onChangeValue('phone', phone) }}
            value={contactHelper.phone(contactable)}
            label="Phone"
            mode="outlined"
            dense='true'
            style={styles.textInput}
            activeOutlineColor={themeColor.lightBlue} 
          />
        </View>
        <View style={[styles.column, { width:'30%', marginLeft:5 }]}>  
          <TextInput
            onChangeText={(phoneExtension) => { onChangeValue('phone_extension', phoneExtension) }}
            value={contactHelper.phoneExtension(contactable)}
            label="Ext."
            mode="outlined"
            dense='true'
            style={styles.textInput}
            activeOutlineColor={themeColor.lightBlue} 
          />
        </View>
      </View>

      <View style={inlineStyles.profileFieldView}>
        <TextInput
          style={styles.inputField}
          onChangeText={(mobilePhone) => { onChangeValue('mobile_phone', mobilePhone) }}
          value={contactHelper.mobilePhone(contactable)}
          label="Mobile"
          mode="outlined"
          dense='true'
          style={styles.textInput}
          activeOutlineColor={themeColor.lightBlue}
        />
      </View>

      <View style={inlineStyles.profileFieldView}>
        <TextInput
          style={styles.inputField}
          onChangeText={(email) => { onChangeValue('email', email) }}
          value={contactHelper.email(contactable)}
          label="Email"
          mode="outlined"
          dense='true'
          style={styles.textInput}
          activeOutlineColor={themeColor.lightBlue}
        />
      </View>
    </View>
  )
}

export { ContactInput }

const inlineStyles = StyleSheet.create(
  {
    profileFieldView: { flexDirection: 'row', alignItems: 'center', alignSelf:'center', marginTop:10 },
    contactFieldView: { flexDirection: "row", margin: 5, alignItems: 'center' },
    contactFieldName: { fontWeight: "bold", marginRight: 5, display: 'flex', justifyContent: 'flex-end' },
    contactFieldValue: {}
  }
)
