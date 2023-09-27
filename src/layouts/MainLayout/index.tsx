import { useLocation } from "react-router-dom";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import SideNav from "./SideNav";

import Header from "./Header";
import Footer from "./Footer";

const { Header: AntHeader, Content, Sider } = Layout;

function MainLayout() {
  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");

  return (
    <Layout
      className={`layout-dashboard ${pathname === "profile" ? "layout-profile" : ""} ${
        pathname === "rtl" ? "layout-dashboard-rtl" : ""
      }`}
    >
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        trigger={null}
        width={250}
        theme="light"
        className={`sider-primary ant-layout-sider-primary`}
        style={{ background: "transparent" }}
      >
        <SideNav color={"#1890ff"} />
      </Sider>
      <Layout>
        <AntHeader>
          <Header name={pathname} subName={pathname} />
        </AntHeader>
        <Content className="content-ant">
          <Outlet />
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
}

export default MainLayout;
