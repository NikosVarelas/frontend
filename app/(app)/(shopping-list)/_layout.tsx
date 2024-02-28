import { Stack, router } from 'expo-router'
import React from 'react'
import { Fontisto } from '@expo/vector-icons'

export default function Layout(): JSX.Element {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="settings-modal"
        options={{
          presentation: 'modal',
          headerTitle: 'Settings',
          headerLeft: () => (
            <Fontisto
              name="close-a"
              size={22}
              color="green"
              onPress={() => { router.back(); }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="edit-modal"
        options={{
          headerTitle: 'Edit',
          presentation: 'modal',
          headerLeft: () => (
            <Fontisto
              name="close-a"
              size={22}
              color="green"
              onPress={() => { router.back(); }}
            />
          ),
        }}
      />
    </Stack>
  )
}
