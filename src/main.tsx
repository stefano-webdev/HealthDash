import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import Home from './components/Home/Home.tsx';
import Staff from './components/Staff/Staff/Staff.tsx';
import InDevelopment from './components/InDevelopment.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {index: true, element: <Home />},
      {path: 'staff', element: <Staff />},
      {path: '*', element: <InDevelopment />},
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
