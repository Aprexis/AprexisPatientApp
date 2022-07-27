import { valueHelper } from "./value.helper"
import { dateHelper } from "./date.helper"
import { fieldHelper } from "./field.helper"
import { interventionHelper } from "./intervention.helper"
import { localeLanguages } from "../types"

export const interventionDocumentHelper = {
  consultEndDate,
  consultStartDate,
  createdAt,
  displayConsultEndDate,
  displayConsultStartDate,
  displayLocale,
  displayUpdatedAt,
  filePath,
  generator,
  id,
  intervention,
  interventionIdentification,
  locale,
  patientName,
  pharmacyStoreDisplay,
  programName,
  title,
  updatedAt
}

function consultEndDate(interventionDocument) {
  return fieldHelper.getField(interventionDocument, "consult_end_date")
}

function consultStartDate(interventionDocument) {
  return fieldHelper.getField(interventionDocument, "consult_start_date")
}

function createdAt(interventionDocument) {
  return fieldHelper.getField(interventionDocument, "created_at")
}

function displayConsultEndDate(interventionDocument) {
  return dateHelper.displayDate(interventionDocumentHelper.consultEndDate(interventionDocument))
}

function displayConsultStartDate(interventionDocument) {
  return dateHelper.displayDate(interventionDocumentHelper.consultStartDate(interventionDocument))
}

function displayLocale(interventionDocument) {
  const locale = interventionDocumentHelper.locale(interventionDocument)
  if (!valueHelper.isStringValue(locale) || !valueHelper.isStringValue(localeLanguages[locale])) {
    return 'English'
  }

  return localeLanguages[locale]
}

function displayUpdatedAt(interventionDocument) {
  return dateHelper.displayDateTime(interventionDocumentHelper.updatedAt(interventionDocument))
}

function filePath(interventionDocument) {
  return fieldHelper.getField(interventionDocument, "file_path")
}

function generator(interventionDocument) {
  return fieldHelper.getField(interventionDocument, "generator")
}

function id(interventionDocument) {
  return fieldHelper.getField(interventionDocument, "id")
}

function intervention(interventionDocument) {
  return fieldHelper.getField(interventionDocument, "intervention")
}

function interventionIdentification(interventionDocument) {
  return interventionHelper.identification(interventionDocumentHelper.intervention(interventionDocument))
}

function locale(interventionDocument) {
  return fieldHelper.getField(interventionDocument, "locale")
}

function patientName(interventionDocument) {
  return interventionHelper.patientName(interventionDocumentHelper.intervention(interventionDocument))
}

function pharmacyStoreDisplay(interventionDocument) {
  return interventionHelper.pharmacyStoreDisplay(interventionDocumentHelper.intervention(interventionDocument))
}

function programName(interventionDocument) {
  return interventionHelper.programName(interventionDocumentHelper.intervention(interventionDocument))
}

function title(interventionDocument) {
  return fieldHelper.getField(interventionDocument, "title")
}

function updatedAt(interventionDocument) {
  return fieldHelper.getField(interventionDocument, "updated_at")
}
