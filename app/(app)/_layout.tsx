import { Redirect, Stack } from 'expo-router';
import { Text } from 'react-native'

import { useSession } from '@/context/ctx';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';



export default function AppLayout() {
  const { token, isLoading } = useSession();

    
  console.log(isLoading)
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!token) {
    return <Redirect href="/sign-in" />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <Drawer>
        <Drawer.Screen name='index' options={{
            drawerIcon: () => (
                <Ionicons name='home'/>
            ),
            headerTitle: "Home",
            title: "Home"
        }} />
        <Drawer.Screen name='create-recipe' options={{
            headerTitle: "Create new recipe",
            title: "Create new recipe",
            drawerIcon: () => (
                <Ionicons name='add' />
            )
        }}/>
        <Drawer.Screen name='settings' options={{
            headerTitle: "Settings",
            title: "Settings",
            drawerIcon: () => (
                <Ionicons name='settings' />
            )
        }}/>
        <Drawer.Screen name='shopping-list' options={{
            headerTitle: "Shopping List",
            title: "Shopping List",
            drawerIcon: () => (
                <Ionicons name='basket' />
            )
        }}/>
        <Drawer.Screen name='(recipe)'
              options={{
                drawerItemStyle: { height: 0 },
                headerShown: false
        }}/>
    </Drawer>
  )
}
