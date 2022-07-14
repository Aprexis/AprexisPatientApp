import React, { useReducer } from 'react'
import { Modal, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import { valueHelper, alertHelper } from "../../helpers"
import { styles } from '../../assets/styles'

function AprexisModal(props) {
  const [state, dispatch] = useReducer(updateState, initialState())
  const { displayModel, visible } = props
  const { changedModel, fields, model } = state


  return (
    <Modal visible={visible} onRequestClose={cancel} onShow={loadModal}>
      <View style={styles.mainBody}>
        {displayModel(model, changedModel, fields, inlineStyles, changeValue, setField)}

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', display: 'flex', marginTop: 8 }}>
          <Button
            mode="outlined"
            onPress={cancel}
            style={{ borderColor: '#03718D' }}
            color="#03718D"
            compact='true'
            title='Cancel'>
            <Text style={styles.buttonTextStyle}>Cancel</Text>
          </Button>
          <Button
            onPress={ok}
            style={[styles.btnPrimary, { marginRight: 10, display: 'flex', textAlign: 'center' }]}
            color="#03718D"
            compact='true'
            title='Save'>
            <Text style={styles.buttonTextStyle}>Save</Text>
          </Button>
        </View>
      </View>
    </Modal>
  )

  function cancel() {
    closeModal()
  }

  function changeValue(fieldName, newValue) {
    const { getChangedModelFrom, getModelFrom, helper } = props
    const updated = helper.changeField(model, changedModel, fieldName, newValue)
    dispatch({ type: 'UPDATE-DATA', model: getModelFrom(updated), changedModel: getChangedModelFrom(updated) })
  }

  function closeModal() {
    const { onClose } = props

    dispatch({ type: 'CLEAR' })
    onClose()
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
        return newState

      case 'LOAD-DATA':
        return { ...oldState, needLoad: false, model: action.model, changedModel: action.changedModel }

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
    view: { flex: 1, flexDirection: 'column' },
    infoArea: { flexDirection: "column" },
    profileFieldView: { flexDirection: "row", alignItems: 'center', marginTop: -5, marginBottom: -5 },
    profileFieldName: { fontWeight: "bold", marginRight: 5, display: 'flex', justifyContent: 'flex-end' },
    profileFieldValue: { border: 'solid #ccc' }
  }
)
