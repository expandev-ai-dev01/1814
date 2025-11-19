import { useQuery } from '@tanstack/react-query';
import { vehicleService } from '../../services/vehicleService';

export const useModelosByMarcas = (marcas: string[]) => {
  return useQuery({
    queryKey: ['modelos-by-marcas', marcas],
    queryFn: () => vehicleService.getModelosByMarcas(marcas),
    enabled: marcas.length > 0,
  });
};
