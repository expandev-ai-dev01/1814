import { authenticatedClient } from '@/core/lib/api';
import type {
  VehicleListParams,
  VehicleListResponse,
  FilterOptions,
  VehicleDetail,
} from '../types/vehicle';

export const vehicleService = {
  async list(params?: VehicleListParams): Promise<VehicleListResponse> {
    const { data } = await authenticatedClient.get('/vehicle', { params });
    return data.data;
  },

  async getFilterOptions(): Promise<FilterOptions> {
    const { data } = await authenticatedClient.get('/vehicle/filter-options');
    return data.data;
  },

  async getModelosByMarcas(marcas: string[]): Promise<string[]> {
    const { data } = await authenticatedClient.get('/vehicle/modelos-by-marcas', {
      params: { marcas: marcas.join(',') },
    });
    return data.data;
  },

  async getDetail(id: string): Promise<VehicleDetail> {
    const { data } = await authenticatedClient.get(`/vehicle/${id}`);
    return data.data;
  },
};
