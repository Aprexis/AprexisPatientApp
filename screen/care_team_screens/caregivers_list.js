import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FontAwesome5Icon, ListView } from '../components'
import { caregiverApi } from "../../api"
import { alertHelper, patientHelper, currentUserHelper, caregiverHelper } from '../../helpers'
import { styles } from '../../assets/styles'
import { CaregiverModal } from './caregiver_modal'

function Caregiver(props) {
  const { caregiver, onEdit } = props

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.listButton}
      onPress={() => { onEdit(caregiver) }}>
      <View style={{ flexDirection: "row", alignItems: 'center', width: '95%' }}>
        <FontAwesome5Icon size={27} style={styles.icon} name="user" solid />
        <Text style={inlineStyles.text}>{caregiverHelper.name(caregiver)} ({caregiverHelper.relationship(caregiver)})</Text>
      </View>
    </TouchableOpacity>
  )
}

function CaregiversList(props) {
  const { navigation } = props
  const { currentUser, currentPatient, userCredentials } = currentUserHelper.getCurrentProps(props)

  return (
    <View style={styles.mainBody}>
      <ListView
        addEditModal={addEditModal}
        label='Caregiver'
        navigation={navigation}
        onLoadPage={loadPage}
        onPresentItem={presentItem}
        pageSize={20}
        pluralLabel='Caregivers'
      />
    </View>
  )

  function addEditModal(caregiver, action, visible, closeModal) {
    return (
      <CaregiverModal
        action={action}
        currentPatient={currentPatient}
        currentUser={currentUser}
        onClose={closeModal}
        caregiver={caregiver}
        userCredentials={userCredentials}
        visible={visible}
      />
    )
  }

  /* Providing delete handling should be done by the list view with a callback to this component.
  function deleteCaregiver(caregiver) {
    caregiverApi.destroy(
      userCredentials,
      caregiverHelper.id(caregiver),
      () => { dispatch('FORCE_UPDATE') },
      alertHelper.handleError
    )
  }
  */

  function loadPage(number, size, onSuccess) {
    caregiverApi.listForPatient(
      userCredentials,
      patientHelper.id(currentPatient),
      { for_active: true, page: { number, size, total: 0 }, sort: 'created_at-,medication.label' },
      onSuccess,
      alertHelper.handleError
    )
  }

  function presentItem(caregiver, caregiverIdx, editCaregiver) {
    return (
      <Caregiver
        key={`cargiver-${caregiverHelper.id(caregiver)}-${caregiverIdx}`}
        caregiver={caregiver}
        //onDelete={deleteCaregiver}
        onEdit={editCaregiver}
        {...props}
      />
    )
  }
}

const MemoizedCaregiversList = React.memo(CaregiversList)
export { MemoizedCaregiversList as CaregiversList }

const inlineStyles = StyleSheet.create(
  {
    text: { color: "#112B37", fontSize: 18, fontWeight: "500", marginLeft: 5 },
  }
)
