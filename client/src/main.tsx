import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'

import Layout from '@/components/shared/layout';
import Resumes from '@/pages/resumes';
import Template from '@/pages/template';
import Editor from '@/pages/editor';

import { Provider } from 'react-redux';
import { store } from '@/store';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/resumes' element={<Resumes />} />
            <Route path='/template' element={<Template />} />
            <Route path='/editor:resumeID' element={<Editor />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)