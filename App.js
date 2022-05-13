/**
 * Aprexis patient access application.
 * https://github.com/Aprexis/aprexispatientapp
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler'
import React from 'react'
import { Button, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { DrawerNavigationRoutes, LoginScreen, SplashScreen } from './screen'
import { authenticationApi } from './api'
import { userCredentialsHelper } from './helpers'


const Stack = createNativeStackNavigator()

const ProfileScreen = ({ navigation }) => {
  return (
    <View>
      <Text>This is Ian's profile</Text>
      <Button
        title="Logout"
        onPress={
          () => {
            userCredentialsHelper.getUserCredentials(
              (userCredentials) => {
                authenticationApi.signOut(
                  userCredentials,
                  () => {
                    userCredentialsHelper.removeUserCredentials(() => { navigation.replace('LoginScreen') })
                  }
                )
              }
            )
          }
        }
      />
    </View>
  )
}

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}

          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ title: 'Aprexis Login' }}
          />
          <Stack.Screen
            name="DrawerNavigationRoutes"
            component={ProfileScreen}
            options={{ title: 'Aprexis Patient' }}
          />
        </Stack.Navigator>
      </NavigationContainer >
    </View>
  )
}

export default App
