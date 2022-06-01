import React, { useState } from 'react'
import { TextInput } from 'react-native'
import { valueHelper } from "../../helpers"

function NumberInput(props) {
  const textInputProps = { ...props }
  delete textInputProps.allowDecimal
  const [text, setText] = useState(`${props.value}`)

  return (<TextInput {...textInputProps} keyboardType='decimal-pad' value={text} onChangeText={onChangeText} />)

  function onChangeText(newValue) {
    if (!valueHelper.isNumberValue(newValue)) {
      const value = newValue.replace(/[^0-9]/g, '')
      setText(value)
      return
    }

    const { allowDecimal } = props
    if (!valueHelper.isSet(allowDecimal)) {
      if (newValue.includes('.')) {
        const value = newValue.replace('.', '')
        setText(value)
        return
      }
    }

    setText(newValue)
    props.onChangeText(newValue)
  }
}

export { NumberInput }
