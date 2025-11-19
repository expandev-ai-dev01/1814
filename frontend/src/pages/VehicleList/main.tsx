import { useState, useEffect } from 'react';
import { useVehicleList } from '@/domain/vehicle/hooks/useVehicleList';
import { VehicleCard } from '@/domain/vehicle/components/VehicleCard';
import { VehicleFilters } from '@/domain/vehicle/components/VehicleFilters';
import { VehicleSort } from '@/domain/vehicle/components/VehicleSort';
import { Pagination } from '@/core/components/pagination';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import { useNavigation } from '@/core/hooks/useNavigation';
import type { VehicleListParams } from '@/domain/vehicle/types/vehicle';

export const VehicleListPage = () => {
  const { navigate } = useNavigation();
  const [filters, setFilters] = useState<VehicleListParams>({
    pagina: 1,
    itensPorPagina: 12,
  });

  const { data, isLoading, isError, error } = useVehicleList(filters);

  useEffect(() => {
    if (data && filters.pagina && filters.pagina > data.totalPaginas) {
      setFilters((prev) => ({ ...prev, pagina: data.totalPaginas }));
    }
  }, [data, filters.pagina]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [filters.pagina]);

  const handleFilterChange = (newFilters: VehicleListParams) => {
    setFilters((prev) => ({ ...prev, ...newFilters, pagina: 1 }));
  };

  const handleSortChange = (ordenacao: string) => {
    setFilters((prev) => ({ ...prev, ordenacao, pagina: 1 }));
  };

  const handlePageChange = (pagina: number) => {
    setFilters((prev) => ({ ...prev, pagina }));
  };

  const handleItemsPerPageChange = (itensPorPagina: number) => {
    setFilters((prev) => ({ ...prev, itensPorPagina, pagina: 1 }));
  };

  const handleVehicleClick = (id: string) => {
    navigate(`/vehicle/${id}`);
  };

  if (isError) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-lg border bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-destructive">Erro ao carregar veículos</h2>
        <p className="text-sm text-muted-foreground">
          {error instanceof Error ? error.message : 'Ocorreu um erro inesperado'}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600/90"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Catálogo de Veículos</h1>
        <p className="mt-2 text-muted-foreground">
          Encontre o veículo ideal para você com nossos filtros avançados
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <VehicleFilters onFilterChange={handleFilterChange} />

        <div className="space-y-6">
          <div className="flex items-center justify-between rounded-lg border bg-white p-4 shadow-sm">
            <div className="text-sm text-muted-foreground">
              {data ? (
                <span>
                  Exibindo {(data.pagina - 1) * data.itensPorPagina + 1}-
                  {Math.min(data.pagina * data.itensPorPagina, data.total)} de {data.total} veículos
                </span>
              ) : (
                <span>Carregando...</span>
              )}
            </div>
            <VehicleSort value={filters.ordenacao} onChange={handleSortChange} />
          </div>

          {isLoading ? (
            <div className="flex min-h-[400px] items-center justify-center rounded-lg border bg-white shadow-sm">
              <LoadingSpinner className="h-8 w-8" />
            </div>
          ) : data?.veiculos && data.veiculos.length > 0 ? (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {data.veiculos.map((vehicle) => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    onClick={() => handleVehicleClick(vehicle.id)}
                  />
                ))}
              </div>

              <div className="rounded-lg border bg-white p-4 shadow-sm">
                <Pagination
                  currentPage={data.pagina}
                  totalPages={data.totalPaginas}
                  onPageChange={handlePageChange}
                  itemsPerPage={data.itensPorPagina}
                  onItemsPerPageChange={handleItemsPerPageChange}
                />
              </div>
            </>
          ) : data?.total === 0 ? (
            <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-lg border bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold">Nenhum veículo encontrado</h2>
              <p className="text-center text-sm text-muted-foreground">
                Não encontramos veículos com os filtros selecionados. Tente remover alguns filtros
                ou alterar os critérios de busca para ampliar os resultados.
              </p>
            </div>
          ) : (
            <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-lg border bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold">Catálogo vazio</h2>
              <p className="text-center text-sm text-muted-foreground">
                Não há veículos disponíveis no catálogo no momento. Por favor, volte mais tarde ou
                entre em contato conosco para mais informações.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
