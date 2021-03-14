import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import pracujta from '../resources/pracujta.png';
import '../css/Navigation.css';

const { Header } = Layout;

export const Navigation = () => {
    return (
        <Header className="header">
        <Link to="/">
          <img className="logo" src={ pracujta } alt="pracujta"/>
        </Link>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={ ['1'] } className="buttons">
          <Menu.Item key="1">
            <Link to="/home" className="nav-text">Logowanie czasu</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/calendar" className="nav-text">Calendar</Link>
          </Menu.Item>
          <Menu.Item key="3">nav 4</Menu.Item>
          <Menu.Item key="4">nav 5</Menu.Item>
          <Menu.Item key="5">nav 6</Menu.Item>
          <Menu.Item key="6">nav 7</Menu.Item>
        </Menu>
      </Header>
    );
};
