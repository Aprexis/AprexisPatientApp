import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { addressHelper } from '../../helpers'
import { styles } from '../../assets/styles'

function AddressInput({ addressable, onChangeValue }) {
  return (
    <View>
      <View style={inlineStyles.addressFieldView}>
        <Text style={inlineStyles.addressFieldName}>Address</Text>
        <TextInput
          style={styles.inputField}
          onChangeText={(address) => { onChangeValue('address', address) }}
          value={addressHelper.address(addressable)}
        />
      </View>

      <View style={inlineStyles.addressFieldView}>
        <Text style={inlineStyles.addressFieldName}>City</Text>
        <TextInput
          style={styles.inputField}
          onChangeText={(city) => { onChangeValue('city', city) }}
          value={addressHelper.city(addressable)}
        />
      </View>

      <View style={inlineStyles.addressFieldView}>
        <Text style={inlineStyles.addressFieldName}>State</Text>
        <TextInput
          style={styles.inputField}
          onChangeText={(state) => { onChangeValue('state', state) }}
          value={addressHelper.state(addressable)}
        />
      </View>

      <View style={inlineStyles.addressFieldView}>
        <Text style={inlineStyles.addressFieldName}>ZIP Code</Text>
        <TextInput
          style={styles.inputField}
          onChangeText={(zipCode) => { onChangeValue('zip_code', zipCode) }}
          value={addressHelper.zipCode(addressable)}
        />
      </View>
    </View>
  )
}

export { AddressInput }

const inlineStyles = StyleSheet.create(
  {
    addressFieldView: { flexDirection: "row", margin: 5, alignItems: 'center' },
    addressFieldName: { fontWeight: "bold", marginRight: 5, display: 'flex', justifyContent: 'flex-end' },
    addressFieldValue: {}
  }
)
