import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AddButton, FontAwesome5Icon, ListView, MaterialCommunityIcon } from '../components'
import { reminderApi } from "../../api"
import { valueHelper, alertHelper, currentUserHelper, patientHelper, patientMedicationHelper, reminderHelper, userCredentialsHelper } from "../../helpers"

function MedicationReminder(props) {
  const { navigation, medicationReminder } = props
  const { currentUser, currentPatient } = currentUserHelper.getCurrentProps(props)

  return (
    <View style={styles.medicationReminder.view}>
      <View style={{ flexGrow: 1, flexDirection: "row" }}>
        <MaterialCommunityIcon size={17} style={styles.medicationReminder.icon} name="reminder" />
        <Text style={styles.medicationReminder.text}>{reminderHelper.displayAction(medicationReminder)}</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => { navigation.navigate('ReminderScreen', { currentUser, currentPatient, reminder: medicationReminder }) }}>
          <FontAwesome5Icon size={17} name="angle-right" />
        </TouchableOpacity>
      </View>
      <View style={{ flexGrow: 1, flexDirection: "row" }}>
        <Text style={styles.medicationReminder.text}>{reminderHelper.displayRecurFrom(medicationReminder)}</Text>
        <Text style={styles.medicationReminder.text}>{reminderHelper.displayRecurTo(medicationReminder)}</Text>
        <Text style={styles.medicationReminder.text}>{reminderHelper.displayRemindAt(medicationReminder)}</Text>
      </View>
      <View style={{ flexGrow: 1, flexDirection: "row" }}>
        <Text style={styles.medicationReminder.text}>{reminderDates(medicationReminder)}</Text>
      </View>
    </View>
  )

  function reminderDates(medicationReminder) {
    switch (reminderHelper.type(medicationReminder)) {
      case 'DailyReminder':
        return 'Daily'
      case 'WeeklyReminder':
        return selectedDaysOfWeek(medicationReminder)
      case 'MonthlyReminder':
        return `Day of Month: ${reminderHelper.dayOfMonth(medicationReminder)}`
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

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor:"#F3F6F9"}}>
        <AddButton onPress={addReminder}/>
      </View>
      <ListView
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
    navigation.navigate('ReminderScreen', { currentUser, currentPatient, patientMedication: patientMedication })
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
          onSuccess,
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
        {...props}
      />
    )
  }
}

export { MedicationRemindersList }

const styles = StyleSheet.create(
  {
    medicationReminder: {
      view: { flex: 1, flexDirection: "column", alignContent: 'center', backgroundColor: "red", border:'solid' },
      icon: { color: "grey" },
      text: { fontSize: 12, fontWeight: "bold", margin: 2 }
    }
  }
)
