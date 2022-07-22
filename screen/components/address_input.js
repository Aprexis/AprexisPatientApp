import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-paper'
import { addressHelper } from '../../helpers'
import { themeColor, styles } from '../../assets/styles'

function AddressInput({ addressable, onChangeValue }) {
  return (
    <View style={{ display:'flex', width:'100%' }}>
      <View style={inlineStyles.profileFieldView}>
        <TextInput
          onChangeText={(address) => { onChangeValue('address', address) }}
          value={addressHelper.address(addressable)}
          label="Address"
          mode="outlined"
          dense='true'
          style={styles.textInput}
          activeOutlineColor={themeColor.lightBlue} 
        />
      </View>

      <View style={inlineStyles.profileFieldView}>
        <TextInput
          onChangeText={(city) => { onChangeValue('city', city) }}
          value={addressHelper.city(addressable)}
          label="City"
          mode="outlined"
          dense='true'
          style={styles.textInput}
          activeOutlineColor={themeColor.lightBlue} 
        />
      </View>

      <View style={styles.row}>
        <View style={[styles.column, { width:'70%'}]}> 
          <TextInput
            onChangeText={(state) => { onChangeValue('state', state) }}
            value={addressHelper.state(addressable)}
            label="State"
            mode="outlined"
            dense='true'
            style={styles.textInput}
            activeOutlineColor={themeColor.lightBlue} 
          />
        </View>
        <View style={[styles.column, { width:'30%', marginLeft:5 }]}>  
          <TextInput
            onChangeText={(zipCode) => { onChangeValue('zip_code', zipCode) }}
            value={addressHelper.zipCode(addressable)}
            label="Zip Code"
            mode="outlined"
            dense='true'
            style={styles.textInput}
            activeOutlineColor={themeColor.lightBlue} 
          />
        </View>
      </View>
    </View>
  )
}

export { AddressInput }

const inlineStyles = StyleSheet.create(
  {
    profileFieldView: { flexDirection: 'row', alignItems: 'center', alignSelf:'center', marginTop:10 },
    addressFieldView: { flexDirection: "row", margin: 5, alignItems: 'center' },
    addressFieldName: { fontWeight: "bold", marginRight: 5, display: 'flex', justifyContent: 'flex-end' },
    addressFieldValue: {}
  }
)
