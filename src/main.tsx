import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { BrowserRouter } from 'react-router-dom'
import Router from './router/index.tsx'
import { ToastProvider } from "./context/ToastProvider.tsx";
import {ErrorBoundary} from "./components/ui/errorBoundary/index.tsx";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
    <ToastProvider>
    <BrowserRouter>
      <Provider store={store}>
        <Router />
      </Provider>
    </BrowserRouter>
    </ToastProvider>
    </ErrorBoundary>
  </StrictMode>,
)
