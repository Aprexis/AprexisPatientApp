import React, { useState, createRef } from 'react'
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { authenticationApi } from '../api'
import { Loader } from './components'
import { alertHelper, userCredentialsHelper, currentUserHelper } from '../helpers'
import styles from '../assets/styles.js'

function LoginScreen({ navigation }) {
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const passwordInputRef = createRef()

  const handleSubmitPress = () => {
    if (!userEmail) {
      alertHelper.warning('Please fill Email')
      return
    }
    if (!userPassword) {
      alertHelper.warning('Please fill Password')
      return
    }

    setLoading(true)
    authenticationApi.signIn(
      userEmail,
      userPassword,
      (userCredentials) => {
        setLoading(false)
        userCredentialsHelper.storeUserCredentials(
          userCredentials,
          () => {
            currentUserHelper.loadCurrentUser(userCredentials, (currentUser, currentPatient) => { gotoPatient(navigation, currentUser, currentPatient) })

            function gotoPatient(navigation, currentUser, currentPatient) {
              navigation.navigate('PatientScreen', { currentUser, currentPatient })
            }
          })
      },
      (message) => {
        setLoading(false)
        alertHelper.error(message)
        return
      }
    )
  }

  return (
    <View style={styles.mainFullScreen}>
      <Loader loading={loading} />
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
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../assets/logo.svg')}
                style={{
                  width: "57%",
                  height: 100,
                  resizeMode: 'contain',
                }}
              />
            </View>
            <View style={styles.sectionStyle}>
              <TextInput
              style={styles.inputField}
              onChangeText={(userEmail) => setUserEmail(userEmail)}
              placeholder="Enter Username"
              placeholderTextColor="#8b9cb5"
              autoCapitalize='none'
              keyboardType='email-address'
              returnKeyType='next'
              onSubmitEditing={() =>
                passwordInputRef.current &&
                passwordInputRef.current.focus()
              }
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
              />
            </View>
            <View style={styles.sectionStyle}>
              <TextInput
                style={styles.inputField}
                onChangeText={(userPassword) => setUserPassword(userPassword)}
                placeholder='Enter Password'
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>Login</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  )
}

export { LoginScreen }
