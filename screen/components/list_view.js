import React, { useEffect, useReducer } from 'react'
import { ScrollView } from 'react-native'
import { ListCount } from './list_count'
import { RefreshView } from '../containers/refresh_view'
import { valueHelper, pageHelper } from '../../helpers'

function ListView({ forceUpdate, label, onLoadPage, onPresentItem, pageSize, pluralLabel, timeout, navigation }) {
  const workingPageSize = valueHelper.isNumberValue(pageSize) ? pageSize : 20
  const [state, dispatch] = useReducer(updateState, workingPageSize, initialState)
  const { contentOffset, lastPage } = state


  useEffect(loadData)
  useEffect(
    () => {
      const unsubscribe = navigation.addListener('focus', (_event) => { dispatch({ type: 'NEED-LOAD' }) })

      return unsubscribe;
    },
    [navigation]
  )

  return (
    <RefreshView onIdle={() => { dispatch({ type: 'NEED-LOAD' }) }} timeout={timeout}>
      <ScrollView
        ontentContainerStyle={{ flex: 1 }}
        contentOffset={contentOffset}
        keyboardShouldPersistTaps="handled"
        onScroll={onScroll}>
        {buildList()}
      </ScrollView>
      <ListCount label={label} lastPage={lastPage} listLength={workingPageSize * 2} pluralLabel={pluralLabel} />
    </RefreshView>
  )

  function buildList() {
    const { pageNumber, pageOne, pageTwo, pageThree } = state
    let newList = []
    newList = addItems(newList, pageData(pageOne), pageNumber, 1, valueHelper.isValue(pageThree))
    newList = addItems(newList, pageData(pageTwo), pageNumber, 2)
    newList = addItems(newList, pageData(pageThree), pageNumber, 3, valueHelper.isValue(pageOne))
    return newList

    function addItems(workingList, page, pageNumber, pageIdx, otherEndAvailable) {
      if (!valueHelper.isValue(page)) {
        return workingList
      }

      const newList = [...workingList]
      const myStartAt = (pageNumber > 2 && pageIdx === 1 && otherEndAvailable) ? page.length / 2 : 0
      const myEndAt = (pageIdx === 3 && otherEndAvailable) ? page.length / 2 : page.length - 1
      for (let idx = myStartAt; idx <= myEndAt; ++idx) {
        const item = page[idx]
        const itemView = onPresentItem(item, newList.length + 1)
        newList.push(itemView)
      }
      return newList
    }

    function pageData(page) {
      if (!valueHelper.isValue(page)) {
        return
      }

      return page.page
    }
  }

  function initialState(workingPageSize) {
    return { needLoad: true, scrolling: false, pageNumber: 1, lastPage: { number: 1, pageSize: workingPageSize, total: -1 } }
  }

  function loadData() {
    const { lastPage, needLoad, scrolling } = state
    if (!forceUpdate && (!needLoad || scrolling)) {
      return
    }

    let { pageNumber } = state
    if (!valueHelper.isNumberValue(pageNumber)) {
      pageNumber = 1
    }
    const startingPage = Math.max(1, pageNumber - 1)
    const endingPage = pageNumber + 1
    loadPages(startingPage, endingPage, lastPage, { pageNumber, lastPage })
  }

  function loadPages(number, endingNumber, lastPage, data) {
    const { pageNumber } = state
    if (number < 0) {
      loadPages(number + 1, endingNumber, data)
      return
    }
    if (number > endingNumber) {
      updateListState(data)
      return
    }
    if (valueHelper.isValue(lastPage) && (lastPage.total >= 0) && ((number - 1) * workingPageSize >= lastPage.total)) {
      updateListState(data)
      return
    }

    let myData = { ...data }
    onLoadPage(
      number,
      pageSize,
      (page, pageHeaders) => {
        myData.lastPage = pageHelper.updatePageFromLastPage(pageHeaders)
        switch (number - pageNumber) {
          case -1:
            myData.pageOne = { number, page, pageHeaders }
            break

          case 1:
            myData.pageThree = { number, page, pageHeaders }
            break

          default:
            myData.pageTwo = { number, page, pageHeaders }
        }

        loadPages(number + 1, endingNumber, myData.lastPage, myData)
      }
    )

    function updateListState(data) {
      dispatch({ type: 'LIST', data })
    }
  }

  function onScroll(event) {
    const { scrolling } = state
    if (scrolling) {
      return
    }
    dispatch({ type: 'SCROLL-START' })
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent
    if ((100 * contentOffset.y) / contentSize.height < 10) {
      scrollUp(contentSize)
      return
    }

    if ((100 * (layoutMeasurement.height + contentOffset.y)) / contentSize.height > 90) {
      scrollDown(contentSize)
      return
    }

    dispatch({ type: 'SCROLL-STOP' })
  }

  function scrollUp(contentSize) {
    const { lastPage, pageNumber } = state
    if (pageNumber <= 1) {
      dispatch({ type: 'SCROLL-STOP' })
      return
    }
    loadPages(pageNumber - 1, pageNumber + 1, lastPage, { pageNumber: pageNumber - 1, contentOffset: { x: 0, y: contentSize.height / 2 } })
  }

  function scrollDown(contentSize) {
    const { lastPage, pageNumber } = state
    if (valueHelper.isValue(lastPage) && (lastPage.total >= 0) && (pageNumber * workingPageSize >= lastPage.total)) {
      dispatch({ type: 'SCROLL-STOP' })
      return
    }
    loadPages(pageNumber - 1, pageNumber + 1, lastPage, { pageNumber: pageNumber + 1, contentOffset: { x: 0, y: contentSize.height / 2 } })
  }

  function updateState(oldState, action) {
    switch (action.type) {
      case 'LIST':
        return { ...oldState, ...action.data, needLoad: false, scrolling: false }

      case 'NEED-LOAD':
        return { ...oldState, needLoad: true, lastPage: { number: 1, pageSize: workingPageSize, total: -1 } }

      case 'SCROLL-START':
        return { ...oldState, needLoad: false, scrolling: true }

      case 'SCROLL-STOP':
        return { ...oldState, needLoad: false, scrolling: false }

      default:
        return oldState
    }
  }
}

export { ListView }
