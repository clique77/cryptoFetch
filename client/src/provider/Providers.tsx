'use client';

import { Provider } from 'react-redux';
import { store } from '@/store/configureStore';
import { ThemeContextProvider } from './ThemeContext';
import { ThemeProvider } from './ThemeProvider';
import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <ThemeContextProvider>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </ThemeContextProvider>
    </Provider>
  );
}

