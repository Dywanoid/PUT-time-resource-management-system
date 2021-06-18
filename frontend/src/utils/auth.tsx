import React, { createContext } from 'react';
import { useGetCurrentUserQuery } from '../generated/graphql';
export interface User {
  id: string | null;
  name: string | null;
  roles: string[] | [];
}

export interface ProvideAuthProps {
  children:  JSX.Element | undefined;
}

const UserContext = createContext<User | null>(null);

const ProvideAuth = ({ children } : ProvideAuthProps) : JSX.Element => {
  const { data, error, loading } = useGetCurrentUserQuery();

  if(loading || error) {
    return (<></>);
  }
  const user: User = { id: data?.user.id || null, name: data?.user.name || null, roles: data?.user.roles || [] };

  return (
    <UserContext.Provider value={user}>
      { children }
    </UserContext.Provider>
  );
};

export {
  UserContext,
  ProvideAuth
};