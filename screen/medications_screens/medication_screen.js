import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { patientMedicationHelper } from "../../helpers"

function MedicationScreen(props) {
  const { patientMedication } = props.route.params

  return (
    <SafeAreaView style={styles.medicationScreen.safeArea}>
      <View style={styles.medicationScreen.title.view}>
        <Icon size={40} style={styles.medicationScreen.title.icon} name="pills" />
        <Text style={styles.medicationScreen.title.text}>{patientMedicationHelper.medicationLabel(patientMedication)}</Text>
      </View>
    </SafeAreaView>
  )
}

export { MedicationScreen }

const styles = StyleSheet.create(
  {
    medicationScreen: {
      safeArea: { flexDirection: "row", justifyContent: "center" },
      title: {
        view: { flexDirection: "column", justifyContent: "center", alignItems: "center" },
        icon: { color: "grey" },
        text: { fontSize: 30, fontWeight: "bold" }
      }
    }
  }
)
