import React from 'react'
import { Text, View } from 'react-native'
import Checkbox from 'expo-checkbox'
import { Picker } from '@react-native-picker/picker'
import { reminderApi } from '../../api'
import { AprexisModal, DateInput, NumberInput } from '../components'
import { valueHelper, dateHelper, reminderHelper, patientHelper, currentUserHelper } from "../../helpers"
import { reminderActions, reminderTypes } from '../../types'
import { themeColor, styles } from '../../assets/styles'

const daysOfWeek = {
  sunday: 'S',
  monday: 'M',
  tuesday: 'T',
  wednesday: 'W',
  thursday: 'Th',
  friday: 'F',
  saturday: 'Sa'
}

function DayOfWeekPicker({ reminder, dayOfWeek, onValueChange }) {
  const label = daysOfWeek[dayOfWeek]

  return (
    <View style={{ flexDirection: 'row', margin: 3 }}>
      <Checkbox
        color={themeColor.lightBlue}
        style={{ height: 20, width: 20 }}
        value={valueHelper.isSet(reminder[dayOfWeek])}
        onValueChange={(newValue) => onValueChange(dayOfWeek, newValue)}
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
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
      <Text style={[styles.inlineLabel, { marginLeft: 2, marginRight: 8 }]}>Day of Month</Text>
      <NumberInput style={styles.inlineLabel} value={`${dayOfMonth}`} onChangeText={onDayOfMonthChange} />
    </View>
  )
}

function ReminderModal(props) {
  const { currentPatient } = currentUserHelper.getCurrentProps(props)
  const { action, onClose, visible } = props
  const isNewReminder = action == 'ADD'
  const hasPhone = valueHelper.isStringValue(patientHelper.phone(currentPatient))
  const hasEmail = valueHelper.isStringValue(patientHelper.email(currentPatient))
  const hasMobilePhone = valueHelper.isStringValue(patientHelper.mobilePhone(currentPatient))

  return (
    <AprexisModal
      action={action}
      buildNewModel={buildNewModel}
      createModel={createModel}
      displayModel={displayModel}
      getChangedModelFrom={getChangedModelFrom}
      getModelFrom={getModelFrom}
      helper={reminderHelper}
      loadEditModel={loadEditModel}
      onClose={onClose}
      updateModel={updateModel}
      visible={visible}
    />
  )

  function buildNewModel(userCredentials, onSuccess, onError) {
    reminderApi.buildNew(
      userCredentials,
      currentPatient.id,
      (model) => {
        const changedModel = reminderHelper.buildNewChanged(model)
        onSuccess(model, changedModel)
      },
      onError
    )
  }

  function createModel(userCredentials, changedModel, onSuccess, onError) {
    reminderApi.create(userCredentials, changedModel, onSuccess, onError)
  }

  function displayModel(model, fields, inlineStyles, changeValue, setField) {
    return (
      <View style={inlineStyles.view}>
        <Picker
          style={styles.picker}
          enabled={isNewReminder}
          selectedValue={reminderHelper.action(model)}
          onValueChange={(action) => { changeValue('action', action) }}>
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
          <View style={{ flexDirection: "row", marginLeft: 6 }}>
            <View style={{ flexDirection: 'row', margin: 5, alignItems: 'center' }}>
              <Checkbox
                color={themeColor.lightBlue}
                style={{ height: 20, width: 20 }}
                disable={!hasMobilePhone}
                value={valueHelper.isStringValue(reminderHelper.txtNumber(model))}
                onValueChange={
                  (newValue) => {
                    const txtNumber = valueHelper.isSet(newValue) ? patientHelper.mobilePhone(currentPatient) : ''
                    changeValue('txt_number', txtNumber)
                  }
                }
              />
              <Text style={styles.inlineLabel}>Text Message</Text>
            </View>
            <View style={{ flexDirection: 'row', margin: 5, alignItems: 'center' }}>
              <Checkbox
                color={themeColor.lightBlue}
                style={{ height: 20, width: 20 }}
                disabled={!hasEmail}
                value={valueHelper.isStringValue(reminderHelper.emailAddress(model))}
                onValueChange={
                  (newValue) => {
                    const emailAddress = valueHelper.isSet(newValue) ? patientHelper.email(currentPatient) : ''
                    changeValue('email_address', emailAddress)
                  }
                }
              />
              <Text style={styles.inlineLabel}>Email</Text>
            </View>
            <View style={{ flexDirection: 'row', margin: 5, alignItems: 'center' }}>
              <Checkbox
                color={themeColor.lightBlue}
                style={{ height: 20, width: 20 }}
                disabled={!hasPhone}
                value={valueHelper.isStringValue(reminderHelper.voiceNumber(model))}
                onValueChange={
                  (newValue) => {
                    const voiceNumber = valueHelper.isSet(newValue) ? patientHelper.phone(currentPatient) : ''
                    changeValue('voice_number', voiceNumber)
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
            selectedValue={reminderHelper.type(model)}
            onValueChange={(type) => { changeValue('type', type) }}>
            {
              Object.keys(reminderTypes).map(
                (type) => {
                  const label = reminderTypes[type]
                  return (<Picker.Item key={`reminder-type-${type}`} label={label} value={type} />)
                }
              )
            }
          </Picker>
          <DaysOfWeekPicker reminder={model} onValueChange={changeValue} />
          <DayOfMonthPicker reminder={model} onDayOfMonthChange={(newValue) => { changeValue('day_of_month', newValue) }} />
        </View>

        <View style={styles.formRow}>
          <DateInput
            disabled={!isNewReminder}
            field='recur_from'
            label='Start Date'
            onChange={changeReminderDate}
            onPress={pressReminderDate}
            showPiucker={valueHelper.isSet(fields.showStartPicker)}
            value={dateHelper.makeDate(reminderHelper.recurFrom(model))}
          />
        </View>

        <View style={styles.formRow}>
          <DateInput
            field='recur_to'
            label='End Date'
            pickerProps={{ minimumDate: dateHelper.makeDate(reminderHelper.recurFrom(model)) }}
            onChange={changeReminderDate}
            onPress={pressReminderDate}
            showPicker={valueHelper.isSet(fields.showEndPicker)}
            value={dateHelper.makeDate(reminderHelper.recurTo(model))}
          />
        </View>
      </View>
    )

    function changeReminderDate(field, newDate) {
      changeValue(field, dateHelper.formatDate(newDate, 'yyyy-MM-dd'))
      switch (field) {
        case 'recur_from':
          setField('showStartPicker', false)
        case 'recur_to':
          setField('showEndPicker', false)
        default:
          break
      }
    }

    function pressReminderDate(field) {
      switch (field) {
        case 'recur_from':
          setField('showStartPicker', true)
        case 'recur_to':
          setField('showEndPicker', true)
        default:
          break
      }
    }
  }

  function getChangedModelFrom(hash) {
    const { changedReminder } = hash
    return changedReminder
  }

  function getModelFrom(hash) {
    const { reminder } = hash
    return reminder
  }

  function loadEditModel(userCredentials, onSuccess, onError) {
    const reminder = getModelFrom(props)
    reminderApi.edit(userCredentials, reminderHelper.id(reminder), onSuccess, onError)
  }

  function updateModel(userCredentials, changedModel, onSuccess, onError) {
    if (!valueHelper.isValue(changedModel)) {
      onSuccess()
      return
    }

    reminderApi.update(userCredentials, changedModel, onSuccess, onError)
  }
}

export { ReminderModal }
