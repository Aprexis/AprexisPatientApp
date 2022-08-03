import React from 'react'
import { SelectId } from './select_id'
import { medicationApi, medicationHelper, patientHelper, valueHelper } from '@aprexis/aprexis-api-utility'
import { alertHelper, apiEnvironmentHelper } from '../../helpers'

function SelectMedicationId(props) {
  const { patient, medication, updateMedication, userCredentials } = props

  return (
    <SelectId
      changeId={changeId}
      id={medicationHelper.id(medication)}
      matchString={label(medication)}
      optionId={medicationHelper.id}
      optionLabel={label}
      search={search}
      selectType='Medication'
      selectTypePlural='Medication'
    />
  )

  function changeId(id) {
    medicationApi.show(apiEnvironmentHelper.apiEnvironment(userCredentials), id, (medication) => { updateMedication(id, medication) }, alertHelper.handleError)
  }

  function label(med) {
    if (!valueHelper.isValue(med)) {
      return ''
    }

    return medicationHelper.label(med)
  }

  function search(matchString, onSuccess) {
    const params = {
      for_medication: matchString,
      page: { number: 1, size: 10 },
      sort: 'label'
    }

    if (!valueHelper.isValue(patient)) {
      params.for_health_plan = patientHelper.healthPlanId(patient)
    }

    medicationApi.search(
      apiEnvironmentHelper.apiEnvironment(userCredentials),
      params,
      (medications, _pageHeaders) => { onSuccess(medications) },
      alertHelper.handleError
    )
  }
}

export { SelectMedicationId }
