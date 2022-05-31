import React from 'react'
import { SafeAreaView, StyleSheet, Text, View} from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Allergies, CheckInteractions, PatientMedicationsList } from "../medications_screens"
import { currentUserHelper } from '../../helpers'
import { Button } from 'react-native-paper'
import { FontAwesome5Icon } from '../components'

const Tab = createMaterialTopTabNavigator()

function MedicationsScreen(props) {
  const { currentUser, currentPatient } = currentUserHelper.getCurrentProps(props)
  console.log(`Styles; ${JSON.stringify(styles, null, 2)}`)

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{border:'solid red 1px', display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}}>
          <View style={{border:'solid green 1px', flex:.6, textAlign:'center'}}>
            <Text style={styles.titleText}>MEDICATIONS</Text>
          </View>
          <View style={{border:'solid blue 1px', flex:.2, paddingRight:2}}>
            <Button
              icon={({ size, color }) => (
                <FontAwesome5Icon name="plus" size={14} color="#fff" style={{marginLeft:'-8px'}}  />
              )}
              mode="contained" 
              onPress={() => console.log('Pressed')}
              contentStyle={{border:'solid red 1px', padding:'0', width:'auto', height:30}}
              style={{border:'solid red 1px', padding:'0', width:'auto', float:'left'}}
              labelStyle={{color:'red', padding:0, width:'auto'}}
              compact='true'
            >
              Add
            </Button>
          </View>
      </View>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>MEDICATIONS</Text>
        <Button
          icon={({ size, color }) => (
            <FontAwesome5Icon name="plus" size={14} color="#fff" style={{marginLeft:'-8px'}}  />
          )}
          mode="contained" 
          onPress={() => console.log('Pressed')}
          contentStyle={{border:'solid red 1px', padding:'0', width:'auto', height:30}}
          style={{border:'solid red 1px', padding:'0', width:'auto', float:'left'}}
          labelStyle={{color:'red', padding:0, width:'auto'}}
          compact='true'
        >
          Add
        </Button>
      </View>
      <Tab.Navigator
        style={{ padding:8, marginBottom:12 }}
        screenOptions={{
          tabBarLabelStyle: { fontSize: 14, fontWeight:600 },
          tabBarStyle: { backgroundColor: '#E1EBF1' },
          tabBarIndicatorStyle: {border:'none'},
        }}
      >
        <Tab.Screen
          name="List"
          style={{ padding:8, fontWeight:700 }}
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
          {(props) => <Allergies {...props} currentUser={currentUser} currentPatient={currentPatient} />}
        </Tab.Screen>
      </Tab.Navigator>
    </SafeAreaView>
  )
}

export { MedicationsScreen }

const styles = StyleSheet.create(
  {

    safeArea: { flex: 1 },
    titleView: { flexDirection: "row", justifyContent: "center", alignContent: "center", marginTop:10 },
    titleText: { fontSize: 18, fontWeight: "bold", color: "#112B37", margin:'0 auto'}
    
  }
)
