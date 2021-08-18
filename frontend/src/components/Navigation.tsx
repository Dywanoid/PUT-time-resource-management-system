import { useContext, useState } from 'react';
import { injectIntl } from 'react-intl';
import { Layout, Menu, Avatar, Button } from 'antd';
import { Link } from 'react-router-dom';
import logo from '../resources/pracujtime.png';
import { UserContext } from '../utils/auth';
import { colorHash } from '../utils/colorHash';
import plImg from '../resources/pl.png';
import enImg from '../resources/en.png';
import '../css/Navigation.css';

const { Header } = Layout;
const { SubMenu } = Menu;

export const Navigation = injectIntl(({ intl }): JSX.Element => {
  const userInfo = useContext(UserContext);
  const [lang, setLang] = useState('');

  const user = userInfo?.name || '';
  const userRoles = userInfo?.roles || [''];

  const changeLanguageFlag = () => {
    localStorage.setItem('lang', localStorage.getItem('lang') === 'en' ? 'pl' : 'en' );
    setLang(localStorage.getItem('lang') as any);
    window.location.reload();
  };

  return(
    <Header className="header">
      <img className="logo" src={ logo } alt="pracujtime"/>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={ ['1'] } className="buttons">
        <Menu.Item key="1">
          <Link to="/" className="nav-text">
            { intl.formatMessage({ id: 'time_logging' }) }
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/clients" className="nav-text">
            { intl.formatMessage({ id: 'clients' }) }
          </Link>
        </Menu.Item>
        <SubMenu
          key="SubMenu1"
          title={ intl.formatMessage({ id: 'calendar_and_applications' }) }
        >
          <Menu.Item key="3">
            <Link to="/calendar" className="nav-text">
              { intl.formatMessage({ id: 'calendar' }) }
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/applications" className="nav-text">
              { intl.formatMessage({ id: 'applications' }) }
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="SubMenu2"
          title={ intl.formatMessage({ id: 'users' }) }
        >
          <Menu.Item key="5">
            <Link to="/teams" className="nav-text">
              { intl.formatMessage({ id: 'teams' }) }
            </Link>
          </Menu.Item>
          { userRoles.includes('supervisor_editor')
          && <Menu.Item key="6">
            <Link to="/subordinate" className="nav-text">
              { intl.formatMessage({ id: 'assign_subordinates' }) }
            </Link>
          </Menu.Item>
          }
        </SubMenu>
        <SubMenu
          key="SubMenu3"
          title={ intl.formatMessage({ id: 'reports' }) }
        >
          <Menu.Item key="7">
            <Link to="/reports" className="nav-text">
              { intl.formatMessage({ id: 'reports' }) }
            </Link>
          </Menu.Item>
          <Menu.Item key="8">
            <Link to="/userReports" className="nav-text">
              { intl.formatMessage({ id: 'users_reports' }) }
            </Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
      <Button aria-label="language" onClick={ changeLanguageFlag } className="flagButton">
        <img src={ localStorage.getItem('lang') === 'pl' ? plImg : enImg } className="lang" alt="Lang"/>
      </Button>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={ ['1'] } className="logoutMenu">
        <SubMenu
          key="SubMenu3" title={
            <Avatar style={{ backgroundColor: colorHash(user) }}>{ user.match(/\b(\w)/g) }</Avatar>
          }>
          <Menu.Item
            key="7"
            onClick={ () => window.location.href='http://localhost/logout'}
          >
            { intl.formatMessage({ id: 'logout' }) }
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Header>
  );
});