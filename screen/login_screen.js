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

const LoginScreen = ({ navigation }) => {
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
            currentUserHelper.loadCurrentUser(userCredentials, (currentUser, currentPatient) => { gotoDrawer(navigation, currentUser, currentPatient) })

            function gotoDrawer(navigation, currentUser, currentPatient) {
              navigation.navigate('DrawerNavigationRoutes', { currentUser, currentPatient })
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
    <View style={styles.mainBody}>
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
                  margin: 30
                }}
              />
            </View>
            <View style={styles.sectionStyle}>
              <TextInput
                style={styles.inputStyle}
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
                style={styles.inputStyle}
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

const styles = StyleSheet.create(
  {
    mainBody: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#03718D',
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
      backgroundColor: '#74DEFF',
      borderWidth: 0,
      color: '#003949',
      borderColor: '#74DEFF',
      height: 40,
      alignItems: 'center',
      borderRadius: 30,
      marginLeft: 35,
      marginRight: 35,
      marginTop: 20,
      marginBottom: 25
    },
    buttonTextStyle: {
      color: '#003949',
      paddingVertical: 10,
      fontSize: 16,
      fontWeight: 500
    },
    inputStyle: {
      flex: 1,
      color: 'white',
      paddingLeft: 15,
      paddingRight: 15,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#dadae8',
      backgroundColor:'rgba(255,255,255,.65)'
    }
  }
)
