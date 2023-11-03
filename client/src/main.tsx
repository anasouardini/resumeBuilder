import './styles/index.scss'

import React from 'react'
import ReactDOM from 'react-dom/client'

import Layout from './components/shared/layout'
import Resumes from './pages/resumes'
import Editor from './pages/editor'
import Preview from './pages/preview'

import { Provider as ReduxProvider } from 'react-redux'
import { store } from './state/store'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <ReduxProvider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/resumes' element={<Resumes />} />
            <Route path='/preview/:resumeID' element={<Preview />} />
            <Route path='/editor/:resumeID' element={<Editor />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ReduxProvider>
  </QueryClientProvider>,
  // </React.StrictMode>
)
