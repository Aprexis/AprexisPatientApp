import React from 'react'
import { Text, View } from 'react-native'
import { patientMedicationApi } from '../../api'
import { AprexisModal, DateInput, SelectHcpId, SelectMedicationId, SelectPharmacyStoreId } from '../components'
import { valueHelper, alertHelper, dateHelper, patientMedicationHelper, currentUserHelper, patientHelper, userHelper } from "../../helpers"
import { styles } from '../../assets/styles'

function FilledAt({ changeDate, fields, fullyEditable, inlineStyles, model, pressDate }) {
  return (
    <View style={inlineStyles.profileFieldView}>
      <DateInput
        disabled={!fullyEditable}
        field='filled_at'
        label='Filled At'
        onChange={changeDate}
        onPress={pressDate}
        showPicker={valueHelper.isSet(fields.showFilledAtPicker)}
        value={dateHelper.makeDate(patientMedicationHelper.filledAt(model))}
      />
    </View>
  )
}

function Hcp({ fullyEditable, inlineStyles, model, updateHcp, userCredentials }) {
  return (
    <React.Fragment>
      <View style={inlineStyles.profileFieldView}>
        <Text style={inlineStyles.profileFieldName}>HCP</Text>
        <Text style={inlineStyles.profileFieldName}>{patientMedicationHelper.physicianNameAndNpi(model)}</Text>
      </View>

      {
        fullyEditable &&
        <SelectHcpId
          hcp={patientMedicationHelper.physician(model)}
          updateHcp={updateHcp}
          userCredentials={userCredentials}
        />
      }
    </React.Fragment>
  )
}

function Medication({ fullyEditable, inlineStyles, model, updateMedication, userCredentials }) {
  return (
    <React.Fragment>
      <View style={inlineStyles.profileFieldView}>
        <Text style={inlineStyles.profileFieldName}>Medication</Text>
        <Text style={styles.inputField}>{patientMedicationHelper.medicationLabel(model)}</Text>
      </View>

      {
        fullyEditable &&
        <SelectMedicationId
          medication={patientMedicationHelper.medication(model)}
          updateMedication={updateMedication}
          userCredentials={userCredentials}
        />
      }
    </React.Fragment>
  )
}

function PharmacyStore({ fullyEditable, inlineStyles, model, updatePharmacyStore, userCredentials }) {
  return (
    <React.Fragment>
      <View style={inlineStyles.profileFieldView}>
        <Text style={inlineStyles.profileFieldName}>Pharmacy Store</Text>
        <Text style={inlineStyles.profileFieldName}>{pharmacyStoreIdentification()}</Text>
      </View>

      {
        fullyEditable &&
        <SelectPharmacyStoreId
          pharmacyStore={patientMedicationHelper.pharmacyStore(model)}
          updatePharmacyStore={updatePharmacyStore}
          userCredentials={userCredentials}
        />
      }
    </React.Fragment>
  )

  function pharmacyStoreIdentification() {
    if (!valueHelper.isValue(patientMedicationHelper.pharmacyStore(model))) {
      return 'No pharmacy store'
    }

    return patientMedicationHelper.pharmacyStoreIdentification(model)
  }

}

function PatientMedicationModal(props) {
  const { action, onClose, visible } = props
  const { currentPatient, currentUser, userCredentials } = currentUserHelper.getCurrentProps(props)

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
      undefined,
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

  function displayModel(model, _changedModel, fields, inlineStyles, changeValue, setField) {
    const fullyEditable = isFullyEditable()

    return (
      <View style={inlineStyles.infoArea}>
        <Medication fullyEditable={fullyEditable} inlineStyles={inlineStyles} model={model} updateMedication={updateMedication} userCredentials={userCredentials} />
        <PharmacyStore fullyEditable={fullyEditable} inlineStyles={inlineStyles} model={model} updatePharmacyStore={updatePharmacyStore} userCredentials={userCredentials} />
        <Hcp fullyEditable={fullyEditable} inlineStyles={inlineStyles} model={model} updateHcp={updateHcp} userCredentials={userCredentials} />
        <FilledAt changeDate={changeDate} fields={fields} fullyEditable={fullyEditable} inlineStyles={inlineStyles} model={model} pressDate={pressDate} />
      </View>
    )

    function changeDate(field, newDate) {
      changeValue(field, dateHelper.formatDate(newDate, 'yyyy-MM-dd'))
      switch (field) {
        case 'filled_at':
          setField('showFilledAtPicker', false)
        default:
          break
      }
    }

    function isFullyEditable() {
      if (action == 'ADD') {
        return true
      }

      if (!valueHelper.isValue(patientMedicationHelper.user(model))) {
        return false
      }

      return userHelper.id(currentUser) === patientMedicationHelper.userId(model)
    }

    function pressDate(field) {
      switch (field) {
        case 'filled_at':
          setField('showFilledAtPicker', true)
        default:
          break
      }
    }

    function updateHcp(id, hcp) {
      changeValue(['physician_id', 'physician'], [id, hcp])
    }

    function updateMedication(id, medication) {
      changeValue(['medication_id', 'medication'], [id, medication])
    }

    function updatePharmacyStore(id, pharmacyStore) {
      changeValue(['pharmacy_store_id', 'pharmacy_store'], [id, pharmacyStore])
    }
  }

  function getChangedModelFrom(hash) {
    const { changedPatientMedication } = hash
    return changedPatientMedication
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
