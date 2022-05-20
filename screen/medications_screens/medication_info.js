import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { patientMedicationApi } from '../../api'
import { valueHelper, alertHelper, patientMedicationHelper, userCredentialsHelper } from "../../helpers"

function MedicationInfo(props) {
  const [patientMedication, setPatientMedication] = useState(props.patientMedication)
  const [needLoad, setNeedLoad] = useState(true)
  const physicianName = valueHelper.isValue(patientMedicationHelper.physician(patientMedication)) ? patientMedicationHelper.physicianName(patientMedication) : ""

  useEffect(
    () => {
      if (!needLoad) {
        return
      }

      userCredentialsHelper.getUserCredentials(
        (userCredentials) => {
          if (!valueHelper.isValue(userCredentials)) {
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
    }
  )

  return (
    <View style={styles.medicationInfo.view}>
      <View style={styles.medicationInfo.infoArea.view}>
        <View style={styles.medicationInfo.infoArea.profileField.view}>
          <Text style={styles.medicationInfo.infoArea.profileField.fieldName}>Instructions</Text>
          <Text style={styles.medicationInfo.infoArea.profileField.fieldValue}>{patientMedicationHelper.directions(patientMedication)}</Text>
        </View>

        <View style={styles.medicationInfo.infoArea.profileField.view}>
          <Text style={styles.medicationInfo.infoArea.profileField.fieldName}>Last Filled</Text>
          <Text style={styles.medicationInfo.infoArea.profileField.fieldValue}>{patientMedicationHelper.displayFilledOn(patientMedication)}</Text>
        </View>

        <View style={styles.medicationInfo.infoArea.profileField.view}>
          <Text style={styles.medicationInfo.infoArea.profileField.fieldName}>Prescribed By</Text>
          <Text style={styles.medicationInfo.infoArea.profileField.fieldValue}>{physicianName}</Text>
        </View>
      </View>
    </View>
  )
}

export { MedicationInfo }

const styles = StyleSheet.create(
  {
    medicationInfo: {
      view: {},
      infoArea: {
        view: { flexDirection: "column" },
        profileField: {
          view: { flexDirection: "row", margin: 5 },
          fieldName: { fontWeight: "bold", marginRight: 5 },
          fieldValue: {}
        }
      }
    }
  }
)
