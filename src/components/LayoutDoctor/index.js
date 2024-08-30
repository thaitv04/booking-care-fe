import DoctorSidebar from "./DoctorSidebar";
import { Layout } from "antd";
import { useState } from "react";
import DoctorHeader from "./DoctorHeader";
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
          <DoctorSidebar collapsed={collapsed} />
        </Sider>
        <Layout style={layoutStyle}>
          <Header style={headerStyle}>
            <DoctorHeader />
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
