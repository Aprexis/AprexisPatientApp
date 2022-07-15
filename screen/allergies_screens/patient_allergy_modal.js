import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { Button, Menu, TextInput } from 'react-native-paper'
import { AprexisModal, NumberInput } from "../components"
import { patientAllergyApi } from '../../api'
import { valueHelper, alertHelper, currentUserHelper, patientAllergyHelper } from "../../helpers"
import { allergyCategories } from '../../types'
import { styles } from '../../assets/styles'

function PatientAllergyModal(props) {
  const { action, allergyType, onClose, visible } = props
  const { currentPatient, userCredentials } = currentUserHelper.getCurrentProps(props)
  const [allergyTypeVisible, setAllergyTypeVisible] = useState(false)

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

  function buildNewModel(onSuccess) {
    patientAllergyApi.buildNew(
      userCredentials,
      currentPatient.id,
      (model) => {
        const changedModel = patientAllergyHelper.buildNewChanged(model)
        onSuccess(model, changedModel)
      },
      alertHelper.handleError
    )
  }

  function createModel(changedModel, onSuccess) {
    patientAllergyApi.create(userCredentials, changedModel, onSuccess, alertHelper.handleError)
  }

  function displayModel(model, changedModel, _fields, inlineStyles, changeValue, _setField) {
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
            editable={isNewPatientAllergy || !valueHelper.isStringValue(patientAllergyHelper.allergyName(model)) || valueHelper.isStringValue(patientAllergyHelper.allergyName(changedModel))}
            style={styles.inputField}
            onChangeText={(allergyName) => { changeValue('allergy_name', allergyName) }}
            value={patientAllergyHelper.allergyName(model)}
          />
        </View>

        <View style={inlineStyles.profileFieldView}>
          <Text style={inlineStyles.profileFieldName}>Type</Text>
          <Menu
            anchor={<Button disabled={valueHelper.isStringValue(allergyType)} onPress={openMenu}>{allergyType}</Button>}
            onDismiss={closeMenu}
            style={[styles.inputField, { fontSize: 15 }]}
            visible={valueHelper.isSet(allergyTypeVisible)}>
            {
              allergyCategories.map(
                (allergyType) => {
                  return (<Menu.Item key={`allergy-type-${allergyType}`} title={allergyType} onPress={() => { closeMenu(); changeValue('allergy_type', allergyType) }} />)
                }
              )
            }
          </Menu>
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

    function closeMenu() {
      setAllergyTypeVisible(false)
    }

    function openMenu() {
      setAllergyTypeVisible(true)
    }
  }

  function getChangedModelFrom(hash) {
    const { changedPatientAllergy } = hash
    return changedPatientAllergy
  }

  function getModelFrom(hash) {
    const { patientAllergy } = hash
    return patientAllergy
  }

  function loadEditModel(onSuccess) {
    const patientAllergy = getModelFrom(props)
    patientAllergyApi.edit(userCredentials, patientAllergyHelper.id(patientAllergy), onSuccess, alertHelper.handleError)
  }

  function updateModel(changedModel, onSuccess) {
    if (!valueHelper.isValue(changedModel)) {
      onSuccess()
      return
    }

    patientAllergyApi.update(userCredentials, changedModel, onSuccess, alertHelper.handleError)
  }
}

export { PatientAllergyModal }
