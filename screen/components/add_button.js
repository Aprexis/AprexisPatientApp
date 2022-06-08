import React from 'react'
import { Button, TouchableOpacity } from 'react-native'
import { FontAwesome5Icon } from './font_awesome5_icon'
import { valueHelper } from '../../helpers'

function AddButton({ buttonProps, buttonTitle, iconName, iconProps, onPress, viewProps }) {
  const button = valueHelper.isStringValue(buttonTitle) ? buttonTitle : 'Add'
  const icon = valueHelper.isStringValue(iconName) ? iconName : 'plus'

  return (
    <TouchableOpacity {...viewProps} style={{ flexDirection: 'row', alignItems: 'center' }} onPress={onPress}>
      <FontAwesome5Icon {...iconProps} size={20} name={icon} />
      <Button {...buttonProps} onPress={onPress} title={button} />
    </TouchableOpacity>
  )
}

export { AddButton }
