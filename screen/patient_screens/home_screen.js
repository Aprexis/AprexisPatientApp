import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { valueHelper, patientHelper, userHelper, currentUserHelper } from '../../helpers'
import { themeColor, styles } from '../../assets/styles'

function HomeScreen(props) {
  const { currentUser, currentPatient } = currentUserHelper.getCurrentProps(props)
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
      <View style={styles.mainBody}>
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
      </View>
    </SafeAreaView>
  )
}

export { HomeScreen }
