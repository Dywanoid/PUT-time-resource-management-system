import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { AuthenticationContext } from '../utils/auth';
import { Navigation } from './Navigation';
import '../css/PrivateRoute.css';

const { Content, Footer } = Layout;

// eslint-disable-next-line one-var, react/prop-types
export const PrivateRoute = ({component: Component, ...rest}) => {
  const auth = useContext(AuthenticationContext);

  return (
    <Route
      {...rest}
      render={({ location, props }) =>
        auth.user
          ? (
            <Layout>
              <div className="site-layout-background">
                <Navigation/>
                <Content className="site-layout" style={{ marginTop: 64, padding: '0 50px' }}>
                  <div className="site-layout-background" style={{  minHeight: 380, padding: 24 }}>
                    <Component {...props}/>
                  </div>
                </Content>
                <Footer className="footer">©PRACUJTA</Footer>
              </div>
            </Layout>
          )
          : (
            <Redirect
              to={{
                pathname: '/',
                state: { from: location },
              }}
            />
          )
      }
    />
  );
};
