import React from 'react'
import { Button, View } from 'react-native'
import { FontAwesome5Icon } from './font_awesome5_icon'
import { valueHelper } from '../../helpers'

function AddButton({ buttonProps, buttonTitle, iconName, iconProps, onPress, viewProps }) {
  const button = valueHelper.isStringValue(buttonTitle) ? buttonTitle : 'Add'
  const icon = valueHelper.isStringValue(iconName) ? iconName : 'plus'

  return (
    <View {...viewProps} style={{ flexDirection: 'row', alignItems: 'center' }}>
      <FontAwesome5Icon {...iconProps} size={20} name={icon} />
      <Button onPress={onPress} title={button} />
    </View>
  )
}

export { AddButton }
