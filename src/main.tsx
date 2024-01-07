import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider  } from '@emotion/react';

import './reset.css';
import './App.css'


import App from './App.tsx'

import {theme} from "./theme";



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
)
