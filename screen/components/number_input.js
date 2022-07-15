import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-paper'
import { valueHelper } from "../../helpers"

function NumberInput(props) {
  const textInputProps = { ...props }
  delete textInputProps.allowDecimal
  const number = forceNumber(props.value)
  const [text, setText] = useState(`${number}`)

  useEffect(() => { setText(`${number}`) })

  return (<TextInput {...textInputProps} keyboardType='decimal-pad' value={text} onChangeText={onChangeText} />)

  function forceNumber(value) {
    if (valueHelper.isNumberValue(value)) {
      return value
    }

    return 0
  }

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
