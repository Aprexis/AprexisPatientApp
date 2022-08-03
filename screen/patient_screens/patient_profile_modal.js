import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker'
import { AddressInput, AprexisModal, ContactInput, GenderInput, NameInput } from '../components'
import { patientApi, valueHelper, patientHelper, dateHelper } from '@aprexis/aprexis-api-utility'
import { alertHelper, apiEnvironmentHelper } from '../../helpers'

function DateOfBirthInput({ model, inlineStyles, onChangeValue }) {
  const [show, setShow] = useState(false)

  return (
    <View style={inlineStyles.profileFieldView}>
      <Text style={inlineStyles.profileFieldName}>Date of Birth</Text>
      <Button onPress={openPicker}>{dateHelper.displayDate(dateOfBirth())}</Button>
      {
        show &&
        <DateTimePicker mode='date' onChange={changeValue} value={dateOfBirth()} />
      }
    </View>
  )

  function changeValue(event, selectedDate) {
    if (event.type == 'set' && (+selectedDate != +dateOfBirth())) {
      onChangeValue('date_of_birth', selectedDate)
    }

    closePicker()
  }

  function closePicker() {
    setTimeout(() => null) // Without this, the user has to press on the view area to make the picker close.
    setShow(false)
  }

  function dateOfBirth() {
    const dateOfBirth = patientHelper.dateOfBirth(model)
    if (dateHelper.isDateValue(dateOfBirth)) {
      return dateHelper.makeDate(dateOfBirth)
    }

    return new Date()
  }

  function openPicker() {
    setTimeout(() => null) // Without this, the user has to press on the view area to make the picker open.
    setShow(true)
  }
}

function ShowHealthPlan({ inlineStyles, model }) {
  return (
    <React.Fragment>
      <View style={inlineStyles.profileFieldView}>
        <Text style={inlineStyles.profileFieldName}>{patientHelper.healthPlanName(model)}</Text>
        <Text style={inlineStyles.profileFieldName}>{patientHelper.healthPlanNumber(model)}</Text>
      </View>

      <View style={inlineStyles.profileFieldView}>
        <Text style={inlineStyles.profileFieldName}>Coverage Dates</Text>
        <Text style={inlineStyles.profileFieldName}>
          {dateHelper.displayDate(patientHelper.coverageEffectiveDate(model))} - {dateHelper.displayDate(patientHelper.coverageEndDate(model))}
        </Text>
      </View>
    </React.Fragment>
  )
}

function PatientProfileModal(props) {
  const { currentPatient, onClose, userCredentials, visible } = props

  return (
    <AprexisModal
      action='EDIT'
      displayModel={displayModel}
      getChangedModelFrom={getChangedModelFrom}
      getModelFrom={getModelFrom}
      helper={patientHelper}
      loadEditModel={loadEditModel}
      onClose={() => {
        patientApi.show(apiEnvironmentHelper.apiEnvironment(userCredentials), patientHelper.id(currentPatient), onClose, alertHelper.handleError)
      }}
      updateModel={updateModel}
      visible={visible}
    />
  )

  function displayModel(model, _changedModel, _fields, inlineStyles, changeValue, _setField) {
    return (
      <View style={inlineStyles.infoArea}>
        <ShowHealthPlan inlineStyles={inlineStyles} model={model} />
        <NameInput allowMiddleName={true} named={model} onChangeValue={changeValue} />
        <DateOfBirthInput inlineStyles={inlineStyles} model={model} onChangeValue={changeValue} />
        <GenderInput gendered={model} helper={patientHelper} inlineStyles={inlineStyles} onChangeValue={changeValue} />
        <AddressInput addressable={model} onChangeValue={changeValue} />
        <ContactInput allowPreferredMethod={true} contactable={model} onChangeValue={changeValue} />
      </View>
    )
  }

  function getChangedModelFrom(hash) {
    const { changedPatient } = hash
    return changedPatient
  }

  function getModelFrom(hash) {
    const { patient } = hash
    return patient
  }

  function loadEditModel(onSuccess) {
    patientApi.edit(apiEnvironmentHelper.apiEnvironment(userCredentials), patientHelper.id(currentPatient), onSuccess, alertHelper.handleError)
  }

  function updateModel(changedModel, onSuccess) {
    if (!valueHelper.isValue(changedModel)) {
      onSuccess()
      return
    }

    patientApi.update(apiEnvironmentHelper.apiEnvironment(userCredentials), changedModel, onSuccess, alertHelper.handleError)
  }
}

export { PatientProfileModal }
