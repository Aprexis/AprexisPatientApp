/**
 * Aprexis patient access application.
 * https://github.com/Aprexis/aprexispatientapp
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler'
import React, { useReducer } from 'react'
import { View } from 'react-native'
import { Provider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StackScreen } from './screen/components'
import { LoginScreen, PatientScreen, SplashScreen } from './screen'

function App() {
  const childScreens = { splash: SplashScreen, login: LoginScreen, patient: PatientScreen }
  const [state, dispatch] = useReducer(updateState, {})

  return (
    <Provider>
      <SafeAreaProvider>
        <View style={{ flex: 1 }}>
          <StackScreen
            childScreens={childScreens}
            currentPatient={state.currentPatient}
            currentUser={state.currentUser}
            selectInitialScreen={selectInitialScreen}
            setCurrent={setCurrent}
          />
        </View>
      </SafeAreaProvider>
    </Provider>
  )

  function selectInitialScreen() {
    return 'splash'
  }

  function setCurrent(currentUser, currentPatient) {
    dispatch({ type: 'SET-CURRENT', currentPatient, currentUser })
  }

  function updateState(oldState, action) {
    switch (action.type) {
      case 'SET-CURRENT':
        return { ...oldState, currentPatient: action.currentPatient, currentUser: action.currentUser }

      default:
        return oldState
    }
  }
}

export default App
