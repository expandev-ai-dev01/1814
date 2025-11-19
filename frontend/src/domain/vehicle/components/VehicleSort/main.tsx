import { Select } from '@/core/components/select';

interface VehicleSortProps {
  value?: string;
  onChange: (value: string) => void;
}

export const VehicleSort = ({ value, onChange }: VehicleSortProps) => {
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium">Ordenar por:</label>
      <Select value={value || ''} onChange={(e) => onChange(e.target.value)} className="w-64">
        <option value="">Relevância</option>
        <option value="preco_asc">Preço (menor para maior)</option>
        <option value="preco_desc">Preço (maior para menor)</option>
        <option value="ano_desc">Ano (mais recente)</option>
        <option value="ano_asc">Ano (mais antigo)</option>
        <option value="modelo_asc">Modelo (A-Z)</option>
        <option value="modelo_desc">Modelo (Z-A)</option>
      </Select>
    </div>
  );
};
