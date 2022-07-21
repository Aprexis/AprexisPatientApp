import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { Button, Menu } from 'react-native-paper'
import { valueHelper } from '../../helpers'
import { genders } from '../../types'
import { styles } from '../../assets/styles'

function GenderInput({ gendered, helper, inlineStyles, onChangeValue }) {
  const [menuVisible, setMenuVisible] = useState(false)

  return (
    <View style={inlineStyles.profileFieldView}>
      <Text style={inlineStyles.profileFieldName}>Gender</Text>
      <Menu
        anchor={<Button onPress={openMenu}>{helper.gender(gendered)}</Button>}
        onDismiss={closeMenu}
        style={[styles.inputField, { fontSize: 15 }]}
        visible={valueHelper.isSet(menuVisible)}>
        {
          genders.map(
            (gender) => {
              return (<Menu.Item key={`gender-method-${gender}`} title={gender} onPress={() => { closeActionMenu(); onChangeValue('gender', gender) }} />)
            }
          )
        }
      </Menu>
    </View>
  )

  function closeMenu() {
    setMenuVisible(false)
  }

  function openMenu() {
    setMenuVisible(true)
  }
}

export { GenderInput }
