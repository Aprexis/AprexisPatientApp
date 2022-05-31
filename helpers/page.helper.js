import { valueHelper } from "./value.helper"

export const pageHelper = {
  lastNumber,
  updatePageFromLastPage
}

export const MAXIMUM_PER_PAGE = 100

function lastNumber(page) {
  if (!valueHelper.isValue(page)) {
    return 0
  }

  const { size, total } = page
  if (!valueHelper.isValue(total) || isNaN(total)) {
    return 0
  }
  if (!valueHelper.isValue(size) || isNaN(size)) {
    return 1
  }

  return Math.ceil(parseInt(total) / parseInt(size))
}

function updatePageFromLastPage(hash) {
  if (!valueHelper.isValue(hash) || !valueHelper.isValue(hash.lastPage)) {
    return { number: 1, size: 20, total: 0 }
  }


  const { number, size, total } = hash.lastPage
  return { number: toInt(number), size: toInt(size), total: toInt(total) }

  function toInt(value) {
    if (typeof value === 'string') {
      return parseInt(value)
    }

    return value
  }
}
