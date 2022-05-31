import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { reminderApi } from '../../api'
import { valueHelper, alertHelper, currentUserHelper, patientHelper, patientMedicationHelper, reminderHelper, userCredentialsHelper } from "../../helpers"

function ReminderScreen(props) {
  const { currentPatient } = currentUserHelper.getCurrentProps()
  const { patientMedication, reminder } = props
  const [workingReminder, setWorkingReminder] = useState(valueHelper.isValue(reminder) ? reminder : {})
  const [changedReminder, setChangedReminder] = useState({})
  const [loaded, setLoaded] = useState(false)

  useEffect(
    () => {
      if (valueHelper.isSet(loaded)) {
        return
      }

      userCredentialsHelper.getUserCredentials(
        (userCredentials) => {
          if (valueHelper.isValue(reminder)) {
            reminderApi.edit(
              userCredentials,
              reminderHelper.id(reminder),
              loadWorkingReminder,
              (message) => {
                setLoaded(true)
                alertHelper.error(message)
                return
              }
            )
            return
          }

          reminderApi.buildNew(
            userCredentials,
            patientHelper.id(currentPatient),
            loadReminder,
            (message) => {
              setLoaded(true)
              alertHelper.error(message)
              return
            }
          )
        }
      )

      function loadReminder(loadedReminder) {
        setLoaded(true)
        const updateReminder = reminderHelper.buildChanged(loadedReminder)
        if (!valueHelper.isValue(patientMedication)) {
          setWorkingReminder(loadedReminder)
          setChangedReminder(updateReminder)
          return
        }

        const updated = reminderHelper.addPatientMedication(loadedReminder, updateReminder, patientMedication)
        setWorkingReminder(updated.reminder)
        setChangedReminder(updated.changedReminder)
      }
    }
  )
}

export { ReminderScreen }

