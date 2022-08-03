import React from 'react'
import { physicianApi, physicianHelper, patientHelper, valueHelper } from '@aprexis/aprexis-api-utility'
import { alertHelper, apiEnvironmentHelper } from '../../helpers'
import { SelectId } from './select_id'

function SelectHcpId(props) {
  const { forPatient, currentPatient, userCredentials, hcp, updateHcp } = props

  return (
    <SelectId
      changeId={changeId}
      id={physicianHelper.id(hcp)}
      matchString={physicianHelper.name(hcp)}
      optionId={physicianHelper.id}
      optionLabel={physicianHelper.label}
      search={search}
      selectType='HCP'
      selectTypePlural='HCPs'
    />
  )

  function changeId(id) {
    physicianApi.show(apiEnvironmentHelper.apiEnvironment(userCredentials), id, (hcp) => { updateHcp(id, hcp) }, alertHelper.handleError)
  }

  function search(matchString, onSuccess) {
    const params = {
      for_physician: matchString,
      page: { number: 1, size: 10 },
      sort: 'last_name,first_name,middle_name,npi,city,state'
    }

    if (valueHelper.isValue(forPatient)) {
      params.for_patient = patientHelper.id(currentPatient)
    }

    physicianApi.search(
      apiEnvironmentHelper.apiEnvironment(userCredentials),
      params,
      (hcps, _pageHeaders) => { onSuccess(hcps) },
      alertHelper.handleError
    )
  }
}

export { SelectHcpId }
