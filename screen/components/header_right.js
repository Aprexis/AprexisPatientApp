import React from 'react'
import { Alert, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { authenticationApi } from '../../api'
import { currentUserHelper, userCredentialsHelper, userHelper } from '../../helpers'

function LogoutButton(props,) {
  const { currentUser } = currentUserHelper.getCurrentProps(props)
  if (userHelper.hasRole(currentUser, 'patient_user_role')) {
    return
  }

  const { navigation } = props
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {
        Alert.alert(
          'Logout',
          'Are you sure you want to logout?',
          [
            {
              text: 'Cancel',
              onPress: () => { return null }
            },
            {
              text: 'Confirm',
              onPress: () => {
                userCredentialsHelper.getUserCredentials(
                  (userCredentials) => {
                    authenticationApi.signOut(
                      userCredentials,
                      () => {
                        userCredentialsHelper.removeUserCredentials(() => { navigation.replace('LoginScreen') })
                      }
                    )
                  }
                )
              }
            }
          ],
          { cancelable: false }
        )
      }
      }>
      < Icon size={40} name="user" />
    </TouchableOpacity>
  )
}

function HeaderRight(props) {
  return (
    <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
      {LogoutButton(props)}
    </View >
  )
}

export { HeaderRight }
