import React from 'react'
import { Slot } from 'expo-router'
import { SessionProvider } from '@/context/ctx'
import { useFonts } from 'expo-font'
import { ActivityIndicator } from 'react-native'

export default function Root(): JSX.Element {
  const [fontsLoaded] = useFonts({
    'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  if (!fontsLoaded) {
    return <ActivityIndicator style={{alignItems: 'center'}}/>
  }
  // Set up the auth context and render our layout inside of it.
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <SessionProvider>
      <Slot />
    </SessionProvider>
  )
}
