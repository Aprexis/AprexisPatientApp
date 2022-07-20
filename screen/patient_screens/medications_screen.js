import React, { useReducer } from 'react'
import { Dimensions } from 'react-native'
import { TabView } from 'react-native-tab-view'
import { LazyPlaceholder, StackScreen } from '../components'
import { Allergies, CheckInteractions, MedicationScreen, PatientMedicationsList } from "../medications_screens"
import { valueHelper, currentUserHelper } from '../../helpers'
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

    return (
      <Screen currentPatient={currentPatient}
        currentUser={currentUser}
        jumpTo={jumpTo}
        navigation={navigation}
        route={route}
        patientMedication={state.currentMedication}
        setPatientMedication={setPatientMedication}
        userCredentials={userCredentials}
      />
    )
  }

  function setPatientMedication(patientMedication) {
    console.log(`Set PM: ${JSON.stringify(patientMedication, null, 2)}`)
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

