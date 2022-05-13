import React from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList
} from '@react-navigation/drawer'
import { authenticationApi } from '../../api'
import { userCredentialsHelper } from '../../helpers'

const CustomSidebarMenu = (props) => {
  return (
    <View style={stylesSidebar.sideMenuContainer}>
      <View style={stylesSidebar.profileHeader}>
        <View style={stylesSidebar.profileHeaderPicCircle}>
          <Text style={{ fontSize: 25, color: '#307eff' }}>
            {'Aprexis Patient App'.charAt(0)}
          </Text>
        </View>
        <Text style={stylesSidebar.profileHeaderText}>
          Aprexis Patient App
        </Text>
      </View>
      <View style={stylesSidebar.profileHeaderLine} />

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label={() => (<Text style={{ color: '#d8d8d8' }}>Logout</Text>)}
          onPress={() => {
            props.navigation.toggleDrawer()
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
                            userCredentialsHelper.removeUserCredentials(() => { props.parentNavigation.replace('LoginScreen') })
                          }
                        )
                      }
                    )
                  }
                }
              ],
              { cancelable: false }
            )
          }}
        />
      </DrawerContentScrollView>
    </View>
  )
}

export { CustomSidebarMenu }

const stylesSidebar = StyleSheet.create(
  {
    sideMenuContainer: {
      width: '100%',
      height: '100%',
      backgroundColor: '#307ecc',
      paddingTop: 40,
      color: 'white'
    },
    profileHeader: {
      flexDirection: 'row',
      backgroundColor: '#307ecc',
      padding: 15,
      textAlign: 'center'
    },
    profileHeaderPicCirlce: {
      width: 60,
      height: 60,
      borderRadius: 30,
      color: 'white',
      backgroundColor: '#ffffff',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center'
    },
    profileHeaderText: {

      color: 'white',
      alignSelf: 'center',
      paddingHorizontal: 10,
      fontWeight: 'bold'
    },
    profileHeaderLine: {
      height: 1,
      marginHorizontal: 20,
      backgroundColor: '#e2e2e2',
      marginTop: 15
    }
  }
)
