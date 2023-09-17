import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <p>MainLayout</p>
      <Outlet />
    </div>
  );
};

export default MainLayout;