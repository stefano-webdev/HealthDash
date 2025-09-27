import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import Home from './components/Home/Home.tsx';
import Staff from './components/Staff/Staff/Staff.tsx';
import Patients from './components/Patients/Patients/Patients.tsx';
import Finance from './components/Finance/Finance/Finance.tsx';
import Report from './components/Report/Report/Report.tsx';
import Settings from './components/Settings/Settings/Settings.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {index: true, element: <Home />},
      {path: 'staff', element: <Staff />},
      {path: 'patients', element: <Patients />},
      {path: 'finance', element: <Finance />},
      {path: 'report', element: <Report />},
      {path: 'settings', element: <Settings />}
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
