import React from 'react'
import { View, TouchableOpacity  } from 'react-native'
import { Button } from 'react-native-paper'
import { FontAwesome5Icon } from './font_awesome5_icon'
import { valueHelper } from '../../helpers'
import styles from '../../assets/styles.js'

function AddButton({ buttonProps, buttonTitle, iconName, iconProps, onPress, viewProps }) {
  const button = valueHelper.isStringValue(buttonTitle) ? buttonTitle : 'Add'
  const icon = valueHelper.isStringValue(iconName) ? iconName : 'plus'

  return (
      <TouchableOpacity {...viewProps} onPress={onPress}>
        <Button
          icon={({ size, color }) => (
            <FontAwesome5Icon {...iconProps} name='plus' size={14} color="#03718D" style={{ marginLeft:'-8px' }}  />
          )}
          mode="outlined"
          {...buttonProps}
          onPress={onPress}
          title={button} 
          contentStyle={{ height:30 }}
          style={{ borderColor:'#03718D', width:'fit-content'}}
          compact='true'
          labelStyle={{ color:'#03718D' }}
        >
          Add
        </Button>
      </TouchableOpacity>
  )
}

export { AddButton }
