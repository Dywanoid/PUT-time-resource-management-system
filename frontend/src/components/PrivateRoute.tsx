import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { AuthenticationContext } from '../utils/auth';
import { Navigation } from './Navigation';
import '../css/PrivateRoute.css';

const { Content, Footer } = Layout;

interface PrivateRouteProps {
  component: () => JSX.Element | null;
  path: string;
  exact?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, path, exact }: PrivateRouteProps) => {
  const auth = useContext(AuthenticationContext);

  const renderRoute = ({ location }) =>
    auth?.user
      ? (
        <Layout>
          <div className="site-layout-background">
            <Navigation/>
            <Content className="site-layout" style={{ marginTop: 64, padding: '0 50px' }}>
              <div className="site-layout-background" style={{  minHeight: 380, padding: 24 }}>
                <Component/>
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
            state: { from: location }
          }}
        />
      );

  return (
    <Route
      exact={exact}
      path={path}
      render={renderRoute}
    />
  );
};

export { PrivateRoute };