import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { HomeScreen, SettingsScreen } from './drawer_screens'
import { CustomSidebarMenu, NavigationDrawerHeader } from "./components"

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

const HomeScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName='HomeScreen'>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={
          {
            title: "Home",
            headerLeft: () => (<NavigationDrawerHeader navigationProps={navigation} />),
            headerStyle: { backgroundColor: "#307ecc" },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' }
          }
        }
      />
    </Stack.Navigator>
  )
}

const SettingsScreenStack = ({ navigation }) => {
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
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
    </Stack.Navigator>
  )
}

const DrawerNavigationRoutes = (_props) => {
  return (
    <Drawer.Navigator
      drawerContentOptions={
        {
          activeTintColor: '#cee1f2',
          color: '#cee1f2',
          itemStyle: { marginVertical: 5, color: 'white' },
          labelStyle: { color: '#d8d8d8' }
        }
      }
      screenOptions={{ headerShown: false }}
      drawerContent={CustomSidebarMenu}>
      <Drawer.Screen
        name="HomeScreenStack"
        options={{ drawerLabel: 'Home Screen' }}
        component={HomeScreenStack}
      />
      <Drawer.Screen
        name="SettingsScreenStack"
        options={{ drawerLabel: 'Settings Screen' }}
        component={SettingsScreenStack}

      />
    </Drawer.Navigator>
  )
}

export { DrawerNavigationRoutes }
