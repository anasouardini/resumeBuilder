import './styles/index.scss';
import React, { Children } from 'react'
import Header from '@/components/shared/header';

interface LayoutProps {}

const Layout = (props:LayoutProps) => {
  return (
    <>
      <Header></Header>
      {Children}
    </>
  )
}

export default Layout