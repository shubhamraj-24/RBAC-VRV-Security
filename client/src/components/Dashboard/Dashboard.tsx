import React, { useContext, useState } from "react";

import AdminDashboard from "./AdminDashboard.tsx";
import ManagerDashboard from "./ManagerDashboard.tsx";
import UserDashboard from "./UserDashboard.tsx";
import { UserInfoContext } from "../Contexts/UserInfoContext.tsx";

const Dashboard = () => {
  const { userInfoState } = useContext(UserInfoContext);

  const role = userInfoState?.UserInfo?.role;


  switch (role) {
    case "admin":
      return <AdminDashboard />;
    case "manager":
      return <ManagerDashboard />;
    case "user":
      return <UserDashboard />;
    default:
      return <UserDashboard />;
  }
};

export default Dashboard;
