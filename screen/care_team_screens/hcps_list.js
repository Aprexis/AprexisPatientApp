import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ListView, MaterialCommunityIcon } from '../components'
import { PatientHcpModal } from './patient_hcp_modal'
import { patientHcpApi } from "../../api"
import { alertHelper, patientHelper, currentUserHelper, patientHcpHelper, valueHelper } from '../../helpers'
import { styles } from '../../assets/styles'

function PatientHcp(props) {
  const { patientHcp, onEdit } = props
  const primary = patientHcpHelper.primary(patientHcp)
  const primaryText = valueHelper.isSet(primary) ? '(primary)' : ''

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.listButton}
      onPress={() => { onEdit(patientHcp) }}
    >
      <View style={{ flexDirection: "row", alignItems: 'center', width: '95%' }}>
        <MaterialCommunityIcon size={27} style={styles.icon} name="doctor" solid />
        <Text style={inlineStyles.text}>{patientHcpHelper.hcpName(patientHcp)}</Text>
        <Text style={inlineStyles.text}>{primaryText}</Text>
      </View>
      {/*
      <View>
        <FontAwesome5Icon size={30} name="angle-right" style={[styles.icon, inlineStyles.medIcon]} />
      </View>
      */}
    </TouchableOpacity>
  )
}

function HcpsList(props) {
  const { currentPatient, currentUser, userCredentials } = currentUserHelper.getCurrentProps(props)

  return (
    <View style={styles.mainBody}>
      <ListView
        addEditModal={addEditModal}
        label='HCP'
        onLoadPage={loadPage}
        onPresentItem={presentItem}
        pageSize={20}
        pluralLabel='HCPs'
      />
    </View>
  )

  function addEditModal(patientHcp, action, visible, closeModal) {
    return (
      <PatientHcpModal
        action={action}
        currentPatient={currentPatient}
        currentUser={currentUser}
        onClose={closeModal}
        patientHcp={patientHcp}
        userCredentials={userCredentials}
        visible={visible}
      />
    )
  }

  /* Providing delete handling should be done by the list view with a callback to this component.
  function deleteHcp(patientHcp) {
    patientHcpApi.destroy(
      userCredentials,
      patientHcpHelper.id(patientHcp),
      () => { dispatch('FORCE_UPDATE') },
      alertHelper.handleError
    )
  }
  */

  function loadPage(number, size, onSuccess) {
    patientHcpApi.listForPatient(
      userCredentials,
      patientHelper.id(currentPatient),
      { for_active: true, page: { number, size, total: 0 }, sort: 'physician.last_name,physician.first_name' },
      onSuccess,
      alertHelper.handleError
    )
  }

  function presentItem(patientHcp, patientHcpIdx, editPatientHcp) {
    return (
      <PatientHcp
        key={`hcp-${patientHcpHelper.id(patientHcp)}-${patientHcpIdx}`}
        patientHcp={patientHcp}
        //onDelete={deletePatientHcp}
        onEdit={editPatientHcp}
        {...props}
      />
    )
  }
}

const MemoizedHcpsList = React.memo(HcpsList)
export { MemoizedHcpsList as HcpsList }

const inlineStyles = StyleSheet.create(
  {
    text: { color: "#112B37", fontSize: 18, fontWeight: "500", marginLeft: 5 },
  }
)
