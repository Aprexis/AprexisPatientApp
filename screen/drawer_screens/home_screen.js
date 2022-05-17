import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { valueHelper, patientHelper, userHelper } from '../../helpers'

const HomeScreen = (props) => {
  let { currentUser, currentPatient } = props
  if (valueHelper.isValue(props.route) && valueHelper.isValue(props.route.params) && valueHelper.isValue(props.route.params.currentPatient)) {
    currentPatient = props.route.params.currentPatient
  }
  let homeScreenText = 'This is the Home Screen'
  if (valueHelper.isValue(currentUser)) {
    if (valueHelper.isValue(currentPatient)) {
      homeScreenText = `${homeScreenText} for patient ${patientHelper.name(currentPatient)}`
    } else {
      homeScreenText = `${homeScreenText} for user ${userHelper.email(currentUser)}`
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={
            {
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }
          }>
          <Text
            style={
              {
                fontSize: 20,
                textAlign: 'center',
                marginBottom: 16
              }
            }>
            Aprexis Patient Application
            {'\n\n'}
            {homeScreenText}
          </Text>
        </View>
        <Text
          style={
            {
              fontSize: 18,
              textAlign: 'center',
              color: 'grey'
            }
          }>
          Aprexis Patient Application
          {'\n'}
          React Native
        </Text>
        <Text
          style={
            {
              fontSize: 18,
              textAlign: 'center',
              color: 'grey'
            }
          }>
          www.aprexis.com
        </Text>
      </View>
    </SafeAreaView>
  )
}

export { HomeScreen }
