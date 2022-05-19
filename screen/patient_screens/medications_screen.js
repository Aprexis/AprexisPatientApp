import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Allergies, CheckInteractions, PatientMedicationsList } from "../components/medications"
import { currentUserHelper } from '../../helpers'

const Tab = createMaterialTopTabNavigator()

function MedicationsScreen(props) {
  const { currentUser, currentPatient } = currentUserHelper.getCurrentProps(props)

  return (
    <SafeAreaView style={styles.medicationsScreen.safeArea}>
      <View style={styles.medicationsScreen.title.view}>
        <Text style={styles.medicationsScreen.title.text}>MEDICATIONS</Text>
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
          {(props) => <Allergies {...props} currentUser={currentUser} currentPatient={currentPatient} />}
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
      title: {
        view: { flexDirection: "row", justifyContent: "center", alignContent: "center" },
        text: { fontSize: 30, fontWeight: "bold" }
      }
    }
  }
)
