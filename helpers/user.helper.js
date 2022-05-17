import { fieldHelper } from "./field.helper"

export const userHelper = {
  email,
  hasRole,
  role
}

function email(user) {
  return fieldHelper.getField(user, "email")
}

function hasRole(user, role) {
  const userRole = userHelper.role(user)
  if (Array.isArray(role)) {
    return role.includes(userRole)
  }

  return userRole == role
}
function role(user) {
  return fieldHelper.getField(user, "role")
}
