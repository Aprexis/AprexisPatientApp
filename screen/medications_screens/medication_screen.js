import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { FontAwesome5Icon } from '../components'
import { MedicationInfo } from "./medication_info"
import { MedicationRemindersList } from './medication_reminders_list'
import { currentUserHelper, patientMedicationHelper } from "../../helpers"

const Tab = createMaterialTopTabNavigator()

function MedicationScreen(props) {
  const { patientMedication } = props.route.params
  const { currentUser, currentPatient } = currentUserHelper.getCurrentProps(props)

  return (
    <View style={styles.medicationScreen.view}>

      <View style={styles.medicationScreen.titleView}>
        <FontAwesome5Icon size={40} style={styles.medicationScreen.titleIcon} name="pills" />
        <Text style={styles.medicationScreen.titleText}>{patientMedicationHelper.medicationLabel(patientMedication)}</Text>
      </View>

      <View style={styles.medicationScreen.sectionView}>
        <Tab.Navigator>
          <Tab.Screen
            name="MedicationInfo"
            options={{ title: "Info", headerShown: false }}>
            {(props) => <MedicationInfo {...props} patientMedication={patientMedication} currentUser={currentUser} currentPatient={currentPatient} />}
          </Tab.Screen>
          <Tab.Screen
            name="MedicationRemindersList"
            options={{ title: "Reminders", headerShown: false }}>
            {(props) => <MedicationRemindersList {...props} patientMedication={patientMedication} currentUser={currentUser} currentPatient={currentPatient} />}
          </Tab.Screen>
        </Tab.Navigator>
      </View>
    </View>
  )
}

export { MedicationScreen }

const styles = StyleSheet.create(
  {
    medicationScreen: {
      sectionView: { flex: 2 },
      titleView: { flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center" },
      titleIcon: { color: "grey" },
      titleText: { fontSize: 30, fontWeight: "bold" },
      view: { flex: 1 }
    }
  }
)
