import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AddButton, DeleteButton, FontAwesome5Icon, ListView } from '../components'
import { caregiverApi } from "../../api"
import { alertHelper, patientHelper, currentUserHelper, userCredentialsHelper, caregiverHelper, valueHelper } from '../../helpers'

function Caregiver(props) {
  const { navigation, caregiver, onDelete } = props
  const { currentUser, currentPatient } = currentUserHelper.getCurrentProps(props)

  return (
    <View style={styles.caregiver.view}>
      <FontAwesome5Icon size={40} style={styles.caregiver.icon} name="hand-holding-medical" />
      <Text style={styles.caregiver.text}>{caregiverHelper.name(caregiver)}</Text>
      <Text style={styles.caregiver.text}>{caregiverHelper.relationship(caregiver)}</Text>
      <DeleteButton iconProps={{ size: 30 }} itemName='Caregiver' onPress={onDelete} />
      <TouchableOpacity
        activeOpacity={0.5}
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
        onPress={() => { navigation.navigate('CaregiverScreen', { currentUser, currentPatient, caregiver }) }}>
        <FontAwesome5Icon size={30} name="angle-right" />
      </TouchableOpacity>
    </View>
  )
}

function CaregiversList(props) {
  const { navigation } = props
  const { currentUser, currentPatient } = currentUserHelper.getCurrentProps(props)
  const [forceUpdate, setForceUpdate] = useState(false)

  useEffect(() => { setForceUpdate(false) })

  return (
    <View style={{ flex: 1 }}>
      <AddButton onPress={addCaregiver} />

      <ListView
        forceUpdate={forceUpdate}
        label='Caregiver'
        navigation={navigation}
        onLoadPage={loadPage}
        onPresentItem={presentItem}
        pageSize={20}
        pluralLabel='Caregivers'
      />
    </View>
  )

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
          onSuccess,
          (error) => {
            alertHelper.error(error)
            return
          }
        )
      }
    )
  }

  function addCaregiver() {
    navigation.navigate('CaregiverScreen', { currentUser, currentPatient })
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

  function presentItem(caregiver, caregiverIdx) {
    return (
      <Caregiver
        key={`cargiver-${caregiverHelper.id(caregiver)}-${caregiverIdx}`}
        caregiver={caregiver}
        onDelete={() => { deleteCaregiver(caregiver) }}
        {...props}
      />
    )
  }
}

export { CaregiversList }

const styles = StyleSheet.create(
  {
    caregiver: {
      view: { flex: 1, flexDirection: "row", height: 50, margin: 5, backgroundColor: "#c8c8c8" },
      icon: { color: "grey" },
      text: { fontSize: 20, fontWeight: "bold", marginRight: 30 }
    }
  }
)
