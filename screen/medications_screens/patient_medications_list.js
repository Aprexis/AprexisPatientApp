import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, SectionList } from 'react-native'
import { FontAwesome5Icon } from '../components'
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


  const DATA = [
    {
      title: "Prescription Medications",
      data: ["Lipitor", "Metformin Hydrochloride this is a really ling name", "Adderall"]
    },
    {
      title: "Non Prescription Medications",
      data: ["Asprin", "Claritin", "Benadryl"]
    }
  ];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

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
    <ScrollView style={{ flex: 1 }}>
      <SectionList
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => (
        <TouchableOpacity
        activeOpacity={0.5}
        style={{ width:'96%', borderRadius:5, padding:10, backgroundColor:'#E0EBF1', flexDirection: "row", alignItems:'center', justifyContent:'space-between', marginBottom:5 }}
        onPress={() => { navigation.navigate('MedicationScreen', { currentUser, currentPatient, patientMedication }) }}>

        <View style={{ flexDirection: "row", alignItems:'center', width:'95%'}}>
          <FontAwesome5Icon size={35} style={styles.icon} name="pills" />
          <Text style={{ marginLeft:5, fontWeight:500 }}><Item title={item} /></Text>
        </View>
        <View>
          <FontAwesome5Icon size={30} name="angle-right" style={styles.icon} />
        </View>
        </TouchableOpacity>
      )}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />
    </ScrollView>
  )
}

export { PatientMedicationsList }

const styles = StyleSheet.create(
  {
    header: { padding:10, fontWeight:600, fontSize:16, color:'#02728D' },
    patientMedicationsList: {
      scrollContext: { flexDirection: "column" }
    },
    patientMedication: {
      view: { flex: 1, flexDirection: "row", height: 50, margin: 5, backgroundColor: '#F3F6F9' },
      text: { fontSize: 20, fontWeight: "bold" },
    },
    item: { whiteSpace:'wrap' },
    icon: { color: "#112B37", display:'inline' }
  }
)
