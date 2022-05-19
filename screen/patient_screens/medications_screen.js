import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { PatientMedicationsList } from "../components/medications"

function MedicationsScreen(props) {
  return (
    <SafeAreaView style={styles.medicationsScreen.safeArea}>
      <View style={styles.medicationsScreen.title.view}>
        <Text style={styles.medicationsScreen.title.text}>MEDICATIONS</Text>
      </View>
      <PatientMedicationsList {...props} />
    </SafeAreaView>
  )
}

export { MedicationsScreen }

const styles = StyleSheet.create(
  {
    medicationsScreen: {
      safeArea: { flex: 1 },
      title: {
        view: { flexDirection: "row", justifyContent: "center", alignContent: "center" },
        text: { fontSize: 30, fontWeight: "bold" }
      }
    }
  }
)
