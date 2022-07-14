import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Allergies, CheckInteractions, PatientMedicationsList } from "../medications_screens"
import { currentUserHelper } from '../../helpers'
import { styles } from '../../assets/styles'

const Tab = createMaterialTopTabNavigator()

function MedicationsScreen(props) {
  const { currentUser, currentPatient, userCredentials } = currentUserHelper.getCurrentProps(props)

  return (
    <SafeAreaView style={styles.mainBody}>
      <View style={[styles.row, { justifyContent: 'flex-end' }]}>
        <View style={{ flex: .6, textAlign: 'center' }}>
          <Text style={inlineStyles.titleText}>MEDICATIONS</Text>
        </View>
      </View>
      <View style={{ flex: 1, padding: 8, paddingTop: 0 }}>
        <Tab.Navigator
          style={{ marginBottom: 12, textAlign: 'center' }}
          screenOptions={{
            tabBarLabelStyle: { fontSize: 14, fontWeight: '600' },
            tabBarStyle: { backgroundColor: '#E1EBF1', marginBottom: 14 },
            tabBarIndicatorStyle: { backgroundColor: '#03718D' },
          }}
        >
          <Tab.Screen
            name="List"
            style={{ padding: 8, fontWeight: "700" }}
            options={{ headerShown: false }}>
            {(props) => <PatientMedicationsList {...props} currentUser={currentUser} currentPatient={currentPatient} userCredentials={userCredentials} />}
          </Tab.Screen>
          <Tab.Screen
            name="Check Interactions"
            options={{ headerShown: false }}>
            {(props) => <CheckInteractions {...props} currentUser={currentUser} currentPatient={currentPatient} userCredentials={userCredentials} />}
          </Tab.Screen>
          <Tab.Screen
            name="Allergies"
            options={{ headerShown: false }}>
            {(props) => <Allergies {...props} allergyType='Medicine' currentUser={currentUser} currentPatient={currentPatient} userCredentials={userCredentials} />}
          </Tab.Screen>
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  )
}

export { MedicationsScreen }

const inlineStyles = StyleSheet.create(
  {
    titleView: { flexDirection: "row", justifyContent: "center", alignContent: "center", marginTop: 10 },
    titleText: { fontSize: 18, fontWeight: "bold", color: "#112B37" /*, margin: '0 auto'*/ }
  }
)
