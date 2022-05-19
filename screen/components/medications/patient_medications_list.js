import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { patientMedicationApi } from "../../../api"
import { valueHelper, alertHelper, patientHelper, currentUserHelper, userCredentialsHelper, patientMedicationHelper } from '../../../helpers'

function PatientMedication({ patientMedication }) {
  return (
    <View style={styles.patientMedication.view}>
      <Icon size={40} style={styles.patientMedication.icon} name="pills" />
      <Text style={styles.patientMedication.text}>{patientMedicationHelper.medicationLabel(patientMedication)}</Text>
    </View>
  )
}

function PatientMedicationsList(props) {
  const { currentPatient } = currentUserHelper.getCurrentProps(props)
  const [patientMedications, setPatientMedications] = useState([])
  const [patientMedicationHeaders, setPatientMedicationHeaders] = useState(undefined)

  useEffect(
    () => {
      if (valueHelper.isValue(patientMedications) && (patientMedications.length > 0)) {
        return
      }
      userCredentialsHelper.getUserCredentials(
        (userCredentials) => {
          patientMedicationApi.listForPatient(
            userCredentials,
            patientHelper.id(currentPatient),
            { sort: 'medications.label' },
            (patientMedications, patientMedicationHeaders) => {
              setPatientMedications(patientMedications)
              setPatientMedicationHeaders(patientMedicationHeaders)
            },
            (message) => {
              alertHelper.error(message)
              return
            }
          )
        }
      )
    }
  )

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.patientMedicationsList.scrollContext}>
      {
        patientMedications.map(
          (patientMedication) => {
            return (<PatientMedication key={`patient-medication-${patientMedicationHelper.id(patientMedication)}`} patientMedication={patientMedication} />)
          }
        )
      }
    </ScrollView>
  )
}

export { PatientMedicationsList }

const styles = StyleSheet.create(
  {
    patientMedicationsList: {
      scrollContext: { flexDirection: "column" }
    },
    patientMedication: {
      view: { flex: 1, flexDirection: "row", height: 50, margin: 5, backgroundColor: "#c8c8c8" },
      icon: { color: "grey" },
      text: { fontSize: 20, fontWeight: "bold", width: "90%" }
    }
  }
)
