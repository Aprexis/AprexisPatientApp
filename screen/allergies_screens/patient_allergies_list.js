import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AddButton, DeleteButton, FontAwesome5Icon, MaterialCommunityIcon, ListView } from '../components'
import { patientAllergyApi } from "../../api"
import { alertHelper, patientHelper, currentUserHelper, userCredentialsHelper, patientAllergyHelper, valueHelper } from '../../helpers'
import { styles } from '../../assets/styles'

function PatientAllergy(props) {
  const { navigation, patientAllergy, onDelete } = props
  const { currentUser, currentPatient } = currentUserHelper.getCurrentProps(props)

  return (
     <TouchableOpacity
        activeOpacity={0.5}
        style={styles.listButton}
        onPress={() => { navigation.navigate('PatientAllergyScreen', { currentUser, currentPatient, patientAllergy }) }}>
      <View style={{ flexDirection: "row", alignItems:'center', width:'95%'}}>
        <MaterialCommunityIcon size={40} style={ styles.icon } name="allergy" />
        <Text style={inlineStyles.text}>{valueHelper.capitalizeWords(patientAllergyHelper.allergyName(patientAllergy))}</Text>
      </View>
      <View>
        <FontAwesome5Icon size={30} name="angle-right" style={[styles.icon, inlineStyles.medIcon]} />
      </View>
    </TouchableOpacity>
  )
}

function PatientAllergiesList(props) {
  const { navigation, allergyType } = props
  const { currentPatient, currentUser } = currentUserHelper.getCurrentProps(props)
  const [forceUpdate, setForceUpdate] = useState(false)

  useEffect(() => { setForceUpdate(false) })

  return (
    <View style={{ flex: 1 }}>
      <ListView
        forceUpdate={forceUpdate}
        label='Patient Allergy'
        navigation={navigation}
        onLoadPage={loadPage}
        onPresentItem={presentItem}
        pageSize={20}
        pluralLabel='Patient Allergies'
      />
    </View>
  )

  function deletePatientAllergy(patientAllergy) {
    userCredentialsHelper.getUserCredentials(
      (userCredentials) => {
        if (!valueHelper.isValue(userCredentials)) {
          return
        }

        patientAllergyApi.destroy(
          userCredentials,
          patientAllergyHelper.id(patientAllergy),
          () => {
            setForceUpdate(true)
          },
          (error) => {
            alertHelper.error(error)
            return
          }
        )
      }
    )
  }

  function loadPage(number, size, onSuccess) {
    userCredentialsHelper.getUserCredentials(
      (userCredentials) => {
        if (!valueHelper.isValue(userCredentials)) {
          return
        }
        const params = { page: { number, size, total: 0 }, sort: 'created_at-,allergy.name' }
        if (valueHelper.isStringValue(allergyType)) {
          params['for_allergy_type'] = allergyType
        }

        patientAllergyApi.listForPatient(
          userCredentials,
          patientHelper.id(currentPatient),
          params,
          onSuccess,
          (error) => {
            alertHelper.error(error)
            return
          }
        )
      }
    )
  }

  function addPatientAllergy() {
    navigation.navigate('PatientAllergyScreen', { allergyType, currentUser, currentPatient })
  }

  function presentItem(patientAllergy, patientAllergyIdx) {
    return (
      <PatientAllergy
        key={`patient-allergy-${patientAllergyHelper.id(patientAllergy)}-${patientAllergyIdx}`}
        onDelete={() => { deletePatientAllergy(patientAllergy) }}
        patientAllergy={patientAllergy}
        {...props}
      />
    )
  }
}

export { PatientAllergiesList }

const inlineStyles = StyleSheet.create(
  {
    text: { color: "#112B37", fontSize: 18, fontWeight: "500", marginLeft:5 },
    medIcon: { marginRight: 5 }
  }
)
