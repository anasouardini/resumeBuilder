import React, { Children } from 'react';
import Header from './header';
import { Outlet } from 'react-router-dom';

import serverFetch from '../../utils/serverFetch';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../state/store';
import { actions } from '../../state/resumes/resumes';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useResumesList = () => {
  const [resumes, setResumes] = React.useState<RootState['resumes']>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [err, setErr] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => {
      const res = serverFetch('read', '/resumes')
        .then(res => {
          setIsLoading(false);
          // cealn up: converting object to an array and removing last item (response status).
          setResumes(Object.values(res).slice(0, -1));
        })
        .catch(err => setErr(true));
    }, 1000);
  }, []);

  // console.log(resumes)
  return { isLoading, err, resumes };
};

interface LayoutProps {}
const Layout = (props: LayoutProps) => {
  const { theme } = useSelector((state: RootState) => state.theme);
  const { isLoading, err, resumes } = useResumesList();
  const dispatch = useDispatch();
  // console.log('layout', resumes)

  React.useEffect(() => {
    if (!isLoading) {
      // console.log('layout: setting resuems state')
      dispatch(actions.setResumes(resumes));
    }
  }, [isLoading]);

  return (
    <>
      <ToastContainer
        toastStyle={{
          backgroundColor: theme == 'dark' ? '#1a1a1a' : '#f9f9f9',
          color: theme == 'dark' ? '#fff' : '#213547',
        }}
      />
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
