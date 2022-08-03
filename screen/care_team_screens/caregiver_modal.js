import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { Button, Menu } from 'react-native-paper'
import { AddressInput, AprexisModal, ContactInput, NameInput } from '../components'
import { caregiverApi, valueHelper, caregiverHelper, patientHelper, relationships } from '@aprexis/aprexis-api-utility'
import { alertHelper, apiEnvironmentHelper } from '../../helpers'
import { styles } from '../../assets/styles'

function CaregiverModal(props) {
  const { action, currentPatient, userCredentials, onClose, visible } = props
  const [relationshipVisible, setRelationshipVisible] = useState(false)

  return (
    <AprexisModal
      action={action}
      buildNewModel={buildNewModel}
      createModel={createModel}
      displayModel={displayModel}
      getChangedModelFrom={getChangedModelFrom}
      getModelFrom={getModelFrom}
      helper={caregiverHelper}
      loadEditModel={loadEditModel}
      onClose={onClose}
      updateModel={updateModel}
      visible={visible}
    />
  )

  function buildNewModel(onSuccess) {
    caregiverApi.buildNew(
      apiEnvironmentHelper.apiEnvironment(userCredentials),
      patientHelper.id(currentPatient),
      (model) => {
        const changedModel = caregiverHelper.buildNewChanged(model)
        onSuccess(model, changedModel)
      },
      alertHelper.handleError
    )
  }

  function createModel(changedModel, onSuccess) {
    caregiverApi.create(apiEnvironmentHelper.apiEnvironment(userCredentials), changedModel, onSuccess, alertHelper.handleError)
  }

  function displayModel(model, _changedModel, _fields, inlineStyles, changeValue, _setField) {
    return (
      <View style={inlineStyles.infoArea}>
        <NameInput named={model} onChangeValue={changeValue} />

        <View style={inlineStyles.profileFieldView}>
          <Text style={inlineStyles.profileFieldName}>Relationship</Text>
          <Menu
            anchor={<Button onPress={openMenu}>{caregiverHelper.relationship(model)}</Button>}
            onDismiss={closeMenu}
            style={[styles.inputField, { fontSize: 15 }]}
            visible={valueHelper.isSet(relationshipVisible)}>
            {
              relationships.map(
                (relationship, idx) => {
                  return (<Menu.Item key={`caregiver-relationship-${idx}`} title={relationship} onPress={() => { closeMenu(); changeValue('relationship', relationship) }} />)
                }
              )
            }
          </Menu>
        </View>

        <AddressInput addressable={model} onChangeValue={changeValue} />
        <ContactInput allowPhoneExtension={true} contactable={model} onChangeValue={changeValue} />
      </View>
    )

    function openMenu() {
      setRelationshipVisible(true)
    }

    function closeMenu() {
      setRelationshipVisible(false)
    }
  }

  function getChangedModelFrom(hash) {
    const { changedCaregiver } = hash
    return changedCaregiver
  }

  function getModelFrom(hash) {
    const { caregiver } = hash
    return caregiver
  }

  function loadEditModel(onSuccess) {
    const caregiver = getModelFrom(props)
    caregiverApi.edit(apiEnvironmentHelper.apiEnvironment(userCredentials), caregiverHelper.id(caregiver), onSuccess, alertHelper.handleError)
  }

  function updateModel(changedModel, onSuccess) {
    if (!valueHelper.isValue(changedModel)) {
      onSuccess()
      return
    }

    caregiverApi.update(apiEnvironmentHelper.apiEnvironment(userCredentials), changedModel, onSuccess, alertHelper.handleError)
  }
}

export { CaregiverModal }
