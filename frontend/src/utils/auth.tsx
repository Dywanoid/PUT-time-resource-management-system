import React, { createContext, useState } from 'react';
export interface Auth {
  signin: (cb: () => void) => void;
  signout: (cb: () =>void) => void;
  user: string | null;
}

export interface ProvideAuthProps {
  children:  JSX.Element | undefined;
}

const firstContext: Auth = {
  signin: () => null,
  signout: () => null,
  user: null
};

const AuthenticationContext = createContext<Auth>(firstContext);

const fakeAuth = {
  isAuthenticated: false,
  signin(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const ProvideAuth = ({ children } : ProvideAuthProps) : JSX.Element => {
  const auth = useProvideAuth();

  return (
    <AuthenticationContext.Provider value={auth}>
      {children}
    </AuthenticationContext.Provider>
  );
};

const useProvideAuth = () : Auth => {
  const [user, setUser] = useState<string | null>('user');

  const  signin = (cb) => fakeAuth.signin(() => {
    setUser('user');
    cb();
  });

  const signout = (cb) => fakeAuth.signout(() => {
    setUser(null);
    cb();
  });

  return {
    signin,
    signout,
    user
  };
};

export {
  AuthenticationContext,
  ProvideAuth
};