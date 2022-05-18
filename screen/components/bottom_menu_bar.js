import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCog, faHome } from '@fortawesome/free-solid-svg-icons'
import { valueHelper } from "../../helpers"

const icons = {
  'Home': faHome,
  'Settings': faCog
}

function BottomMenuBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name.toUpperCase()

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        }

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            key={`bottom-${route.key}`}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <FontAwesomeIcon size={60} icon={icons[route.name]} />
            <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
              {label}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  );
}

export { BottomMenuBar }
