import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { PatientMedicationModal } from './patient_medication_modal'
import { FontAwesome5Icon, ListView } from '../components'
import { patientMedicationApi, patientHelper, patientMedicationHelper } from '@aprexis/aprexis-api-utility'
import { alertHelper, apiEnvironmentHelper, iconHelper } from '../../helpers'
import { styles } from '../../assets/styles'

function PatientMedication(props) {
  const { onEdit, patientMedication, setPatientMedication, setStackScreen } = props

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={inlineStyles.listButton}
        onPress={() => { onEdit(patientMedication) }}>
        <FontAwesome5Icon size={35} style={styles.icon} name={iconHelper.patientMedicationIcon(patientMedication)} />
        <FontAwesome5Icon size={18} name='edit' style={[styles.icon, { marginLeft: 2 }]} />
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.5}
        style={inlineStyles.listButton}
        onPress={
          () => {
            setPatientMedication(patientMedication)
            setStackScreen('medication')
          }
        }>
        <View style={{ flexDirection: "row", alignItems: 'center', width: '80%', }}>
          <Text style={inlineStyles.text}>{patientMedicationHelper.medicationLabel(patientMedication)}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: 'center', width: 20 }}>
          <FontAwesome5Icon size={30} name="angle-right" style={[styles.icon, inlineStyles.medIcon]} />
        </View>
      </TouchableOpacity>
    </View >
  )
}

function PatientMedicationsList(props) {
  const { currentPatient, currentUser, userCredentials, setPatientMedication } = props

  return (
    <ListView
      addEditModal={addEditModal}
      label='Patient Medication'
      onLoadPage={loadPage}
      onPresentItem={presentItem}
      pageSize={20}
      pluralLabel='Patient Medications'
    />
  )

  function addEditModal(patientMedication, action, visible, closeModal) {
    return (
      <PatientMedicationModal
        action={action}
        currentPatient={currentPatient}
        currentUser={currentUser}
        onClose={closeModal}
        patientMedication={patientMedication}
        userCredentials={userCredentials}
        visible={visible}
      />
    )
  }

  function loadPage(number, size, onSuccess) {
    patientMedicationApi.listForPatient(
      apiEnvironmentHelper.apiEnvironment(userCredentials),
      patientHelper.id(currentPatient),
      { for_active: true, page: { number, size, total: 0 }, sort: 'created_at-,medication.label' },
      onSuccess,
      alertHelper.handleError
    )
  }

  function presentItem(patientMedication, patientMedicationIdx, editPatientMedication) {
    return (
      <PatientMedication
        {...props}
        key={`patient-medication-${patientMedicationHelper.id(patientMedication)}-${patientMedicationIdx}`}
        onEdit={editPatientMedication}
        patientMedication={patientMedication}
        setPatientMedication={setPatientMedication}
      />
    )
  }
}

export { PatientMedicationsList }

const inlineStyles = StyleSheet.create(
  {
    listButton: {
      borderRadius: 5,
      backgroundColor: '#E0EBF1',
      flexDirection: "row",
      alignItems: 'center',
      alignSelf: 'center',
    },
    text: { color: "#112B37", fontSize: 17, fontWeight: "500", marginLeft: 5, display: 'flex', flex: 1 },
    medIcon: { marginRight: 5 }
  }
)
