import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { patientAllergyApi } from '../../api'
import { valueHelper, alertHelper, patientAllergyHelper, userCredentialsHelper } from "../../helpers"

function PatientAllergyInfo(props) {
  const [patientAllergy, setPatientAllergy] = useState(props.route.params.patientAllergy)
  const [needLoad, setNeedLoad] = useState(true)

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

          patientAllergyApi.profile(
            userCredentials,
            patientAllergy.id,
            (patientAllergyProfile) => {
              setNeedLoad(false)
              setPatientAllergy(patientAllergyProfile)
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
    <View style={styles.allergyInfo.view}>
      <View style={styles.allergyInfo.infoArea}>
        <View style={styles.allergyInfo.profileFieldView}>
          <Text style={styles.allergyInfo.profileFieldName}>Name</Text>
          <Text style={styles.allergyInfo.profileFieldValue}>{patientAllergyHelper.allergyName(patientAllergy)}</Text>
        </View>

        <View style={styles.allergyInfo.profileFieldView}>
          <Text style={styles.allergyInfo.profileFieldName}>Type</Text>
          <Text style={styles.allergyInfo.profileFieldValue}>{patientAllergyHelper.allergyType(patientAllergy)}</Text>
        </View>

        <View style={styles.allergyInfo.profileFieldView}>
          <Text style={styles.allergyInfo.profileFieldName}>Year</Text>
          <Text style={styles.allergyInfo.profileFieldValue}>{patientAllergyHelper.year(patientAllergy)}</Text>
        </View>

        <View style={styles.allergyInfo.profileFieldView}>
          <Text style={styles.allergyInfo.profileFieldName}>Reaction</Text>
          <Text style={styles.allergyInfo.profileFieldValue}>{patientAllergyHelper.reaction(patientAllergy)}</Text>
        </View>
      </View>
    </View>
  )
}

export { PatientAllergyInfo }

const styles = StyleSheet.create(
  {
    allergyInfo: {
      view: {},
      infoArea: { flexDirection: "column" },
      profileFieldView: { flexDirection: "row", margin: 5 },
      profileFieldName: { fontWeight: "bold", marginRight: 5 },
      profileFieldValue: {}
    }
  }
)
