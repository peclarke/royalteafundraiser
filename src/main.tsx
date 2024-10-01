import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './visualiser/App';
import Admin from './admin/Admin';
import './index.css'

const router = createBrowserRouter([
  {
    errorElement: <App />,
    children: [
      {
        path: "",
        element: <App />
      },
      {
        path: "admin",
        element: <Admin />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
