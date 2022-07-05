import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { CaregiverInfo } from './caregiver_info'
import { CaregiversList } from './caregivers_list'
import { HcpsList } from './hcps_list'
import { PharmacistsList } from './pharmacists_list'
import { currentUserHelper } from '../../helpers'

const Stack = createNativeStackNavigator()
const Tab = createMaterialTopTabNavigator()

function CaregiversScreenStack(props) {
  const { caregiver } = props
  const { currentUser, currentPatient } = currentUserHelper.getCurrentProps(props)

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CaregiversList">
        {(props) => <CaregiversList {...props} currentUser={currentUser} currentPatient={currentPatient} />}
      </Stack.Screen>
      <Stack.Screen
        name="CaregiverScreen">
        {(props) => <CaregiverInfo {...props} caregiver={caregiver} currentUser={currentUser} currentPatient={currentPatient} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

function CareTeamScreen(props) {
  const { currentUser, currentPatient } = currentUserHelper.getCurrentProps(props)

  return (
    <SafeAreaView style={styles.careTeamScreen.safeArea}>
      <View style={styles.careTeamScreen.titleView}>
        <Text style={styles.careTeamScreen.titleText}>CARE TEAM</Text>
      </View>
      <Tab.Navigator>
        <Tab.Screen
          name="HCPs"
          options={{ headerShown: false }}>
          {(props) => <HcpsList {...props} currentUser={currentUser} currentPatient={currentPatient} />}
        </Tab.Screen>
        <Tab.Screen
          name="Caregivers"
          options={{ headerShown: false }}>
          {(props) => <CaregiversScreenStack {...props} currentUser={currentUser} currentPatient={currentPatient} />}
        </Tab.Screen>
        <Tab.Screen
          name="Pharmacists"
          options={{ headerShown: false }}>
          {(props) => <PharmacistsList {...props} currentUser={currentUser} currentPatient={currentPatient} />}
        </Tab.Screen>
      </Tab.Navigator>
    </SafeAreaView>
  )
}

export { CareTeamScreen }

const styles = StyleSheet.create(
  {
    careTeamScreen: {
      safeArea: { flex: 1 },
      titleView: { flexDirection: "row", justifyContent: "center", alignContent: "center" },
      titleText: { fontSize: 30, fontWeight: "bold" }
    }
  }
)
