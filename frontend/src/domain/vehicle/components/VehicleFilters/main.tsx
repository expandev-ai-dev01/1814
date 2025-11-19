import { useState, useEffect } from 'react';
import { Button } from '@/core/components/button';
import { Select } from '@/core/components/select';
import { Input } from '@/core/components/input';
import { useFilterOptions } from '../../hooks/useFilterOptions';
import { useModelosByMarcas } from '../../hooks/useModelosByMarcas';
import type { VehicleListParams } from '../../types/vehicle';

interface VehicleFiltersProps {
  onFilterChange: (filters: VehicleListParams) => void;
}

export const VehicleFilters = ({ onFilterChange }: VehicleFiltersProps) => {
  const { data: filterOptions } = useFilterOptions();
  const [selectedMarcas, setSelectedMarcas] = useState<string[]>([]);
  const { data: availableModelos } = useModelosByMarcas(selectedMarcas);

  const [filters, setFilters] = useState<VehicleListParams>({
    marcas: [],
    modelos: [],
    anoMin: undefined,
    anoMax: undefined,
    precoMin: undefined,
    precoMax: undefined,
    cambios: [],
  });

  useEffect(() => {
    if (selectedMarcas.length === 0) {
      setFilters((prev) => ({ ...prev, modelos: [] }));
    } else {
      const validModelos = filters.modelos?.filter((modelo) => availableModelos?.includes(modelo));
      if (validModelos?.length !== filters.modelos?.length) {
        setFilters((prev) => ({ ...prev, modelos: validModelos }));
      }
    }
  }, [selectedMarcas, availableModelos]);

  const handleMarcaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedMarcas(options);
    setFilters((prev) => ({ ...prev, marcas: options }));
  };

  const handleModeloChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(e.target.selectedOptions, (option) => option.value);
    setFilters((prev) => ({ ...prev, modelos: options }));
  };

  const handleCambioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(e.target.selectedOptions, (option) => option.value);
    setFilters((prev) => ({ ...prev, cambios: options }));
  };

  const handleApplyFilters = () => {
    onFilterChange(filters);
  };

  const handleClearFilters = () => {
    setFilters({
      marcas: [],
      modelos: [],
      anoMin: undefined,
      anoMax: undefined,
      precoMin: undefined,
      precoMax: undefined,
      cambios: [],
    });
    setSelectedMarcas([]);
    onFilterChange({});
  };

  return (
    <aside className="rounded-lg border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">Filtros</h2>
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium">Marca</label>
          <Select multiple value={selectedMarcas} onChange={handleMarcaChange} size={5}>
            {filterOptions?.marcas?.map((marca) => (
              <option key={marca} value={marca}>
                {marca}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Modelo</label>
          <Select
            multiple
            value={filters.modelos}
            onChange={handleModeloChange}
            size={5}
            disabled={selectedMarcas.length === 0}
          >
            {(selectedMarcas.length === 0 ? filterOptions?.modelos : availableModelos)?.map(
              (modelo) => (
                <option key={modelo} value={modelo}>
                  {modelo}
                </option>
              )
            )}
          </Select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Ano</label>
          <div className="flex gap-2">
            <Select
              value={filters.anoMin || ''}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  anoMin: e.target.value ? Number(e.target.value) : undefined,
                }))
              }
            >
              <option value="">Mínimo</option>
              {filterOptions?.anos?.map((ano) => (
                <option key={ano} value={ano}>
                  {ano}
                </option>
              ))}
            </Select>
            <Select
              value={filters.anoMax || ''}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  anoMax: e.target.value ? Number(e.target.value) : undefined,
                }))
              }
            >
              <option value="">Máximo</option>
              {filterOptions?.anos?.map((ano) => (
                <option key={ano} value={ano}>
                  {ano}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Preço</label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Mínimo"
              value={filters.precoMin || ''}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  precoMin: e.target.value ? Number(e.target.value) : undefined,
                }))
              }
            />
            <Input
              type="number"
              placeholder="Máximo"
              value={filters.precoMax || ''}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  precoMax: e.target.value ? Number(e.target.value) : undefined,
                }))
              }
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Câmbio</label>
          <Select multiple value={filters.cambios} onChange={handleCambioChange} size={4}>
            {filterOptions?.cambios?.map((cambio) => (
              <option key={cambio} value={cambio}>
                {cambio}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex gap-2 pt-4">
          <Button onClick={handleApplyFilters} className="flex-1">
            Aplicar Filtros
          </Button>
          <Button onClick={handleClearFilters} variant="outline" className="flex-1">
            Limpar
          </Button>
        </div>
      </div>
    </aside>
  );
};
