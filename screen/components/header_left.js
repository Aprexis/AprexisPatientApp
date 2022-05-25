import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { FontAwesome5Icon } from './fontawesome5_icon'
import { currentUserHelper, patientHelper } from "../../helpers"

function HeaderLeft(props) {
  const { currentPatient } = currentUserHelper.getCurrentProps(props)

  return (
    <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center', paddingLeft:10 }}>
    <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.2)',
          alignItems: 'center',
          justifyContent: 'center',
          width: 40,
          height: 40,
          backgroundColor: '#fff',
          borderRadius: 50,
        }}>
        <Text style={{ fontSize:'18px', fontWeight: 600, marginLeft:'-5px', color:'#003949' }}> {patientHelper.initials(currentPatient)}</Text>
      </TouchableOpacity>
    </View >
  )
}

export { HeaderLeft }



      