import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FontAwesome5Icon, MaterialCommunityIcon, ListView } from '../components'
import { patientAllergyApi } from "../../api"
import { alertHelper, patientHelper, currentUserHelper, userCredentialsHelper, patientAllergyHelper, valueHelper } from '../../helpers'
import { styles } from '../../assets/styles'
import { PatientAllergyModal } from './patient_allergy_modal'

function PatientAllergy(props) {
  const { patientAllergy, onEdit } = props

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.listButton}
      onPress={() => { onEdit(patientAllergy) }}>
      <View style={{ flexDirection: "row", alignItems: 'center', width: '95%' }}>
        <MaterialCommunityIcon size={40} style={styles.icon} name="allergy" />
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

  return (
    <View style={{ flex: 1 }}>
      <ListView
        addEditModal={addEditModal}
        label='Patient Allergy'
        navigation={navigation}
        onLoadPage={loadPage}
        onPresentItem={presentItem}
        pageSize={20}
        pluralLabel='Patient Allergies'
      />
    </View>
  )

  function addEditModal(patientAllergy, action, visible, closeModal) {
    return (
      <PatientAllergyModal
        action={action}
        currentPatient={currentPatient}
        currentUser={currentUser}
        onClose={closeModal}
        patientAllergy={patientAllergy}
        visible={visible}
      />
    )
  }

  /* Providing delete handling should be done by the list view with a callback to this component.
  function deletePatientAllergy(patientAllergy) {
    userCredentialsHelper.getUserCredentials(
      (userCredentials) => {
        if (!valueHelper.isValue(userCredentials)) {
          return
        }

        patientAllergyApi.destroy(
          userCredentials,
          patientAllergyHelper.id(patientAllergy),
          () => { dispatch('FORCE_UPDATE') },
          (error) => {
            alertHelper.error(error)
            return
          }
        )
      }
    )
  }
  */

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

  function presentItem(patientAllergy, patientAllergyIdx, editPatientAllergy) {
    return (
      <PatientAllergy
        key={`patient-allergy-${patientAllergyHelper.id(patientAllergy)}-${patientAllergyIdx}`}
        //onDelete={deletePatientAllergy}
        onEdit={editPatientAllergy}
        patientAllergy={patientAllergy}
        {...props}
      />
    )
  }
}

export { PatientAllergiesList }

const inlineStyles = StyleSheet.create(
  {
    text: { color: "#112B37", fontSize: 18, fontWeight: "500", marginLeft: 5 },
    medIcon: { marginRight: 5 }
  }
)
