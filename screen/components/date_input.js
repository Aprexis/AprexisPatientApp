import React from 'react'
import { Text, View } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { dateHelper, valueHelper } from '../../helpers'
import { styles } from '../../assets/styles'

function DateInput({ disabled, field, fieldProps, label, labelProps, onChange, onPress, pickerProps, showPicker, value, viewProps }) {
  const formattedDate = dateValue()

  return (
    <View {...viewProps} style={{ flexDirection: 'row', alignItems: 'center', display: 'flex' }}>
      <Text {...labelProps} style={[styles.inlineLabel, { margin: 2 }]}>{label}</Text>
      <Text
        {...fieldProps}
        style={styles.picker}
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
        !valueHelper.isSet(disabled) && valueHelper.isSet(showPicker) &&
        <DateTimePicker
          mode='date'
          {...pickerProps}
          onChange={(_event, date) => { onChange(field, date) }}
          value={valueHelper.isValue(value) ? value : new Date()}
        />
      }
    </View >
  )

  function dateValue() {
    if (!['String', undefined].includes(value)) {
      return dateHelper.formatDate(value, 'yyyy-MM-dd')
    }

    if (!valueHelper.isStringValue(value)) {
      return 'None'
    }

    return value
  }
}

export { DateInput }
