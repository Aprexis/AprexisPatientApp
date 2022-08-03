import React from 'react'
import { Text, View } from 'react-native'
import Checkbox from 'expo-checkbox'
import { AprexisModal, SelectHcpId } from '../components'
import { patientPhysicianApi, valueHelper, patientPhysicianHelper, patientHelper } from '@aprexis/aprexis-api-utility'
import { alertHelper, apiEnvironmentHelper } from '../../helpers'
import { themeColor } from '../../assets/styles'

function PatientHcpModal(props) {
  const { action, currentPatient, userCredentials, onClose, visible } = props

  return (
    <AprexisModal
      action={action}
      buildNewModel={buildNewModel}
      createModel={createModel}
      displayModel={displayModel}
      getChangedModelFrom={getChangedModelFrom}
      getModelFrom={getModelFrom}
      helper={patientPhysicianHelper}
      loadEditModel={loadEditModel}
      onClose={onClose}
      updateModel={updateModel}
      visible={visible}
    />
  )

  function buildNewModel(onSuccess) {
    if (!valueHelper.isValue(currentPatient)) {
      return
    }

    patientPhysicianApi.buildNew(
      apiEnvironmentHelper.apiEnvironment(userCredentials),
      patientHelper.id(currentPatient),
      (model) => {
        const changedModel = patientPhysicianHelper.buildNewChanged(model)
        onSuccess(model, changedModel)
      },
      alertHelper.handleError
    )
  }

  function createModel(changedModel, onSuccess) {
    patientPhysicianApi.create(apiEnvironmentHelper.apiEnvironment(userCredentials), changedModel, onSuccess, alertHelper.handleError)
  }

  function displayModel(model, _changedModel, _fields, inlineStyles, changeValue, _setField) {
    return (
      <View style={inlineStyles.infoArea}>
        <View style={inlineStyles.profileFieldView}>
          <Text style={inlineStyles.profileFieldName}>HCP</Text>
          <Text style={inlineStyles.profileFieldName}>{patientPhysicianHelper.physicianLabel(model)}</Text>
        </View>

        {
          !valueHelper.isNumberValue(patientPhysicianHelper.id(model)) &&
          <SelectHcpId
            hcp={patientPhysicianHelper.physician(model)}
            updateHcp={updateHcp}
            userCredentials={userCredentials}
          />
        }

        <View style={inlineStyles.profileFieldView}>
          <Text style={inlineStyles.profileFieldName}>Primary</Text>
          <Checkbox
            color={themeColor.lightBlue}
            style={{ height: 20, width: 20 }}
            value={valueHelper.isSet(patientPhysicianHelper.primary(model))}
            onValueChange={changeValue}
          />
        </View>
      </View>
    )

    function updateHcp(id, hcp) {
      changeValue(['physician_id', 'physician'], [id, hcp])
    }
  }

  function getChangedModelFrom(hash) {
    const { changedPatientHcp } = hash
    return changedPatientHcp
  }

  function getModelFrom(hash) {
    const { patientHcp } = hash
    return patientHcp
  }

  function loadEditModel(onSuccess) {
    const patientHcp = getModelFrom(props)
    if (!valueHelper.isValue(patientHcp)) {
      return
    }

    patientPhysicianApi.edit(apiEnvironmentHelper.apiEnvironment(userCredentials), patientPhysicianHelper.id(patientHcp), onSuccess, alertHelper.handleError)
  }

  function updateModel(changedModel, onSuccess) {
    if (!valueHelper.isValue(changedModel)) {
      onSuccess()
      return
    }

    patientPhysicianApi.update(apiEnvironmentHelper.apiEnvironment(userCredentials), changedModel, onSuccess, alertHelper.handleError)
  }
}

export { PatientHcpModal }
