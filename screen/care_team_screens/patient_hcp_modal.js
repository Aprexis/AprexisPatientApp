import React from 'react'
import { Text, View } from 'react-native'
import Checkbox from 'expo-checkbox'
import { AprexisModal, SelectId } from '../components'
import { hcpApi, patientHcpApi } from '../../api'
import { valueHelper, alertHelper, patientHcpHelper, currentUserHelper, patientHelper, hcpHelper } from "../../helpers"
import { themeColor } from '../../assets/styles'

function SelectHcpId(props) {
  const { hcp, updateHcp } = props
  const { userCredentials } = currentUserHelper.getCurrentProps(props)

  return (
    <SelectId
      changeId={changeId}
      id={hcpHelper.id(hcp)}
      matchString={hcpHelper.name(hcp)}
      optionId={hcpHelper.id}
      optionLabel={hcpHelper.label}
      search={search}
      selectType='HCP'
      selectTypePlural='HCPs'
    />
  )

  function changeId(id) {
    hcpApi.show(userCredentials, id, (hcp) => { updateHcp(id, hcp) }, alertHelper.handleError)
  }

  function search(matchString, onSuccess) {
    const params = {
      for_physician: matchString,
      page: { number: 1, size: 10 },
      sort: 'last_name,first_name,middle_name,npi,city,state'
    }
    hcpApi.search(
      userCredentials,
      params,
      (physicians, _pageHeaders) => { onSuccess(physicians) },
      alertHelper.handleError
    )
  }
}

function PatientHcpModal(props) {
  const { action, onClose, visible } = props
  const { currentPatient, userCredentials } = currentUserHelper.getCurrentProps(props)

  return (
    <AprexisModal
      action={action}
      buildNewModel={buildNewModel}
      createModel={createModel}
      displayModel={displayModel}
      getChangedModelFrom={getChangedModelFrom}
      getModelFrom={getModelFrom}
      helper={patientHcpHelper}
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

    patientHcpApi.buildNew(
      userCredentials,
      patientHelper.id(currentPatient),
      (model) => {
        const changedModel = patientHcpHelper.buildNewChanged(model)
        onSuccess(model, changedModel)
      },
      alertHelper.handleError
    )
  }

  function createModel(changedModel, onSuccess) {
    patientHcpApi.create(userCredentials, changedModel, onSuccess, alertHelper.handleError)
  }

  function displayModel(model, _changedModel, _fields, inlineStyles, changeValue, _setField) {
    return (
      <View style={inlineStyles.infoArea}>
        <View style={inlineStyles.profileFieldView}>
          <Text style={inlineStyles.profileFieldName}>HCP</Text>
          <Text style={inlineStyles.profileFieldName}>{patientHcpHelper.hcpLabel(model)}</Text>
        </View>

        {
          !valueHelper.isNumberValue(patientHcpHelper.id(model)) &&
          <SelectHcpId
            hcp={patientHcpHelper.hcp(model)}
            updateHcp={updateHcp}
            userCredentials={userCredentials}
          />
        }

        <View style={inlineStyles.profileFieldView}>
          <Text style={inlineStyles.profileFieldName}>Primary</Text>
          <Checkbox
            color={themeColor.lightBlue}
            style={{ height: 20, width: 20 }}
            value={valueHelper.isSet(patientHcpHelper.primary(model))}
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

    patientHcpApi.edit(userCredentials, patientHcpHelper.id(patientHcp), onSuccess, alertHelper.handleError)
  }

  function updateModel(changedModel, onSuccess) {
    if (!valueHelper.isValue(changedModel)) {
      onSuccess()
      return
    }

    patientHcpApi.update(userCredentials, changedModel, onSuccess, alertHelper.handleError)
  }
}

export { PatientHcpModal }
