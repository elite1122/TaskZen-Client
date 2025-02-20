import { StrictMode } from 'react'
import './index.css';
import { createRoot } from 'react-dom/client'
import {
  RouterProvider
} from "react-router-dom";
import { router } from './routes/Router.jsx';
import AuthProvider from './provider/AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
