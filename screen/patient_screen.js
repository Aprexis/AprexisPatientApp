import React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, RequestPatientScreen, } from "./patient_screens"
import { HeaderLeft, HeaderRight } from "./components";
import { valueHelper, patientHelper, currentUserHelper } from "../helpers";
import { BottomMenuBar } from "./components/bottom_menu_bar";

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

const Tab = createBottomTabNavigator()

function PatientScreen(props) {
  const { currentUser, currentPatient } = currentUserHelper.getCurrentProps(props)

  return (
    <Tab.Navigator tabBar={(props) => <BottomMenuBar {...props} />}>
      <Tab.Screen name="Home" options={{ headerShown: false }}>
        {(props) => <HomeScreenStack {...props} currentUser={currentUser} currentPatient={currentPatient} />}
      </Tab.Screen>
    </Tab.Navigator>
  )
}

export { PatientScreen }
