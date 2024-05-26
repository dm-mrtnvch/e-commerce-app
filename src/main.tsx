import { CssBaseline } from '@mui/material';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { setupStore } from './redux/store.ts';
import { createTheme } from './theme/create-theme.ts';

const theme = createTheme();
const store = setupStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <BrowserRouter>
          <CssVarsProvider theme={theme}>
            <CssBaseline />
            <App />
          </CssVarsProvider>
        </BrowserRouter>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>,
);
