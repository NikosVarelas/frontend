import React from 'react'
import { useStorageState } from '@/storage/local-storage'
import { axiosRequest } from '@/constants/axiosRequest'
import { endpoints } from '@/constants/endpoint'
import { type AuthData } from '@/models/AuthData'

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
          const data = new FormData()
          data.append('username', username)
          data.append('password', password)
          const authData: AuthData = await axiosRequest(
            'POST',
            token,
            endpoints.authLoginAccessToken,
            data
          )
          setSession(authData.access_token)
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
