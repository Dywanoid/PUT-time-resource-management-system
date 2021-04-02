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

            <Layout>
              <div className="site-layout-background">
                <Navigation/>
                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                <Component {...props}/>
                </div>
                </Content>
                <Footer className="footer">©PRACUJTA</Footer>
              </div>
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
