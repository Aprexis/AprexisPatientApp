import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { FontAwesome5Icon } from '../components'
import { MedicationAdherence } from './medication_adherence'
import { MedicationInfo } from "./medication_info"
import { MedicationInteractions } from './medication_interactions'
import { MedicationRemindersList } from './medication_reminders_list'
import { ReminderInfo } from '../reminders_screens'
import { currentUserHelper, patientMedicationHelper } from "../../helpers"

const Stack = createNativeStackNavigator()

function MedicationRemindersScreenStack(props) {
  const { patientMedication } = props
  const { currentUser, currentPatient } = currentUserHelper.getCurrentProps(props)

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MedicationRemindersList"
        options={{ title: "Reminders", headerShown: false }}>
        {(props) => <MedicationRemindersList {...props} patientMedication={patientMedication} currentUser={currentUser} currentPatient={currentPatient} />}
      </Stack.Screen>
      <Stack.Screen
        name="ReminderScreen"
        options={{ title: 'Reminder' }}>
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
    <View style={styles.view}>

      <View style={styles.titleView}>
        <FontAwesome5Icon size={30} style={styles.titleIcon} name="pills" />
        <Text style={styles.titleText}>{patientMedicationHelper.medicationLabel(patientMedication)}</Text>
      </View>

      <View style={styles.sectionView}>
        <Tab.Navigator
          sceneContainerStyle={{ backgroundColor:'#F3F6F9', padding:12, flex:'1' }}
          screenOptions={{
            tabBarIndicatorStyle: { backgroundColor:'#03718D', marginLeft:'-1px' },
            tabBarItemStyle: { width:'auto', margin:5, padding:0 },
            tabBarStyle: { width:'auto', alignItems:'center', justifyContent:'space-between' },
            //tabBarActiveTintColor: 'tomato',
            //tabBarInactiveTintColor: 'gray',
            tabBarLabelStyle: { fontSize: 14, fontWeight: '600' },            
          }}
          >
          <Tab.Screen
            name="MedicationInfo"
            options={{ title: "Info", headerShown: false, }}>
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
      sectionView: { flex: 4 },
      titleView: { flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor:'#03718D', color:'#fff' },
      titleIcon: { color: "#fff" },
      titleText: { fontSize: 20, fontWeight: "bold", color:'#fff' },
      view: { flex: 1 }
  }
)
