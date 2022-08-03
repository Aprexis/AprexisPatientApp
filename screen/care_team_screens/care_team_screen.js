import React, { useReducer } from 'react'
import { Dimensions } from 'react-native'
import { TabView } from 'react-native-tab-view'
import { CaregiversList } from './caregivers_list'
import { HcpsList } from './hcps_list'
import { PharmacistsList } from './pharmacists_list'
import { LazyPlaceholder } from '../components'
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { styles } from '../../assets/styles'

const screens = {
  hcps: HcpsList,
  caregivers: CaregiversList,
  pharmacists: PharmacistsList
}

const routes = [
  { key: 'hcps', title: 'HCPs' },
  { key: 'caregivers', title: 'Caregivers' },
  { key: 'pharmacists', title: 'Pharmacists' }
]

function CareTeamScreen(props) {
  const { currentPatient, currentUser, userCredentials } = props
  const [state, dispatch] = useReducer(updateState, { index: 0, routes })

  return (
    <TabView
      lazy
      navigationState={state}
      renderScene={renderScene}
      renderLazyPlaceholder={renderLazyPlaceholder}
      onIndexChange={handleIndexChange}
      initialLayout={{ width: Dimensions.get('window').width }}
      style={styles.mainBody}
    />
  )

  function handleIndexChange(index) {
    dispatch({ type: 'INDEX-CHANGE', index })
  }

  function renderLazyPlaceholder({ route }) {
    return (<LazyPlaceholder route={route} />)
  }

  function renderScene({ jumpTo, route }) {
    const Screen = screens[route.key]
    if (!valueHelper.isValue(Screen)) {
      return null
    }

    return <Screen currentPatient={currentPatient} currentUser={currentUser} jumpTo={jumpTo} route={route} userCredentials={userCredentials} />
  }

  function updateState(oldState, action) {
    switch (action.type) {
      case 'INDEX-CHANGE':
        return { ...oldState, index: action.index }

      default:
        return oldState
    }
  }
}

export { CareTeamScreen }
