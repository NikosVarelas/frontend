import React from 'react'
import { Pressable } from 'react-native'
import { Ionicons, Fontisto } from '@expo/vector-icons'
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
                router.push('/modal')
              }}
            >
              <Fontisto name="shopping-basket-add" size={26} color="black" />
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
        name="modal"
        options={{
          title: 'Modal',
          presentation: 'modal',
          headerStyle: {
            backgroundColor: 'green',
          },
        }}
        />
    </Stack>
  )
}

export default Layout
