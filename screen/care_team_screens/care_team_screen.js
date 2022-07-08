import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { CaregiverInfo } from './caregiver_info'
import { CaregiversList } from './caregivers_list'
import { HcpsList } from './hcps_list'
import { PharmacistsList } from './pharmacists_list'
import { currentUserHelper } from '../../helpers'
import { Button } from 'react-native-paper'
import { FontAwesome5Icon } from '../components'
import { styles } from '../../assets/styles'

const Stack = createNativeStackNavigator()
const Tab = createMaterialTopTabNavigator()

function CaregiversScreenStack(props) {
  const { caregiver } = props
  const { currentUser, currentPatient } = currentUserHelper.getCurrentProps(props)

  return (
    <Stack.Navigator
      screenOptions={
        { 
          headerStyle: { backgroundColor: '#E0EBF1', height:35 }, 
          headerTitleStyle:{ color:'#003949' },
          headerShadowVisible: false
        }
      }
    >
      <Stack.Screen
        name="CaregiversList"
        options={{ headerShown: false }}
        >
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
    <SafeAreaView style={ styles.mainBody }>
      <View style={ [styles.row, { justifyContent:'flex-end' }] }>
          <View style={{ flex:.6, textAlign:'center' }}>
            <Text style={inlineStyles.titleText}>CARE TEAM</Text>
          </View>
          <View style={{ flex:.2, paddingRight:2 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Button
                icon={({ size, color }) => (
                  <FontAwesome5Icon name="plus" size={14} color="#03718D" style={{ marginLeft:'-8px' }}  />
                )}
                mode="outlined" 
                onPress={() => console.log('Add Care Team Member')}
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
      <View style={{ flex: 1, padding:8, paddingTop:0 }}>
        <Tab.Navigator
          style={{ marginBottom:12, textAlign:'center' }}
          screenOptions={{
            tabBarLabelStyle: { fontSize: 14, fontWeight: '600' },
            tabBarStyle: { backgroundColor: '#E1EBF1', marginBottom:14  },
            tabBarIndicatorStyle: { backgroundColor:'#03718D' },
          }}
        >
        <Tab.Screen
          name="HCPs"
          style={{ padding: 8, fontWeight: '700' }}
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
      </View>
    </SafeAreaView>
  )
} 

export { CareTeamScreen }

const inlineStyles = StyleSheet.create(
  {
    titleView: { flexDirection: "row", justifyContent: "center", alignContent: "center", marginTop:10 },
    titleText: { fontSize: 18, fontWeight: "bold", color: "#112B37", margin:'0 auto'}
  }
)

