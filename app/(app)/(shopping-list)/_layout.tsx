import { Stack, router } from 'expo-router'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'

export default function Layout(): JSX.Element {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="settings-modal"
        options={{
          presentation: 'modal',
          headerTitle: 'Settings',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: Colors.lightGrey,
          },
          headerLeft: () => (
            <Ionicons
              name="close-outline"
              size={28}
              color={Colors.primary}
              onPress={() => {
                router.back()
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="edit-modal"
        options={{
          headerTitle: 'Edit',
          presentation: 'modal',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: Colors.lightGrey,
          },
          headerLeft: () => (
            <Ionicons
              name="close-outline"
              size={28}
              color={Colors.primary}
              onPress={() => {
                router.back()
              }}
            />
          ),
        }}
      />
    </Stack>
  )
}
