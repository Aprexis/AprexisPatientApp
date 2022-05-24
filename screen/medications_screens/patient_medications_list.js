import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FontAwesome5Icon } from '../components'
import { patientMedicationApi } from "../../api"
import { valueHelper, alertHelper, patientHelper, currentUserHelper, userCredentialsHelper, patientMedicationHelper } from '../../helpers'

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
  const [patientMedications, setPatientMedications] = useState([])
  const [patientMedicationHeaders, setPatientMedicationHeaders] = useState({})
  const [loaded, setLoaded] = useState(false)

  useEffect(
    () => {
      if (valueHelper.isSet(loaded)) {
        return
      }
      userCredentialsHelper.getUserCredentials(
        (userCredentials) => {
          if (!valueHelper.isValue(userCredentials)) {
            return
          }
          patientMedicationApi.listForPatient(
            userCredentials,
            patientHelper.id(currentPatient),
            { sort: 'medications.label' },
            (patientMedications, patientMedicationHeaders) => {
              setLoaded(true)
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
            return (<PatientMedication key={`patient-medication-${patientMedicationHelper.id(patientMedication)}`} {...props} patientMedication={patientMedication} />)
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
      text: { fontSize: 20, fontWeight: "bold", width: "80%" }
    }
  }
)
