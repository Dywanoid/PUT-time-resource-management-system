import {useContext} from 'react';
import { Redirect, Route} from 'react-router-dom';
import {AuthenticationContext} from '../utils/auth';

export const PrivateRoute = ({component, ...rest}) => {
    let auth = useContext(AuthenticationContext);

    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.user ? (
            component()
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