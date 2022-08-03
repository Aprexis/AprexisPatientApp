import React, { useState } from 'react'
import { Alert } from 'react-native'
import { Button, Menu } from 'react-native-paper'
import { FontAwesome5Icon } from './font_awesome5_icon'
import { authenticationApi, valueHelper } from '@aprexis/aprexis-api-utility'
import { apiEnvironmentHelper, userCredentialsHelper } from '../../helpers'
import { styles } from '../../assets/styles'

function HeaderRight({ onProfile, performLogout }) {
  const [menuVisible, setMenuVisible] = useState(false)

  return (
    <Menu
      anchor={<Button onPress={openMenu}><FontAwesome5Icon size={25} name="cog" /></Button>}
      onDismiss={closeMenu}
      style={[styles.inputField, { fontSize: 15 }]}
      visible={valueHelper.isSet(menuVisible)}>
      <Menu.Item title='Profile' onPress={() => { closeMenu(); onProfile() }} />
      <Menu.Item title='Logout' onPress={() => { closeMenu(); logout() }} />
    </Menu>
  )

  function closeMenu() {
    setMenuVisible(false)
  }

  function logout() {
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
                  apiEnvironmentHelper.apiEnvironment(userCredentials),
                  () => { userCredentialsHelper.removeUserCredentials(performLogout) }
                )
              }
            )
          }
        }
      ],
      { cancelable: false }
    )
  }

  function openMenu() {
    setMenuVisible(true)
  }
}

export { HeaderRight }
