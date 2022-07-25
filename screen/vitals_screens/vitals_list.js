import React from 'react'
import { View } from 'react-native'
import { Lab, ListView } from '../components'
import { labTestValueApi } from "../../api"
import { alertHelper, patientHelper, currentUserHelper, labTestValueHelper } from '../../helpers'
import { labTestVitals } from '../../types'
import { styles } from '../../assets/styles'

function VitalsList(props) {
  const { navigation } = props
  const { currentPatient, userCredentials } = currentUserHelper.getCurrentProps(props)

  return (
    <View style={styles.mainBody}>
      <ListView
        label='Vital'
        navigation={navigation}
        onLoadPage={loadPage}
        onPresentItem={presentItem}
        pageSize={20}
        pluralLabel='Vitals'
      />
    </View>
  )

  function loadPage(number, size, onSuccess) {
    labTestValueApi.listForPatient(
      userCredentials,
      patientHelper.id(currentPatient),
      { for_category: labTestVitals, page: { number, size, total: 0 }, sort: 'created_at-' },
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

const MemoizedVitalsList = React.memo(VitalsList)
export { MemoizedVitalsList as VitalsList }
