import { Outlet } from 'react-router-dom';
import type { MainLayoutProps } from './types';

export const MainLayout = (props: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center px-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-primary">Catálogo de Carros</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="mt-auto border-t bg-muted/50">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Catálogo de Carros. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};
