import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ListView } from '../components'
import { patientPharmacistApi } from "../../api"
import { valueHelper, alertHelper, patientHelper, currentUserHelper, patientPharmacistHelper } from '../../helpers'
import { styles } from '../../assets/styles'

function Pharmacist(props) {
  const { pharmacist } = props

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.listButton}>
      <View style={{ flexDirection: 'column', alignItems: 'center', width: '95%' }}>
        <View style={{ flexDirection: "row" }}>
          <Image style={{ ...valueHelper.filterHash(styles.icon, { exclude: ['color'] }), width: 23, height: 20 }} source={require('../../assets/pharmacist.jpg')} />
          <Text style={inlineStyles.text}>{patientPharmacistHelper.fullName(pharmacist)} ({patientPharmacistHelper.roleLabel(pharmacist)})</Text>
        </View>
        <Text style={inlineStyles.text}>NPI: {patientPharmacistHelper.pharmacistNpi(pharmacist)}</Text>
      </View>
    </TouchableOpacity>
  )
}

function PharmacistsList(props) {
  const { navigation } = props
  const { currentPatient, userCredentials } = currentUserHelper.getCurrentProps(props)

  return (
    <View style={styles.mainBody}>
      <ListView
        label='Pharmacist'
        navigation={navigation}
        onLoadPage={loadPage}
        onPresentItem={presentItem}
        pageSize={20}
        pluralLabel='Pharmacists'
      />
    </View>
  )

  function loadPage(number, size, onSuccess) {
    // TODO: may want to consider filtering the results, including allowing for inactive users.
    patientPharmacistApi.listForPatient(
      userCredentials,
      patientHelper.id(currentPatient),
      { for_active: true, page: { number, size, total: 0 }, sort: 'last_name,first_name' },
      onSuccess,
      alertHelper.handleError
    )
  }

  function presentItem(pharmacist, pharmacistIdx, editPharmacist) {
    return (
      <Pharmacist
        key={`pharmacist-${patientPharmacistHelper.id(pharmacist)}-${pharmacistIdx}`}
        pharmacist={pharmacist}
        //onDelete={deletePharmacist}
        onEdit={editPharmacist}
        {...props}
      />
    )
  }
}

const MemoizedPharmacistsList = React.memo(PharmacistsList)
export { MemoizedPharmacistsList as PharmacistsList }

const inlineStyles = StyleSheet.create(
  {
    text: { color: "#112B37", fontSize: 18, fontWeight: "500", marginLeft: 5 }
  }
)
