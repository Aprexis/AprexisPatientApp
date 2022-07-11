import React, { useReducer } from 'react'
import { Modal, StyleSheet, Text, TextInput, View } from 'react-native'
import { Button } from 'react-native-paper'
import { Picker } from '@react-native-picker/picker'
import { AddressInput } from '../components'
import { caregiverApi } from '../../api'
import { valueHelper, alertHelper, caregiverHelper, userCredentialsHelper, currentUserHelper } from "../../helpers"
import { relationships } from "../../types"
import { styles } from '../../assets/styles'

function CaregiverModal(props) {
  const [state, dispatch] = useReducer(updateState, initialState())
  const { visible } = props
  const { currentPatient } = currentUserHelper.getCurrentProps(props)
  const { caregiver, changedCaregiver } = state

  return (
    <Modal visible={visible} onRequestClose={cancel} onShow={loadModal}>
      <View style={styles.mainBody}>
        <View style={inlineStyles.infoArea}>
          <View style={inlineStyles.profileFieldView}>
            <Text style={inlineStyles.profileFieldName}>First Name</Text>
            <TextInput
              style={styles.inputField}
              onChangeText={(firstName) => { changeValue('first_name', firstName) }}
              value={caregiverHelper.firstName(caregiver)}
            />
          </View>

          <View style={inlineStyles.profileFieldView}>
            <Text style={inlineStyles.profileFieldName}>Last Name</Text>
            <TextInput
              style={styles.inputField}
              onChangeText={(lastName) => { changeValue('last_name', lastName) }}
              value={caregiverHelper.lastName(caregiver)}
            />
          </View>

          <View style={inlineStyles.profileFieldView}>
            <Text style={inlineStyles.profileFieldName}>Relationship</Text>
            <Picker
              enabled={true}
              style={styles.inputField}
              selectedValue={caregiverHelper.relationship(caregiver)}
              onValueChange={(relationship) => { changeValue('relationship', relationship) }}>
              {
                relationships.map(
                  (relationship) => {
                    return (<Picker.Item key={`caregiver-relationship-${relationships}`} label={relationship} value={relationship} />)
                  }
                )
              }
            </Picker>
          </View>

          <AddressInput addressable={caregiver} onChangeValue={changeValue} />

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
      </View>
    </Modal>
  )

  function cancel() {
    const { onClose } = props
    onClose()
  }

  function changeValue(fieldName, newValue) {
    const updated = caregiverHelper.changeField(caregiver, changedCaregiver, fieldName, newValue)
    dispatch({ type: 'UPDATE-DATA', caregiver: updated.caregiver, changedCaregiver: updated.changedCaregiver })
  }

  function initialState() {
    const { caregiver } = props
    return { needLoad: true, caregiver }
  }

  function loadModal() {
    const { caregiver } = props

    userCredentialsHelper.getUserCredentials(
      (userCredentials) => {
        if (!valueHelper.isValue(userCredentials)) {
          return
        }

        if (!valueHelper.isValue(caregiver)) {
          caregiverApi.buildNew(
            userCredentials,
            currentPatient.id,
            (newCaregiver) => {
              dispatch({ type: 'LOAD-DATA', caregiver: newCaregiver })
            },
            (message) => {
              dispatch({ type: 'ERROR' })
              alertHelper.error(message)
              return
            }
          )
          return
        }

        caregiverApi.edit(
          userCredentials,
          caregiver.id,
          (existingCaregiver) => {
            dispatch({ type: 'LOAD-DATA', caregiver: existingCaregiver })
          },
          (message) => {
            dispatch({ type: 'ERROR' })
            alertHelper.error(message)
            return
          }
        )
      }
    )
  }

  function ok() {
    const { onClose } = props

    userCredentialsHelper.getUserCredentials(
      (userCredentials) => {
        const { caregiver, changedCaregiver } = state
        if (!valueHelper.isValue(userCredentials)) {
          return
        }

        if (!valueHelper.isNumberValue(caregiverHelper.id(caregiver))) {
          caregiverApi.create(
            userCredentials,
            changedCaregiver,
            onClose,
            (message) => {
              dispatch({ type: 'ERROR' })
              alertHelper.error(message)
              return
            }
          )
          return
        }

        if (!valueHelper.isValue(changedCaregiver)) {
          onClose()
          return
        }

        caregiverApi.update(
          userCredentials,
          changedCaregiver,
          onClose,
          (message) => {
            dispatch({ type: 'ERROR' })
            alertHelper.error(message)
            return
          }
        )
      }
    )
  }

  function updateState(oldState, action) {
    switch (action.type) {
      case 'ERROR':
        return { ...oldState, needLoad: false }

      case 'LOAD-DATA':
        return { ...oldState, needLoad: false, caregiver: action.caregiver }

      case 'UPDATE-DATA':
        return { ...oldState, needLoad: false, caregiver: action.caregiver, changedCaregiver: action.changedCaregiver }

      default:
        return oldState
    }
  }
}

export { CaregiverModal }

const inlineStyles = StyleSheet.create(
  {
    view: { flex: 1, flexDirection: 'column' },
    infoArea: { flexDirection: "column" },
    profileFieldView: { flexDirection: "row", alignItems: 'center', marginTop: -5, marginBottom: -5 },
    profileFieldName: { fontWeight: "bold", marginRight: 5, display: 'flex', justifyContent: 'flex-end' },
    profileFieldValue: { border: 'solid #ccc' }
  }
)
