import React from 'react'
import { Text, View } from 'react-native'
import { FontAwesome5Icon } from './fontawesome5_icon'
import { currentUserHelper, patientHelper } from "../../helpers"

function HeaderLeft(props) {
  const { currentPatient } = currentUserHelper.getCurrentProps(props)

  return (
    <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center', paddingLeft:10,  }}>
      <FontAwesome5Icon size={43} name="circle" style={{color:'#fff'}} />
      <Text style={{ position: 'absolute', fontSize: 21, fontWeight:700, color:'#fff' }}>{patientHelper.initials(currentPatient)}</Text>
    </View >
  )
}

export { HeaderLeft }
