import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FontAwesome5Icon, MaterialCommunityIcon, ListView } from '../components'
import { patientAllergyApi } from "../../api"
import { alertHelper, patientHelper, currentUserHelper, userCredentialsHelper, patientAllergyHelper, valueHelper } from '../../helpers'

function PatientAllergy(props) {
  const { navigation, patientAllergy } = props
  const { currentUser, currentPatient } = currentUserHelper.getCurrentProps(props)

  return (
    <View style={styles.patientAllergy.view}>
      <MaterialCommunityIcon size={40} style={styles.patientAllergy.icon} name="allergy" />
      <Text style={styles.patientAllergy.text}>{valueHelper.capitalizeWords(patientAllergyHelper.allergyName(patientAllergy))}</Text>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => { navigation.navigate('PatientAllergyScreen', { currentUser, currentPatient, patientAllergy }) }}>
        <FontAwesome5Icon size={30} name="angle-right" />
      </TouchableOpacity>
    </View>
  )
}

function PatientAllergiesList(props) {
  const { navigation, allergyType } = props
  const { currentPatient } = currentUserHelper.getCurrentProps(props)

  return (
    <ListView
      label='Patient Allergy'
      navigation={navigation}
      onLoadPage={loadPage}
      onPresentItem={presentItem}
      pageSize={20}
      pluralLabel='Patient Allergies'
    />
  )

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

  function presentItem(patientAllergy, patientAllergyIdx) {
    return (
      <PatientAllergy
        key={`patient-allergy-${patientAllergyHelper.id(patientAllergy)}-${patientAllergyIdx}`}
        patientAllergy={patientAllergy}
        {...props}
      />
    )
  }
}

export { PatientAllergiesList }

const styles = StyleSheet.create(
  {
    patientAllergy: {
      view: { flex: 1, flexDirection: "row", height: 50, margin: 5, backgroundColor: "#c8c8c8" },
      icon: { color: "grey" },
      text: { fontSize: 20, fontWeight: "bold", width: "80%" }
    }
  }
)
