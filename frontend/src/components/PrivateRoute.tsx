import {useContext} from 'react';
import { Redirect, Route} from 'react-router-dom';
import {AuthenticationContext} from '../utils/auth';

export const PrivateRoute = ({children, ...rest}) => {
    let auth = useContext(AuthenticationContext);

    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.user ? (
            children()
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
};