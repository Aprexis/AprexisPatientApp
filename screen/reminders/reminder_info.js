import React, { useEffect, useReducer } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Checkbox from 'expo-checkbox'
import { Picker } from '@react-native-picker/picker'
import { reminderApi } from '../../api'
import { NumberInput } from '../components'
import { valueHelper, alertHelper, reminderHelper, userCredentialsHelper, patientHelper } from "../../helpers"
import { reminderActions, reminderTypes } from '../../types'

const daysOfWeek = {
  sunday: 'S',
  monday: 'M',
  tuesday: 'T',
  wednesday: 'W',
  thursday: 'Th',
  friday: 'F',
  saturday: 'Sa'
}

function DayOfWeekPicker({ reminder, changedReminder, dayOfWeek, onValueChange }) {
  const label = daysOfWeek[dayOfWeek]

  return (
    <View style={{ flexDirection: 'row', margin: 2 }}>
      <Checkbox
        value={valueHelper.isSet(reminder[dayOfWeek])}
        onValueChange={(newValue) => onValueChange(reminder, changedReminder, dayOfWeek, newValue)}
      />
      <Text>{label}</Text>
    </View>
  )
}

function DaysOfWeekPicker({ reminder, changedReminder, onValueChange }) {
  if (reminderHelper.type(reminder) != 'WeeklyReminder') {
    return null
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      {
        Object.keys(daysOfWeek).map(
          (dayOfWeek) => (
            <DayOfWeekPicker
              key={`reminder-day-of-week-${dayOfWeek}`}
              reminder={reminder}
              changedReminder={changedReminder}
              dayOfWeek={dayOfWeek}
              onValueChange={onValueChange} />
          )
        )
      }
    </View>
  )
}

function DayOfMonthPicker({ reminder, onDayOfMonthChange }) {
  if (reminderHelper.type(reminder) != 'MonthlyReminder') {
    return null
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      <Text style={{ margin: 8 }}>Day of Month</Text>
      <NumberInput value={`${reminderHelper.dayOfMonth(reminder)}`} onChangeText={onDayOfMonthChange} />
    </View>
  )
}

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
                dispatch({ type: 'LOAD-DATA', reminder: newReminder })
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
              dispatch({ type: 'LOAD-DATA', reminder: existingReminder })
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

  const { reminder, changedReminder } = state
  const isNewReminder = !valueHelper.isNumberValue(reminderHelper.id(reminder))

  return (
    <View style={styles.reminderInfo.view}>
      <View>
        <Picker
          enabled={isNewReminder}
          selectedValue={reminderHelper.action(reminder)}
          onValueChange={(action) => {
            const updated = reminderHelper.changeField(reminder, changedReminder, 'action', action)
            dispatch({ type: 'UPDATE-DATA', reminder: updated.reminder, changedReminder: updated.changedReminder })
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
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: 'row', margin: 2 }}>
            <Checkbox
              value={valueHelper.isStringValue(reminderHelper.txtNumber(reminder))}
              onValueChange={
                (newValue) => {
                  const txtNumber = valueHelper.isSet(newValue) ? patientHelper.mobilePhone(currentPatient) : ''
                  const updated = reminderHelper.changeField(reminder, changedReminder, 'txt_number', txtNumber)
                  dispatch({ type: 'UPDATE-DATA', reminder: updated.reminder, changedReminder: updated.changedReminder })
                }
              }
            />
            <Text>Text Message</Text>
          </View>
          <View style={{ flexDirection: 'row', margin: 2 }}>
            <Checkbox
              value={valueHelper.isStringValue(reminderHelper.emailAddress(reminder))}
              onValueChange={
                (newValue) => {
                  const emailAddress = valueHelper.isValue(newValue) ? patientHelper.email(currentPatient) : ''
                  const updated = reminderHelper.changeField(reminder, changedReminder, 'email_address', emailAddress)
                  dispatch({ type: 'UPDATE-DATA', reminder: updated.reminder, changedReminder: updated.changedReminder })
                }
              }
            />
            <Text>Email</Text>
          </View>
          <View style={{ flexDirection: 'row', margin: 2 }}>
            <Checkbox
              value={valueHelper.isStringValue(reminderHelper.voiceNumber(reminder))}
              onValueChange={
                (newValue) => {
                  const voiceNumber = valueHelper.isValue(newValue) ? patientHelper.phone(currentPatient) : ''
                  const updated = reminderHelper.changeField(reminder, changedReminder, 'voice_number', voiceNumber)
                  dispatch({ type: 'UPDATE-DATA', reminder: updated.reminder, changedReminder: updated.changedReminder })
                }
              }
            />
            <Text>Telephone</Text>
          </View>
        </View>
      </View>

      <View>
        <Picker
          enabled={isNewReminder}
          selectedValue={reminderHelper.type(reminder)}
          onValueChange={(type) => {
            const updated = reminderHelper.changeField(reminder, changedReminder, 'type', type)
            dispatch({ type: 'UPDATE-DATA', reminder: updated.reminder, changedReminder: updated.changedReminder })
          }}>
          {
            Object.keys(reminderTypes).map(
              (type) => {
                const label = reminderTypes[type]
                return (<Picker.Item key={`reminder-type-${type}`} label={label} value={type} />)
              }
            )
          }
        </Picker>

        <DaysOfWeekPicker reminder={reminder} changedReminder={changedReminder} onValueChange={changeDayOfWeek} />
        <DayOfMonthPicker reminder={reminder} onDayOfMonthChange={changeDayOfMonth} />
      </View>
    </View >
  )

  function changeDayOfWeek(reminder, changedReminder, dayOfWeek, newValue) {
    const updated = reminderHelper.changeField(reminder, changedReminder, dayOfWeek, newValue)
    dispatch({ type: 'UPDATE-DATA', reminder: updated.reminder, changedReminder: updated.changedReminder })
  }

  function changeDayOfMonth(newValue) {
    const { reminder, changedReminder } = state
    const updated = reminderHelper.changeField(reminder, changedReminder, 'day_of_month', newValue)
    dispatch({ type: 'UPDATE-DATA', reminder: updated.reminder, changedReminder: updated.changedReminder })
  }

  function initialState() {
    const { reminder } = props.route.params
    return { needLoad: true, reminder }
  }

  function updateState(oldState, action) {
    switch (action.type) {
      case 'ERROR':
        return { ...oldState, needLoad: false }

      case 'LOAD-DATA':
        return { ...oldState, needLoad: false, reminder: action.reminder }

      case 'UPDATE-DATA':
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
      view: { flex: 1, flexDirection: 'column' }
    }
  }
)