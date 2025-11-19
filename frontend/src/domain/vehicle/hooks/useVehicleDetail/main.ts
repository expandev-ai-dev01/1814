import { useQuery } from '@tanstack/react-query';
import { vehicleService } from '../../services/vehicleService';

export const useVehicleDetail = (id: string) => {
  return useQuery({
    queryKey: ['vehicle-detail', id],
    queryFn: () => vehicleService.getDetail(id),
    enabled: !!id,
    retry: 3,
  });
};
