import { formatInTimeZone } from "date-fns-tz"
import { apiHelper } from "./api.helper"
import { dateHelper } from "./date.helper"
import { fieldHelper } from './field.helper'
import { patientHelper } from "./patient.helper"
import { patientSupplementHelper } from "./patient_supplement.helper"
import { valueHelper } from "./value.helper"
import { medicationHelper } from "./admin"
import { reminderActions, reminderTypes, timeZones } from "../types"

export const reminderHelper = {
  action,
  buildChanged,
  buildNewChanged,
  dayOfMonth,
  displayAction,
  displayMedications,
  displayPatientSupplements,
  displayRecurFrom,
  displayRecurTo,
  displayRemindAt,
  displayType,
  emailAddress,
  friday,
  id,
  isReminderActionValue,
  isReminderTypeValue,
  medications,
  monday,
  patient,
  patientId,
  patientName,
  patientSupplements,
  recurFrom,
  recurTo,
  remindAt,
  remindAtTimeZone,
  reminderMedications,
  reminderSupplements,
  saturday,
  sunday,
  thursday,
  toJSON,
  tuesday,
  txtNumber,
  type,
  voiceNumber,
  wednesday
}

const reminderKeys = [
  "id",
  "patient_id",
  "action",
  "day_of_month",
  "email_address",
  "friday",
  "monday",
  "recur_from",
  "recur_to",
  "remind_at",
  "remind_at_time_zone",
  { key: "reminder_medications", jsonKey: "reminder_medications_attributes", childKeys: ["id", "reminder_id", "medication_id", "_destroy"] },
  { key: "reminder_supplements", jsonKey: "reminder_supplements_attributes", childKeys: ["id", "reminder_id", "patient_supplement_id", "_destroy"] },
  "saturday",
  "sunday",
  "thursday",
  "tuesday",
  "txt_number",
  "type",
  "voice_number",
  "wednesday"
]

function action(reminder) {
  return fieldHelper.getField(reminder, "action")
}

function buildChanged(reminder, changedReminder) {
  if (valueHelper.isValue(changedReminder)) {
    return changedReminder
  }

  if (valueHelper.isValue(reminder.id)) {
    return copyIdentifiers(reminder)
  }

  return reminderHelper.buildNewChanged(reminder)

  function copyIdentifiers(reminder) {
    return {
      type: reminder.type,
      id: reminder.id,
      patient_id: reminder.patient_id
    }
  }
}

function buildNewChanged(reminder) {
  return {
    ...reminder
  }
}

function dayOfMonth(reminder) {
  return fieldHelper.getField(reminder, "day_of_month")
}

function displayAction(reminder) {
  const action = reminderHelper.action(reminder)
  if (!valueHelper.isStringValue(action)) {
    return ""
  }

  return reminderActions[action]
}

function displayMedications(reminder) {
  const medications = reminderHelper.medications(reminder)

  return medications.map((medication) => medicationHelper.name(medication)).join(", ")
}

function displayPatientSupplements(reminder) {
  const patientSupplements = reminderHelper.patientSupplements(reminder)

  return patientSupplements.map((patientSupplement) => { return patientSupplementHelper.name(patientSupplement) }).join(", ")
}

function displayRecurFrom(reminder) {
  return dateHelper.displayDate(reminderHelper.recurFrom(reminder))
}

function displayRecurTo(reminder) {
  return dateHelper.displayDate(reminderHelper.recurTo(reminder))
}

function displayRemindAt(reminder) {
  let remindAt = reminderHelper.remindAt(reminder)
  if (!dateHelper.isDateValue(remindAt)) {
    return ""
  }
  let remindAtTimeZone = reminderHelper.remindAtTimeZone(reminder)
  if (!valueHelper.isStringValue(remindAtTimeZone)) {
    // TODO Need to research, but America/New_York doesn't seem to be a valid timezone for Android emulator.
    remindAtTimeZone = '-04:00'
  } else if (valueHelper.isStringValue(timeZones[remindAtTimeZone])) {
    remindAtTimeZone = timeZones[remindAtTimeZone]
  }

  remindAt = dateHelper.makeDate(remindAt)

  return formatInTimeZone(remindAt, remindAtTimeZone, "p")
}

function displayType(reminder) {
  const type = reminderHelper.type(reminder)

  return reminderTypes[type]
}

function emailAddress(reminder) {
  return fieldHelper.getField(reminder, "email_address")
}

function friday(reminder) {
  return fieldHelper.getField(reminder, "friday")
}

function id(reminder) {
  return fieldHelper.getField(reminder, "id")
}

function isReminderActionValue(value) {
  if (!valueHelper.isStringValue(value)) {
    return false
  }

  return valueHelper.isValue(Object.keys(reminderActions).find((reminderAction) => reminderAction == value))
}

function isReminderTypeValue(value) {
  if (!valueHelper.isStringValue(value)) {
    return false
  }

  return valueHelper.isValue(Object.keys(reminderTypes).find((reminderType) => reminderType == value))
}

function medications(reminder) {
  return fieldHelper.getField(reminder, "medications")
}

function monday(reminder) {
  return fieldHelper.getField(reminder, "monday")
}

function patient(reminder) {
  return fieldHelper.getField(reminder, "patient")
}

function patientId(reminder) {
  return fieldHelper.getField(reminder, "patient_id")
}

function patientName(reminder) {
  return patientHelper.name(reminderHelper.patient(reminder))
}

function patientSupplements(reminder) {
  return fieldHelper.getField(reminder, "patient_supplements")
}

function recurFrom(reminder) {
  return fieldHelper.getField(reminder, "recur_from")
}

function recurTo(reminder) {
  return fieldHelper.getField(reminder, "recur_to")
}

function remindAt(reminder) {
  return fieldHelper.getField(reminder, "remind_at")
}

function reminderMedications(reminder) {
  return fieldHelper.getField(reminder, "reminder_medications")
}

function reminderSupplements(reminder) {
  return fieldHelper.getField(reminder, "reminder_supplements")
}

function remindAtTimeZone(reminder) {
  return fieldHelper.getField(reminder, "remind_at_time_zone")
}

function saturday(reminder) {
  return fieldHelper.getField(reminder, "saturday")
}

function sunday(reminder) {
  return fieldHelper.getField(reminder, "sunday")
}

function thursday(reminder) {
  return fieldHelper.getField(reminder, "thursday")
}

function toJSON(reminder) {
  return apiHelper.toJSON(reminder, reminderKeys)
}

function tuesday(reminder) {
  return fieldHelper.getField(reminder, "tuesday")
}

function txtNumber(reminder) {
  return fieldHelper.getField(reminder, "txt_number")
}

function type(reminder) {
  return fieldHelper.getField(reminder, "type")
}

function voiceNumber(reminder) {
  return fieldHelper.getField(reminder, "voice_number")
}

function wednesday(reminder) {
  return fieldHelper.getField(reminder, "wednesday")
}
