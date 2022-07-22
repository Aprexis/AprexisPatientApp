import React, { useEffect, useReducer } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button, Modal, Portal } from 'react-native-paper'
import { valueHelper } from '../../helpers'
import { styles } from '../../assets/styles'
import tw from 'twrnc'

function AprexisModal(props) {
  const [state, dispatch] = useReducer(updateState, initialState())
  const { displayModel, visible } = props
  const { changedModel, fields, model, loaded } = state

  useEffect(
    () => {
      if (valueHelper.isSet(props.visible) && !valueHelper.isSet(loaded)) {
        loadModal()
      }
    }
  )

  return (
    <Portal>
      <Modal visible={visible} onDismiss={cancel} style={{ padding:20 }}>
        <ScrollView
          contentContainerStyle={[styles.scrollView, { alignItems: 'center', padding:10, borderStyle:'solid', borderRadius:5 }]}
          keyboardShouldPersistTaps="handled">
          <View style={{ display:'flex', alignItems: 'center', width:'100%', padding:20, paddingTop:10 }}>
            {displayModel(model, changedModel, fields, inlineStyles, changeValue, setField)}
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', display: 'flex', marginTop: 8, flex:1, width:'100%' }}>
            <Button
              mode='outlined'
              onPress={cancel}
              style={{ borderColor: '#03718D' }}
              color='#03718D'
              compact='true'
              title='Cancel'>
              <Text style={styles.buttonTextStyle}>Cancel</Text>
            </Button>
            <Button
              onPress={ok}
              style={[styles.btnPrimary, { display: 'flex', textAlign: 'center' }]}
              color='#03718D'
              compact='true'
              title='Save'>
              <Text style={styles.buttonTextStyle}>Save</Text>
            </Button>
          </View>
        </ScrollView>
      </Modal>
    </Portal>
  )

  function cancel() {
    closeModal()
  }

  function changeValue(fieldName, newValue) {
    const { getChangedModelFrom, getModelFrom, helper } = props
    const updated = updateModel(model, changedModel, fieldName, newValue)
    dispatch({ type: 'UPDATE-DATA', model: getModelFrom(updated), changedModel: getChangedModelFrom(updated) })

    function updateModel(model, changedModel, fieldName, newValue) {
      if (Array.isArray(fieldName)) {
        return updateModelFromArray(model, changedModel, fieldName, newValue)
      }

      return helper.changeField(model, changedModel, fieldName, newValue)

      function updateModelFromArray(model, changedModel, fieldNames, newValues) {
        let updated = helper.changeField(model, changedModel, fieldNames[0], newValues[0])

        for (let idx = 1; idx < fieldNames.length; ++idx) {
          const workingModel = getModelFrom(updated)
          const workingChangedModel = getChangedModelFrom(updated)
          updated = helper.changeField(workingModel, workingChangedModel, fieldNames[idx], newValues[idx])
        }

        return updated
      }
    }
  }

  function closeModal() {
    const { onClose } = props

    onClose()
    dispatch({ type: 'CLEAR' })
  }

  function initialState() {
    const { getModelFrom } = props

    return { needLoad: true, fields: {}, model: getModelFrom(props) }
  }

  function loadModal() {
    const { action, buildNewModel, loadEditModel } = props

    if (action == 'ADD') {
      buildNewModel((newModel, changedNewModel) => { dispatch({ type: 'LOAD-DATA', model: newModel, changedModel: changedNewModel }) })
      return
    }

    loadEditModel((loadedModel) => { dispatch({ type: 'LOAD-DATA', model: loadedModel, changedModel: undefined }) })
  }

  function ok() {
    const { createModel, helper, updateModel } = props
    const { model, changedModel } = state
    if (!valueHelper.isNumberValue(helper.id(model))) {
      createModel(changedModel, closeModal)
      return
    }

    if (!valueHelper.isValue(changedModel)) {
      closeModal()
      return
    }

    updateModel(changedModel, closeModal)
  }

  function setField(fieldName, fieldValue) {
    dispatch({ type: 'SET-FIELD', fieldName, fieldValue })
  }

  function updateState(oldState, action) {
    switch (action.type) {
      case 'CLEAR':
        const newState = { ...oldState }
        delete newState.model
        delete newState.changedModel
        newState.loaded = false
        return newState

      case 'LOAD-DATA':
        return { ...oldState, needLoad: false, model: action.model, changedModel: action.changedModel, loaded: true }

      case 'SET-FIELD':
        return { ...oldState, fields: { ...oldState.fields, [action.fieldName]: action.fieldValue } }

      case 'UPDATE-DATA':
        return { ...oldState, needLoad: false, model: action.model, changedModel: action.changedModel }

      default:
        return oldState
    }
  }
}

export { AprexisModal }

const inlineStyles = StyleSheet.create(
  {
    infoArea: { flexGrow: 1, flexDirection: 'column' },
    profileFieldView: { flexDirection: 'row', alignItems: 'center', alignSelf:'center', marginTop:10 },
    profileFieldName: { fontWeight: '500', marginRight: 5, display: 'flex', justifyContent: 'flex-end', fontSize:16 },
    profileFieldValue: { border: 'solid #ccc' }
  }
)
