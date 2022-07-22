import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { Button, Menu, TextInput } from 'react-native-paper'
import { AddressInput, AprexisModal, ContactInput } from '../components'
import { caregiverApi } from '../../api'
import { valueHelper, alertHelper, caregiverHelper, currentUserHelper, patientHelper } from "../../helpers"
import { relationships } from "../../types"
import { themeColor, styles } from '../../assets/styles'

function CaregiverModal(props) {
  const { action, onClose, visible } = props
  const { currentPatient, userCredentials } = currentUserHelper.getCurrentProps(props)
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
          <Text style={{ fontSize:20, fontWeight:'600' }}>Add/Edit Caregiver</Text>
        </View>

        <View style={inlineStyles.profileFieldView}>
          <TextInput
            style={styles.inputField}
            onChangeText={(firstName) => { changeValue('first_name', firstName) }}
            value={caregiverHelper.firstName(model)}
            label="First Name"
            mode="outlined"
            dense='true'
            style={styles.textInput}
            activeOutlineColor={themeColor.lightBlue}   
          />
        </View>

        <View style={inlineStyles.profileFieldView}>
          <TextInput
            style={styles.inputField}
            onChangeText={(lastName) => { changeValue('last_name', lastName) }}
            value={caregiverHelper.lastName(model)}
            label="Last Name"
            mode="outlined"
            dense='true'
            style={styles.textInput}
            activeOutlineColor={themeColor.lightBlue} 
          />
        </View>

        <View style={inlineStyles.profileFieldView}>
          <Text style={inlineStyles.profileFieldName}>Relationship</Text>
          <Menu
            anchor={<Button onPress={openMenu} style={{backgroundColor:'#fff', color:'#ccc', borderWidth:1, borderColor:'#707070'}}>{caregiverHelper.relationship(model)}</Button>}
            onDismiss={closeMenu}
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
        <ContactInput contactable={model} onChangeValue={changeValue} />
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
