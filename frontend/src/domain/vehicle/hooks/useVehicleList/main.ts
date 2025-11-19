import { useQuery } from '@tanstack/react-query';
import { vehicleService } from '../../services/vehicleService';
import type { VehicleListParams } from '../../types/vehicle';

export const useVehicleList = (params?: VehicleListParams) => {
  return useQuery({
    queryKey: ['vehicles', params],
    queryFn: () => vehicleService.list(params),
    retry: 3,
  });
};
