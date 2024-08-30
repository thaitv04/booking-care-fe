import AdminSidebar from "./AdminSidebar";
import { Layout } from "antd";
import { useState } from "react";
import AdminHeader from "./AdminHeader";
import { Outlet } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;

const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  display: "flex",
  justifyContent: "end",
  alignItems: "center"
};
const footerStyle = {
  textAlign: "center",
};
const contentStyle = {
  padding: "40px 24px",
  minHeight: 280,
  marginLeft: "16px",
};
const layoutStyle = {};

export default function LayoutAdmin() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          theme="dark"
          mode="inline"
          style={{
            width: "25%",
            overflow: "auto",
          }}
        >
          <AdminSidebar collapsed={collapsed} />
        </Sider>
        <Layout style={layoutStyle}>
          <Header style={headerStyle}>
            <AdminHeader />
          </Header>

          <Content style={contentStyle}>
            <Outlet />
          </Content>
          <Footer style={footerStyle}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}
