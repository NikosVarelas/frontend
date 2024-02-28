import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { Feather, Ionicons } from '@expo/vector-icons'

const CustomHeader = () => {
  return (
    <View style={styles.header}>
    <TouchableOpacity
      style={styles.homeButton}
      onPress={() => {
        router.push('/(app)')
      }}
    >
      <Ionicons name="home" size={26} />
    </TouchableOpacity>

    <Feather name="settings" size={26} color="black" />
  </View>
  )
}

export default CustomHeader