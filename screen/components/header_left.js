import React from 'react'
import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { currentUserHelper, patientHelper } from "../../helpers"

function HeaderLeft(props) {
  const { currentPatient } = currentUserHelper.getCurrentProps(props)

  return (
    <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
      <Icon size={40} name="circle" />
      <Text style={{ position: 'absolute', fontSize: 20, margin: 7 }}>{patientHelper.initials(currentPatient)}</Text>
    </View >
  )
}

export { HeaderLeft }
