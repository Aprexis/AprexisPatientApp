import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { reminderApi } from '../../api'
import { FontAwesome5Icon, ListView } from '../components'
import { valueHelper, alertHelper, patientHelper, userHelper, currentUserHelper, reminderHelper, dateHelper } from '../../helpers'
import { medicationHelper } from '../../helpers/admin'
import { styles } from '../../assets/styles'

function Medication({ medication }) {
  return (
    <React.Fragment>
      <FontAwesome5Icon size={20} style={styles.icon} name={medicationHelper.icon(medication)} />
      <Text style={inlineStyles.text}>{medicationHelper.label(medication)}</Text>
    </React.Fragment>
  )
}

function Medications({ medications }) {
  return medications.map((medication, medicationIdx) => (<Medication key={`reminder-medication-${medicationHelper.id(medication)}-${medicationIdx}`} medication={medication} />))
}

function Reminder({ day, reminder }) {
  let dateTime = dateHelper.displayDate(day)
  if (reminder.action == 'take') {
    dateTime = `${dateTime} ${dateHelper.formatDate(dateHelper.makeDate(reminderHelper.remindAt(reminder)), 'h:mma')}`
  }

  return (
    <View style={
      {
        flexDirection: 'column',
        borderRadius: 20,
        borderWidth: 2
      }
    }>
      <View style={{ flexDirection: "row" }}>
        <Text style={inlineStyles.header}>Medication Reminder</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
        <Text style={inlineStyles.text}>{valueHelper.capitalizeWords(reminderHelper.action(reminder))}</Text>
        <Text style={inlineStyles.text}>{dateTime}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Medications medications={reminderHelper.medications(reminder)} />
      </View>
    </View>
  )
}

function Reminders({ currentPatient, day, userCredentials }) {
  return (
    <ListView
      onLoadPage={loadPage}
      onPresentItem={presentItem}
      pageSize={4}
    />
  )

  function loadPage(number, size, onSuccess) {
    reminderApi.listForPatient(
      userCredentials,
      patientHelper.id(currentPatient),
      { for_date: day, for_kind: 'medication', page: { number, size, total: 0 }, sort: 'action-' },
      onSuccess,
      alertHelper.handleError
    )
  }

  function presentItem(reminder, reminderIdx, editReminder) {
    return (
      <Reminder
        day={day}
        key={`reminder-${reminderHelper.id(reminder)}-${reminderIdx}`}
        onEdit={editReminder}
        reminder={reminder}
      />
    )
  }
}

function HomeScreen(props) {
  const { currentUser, currentPatient, userCredentials } = currentUserHelper.getCurrentProps(props)
  let day = new Date()
  let homeScreenText = 'This is the Home Screen'
  if (valueHelper.isValue(currentUser)) {
    if (valueHelper.isValue(currentPatient)) {
      homeScreenText = `${homeScreenText} for patient ${patientHelper.name(currentPatient)}`
    } else {
      homeScreenText = `${homeScreenText} for user ${userHelper.email(currentUser)}`
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mainBody}>
        <Reminders currentPatient={currentPatient} day={day} userCredentials={userCredentials} />
      </View>
    </SafeAreaView>
  )
}

export { HomeScreen }

const inlineStyles = StyleSheet.create(
  {
    view: { flex: 1, flexDirection: "row", height: 50, margin: 5, backgroundColor: "#F3F6F9" },
    header: { color: "#112B37", fontSize: 20, fontWeight: "bold", marginLeft: 5 },
    text: { color: "#112B37", fontSize: 18, fontWeight: "500", marginLeft: 5 },
    item: { whiteSpace: 'wrap' },
    medIcon: { marginRight: 5 }
  }
)
