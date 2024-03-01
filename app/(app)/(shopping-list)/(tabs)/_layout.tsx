import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Link, Tabs, router } from 'expo-router'
import { Pressable } from 'react-native'
import {
  Feather,
  Ionicons,
  SimpleLineIcons,
  AntDesign,
  MaterialCommunityIcons,
} from '@expo/vector-icons'
import Colors from '@/constants/Colors'

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name']
  color: string
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />
}

export default function TabLayout(): JSX.Element {
  return (
    <Tabs>
      <Tabs.Screen
        name="page"
        options={{
          title: 'Shopping List',
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: 'black',
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons name="basket" size={24} color="black" />
          ),
          headerRight: () => (
            <Link href="/settings-modal" asChild>
              <Pressable>
                <Feather
                  name="settings"
                  size={24}
                  color="black"
                  style={{ marginRight: 20 }}
                />
              </Pressable>
            </Link>
          ),
          headerLeft: () => (
            <Link href="/(app)" asChild>
              <Pressable>
                <Ionicons
                  name="home"
                  size={24}
                  color="black"
                  style={{ marginLeft: 20 }}
                />
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="new-item"
        options={{
          title: 'Add Item',
          href: '(shopping-list)/edit-modal',
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: 'black',
          tabBarIcon: ({ color }) => (
            <AntDesign name="pluscircleo" size={26} color="black" />
          ),
          headerRight: () => (
            <Link href="/settings-modal" asChild>
              <Pressable>
                <Feather
                  name="settings"
                  size={24}
                  color="black"
                  style={{ marginRight: 20 }}
                />
              </Pressable>
            </Link>
          ),
          headerLeft: () => (
            <Link href="/(app)" asChild>
              <Pressable>
                <Ionicons
                  name="home"
                  size={24}
                  color="black"
                  style={{ marginLeft: 20 }}
                />
              </Pressable>
            </Link>
          ),
        }}
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault()
            router.push('/(app)/(shopping-list)/edit-modal')
          },
        })}
      />
      <Tabs.Screen
        name="recipes"
        options={{
          title: 'Recipes',
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: 'black',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chef-hat" size={26} color="black" />
          ),
          headerRight: () => (
            <Link href="/settings-modal" asChild>
              <Pressable>
                <Feather
                  name="settings"
                  size={24}
                  color="black"
                  style={{ marginRight: 20 }}
                />
              </Pressable>
            </Link>
          ),
          headerLeft: () => (
            <Link href="/(app)" asChild>
              <Pressable>
                <Ionicons
                  name="home"
                  size={24}
                  color="black"
                  style={{ marginLeft: 20 }}
                />
              </Pressable>
            </Link>
          ),
        }}
      />
    </Tabs>
  )
}
