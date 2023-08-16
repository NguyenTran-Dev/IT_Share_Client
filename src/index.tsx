import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import './styles/_styles.scss';
import reportWebVitals from './reportWebVitals';
import Routers from './routes/Routers';
import { BrowserRouter } from 'react-router-dom';
import { store } from './stores/store';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { LoadingProvider } from './providers/LoadingProvider';
import { AlertProvider } from './providers/AlertProvider';
import { AlertCommon, Loading } from './components';
import LoginModal from './components/LoginModal';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ChakraProvider>
        <AlertProvider>
          <LoadingProvider>
            <Loading />
            <AlertCommon />
            <LoginModal />
            <Routers />
          </LoadingProvider>
        </AlertProvider>
      </ChakraProvider>
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
