import { Stack, router } from 'expo-router'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Pressable } from 'react-native'

const Layout = (): JSX.Element => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          headerTitle: '',
          headerRight: () => (
            <Pressable
              onPress={() => {
                router.push('/modal')
              }}
            >
              <Ionicons name="pencil" size={26} style={{ marginRight: 20 }} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="modal"
        options={{
          presentation: 'modal',
        }}
      />
    </Stack>
  )
}

export default Layout
