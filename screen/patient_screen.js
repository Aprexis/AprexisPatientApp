import React, { useEffect, useReducer } from "react"
import { Dimensions, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import { TabBar, TabView } from 'react-native-tab-view'
import { CareTeamScreen } from './care_team_screens'
import { FontAwesome5Icon, StackScreen } from './components'
import { HomeScreen, MedicationsScreen, RequestPatientScreen } from "./patient_screens"
import { HeaderLeft, HeaderRight, LazyPlaceholder } from "./components"
import { valueHelper, patientHelper, currentUserHelper, userCredentialsHelper } from "../helpers"
import { styles } from '../assets/styles'

function headerOptions(navigation, currentUser, currentPatient, userCredentials) {
  return {
    headerLeft: () => (<HeaderLeft currentUser={currentUser} currentPatient={currentPatient} userCredentials={userCredentials} />),
    headerRight: () => (<HeaderRight currentUser={currentUser} currentPatient={currentPatient} userCredentials={userCredentials} />),
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

const screens = {
  home: Home,
  medications: MedicationsScreen,
  care_team: CareTeamScreen
}

const routeList = [
  { key: 'home', title: 'Home' },
  { key: 'medications', title: 'Medications' },
  { key: 'care_team', title: 'Care Team' }
]

function PatientScreen(props) {
  const [state, dispatch] = useReducer(updateState, { index: 0, routes: routes(props.currentPatient) })
  const { currentPatient, userCredentials } = state
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
    <View style={{ flex: 1 }}>
      {header()}

      <TabView
        getAccessible={accessible}
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
    </View>
  )

  function accessible({ route }) {
    if (route.key == 'home') {
      return true
    }

    return valueHelper.isValue(currentPatient)
  }

  function handleIndexChange(index) {
    dispatch({ type: 'INDEX-CHANGE', index })
  }

  function header() {
    const { setCurrent, setStackScreen } = props

    if (!valueHelper.isValue(currentUser) || !valueHelper.isValue(currentPatient)) {
      return null
    }

    return (
      <SafeAreaView
        edges={['top']}
        style={inlineStyles.appBar}
      >
        <View style={inlineStyles.appbarContent}>
          <HeaderLeft currentUser={currentUser} currentPatient={currentPatient} userCredentials={userCredentials} />
          <View style={{ flex: 1, justifyContent: 'flex-start' }}>
            <Text>Hi {patientHelper.firstName(currentPatient)}!</Text>
          </View>
          <HeaderRight
            currentUser={currentUser}
            currentPatient={currentPatient}
            performLogout={() => { setStackScreen('login') }}
            userCredentials={userCredentials}
          />
        </View>
      </SafeAreaView>
    )
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
    const { setCurrent, setStackScreen } = props
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
        setCurrent={setCurrent}
        setCurrentPatient={setCurrentPatient}
        setUserCredentials={setUserCredentials}
        userCredentials={userCredentials}
      />
    )
  }

  function renderTabBar(props) {
    return (<TabBar {...props} renderIcon={renderIcon} />)
  }

  function routes(patient) {
    if (valueHelper.isValue(patient)) {
      return routeList
    }

    return [{ key: routeList[0].key, title: routeList[0].title }]
  }

  function setCurrentPatient(currentPatient) {
    dispatch({ type: 'SET-CURRENT-PATIENT', currentPatient })
  }

  function setUserCredentials(userCredentials) {
    dispatch({ type: 'SET-USER-CREDENTIALS', userCredentials })
  }

  function updateState(oldState, action) {
    switch (action.type) {
      case 'INDEX-CHANGE':
        return { ...oldState, index: action.index }

      case 'SET-CURRENT-PATIENT':
        return { ...oldState, currentPatient: action.currentPatient, routes: routes(action.currentPatient) }

      case 'SET-USER-CREDENTIALS':
        return { ...oldState, userCredentials: action.userCredentials }

      default:
        return oldState
    }
  }
}

export { PatientScreen }

const inlineStyles = new StyleSheet.create(
  {
    appbar: {
      borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    },
    appbarContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 56,
    }
  }
)
