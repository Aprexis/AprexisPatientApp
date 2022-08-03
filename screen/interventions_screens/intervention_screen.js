import React, { useReducer } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TabView } from 'react-native-tab-view'
import { FontAwesome5Icon, LazyPlaceholder, MaterialCommunityIcon } from '../components'
import { InterventionInfo } from './intervention_info'
import { InterventionDocumentsList } from '../intervention_documents_screens'
import { valueHelper, interventionHelper } from '@aprexis/aprexis-api-utility'

const screens = {
  info: InterventionInfo,
  documents: InterventionDocumentsList
}

const routes = [
  { key: 'info', title: 'Info' },
  { key: 'documents', title: 'Documents' }
]

function BackButton({ goBack }) {
  return (
    <TouchableOpacity
      onPress={goBack}
      style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#03718D', color: '#fff', width: 30, height: '100%' }}
    >
      <FontAwesome5Icon style={styles.titleIcon} size={30} name='angle-left' />
    </TouchableOpacity>
  )
}

function InterventionScreen(props) {
  const { currentUser, currentPatient, userCredentials, intervention, setIntervention, setStackScreen } = props
  const [state, dispatch] = useReducer(updateState, { index: 0, routes })

  if (!valueHelper.isValue(intervention)) {
    return null
  }

  return (
    <View style={styles.view}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <BackButton goBack={() => { setIntervention(); setStackScreen('interventions') }} />
        <View style={styles.titleView}>
          <MaterialCommunityIcon size={30} style={styles.titleIcon} name='file-chart' />
          <Text style={styles.titleText}>{interventionHelper.programDisplay(intervention)} {interventionHelper.displayDateOfServce(intervention)}</Text>
        </View>
      </View>

      <TabView
        lazy
        navigationState={state}
        renderScene={renderScene}
        renderLazyPlaceholder={renderLazyPlaceholder}
        onIndexChange={handleIndexChange}
        initialLayout={{ width: Dimensions.get('window').width }}
        style={styles.sectionView}
      />
    </View >
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

    return <Screen currentPatient={currentPatient} currentUser={currentUser} jumpTo={jumpTo} intervention={intervention} route={route} userCredentials={userCredentials} />
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

export { InterventionScreen }

const styles = StyleSheet.create(
  {
    sectionView: { flex: 4 },
    titleView: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#03718D', color: '#fff' },
    titleIcon: { color: '#fff' },
    titleText: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
    view: { flex: 1 }
  }
)
