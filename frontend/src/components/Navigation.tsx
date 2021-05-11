import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import pracujta from '../resources/pracujta.png';
import '../css/Navigation.css';

const { Header } = Layout;

export const Navigation = (): JSX.Element =>  (
  <Header className="header">
    <img className="logo" src={ pracujta } alt="pracujta"/>
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={ ['1'] } className="buttons">
      <Menu.Item key="1">
        <Link to="/" className="nav-text">Logowanie czasu</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/calendar" className="nav-text">Kalendarz</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/resources" className="nav-text">Zasoby</Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to="/applications" className="nav-text">Wnioski</Link>
      </Menu.Item>
      <Menu.Item key="5">
        <Link to="/clients" className="nav-text">Klienci</Link>
      </Menu.Item>
    </Menu>
  </Header>
);
