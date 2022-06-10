import React from 'react'
import { currentUserHelper } from '../../helpers'
import { PatientAllergyInfo } from './patient_allergy_info'

function PatientAllergyScreen(props) {
  const { currentUser, currentPatient } = currentUserHelper.getCurrentProps(props)

  return (
    <PatientAllergyInfo {...props} currentUser={currentUser} currentPatient={currentPatient} />
  )
}

export { PatientAllergyScreen }
