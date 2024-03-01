import React from 'react'
import { Redirect } from 'expo-router'
import { ActivityIndicator, View } from 'react-native'
import { useSession } from '@/context/ctx'
import { Drawer } from 'expo-router/drawer'
import { Ionicons } from '@expo/vector-icons'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Colors from '@/constants/Colors'
import Toast from 'react-native-toast-message'

const queryClient = new QueryClient()

export default function AppLayout(): JSX.Element {
  const { isLoading, token } = useSession()

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#006400" />
      </View>
    )
  }

  if (token == null && !isLoading) {
    return <Redirect href="/sign-in" />
  }

  return (
    <QueryClientProvider client={queryClient}>
      <>
        <Drawer>
          <Drawer.Screen
            name="index"
            options={{
              drawerIcon: () => <Ionicons name="home" size={20} />,
              headerTitle: 'Home',
              title: 'Home',
              headerTintColor: 'black',
              headerStyle: {
                backgroundColor: Colors.primary,
              },
            }}
          />
          <Drawer.Screen
            name="settings"
            options={{
              headerTitle: 'Settings',
              title: 'Settings',
              headerTintColor: 'black',
              headerStyle: {
                backgroundColor: 'green',
              },
              drawerIcon: () => <Ionicons name="settings" size={20} />,
            }}
          />
          <Drawer.Screen
            name="(recipe)"
            options={{
              drawerItemStyle: { height: 0 },
              headerShown: false,
              headerTintColor: 'black',
              headerStyle: {
                backgroundColor: Colors.primary,
              },
            }}
          />
          <Drawer.Screen
            name="(shopping-list)"
            options={{
              headerShown: false,
              title: 'Shopping List',
              drawerIcon: () => <Ionicons name="basket" size={20} />,
            }}
          />
        </Drawer>
        <Toast />
      </>
    </QueryClientProvider>
  )
}
