import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthenticationContext } from '../utils/auth';

export const PrivateRoute = ({component: Component, layout: Layout, ...rest}) => {
    let auth = useContext(AuthenticationContext);

    return (
      <Route
        {...rest}
        render={({ location, props }) =>
          auth.user ? (
            <Layout>
              <Component {...props} />
            </Layout>
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
