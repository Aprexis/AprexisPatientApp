import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { MedicationInfo } from "./medication_info"
import { currentUserHelper, patientMedicationHelper } from "../../helpers"

const Tab = createMaterialTopTabNavigator()

function MedicationScreen(props) {
  const { patientMedication } = props.route.params
  const { currentUser, currentPatient } = currentUserHelper.getCurrentProps(props)

  return (
    <View style={styles.medicationScreen.view}>
      <View style={styles.medicationScreen.section.view}>
        <View style={styles.medicationScreen.title.view}>
          <Icon size={40} style={styles.medicationScreen.title.icon} name="pills" />
          <Text style={styles.medicationScreen.title.text}>{patientMedicationHelper.medicationLabel(patientMedication)}</Text>
        </View>
      </View>

      <View style={styles.medicationScreen.section.view}>
        <MedicationInfo {...props} patientMedication={patientMedication} currentUser={currentUser} currentPatient={currentPatient} />
        {/*
        <Tab.Navigator>
          <Tab.Screen
            name="Info"
            options={{ headerShown: false }}>
            {(props) => <MedicationInfo {...props} patientMedication={patientMedication} currentUser={currentUser} currentPatient={currentPatient} />}
          </Tab.Screen>
        </Tab.Navigator>
        */}
      </View>
    </View>
  )
}

export { MedicationScreen }

const styles = StyleSheet.create(
  {
    medicationScreen: {
      section: { view: { flexDirection: "row" } },
      title: {
        view: { flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center" },
        icon: { color: "grey" },
        text: { fontSize: 30, fontWeight: "bold" }
      },
      view: { flex: 1 }
    }
  }
)
