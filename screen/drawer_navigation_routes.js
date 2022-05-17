import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { HomeScreen, RequestPatientScreen, SettingsScreen } from './drawer_screens'
import { CustomSidebarMenu, NavigationDrawerHeader } from "./components"
import { valueHelper } from "../helpers"

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

const HomeScreenStack = (props) => {
  const { navigation, currentUser, currentPatient } = props
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
        options={
          {
            title: "Home",
            headerLeft: () => (<NavigationDrawerHeader navigationProps={navigation} />),
            headerStyle: { backgroundColor: "#307ecc" },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' }
          }
        }>
        {(props) => <HomeScreen {...props} currentUser={currentUser} currentPatient={currentPatient} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

const SettingsScreenStack = ({ navigation, currentUser, currentPatient }) => {
  return (
    <Stack.Navigator
      initialRouteName='SettingsScreen'
      screenOptions={
        {
          headerLeft: () => (<NavigationDrawerHeader navigationProps={navigation} />),
          headerStyle: { backgroundColor: "#307ecc" },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' }
        }
      }>
      <Stack.Screen
        name="SettingsScreen"
        options={{ title: 'Settings' }}>
        {(props) => <SettingsScreen {...props} currentUser={currentUser} currentPatient={currentPatient} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

const DrawerNavigationRoutes = (props) => {
  const { currentUser, currentPatient } = props.route.params
  return (
    <Drawer.Navigator
      screenOptions={
        {
          activeTintColor: '#cee1f2',
          color: '#cee1f2',
          itemStyle: { marginVertical: 5, color: 'white' },
          labelStyle: { color: '#d8d8d8' },
          headerShown: false
        }
      }
      drawerContent={drawerProps => <CustomSidebarMenu {...drawerProps} parentNavigation={props.navigation} />}>
      <Drawer.Screen
        name="HomeScreenStack"
        options={{ drawerLabel: 'Home Screen' }}>
        {(props) => <HomeScreenStack {...props} currentUser={currentUser} currentPatient={currentPatient} />}
      </Drawer.Screen>
      <Drawer.Screen
        name="SettingsScreenStack"
        options={{ drawerLabel: 'Settings Screen' }}>
        {(props) => <SettingsScreenStack {...props} currentUser={currentUser} currentPatient={currentPatient} />}
      </Drawer.Screen>
    </Drawer.Navigator >
  )
}

export { DrawerNavigationRoutes }
