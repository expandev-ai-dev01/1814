import { useQuery } from '@tanstack/react-query';
import { vehicleService } from '../../services/vehicleService';

export const useFilterOptions = () => {
  return useQuery({
    queryKey: ['filter-options'],
    queryFn: () => vehicleService.getFilterOptions(),
    staleTime: 1000 * 60 * 10,
  });
};
