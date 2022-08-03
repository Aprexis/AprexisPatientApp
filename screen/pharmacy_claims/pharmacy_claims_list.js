import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FontAwesome5Icon, ListView } from '../components'
import { pharmacyClaimApi, patientHelper, patientMedicationHelper, pharmacyClaimHelper, valueHelper } from '@aprexis/aprexis-api-utility'
import { alertHelper, apiEnvironmentHelper, iconHelper } from '../../helpers'
import { styles } from '../../assets/styles'

function PharmacyClaim(props) {
  const { pharmacyClaim } = props

  return (
    <View>
      <View style={styles.row}>
        <Text style={inlineStyles.text}>#{pharmacyClaimHelper.claimNumber(pharmacyClaim)}</Text>
        <Text style={inlineStyles.text}>{pharmacyClaimHelper.displayFillDate(pharmacyClaim)}</Text>
        <Text style={inlineStyles.text}>{pharmacyClaimHelper.daysSupply(pharmacyClaim)} Days</Text>
      </View>
      <View style={styles.row}>
        <FontAwesome5Icon size={40} style={styles.icon} name={iconHelper.pharmacyClaimMedicationIcon(pharmacyClaim)} />
        <Text style={inlineStyles.text}>{pharmacyClaimHelper.medicationLabel(pharmacyClaim)} ({pharmacyClaimHelper.ndc(pharmacyClaim)})</Text>
      </View>
      <View style={styles.row}>
        <Text style={inlineStyles.text}>{pharmacyClaimHelper.pharmacyStoreIdentification(pharmacyClaim)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={inlineStyles.text}>{pharmacyClaimHelper.physicianName(pharmacyClaim)}</Text>
      </View>
    </View>
  )
}

function PharmacyClaimsList(props) {
  const { currentPatient, userCredentials, patientMedication } = props

  return (
    <View style={styles.mainBody}>
      <ListView
        label='Pharmacy Claim'
        onLoadPage={loadPage}
        onPresentItem={presentItem}
        pageSize={20}
        pluralLabel='Pharmacy Claims'
      />
    </View>
  )

  function loadPage(number, size, onSuccess) {
    const params = {
      page: { number, size, total: 0 }, sort: 'fill_date-,medication.label'
    }
    if (valueHelper.isValue(patientMedication)) {
      params.for_medication_id = patientMedicationHelper.medicationId(patientMedication)
    }

    pharmacyClaimApi.listForPatient(
      apiEnvironmentHelper.apiEnvironment(userCredentials),
      patientHelper.id(currentPatient),
      params,
      onSuccess,
      alertHelper.handleError
    )
  }

  function presentItem(pharmacyClaim, pharmacyClaimIdx, _editpharmacyClaim) {
    return (
      <PharmacyClaim
        key={`pharmacy-claim-${pharmacyClaimHelper.id(pharmacyClaim)}-${pharmacyClaimIdx}`}
        pharmacyClaim={pharmacyClaim}
        {...props}
      />
    )
  }
}

const MemoizedPharmacyClaimsList = React.memo(PharmacyClaimsList)
export { MemoizedPharmacyClaimsList as PharmacyClaimsList }

const inlineStyles = StyleSheet.create(
  {
    text: { color: "#112B37", fontSize: 18, fontWeight: "500", marginLeft: 5 },
  }
)
