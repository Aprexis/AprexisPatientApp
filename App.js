/**
 * Aprexis patient access application.
 * https://github.com/Aprexis/aprexispatientapp
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler'
import React, { useState } from 'react'
import { View } from 'react-native'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginScreen, PatientScreen, SplashScreen } from './screen'

const Stack = createNativeStackNavigator()

function App() {
  const [firstTime, setFirstTime] = useState(true)
  const initialRouteName = firstTime ? 'SplashScreen' : 'LoginScreen'
  if (firstTime) {
    setFirstTime(false)
  }

  return (
    <Provider>
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator initialROuteName={initialRouteName}>
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PatientScreen"
              component={PatientScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer >
      </View>
    </Provider>
  )
}

export default App
