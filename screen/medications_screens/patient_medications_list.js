import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FontAwesome5Icon, ListView } from '../components'
import { patientMedicationApi } from "../../api"
import { alertHelper, patientHelper, currentUserHelper, userCredentialsHelper, patientMedicationHelper, valueHelper } from '../../helpers'
import styles from '../../assets/styles.js'

function PatientMedication(props) {
  const { navigation, patientMedication } = props
  const { currentUser, currentPatient } = currentUserHelper.getCurrentProps(props)

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{ width:'96%', borderRadius:5, padding:10, backgroundColor:'#E0EBF1', flexDirection: "row", alignItems:'center', justifyContent:'space-between', marginTop:5 }}
      onPress={() => { navigation.navigate('MedicationScreen', { currentUser, currentPatient, patientMedication }) }}>
      <View style={{ flexDirection: "row", alignItems:'center', width:'95%'}}>
        <FontAwesome5Icon size={35} style={ styles.icon } name={patientMedicationHelper.medicationIcon(patientMedication)} />
        <Text style={inlineStyles.text}>{patientMedicationHelper.medicationLabel(patientMedication)}</Text>
      </View>
      <View>
        <FontAwesome5Icon size={30} name="angle-right" style={[styles.icon, inlineStyles.medIcon]} />
      </View>
    </TouchableOpacity>
  )
}

function PatientMedicationsList(props) {
  const { navigation } = props
  const { currentPatient } = currentUserHelper.getCurrentProps(props)

  return (
    <ListView
      label='Patient Medication'
      navigation={navigation}
      onLoadPage={loadPage}
      onPresentItem={presentItem}
      pageSize={20}
      pluralLabel='Patient Medications'
      style={{border:'solid red 1px' }}
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
          { for_active: true, page: { number, size, total: 0 }, sort: 'created_at-,medication.label' },
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

const inlineStyles = StyleSheet.create(
  {
    view: { flex: 1, flexDirection: "row", height: 50, margin: 5, backgroundColor: "#F3F6F9" },
    text: { color: "#112B37", fontSize: 18, fontWeight: "500", marginLeft:5 },
    item: { whiteSpace: 'wrap' },
    medIcon: { marginRight: 5 }
  }
)
