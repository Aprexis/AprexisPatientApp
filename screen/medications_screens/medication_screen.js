import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { FontAwesome5Icon } from '../components'
import { MedicationAdherence } from './medication_adherence'
import { MedicationInfo } from "./medication_info"
import { MedicationInteractions } from './medication_interactions'
import { MedicationRemindersList } from './medication_reminders_list'
import { ReminderInfo } from '../reminders'
import { currentUserHelper, patientMedicationHelper } from "../../helpers"

const Stack = createNativeStackNavigator()

function MedicationRemindersScreenStack(props) {
  const { navigation, patientMedication } = props
  const { currentUser, currentPatient } = currentUserHelper.getCurrentProps(props)

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MedicationRemindersList"
        options={{ title: "Reminders", headerShown: false }}>
        {(props) => <MedicationRemindersList {...props} patientMedication={patientMedication} currentUser={currentUser} currentPatient={currentPatient} />}
      </Stack.Screen>
      <Stack.Screen
        name="ReminderInfo"
        options={{ title: 'Reminders', headerShown: false }}>
        {(props) => <ReminderInfo {...props} currentUser={currentUser} currentPatient={currentPatient} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

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
        <Tab.Navigator
          screenOptions={{ tabBarLabelStyle: { fontSize: 9 } }}>
          <Tab.Screen
            name="MedicationInfo"
            options={{ title: "Info", headerShown: false }}>
            {(props) => <MedicationInfo {...props} patientMedication={patientMedication} currentUser={currentUser} currentPatient={currentPatient} />}
          </Tab.Screen>
          <Tab.Screen
            name="MedicationInteractions"
            options={{ title: "Interactions", headerShown: false }}>
            {(props) => <MedicationInteractions {...props} patientMedication={patientMedication} currentUser={currentUser} currentPatient={currentPatient} />}
          </Tab.Screen>
          <Tab.Screen
            name="MedicationAdherence"
            options={{ title: "Adherence", headerShown: false }}>
            {(props) => <MedicationAdherence {...props} patientMedication={patientMedication} currentUser={currentUser} currentPatient={currentPatient} />}
          </Tab.Screen>
          <Tab.Screen
            name="MedicationReminders"
            options={{ title: "Reminders", headerShown: false }}>
            {(props) => <MedicationRemindersScreenStack {...props} patientMedication={patientMedication} currentUser={currentUser} currentPatient={currentPatient} />}
          </Tab.Screen>
        </Tab.Navigator>
      </View>
    </View >
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
