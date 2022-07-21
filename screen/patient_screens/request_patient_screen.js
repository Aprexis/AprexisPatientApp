import React, { useState } from 'react'
import { Keyboard, KeyboardAvoidingView, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-paper'
import { patientApi } from '../../api'
import { alertHelper, currentUserHelper, valueHelper } from '../../helpers'
import { styles } from '../../assets/styles'

function RequestPatientScreen(props) {
  const { nextScreen, setCurrentPatient, setStackScreen } = props
  const { userCredentials } = currentUserHelper.getCurrentProps(props)
  const [patientName, setPatientName] = useState('')

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
      </ScrollView>
    </SafeAreaView>
  )

  function handleSubmitPress() {
    if (!patientName) {
      alertHelper.warning('Please fill Patient Name')
      return
    }
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
        setCurrentPatient(currentPatient)
        setStackScreen(nextScreen)
      },
      alertHelper.handleError
    )
  }

}

export { RequestPatientScreen }
