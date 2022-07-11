import React, { useReducer } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AddButton, FontAwesome5Icon, ListView } from '../components'
import { reminderApi } from "../../api"
import { valueHelper, alertHelper, currentUserHelper, patientHelper, patientMedicationHelper, reminderHelper, userCredentialsHelper } from "../../helpers"
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
        return `On ${reminderHelper.dayOfMonth(medicationReminder)} Day of Month`
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
  const { currentPatient, currentUser } = currentUserHelper.getCurrentProps(props)
  const { patientMedication } = props
  const [state, dispatch] = useReducer(updateState, initialState())

  return (
    <View style={styles.mainBody}>
      <View style={{ display: 'flex', justifyContent: 'flex-end', textAlign: 'right' }}>
        <AddButton onPress={addReminder} />
      </View>
      <ReminderModal
        action={state.modalAction}
        currentPatient={currentPatient}
        currentUser={currentUser}
        onClose={closeModal}
        patientMedication={patientMedication}
        reminder={state.reminder}
        visible={state.modalVisible}
      />
      <ListView
        forceUpdate={state.forceUpdate}
        label='Medication Reminders'
        navigation={navigation}
        onLoadPage={loadPage}
        onPresentItem={presentItem}
        pageSize={20}
        pluralLabel='Medication Reminders'
      />
    </View>
  )

  function addReminder() {
    dispatch({ type: 'ADD' })
  }

  function closeModal() {
    dispatch({ type: 'CLOSE' })
  }

  function editReminder(reminder) {
    dispatch({ type: 'EDIT', reminder })
  }

  function initialState() {
    return { modalVisible: false }
  }

  function loadPage(number, size, onSuccess) {
    userCredentialsHelper.getUserCredentials(
      (userCredentials) => {
        if (!valueHelper.isValue(userCredentials)) {
          return
        }
        reminderApi.listForPatient(
          userCredentials,
          patientHelper.id(currentPatient),
          { for_active: true, for_medication_label: patientMedicationHelper.medicationLabel(patientMedication), page: { number, size, total: 0 }, sort: 'recur_from,recur_to,action' },
          (page, pageHeaders) => {
            dispatch({ type: 'UPDATED' })
            onSuccess(page, pageHeaders)
          },
          (error) => {
            alertHelper.error(error)
            return
          }
        )
      }
    )
  }

  function presentItem(medicationReminder, medicationReminderIdx) {
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
      case 'ADD':
        return { ...oldState, modalVisible: true, modalAction: 'ADD' }

      case 'CLOSE':
        const newState = { ...oldState }
        delete newState.modalAction
        delete newState.reminder
        newState.modalVisible = !newState.modalVisible
        newState.forceUpdate = !newState.modalVisible
        return newState

      case 'EDIT':
        return { ...oldState, modalVisible: true, modalAction: 'EDIT', reminder: action.reminder }

      case 'UPDATED':
        return { ...oldState, forceUpdate: false }

      default:
        return oldState
    }
  }
}

export { MedicationRemindersList }

const inlineStyles = StyleSheet.create(
  {
    view: { flex: 1, flexDirection: "row", height: 50, margin: 5, backgroundColor: "#F3F6F9" },
    text: { color: "#112B37", fontSize: 18, fontWeight: "500", marginLeft: 5 },
    item: { whiteSpace: 'wrap' },
    medIcon: { marginRight: 5 }
  }
)
