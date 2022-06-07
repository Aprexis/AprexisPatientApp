import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Allergies, CheckInteractions, PatientMedicationsList } from "../medications_screens"
import { currentUserHelper } from '../../helpers'

const Tab = createMaterialTopTabNavigator()

function MedicationsScreen(props) {
  const { currentUser, currentPatient } = currentUserHelper.getCurrentProps(props)

  return (
    <SafeAreaView style={styles.medicationsScreen.safeArea}>
      <View style={styles.medicationsScreen.titleView}>
        <Text style={styles.medicationsScreen.titleText}>MEDICATIONS</Text>
      </View>
      <Tab.Navigator>
        <Tab.Screen
          name="List"
          options={{ headerShown: false }}>
          {(props) => <PatientMedicationsList {...props} currentUser={currentUser} currentPatient={currentPatient} />}
        </Tab.Screen>
        <Tab.Screen
          name="Check Interactions"
          options={{ headerShown: false }}>
          {(props) => <CheckInteractions {...props} currentUser={currentUser} currentPatient={currentPatient} />}
        </Tab.Screen>
        <Tab.Screen
          name="Allergies"
          options={{ headerShown: false }}>
          {(props) => <Allergies {...props} allergyType='Medicine' currentUser={currentUser} currentPatient={currentPatient} />}
        </Tab.Screen>
      </Tab.Navigator>
    </SafeAreaView>
  )
}

export { MedicationsScreen }

const styles = StyleSheet.create(
  {
    medicationsScreen: {
      safeArea: { flex: 1 },
      titleView: { flexDirection: "row", justifyContent: "center", alignContent: "center" },
      titleText: { fontSize: 30, fontWeight: "bold" }
    }
  }
)
