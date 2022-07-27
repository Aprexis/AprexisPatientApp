import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { DisplayField } from '../components'
import { patientMedicationApi } from '../../api'
import { alertHelper, patientMedicationHelper, currentUserHelper } from "../../helpers"

function MedicationInfo(props) {
  const { userCredentials } = currentUserHelper.getCurrentProps(props)
  const [patientMedication, setPatientMedication] = useState(props.patientMedication)
  const [needLoad, setNeedLoad] = useState(true)

  useEffect(
    () => {
      if (!needLoad) {
        return
      }

      patientMedicationApi.profile(
        userCredentials,
        patientMedication.id,
        (patientMedicationProfile) => {
          setNeedLoad(false)
          setPatientMedication(patientMedicationProfile)
        },
        (message) => {
          setNeedLoad(false)
          alertHelper.error(message)
          return
        }
      )
    }
  )

  return (
    <View >
      <View style={{ flexDirection: 'column' }}>
        <DisplayField fieldName='Instructions' fieldType='string' method={patientMedicationHelper.directions} model={patientMedication} />
        <DisplayField checkMethod={patientMedicationHelper.filledAt} fieldName='Last Filled' fieldType='datetime' method={patientMedicationHelper.displayFilledOn} model={patientMedication} />
        <DisplayField fieldName='Refill?' method={patientMedicationHelper.displayHasPreviousFill} model={patientMedication} />
        <DisplayField fieldName='MPR' fieldType='string' method={patientMedicationHelper.mpr} model={patientMedication} />
        <DisplayField checkMethod={patientMedicationHelper.physician} fieldName='Prescribed By' method={patientMedicationHelper.physicianName} model={patientMedication} />
      </View>
    </View>
  )
}

const MemoizedMedcicationInfo = React.memo(MedicationInfo)
export { MemoizedMedcicationInfo as MedicationInfo }
