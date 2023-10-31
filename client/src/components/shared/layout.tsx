import React, { Children } from 'react'
import Header from './header';

interface LayoutProps {
  children: React.ReactNode
}

const Layout = (props:LayoutProps) => {
  return (
    <>
      <Header/>
      {props.children}
    </>
  )
}

export default Layout