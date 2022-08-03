import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { TextInput } from 'react-native-paper'
import { AprexisModal, DateInput, NumberInput, SelectHcpId, SelectMedicationId, SelectPharmacyStoreId } from '../components'
import { patientMedicationApi, valueHelper, dateHelper, patientMedicationHelper, patientHelper, userHelper } from "@aprexis/aprexis-api-utility"
import { alertHelper, apiEnvironmentHelper } from "../../helpers"
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

function StartDate({ changeDate, fields, fullyEditable, inlineStyles, model, pressDate }) {
  return (
    <View style={inlineStyles.profileFieldView}>
      <DateInput
        disabled={!fullyEditable}
        field='start_date'
        label='Start Date'
        onChange={changeDate}
        onPress={pressDate}
        showPicker={valueHelper.isSet(fields.showStartDatePicker)}
        value={dateHelper.makeDate(patientMedicationHelper.startDate(model))}
      />
    </View>
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
  const { action, currentPatient, currentUser, userCredentials, onClose, visible } = props
  const [forceUpdate, setForceUpdate] = useState(0)


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
      apiEnvironmentHelper.apiEnvironment(userCredentials),
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
    patientMedicationApi.create(apiEnvironmentHelper.apiEnvironment(userCredentials), changedModel, onSuccess, alertHelper.handleError)
  }

  function displayModel(model, _changedModel, fields, inlineStyles, changeValue, setField) {
    const fullyEditable = isFullyEditable()

    return (
      <View style={inlineStyles.infoArea}>
        <Medication fullyEditable={fullyEditable} inlineStyles={inlineStyles} model={model} updateMedication={updateMedication} userCredentials={userCredentials} />
        <PharmacyStore fullyEditable={fullyEditable} inlineStyles={inlineStyles} model={model} updatePharmacyStore={updatePharmacyStore} userCredentials={userCredentials} />
        <Hcp fullyEditable={fullyEditable} inlineStyles={inlineStyles} model={model} updateHcp={updateHcp} userCredentials={userCredentials} />
        <FilledAt changeDate={changeDate} fields={fields} fullyEditable={fullyEditable} inlineStyles={inlineStyles} model={model} pressDate={pressDate} />
        <StartDate changeDate={changeDate} fields={fields} fullyEditable={fullyEditable} inlineStyles={inlineStyles} model={model} pressDate={pressDate} />
        <View style={inlineStyles.profileFieldView}>
          <Text style={inlineStyles.profileFieldName}>Days Supply</Text>
          <NumberInput style={styles.inputField} value={`${patientMedicationHelper.daysSupply(model)}`} onChangeText={(value) => changeValue('days_supply', value)} />
        </View>
        <View style={inlineStyles.profileFieldView}>
          <Text style={inlineStyles.profileFieldName}>Indication</Text>
          <TextInput style={styles.inputField} multiple={true} numberLines={2} value={patientMedicationHelper.indication(model)} onChangeText={(value) => changeValue('indication', value)} />
        </View>
        <View style={inlineStyles.profileFieldView}>
          <Text style={inlineStyles.profileFieldName}>Directions</Text>
          <TextInput style={styles.inputField} multiple={true} numberLines={3} value={patientMedicationHelper.directions(model)} onChangeText={(value) => changeValue('directions', value)} />
        </View>
        <View style={inlineStyles.profileFieldView}>
          <Text style={inlineStyles.profileFieldName}>Additional Information</Text>
          <TextInput style={styles.inputField} multiple={true} numberLines={3} value={patientMedicationHelper.additionalInformation(model)} onChangeText={(value) => changeValue('additional_information', value)} />
        </View>
      </View>
    )

    function changeDate(field, newDate) {
      switch (field) {
        case 'filled_at':
          setField('showFilledAtPicker', false)
          break
        case 'start_date':
          setField('showStartDatePicker', false)
          break
        default:
          break
      }
      changeValue(field, dateHelper.formatDate(newDate, 'yyyy-MM-dd'))
      setForceUpdate(forceUpdate + 1)
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
          break
        case 'start_date':
          setField('showStartDatePicker', true)
          break
        default:
          break
      }
      setForceUpdate(forceUpdate + 1)

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
    patientMedicationApi.edit(apiEnvironmentHelper.apiEnvironment(userCredentials), patientMedicationHelper.id(patientMedication), onSuccess, alertHelper.handleError)
  }

  function updateModel(changedModel, onSuccess) {
    if (!valueHelper.isValue(changedModel)) {
      onSuccess()
      return
    }

    patientMedicationApi.update(apiEnvironmentHelper.apiEnvironment(userCredentials), changedModel, onSuccess, alertHelper.handleError)
  }
}

export { PatientMedicationModal }
