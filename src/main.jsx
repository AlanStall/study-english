import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, HashRouter } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Routes from './Routes';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes />
      <Outlet/>
    </HashRouter>
  </React.StrictMode>
);
