import React, { useReducer } from 'react'
import { Dimensions } from 'react-native'
import { TabBar, TabView } from 'react-native-tab-view'
import { LazyPlaceholder, StackScreen } from '../components'
import { InterventionScreen, InterventionsList } from '../interventions_screens'
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { styles } from '../../assets/styles'

function InterventionsStack(props) {
  const childScreens = { interventions: InterventionsList, intervention: InterventionScreen }

  return (
    <StackScreen
      {...props}
      childScreens={childScreens}
      selectInitialScreen={selectInitialScreen}
    />
  )

  function selectInitialScreen({ intervention }) {
    if (!valueHelper.isValue(intervention)) {
      return 'interventions'
    }

    return 'intervention'
  }
}
const Interventions = React.memo(InterventionsStack)

const screens = {
  interventions: Interventions
}

const routes = [
  { key: 'interventions', title: 'Interventions' },
]

function InterventionsScreen(props) {
  const { currentUser, currentPatient, userCredentials } = props
  const [state, dispatch] = useReducer(updateState, { index: 0, routes })

  return (
    <TabView
      initialLayout={{ width: Dimensions.get('window').width }}
      lazy
      navigationState={state}
      onIndexChange={handleIndexChange}
      renderScene={renderScene}
      renderLazyPlaceholder={renderLazyPlaceholder}
      renderTabBar={renderTabBar}
      style={styles.mainBody}
    />
  )

  function handleIndexChange(index) {
    dispatch({ type: 'INDEX-CHANGE', index })
  }

  function renderLazyPlaceholder({ route }) {
    return (<LazyPlaceholder route={route} />)
  }

  function renderScene({ jumpTo, route }) {
    const Screen = screens[route.key]
    if (!valueHelper.isValue(Screen)) {
      return null
    }

    return (
      <Screen
        currentPatient={currentPatient}
        currentUser={currentUser}
        intervention={state.currentIntervention}
        jumpTo={jumpTo}
        route={route}
        setIntervention={setIntervention}
        userCredentials={userCredentials}
      />
    )
  }

  function renderTabBar(props) {
    const { currentIntervention } = state
    let style = {}
    if (valueHelper.isValue(currentIntervention)) {
      style = { display: 'none' }
    }

    return (<TabBar {...props} style={style} />)
  }

  function setIntervention(intervention) {
    dispatch({ type: 'SET-INTERVENTION', intervention })
  }

  function updateState(oldState, action) {
    switch (action.type) {
      case 'INDEX-CHANGE':
        return { ...oldState, index: action.index }

      case 'SET-INTERVENTION':
        return { ...oldState, currentIntervention: action.intervention }


      default:
        return oldState
    }
  }
}

export { InterventionsScreen }

