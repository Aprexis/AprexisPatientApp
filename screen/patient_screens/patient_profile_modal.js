import React from 'react'
import { Text, View } from 'react-native'
import { AddressInput, AprexisModal, ContactInput, NameInput } from '../components'
import { patientApi } from '../../api'
import { valueHelper, alertHelper, currentUserHelper, patientHelper } from "../../helpers"

function PatientProfileModal(props) {
  const { onClose, visible } = props
  const { currentPatient, userCredentials } = currentUserHelper.getCurrentProps(props)

  return (
    <AprexisModal
      action='EDIT'
      displayModel={displayModel}
      getChangedModelFrom={getChangedModelFrom}
      getModelFrom={getModelFrom}
      helper={patientHelper}
      loadEditModel={loadEditModel}
      onClose={() => {
        patientApi.show(userCredentials, patientHelper.id(currentPatient), onClose, alertHelper.handleError)
      }}
      updateModel={updateModel}
      visible={visible}
    />
  )

  function displayModel(model, _changedModel, _fields, inlineStyles, changeValue, _setField) {
    return (
      <View style={inlineStyles.infoArea}>
        <NameInput allowNiddleName={true} named={model} onChangeValue={changeValue} />

        <AddressInput addressable={model} onChangeValue={changeValue} />
        <ContactInput contactable={model} onChangeValue={changeValue} />
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
    patientApi.edit(userCredentials, patientHelper.id(currentPatient), onSuccess, alertHelper.handleError)
  }

  function updateModel(changedModel, onSuccess) {
    if (!valueHelper.isValue(changedModel)) {
      onSuccess()
      return
    }

    patientApi.update(userCredentials, changedModel, onSuccess, alertHelper.handleError)
  }
}

export { PatientProfileModal }
