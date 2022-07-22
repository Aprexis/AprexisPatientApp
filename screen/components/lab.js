import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcon } from './material_community_icon'
import { labTestValueHelper } from '../../helpers'
import { styles } from '../../assets/styles'

function Lab(props) {
  const { lab } = props

  return (
    <View>
      <View style={styles.row}>
        <MaterialCommunityIcon size={40} style={styles.icon} name='test-tube' />
        <Text style={inlineStyles.text}>{labTestValueHelper.labTestFullName(lab)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={inlineStyles.text}>{labTestValueHelper.labTestCategory(lab)}</Text>
        <Text style={inlineStyles.text}>{labTestValueHelper.displayType(lab)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={inlineStyles.text}>{labTestValueHelper.displayValueTakenAt(lab)}</Text>
        <Text style={inlineStyles.text}>{labTestValueHelper.value(lab)}</Text>
      </View>
    </View>
  )
}

export { Lab }

const inlineStyles = StyleSheet.create(
  {
    text: { color: "#112B37", fontSize: 18, fontWeight: "500", marginLeft: 5 },
  }
)
