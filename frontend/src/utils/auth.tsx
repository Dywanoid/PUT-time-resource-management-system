import { createContext, useState} from 'react';

const AuthenticationContext = createContext<any>(null)
      , fakeAuth = {
        isAuthenticated: false,
        signin(cb) {
          fakeAuth.isAuthenticated = true;
          setTimeout(cb, 100); // fake async
        },
        signout(cb) {
          fakeAuth.isAuthenticated = false;
          setTimeout(cb, 100);
        },
      }
      // eslint-disable-next-line react/prop-types
      , ProvideAuth = ({children}) => {
        const auth = useProvideAuth();

        return (
          <AuthenticationContext.Provider value={auth}>
            {children}
          </AuthenticationContext.Provider>
        );
      }
      ,useProvideAuth = () => {
        const [user, setUser] = useState<any>(null)
              , signin = (cb) => fakeAuth.signin(() => {
                setUser('user');
                cb();
              })
              , signout = (cb) => fakeAuth.signout(() => {
                setUser(null);
                cb();
              });

        return {
          signin,
          signout,
          user,
        };
      };

export {
  AuthenticationContext,
  ProvideAuth
};