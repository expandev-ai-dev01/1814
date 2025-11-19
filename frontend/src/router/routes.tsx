import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from '@/core/components/error-boundary';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import { MainLayout } from '@/layouts/MainLayout';

const VehicleListPage = lazy(() =>
  import('@/pages/VehicleList').then((module) => ({ default: module.VehicleListPage }))
);
const VehicleDetailPage = lazy(() =>
  import('@/pages/VehicleDetail').then((module) => ({ default: module.VehicleDetailPage }))
);
const NotFoundPage = lazy(() =>
  import('@/pages/NotFound').then((module) => ({ default: module.NotFoundPage }))
);

const routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <MainLayout />
      </ErrorBoundary>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense
            fallback={
              <div className="flex h-96 items-center justify-center">
                <LoadingSpinner />
              </div>
            }
          >
            <VehicleListPage />
          </Suspense>
        ),
      },
      {
        path: 'vehicle/:id',
        element: (
          <Suspense
            fallback={
              <div className="flex h-96 items-center justify-center">
                <LoadingSpinner />
              </div>
            }
          >
            <VehicleDetailPage />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense
            fallback={
              <div className="flex h-96 items-center justify-center">
                <LoadingSpinner />
              </div>
            }
          >
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export { routes };
