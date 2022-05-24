import React, { useState } from 'react'
import { Keyboard, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { patientApi } from '../../api'
import { alertHelper, currentUserHelper, userCredentialsHelper, valueHelper } from '../../helpers'
import styles from '../../assets/styles.js'

function RequestPatientScreen(props) {
  const { navigation } = props
  const { currentUser } = currentUserHelper.getCurrentProps(props)
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
            navigation.replace('PatientScreen', { currentUser, currentPatient })
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
        <View>
          <KeyboardAvoidingView enabled>
            <View style={styles.sectionStyle}>
              <TextInput
                style={styles.inputField}
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
    </SafeAreaView>
  )
}

export { RequestPatientScreen }
