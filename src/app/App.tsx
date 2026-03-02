import { RouterProvider } from 'react-router';
import { router } from './routes';
import { useEffect } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Toaster } from 'sonner';

export default function App() {
  useEffect(() => {
    // Suppress non-critical console errors
    const originalError = console.error;
    console.error = (...args) => {
      if (args[0]?.includes?.('IframeMessageAbortError')) {
        return;
      }
      originalError(...args);
    };
    return () => {
      console.error = originalError;
    };
  }, []);

  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors />
    </ErrorBoundary>
  );
}