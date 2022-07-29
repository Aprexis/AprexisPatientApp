import React from 'react'
import { hcpApi } from '../../api'
import { alertHelper, hcpHelper, patientHelper, valueHelper, currentUserHelper } from '../../helpers'
import { SelectId } from './select_id'

function SelectHcpId(props) {
  const { forPatient, hcp, updateHcp } = props
  const { currentPatient, userCredentials } = currentUserHelper.getCurrentProps(props)

  return (
    <SelectId
      changeId={changeId}
      id={hcpHelper.id(hcp)}
      matchString={hcpHelper.name(hcp)}
      optionId={hcpHelper.id}
      optionLabel={hcpHelper.label}
      search={search}
      selectType='HCP'
      selectTypePlural='HCPs'
    />
  )

  function changeId(id) {
    hcpApi.show(userCredentials, id, (hcp) => { updateHcp(id, hcp) }, alertHelper.handleError)
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

    hcpApi.search(
      userCredentials,
      params,
      (physicians, _pageHeaders) => { onSuccess(physicians) },
      alertHelper.handleError
    )
  }
}

export { SelectHcpId }
