import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FontAwesome5Icon, ListView } from '../components'
import { patientMedicationApi } from "../../api"
import { alertHelper, patientHelper, currentUserHelper, patientMedicationHelper } from '../../helpers'
import { styles } from '../../assets/styles'

function PatientMedication(props) {
  const { patientMedication, setPatientMedication, setStackScreen } = props

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.listButton}
      onPress={
        () => {
          setPatientMedication(patientMedication)
          setStackScreen('medication')
        }
      }>
      <View style={{ flexDirection: "row", alignItems: 'center', width: 50 }}>
        <FontAwesome5Icon size={35} style={styles.icon} name={patientMedicationHelper.medicationIcon(patientMedication)} />
      </View>

      <View style={{ flexDirection: "row", alignItems: 'center', width: '80%', }}>
        <Text style={inlineStyles.text}>{patientMedicationHelper.medicationLabel(patientMedication)}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: 'center', width: 20 }}>
        <FontAwesome5Icon size={30} name="angle-right" style={[styles.icon, inlineStyles.medIcon]} />
      </View>
    </TouchableOpacity>
  )
}

function PatientMedicationsList(props) {
  const { setPatientMedication } = props
  const { currentPatient, userCredentials } = currentUserHelper.getCurrentProps(props)

  return (
    <ListView
      label='Patient Medication'
      onLoadPage={loadPage}
      onPresentItem={presentItem}
      pageSize={20}
      pluralLabel='Patient Medications'
    />
  )

  function loadPage(number, size, onSuccess) {
    patientMedicationApi.listForPatient(
      userCredentials,
      patientHelper.id(currentPatient),
      { for_active: true, page: { number, size, total: 0 }, sort: 'created_at-,medication.label' },
      onSuccess,
      alertHelper.handleError
    )
  }

  function presentItem(patientMedication, patientMedicationIdx, _editPatientMedication) {
    return (
      <PatientMedication
        {...props}
        key={`patient-medication-${patientMedicationHelper.id(patientMedication)}-${patientMedicationIdx}`}
        patientMedication={patientMedication}
        setPatientMedication={setPatientMedication}
      />
    )
  }
}

export { PatientMedicationsList }

const inlineStyles = StyleSheet.create(
  {
    text: { color: "#112B37", fontSize: 17, fontWeight: "500", marginLeft: 5, display: 'flex', flex: 1 },
    medIcon: { marginRight: 5 }
  }
)
