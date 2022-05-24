import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FontAwesome5Icon, MaterialCommunityIcon } from '../components'
import { reminderApi } from "../../api"
import { valueHelper, alertHelper, currentUserHelper, patientHelper, patientMedicationHelper, reminderHelper, userCredentialsHelper } from "../../helpers"

function MedicationReminder(props) {
  const { navigation, medicationReminder } = props
  const { currentUser, currentPatient } = currentUserHelper.getCurrentProps(props)

  return (
    <View style={styles.medicationReminder.view}>
      <MaterialCommunityIcon size={17} style={styles.medicationReminder.icon} name="reminder" />
      <Text style={styles.medicationReminder.text}>{reminderHelper.displayAction(medicationReminder)}</Text>
      <Text style={styles.medicationReminder.text}>{reminderHelper.displayRecurFrom(medicationReminder)}</Text>
      <Text style={styles.medicationReminder.text}>{reminderHelper.displayRecurTo(medicationReminder)}</Text>
      <Text style={styles.medicationReminder.text}>{reminderDates(medicationReminder)}</Text>
      <Text style={styles.medicationReminder.text}>{reminderHelper.displayRemindAt(medicationReminder)}</Text>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => { navigation.navigate('ReminderInfo', { currentUser, currentPatient, medicationReminder }) }}>
        <FontAwesome5Icon size={17} name="angle-right" />
      </TouchableOpacity>
    </View>
  )

  function reminderDates(medicationReminder) {
    switch (reminderHelper.type(medicationReminder)) {
      case 'DailyReminder':
        return 'Daily'
      case 'WeeklyReminder':
        return selectedDaysOfWeek(medicationReminder)
      case 'MonthlyReminder':
        return reminderHelper.dayOfMonth(medicationReminder)
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
  const { currentPatient } = currentUserHelper.getCurrentProps(props)
  const { patientMedication } = props
  const [medicationReminders, setMedicationReminders] = useState([])
  const [medicationReminderHeaders, setMedicationReminderHeaders] = useState({})
  const [loaded, setLoaded] = useState(false)

  useEffect(
    () => {
      if (valueHelper.isSet(loaded)) {
        return
      }
      userCredentialsHelper.getUserCredentials(
        (userCredentials) => {
          if (!valueHelper.isValue(userCredentials)) {
            return
          }
          reminderApi.listForPatient(
            userCredentials,
            patientHelper.id(currentPatient),
            { for_active: true, for_medication: patientMedicationHelper.medicationId(patientMedication), sort: 'recur_from,recur_to,action' },
            (medicationReminders, medicationReminderHeaders) => {
              setLoaded(true)
              setMedicationReminders(medicationReminders)
              setMedicationReminderHeaders(medicationReminderHeaders)
            },
            (message) => {
              alertHelper.error(message)
              return
            }
          )
        }
      )
    }
  )

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.medicationRemindersList.scrollContext}>
      {
        medicationReminders.map(
          (medicationReminder) => {
            return (<MedicationReminder key={`patient-medication-${reminderHelper.id(medicationReminder)}`} {...props} medicationReminder={medicationReminder} />)
          }
        )
      }
    </ScrollView>
  )
}

export { MedicationRemindersList }

const styles = StyleSheet.create(
  {
    medicationRemindersList: {
      scrollContext: { flexDirection: "column" }
    },
    medicationReminder: {
      view: { flex: 1, flexDirection: "row", alignContent: 'center', height: 20, backgroundColor: "#c8c8c8" },
      icon: { color: "grey" },
      text: { fontSize: 12, fontWeight: "bold", margin: 2 }
    }
  }
)
