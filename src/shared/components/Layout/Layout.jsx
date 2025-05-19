import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '/src/shared/components/Header/Header';
import { useTheme } from "../../hooks/useTheme";



const Layout = () => {
  const { theme, changeTheme } = useTheme();
useEffect(() => {
  changeTheme('cvConstructorTheme');
}, []);



  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
