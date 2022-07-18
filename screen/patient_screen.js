import React, { useEffect, useState } from "react"
import { Text } from "react-native"
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { CareTeamScreen } from './care_team_screens'
import { FontAwesome5Icon } from './components'
import { MedicationScreen } from "./medications_screens"
import { HomeScreen, MedicationsScreen, RequestPatientScreen } from "./patient_screens"
import { HeaderLeft, HeaderRight } from "./components"
import { valueHelper, patientHelper, currentUserHelper, userCredentialsHelper } from "../helpers"

const Stack = createNativeStackNavigator()

function headerOptions(navigation, currentUser, currentPatient, userCredentials) {
  return {
    headerLeft: () => (<HeaderLeft currentUser={currentUser} currentPatient={currentPatient} userCredentials={userCredentials} />),
    headerRight: () => (<HeaderRight navigation={navigation} currentUser={currentUser} currentPatient={currentPatient} userCredentials={userCredentials} />),
    headerTitle: `Hi ${patientHelper.firstName(currentPatient)}!`,
    headerStyle: { backgroundColor: "#03718D" },
    headerTintColor: '#fff',
    headerTitleStyle: { fontWeight: '600', position: 'relative', left: -10 }
  }
}

function CareTeamScreenStack(props) {
  const { navigation } = props
  const { currentUser, currentPatient, userCredentials } = currentUserHelper.getCurrentProps(props)

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CareTeamScreen"
        options={headerOptions(navigation, currentUser, currentPatient)}>
        {(props) => <CareTeamScreen {...props} currentUser={currentUser} currentPatient={currentPatient} userCredentials={userCredentials} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

function HomeScreenStack(props) {
  const { navigation } = props
  const { currentUser, currentPatient, userCredentials } = currentUserHelper.getCurrentProps(props)
  const initialRouteName = valueHelper.isValue(currentPatient) ? 'HomeScreen' : 'RequestPatientScreen'

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={
        {
          headerStyle: { backgroundColor: '#E0EBF1' },
          headerTitleStyle: { color: '#003949' },
          headerShadowVisible: false
        }
      }
    >
      <Stack.Screen
        name="RequestPatientScreen"
        options={{ title: 'Request Patient' }}>
        {(props) => <RequestPatientScreen {...props} currentUser={currentUser} userCredentials={userCredentials} />}
      </Stack.Screen>
      <Stack.Screen
        name="HomeScreen"
        options={headerOptions(navigation, currentUser, currentPatient)}>
        {(props) => <HomeScreen {...props} currentUser={currentUser} currentPatient={currentPatient} userCredentials={userCredentials} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

function MedicationsScreenStack(props) {
  const { navigation } = props
  const { currentUser, currentPatient, userCredentials } = currentUserHelper.getCurrentProps(props)

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
        name="MedicationsScreen"
        options={headerOptions(navigation, currentUser, currentPatient)}>
        {(props) => <MedicationsScreen {...props} currentUser={currentUser} currentPatient={currentPatient} userCredentials={userCredentials} />}
      </Stack.Screen>
      <Stack.Screen
        name="MedicationScreen"
        options={{ title: 'Medications' }}>
        {(props) => <MedicationScreen {...props} currentUser={currentUser} currentPatient={currentPatient} userCredentials={userCredentials} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

const Tab = createMaterialBottomTabNavigator()

function PatientScreen(props) {
  const [userCredentials, setUserCredentials] = useState()
  const { currentUser, currentPatient } = currentUserHelper.getCurrentProps(props)

  useEffect(
    () => {
      userCredentialsHelper.getUserCredentials(
        (retrievedUserCredentials) => {
          const haveUserCredentials = valueHelper.isValue(userCredentials)
          const haveRetrievedUserCredentials = valueHelper.isValue(retrievedUserCredentials)
          if (!haveUserCredentials && !haveRetrievedUserCredentials) {
            return
          }
          if (haveUserCredentials && haveRetrievedUserCredentials &&
            userCredentials.username == retrievedUserCredentials.username &&
            userCredentials.token == retrievedUserCredentials.token) {
            return
          }

          setUserCredentials(retrievedUserCredentials)
        })
    }
  )

  return (
    <Tab.Navigator barStyle={{ backgroundColor: '#03718D' }} screenOptions={{ unmountOnBlur: true }}>
      <Tab.Screen
        name="Home"
        options={
          {
            headerShown: false,
            tabBarLabel: (<Text style={{ fontSize: 15 }}>HOME</Text>),
            tabBarIcon: ({ color }) => (<FontAwesome5Icon name="home" color={color} size={27} style={{ marginTop: -4 }} />)
          }
        }>
        {(props) => <HomeScreenStack {...props} currentUser={currentUser} currentPatient={currentPatient} userCredentials={userCredentials} />}
      </Tab.Screen>
      <Tab.Screen
        name="Medications"
        options={
          {
            headerShown: false,
            tabBarLabel: (<Text style={{ fontSize: 15 }}>MEDICATIONS</Text>),
            tabBarIcon: ({ color }) => (<FontAwesome5Icon name="pills" color={color} size={28} style={{ marginTop: -4 }} />),
          }
        }>
        {(props) => <MedicationsScreenStack {...props} currentUser={currentUser} currentPatient={currentPatient} userCredentials={userCredentials} />}
      </Tab.Screen>
      <Tab.Screen
        name="Care Team"
        options={
          {
            headerSHown: false,
            tabBarLabel: (<Text style={{ fontSize: 15 }}>CARE TEAM</Text>),
            tabBarIcon: ({ color }) => (<FontAwesome5Icon name="hand-holding-medical" color={color} size={28} style={{ marginTop: -4 }} />)
          }
        }>
        {(props) => <CareTeamScreenStack {...props} currentUser={currentUser} currentPatient={currentPatient} userCredentials={userCredentials} />}
      </Tab.Screen>
    </Tab.Navigator >
  )
}

export { PatientScreen }
