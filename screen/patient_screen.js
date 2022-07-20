import React, { useEffect, useReducer } from "react"
import { Dimensions } from "react-native"
import { TabBar, TabView } from 'react-native-tab-view'
import { CareTeamScreen } from './care_team_screens'
import { FontAwesome5Icon, StackScreen } from './components'
import { MedicationScreen } from "./medications_screens"
import { HomeScreen, MedicationsScreen, RequestPatientScreen } from "./patient_screens"
import { HeaderLeft, HeaderRight, LazyPlaceholder } from "./components"
import { valueHelper, patientHelper, currentUserHelper, userCredentialsHelper } from "../helpers"
import { styles } from '../assets/styles'

function headerOptions(navigation, currentUser, currentPatient, userCredentials) {
  return {
    headerLeft: () => (<HeaderLeft currentUser={currentUser} currentPatient={currentPatient} userCredentials={userCredentials} />),
    headerRight: () => (<HeaderRight navigation={navigation} currentUser={currentUser} currentPatient={currentPatient} userCredentials={userCredentials} />),
    headerTitle: `Hi ${patientHelper.firstName(currentPatient)}!`,
    headerStyle: { backgroundColor: "#03718D" },
    headerTintColor: '#fff',
    headerTitleStyle: { fontWeight: '600', position: 'relative', left: -10 }
  }
}

function HomeScreenStack(props) {
  const childScreens = { requestPatient: RequestPatientScreen, home: HomeScreen }

  return (
    <StackScreen
      {...props}
      childScreens={childScreens}
      nextScreen='home'
      selectInitialScreen={selectInitialScreen}
    />
  )

  function selectInitialScreen({ currentPatient }) {
    if (valueHelper.isValue(currentPatient)) {
      return 'home'
    }

    return 'requestPatient'
  }
}
const Home = React.memo(HomeScreenStack)

function MedicationsScreenStack(props) {
  const childScreens = { medications: MedicationsScreen, medication: MedicationScreen }

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
const Medications = React.memo(MedicationsScreenStack)

const screens = {
  home: Home,
  medications: Medications,
  care_team: CareTeamScreen
}

const routes = [
  { key: 'home', title: 'Home' },
  { key: 'medications', title: 'Medications' },
  { key: 'care_team', title: 'Care Team' }
]

function PatientScreen(props) {
  const [state, dispatch] = useReducer(updateState, { index: 0, routes })
  const { userCredentials } = state
  const { currentUser } = currentUserHelper.getCurrentProps(props)

  useEffect(
    () => {
      userCredentialsHelper.getUserCredentials(
        (retrievedUserCredentials) => {
          const haveUserCredentials = valueHelper.isValue(userCredentials)
          const haveRetrievedUserCredentials = valueHelper.isValue(retrievedUserCredentials)
          if (!haveUserCredentials && !haveRetrievedUserCredentials) {
            return
          }
          if (haveUserCredentials && haveRetrievedUserCredentials &&
            userCredentials.username == retrievedUserCredentials.username &&
            userCredentials.token == retrievedUserCredentials.token) {
            return
          }

          setUserCredentials(retrievedUserCredentials)
        })
    }
  )

  return (
    <TabView
      lazy
      navigationState={state}
      renderScene={renderScene}
      renderLazyPlaceholder={renderLazyPlaceholder}
      onIndexChange={handleIndexChange}
      initialLayout={{ width: Dimensions.get('window').width }}
      renderTabBar={renderTabBar}
      style={styles.mainBody}
      tabBarPosition='bottom'
    />
  )

  function handleIndexChange(index) {
    dispatch({ type: 'INDEX-CHANGE', index })
  }

  function renderLazyPlaceholder({ route }) {
    return (<LazyPlaceholder route={route} />)
  }

  function renderIcon({ route, color }) {
    switch (route.key) {
      case 'care_team':
        return (<FontAwesome5Icon name="hand-holding-medical" color={color} size={28} style={{ marginTop: -4 }} />)

      case 'home':
        return (<FontAwesome5Icon name="home" color={color} size={27} style={{ marginTop: -4 }} />)

      case 'medications':
        return (<FontAwesome5Icon name="pills" color={color} size={28} style={{ marginTop: -4 }} />)

      default:
        return null
    }
  }

  function renderScene({ jumpTo, route }) {
    const Screen = screens[route.key]
    if (!valueHelper.isValue(Screen)) {
      return null
    }

    return (
      <Screen
        currentPatient={state.currentPatient}
        currentUser={currentUser}
        jumpTo={jumpTo}
        route={route}
        setCurrentPatient={setCurrentPatient}
        setPatientMedication={setPatientMedication}
        userCredentials={userCredentials}
      />
    )
  }

  function renderTabBar(props) {
    return (<TabBar {...props} renderIcon={renderIcon} />)
  }

  function setCurrentPatient(currentPatient) {
    dispatch({ type: 'SET-CURRENT-PATIENT', currentPatient })
  }

  function setPatientMedication(patientMedicaiton) {
    dispatch({ type: 'SET-PATIENT-MEDICATION', patientMedication })
  }

  function setUserCredentials(userCredentials) {
    dispatch({ type: 'SET-USER-CREDENTIALS', userCredentials })
  }

  function updateState(oldState, action) {
    switch (action.type) {
      case 'INDEX-CHANGE':
        return { ...oldState, index: action.index }

      case 'SET-CURRENT-PATIENT':
        return { ...oldState, currentPatient: action.currentPatient }

      case 'SET-PATIENT-MEDICATION':
        return { ...oldState, currentMedication: action.patientMedication }

      case 'SET-USER-CREDENTIALS':
        return { ...oldState, userCredentials: action.userCredentials }

      default:
        return oldState
    }
  }
}

export { PatientScreen }
