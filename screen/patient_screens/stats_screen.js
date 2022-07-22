import React, { useReducer } from 'react'
import { Dimensions } from 'react-native'
import { TabView } from 'react-native-tab-view'
import { LazyPlaceholder } from '../components'
import { LabsList } from '../labs_screens'
import { VitalsList } from '../vitals_screens'
import { valueHelper, currentUserHelper } from '../../helpers'
import { styles } from '../../assets/styles'


function AdherenceStack() {
  return null
}
const Adherence = React.memo(AdherenceStack)

function VitalsStack() {
  return null
}
const Vitals = React.memo(VitalsStack)

function WellnessStack() {
  return null
}
const Wellness = React.memo(WellnessStack)

const screens = {
  adherence: Adherence,
  labs: LabsList,
  vitals: VitalsList,
  wellness: Wellness
}

const routes = [
  { key: 'adherence', title: 'Adherence' },
  { key: 'labs', title: 'Labs' },
  { key: 'vitals', title: 'Vitals' },
  { key: 'wellness', title: 'Wellness' }
]

function StatsScreen(props) {
  const [state, dispatch] = useReducer(updateState, { index: 0, routes })
  const { currentUser, currentPatient, userCredentials } = currentUserHelper.getCurrentProps(props)

  return (
    <TabView
      initialLayout={{ width: Dimensions.get('window').width }}
      lazy
      navigationState={state}
      onIndexChange={handleIndexChange}
      renderScene={renderScene}
      renderLazyPlaceholder={renderLazyPlaceholder}
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
        jumpTo={jumpTo}
        route={route}
        userCredentials={userCredentials}
      />
    )
  }

  function updateState(oldState, action) {
    switch (action.type) {
      case 'INDEX-CHANGE':
        return { ...oldState, index: action.index }

      default:
        return oldState
    }
  }
}

export { StatsScreen }
