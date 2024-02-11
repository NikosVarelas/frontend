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
}>({
  signIn: (username: string, password: string) => null,
  signOut: () => null,
  token: null,
  isLoading: false
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


  return (
    <AuthContext.Provider
      value={{
        signIn: async (username: string, password: string) => {
          const authData = await authClient.logIn(username, password)
          
          setSession(authData.token);
        },
        signOut: () => {
          setSession(null);
        },
        token,
        isLoading
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
