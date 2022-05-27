import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FontAwesome5Icon, ListView } from '../components'
import { patientMedicationApi } from "../../api"
import { alertHelper, patientHelper, currentUserHelper, userCredentialsHelper, patientMedicationHelper, valueHelper } from '../../helpers'

function PatientMedication(props) {
  const { navigation, patientMedication } = props
  const { currentUser, currentPatient } = currentUserHelper.getCurrentProps(props)

  return (
    <View style={styles.patientMedication.view}>
      <FontAwesome5Icon size={40} style={styles.patientMedication.icon} name="pills" />
      <Text style={styles.patientMedication.text}>{patientMedicationHelper.medicationLabel(patientMedication)}</Text>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => { navigation.navigate('MedicationScreen', { currentUser, currentPatient, patientMedication }) }}>
        <FontAwesome5Icon size={30} name="angle-right" />
      </TouchableOpacity>
    </View>
  )
}

function PatientMedicationsList(props) {
  const { currentPatient } = currentUserHelper.getCurrentProps(props)

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
    userCredentialsHelper.getUserCredentials(
      (userCredentials) => {
        if (!valueHelper.isValue(userCredentials)) {
          return
        }
        patientMedicationApi.listForPatient(
          userCredentials,
          patientHelper.id(currentPatient),
          { page: { number, size, total: 0 }, sort: 'created_at-,medication.label' },
          onSuccess,
          (error) => {
            alertHelper.error(error)
            return
          }
        )
      }
    )
  }

  function presentItem(patientMedication, patientMedicationIdx) {
    return (
      <PatientMedication
        key={`patient-medication-${patientMedicationHelper.id(patientMedication)}-${patientMedicationIdx}`}
        patientMedication={patientMedication}
        {...props}
      />
    )
  }
}

export { PatientMedicationsList }

const styles = StyleSheet.create(
  {
    patientMedication: {
      view: { flex: 1, flexDirection: "row", height: 50, margin: 5, backgroundColor: "#c8c8c8" },
      icon: { color: "grey" },
      text: { fontSize: 20, fontWeight: "bold", width: "80%" }
    }
  }
)
