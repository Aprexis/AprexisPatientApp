import React, { useReducer } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AddButton, FontAwesome5Icon, ListView } from '../components'
import { caregiverApi } from "../../api"
import { alertHelper, patientHelper, currentUserHelper, userCredentialsHelper, caregiverHelper, valueHelper } from '../../helpers'
import { styles } from '../../assets/styles'
import { CaregiverModal } from './caregiver_modal'

function Caregiver(props) {
  const { caregiver, onEdit } = props
  const { currentUser, currentPatient } = currentUserHelper.getCurrentProps(props)

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.listButton}
      onPress={() => { onEdit(caregiver) }}>
      <View style={{ flexDirection: "row", alignItems: 'center', width: '95%' }}>
        <FontAwesome5Icon size={27} style={styles.icon} name="user" solid />
        <Text style={inlineStyles.text}>{caregiverHelper.name(caregiver)}</Text>
      </View>
      <View>
        <FontAwesome5Icon size={30} name="angle-right" style={[styles.icon, inlineStyles.medIcon]} />
      </View>
    </TouchableOpacity>
  )
}

function CaregiversList(props) {
  const { navigation } = props
  const { currentUser, currentPatient } = currentUserHelper.getCurrentProps(props)
  const [state, dispatch] = useReducer(updateState, initialState())

  return (
    <View style={styles.mainBody}>
      <View style={{ display: 'flex', justifyContent: 'flex-end', textAlign: 'right' }}>
        <AddButton onPress={addCaregiver} />
      </View>
      <CaregiverModal
        action={state.modalAction}
        currentPatient={currentPatient}
        currentUser={currentUser}
        onClose={closeModal}
        caregiver={state.caregiver}
        visible={state.modalVisible}
      />
      <ListView
        forceUpdate={state.forceUpdate}
        label='Caregiver'
        navigation={navigation}
        onLoadPage={loadPage}
        onPresentItem={presentItem}
        pageSize={20}
        pluralLabel='Caregivers'
      />
    </View>
  )

  function addCaregiver() {
    dispatch({ type: 'ADD' })
  }

  function closeModal() {
    dispatch({ type: 'CLOSE' })
  }

  function deleteCaregiver(caregiver) {
    userCredentialsHelper.getUserCredentials(
      (userCredentials) => {
        if (!valueHelper.isValue(userCredentials)) {
          return
        }

        caregiverApi.destroy(
          userCredentials,
          caregiverHelper.id(caregiver),
          () => {
            setForceUpdate(true)
          },
          (error) => {
            alertHelper.error(error)
            return
          }
        )
      }
    )
  }

  function editCaregiver(caregiver) {
    dispatch({ type: 'EDIT', caregiver })
  }


  function initialState() {
    return { modalVisible: false, forceUpdate: props.forceUpdate }
  }

  function loadPage(number, size, onSuccess) {
    userCredentialsHelper.getUserCredentials(
      (userCredentials) => {
        if (!valueHelper.isValue(userCredentials)) {
          return
        }
        caregiverApi.listForPatient(
          userCredentials,
          patientHelper.id(currentPatient),
          { for_active: true, page: { number, size, total: 0 }, sort: 'created_at-,medication.label' },
          (page, pageHeaders) => {
            dispatch({ type: 'UPDATED' })
            onSuccess(page, pageHeaders)
          },
          (error) => {
            alertHelper.error(error)
            return
          }
        )
      }
    )
  }


  function presentItem(caregiver, caregiverIdx) {
    return (
      <Caregiver
        key={`cargiver-${caregiverHelper.id(caregiver)}-${caregiverIdx}`}
        caregiver={caregiver}
        onDelete={() => { deleteCaregiver(caregiver) }}
        onEdit={() => { editCaregiver(caregiver) }}
        {...props}
      />
    )
  }

  function updateState(oldState, action) {
    switch (action.type) {
      case 'ADD':
        return { ...oldState, modalVisible: true, modalAction: 'ADD' }

      case 'CLOSE':
        const newState = { ...oldState }
        delete newState.modalAction
        delete newState.reminder
        newState.modalVisible = !newState.modalVisible
        newState.forceUpdate = !newState.modalVisible
        return newState

      case 'EDIT':
        return { ...oldState, modalVisible: true, modalAction: 'EDIT', caregiver: action.caregiver }

      case 'FORCE_UPDATE':
        return { ...oldState, forceUpdate: true }

      case 'UPDATED':
        return { ...oldState, forceUpdate: false }

      default:
        return oldState
    }
  }
}

export { CaregiversList }

const inlineStyles = StyleSheet.create(
  {
    text: { color: "#112B37", fontSize: 18, fontWeight: "500", marginLeft: 5 },
    medIcon: { marginRight: 5 }
  }
)
