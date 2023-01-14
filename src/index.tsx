import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { HelmetProvider } from 'react-helmet-async';
import { CookiesProvider } from 'react-cookie';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import './service/config';

import App from './App';
import './style/globals.css';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <RecoilRoot>
          <BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
            <App />
          </BrowserRouter>
        </RecoilRoot>
      </HelmetProvider>
    </QueryClientProvider>
  </StrictMode>,
);
