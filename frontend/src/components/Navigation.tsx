import { useContext } from 'react';
import { Layout, Menu, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import pracujta from '../resources/pracujta.png';
import { UserContext } from '../utils/auth';
import { colorHash } from '../utils/colorHash';
import '../css/Navigation.css';

const { Header } = Layout;
const { SubMenu } = Menu;

export const Navigation = (): JSX.Element => {
  const userInfo = useContext(UserContext);

  const user = userInfo?.name || '';
  const userRoles = userInfo?.roles || '';

  return(
    <Header className="header">
      <img className="logo" src={ pracujta } alt="pracujta"/>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={ ['1'] } className="buttons">
        <Menu.Item key="1">
          <Link to="/" className="nav-text">Logowanie czasu</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/clients" className="nav-text">Klienci</Link>
        </Menu.Item>
        <SubMenu key="SubMenu1" title="Kalendarz i wnioski">
          <Menu.Item key="3">
            <Link to="/calendar" className="nav-text">Kalendarz</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/applications" className="nav-text">Wnioski</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="SubMenu2" title="Użytkownicy">
          <Menu.Item key="5">
            <Link to="/teams" className="nav-text">Zespoły</Link>
          </Menu.Item>
          { userRoles.includes('manager')
          && <Menu.Item key="6">
            <Link to="/subordinate" className="nav-text">Przydziel podwładnych</Link>
          </Menu.Item>
          }

        </SubMenu>
        <Menu.Item key="7">
          <Link to="/reports" className="nav-text">Raporty</Link>
        </Menu.Item>
      </Menu>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={ ['1'] } className="logoutMenu">
        <SubMenu
          key="SubMenu3" title={
            <Avatar style={{ backgroundColor: colorHash(user) }}>{ user.match(/\b(\w)/g) }</Avatar>
          }>
          <Menu.Item key="7" onClick={ () => window.location.href='http://localhost/logout'}>Wyloguj</Menu.Item>
        </SubMenu>
      </Menu>
    </Header>
  );
};
