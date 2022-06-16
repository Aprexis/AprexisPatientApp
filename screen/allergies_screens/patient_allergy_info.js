import React, { useEffect, useReducer } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { NumberInput } from "../components"
import { patientAllergyApi } from '../../api'
import { valueHelper, alertHelper, currentUserHelper, patientAllergyHelper, userCredentialsHelper } from "../../helpers"
import { allergyCategories } from '../../types'

function PatientAllergyInfo(props) {
  const [state, dispatch] = useReducer(updateState, initialState())
  const { allergyType } = props.route.params
  const { currentPatient } = currentUserHelper.getCurrentProps(props)

  useEffect(
    () => {
      if (!state.needLoad) {
        return
      }

      const { patientAllergy } = state

      userCredentialsHelper.getUserCredentials(
        (userCredentials) => {
          if (!valueHelper.isValue(userCredentials)) {
            return
          }

          if (!valueHelper.isValue(patientAllergy)) {
            patientAllergyApi.buildNew(
              userCredentials,
              currentPatient.id,
              (newPatientAllergy) => {
                const updated = valueHelper.isStringValue(allergyType) ?
                  patientAllergyHelper.changeField(newPatientAllergy, patientAllergyHelper.buildChanged(newPatientAllergy), 'allergy_type', allergyType) :
                  { patientAllergy: newPatientAllergy, changedPatientAllergy: patientAllergyHelper.buildChanged(newPatientAllergy) }
                dispatch({
                  type: 'LOAD-DATA', patientAllergy: updated.patientAllergy, changedPatientAllergy: updated.changedPatientAllergy
                })
              },
              (message) => {
                alertHelper.error(message)
                dispatch({ type: 'ERROR' })
                return
              }
            )
            return
          }

          patientAllergyApi.edit(
            userCredentials,
            patientAllergy.id,
            (existingPatientAllergy) => {
              dispatch({ type: 'LOAD-DATA', patientAllergy: existingPatientAllergy })
            },
            (message) => {
              alertHelper.error(message)
              dispatch({ type: 'ERROR' })
              return
            }
          )
        }
      )
    }
  )

  const { patientAllergy, changedPatientAllergy } = state
  const isNewPatientAllergy = !valueHelper.isNumberValue(patientAllergyHelper.id(patientAllergy))

  return (
    <View style={styles.allergyInfo.view}>
      <View style={styles.allergyInfo.infoArea}>
        <View style={styles.allergyInfo.profileFieldView}>
          <Text style={styles.allergyInfo.profileFieldName}>Name</Text>
          <TextInput
            editable={isNewPatientAllergy}
            style={styles.allergyInfo.profileFieldValue}
            onChangeText={(allergyName) => { changeValue('allergy_name', allergyName) }}
            value={patientAllergyHelper.allergyName(patientAllergy)}
          />
        </View>

        <View style={styles.allergyInfo.profileFieldView}>
          <Text style={styles.allergyInfo.profileFieldName}>Type</Text>
          <Text style={styles.allergyInfo.profileFieldValue}>{patientAllergyHelper.allergyType(patientAllergy)}</Text>
        </View>

        <View>
          <Picker
            enabled={!valueHelper.isStringValue(allergyType)}
            selectedValue={patientAllergyHelper.allergyType(patientAllergy)}
            onValueChange={(allergyType) => { changeValue('allergy_type', allergyType) }}>
            {
              allergyCategories.map(
                (allergyType) => {
                  return (<Picker.Item key={`allergy-type-${allergyType}`} label={allergyType} value={allergyType} />)
                }
              )
            }
          </Picker>
        </View>

        <View style={styles.allergyInfo.profileFieldView}>
          <Text style={styles.allergyInfo.profileFieldName}>Year</Text>
          {
            !state.needLoad &&
            <NumberInput
              style={styles.allergyInfo.profileFieldValue}
              onChangeText={(year) => { changeValue('year', year) }}
              value={patientAllergyHelper.year(patientAllergy)}
            />
          }
        </View>

        <View style={styles.allergyInfo.profileFieldView}>
          <Text style={styles.allergyInfo.profileFieldName}>Reaction</Text>
          <TextInput
            style={styles.allergyInfo.profileFieldValue}
            onChangeText={(reaction) => { changeValue('reaction', reaction) }}
            value={patientAllergyHelper.reaction(patientAllergy)}
          />
        </View>
      </View>

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
  )

  function cancel() {
    const { navigation } = props

    navigation.pop()
  }

  function changeValue(fieldName, newValue) {
    const updated = patientAllergyHelper.changeField(patientAllergy, changedPatientAllergy, fieldName, newValue)
    dispatch({ type: 'UPDATE-DATA', patientAllergy: updated.patientAllergy, changedPatientAllergy: updated.changedPatientAllergy })
  }

  function initialState() {
    const { patientAllergy } = props.route.params
    return { needLoad: true, patientAllergy }
  }

  function ok() {
    const { navigation } = props

    userCredentialsHelper.getUserCredentials(
      (userCredentials) => {
        const { patientAllergy, changedPatientAllergy } = state
        if (!valueHelper.isValue(userCredentials)) {
          return
        }

        if (!valueHelper.isNumberValue(patientAllergyHelper.id(patientAllergy))) {
          patientAllergyApi.create(
            userCredentials,
            changedPatientAllergy,
            (_newPatientAllergy) => { navigation.pop() },
            (message) => {
              alertHelper.error(message)
              dispatch({ type: 'ERROR' })
              return
            }
          )
          return
        }

        if (!valueHelper.isValue(changedPatientAllergy)) {
          navigation.pop()
          return
        }

        patientAllergyApi.update(
          userCredentials,
          changedPatientAllergy,
          (_updatedPatientAllergy) => { navigation.pop() },
          (message) => {
            alertHelper.error(message)
            dispatch({ type: 'ERROR' })
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
        return { ...oldState, needLoad: false, patientAllergy: action.patientAllergy }

      case 'UPDATE-DATA':
        return { ...oldState, needLoad: false, patientAllergy: action.patientAllergy, changedPatientAllergy: action.changedPatientAllergy }

      default:
        return oldState
    }
  }
}

export { PatientAllergyInfo }

const styles = StyleSheet.create(
  {
    allergyInfo: {
      view: {},
      infoArea: { flexDirection: "column" },
      profileFieldView: { flexDirection: "row", margin: 5, alignItems: 'center' },
      profileFieldName: { fontWeight: "bold", marginRight: 5 },
      profileFieldValue: {}
    }
  }
)
