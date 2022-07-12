import React, { useEffect, useReducer } from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native'
import { AddButton } from './add_button'
import { ListCount } from './list_count'
import { RefreshView } from '../containers/refresh_view'
import { valueHelper, pageHelper } from '../../helpers'
import { styles } from '../../assets/styles'

function ListView({ addEditModal, forceUpdate, label, onLoadPage, onPresentItem, pageSize, pluralLabel, timeout }) {
  const workingPageSize = valueHelper.isNumberValue(pageSize) ? pageSize : 20
  const [state, dispatch] = useReducer(updateState, workingPageSize, initialState)
  const { contentOffset, lastPage } = state

  useEffect(() => {
    if (valueHelper.isSet(forceUpdate) && !valueHelper.isSet(state.needLoad)) {
      dispatch({ type: 'RELOAD' })
    }
    return () => { }
  })
  useEffect(() => {
    loadData()
    return () => { }
  })

  return (
    <RefreshView onIdle={() => { dispatch({ type: 'NEED-LOAD' }) }} timeout={timeout}>
      {displayModal()}
      {displayAddButton()}
      <ScrollView
        contentContainerStyle={styles.mainBody}
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
        const itemView = onPresentItem(item, newList.length + 1, editModel)
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

  function addModel() {
    dispatch({ type: 'ADD' })
  }

  function closeModal() {
    dispatch({ type: 'CLOSE' })
  }

  function displayAddButton() {
    if (!valueHelper.isFunction(addEditModal)) {
      return
    }

    return (
      <View style={{ display: 'flex', justifyContent: 'flex-end', textAlign: 'right' }}>
        <AddButton onPress={addModel} />
      </View>
    )
  }

  function displayModal() {
    if (!valueHelper.isFunction(addEditModal)) {
      return
    }

    return addEditModal(state.modalModel, state.modalAction, valueHelper.isSet(state.modalVisible), closeModal)
  }

  function editModel(model) {
    dispatch({ type: 'EDIT', model })
  }

  function initialState(workingPageSize) {
    return { needLoad: true, scrolling: false, pageNumber: 1, lastPage: { number: 1, pageSize: workingPageSize, total: -1 } }
  }

  function loadData() {
    const { lastPage, needLoad, scrolling } = state
    if (!valueHelper.isSet(needLoad) && !valueHelper.isSet(scrolling)) {
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
      case 'ADD':
        return { ...oldState, modalVisible: true, modalAction: 'ADD', modalModel: undefined }

      case 'CLOSE':
        const newState = { ...oldState }
        delete newState.modalAction
        delete newState.modalModel
        newState.modalVisible = false
        newState.needLoad = true
        return newState

      case 'EDIT':
        return { ...oldState, modalVisible: true, modalAction: 'EDIT', modalModel: action.model }

      case 'LIST':
        return { ...oldState, ...action.data, needLoad: false, scrolling: false }

      case 'NEED-LOAD':
        return { ...oldState, needLoad: true, lastPage: { number: 1, pageSize: workingPageSize, total: -1 } }

      case 'RELOAD':
        return { ...oldState, needLoad: true }

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
