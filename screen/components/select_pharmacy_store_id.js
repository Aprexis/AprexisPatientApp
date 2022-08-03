import React from 'react'
import { SelectId } from './select_id'
import { pharmacyStoreApi, pharmacyStoreHelper, patientHelper, valueHelper } from '@aprexis/aprexis-api-utility'
import { alertHelper, apiEnvironmentHelper } from '../../helpers'

function SelectPharmacyStoreId(props) {
  const { patient, pharmacyStore, updatePharmacyStore, userCredentials } = props

  return (
    <SelectId
      changeId={changeId}
      id={pharmacyStoreHelper.id(pharmacyStore)}
      matchString={label(pharmacyStore)}
      optionId={pharmacyStoreHelper.id}
      optionLabel={label}
      search={search}
      selectType='Pharmacy Store'
      selectTypePlural='Pharmacy Stores'
    />
  )

  function changeId(id) {
    pharmacyStoreApi.show(apiEnvironmentHelper.apiEnvironment(userCredentials), id, (pharmacyStore) => { updatePharmacyStore(id, pharmacyStore) }, alertHelper.handleError)
  }

  function label(store) {
    if (!valueHelper.isValue(store)) {
      return ''
    }

    return pharmacyStoreHelper.identification(store)
  }

  function search(matchString, onSuccess) {
    const params = {
      for_store: matchString,
      page: { number: 1, size: 10 },
      sort: 'name,store_number,id'
    }

    if (!valueHelper.isValue(patient)) {
      params.for_health_plan = patientHelper.healthPlanId(patient)
    }

    pharmacyStoreApi.search(
      apiEnvironmentHelper.apiEnvironment(userCredentials),
      params,
      (pharmacyStores, _pageHeaders) => { onSuccess(pharmacyStores) },
      alertHelper.handleError
    )
  }
}

export { SelectPharmacyStoreId }
