import React, { createContext } from 'react';
import { useGetCurrentUserQuery } from '../generated/graphql';

type Supervisor = {
  id,
  name
}

type Subordinates = {
  id,
  name,
  roles
}

type Members = {
  id,
  name,
  roles,
  supervisor:Supervisor
  subordinates:Subordinates
}

type Teams = {
  id: string;
  name: string;
  description: string;
  archived: boolean;
  members: Members;
}

export interface User {
  id: string | null;
  name: string | null;
  roles: string[] | [];
  supervisor: Supervisor | [];
  subordinates: Subordinates
  teams: Teams
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
  const user: User = {
    id: data?.user.id || null, name: data?.user.name || null, roles: data?.user.roles || [],
    subordinates: data?.user.subordinates as any,
    supervisor: data?.user.supervisor || [], teams: data?.user.teams as any
  };

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