import React, { useState } from 'react'
import { Text, View } from 'react-native'
import Checkbox from 'expo-checkbox'
import { Button, Menu } from 'react-native-paper'
import { AprexisModal, DateInput, NumberInput } from '../components'
import { reminderApi, valueHelper, dateHelper, reminderHelper, patientHelper, reminderActions, reminderTypes } from '@aprexis/aprexis-api-utility'
import { alertHelper, apiEnvironmentHelper } from '../../helpers'
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
  const { currentPatient, userCredentials, action, onClose, visible } = props
  const isNewReminder = action == 'ADD'
  const hasPhone = valueHelper.isStringValue(patientHelper.phone(currentPatient))
  const hasEmail = valueHelper.isStringValue(patientHelper.email(currentPatient))
  const hasMobilePhone = valueHelper.isStringValue(patientHelper.mobilePhone(currentPatient))
  const [actionVisible, setActionVisible] = useState(false)
  const [reminderTypeVisible, setReminderTypeVisible] = useState(false)
  const [forceUpdate, setForceUpdate] = useState(0)

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

  function buildNewModel(onSuccess) {
    const { patientMedication } = props
    reminderApi.buildNew(
      apiEnvironmentHelper.apiEnvironment(userCredentials),
      currentPatient.id,
      (model) => {
        const changedModel = reminderHelper.buildNewChanged(model)
        if (valueHelper.isValue(patientMedication)) {
          changedModel.reminder_medications = [
            { medication_id: patientMedication.medication_id }
          ]
        }
        onSuccess(model, changedModel)
      },
      alertHelper.handleError
    )
  }

  function createModel(changedModel, onSuccess) {
    reminderApi.create(apiEnvironmentHelper.apiEnvironment(userCredentials), changedModel, onSuccess, alertHelper.handleError)
  }

  function displayModel(model, _changedModel, fields, inlineStyles, changeValue, setField) {
    return (
      <View style={inlineStyles.view}>
        <Menu
          anchor={<Button onPress={openActionMenu}>{reminderActions[reminderHelper.action(model)]}</Button>}
          onDismiss={closeActionMenu}
          style={[styles.inputField, { fontSize: 15 }]}
          visible={valueHelper.isSet(actionVisible)}>
          {
            Object.keys(reminderActions).map(
              (action) => {
                const label = reminderActions[action]
                return (<Menu.Item key={`reminder-action-${action}`} title={label} onPress={() => { closeActionMenu(); changeValue('action', action) }} />)
              }
            )
          }
        </Menu>

        <View style={styles.formRow}>
          <Text style={styles.fieldLabel}>Delivery Method</Text>
          <View style={{ flexDirection: 'row', marginLeft: 6 }}>
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
          <Menu
            anchor={<Button onPress={openReminderTypeMenu}>{reminderTypes[reminderHelper.type(model)]}</Button>}
            disabled={!isNewReminder}
            onDismiss={closeReminderTypeMenu}
            style={[styles.inputField, { fontSize: 15 }]}
            visible={valueHelper.isSet(reminderTypeVisible)}>
            {
              Object.keys(reminderTypes).map(
                (type) => {
                  const label = reminderTypes[type]
                  return (<Menu.Item key={`reminder-type-${type}`} title={label} onPress={() => { closeReminderTypeMenu(); changeValue('type', type) }} />)
                }
              )
            }
          </Menu>
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
            showPicker={valueHelper.isSet(fields.showStartPicker)}
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
      switch (field) {
        case 'recur_from':
          setField('showStartPicker', false)
          break
        case 'recur_to':
          setField('showEndPicker', false)
          break
        default:
          break
      }
      changeValue(field, dateHelper.formatDate(newDate, 'yyyy-MM-dd'))
      setForceUpdate(forceUpdate + 1)
    }

    function closeActionMenu() {
      setActionVisible(false)
    }

    function closeReminderTypeMenu() {
      setReminderTypeVisible(false)
    }

    function openActionMenu() {
      setActionVisible(true)
    }

    function openReminderTypeMenu() {
      setReminderTypeVisible(true)
    }

    function pressReminderDate(field) {
      switch (field) {
        case 'recur_from':
          setField('showStartPicker', true)
          break
        case 'recur_to':
          setField('showEndPicker', true)
          break
        default:
          break
      }
      setForceUpdate(forceUpdate + 1)
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

  function loadEditModel(onSuccess) {
    const reminder = getModelFrom(props)
    reminderApi.edit(apiEnvironmentHelper.apiEnvironment(userCredentials), reminderHelper.id(reminder), onSuccess, alertHelper.handleError)
  }

  function updateModel(changedModel, onSuccess) {
    if (!valueHelper.isValue(changedModel)) {
      onSuccess()
      return
    }

    reminderApi.update(apiEnvironmentHelper.apiEnvironment(userCredentials), changedModel, onSuccess, alertHelper.handleError)
  }
}

export { ReminderModal }
