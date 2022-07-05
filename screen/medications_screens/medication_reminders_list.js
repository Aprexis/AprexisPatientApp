import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AddButton, FontAwesome5Icon, ListView, MaterialCommunityIcon } from '../components'
import { reminderApi } from "../../api"
import { valueHelper, alertHelper, currentUserHelper, patientHelper, patientMedicationHelper, reminderHelper, userCredentialsHelper } from "../../helpers"
import { styles } from '../../assets/styles'

function MedicationReminder(props) {
  const { navigation, medicationReminder } = props
  const { currentUser, currentPatient } = currentUserHelper.getCurrentProps(props)

  return ( 
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.listButton}
      onPress={() => { navigation.navigate('ReminderScreen', { currentUser, currentPatient, reminder: medicationReminder }) }}>
      <View style={{ flexDirection: "row", alignItems:'center', width:'95%'}}>
        <FontAwesome5Icon size={27} name="clock" style={[styles.icon, inlineStyles.medIcon]} />
        <Text style={inlineStyles.text}>{reminderHelper.displayAction(medicationReminder)}</Text>
      </View>
      <View>
        <FontAwesome5Icon size={30} name="angle-right" style={[styles.icon, inlineStyles.medIcon]} />
      </View>
    </TouchableOpacity> 
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
    <View style={styles.mainBody}>
      <View style={{ display:'flex', justifyContent:'flex-end', textAlign:'right'}}>
        <AddButton onPress={addReminder} />
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

const inlineStyles = StyleSheet.create(
  {
    view: { flex: 1, flexDirection: "row", height: 50, margin: 5, backgroundColor: "#F3F6F9" },
    text: { color: "#112B37", fontSize: 18, fontWeight: "500", marginLeft:5 },
    item: { whiteSpace: 'wrap' },
    medIcon: { marginRight: 5 }
  }
)
