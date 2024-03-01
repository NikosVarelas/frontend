import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { router } from 'expo-router'
import Colors from '@/constants/Colors'

const modal = () => {
  return (
    <View style={styles.container}>
      <Text>modal</Text>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.fullButton}
          onPress={() => {
            router.back()
          }}
        >
          <Text style={styles.footerText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.lightGrey,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    height: Dimensions.get('window').height * 0.1,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -10 },
  },
  fullButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
})

export default modal
