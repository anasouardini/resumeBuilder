import React, { Children } from 'react'
import Header from './header';
import { Outlet } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface LayoutProps { }
const Layout = (props: LayoutProps) => {

  const { theme } = useSelector((state: RootState) => state.theme);

  return (
    <>
      <ToastContainer toastStyle={{
        backgroundColor: theme == 'dark' ? '#1a1a1a' : '#f9f9f9',
        color: theme == 'dark' ? '#fff' : '#213547',
      }} />
      <Header />
      <Outlet />
    </>
  )
}

export default Layout