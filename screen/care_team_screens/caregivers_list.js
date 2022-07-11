import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AddButton, DeleteButton, FontAwesome5Icon, ListView } from '../components'
import { caregiverApi } from "../../api"
import { alertHelper, patientHelper, currentUserHelper, userCredentialsHelper, caregiverHelper, valueHelper } from '../../helpers'
import { styles } from '../../assets/styles'

function Caregiver(props) {
  const { navigation, caregiver } = props
  const { currentUser, currentPatient } = currentUserHelper.getCurrentProps(props)

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.listButton}
      onPress={() => { navigation.navigate('CaregiverScreen', { currentUser, currentPatient, caregiver }) }}>
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
  const [forceUpdate, setForceUpdate] = useState(false)

  useEffect(() => { setForceUpdate(false) })

  return (
    <View style={styles.mainBody}>
      <View style={{ display: 'flex', justifyContent: 'flex-end', textAlign: 'right' }}>
        <AddButton onPress={addCaregiver} />
      </View>
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

const inlineStyles = StyleSheet.create(
  {
    text: { color: "#112B37", fontSize: 18, fontWeight: "500", marginLeft: 5 },
    medIcon: { marginRight: 5 }
  }
)
