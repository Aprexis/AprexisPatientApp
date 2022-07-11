import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { currentUserHelper } from '../../helpers'
import { PatientAllergiesList, PatientAllergyScreen } from '../allergies_screens'

const Stack = createNativeStackNavigator()

function Allergies(props) {
  const { allergyType } = props
  const { currentUser, currentPatient } = currentUserHelper.getCurrentProps(props)

  return (
    <Stack.Navigator
      screenOptions={
        {
          headerStyle: { backgroundColor: '#E0EBF1', height: 35 },
          headerTitleStyle: { color: '#003949' },
          headerShadowVisible: false
        }
      }
    >
      <Stack.Screen
        name="PatientAllergiesList"
        options={{ title: "Allergies", headerShown: false }}>
        {(props) => <PatientAllergiesList {...props} allergyType={allergyType} currentUser={currentUser} currentPatient={currentPatient} />}
      </Stack.Screen>
      <Stack.Screen
        name="PatientAllergyScreen"
        options={{ title: 'Allergy' }}>
        {(props) => <PatientAllergyScreen {...props} currentUser={currentUser} currentPatient={currentPatient} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

export { Allergies }
