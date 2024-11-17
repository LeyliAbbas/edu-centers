import { useState } from "react";
import {
  BankOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ReadOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout as AntLayout, Menu, Dropdown, Avatar } from "antd";
import { Routes, Route, useNavigate, Navigate, useLocation } from "react-router-dom";
import Universities from "../../pages/universities";
import Schools from "../../pages/schools";
import HighSchools from "../../pages/high-schools";
import styles from "./index.module.css";

const { Header, Sider, Content } = AntLayout;

function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: "/universities",
      icon: <ReadOutlined />,
      label: "Universities",
      onClick: () => navigate("/universities"),
    },
    {
      key: "/high-schools",
      icon: <SolutionOutlined />,
      label: "High Schools",
      onClick: () => navigate("/high-schools"),
    },
    {
      key: "/schools",
      icon: <BankOutlined />,
      label: "Schools",
      onClick: () => navigate("/schools"),
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const profileMenuItems = [
    {
      key: "1",
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  return (
    <AntLayout className={styles.layout}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className={styles.sider}
        width={200}
        collapsedWidth={80}
      >
        <div className={styles.logoContainer}>
          <img src="logo.svg" className={styles.logo} alt="Logo" />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
        />
      </Sider>
      <AntLayout
        style={{
          marginLeft: collapsed ? 80 : 200,
          transition: "margin-left 0.3s ease",
        }}
      >
        <Header
          className={styles.header}
          style={{
            width: `calc(100% - ${collapsed ? 80 : 200}px)`,
            transition: "width 0.3s ease",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className={styles.collapseButton}
          />
          <div className={styles.profile}>
            <Dropdown menu={{ items: profileMenuItems }} placement="bottomRight" arrow>
              <Avatar size="large" icon={<UserOutlined />} />
            </Dropdown>
          </div>
        </Header>
        <Content className={styles.content}>
          <Routes>
            <Route path="/" element={<Navigate to="/universities" />} />
            <Route path="/universities" element={<Universities />} />
            <Route path="/schools" element={<Schools />} />
            <Route path="/high-schools" element={<HighSchools />} />
          </Routes>
        </Content>
      </AntLayout>
    </AntLayout>
  );
}

export default Layout;
