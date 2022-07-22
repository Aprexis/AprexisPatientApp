import React from 'react'
import { currentUserHelper } from '../../helpers'
import { PatientAllergiesList } from '../allergies_screens'

function Allergies(props) {
  const { allergyType } = props
  const { currentUser, currentPatient, userCredentials } = currentUserHelper.getCurrentProps(props)

  return (
    <PatientAllergiesList {...props} allergyType={allergyType} currentUser={currentUser} currentPatient={currentPatient} userCredentials={userCredentials} />
  )
}

const MemoizedAllergies = React.memo(Allergies)
export { MemoizedAllergies as Allergies }

