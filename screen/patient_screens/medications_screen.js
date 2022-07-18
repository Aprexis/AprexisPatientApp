import React from 'react'
import { SafeAreaView, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Allergies, CheckInteractions, PatientMedicationsList } from "../medications_screens"
import { currentUserHelper } from '../../helpers'
import { Button } from 'react-native-paper'
import { FontAwesome5Icon } from '../components'
import { styles } from '../../assets/styles'

import { TabView, SceneMap } from 'react-native-tab-view';


function MedicationsScreen(props, { navigation }: RootTabScreenProps<'TabOne'>) {
  const { currentUser, currentPatient } = currentUserHelper.getCurrentProps(props)
  //console.log(`Styles; ${JSON.stringify(styles, null, 2)}`)

  const medicationsList = () => (
    <View>
      {(props) => <PatientMedicationsList {...props} currentUser={currentUser} currentPatient={currentPatient} />}
    </View>
    );

  const checkInteractions = () => (
    <View>
      {(props) => <CheckInteractions {...props} currentUser={currentUser} currentPatient={currentPatient} />}
    </View>
  );

  const Allergies = () => (
    <View>
      {(props) => <Allergies {...props} allergyType='Medicine' currentUser={currentUser} currentPatient={currentPatient} />}
    </View>
  );

  const renderScene = SceneMap({
    first: medicationsList,
    second: checkInteractions,
    third: Allergies,
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { first: 'First' },
    { second: 'Second' },
    { third: 'Third' },
  ]);

  return (
    <TabView
      lazy
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />

  )
}

export { MedicationsScreen }
