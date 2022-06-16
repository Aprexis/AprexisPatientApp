import React, { useEffect, useReducer } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { AddressInput } from '../components'
import { caregiverApi } from '../../api'
import { valueHelper, alertHelper, caregiverHelper, userCredentialsHelper, currentUserHelper } from "../../helpers"
import { relationships } from "../../types"

function CaregiverInfo(props) {
  const [state, dispatch] = useReducer(updateState, initialState())
  const { currentPatient } = currentUserHelper.getCurrentProps(props)

  useEffect(
    () => {
      if (!state.needLoad) {
        return
      }

      const { caregiver } = state

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
  )

  const { caregiver, changedCaregiver } = state
  const isNewCaregiver = !valueHelper.isNumberValue(caregiverHelper.id(caregiver))

  return (
    <View style={styles.caregiverInfo.view}>
      <View style={styles.caregiverInfo.infoArea}>
        <View style={styles.caregiverInfo.profileFieldView}>
          <Text style={styles.caregiverInfo.profileFieldName}>First Name</Text>
          <TextInput
            style={styles.caregiverInfo.profileFieldValue}
            onChangeText={(firstName) => { changeValue('first_name', firstName) }}
            value={caregiverHelper.firstName(caregiver)}
          />
        </View>

        <View style={styles.caregiverInfo.profileFieldView}>
          <Text style={styles.caregiverInfo.profileFieldName}>Last Name</Text>
          <TextInput
            style={styles.caregiverInfo.profileFieldValue}
            onChangeText={(lastName) => { changeValue('last_name', lastName) }}
            value={caregiverHelper.lastName(caregiver)}
          />
        </View>

        <View style={styles.caregiverInfo.profileFieldView}>
          <Text style={styles.caregiverInfo.profileFieldName}>Relationship</Text>
          <Text style={styles.caregiverInfo.profileFieldValue}>{caregiverHelper.relationship(caregiver)}</Text>
        </View>
        <View>
          <Picker
            enabled={true}
            style={styles.caregiverInfo.profileFieldValue}
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

        <View style={{ flexDirection: 'row' }}>
          <Button
            onPress={cancel}
            title='Cancel'
            style={{ marginRight: 10 }}
          />
          <Button
            onPress={ok}
            title='OK' />
        </View>
      </View>
    </View>
  )

  function cancel() {
    const { navigation } = props

    navigation.pop()
  }

  function changeValue(fieldName, newValue) {
    const updated = caregiverHelper.changeField(caregiver, changedCaregiver, fieldName, newValue)
    dispatch({ type: 'UPDATE-DATA', caregiver: updated.caregiver, changedCaregiver: updated.changedCaregiver })
  }

  function initialState() {
    const { caregiver } = props.route.params
    return { needLoad: true, caregiver }
  }

  function ok() {
    const { navigation } = props

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
            (_newCaregiver) => { navigation.pop() },
            (message) => {
              dispatch({ type: 'ERROR' })
              alertHelper.error(message)
              return
            }
          )
          return
        }

        if (!valueHelper.isValue(changedCaregiver)) {
          navigation.pop()
          return
        }

        caregiverApi.update(
          userCredentials,
          changedCaregiver,
          (_updatedCaregiver) => { navigation.pop() },
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

export { CaregiverInfo }

const styles = StyleSheet.create(
  {
    caregiverInfo: {
      view: { flex: 1, flexDirection: 'column' },
      infoArea: { flexDirection: "column" },
      profileFieldView: { flexDirection: "row", margin: 5, alignItems: 'center' },
      profileFieldName: { fontWeight: "bold", marginRight: 5 },
      profileFieldValue: {}
    }
  }
)
