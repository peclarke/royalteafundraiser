import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './visualiser/App';
import Admin from './admin/Admin';
import './index.css'
import Auth from './Auth';
import Countdown from './Countdown';

const router = createBrowserRouter([
  {
    errorElement: <App />,
    children: [
      {
        path: "",
        element: <Countdown />
      },
      {
        path: "admin",
        element: <Auth><Admin /></Auth>,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
