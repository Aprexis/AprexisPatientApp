import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { DisplayField } from '../components'
import { interventionApi, interventionHelper } from "@aprexis/aprexis-api-utility"
import { alertHelper, apiEnvironmentHelper } from "../../helpers"

function InterventionInfo(props) {
  const { userCredentials } = props
  const [intervention, setIntervention] = useState(props.intervention)
  const [needLoad, setNeedLoad] = useState(true)

  useEffect(
    () => {
      if (!needLoad) {
        return
      }

      interventionApi.profile(
        apiEnvironmentHelper.apiEnvironment(userCredentials),
        intervention.id,
        (interventionProfile) => {
          setNeedLoad(false)
          setIntervention(interventionProfile)
        },
        (message) => {
          setNeedLoad(false)
          alertHelper.error(message)
          return
        }
      )
    }
  )

  return (
    <View>
      <View style={{ flexDirection: 'column' }} >
        <DisplayField fieldName='State' fieldType='string' method={interventionHelper.state} model={intervention} />
        <DisplayField checkMethod={interventionHelper.pharmacyStore} fieldName='Pharmacy Store' method={interventionHelper.pharmacyStoreDisplay} model={intervention} />
        <DisplayField checkMethod={interventionHelper.pharmacist} fieldName='Pharmacist' method={interventionHelper.pharmacistDisplay} model={intervention} />
        <DisplayField checkMethod={interventionHelper.user} fieldName='User' method={interventionHelper.userName} model={intervention} />
        <DisplayField checkMethod={interventionHelper.pendingUntil} fieldName='Pending Until' fieldType='date' method={interventionHelper.displayPendingUntil} model={intervention} />
        <DisplayField fieldName='Place of Service' fieldType='string' method={interventionHelper.serviceLocation} model={intervention} />
        <DisplayField fieldName='Venue' fieldType='string' method={interventionHelper.venue} model={intervention} />
        <DisplayField checkMethod={interventionHelper.consentFormInitiatedAt} fieldName='Consent Initiated' fieldType='datetime' method={interventionHelper.displayConsentFormInitiatedAt} model={intervention} />
        <DisplayField fieldName='Consent Initiated By' fieldType='string' method={interventionHelper.consentFormInitiator} model={intervention} />
        <DisplayField checkMethod={interventionHelper.consentObtainedFrom} fieldName='Consent Obtained From' method={interventionHelper.displayConsentObtainedFrom} model={intervention} />
        <DisplayField fieldName='Consent Via' fieldType='string' method={interventionHelper.consentVia} model={intervention} />
        <DisplayField checkMethod={intervention.userStarted} fieldName='User Started' fieldType='datetime' method={interventionHelper.displayUserStarted} model={intervention} />
        <DisplayField checkMethod={interventionHelper.consultStarted} fieldName='Consult Started' fieldType='date' method={interventionHelper.displayConsultStarted} model={intervention} />
        <DisplayField fieldName='Consult Session Duration' method={interventionHelper.consultSessionDuration} model={intervention} suffix='minutes' />
        <DisplayField fieldName='Consult Session Duration (Exact)' method={interventionHelper.consultSessionDurationExact} model={intervention} suffix='minutes' />
        <DisplayField fieldName='Face-to-Face' method={interventionHelper.consultSessionDurationFaceToFace} model={intervention} suffix='minutes' />
        <DisplayField checkMethod={interventionHelper.consultEnded} fieldName='Consult Ended' fieldType='date' method={interventionHelper.displayConsultEnded} model={intervention} />
        <DisplayField checkMethod={intervention.userEnded} fieldName='User Ended' fieldType='datetime' method={interventionHelper.displayUserEnded} model={intervention} />
        <DisplayField fieldName='Diagnosis Code' fieldType='string' method={interventionHelper.diagnosisCode} model={intervention} />
        <DisplayField fieldName='Diagnosis' fieldType='string' method={interventionHelper.diagnosisCodeLongDescription} model={intervention} />
        <DisplayField fieldName='Closed Reason' fieldType='string' humanize={true} method={interventionHelper.closedReason} model={intervention} />
        <DisplayField fieldName='Reason Detail' fieldType='string' method={interventionHelper.closedReasonDetail} model={intervention} />
        <DisplayField fieldName='Pharmacy Claim Tracking Number' fieldType='string' method={interventionHelper.pharmacyClaimTrackingNumber} model={intervention} />
      </View>
    </View>
  )
}

const MemoizedMedcicationInfo = React.memo(InterventionInfo)
export { MemoizedMedcicationInfo as InterventionInfo }
