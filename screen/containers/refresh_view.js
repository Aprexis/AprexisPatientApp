import React, { useState } from 'react'
import { View } from 'react-native'
import UserInactivity from 'react-native-user-inactivity'
import { valueHelper } from '../../helpers'

function RefreshView({ children, onIdle, timeout }) {
  const [active, setActive] = useState(true);
  const [timer, setTimer] = useState(valueHelper.isNumberValue(timeout) ? timeout : (5 * 60 * 1000))

  return (
    <View style={{ flex: 1 }}>
      <UserInactivity
        isActive={active}
        timeForInactivity={timer}
        onAction={
          isActive => {
            if (!valueHelper.isFunction(onIdle)) {
              setActive(isActive)
              return
            }

            onIdle((isActive) => { setActive(isActive) })
          }
        }
        style={{ flex: 1 }}>
        {children}
      </UserInactivity >
    </View >
  )
}

export { RefreshView }
