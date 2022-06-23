import React, { useEffect, useReducer } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import Checkbox from 'expo-checkbox'
import { Picker } from '@react-native-picker/picker'
import { reminderApi } from '../../api'
import { DateInput, NumberInput } from '../components'
import { valueHelper, alertHelper, dateHelper, reminderHelper, userCredentialsHelper, patientHelper, currentUserHelper } from "../../helpers"
import { reminderActions, reminderTypes } from '../../types'
import { themeColor } from '../../assets/styles.js'
import styles from '../../assets/styles.js'

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
    <View style={{ flexDirection: 'row', margin:3 }}>
      <Checkbox
        color={themeColor.lightBlue}
        style={{height:20, width:20}}
        value={valueHelper.isSet(reminder[dayOfWeek])}
        onValueChange={(newValue) => onValueChange(reminder, changedReminder, dayOfWeek, newValue)}
      />
      <Text style={styles.inlineLabel}>{label}</Text>
    </View>
  )
}

function DaysOfWeekPicker({ reminder, changedReminder, onValueChange }) {
  if (reminderHelper.type(reminder) != 'WeeklyReminder') {
    return null
  }

  return (
    <View style={[styles.formRow, { flexDirection: 'row' }]}>
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

  const value = reminderHelper.dayOfMonth(reminder)
  const dayOfMonth = valueHelper.isNumberValue(value) ? value : 1

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop:6 }}>
      <Text style={[styles.inlineLabel, { marginLeft: 2, marginRight: 8 }]}>Day of Month</Text>
      <NumberInput style={styles.inlineLabel} value={`${dayOfMonth}`} onChangeText={onDayOfMonthChange} />
    </View>
  )
}

function ReminderInfo(props) {
  const [state, dispatch] = useReducer(updateState, initialState())
  const { currentPatient } = currentUserHelper.getCurrentProps(props)

  useEffect(
    () => {
      if (!state.needLoad) {
        return
      }

      const { patientMedication, reminder } = state

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
                let updated = { reminder: newReminder }
                if (valueHelper.isValue(patientMedication)) {
                  updated = reminderHelper.addPatientMedication(updated.reminder, updated.changedReminder, patientMedication)
                }
                dispatch({ type: 'LOAD-DATA', reminder: updated.reminder, changedReminder: updated.changedReminder })
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
  const hasPhone = valueHelper.isStringValue(patientHelper.phone(currentPatient))
  const hasEmail = valueHelper.isStringValue(patientHelper.email(currentPatient))
  const hasMobilePhone = valueHelper.isStringValue(patientHelper.mobilePhone(currentPatient))

  return (
    <View style={inlineStyles.view}>
      <Picker
        style={styles.picker}
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
      <View style={styles.formRow}>
        <Text style={styles.fieldLabel}>Delivery Method</Text>
        <View style={{ flexDirection: "row", marginLeft:6 }}>
          <View style={{ flexDirection: 'row', margin:5, alignItems:'center' }}>
            <Checkbox
              color={themeColor.lightBlue}
              style={{height:20, width:20}}
              disable={!hasMobilePhone}
              value={valueHelper.isStringValue(reminderHelper.txtNumber(reminder))}
              onValueChange={
                (newValue) => {
                  const txtNumber = valueHelper.isSet(newValue) ? patientHelper.mobilePhone(currentPatient) : ''
                  const updated = reminderHelper.changeField(reminder, changedReminder, 'txt_number', txtNumber)
                  dispatch({ type: 'UPDATE-DATA', reminder: updated.reminder, changedReminder: updated.changedReminder })
                }
              }
            />
            <Text style={styles.inlineLabel}>Text Message</Text>
          </View>
          <View style={{ flexDirection: 'row', margin:5, alignItems:'center' }}>
            <Checkbox
              color={themeColor.lightBlue}
              style={{height:20, width:20}}
              disabled={!hasEmail}
              value={valueHelper.isStringValue(reminderHelper.emailAddress(reminder))}
              onValueChange={
                (newValue) => {
                  const emailAddress = valueHelper.isSet(newValue) ? patientHelper.email(currentPatient) : ''
                  const updated = reminderHelper.changeField(reminder, changedReminder, 'email_address', emailAddress)
                  dispatch({ type: 'UPDATE-DATA', reminder: updated.reminder, changedReminder: updated.changedReminder })
                }
              }
            />
            <Text style={styles.inlineLabel}>Email</Text>
          </View>
          <View style={{ flexDirection: 'row', margin:5, alignItems:'center' }}>
            <Checkbox
              color={themeColor.lightBlue}
              style={{height:20, width:20}}
              disabled={!hasPhone}
              value={valueHelper.isStringValue(reminderHelper.voiceNumber(reminder))}
              onValueChange={
                (newValue) => {
                  const voiceNumber = valueHelper.isSet(newValue) ? patientHelper.phone(currentPatient) : ''
                  const updated = reminderHelper.changeField(reminder, changedReminder, 'voice_number', voiceNumber)
                  dispatch({ type: 'UPDATE-DATA', reminder: updated.reminder, changedReminder: updated.changedReminder })
                }
              }
            />
            <Text style={styles.inlineLabel}>Telephone</Text>
          </View>
        </View>
      </View>

      <View>
        <Picker
          style={styles.picker}
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

      <View style={styles.formRow}>
        <DateInput
          disabled={!isNewReminder}
          field='recur_from'
          label='Start Date'
          onChange={changeReminderDate}
          onPress={pressReminderDate}
          showPiucker={state.showStartPicker}
          value={dateHelper.makeDate(reminderHelper.recurFrom(reminder))}
        />
      </View>

      <View style={styles.formRow}>
        <DateInput
          field='recur_to'
          label='End Date'
          pickerProps={{ minimumDate: dateHelper.makeDate(reminderHelper.recurFrom(reminder)) }}
          onChange={changeReminderDate}
          onPress={pressReminderDate}
          showPicker={state.showEndPicker}
          value={dateHelper.makeDate(reminderHelper.recurTo(reminder))}
        />
      </View>

      <View style={{ flexDirection: 'row', justifyContent:'flex-end' }}>
        <Button
          mode="contained" 
          onPress={ok} 
          contentStyle={{ height:30 }}
          labelStyle={{ color: themeColor.darkBlue }}
          color={themeColor.brightBlue}
          compact='true'>
          Save
        </Button>
      </View>
    </View >
  )

  function cancel() {
    const { navigation } = props

    navigation.pop()
  }

  function changeDayOfWeek(reminder, changedReminder, dayOfWeek, newValue) {
    const updated = reminderHelper.changeField(reminder, changedReminder, dayOfWeek, newValue)
    dispatch({ type: 'UPDATE-DATA', reminder: updated.reminder, changedReminder: updated.changedReminder })
  }

  function changeDayOfMonth(newValue) {
    const { reminder, changedReminder } = state
    const updated = reminderHelper.changeField(reminder, changedReminder, 'day_of_month', newValue)
    dispatch({ type: 'UPDATE-DATA', reminder: updated.reminder, changedReminder: updated.changedReminder })
  }

  function changeReminderDate(field, newDate) {
    const { reminder, changedReminder } = state
    const updated = reminderHelper.changeField(reminder, changedReminder, field, dateHelper.formatDate(newDate, 'yyyy-MM-dd'))
    dispatch({ type: 'UPDATE-DATA', reminder: updated.reminder, changedReminder: updated.changedReminder })
  }

  function initialState() {
    const { patientMedication, reminder } = props.route.params
    return { needLoad: true, patientMedication, reminder, showStartPicker: false, showEndPicker: false }
  }

  function ok() {
    const { navigation } = props

    userCredentialsHelper.getUserCredentials(
      (userCredentials) => {
        const { reminder, changedReminder } = state
        if (!valueHelper.isValue(userCredentials)) {
          return
        }

        if (!valueHelper.isNumberValue(reminderHelper.id(reminder))) {
          reminderApi.create(
            userCredentials,
            changedReminder,
            (_newReminder) => { navigation.pop() },
            (message) => {
              dispatch({ type: 'ERROR' })
              alertHelper.error(message)
              return
            }
          )
          return
        }

        if (!valueHelper.isValue(changedReminder)) {
          navigation.pop()
          return
        }

        reminderApi.update(
          userCredentials,
          changedReminder,
          (_updatedReminder) => { navigation.pop() },
          (message) => {
            dispatch({ type: 'ERROR' })
            alertHelper.error(message)
            return
          }
        )
      }
    )
  }

  function pressReminderDate(field) {
    switch (field) {
      case 'recur_from':
        dispatch({ type: 'SHOW-START-PICKER', showStartPicker: true })
      case 'recur_to':
        dispatch({ type: 'SHOW-END-PICKER', showEndPicker: true })
      default:
        break
    }
  }

  function updateState(oldState, action) {
    switch (action.type) {
      case 'ERROR':
        return { ...oldState, needLoad: false }

      case 'LOAD-DATA':
        return { ...oldState, needLoad: false, reminder: action.reminder }

      case 'SHOW-START-PICKER':
        return { ...oldState, showStartPicker: action.showStartPicker }

      case 'SHOW-END-PICKER':
        return { ...oldState, showEndPicker: action.showEndPicker }

      case 'UPDATE-DATA':
        return { ...oldState, needLoad: false, reminder: action.reminder, changedReminder: action.changedReminder, showStartPicker: false, showEndPicker: false }

      default:
        return oldState
    }
  }
}

export { ReminderInfo }

const inlineStyles = StyleSheet.create(
  {
    view: { flex: 1, flexDirection: 'column', backgroundColor:themeColor.lightBg, paddingTop:12 }
  }
)
