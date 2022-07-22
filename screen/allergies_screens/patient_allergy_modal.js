import React, { useState } from 'react'
import { Text, View, Keyboard } from 'react-native'
import { Button, Menu, TextInput } from 'react-native-paper'
import { AprexisModal, NumberInput } from "../components"
import { patientAllergyApi } from '../../api'
import { valueHelper, alertHelper, currentUserHelper, patientAllergyHelper } from "../../helpers"
import { allergyCategories } from '../../types'
import { themeColor, styles } from '../../assets/styles'

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
        const updated = patientAllergyHelper.changeField(model, changedModel, 'allergy_type', allergyType)
        console.log(`Updated: ${JSON.stringify(updated, null, 2)}`)
        onSuccess(getModelFrom(updated), getChangedModelFrom(updated))
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
    const modelAllergyType = patientAllergyHelper.allergyType(model)

    return (
      <View style={{ display:'flex', width:'100%' }}>

        <View style={inlineStyles.profileFieldView}>
          <Text style={{ fontSize:20, fontWeight:'600' }}>Record an Allergic Reaction</Text>
        </View>

        <View style={inlineStyles.profileFieldView}>
          <Text style={inlineStyles.profileFieldName}>Type</Text>
          <Menu
            anchor={<Button disabled={valueHelper.isStringValue(modelAllergyType)} onPress={openMenu}>{modelAllergyType}</Button>}
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
          <TextInput
            editable={isNewPatientAllergy || !valueHelper.isStringValue(patientAllergyHelper.allergyName(model)) || valueHelper.isStringValue(patientAllergyHelper.allergyName(changedModel))}
            onChangeText={(allergyName) => { changeValue('allergy_name', allergyName) }}
            value={patientAllergyHelper.allergyName(model)}         
            label='Allergen Name'
            keyboardType="default"
            onSubmitEditing={Keyboard.dismiss}
            underlineColorAndroid="#f000"
            returnKeyType="next"
            mode="outlined"
            dense='true'
            style={styles.textInput}
            activeOutlineColor={themeColor.lightBlue}   
          />
        </View>

        <View style={inlineStyles.profileFieldView}>
          <NumberInput
            onChangeText={(year) => { changeValue('year', year) }}
            value={year}
            mode="outlined"
            label="Year Started"
            dense='true'
            style={styles.textInput}
            activeOutlineColor={themeColor.lightBlue} 
          />
        </View>

        <View style={inlineStyles.profileFieldView}>
          <TextInput
            onChangeText={(reaction) => { changeValue('reaction', reaction) }}
            value={patientAllergyHelper.reaction(model)}
            mode="outlined"
            label="Reaction"
            dense='true'
            style={styles.textInput}
            activeOutlineColor={themeColor.lightBlue} 
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
