import React, { useEffect, useReducer, useRef } from 'react'
import { View } from 'react-native'
import { Button, Menu, Searchbar } from 'react-native-paper'
import { valueHelper } from '../../helpers'

function SelectId({ id, optionId, optionLabel, matchString, search, changeId }) {
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
    }
  )

  return (
    <View styles={{ flexDirection: 'column' }}>
      <Searchbar placeholder='Search HCPs' onChangeText={changeMatchString} value={state.matchString} />
      <Menu
        visible={valueHelper.isSet(state.hcpMenuVisible)}
        onDismiss={closeMenu}
        anchor={<Button disabled={!haveMatches} onPress={openMenu}>Select HCP</Button>}>
        {searchableOptions()}
      </Menu>
    </View>
  )

  function changeMatchString(text) {
    dispatch({ type: 'SEARCH', matchString: text })
  }

  function closeMenu() {
    dispatch({ type: 'CLOSE-HCP-MENU' })
  }

  function initialState() {
    return { id: valueHelper.isNumberValue(id) ? id : 0, matchString: valueHelper.isStringValue(matchString) ? matchString : '', hcpMenuVisible: false }
  }

  function openMenu() {
    dispatch({ type: 'OPEN-HCP-MENU' })
  }

  function searchableOptions() {
    if (!valueHelper.isValue(state.matches) || state.matches.length === 0) {
      return [<Menu.Item key='select-match-none' title='No HCPs Matched' onPress={() => { }} />]
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
      case 'CLOSE-HCP-MENU':
        return { ...oldState, hcpMenuVisible: false }

      case 'OPEN-HCP-MENU':
        return { ...oldState, hcpMenuVisible: true }

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

