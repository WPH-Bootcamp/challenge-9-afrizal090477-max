import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './index.css';
import App from './App.tsx';

// TODO: Configure QueryClient with appropriate default options
// Reference: https://tanstack.com/query/latest/docs/framework/react/reference/QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // Data dianggap "fresh" selama 5 menit untuk menghemat kuota API
      gcTime: 10 * 60 * 1000,    // Cache disimpan di memori selama 10 menit (sebelum v5 bernama cacheTime)
      refetchOnWindowFocus: false, // Mencegah fetch ulang otomatis saat user berpindah tab browser
      retry: 1, // Jika koneksi internet bermasalah, coba ulangi request cukup 1 kali saja
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      {/* React Query Devtools - useful for debugging */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
