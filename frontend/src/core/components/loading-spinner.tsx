import { cn } from '@/core/lib/utils';

export interface LoadingSpinnerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingSpinner = ({ className, size = 'md' }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4',
  };

  return (
    <div className="flex items-center justify-center p-8">
      <div
        className={cn(
          'animate-spin rounded-full border-primary border-t-transparent',
          sizeClasses[size],
          className
        )}
        role="status"
        aria-label="Carregando"
      >
        <span className="sr-only">Carregando...</span>
      </div>
    </div>
  );
};
