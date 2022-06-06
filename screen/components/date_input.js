import React from 'react'
import { Text, View } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { dateHelper, valueHelper } from '../../helpers'

function DateInput({ disabled, field, fieldProps, label, labelProps, onChange, onPress, pickerProps, showPicker, value, viewProps }) {
  const formattedDate = typeof value === 'String' ? value : dateHelper.formatDate(value, 'yyyy-MM-dd')

  return (
    <View {...viewProps} style={{ flexDirection: 'row' }}>
      <Text {...labelProps} style={{ margin: 2 }}>{label}</Text>
      <Text
        {...fieldProps}
        style={{ margin: 2 }}
        onPress={
          () => {
            if (!valueHelper.isSet(disabled)) {
              onPress(field)
            }
          }
        }>
        {formattedDate}
      </Text>
      {
        valueHelper.isSet(showPicker) &&
        <DateTimePicker
          mode='date'
          {...pickerProps}
          onChange={(_event, date) => { onChange(field, date) }}
          value={value}
        />
      }
    </View >
  )
}

export { DateInput }
