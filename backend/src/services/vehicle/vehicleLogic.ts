import {
  VehicleEntity,
  VehicleListRequest,
  VehicleListResponse,
  FilterOptionsResponse,
  VehicleDetailResponse,
  VehiclePhoto,
  VehicleSpecifications,
  VehicleItem,
  VehicleHistory,
  VehicleSaleConditions,
  TransmissionType,
  SortCriteria,
  VehicleStatus,
  FuelType,
  BodyType,
  ItemCategory,
} from './vehicleTypes';

/**
 * @summary
 * In-memory storage for vehicle data
 */
const vehicles: VehicleEntity[] = [
  {
    id: '1',
    modelo: 'Civic',
    marca: 'Honda',
    ano: 2023,
    preco: 145000,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=Honda+Civic+2023',
    quilometragem: 5000,
    cambio: TransmissionType.Automatico,
  },
  {
    id: '2',
    modelo: 'Corolla',
    marca: 'Toyota',
    ano: 2022,
    preco: 135000,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=Toyota+Corolla+2022',
    quilometragem: 15000,
    cambio: TransmissionType.CVT,
  },
  {
    id: '3',
    modelo: 'Onix',
    marca: 'Chevrolet',
    ano: 2023,
    preco: 85000,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=Chevrolet+Onix+2023',
    quilometragem: 2000,
    cambio: TransmissionType.Manual,
  },
  {
    id: '4',
    modelo: 'HB20',
    marca: 'Hyundai',
    ano: 2021,
    preco: 72000,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=Hyundai+HB20+2021',
    quilometragem: 35000,
    cambio: TransmissionType.Manual,
  },
  {
    id: '5',
    modelo: 'Compass',
    marca: 'Jeep',
    ano: 2023,
    preco: 185000,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=Jeep+Compass+2023',
    quilometragem: 8000,
    cambio: TransmissionType.Automatico,
  },
  {
    id: '6',
    modelo: 'Gol',
    marca: 'Volkswagen',
    ano: 2020,
    preco: 58000,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=VW+Gol+2020',
    quilometragem: 45000,
    cambio: TransmissionType.Manual,
  },
  {
    id: '7',
    modelo: 'Kicks',
    marca: 'Nissan',
    ano: 2022,
    preco: 115000,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=Nissan+Kicks+2022',
    quilometragem: 18000,
    cambio: TransmissionType.CVT,
  },
  {
    id: '8',
    modelo: 'Argo',
    marca: 'Fiat',
    ano: 2023,
    preco: 78000,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=Fiat+Argo+2023',
    quilometragem: 3000,
    cambio: TransmissionType.Manual,
  },
  {
    id: '9',
    modelo: 'Creta',
    marca: 'Hyundai',
    ano: 2023,
    preco: 125000,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=Hyundai+Creta+2023',
    quilometragem: 6000,
    cambio: TransmissionType.Automatico,
  },
  {
    id: '10',
    modelo: 'T-Cross',
    marca: 'Volkswagen',
    ano: 2022,
    preco: 135000,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=VW+T-Cross+2022',
    quilometragem: 12000,
    cambio: TransmissionType.Automatico,
  },
  {
    id: '11',
    modelo: 'Renegade',
    marca: 'Jeep',
    ano: 2021,
    preco: 105000,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=Jeep+Renegade+2021',
    quilometragem: 28000,
    cambio: TransmissionType.Automatico,
  },
  {
    id: '12',
    modelo: 'Fit',
    marca: 'Honda',
    ano: 2020,
    preco: 68000,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=Honda+Fit+2020',
    quilometragem: 42000,
    cambio: TransmissionType.CVT,
  },
  {
    id: '13',
    modelo: 'Tracker',
    marca: 'Chevrolet',
    ano: 2023,
    preco: 145000,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=Chevrolet+Tracker+2023',
    quilometragem: 4000,
    cambio: TransmissionType.Automatico,
  },
  {
    id: '14',
    modelo: 'Pulse',
    marca: 'Fiat',
    ano: 2023,
    preco: 98000,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=Fiat+Pulse+2023',
    quilometragem: 7000,
    cambio: TransmissionType.CVT,
  },
  {
    id: '15',
    modelo: 'Yaris',
    marca: 'Toyota',
    ano: 2021,
    preco: 88000,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=Toyota+Yaris+2021',
    quilometragem: 32000,
    cambio: TransmissionType.CVT,
  },
];

/**
 * @summary
 * Retrieves a list of vehicles with filtering, sorting, and pagination
 *
 * @function vehicleList
 * @module vehicle
 *
 * @param {VehicleListRequest} params - Filtering, sorting, and pagination parameters
 *
 * @returns {Promise<VehicleListResponse>} Paginated list of vehicles with metadata
 *
 * @example
 * const result = await vehicleList({
 *   marcas: ['Honda', 'Toyota'],
 *   anoMin: 2020,
 *   ordenacao: 'Preço (menor para maior)',
 *   pagina: 1,
 *   itensPorPagina: 12
 * });
 */
export async function vehicleList(params: VehicleListRequest): Promise<VehicleListResponse> {
  const {
    marcas,
    modelos,
    anoMin,
    anoMax,
    precoMin,
    precoMax,
    cambios,
    ordenacao = SortCriteria.Relevancia,
    pagina = 1,
    itensPorPagina = 12,
  } = params;

  /**
   * @validation Apply filters to vehicle list
   */
  let filteredVehicles = [...vehicles];

  if (marcas && marcas.length > 0) {
    filteredVehicles = filteredVehicles.filter((v) => marcas.includes(v.marca));
  }

  if (modelos && modelos.length > 0) {
    filteredVehicles = filteredVehicles.filter((v) => modelos.includes(v.modelo));
  }

  if (anoMin !== undefined) {
    filteredVehicles = filteredVehicles.filter((v) => v.ano >= anoMin);
  }

  if (anoMax !== undefined) {
    filteredVehicles = filteredVehicles.filter((v) => v.ano <= anoMax);
  }

  if (precoMin !== undefined) {
    filteredVehicles = filteredVehicles.filter((v) => v.preco >= precoMin);
  }

  if (precoMax !== undefined) {
    filteredVehicles = filteredVehicles.filter((v) => v.preco <= precoMax);
  }

  if (cambios && cambios.length > 0) {
    filteredVehicles = filteredVehicles.filter((v) => v.cambio && cambios.includes(v.cambio));
  }

  /**
   * @rule {be-sorting-logic} Apply sorting based on selected criteria
   */
  switch (ordenacao) {
    case SortCriteria.PrecoMenor:
      filteredVehicles.sort((a, b) => a.preco - b.preco);
      break;
    case SortCriteria.PrecoMaior:
      filteredVehicles.sort((a, b) => b.preco - a.preco);
      break;
    case SortCriteria.AnoRecente:
      filteredVehicles.sort((a, b) => b.ano - a.ano);
      break;
    case SortCriteria.AnoAntigo:
      filteredVehicles.sort((a, b) => a.ano - b.ano);
      break;
    case SortCriteria.ModeloAZ:
      filteredVehicles.sort((a, b) => a.modelo.localeCompare(b.modelo));
      break;
    case SortCriteria.ModeloZA:
      filteredVehicles.sort((a, b) => b.modelo.localeCompare(a.modelo));
      break;
    case SortCriteria.Relevancia:
    default:
      break;
  }

  const total = filteredVehicles.length;
  const totalPaginas = Math.ceil(total / itensPorPagina);

  /**
   * @rule {be-pagination-adjustment} Adjust page number if it exceeds total pages
   */
  let adjustedPagina = pagina;
  if (adjustedPagina > totalPaginas && totalPaginas > 0) {
    adjustedPagina = totalPaginas;
  }
  if (adjustedPagina < 1) {
    adjustedPagina = 1;
  }

  /**
   * @rule {be-pagination-logic} Apply pagination to results
   */
  const startIndex = (adjustedPagina - 1) * itensPorPagina;
  const endIndex = startIndex + itensPorPagina;
  const paginatedVehicles = filteredVehicles.slice(startIndex, endIndex);

  return {
    veiculos: paginatedVehicles,
    total,
    pagina: adjustedPagina,
    itensPorPagina,
    totalPaginas,
  };
}

/**
 * @summary
 * Retrieves available filter options based on current vehicle catalog
 *
 * @function getFilterOptions
 * @module vehicle
 *
 * @returns {Promise<FilterOptionsResponse>} Available filter options
 *
 * @example
 * const options = await getFilterOptions();
 */
export async function getFilterOptions(): Promise<FilterOptionsResponse> {
  const marcas = Array.from(new Set(vehicles.map((v) => v.marca))).sort();
  const modelos = Array.from(new Set(vehicles.map((v) => v.modelo))).sort();
  const anos = Array.from(new Set(vehicles.map((v) => v.ano))).sort((a, b) => b - a);
  const cambios = Array.from(
    new Set(vehicles.map((v) => v.cambio).filter((c): c is string => c !== null))
  ).sort();

  return {
    marcas,
    modelos,
    anos,
    cambios,
  };
}

/**
 * @summary
 * Retrieves available models for selected brands
 *
 * @function getModelosByMarcas
 * @module vehicle
 *
 * @param {string[]} marcas - Selected brands
 *
 * @returns {Promise<string[]>} Available models for selected brands
 *
 * @example
 * const modelos = await getModelosByMarcas(['Honda', 'Toyota']);
 */
export async function getModelosByMarcas(marcas: string[]): Promise<string[]> {
  if (!marcas || marcas.length === 0) {
    return Array.from(new Set(vehicles.map((v) => v.modelo))).sort();
  }

  const filteredModelos = vehicles.filter((v) => marcas.includes(v.marca)).map((v) => v.modelo);

  return Array.from(new Set(filteredModelos)).sort();
}

/**
 * @summary
 * Retrieves complete details for a specific vehicle
 *
 * @function vehicleGetDetail
 * @module vehicle
 *
 * @param {string} id - Vehicle identifier
 *
 * @returns {Promise<VehicleDetailResponse | null>} Complete vehicle details or null if not found
 *
 * @example
 * const detail = await vehicleGetDetail('1');
 */
export async function vehicleGetDetail(id: string): Promise<VehicleDetailResponse | null> {
  /**
   * @validation Find vehicle by ID
   */
  const vehicle = vehicles.find((v) => v.id === id);

  if (!vehicle) {
    return null;
  }

  /**
   * @rule {be-vehicle-detail-construction} Build complete vehicle detail response
   */
  const fotos: VehiclePhoto[] = [
    {
      url: vehicle.imagemPrincipal,
      legenda: 'Vista frontal',
      principal: true,
    },
    {
      url: `https://via.placeholder.com/800x600?text=${vehicle.marca}+${vehicle.modelo}+Lateral`,
      legenda: 'Vista lateral',
      principal: false,
    },
    {
      url: `https://via.placeholder.com/800x600?text=${vehicle.marca}+${vehicle.modelo}+Traseira`,
      legenda: 'Vista traseira',
      principal: false,
    },
    {
      url: `https://via.placeholder.com/800x600?text=${vehicle.marca}+${vehicle.modelo}+Interior`,
      legenda: 'Interior',
      principal: false,
    },
  ];

  const especificacoes: VehicleSpecifications = {
    marca: vehicle.marca,
    modelo: vehicle.modelo,
    anoFabricacao: vehicle.ano,
    anoModelo: vehicle.ano,
    quilometragem: vehicle.quilometragem || 0,
    combustivel: FuelType.Flex,
    cambio: vehicle.cambio || TransmissionType.Manual,
    potencia: '120 cv',
    cor: 'Prata',
    portas: 4,
    carroceria: BodyType.Sedan,
    motor: '1.8',
    finalPlaca: parseInt(id) % 10,
  };

  const itensSerie: VehicleItem[] = [
    { nome: 'Ar condicionado', categoria: ItemCategory.Conforto },
    { nome: 'Direção elétrica', categoria: ItemCategory.Conforto },
    { nome: 'Vidros elétricos', categoria: ItemCategory.Conforto },
    { nome: 'Travas elétricas', categoria: ItemCategory.Conforto },
    { nome: 'Airbag duplo', categoria: ItemCategory.Seguranca },
    { nome: 'Freios ABS', categoria: ItemCategory.Seguranca },
    { nome: 'Controle de estabilidade', categoria: ItemCategory.Seguranca },
  ];

  const opcionais: VehicleItem[] = [
    { nome: 'Central multimídia', categoria: ItemCategory.Tecnologia },
    { nome: 'Câmera de ré', categoria: ItemCategory.Tecnologia },
    { nome: 'Sensor de estacionamento', categoria: ItemCategory.Tecnologia },
    { nome: 'Bancos de couro', categoria: ItemCategory.Conforto },
    { nome: 'Rodas de liga leve', categoria: ItemCategory.Estetica },
  ];

  const historico: VehicleHistory = {
    procedencia: 'Particular',
    proprietarios: 1,
    garantia: vehicle.ano >= 2022 ? 'Até 12/2025' : null,
    semSinistros: true,
    revisoesEmDia: true,
  };

  const condicoesVenda: VehicleSaleConditions = {
    formasPagamento: ['À vista', 'Financiamento', 'Consórcio'],
    aceitaTraca: true,
    observacoes: 'Aceita veículo como parte do pagamento',
    documentacaoRegular: true,
  };

  /**
   * @rule {be-similar-vehicles-logic} Find similar vehicles based on brand, price range, and year
   */
  const precoMin = vehicle.preco * 0.8;
  const precoMax = vehicle.preco * 1.2;
  const veiculosSimilares = vehicles
    .filter(
      (v) =>
        v.id !== id &&
        (v.marca === vehicle.marca || (v.preco >= precoMin && v.preco <= precoMax)) &&
        Math.abs(v.ano - vehicle.ano) <= 2
    )
    .slice(0, 6);

  return {
    id: vehicle.id,
    tituloAnuncio: `${vehicle.marca} ${vehicle.modelo} ${vehicle.ano}`,
    preco: vehicle.preco,
    statusVeiculo: VehicleStatus.Disponivel,
    fotos,
    especificacoes,
    itensSerie,
    opcionais,
    historico,
    condicoesVenda,
    veiculosSimilares,
  };
}
