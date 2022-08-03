import React from 'react'
import { PatientAllergiesList } from '../allergies_screens'

function Allergies(props) {
  const { allergyType, currentUser, currentPatient, userCredentials } = props

  return (
    <PatientAllergiesList {...props} allergyType={allergyType} currentUser={currentUser} currentPatient={currentPatient} userCredentials={userCredentials} />
  )
}

const MemoizedAllergies = React.memo(Allergies)
export { MemoizedAllergies as Allergies }

