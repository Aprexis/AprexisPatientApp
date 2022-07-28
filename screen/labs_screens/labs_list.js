import React from 'react'
import { View } from 'react-native'
import { Lab, ListView } from '../components'
import { labTestValueApi } from "../../api"
import { alertHelper, patientHelper, currentUserHelper, labTestValueHelper } from '../../helpers'
import { labTestNonVitals } from '../../types'
import { styles } from '../../assets/styles'

function LabsList(props) {
  const { currentPatient, userCredentials } = currentUserHelper.getCurrentProps(props)

  return (
    <View style={styles.mainBody}>
      <ListView
        label='Lab'
        onLoadPage={loadPage}
        onPresentItem={presentItem}
        pageSize={20}
        pluralLabel='Labs'
      />
    </View>
  )

  function loadPage(number, size, onSuccess) {
    labTestValueApi.listForPatient(
      userCredentials,
      patientHelper.id(currentPatient),
      { for_category: labTestNonVitals, page: { number, size, total: 0 }, sort: 'created_at-' },
      onSuccess,
      alertHelper.handleError
    )
  }

  function presentItem(lab, labIdx, _editLab) {
    return (
      <Lab
        key={`lab-${labTestValueHelper.id(lab)}-${labIdx}`}
        lab={lab}
        {...props}
      />
    )
  }
}

const MemoizedLabsList = React.memo(LabsList)
export { MemoizedLabsList as LabsList }
