import React from 'react'
import { Slot } from 'expo-router'
import { SessionProvider } from '@/context/ctx'

export default function Root(): JSX.Element {
  // Set up the auth context and render our layout inside of it.
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <SessionProvider>
      <Slot />
    </SessionProvider>
  )
}
