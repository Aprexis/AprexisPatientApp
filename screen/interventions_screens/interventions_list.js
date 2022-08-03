import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FontAwesome5Icon, MaterialCommunityIcon, ListView } from '../components'
import { interventionApi, patientHelper, interventionHelper } from '@aprexis/aprexis-api-utility'
import { alertHelper, apiEnvironmentHelper } from '../../helpers'
import { styles } from '../../assets/styles'

function Intervention(props) {
  const { intervention, setIntervention, setStackScreen } = props

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.listButton}
      onPress={
        () => {
          setIntervention(intervention)
          setStackScreen('intervention')
        }
      }>
      <View style={styles.row}>
        <MaterialCommunityIcon size={18} style={styles.icon} name='file-chart' />
        <Text style={inlineStyles.text}>{interventionHelper.programDisplay(intervention)}</Text>
        <Text style={inlineStyles.text}>{interventionHelper.displayDateOfServce(intervention)}</Text>
        <Text style={inlineStyles.text}>{interventionHelper.state(intervention)}</Text>
        <FontAwesome5Icon size={30} name='angle-right' style={[styles.icon, inlineStyles.medIcon]} />
      </View>
    </TouchableOpacity>
  )
}

function InterventionsList(props) {
  const { currentPatient, userCredentials, setIntervention } = props

  return (
    <ListView
      label='Intervention'
      onLoadPage={loadPage}
      onPresentItem={presentItem}
      pageSize={20}
      pluralLabel='Inerventions'
    />
  )

  function loadPage(number, size, onSuccess) {
    interventionApi.listForPatient(
      apiEnvironmentHelper.apiEnvironment(userCredentials),
      patientHelper.id(currentPatient),
      { for_active: true, page: { number, size, total: 0 }, sort: 'created_at-,program.name,state' },
      onSuccess,
      alertHelper.handleError
    )
  }

  function presentItem(intervention, interventionIdx, _editIntervention) {
    return (
      <Intervention
        {...props}
        key={`intervention-${interventionHelper.id(intervention)}-${interventionIdx}`}
        intervention={intervention}
        setIntervention={setIntervention}
      />
    )
  }
}

export { InterventionsList }

const inlineStyles = StyleSheet.create(
  {
    text: { color: '#112B37', fontSize: 17, fontWeight: '500', marginLeft: 5, display: 'flex', flex: 1 },
    medIcon: { marginRight: 5 }
  }
)
