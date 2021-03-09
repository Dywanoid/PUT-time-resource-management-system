import { createContext, useState} from "react";

const AuthenticationContext = createContext<any>(null);

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
  
const useProvideAuth = () => {
    const [user, setUser] = useState<any>(null);

    const signin = cb => {
      return fakeAuth.signin(() => {
        setUser("user");
        cb();
      });
    };
  
    const signout = cb => {
      return fakeAuth.signout(() => {
        setUser(null);
        cb();
      });
    };
  
    return {
      user,
      signin,
      signout
    };
};

const ProvideAuth = ({children}) => {
    const auth = useProvideAuth();

    return (
        <AuthenticationContext.Provider value={auth}>
            {children}
        </AuthenticationContext.Provider>
    );
}

export {
  AuthenticationContext, 
  ProvideAuth
};