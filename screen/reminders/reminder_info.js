import React, { useEffect, useReducer } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Checkbox from 'expo-checkbox'
import { Picker } from '@react-native-picker/picker'
import { reminderApi } from '../../api'
import { valueHelper, alertHelper, reminderHelper, userCredentialsHelper, patientHelper } from "../../helpers"
import { reminderActions } from '../../types'

function ReminderInfo(props) {
  const [state, dispatch] = useReducer(updateState, initialState())

  useEffect(
    () => {
      if (!state.needLoad) {
        return
      }

      const { reminder } = state

      userCredentialsHelper.getUserCredentials(
        (userCredentials) => {
          if (!valueHelper.isValue(userCredentials)) {
            return
          }

          if (!valueHelper.isValue(reminder)) {
            reminderApi.buildNew(
              userCredentials,
              currentPatient.id,
              (newReminder) => {
                dispatch({ type: 'LOADED-DATA', reminder: newReminder })
              },
              (message) => {
                dispatch({ type: 'ERROR' })
                alertHelper.error(message)
                return
              }
            )
            return
          }

          reminderApi.edit(
            userCredentials,
            reminder.id,
            (existingReminder) => {
              dispatch({ type: 'LOADED-DATA', reminder: existingReminder })
            },
            (message) => {
              dispatch({ type: 'ERROR' })
              alertHelper.error(message)
              return
            }
          )
        }
      )
    }
  )

  const { reminder } = state

  return (
    <View style={styles.reminderInfo.view}>
      <View>
        <Picker
          selectedValue={reminderHelper.action(reminder)}
          onValueChange={(action) => {
            const updated = reminderHelper.changeField(state.reminder, state.changedReminder, 'action', action)
            dispatch({ type: 'UPDATED-DATA', reminder: updated.reminder, changedReminder: updated.changedReminder })
          }}>
          {
            Object.keys(reminderActions).map(
              (action) => {
                const label = reminderActions[action]
                return (<Picker.Item key={`reminder-action-${action}`} label={label} value={action} />)
              }
            )
          }
        </Picker>
      </View>

      <View>
        <Text>Delivery Method</Text>
        <View style={{ flexDirection: 'row' }}>
          <Checkbox
            value={valueHelper.isStringValue(reminderHelper.txtNumber(reminder))}
            onValueChange={
              (newValue) => {
                const txtNumber = valueHelper.isSet(newValue) ? patientHelper.mobilePhone(currentPatient) : ''
                const updated = reminderHelper.changeField(state.reminder, state.changedReminder, 'txt_number', txtNumber)
                dispatch({ type: 'UPDATED-DATA', reminder: updated.reminder, changedReminder: updated.changedReminder })
              }
            }
          />
          <Text>Text Message</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Checkbox
            value={valueHelper.isStringValue(reminderHelper.emailAddress(reminder))}
            onValueChange={
              (newValue) => {
                const emailAddress = valueHelper.isValue(newValue) ? patientHelper.email(currentPatient) : ''
                const updated = reminderHelper.changeField(state.reminder, state.changedReminder, 'email_address', emailAddress)
                dispatch({ type: 'UPDATED-DATA', reminder: updated.reminder, changedReminder: updated.changedReminder })
              }
            }
          />
          <Text>Email</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Checkbox
            value={valueHelper.isStringValue(reminderHelper.voiceNumber(reminder))}
            onValueChange={
              (newValue) => {
                const voiceNumber = valueHelper.isValue(newValue) ? patientHelper.phone(currentPatient) : ''
                const updated = reminderHelper.changeField(state.reminder, state.changedReminder, 'voice_number', voiceNumber)
                dispatch({ type: 'UPDATED-DATA', reminder: updated.reminder, changedReminder: updated.changedReminder })
              }
            }
          />
          <Text>Telephone</Text>
        </View>
      </View>
    </View>
  )

  function initialState() {
    const { reminder } = props.route.params
    return { needLoad: true, reminder }
  }

  function updateState(oldState, action) {
    switch (action.type) {
      case 'ERROR':
        return { ...oldState, needLoad: false }

      case 'LOADED-DATA':
        return { ...oldState, needLoad: false, reminder: action.reminder }

      case 'UPDATED_DATA':
        return { ...oldState, needLoad: false, reminder: action.reminder, changedReminder: action.changedReminder }

      default:
        return oldState
    }
  }
}

export { ReminderInfo }

const styles = StyleSheet.create(
  {
    reminderInfo: {
      view: { flexDirection: 'row' }
    }
  }
)
