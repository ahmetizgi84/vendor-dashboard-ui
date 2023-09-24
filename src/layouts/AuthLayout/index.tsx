import { Outlet } from "react-router-dom";
import { Layout } from "antd";

import { Footer, Header } from "@/components";

const AuthLayout = () => {
  return (
    <Layout className="layout-default layout-signin">
      <Header />
      <Outlet />
      <Footer />
    </Layout>
  );
};

export default AuthLayout;
