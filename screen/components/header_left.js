import React from 'react'
import { Text, View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import { currentUserHelper, patientHelper } from "../../helpers"

function HeaderLeft(props) {
  const { currentPatient } = currentUserHelper.getCurrentProps(props)

  return (
    <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
      <FontAwesomeIcon size={40} icon={faCircle} />
      <Text style={{ position: 'absolute', fontSize: 20, margin: 7 }}>{patientHelper.initials(currentPatient)}</Text>
    </View >
  )
}

export { HeaderLeft }
