import React from 'react'
import { Text, TextInput, View } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { AprexisModal, NumberInput } from "../components"
import { patientAllergyApi } from '../../api'
import { valueHelper, currentUserHelper, patientAllergyHelper } from "../../helpers"
import { allergyCategories } from '../../types'
import { styles } from '../../assets/styles'

function PatientAllergyModal(props) {
  const { action, allergyType, onClose, visible } = props
  const { currentPatient } = currentUserHelper.getCurrentProps(props)

  return (
    <AprexisModal
      action={action}
      buildNewModel={buildNewModel}
      createModel={createModel}
      displayModel={displayModel}
      getChangedModelFrom={getChangedModelFrom}
      getModelFrom={getModelFrom}
      helper={patientAllergyHelper}
      loadEditModel={loadEditModel}
      onClose={onClose}
      updateModel={updateModel}
      visible={visible}
    />
  )

  function buildNewModel(userCredentials, onSuccess, onError) {
    patientAllergyApi.buildNew(
      userCredentials,
      currentPatient.id,
      (model) => {
        const changedModel = patientAllergyHelper.buildNewChanged(model)
        onSuccess(model, changedModel)
      },
      onError
    )
  }

  function createModel(userCredentials, changedModel, onSuccess, onError) {
    patientAllergyApi.create(userCredentials, changedModel, onSuccess, onError)
  }

  function displayModel(model, _fields, inlineStyles, changeValue, _setField) {
    const isNewPatientAllergy = action == 'ADD'
    let year = patientAllergyHelper.year(model)
    if (!valueHelper.isNumberValue(year)) {
      year = 0
    }

    return (
      <View style={inlineStyles.infoArea}>
        <View style={inlineStyles.profileFieldView}>
          <Text style={inlineStyles.profileFieldName}>Name</Text>
          <TextInput
            editable={isNewPatientAllergy}
            style={styles.inputField}
            onChangeText={(allergyName) => { changeValue('allergy_name', allergyName) }}
            value={patientAllergyHelper.allergyName(model)}
          />
        </View>

        <View style={inlineStyles.profileFieldView}>
          <Text style={inlineStyles.profileFieldName}>Type</Text>
          <Picker
            style={[styles.inputField, { fontSize: 15 }]}
            enabled={!valueHelper.isStringValue(allergyType)}
            selectedValue={patientAllergyHelper.allergyType(model)}
            onValueChange={(allergyType) => { changeValue('allergy_type', allergyType) }}>
            {
              allergyCategories.map(
                (allergyType) => {
                  return (<Picker.Item key={`allergy-type-${allergyType}`} label={allergyType} value={allergyType} />)
                }
              )
            }
          </Picker>
        </View>

        <View style={inlineStyles.profileFieldView}>
          <Text style={inlineStyles.profileFieldName}>Year</Text>
          <NumberInput
            style={styles.inputField}
            onChangeText={(year) => { changeValue('year', year) }}
            value={year}
          />
        </View>

        <View style={inlineStyles.profileFieldView}>
          <Text style={inlineStyles.profileFieldName}>Reaction</Text>
          <TextInput
            style={styles.inputField}
            onChangeText={(reaction) => { changeValue('reaction', reaction) }}
            value={patientAllergyHelper.reaction(model)}
          />
        </View>
      </View>
    )
  }

  function getChangedModelFrom(hash) {
    const { changedPatientAllergy } = hash
    return changedPatientAllergy
  }

  function getModelFrom(hash) {
    const { patientAllergy } = hash
    return patientAllergy
  }

  function loadEditModel(userCredentials, onSuccess, onError) {
    const patientAllergy = getModelFrom(props)
    patientAllergyApi.edit(userCredentials, patientAllergyHelper.id(patientAllergy), onSuccess, onError)
  }

  function updateModel(userCredentials, changedModel, onSuccess, onError) {
    if (!valueHelper.isValue(changedModel)) {
      onSuccess()
      return
    }

    patientAllergyApi.update(userCredentials, changedModel, onSuccess, onError)
  }
}

export { PatientAllergyModal }
