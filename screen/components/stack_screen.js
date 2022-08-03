import React, { useReducer } from 'react'
import { valueHelper } from '@aprexis/aprexis-api-utility'

/*
  This is an alternative to the react-navigation stack navigator. It will work properly even if there are several different stacks on the same screen.
  This is necessary when using react-native-tab-view in place of the navigator tabs.
*/
function StackScreen(props) {
  const { childScreens, currentPatient, currentUser, userCredentials, selectInitialScreen } = props
  const [state, dispatch] = useReducer(updateState, { initialScreen: selectInitialScreen({ currentPatient, currentUser, userCredentials }) })
  const workingScreen = valueHelper.isStringValue(state.currentScreen) ? state.currentScreen : state.initialScreen

  if (!valueHelper.isValue(workingScreen)) {
    return null
  }

  const Screen = childScreens[workingScreen]
  if (!valueHelper.isValue(Screen)) {
    return null
  }

  return (<Screen {...props} setStackScreen={setStackScreen} />)

  function setStackScreen(newScreen) {
    dispatch({ type: 'SET-STACK-SCREEN', newScreen })
  }

  function updateState(oldState, action) {
    switch (action.type) {
      case 'SET-STACK-SCREEN':
        return { ...oldState, currentScreen: action.newScreen }

      default:
        return oldState
    }
  }
}

const MemoizedStackScreen = React.memo(StackScreen)
export { MemoizedStackScreen as StackScreen }
