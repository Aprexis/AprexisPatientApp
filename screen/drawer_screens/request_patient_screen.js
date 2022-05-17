import React, { useState } from 'react'
import { Keyboard, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { patientApi } from '../../api'
import { alertHelper, userCredentialsHelper, valueHelper } from '../../helpers'

const RequestPatientScreen = ({ navigation, currentUser }) => {
  const [patientName, setPatientName] = useState('')

  const handleSubmitPress = () => {
    if (!patientName) {
      alertHelper.warning('Please fill Patient Name')
      return
    }

    userCredentialsHelper.getUserCredentials(
      (userCredentials) => {
        if (!valueHelper.isValue(userCredentials)) {
          return
        }

        patientApi.index(
          userCredentials,
          { for_name: patientName },
          (patients, _patientHeaders) => {
            if (patients.length == 0) {
              alertHelper.warning('No matching patient found')
              return
            }
            if (patients.length > 1) {
              alertHelper.warning('Multiple matching patients found')
              return
            }

            const currentPatient = patients[0]
            navigation.replace('DrawerNavigationRoutes', { currentUser, currentPatient })
          },
          (message) => {
            alertHelper.error(message)
            return
          }
        )
      }
    )
  }


  return (
    <SafeAreaView style={styles.mainBody}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={
          {
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center'
          }
        }>
        <View>
          <KeyboardAvoidingView enabled>
            <View style={styles.sectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(patientName) => setPatientName(patientName)}
                placeholder='Enter Patient Name'
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                onSubmitEditing={Keyboard.dismiss}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>Select Patient</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export { RequestPatientScreen }

const styles = StyleSheet.create(
  {
    mainBody: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#307ecc',
      alignContent: 'center'
    },
    sectionStyle: {
      flexDirection: 'row',
      height: 40,
      marginTop: 20,
      marginLeft: 35,
      marginRight: 35,
      margin: 10
    },
    buttonStyle: {
      backgroundColor: '#7de24e',
      borderWidth: 0,
      color: '#ffffff',
      borderColor: '#7de24e',
      height: 40,
      alignItems: 'center',
      borderRadius: 30,
      marginLeft: 35,
      marginRight: 35,
      marginTop: 20,
      marginBottom: 25
    },
    buttonTextStyle: {
      color: '#ffffff',
      paddingVertical: 10,
      fontSize: 16
    },
    inputStyle: {
      flex: 1,
      color: 'white',
      paddingLeft: 15,
      paddingRight: 15,
      borderWidth: 1,
      borderRadius: 30,
      borderColor: '#dadae8'
    }
  }
)
