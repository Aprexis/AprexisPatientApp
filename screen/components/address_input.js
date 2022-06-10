import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { addressHelper } from '../../helpers'

function AddressInput({ addressable, onChangeValue }) {
  return (
    <View>
      <View style={styles.addressInput.addressFieldView}>
        <Text style={styles.addressInput.addressFieldName}>Address</Text>
        <TextInput
          style={styles.addressInput.addressFieldValue}
          onChangeText={(address) => { onChangeValue('address', address) }}
          value={addressHelper.address(addressable)}
        />
      </View>

      <View style={styles.addressInput.addressFieldView}>
        <Text style={styles.addressInput.addressFieldName}>City</Text>
        <TextInput
          style={styles.addressInput.addressFieldValue}
          onChangeText={(city) => { onChangeValue('city', city) }}
          value={addressHelper.city(addressable)}
        />
      </View>

      <View style={styles.addressInput.addressFieldView}>
        <Text style={styles.addressInput.addressFieldName}>State</Text>
        <TextInput
          style={styles.addressInput.addressFieldValue}
          onChangeText={(state) => { onChangeValue('state', state) }}
          value={addressHelper.state(addressable)}
        />
      </View>

      <View style={styles.addressInput.addressFieldView}>
        <Text style={styles.addressInput.addressFieldName}>ZIP Code</Text>
        <TextInput
          style={styles.addressInput.addressFieldValue}
          onChangeText={(zipCode) => { onChangeValue('zip_code', zipCode) }}
          value={addressHelper.zipCode(addressable)}
        />
      </View>
    </View>
  )
}

export { AddressInput }

const styles = StyleSheet.create(
  {
    addressInput: {
      addressFieldView: { flexDirection: "row", margin: 5, alignItems: 'center' },
      addressFieldName: { fontWeight: "bold", marginRight: 5 },
      addressFieldValue: {}
    }
  }
)
