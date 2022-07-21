import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Menu, TextInput } from 'react-native-paper'
import { contactHelper, valueHelper } from '../../helpers'
import { NumberInput } from './number_input'
import { contactMethods } from '../../types'
import { styles } from '../../assets/styles'

function PhoneExtension({ allowPhoneExtension, contactable, onChangeValue }) {
  if (!valueHelper.isSet(allowPhoneExtension)) {
    return null
  }

  return (
    <View>
      <Text style={inlineStyles.contactFieldName}>Ext.</Text>
      <TextInput
        style={styles.inputField}
        onChangeText={(phoneExtension) => { onChangeValue('phone_extension', phoneExtension) }}
        value={contactHelper.phoneExtension(contactable)}
      />
    </View>
  )
}

function PreferredContactMethod({ allowPreferredMethod, contactable, onChangeValue }) {
  if (!valueHelper.isSet(allowPreferredMethod)) {
    return null
  }

  const [menuVisible, setMenuVisible] = useState(false)

  return (
    <React.Fragment>
      <Text style={inlineStyles.contactFieldName}>Preferred Contact</Text>
      <Menu
        anchor={<Button onPress={openMenu}>{contactHelper.preferredContactMethod(contactable)}</Button>}
        onDismiss={closeMenu}
        style={[styles.inputField, { fontSize: 15 }]}
        visible={valueHelper.isSet(menuVisible)}>
        {
          contactMethods.map(
            (contactMethod) => {
              const { label, value } = contactMethod
              return (<Menu.Item key={`contact-method-${value}`} title={label} onPress={() => { closeActionMenu(); onChangeValue('preferred_contact_method', contactMethod) }} />)
            }
          )
        }
      </Menu>
    </React.Fragment>
  )

  function closeMenu() {
    setMenuVisible(false)
  }

  function openMenu() {
    setMenuVisible(true)
  }
}

function ContactInput({ allowPhoneExtension, allowPreferredMethod, contactable, onChangeValue }) {
  return (
    <React.Fragment>
      <View style={inlineStyles.contactFieldView}>
        <PreferredContactMethod allowPreferredMethod={allowPreferredMethod} contactable={contactable} onChangeValue={onChangeValue} />
      </View>

      <View style={inlineStyles.contactFieldView}>
        <Text style={inlineStyles.contactFieldName}>Phone</Text>
        <NumberInput
          style={styles.inputField}
          onChangeText={(phone) => { onChangeValue('phone', phone) }}
          value={contactHelper.phone(contactable)}
        />
        <PhoneExtension allowPhoneExtension={allowPhoneExtension} contactable={contactable} onChangeValue={onChangeValue} />
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
    </React.Fragment>
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
