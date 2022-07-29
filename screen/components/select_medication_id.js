import React from 'react'
import { SelectId } from './select_id'
import { medicationApi } from '../../api/admin'
import { alertHelper, patientHelper, currentUserHelper, valueHelper } from '../../helpers'
import { medicationHelper } from '../../helpers/admin'

function SelectMedicationId(props) {
  const { patient, medication, updateMedication } = props
  const { userCredentials } = currentUserHelper.getCurrentProps(props)

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
    medicationApi.show(userCredentials, id, (medication) => { updateMedication(id, medication) }, alertHelper.handleError)
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
      userCredentials,
      params,
      (physicians, _pageHeaders) => { onSuccess(physicians) },
      alertHelper.handleError
    )
  }
}

export { SelectMedicationId }
