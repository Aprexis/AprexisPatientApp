import React, { useEffect, useReducer } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FontAwesome5Icon, ListView } from '../components'
import { reminderApi } from "../../api"
import { valueHelper, alertHelper, currentUserHelper, patientHelper, patientMedicationHelper, reminderHelper } from "../../helpers"
import { styles } from '../../assets/styles'
import { ReminderModal } from '../reminders_screens'

function MedicationReminder(props) {
  const { medicationReminder, onEdit } = props

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.listButton}
      onPress={() => { onEdit(medicationReminder) }}>
      <View style={{ flexDirection: "row", alignItems: 'center', width: '95%' }}>
        <FontAwesome5Icon size={27} name="clock" style={[styles.icon, inlineStyles.medIcon]} />
        <Text style={inlineStyles.text}>{reminderHelper.displayAction(medicationReminder)}</Text>
        <Text style={inlineStyles.text}>{reminderDates(medicationReminder)}</Text>
      </View>
    </TouchableOpacity>
  )

  function reminderDates(medicationReminder) {
    switch (reminderHelper.type(medicationReminder)) {
      case 'DailyReminder':
        return 'Daily'
      case 'WeeklyReminder':
        return `On ${selectedDaysOfWeek(medicationReminder)}`
      case 'MonthlyReminder':
        return `On Day ${reminderHelper.dayOfMonth(medicationReminder)}`
      default:
        return ""
    }

    function selectedDaysOfWeek(medicationReminder) {
      let daysOfWeek = ""
      let prefix = ''
      if (valueHelper.isSet(reminderHelper.sunday(medicationReminder))) {
        daysOfWeek = `${daysOfWeek}${prefix}S`
        prefix = ','
      }
      if (valueHelper.isSet(reminderHelper.monday(medicationReminder))) {
        daysOfWeek = `${daysOfWeek}${prefix}M`
        prefix = ','
      }
      if (valueHelper.isSet(reminderHelper.tuesday(medicationReminder))) {
        daysOfWeek = `${daysOfWeek}${prefix}T`
        prefix = ','
      }
      if (valueHelper.isSet(reminderHelper.wednesday(medicationReminder))) {
        daysOfWeek = `${daysOfWeek}${prefix}W`
        prefix = ','
      }
      if (valueHelper.isSet(reminderHelper.thursday(medicationReminder))) {
        daysOfWeek = `${daysOfWeek}${prefix}Th`
        prefix = ','
      }
      if (valueHelper.isSet(reminderHelper.friday(medicationReminder))) {
        daysOfWeek = `${daysOfWeek}${prefix}F`
        prefix = ','
      }
      if (valueHelper.isSet(reminderHelper.saturday(medicationReminder))) {
        daysOfWeek = `${daysOfWeek}${prefix}Sa`
        prefix = ','
      }

      return daysOfWeek
    }
  }
}

function MedicationRemindersList(props) {
  const { navigation } = props
  const { currentPatient, currentUser, userCredentials } = currentUserHelper.getCurrentProps(props)
  const { patientMedication } = props
  const [state, dispatch] = useReducer(updateState, initialState())

  useEffect(
    () => {
      if (patientMedicationHelper.id(patientMedication) != patientMedicationHelper.id(state.patientMedication)) {
        dispatch({ type: 'NEW-PATIENT-MEDICATION', patientMedication })
      }
    },
    [patientMedication]
  )

  return (
    <View style={styles.mainBody}>
      <ListView
        addEditModal={addEditModal}
        forceUpdate={patientMedicationHelper.id(patientMedication) != patientMedicationHelper.id(state.patientMedication)}
        label='Medication Reminders'
        navigation={navigation}
        onLoadPage={loadPage}
        onPresentItem={presentItem}
        pageSize={20}
        pluralLabel='Medication Reminders'
      />
    </View>
  )

  function addEditModal(medicationReminder, action, visible, closeModal) {
    return (
      <ReminderModal
        action={action}
        currentPatient={currentPatient}
        currentUser={currentUser}
        onClose={closeModal}
        patientMedication={patientMedication}
        reminder={medicationReminder}
        userCredentials={userCredentials}
        visible={visible}
      />
    )
  }

  function initialState() {
    return {}
  }

  function loadPage(number, size, onSuccess) {
    reminderApi.listForPatient(
      userCredentials,
      patientHelper.id(currentPatient),
      { for_active: true, for_medication_label: patientMedicationHelper.medicationLabel(patientMedication), page: { number, size, total: 0 }, sort: 'recur_from,recur_to,action' },
      onSuccess,
      alertHelper.handleError
    )
  }

  function presentItem(medicationReminder, medicationReminderIdx, editReminder) {
    return (
      <MedicationReminder
        key={`medication-reminder-${reminderHelper.id(medicationReminder)}-${medicationReminderIdx}`}
        medicationReminder={medicationReminder}
        onEdit={editReminder}
        {...props}
      />
    )
  }

  function updateState(oldState, action) {
    switch (action.type) {
      case 'NEW-PATIENT-MEDICATION':
        return { ...oldState, patientMedication: action.patientMedication }

      default:
        return oldState
    }
  }
}

const MemoizedMedicationRemindersList = React.memo(MedicationRemindersList)
export { MemoizedMedicationRemindersList as MedicationRemindersList }

const inlineStyles = StyleSheet.create(
  {
    view: { flex: 1, flexDirection: "row", height: 50, margin: 5, backgroundColor: "#F3F6F9" },
    text: { color: "#112B37", fontSize: 18, fontWeight: "500", marginLeft: 5 },
    item: { whiteSpace: 'wrap' },
    medIcon: { marginRight: 5 }
  }
)
