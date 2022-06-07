import React from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-paper'
import { FontAwesome5Icon } from './font_awesome5_icon'
import { valueHelper } from '../../helpers'
import styles from '../../assets/styles.js'

function AddButton({ buttonProps, buttonTitle, iconName, iconProps, onPress, viewProps }) {
  const button = valueHelper.isStringValue(buttonTitle) ? buttonTitle : 'Add'
  const icon = valueHelper.isStringValue(iconName) ? iconName : 'plus'

  return (
    <View {...viewProps} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      <Button
        icon={({ size, color }) => (
          <FontAwesome5Icon {...iconProps} name='plus' size={14} color="#fff" style={{ marginLeft:'-8px' }}  />
        )}
        mode="contained" 
        onPress={onPress}
        title={button} 
        contentStyle={[styles.btnPrimary, { height:30 }]}
        style={{backgroundColor:'transparent'}}
        compact='true'
        labelStyle={{backgroundColor:'transparent'}}
      >
        Add
      </Button>
    </View>
  )
}

export { AddButton }
