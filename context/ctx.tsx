import React from 'react'
import { useStorageState } from '@/storage/local-storage'
import { authClient } from '@/clients/auth-client'

const AuthContext = React.createContext<{
  signIn: (username: string, password: string) => Promise<void>
  signOut: () => void
  token?: string | null
  isLoading: boolean
}>({
  signIn: async (username: string, password: string): Promise<void> => {},
  signOut: () => {},
  token: null,
  isLoading: false,
})

export function useSession(): {
  signIn: (username: string, password: string) => Promise<void>
  signOut: () => void
  token?: string | null
  isLoading: boolean
} {
  const value = React.useContext(AuthContext)
  return value
}

export function SessionProvider(
  props: React.PropsWithChildren<unknown>
): JSX.Element {
  const [[isLoading, token], setSession] = useStorageState('token')

  return (
    <AuthContext.Provider
      value={{
        signIn: async (username: string, password: string): Promise<void> => {
          const authData = await authClient.logIn(username, password)
          setSession(authData.token)
        },
        signOut: (): void => {
          setSession(null)
        },
        token,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
