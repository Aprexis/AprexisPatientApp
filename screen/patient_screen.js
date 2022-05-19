import React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { HomeScreen, MedicationsScreen, RequestPatientScreen, } from "./patient_screens"
import { HeaderLeft, HeaderRight } from "./components"
import { valueHelper, patientHelper, currentUserHelper } from "../helpers"

const Stack = createNativeStackNavigator()

function headerOptions(navigation, currentUser, currentPatient) {
  return {
    headerLeft: () => (<HeaderLeft currentUser={currentUser} currentPatient={currentPatient} />),
    headerRight: () => (<HeaderRight navigation={navigation} currentUser={currentUser} currentPatient={currentPatient} />),
    headerTitle: `Hi ${patientHelper.firstName(currentPatient)}`,
    headerStyle: { backgroundColor: "#307ecc" },
    headerTintColor: '#fff',
    headerTitleStyle: { fontWeight: 'bold' }
  }
}

function HomeScreenStack(props) {
  const { navigation } = props
  const { currentUser, currentPatient } = currentUserHelper.getCurrentProps(props)
  const initialRouteName = valueHelper.isValue(currentPatient) ? 'HomeScreen' : 'RequestPatientScreen'

  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      <Stack.Screen
        name="RequestPatientScreen"
        options={{ title: 'Request Patient' }}>
        {(props) => <RequestPatientScreen {...props} currentUser={currentUser} />}
      </Stack.Screen>
      <Stack.Screen
        name="HomeScreen"
        options={headerOptions(navigation, currentUser, currentPatient)}>
        {(props) => <HomeScreen {...props} currentUser={currentUser} currentPatient={currentPatient} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

function MedicationsScreenStack(props) {
  const { navigation } = props
  const { currentUser, currentPatient } = currentUserHelper.getCurrentProps(props)

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MedicationsScreen"
        options={headerOptions(navigation, currentUser, currentPatient)}>
        {(props) => <MedicationsScreen {...props} currentUser={currentUser} currentPatient={currentPatient} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

const Tab = createMaterialBottomTabNavigator()

function PatientScreen(props) {
  const { currentUser, currentPatient } = currentUserHelper.getCurrentProps(props)

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        options={
          {
            headerShown: false,
            tabBarLabel: "HOME",
            tabBarIcon: ({ color, size }) => (<Icon name="home" color={color} size={size} />)
          }
        }>
        {(props) => <HomeScreenStack {...props} currentUser={currentUser} currentPatient={currentPatient} />}
      </Tab.Screen>
      <Tab.Screen
        name="Medications"
        options={
          {
            headerShown: false,
            tabBarLabel: "MEDICATIONS",
            tabBarIcon: ({ color, size }) => (<Icon name="pills" color={color} size={size} />)
          }
        }>
        {(props) => <MedicationsScreenStack {...props} currentUser={currentUser} currentPatient={currentPatient} />}
      </Tab.Screen>
    </Tab.Navigator >
  )
}

export { PatientScreen }
