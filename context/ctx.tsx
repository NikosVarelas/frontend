import React from 'react';
import { useStorageState } from '@/storage/local-storage';
import { authClient } from '@/clients/auth-client';
import { UserClient, User } from '@/clients/user-client';
import { useState, useEffect } from 'react';

const AuthContext = React.createContext<{
  signIn: (username: string, password: string) => void;
  signOut: () => void;
  token?: string | null;
  isLoading: boolean;
  user: User | null;
  isUserLoading: boolean
}>({
  signIn: (username: string, password: string) => null,
  signOut: () => null,
  token: null,
  isLoading: false,
  user: null,
  isUserLoading: false
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, token], setSession] = useStorageState('token');
  const [user, setUser] = useState<User | null>(null)
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        try {
            setIsUserLoading(true)
          const userData = await UserClient.getUser(token);
          setUser(userData);
        } catch (error) {
          // Handle error
          console.error('Error fetching user data:', error);
        } finally {
            setIsUserLoading(false)
        }
      }
    };

    fetchUserData()
}, [token])

  return (
    <AuthContext.Provider
      value={{
        signIn: async (username: string, password: string) => {
          const authData = await authClient.logIn(username, password)
          
          setSession(authData.token);
          setIsUserLoading(true)
        },
        signOut: () => {
          setSession(null);
          setUser(null)
        },
        token,
        isLoading,
        user,
        isUserLoading
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
