import React from 'react'
import { Text, TextInput, View } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { AddressInput, AprexisModal, ContactInput } from '../components'
import { caregiverApi } from '../../api'
import { valueHelper, alertHelper, caregiverHelper, currentUserHelper, patientHelper } from "../../helpers"
import { relationships } from "../../types"
import { styles } from '../../assets/styles'

function CaregiverModal(props) {
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
      helper={caregiverHelper}
      loadEditModel={loadEditModel}
      onClose={onClose}
      updateModel={updateModel}
      visible={visible}
    />
  )

  function buildNewModel(onSuccess) {
    caregiverApi.buildNew(
      userCredentials,
      patientHelper.id(currentPatient),
      (model) => {
        const changedModel = caregiverHelper.buildNewChanged(model)
        onSuccess(model, changedModel)
      },
      alertHelper.handleError
    )
  }

  function createModel(changedModel, onSuccess) {
    caregiverApi.create(changedModel, onSuccess, alertHelper.handleError)
  }

  function displayModel(model, _changedModel, _fields, inlineStyles, changeValue, _setField) {
    return (
      <View style={inlineStyles.infoArea}>
        <View style={inlineStyles.profileFieldView}>
          <Text style={inlineStyles.profileFieldName}>First Name</Text>
          <TextInput
            style={styles.inputField}
            onChangeText={(firstName) => { changeValue('first_name', firstName) }}
            value={caregiverHelper.firstName(model)}
          />
        </View>

        <View style={inlineStyles.profileFieldView}>
          <Text style={inlineStyles.profileFieldName}>Last Name</Text>
          <TextInput
            style={styles.inputField}
            onChangeText={(lastName) => { changeValue('last_name', lastName) }}
            value={caregiverHelper.lastName(model)}
          />
        </View>

        <View style={inlineStyles.profileFieldView}>
          <Text style={inlineStyles.profileFieldName}>Relationship</Text>
          <Picker
            enabled={true}
            style={styles.inputField}
            selectedValue={caregiverHelper.relationship(model)}
            onValueChange={(relationship) => { changeValue('relationship', relationship) }}>
            {
              relationships.map(
                (relationship) => {
                  return (<Picker.Item key={`caregiver-relationship-${relationships}`} label={relationship} value={relationship} />)
                }
              )
            }
          </Picker>
        </View>

        <AddressInput addressable={model} onChangeValue={changeValue} />
        <ContactInput contactable={model} onChangeValue={changeValue} />
      </View>
    )
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
    caregiverApi.edit(userCredentials, caregiverHelper.id(caregiver), onSuccess, alertHelper.handleError)
  }

  function updateModel(changedModel, onSuccess) {
    if (!valueHelper.isValue(changedModel)) {
      onSuccess()
      return
    }

    caregiverApi.update(userCredentials, changedModel, onSuccess, alertHelper.handleError)
  }
}

export { CaregiverModal }
