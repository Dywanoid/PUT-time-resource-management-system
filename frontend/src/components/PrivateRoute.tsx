import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { AuthenticationContext } from '../utils/auth';
import { Navigation } from './Navigation';
import '../css/Index.css';

const { Content, Footer } = Layout;

export const PrivateRoute = ({component: Component, ...rest}) => {
    let auth = useContext(AuthenticationContext);

    return (
      <Route
        {...rest}
        render={({ location, props }) =>
          auth.user ? (
            <>
              <div className="site-layout-background">
                <Navigation/>
                <Component {...props}/>
                <Footer className="footer">©PRACUJTA</Footer>
              </div>
            </>
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
