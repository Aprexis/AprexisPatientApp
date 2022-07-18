import React from 'react'
import { SafeAreaView, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Allergies, CheckInteractions, PatientMedicationsList } from "../medications_screens"
import { currentUserHelper } from '../../helpers'
import { styles } from '../../assets/styles'

import { TabView, SceneMap } from 'react-native-tab-view';


function MedicationsScreen(props) {
  const { currentUser, currentPatient, userCredentials } = currentUserHelper.getCurrentProps(props)

  const medicationsList = () => (
    <View>
      <Text>{(props) => <PatientMedicationsList {...props} currentUser={currentUser} currentPatient={currentPatient} />}</Text>
    </View>
    )

  const checkInteractions = () => (
    <View>
      <Text>{(props) => <CheckInteractions {...props} currentUser={currentUser} currentPatient={currentPatient} />}</Text>
    </View>
  )

  const Allergies = () => (
    <View>
      <Text>{(props) => <Allergies {...props} allergyType='Medicine' currentUser={currentUser} currentPatient={currentPatient} />}</Text>
    </View>
  )

  const renderScene = SceneMap({
    first: medicationsList,
    second: checkInteractions,
    third: Allergies,
  })

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { first: 'First' },
    { second: 'Second' },
    { third: 'Third' }
  ])

  return (
    <TabView
      lazy
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  )
}

export { MedicationsScreen }

