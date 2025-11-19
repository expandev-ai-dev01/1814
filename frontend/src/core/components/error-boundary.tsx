import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { Button } from './button';

export const ErrorBoundary = () => {
  const error = useRouteError();

  let errorMessage: string;
  let errorStatus: number | undefined;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText || error.data?.message || 'Erro desconhecido';
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else {
    errorMessage = 'Erro desconhecido';
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="space-y-2">
          {errorStatus && <h1 className="text-6xl font-bold text-primary">{errorStatus}</h1>}
          <h2 className="text-2xl font-semibold text-foreground">Algo deu errado</h2>
          <p className="text-muted-foreground">{errorMessage}</p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button onClick={() => (window.location.href = '/')} variant="default">
            Voltar para Home
          </Button>
          <Button onClick={() => window.location.reload()} variant="outline">
            Recarregar Página
          </Button>
        </div>
      </div>
    </div>
  );
};
