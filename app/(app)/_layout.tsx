import { Redirect } from 'expo-router'
import { ActivityIndicator, View } from 'react-native'
import { Provider } from 'react-redux'

import store from '@/store'
import { useSession } from '@/context/ctx'
import { Drawer } from 'expo-router/drawer'
import { Ionicons } from '@expo/vector-icons'

export default function AppLayout() {
  const { isLoading, token } = useSession()

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#006400" />
      </View>
    )
  }

  if ((token == null) && !isLoading) {
    return <Redirect href="/sign-in" />
  }

  return (
    <Provider store={store}>
      <Drawer>
        <Drawer.Screen
          name="index"
          options={{
            drawerIcon: () => <Ionicons name="home" size={20} />,
            headerTitle: 'Home',
            title: 'Home',
            headerTintColor: 'black',
            headerStyle: {
              backgroundColor: 'green',
            },
          }}
        />
        <Drawer.Screen
          name="create-recipe"
          options={{
            headerTitle: 'Create new recipe',
            title: 'Create new recipe',
            headerTintColor: 'black',
            headerStyle: {
              backgroundColor: 'green',
            },
            drawerIcon: () => <Ionicons name="add" size={20} />,
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
          name="shopping-list"
          options={{
            headerTitle: 'Shopping List',
            title: 'Shopping List',
            drawerIcon: () => <Ionicons name="basket" size={20} />,
          }}
        />
        <Drawer.Screen
          name="(recipe)"
          options={{
            drawerItemStyle: { height: 0 },
            headerShown: false,
            headerTintColor: 'black',
            headerStyle: {
              backgroundColor: 'green',
            },
          }}
        />
      </Drawer>
    </Provider>
  )
}
