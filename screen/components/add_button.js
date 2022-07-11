import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Button } from 'react-native-paper'
import { FontAwesome5Icon } from './font_awesome5_icon'
import { valueHelper } from '../../helpers'

function AddButton({ buttonProps, buttonTitle, iconName, iconProps, onPress, viewProps }) {
  const button = valueHelper.isStringValue(buttonTitle) ? buttonTitle : 'Add'
  const icon = valueHelper.isStringValue(iconName) ? iconName : 'plus'

  return (
    <TouchableOpacity {...viewProps} onPress={onPress} style={{ display: 'flex', alignSelf: 'flex-end', }}>
      <Button
        icon={({ size, color }) => (
          <FontAwesome5Icon {...iconProps} name={icon} size={14} color="#03718D" style={{ marginLeft: -8 }} />
        )}
        mode="outlined"
        {...buttonProps}
        onPress={onPress}
        title={button}
        style={{ borderColor: '#03718D' }}
        compact='true'
        labelStyle={{ color: '#03718D' }}>
        Add
      </Button>
    </TouchableOpacity>
  )
}

export { AddButton }
