import React from "react"
import { Text } from "react-native"
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { FontAwesome5Icon } from './components'
import { MedicationScreen } from "./medications_screens"
import { HomeScreen, MedicationsScreen, RequestPatientScreen, } from "./patient_screens"
import { HeaderLeft, HeaderRight } from "./components"
import { valueHelper, patientHelper, currentUserHelper } from "../helpers"

const Stack = createNativeStackNavigator()

function headerOptions(navigation, currentUser, currentPatient) {
  return {
    headerLeft: () => (<HeaderLeft currentUser={currentUser} currentPatient={currentPatient} />),
    headerRight: () => (<HeaderRight navigation={navigation} currentUser={currentUser} currentPatient={currentPatient} />),
    headerTitle: `Hi ${patientHelper.firstName(currentPatient)}!`,
    headerStyle: { backgroundColor: "#03718D" },
    headerTintColor: '#fff',
    headerTitleStyle: { fontWeight:'600', position:'relative', left:'-10px'  }
  }
}

function HomeScreenStack(props) {
  const { navigation } = props
  const { currentUser, currentPatient } = currentUserHelper.getCurrentProps(props)
  const initialRouteName = valueHelper.isValue(currentPatient) ? 'HomeScreen' : 'RequestPatientScreen'

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName} 
      screenOptions={
        { 
          headerStyle: { backgroundColor: '#E0EBF1' }, 
          headerTitleStyle:{color:'#003949'},
          headerShadowVisible: false
        }
      }
    >
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
      <Stack.Screen
        name="MedicationScreen"
        options={{ title: 'Medications' }}>
        {(props) => <MedicationScreen {...props} currentUser={currentUser} currentPatient={currentPatient} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

const Tab = createMaterialBottomTabNavigator()

function PatientScreen(props) {
  const { currentUser, currentPatient } = currentUserHelper.getCurrentProps(props)

  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: '#03718D' }}
    >
      <Tab.Screen
        name="Home"
        options={
          {
            headerShown: false,
            tabBarLabel: (<Text style={{ fontSize: 15 }}>HOME</Text>),
            tabBarIcon: ({ color }) => (<FontAwesome5Icon name="home" color={color} size={27} style={{ marginTop:'-4px' }}/>)
          }
        }>
        {(props) => <HomeScreenStack {...props} currentUser={currentUser} currentPatient={currentPatient} />}
      </Tab.Screen>
      <Tab.Screen
        name="Medications"
        options={
          {
            headerShown: false,
            tabBarLabel: (<Text style={{ fontSize: 15 }}>MEDICATIONS</Text>),
            tabBarIcon: ({ color }) => (<FontAwesome5Icon name="pills" color={color} size={28} style={{ marginTop:'-4px' }}/>)
          }
        }>
        {(props) => <MedicationsScreenStack {...props} currentUser={currentUser} currentPatient={currentPatient} />}
      </Tab.Screen>
    </Tab.Navigator>
  )
}

export { PatientScreen }
