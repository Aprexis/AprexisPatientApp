import React, { useState, useEffect } from 'react'
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  View
} from 'react-native'
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { userCredentialsHelper, currentUserHelper } from '../helpers'

function splashTimeOut(setCurrent, setStackScreen) {
  userCredentialsHelper.getUserCredentials(loadCurrentUser)

  function loadCurrentUser(userCredentials) {
    if (!valueHelper.isValue(userCredentials)) {
      setStackScreen('login')
      return
    }

    currentUserHelper.loadCurrentUser(userCredentials, (currentUser, currentPatient) => { gotoPatient(currentUser, currentPatient) })
  }

  function gotoPatient(currentUser, currentPatient) {
    setCurrent(currentUser, currentPatient)
    setStackScreen('patient')
  }
}

function SplashScreen({ setCurrent, setStackScreen }) {
  const [animating, setAnimating] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false)
      splashTimeOut(setCurrent, setStackScreen)
    }, 5000)
  }, [])

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.svg')}
        style={{ width: '90%', resizeMode: 'contain', margin: 30 }}
      />
      <ActivityIndicator
        animating={animating}
        color="#ffffff"
        size="large"
        style={styles.activityIndicator}
      />
    </View >
  )
}

export { SplashScreen }

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgrounColor: '#307ecc'
    },
    activityIndicator: {
      alignItems: 'center',
      height: 80
    }
  }
)
