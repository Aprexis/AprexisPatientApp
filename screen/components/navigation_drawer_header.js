import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const NavigationDrawerHeader = (props) => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer()
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Text>*</Text>
      </TouchableOpacity>
    </View>
  )
}

export { NavigationDrawerHeader }
