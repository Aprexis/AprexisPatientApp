import React, { useState, useEffect } from 'react'
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  View
} from 'react-native'
import { valueHelper, userCredentialsHelper } from '../helpers'

const SplashScreen = ({ navigation }) => {
  const [animating, setAnimating] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false)
      userCredentialsHelper.getUserCredentials(
        (userCredentials) => { navigation.navigate(valueHelper.isValue(userCredentials) ? 'DrawerNavigationRoutes' : 'LoginScreen') }
      )
    }, 5000)
  }, [])

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo-large.png')}
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
