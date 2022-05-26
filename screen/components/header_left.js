import React from 'react'
import { Text, View } from 'react-native'
import { FontAwesome5Icon } from './font_awesome5_icon'
import { currentUserHelper, patientHelper } from "../../helpers"

function HeaderLeft(props) {
  const { currentPatient } = currentUserHelper.getCurrentProps(props)

  return (
    <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
      <FontAwesome5Icon size={40} name="circle" />
      <Text style={{ position: 'absolute', fontSize: 20, margin: 7 }}>{patientHelper.initials(currentPatient)}</Text>
    </View >
  )
}

export { HeaderLeft }
