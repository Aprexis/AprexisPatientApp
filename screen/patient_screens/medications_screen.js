import React, { useReducer } from 'react'
import { Dimensions } from 'react-native'
import { TabBar, TabView } from 'react-native-tab-view'
import { LazyPlaceholder, StackScreen } from '../components'
import { Allergies, CheckInteractions, MedicationScreen, PatientMedicationsList } from "../medications_screens"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { styles } from '../../assets/styles'

function MedicationsStack(props) {
  const childScreens = { medications: PatientMedicationsList, medication: MedicationScreen }

  return (
    <StackScreen
      {...props}
      childScreens={childScreens}
      selectInitialScreen={selectInitialScreen}
    />
  )

  function selectInitialScreen({ patientMedication }) {
    if (!valueHelper.isValue(patientMedication)) {
      return 'medications'
    }

    return 'medication'
  }
}
const Medications = React.memo(MedicationsStack)

const screens = {
  medications: Medications,
  check_interactions: CheckInteractions,
  allergies: Allergies
}

const routes = [
  { key: 'medications', title: 'Medications' },
  { key: 'check_interactions', title: 'Check Interactions' },
  { key: 'allergies', title: 'Allergies' }
]

function MedicationsScreen(props) {
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
        allergyType={'medicine'}
        currentUser={currentUser}
        jumpTo={jumpTo}
        route={route}
        patientMedication={state.currentMedication}
        setPatientMedication={setPatientMedication}
        userCredentials={userCredentials}
      />
    )
  }

  function renderTabBar(props) {
    const { currentMedication } = state
    let style = {}
    if (valueHelper.isValue(currentMedication)) {
      style = { display: 'none' }
    }

    return (<TabBar {...props} style={style} />)
  }

  function setPatientMedication(patientMedication) {
    dispatch({ type: 'SET-PATIENT-MEDICATION', patientMedication })
  }

  function updateState(oldState, action) {
    switch (action.type) {
      case 'INDEX-CHANGE':
        return { ...oldState, index: action.index }

      case 'SET-PATIENT-MEDICATION':
        return { ...oldState, currentMedication: action.patientMedication }

      default:
        return oldState
    }
  }
}

export { MedicationsScreen }

