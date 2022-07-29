import React from 'react'
import { Text, View } from 'react-native'
import { patientMedicationApi } from '../../api'
import { AprexisModal, SelectPharmacyStoreId } from '../components'
import { valueHelper, alertHelper, patientMedicationHelper, currentUserHelper, patientHelper } from "../../helpers"
import { styles } from '../../assets/styles'

function PatientMedicationModal(props) {
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
      helper={patientMedicationHelper}
      loadEditModel={loadEditModel}
      onClose={onClose}
      updateModel={updateModel}
      visible={visible}
    />
  )

  function buildNewModel(onSuccess) {
    patientMedicationApi.buildNew(
      userCredentials,
      patientHelper.id(currentPatient),
      (model) => {
        const changedModel = patientMedicationHelper.buildNewChanged(model)
        onSuccess(model, changedModel)
      },
      alertHelper.handleError
    )
  }

  function createModel(changedModel, onSuccess) {
    patientMedicationApi.create(changedModel, onSuccess, alertHelper.handleError)
  }

  function displayModel(model, _changedModel, _fields, inlineStyles, changeValue, _setField) {
    return (
      <View style={inlineStyles.infoArea}>
        <View style={inlineStyles.profileFieldView}>
          <Text style={inlineStyles.profileFieldName}>Medication</Text>
          <Text style={styles.inputField}>{patientMedicationHelper.medicationLabel(model)}</Text>
        </View>

        <View style={inlineStyles.profileFieldView}>
          <Text style={inlineStyles.profileFieldName}>Pharmacy Store</Text>
          <Text style={inlineStyles.profileFieldName}>{patientMedicationHelper.pharmacyStoreIdentification(model)}</Text>
        </View>

        <SelectPharmacyStoreId
          currentPatient={currentPatient}
          pharmacyStore={patientMedicationHelper.pharmacyStore(model)}
          updatePharmacyStore={updatePharmacyStore}
          userCredentials={userCredentials}
        />
      </View>
    )

    function updatePharmacyStore(id, pharmacyStore) {
      changeValue(['pharmacy_store_id', 'pharmacyStore'], [id, pharmacyStore])
    }
  }

  function getChangedModelFrom(hash) {
    const { changedpatientMedication } = hash
    return changedpatientMedication
  }

  function getModelFrom(hash) {
    const { patientMedication } = hash
    return patientMedication
  }

  function loadEditModel(onSuccess) {
    const patientMedication = getModelFrom(props)
    patientMedicationApi.edit(userCredentials, patientMedicationHelper.id(patientMedication), onSuccess, alertHelper.handleError)
  }

  function updateModel(changedModel, onSuccess) {
    if (!valueHelper.isValue(changedModel)) {
      onSuccess()
      return
    }

    patientMedicationApi.update(userCredentials, changedModel, onSuccess, alertHelper.handleError)
  }
}

export { PatientMedicationModal }
