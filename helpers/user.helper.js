import { fieldHelper } from './field.helper'
import { nameHelper } from './name.helper'
import { valueHelper } from './value.helper'

export const userHelper = {
  email,
  hasRole,
  id,
  name,
  role,
  roleLabel
}

function email(user) {
  return fieldHelper.getField(user, 'email')
}

function id(user) {
  return fieldHelper.getField(user, 'id')
}

function hasRole(user, role) {
  const userRole = userHelper.role(user)
  if (Array.isArray(role)) {
    return role.includes(userRole)
  }

  return userRole == role
}

function name(user) {
  return nameHelper.name(user, 'User')
}

function role(user) {
  return fieldHelper.getField(user, 'role')
}

function roleLabel(user) {
  const role = userHelper.role(user)

  return valueHelper.capitalizeWords(valueHelper.humanize(role))
}
