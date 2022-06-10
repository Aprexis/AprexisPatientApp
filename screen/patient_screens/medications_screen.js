import React from 'react'
import { SafeAreaView, StyleSheet, Text, View} from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Allergies, CheckInteractions, PatientMedicationsList } from "../medications_screens"
import { currentUserHelper } from '../../helpers'
import { Button } from 'react-native-paper'
import { FontAwesome5Icon } from '../components'
import styles from '../../assets/styles.js'

const Tab = createMaterialTopTabNavigator()

function MedicationsScreen(props) {
  const { currentUser, currentPatient } = currentUserHelper.getCurrentProps(props)
  //console.log(`Styles; ${JSON.stringify(styles, null, 2)}`)

  return (
    <SafeAreaView style={ styles.mainBody }>
      <View style={ [styles.row, { justifyContent:'flex-end', marginTop:6 }] }>
          <View style={{ flex:.6, textAlign:'center' }}>
            <Text style={inlineStyles.titleText}>MEDICATIONS</Text>
          </View>
          <View style={{ flex:.2, paddingRight:2 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Button
                icon={({ size, color }) => (
                  <FontAwesome5Icon name="plus" size={14} color="#03718D" style={{ marginLeft:'-8px' }}  />
                )}
                mode="outlined" 
                onPress={() => console.log('Add Medication Pressed')}
                contentStyle={{ height:30 }}
                style={ {borderColor:'#03718D'}}
                color="#03718D"
                compact='true'
              >
                Add
              </Button>
            </View>
          </View>
      </View>
      <Tab.Navigator
        style={{ padding:8, marginBottom:12, textAlign:'center' }}
        screenOptions={{
          tabBarLabelStyle: { fontSize: 14, fontWeight: '600' },
          tabBarStyle: { backgroundColor: '#E1EBF1', marginBottom:12 },
          tabBarIndicatorStyle: { backgroundColor:'#03718D' },
        }}
      >
        <Tab.Screen
          name="List"
          style={{ padding: 8, fontWeight: '700' }}
          options={{ headerShown: false }}>
          {(props) => <PatientMedicationsList {...props} currentUser={currentUser} currentPatient={currentPatient} />}
        </Tab.Screen>
        <Tab.Screen
          name="Check Interactions"
          options={{ headerShown: false }}>
          {(props) => <CheckInteractions {...props} currentUser={currentUser} currentPatient={currentPatient} />}
        </Tab.Screen>
        <Tab.Screen
          name="Allergies"
          options={{ headerShown: false }}>
          {(props) => <Allergies {...props} allergyType='Medicine' currentUser={currentUser} currentPatient={currentPatient} />}
        </Tab.Screen>
      </Tab.Navigator>
    </SafeAreaView>
  )
}

export { MedicationsScreen }

const inlineStyles = StyleSheet.create(
  {
    titleView: { flexDirection: "row", justifyContent: "center", alignContent: "center", marginTop:10 },
    titleText: { fontSize: 18, fontWeight: "bold", color: "#112B37", margin:'0 auto'}
    
  }
)
