import React, { useReducer } from 'react'
import { Dimensions } from 'react-native'
import { TabView } from 'react-native-tab-view'
import { LazyPlaceholder } from '../components'
import { Allergies, CheckInteractions, PatientMedicationsList } from "../medications_screens"
import { valueHelper, currentUserHelper } from '../../helpers'
import { styles } from '../../assets/styles'

const screens = {
  medications: PatientMedicationsList,
  check_interactions: CheckInteractions,
  allergies: Allergies
}

const routes = [
  { key: 'medications', title: 'Medications' },
  { key: 'check_interactions', title: 'Check Interactions' },
  { key: 'allergies', title: 'Allergies' }
]

function MedicationsScreen(props) {
  const [state, dispatch] = useReducer(updateState, { index: 0, routes })
  const { navigation } = props
  const { currentUser, currentPatient, userCredentials } = currentUserHelper.getCurrentProps(props)

  return (
    <TabView
      lazy
      navigationState={state}
      renderScene={renderScene}
      renderLazyPlaceholder={renderLazyPlaceholder}
      onIndexChange={handleIndexChange}
      initialLayout={{ width: Dimensions.get('window').width }}
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

    return <Screen currentPatient={currentPatient} currentUser={currentUser} jumpTo={jumpTo} navigation={navigation} route={route} userCredentials={userCredentials} />
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

export { MedicationsScreen }

