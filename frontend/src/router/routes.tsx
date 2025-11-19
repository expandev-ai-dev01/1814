import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import { ErrorBoundary } from '@/core/components/error-boundary';

const HomePage = lazy(() =>
  import('@/pages/Home').then((module) => ({ default: module.HomePage }))
);

const routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <HomePage />
          </Suspense>
        ),
      },
    ],
  },
]);

export { routes };
