import { cn } from '@/core/lib/utils';
import type { Vehicle } from '../../types/vehicle';

interface VehicleCardProps {
  vehicle: Vehicle;
  onClick?: () => void;
}

export const VehicleCard = ({ vehicle, onClick }: VehicleCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const formatKm = (km?: number) => {
    if (!km) return null;
    return new Intl.NumberFormat('pt-BR').format(km) + ' km';
  };

  return (
    <article
      onClick={onClick}
      className={cn(
        'group relative flex cursor-pointer flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition-all duration-200',
        'hover:shadow-lg hover:scale-[1.02]'
      )}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <img
          src={vehicle.imagemPrincipal}
          alt={`${vehicle.marca} ${vehicle.modelo}`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {vehicle.marca} {vehicle.modelo}
          </h3>
          <p className="text-sm text-muted-foreground">Ano: {vehicle.ano}</p>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold text-primary-600">{formatPrice(vehicle.preco)}</span>
        </div>
        {(vehicle.quilometragem || vehicle.cambio) && (
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            {vehicle.quilometragem && <span>{formatKm(vehicle.quilometragem)}</span>}
            {vehicle.cambio && <span>• {vehicle.cambio}</span>}
          </div>
        )}
      </div>
    </article>
  );
};
