import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FontAwesome5Icon, ListView } from '../components'
import { interventionDocumentApi, interventionHelper, interventionDocumentHelper } from '@aprexis/aprexis-api-utility'
import { alertHelper, apiEnvironmentHelper } from '../../helpers'
import { styles } from '../../assets/styles'

function InterventionDocument(props) {
  const { interventionDocument, /*setInterventionDocument, setStackScreen*/ } = props

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.listButton}
    /*
    onPress={
      () => {
        setInterventionDocument(interventionDocument)
        setStackScreen('document')
      }
    }
    */
    >
      <View style={styles.row}>
        <FontAwesome5Icon size={18} style={styles.icon} name='file-medical-alt' />
        <Text style={inlineStyles.text}>{interventionDocumentHelper.displayUpdatedAt(interventionDocument)}</Text>
        <Text style={inlineStyles.text}>{interventionDocumentHelper.title(interventionDocument)}</Text>
        <Text style={inlineStyles.text}>{interventionDocumentHelper.displayLocale(interventionDocument)}</Text>
        {/*<FontAwesome5Icon size={30} name='angle-right' style={[styles.icon, inlineStyles.medIcon]} />*/}
      </View>
    </TouchableOpacity>
  )
}

function InterventionDocumentsList(props) {
  const { intervention, setInterventionDocument, userCredentials } = props

  return (
    <ListView
      label='Document'
      onLoadPage={loadPage}
      onPresentItem={presentItem}
      pageSize={20}
      pluralLabel='Documents'
    />
  )

  function loadPage(number, size, onSuccess) {
    interventionDocumentApi.listForIntervention(
      apiEnvironmentHelper.apiEnvironment(userCredentials),
      interventionHelper.id(intervention),
      { for_active: true, page: { number, size, total: 0 }, sort: 'updated_at-,title' },
      onSuccess,
      alertHelper.handleError
    )
  }

  function presentItem(interventionDocument, interventionDocumentIdx, _editInterventionDocument) {
    return (
      <InterventionDocument
        {...props}
        key={`intervention-document-${interventionDocumentHelper.id(interventionDocument)}-${interventionDocumentIdx}`}
        interventionDocument={interventionDocument}
        setInterventionDocument={setInterventionDocument}
      />
    )
  }
}

export { InterventionDocumentsList }

const inlineStyles = StyleSheet.create(
  {
    text: { color: '#112B37', fontSize: 17, fontWeight: '500', marginLeft: 5, display: 'flex', flex: 1 }
  }
)
