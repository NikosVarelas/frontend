import React from 'react'
import { Stack, router } from 'expo-router'
import { Pressable, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Toast from 'react-native-toast-message';

const Layout = (): JSX.Element => {
  return (
    <>
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Recipe',
          headerLeft: () => (
            <Pressable
              onPress={() => {
                router.back()
              }}
            >
              <Ionicons name="chevron-back" size={26} />
            </Pressable>
          ),
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 15 }}
              onPress={() => {
                router.back()
              }}
            >
              <Ionicons name="heart-outline" size={26} color='white'/>
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: 'green',
          },
          headerTintColor: 'white',
        }}
      ></Stack.Screen>
    </Stack>
    <Toast />
    </>
  )
}

export default Layout
