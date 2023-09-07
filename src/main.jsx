import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import router from './routers/Routers';
import AuthProvide from './providers/AuthProvide';

ReactDOM.createRoot(document.getElementById('root')).render(
  <div className='max-w-7xl mx-auto'>
    <React.StrictMode>
      <AuthProvide>
        <RouterProvider router={router} />
      </AuthProvide>
    </React.StrictMode>,
  </div>
)
