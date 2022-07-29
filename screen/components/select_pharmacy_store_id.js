import React from 'react'
import { SelectId } from './select_id'
import { pharmacyStoreApi } from '../../api'
import { alertHelper, pharmacyStoreHelper, patientHelper, currentUserHelper, valueHelper } from '../../helpers'

function SelectPharmacyStoreId(props) {
  const { pharmacyStore, updatePharmacyStore } = props
  const { currentPatient, userCredentials } = currentUserHelper.getCurrentProps(props)

  if (!valueHelper.isValue(pharmacyStore)) {
    return null
  }

  console.log(`PS: ${JSON.stringify(pharmacyStore, null, 2)}`)
  console.log(`ID: ${pharmacyStoreHelper.id(pharmacyStore)}`)
  console.log(`Identification: ${pharmacyStoreHelper.identification(pharmacyStore)}`)

  return (
    <SelectId
      changeId={changeId}
      id={pharmacyStoreHelper.id(pharmacyStore)}
      matchString={pharmacyStoreHelper.identification(pharmacyStore)}
      optionId={pharmacyStoreHelper.id}
      optionLabel={pharmacyStoreHelper.identification}
      search={search}
      selectType='Pharmacy Store'
      selectTypePlural='Pharmacy Stores'
    />
  )

  function changeId(id) {
    pharmacyStoreApi.show(userCredentials, id, (pharmacyStore) => { updatePharmacyStore(id, pharmacyStore) }, alertHelper.handleError)
  }

  function search(matchString, onSuccess) {
    const params = {
      for_store: matchString,
      for_health_plan: patientHelper.healthPlanId(currentPatient),
      page: { number: 1, size: 10 },
      sort: 'name,store_number,id'
    }
    pharmacyStoreApi.search(
      userCredentials,
      params,
      (physicians, _pageHeaders) => { onSuccess(physicians) },
      alertHelper.handleError
    )
  }
}

export { SelectPharmacyStoreId }
