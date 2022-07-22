import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { patientMedicationApi } from '../../api'
import { valueHelper, alertHelper, patientMedicationHelper, currentUserHelper } from "../../helpers"

function MedicationInfo(props) {
  const { userCredentials } = currentUserHelper.getCurrentProps(props)
  const [patientMedication, setPatientMedication] = useState(props.patientMedication)
  const [needLoad, setNeedLoad] = useState(true)
  const physicianName = valueHelper.isValue(patientMedicationHelper.physician(patientMedication)) ? patientMedicationHelper.physicianName(patientMedication) : ""

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
    <View style={styles.medicationInfo.view}>
      <View style={styles.medicationInfo.infoArea}>
        <View style={styles.medicationInfo.profileFieldView}>
          <Text style={styles.medicationInfo.profileFieldName}>Instructions</Text>
          <Text style={styles.medicationInfo.profileFieldValue}>{patientMedicationHelper.directions(patientMedication)}</Text>
        </View>

        <View style={styles.medicationInfo.profileFieldView}>
          <Text style={styles.medicationInfo.profileFieldName}>Last Filled</Text>
          <Text style={styles.medicationInfo.profileFieldValue}>{patientMedicationHelper.displayFilledOn(patientMedication)}</Text>
        </View>

        <View style={styles.medicationInfo.profileFieldView}>
          <Text style={styles.medicationInfo.profileFieldName}>Prescribed By</Text>
          <Text style={styles.medicationInfo.profileFieldValue}>{physicianName}</Text>
        </View>
      </View>
    </View>
  )
}

const MemoizedMedcicationInfo = React.memo(MedicationInfo)
export { MemoizedMedcicationInfo as MedicationInfo }

const styles = StyleSheet.create(
  {
    medicationInfo: {
      view: {},
      infoArea: { flexDirection: "column" },
      profileFieldView: { flexDirection: "row", margin: 5 },
      profileFieldName: { fontWeight: "bold", marginRight: 5 },
      profileFieldValue: {}
    }
  }
)
