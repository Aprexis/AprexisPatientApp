import React, { useReducer } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { TabView } from 'react-native-tab-view'
import { FontAwesome5Icon, LazyPlaceholder } from '../components'
import { MedicationAdherence } from './medication_adherence'
import { MedicationInfo } from "./medication_info"
import { MedicationInteractions } from './medication_interactions'
import { MedicationRemindersList } from './medication_reminders_list'
import { valueHelper, currentUserHelper, patientMedicationHelper } from "../../helpers"

const screens = {
  info: MedicationInfo,
  interactions: MedicationInteractions,
  adherence: MedicationAdherence,
  reminders: MedicationRemindersList
}

const routes = [
  { key: 'info', title: 'Info' },
  { key: 'interacitons', title: 'Interactions' },
  { key: 'adherence', title: 'Adherence' },
  { key: 'reminders', title: 'Reminders' }
]

function MedicationScreen(props) {
  const { patientMedication } = props.route.params
  const [state, dispatch] = useReducer(updateState, { index: 0, routes })
  const { currentUser, currentPatient, userCredentials } = currentUserHelper.getCurrentProps(props)

  return (
    <View style={styles.view}>
      <View style={styles.titleView}>
        <FontAwesome5Icon size={30} style={styles.titleIcon} name={patientMedicationHelper.medicationIcon(patientMedication)} />
        <Text style={styles.titleText}>{patientMedicationHelper.medicationLabel(patientMedication)}</Text>
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

    return <Screen currentPatient={currentPatient} currentUser={currentUser} jumpTo={jumpTo} patientMedication={patientMedication} route={route} userCredentials={userCredentials} />
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

export { MedicationScreen }

const styles = StyleSheet.create(
  {
    sectionView: { flex: 4 },
    titleView: { flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: '#03718D', color: '#fff' },
    titleIcon: { color: "#fff" },
    titleText: { fontSize: 20, fontWeight: "bold", color: '#fff' },
    view: { flex: 1 }
  }
)
