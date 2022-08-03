import React from 'react'
import { Alert, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcon } from './material_community_icon'
import { valueHelper } from '@aprexis/aprexis-api-utility'

function DeleteButton({ itemName, iconName, iconProps, onPress, viewProps }) {
  const icon = valueHelper.isStringValue(iconName) ? iconName : 'delete'
  const iconSize = valueHelper.isValue(iconProps) && valueHelper.isNumberValue(iconProps.size) ? iconProps.size : 20

  return (
    <TouchableOpacity
      {...viewProps}
      style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
      onPress={
        () => {
          Alert.alert(
            `Delete ${itemName}`,
            `Are you sure you want to delete this ${itemName}`,
            [
              {
                text: 'Cancel',
                onPress: () => { return null }
              },
              {
                text: 'Confirm',
                onPress: onPress
              }
            ],
            { cancelable: false }
          )
        }
      }>
      <MaterialCommunityIcon {...iconProps} size={iconSize} name={icon} />
    </TouchableOpacity>
  )
}

export { DeleteButton }
