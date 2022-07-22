import { valueHelper } from "./value.helper"
import { fieldHelper } from "./field.helper"
import { healthPlanHelper } from "./health_plan.helper"

export const programHelper = {
  active,
  display,
  endDate,
  healthPlan,
  healthPlanName,
  kind,
  modelName,
  name,
  startDate,
  toBreadcrumb,
  type
}

function active(program) {
  return valueHelper.isValue(program)
}

function display(program) {
  if (!valueHelper.isValue(program)) {
    return "(no program)"
  }

  return `${programHelper.name(program)} (${programHelper.type(program)})`
}

function endDate(program) {
  return fieldHelper.getField(program, "end_date")
}

function healthPlan(program) {
  return fieldHelper.getField(program, "health_plan")
}

function healthPlanName(program) {
  return healthPlanHelper.name(programHelper.healthPlan(program))
}

function kind(program) {
  return fieldHelper.getField(program, "kind")
}

function modelName() {
  return "program"
}

function name(program) {
  return valueHelper.titleize(fieldHelper.getField(program, "name"))
}

function startDate(program) {
  return fieldHelper.getField(program, "start_date")
}

function toBreadcrumb(program) {
  return programHelper.display(program)
}

function type(program) {
  return valueHelper.titleize(fieldHelper.getField(program, "type"))
}
