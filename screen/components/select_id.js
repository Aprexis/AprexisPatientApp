import React, { useEffect, useReducer, useRef } from 'react'
import { View } from 'react-native'
import { Button, Menu, Searchbar } from 'react-native-paper'
import { valueHelper } from '@aprexis/aprexis-api-utility'

function SelectId({ changeId, id, optionId, optionLabel, matchString, search, selectType, selectTypePlural }) {
  const [state, dispatch] = useReducer(updateState, initialState())
  const lastMatchString = useRef(valueHelper.isStringValue(matchString) ? matchString : '')
  const haveMatches = valueHelper.isStringValue(state.matchString) && (state.matchString.length >= 3) && (state.matchString == lastMatchString.current) && valueHelper.isValue(state.matches)

  useEffect(
    () => {
      if (state.matchString == lastMatchString.current) {
        return
      }

      lastMatchString.current = state.matchString
      if (valueHelper.isStringValue(state.matchString) && state.matchString.length >= 3) {
        search(state.matchString, searched)
      } else {
        dispatch('SEARCHED', [])
      }

      return () => { }
    }
  )

  return (
    <View styles={{ flexDirection: 'column' }}>
      <Searchbar placeholder={`Search ${selectTypePlural}`} onChangeText={changeMatchString} value={state.matchString} />
      <Menu
        visible={valueHelper.isSet(state.menuVisible)}
        onDismiss={closeMenu}
        anchor={<Button disabled={!haveMatches} onPress={openMenu}>Select {selectType}</Button>}>
        {searchableOptions()}
      </Menu>
    </View>
  )

  function changeMatchString(text) {
    dispatch({ type: 'SEARCH', matchString: text })
  }

  function closeMenu() {
    dispatch({ type: `CLOSE-MENU` })
  }

  function initialState() {
    return { id: valueHelper.isNumberValue(id) ? id : 0, matchString: valueHelper.isStringValue(matchString) ? matchString : '', menuVisible: false }
  }

  function openMenu() {
    dispatch({ type: 'OPEN-MENU' })
  }

  function searchableOptions() {
    if (!valueHelper.isValue(state.matches) || state.matches.length === 0) {
      return [<Menu.Item key='select-match-none' title={`No ${selectTypePlural} Matched`} onPress={() => { }} />]
    }

    return state.matches.map(
      (match, idx) => {
        return (
          <Menu.Item
            key={`select-match-${idx}`}
            title={optionLabel(match)}
            onPress={
              () => {
                closeMenu()
                changeId(optionId(match))
              }
            }
          />
        )
      }
    )
  }

  function searched(matches) {
    dispatch({ type: 'SEARCHED', matches })
  }

  function updateState(oldState, action) {
    switch (action.type) {
      case 'CLOSE-MENU':
        return { ...oldState, menuVisible: false }

      case 'OPEN-MENU':
        return { ...oldState, menuVisible: true }

      case 'SEARCH':
        return { ...oldState, matchString: action.matchString, matches: undefined }

      case 'SEARCHED':
        return { ...oldState, matches: action.matches }

      default:
        return oldState
    }
  }
}

export { SelectId }

