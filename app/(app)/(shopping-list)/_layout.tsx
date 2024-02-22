import React from 'react'
import { Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Stack, router } from 'expo-router'

const Layout = (): JSX.Element => {
  
  return (
    <Stack>
      <Stack.Screen
        name="page"
        options={{
          headerShown: true,
          headerTitle: 'Shopping List',
          headerStyle: {
            backgroundColor: 'green',
          },
          headerRight: () => (
            <Pressable
              onPress={() => {
                router.push('/edit')
              }}
            >
              <Ionicons name="pencil" size={26} style={{ marginRight: 20 }} />
            </Pressable>
          ),
          headerLeft: () => (
            <Pressable
              onPress={() => {
                router.push('/(app)')
              }}
            >
              <Ionicons name="home" size={26} style={{ marginRight: 20 }} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="edit"
        options={{
          title: 'Edit',
          headerStyle: {
            backgroundColor: 'green',
          },
          headerBackButtonMenuEnabled: false,
          headerLeft: () => (
            <Pressable
              onPress={() => {
                router.back()
              }}
            >
              <Ionicons name="chevron-back" size={26} style={{ marginRight: 20 }} />
            </Pressable>
          ),
        }}
      />
    </Stack>
  )
}

export default Layout
