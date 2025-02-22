import { StrictMode } from 'react'
import './index.css';
import { createRoot } from 'react-dom/client'
import {
  RouterProvider
} from "react-router-dom";
import { router } from './routes/Router.jsx';
import AuthProvider from './provider/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)
