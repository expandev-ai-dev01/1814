export interface Vehicle {
  id: string;
  modelo: string;
  marca: string;
  ano: number;
  preco: number;
  imagemPrincipal: string;
  quilometragem?: number;
  cambio?: string;
}

export interface VehicleListParams {
  marcas?: string[];
  modelos?: string[];
  anoMin?: number;
  anoMax?: number;
  precoMin?: number;
  precoMax?: number;
  cambios?: string[];
  ordenacao?: string;
  pagina?: number;
  itensPorPagina?: number;
}

export interface VehicleListResponse {
  veiculos: Vehicle[];
  total: number;
  pagina: number;
  itensPorPagina: number;
  totalPaginas: number;
}

export interface FilterOptions {
  marcas: string[];
  modelos: string[];
  anos: number[];
  cambios: string[];
}

export interface VehiclePhoto {
  url: string;
  legenda?: string;
}

export interface VehicleSpecifications {
  marca: string;
  modelo: string;
  anoFabricacao: number;
  anoModelo: number;
  quilometragem: number;
  combustivel: string;
  cambio: string;
  potencia: string;
  cor: string;
  portas: number;
  carroceria: string;
  motor: string;
  finalPlaca: number;
}

export interface VehicleItem {
  descricao: string;
  categoria: string;
}

export interface VehicleHistory {
  procedencia: string;
  proprietarios: number;
  garantia?: string;
  revisoes?: Array<{
    data: string;
    quilometragem: number;
    local: string;
  }>;
  sinistros?: Array<{
    data: string;
    tipo: string;
    descricao: string;
  }>;
  laudoTecnico?: {
    dataInspecao: string;
    resultadoGeral: string;
  };
}

export interface VehicleSaleConditions {
  formasPagamento: string[];
  condicoesFinanciamento?: {
    entradaMinima: number;
    taxaJuros: number;
    prazoMaximo: number;
  };
  aceitaTroca: boolean;
  observacoesVenda?: string;
  documentacaoNecessaria: Array<{
    nome: string;
    observacoes?: string;
  }>;
  situacaoDocumental: {
    status: string;
    pendencias?: string[];
    observacoes?: string;
  };
}

export interface SimilarVehicle {
  id: string;
  marca: string;
  modelo: string;
  ano: number;
  preco: number;
  imagemPrincipal: string;
  quilometragem?: number;
  cambio?: string;
}

export interface VehicleDetail {
  id: string;
  tituloAnuncio: string;
  preco: number;
  statusVeiculo: string;
  fotos: VehiclePhoto[];
  fotoPrincipal: string;
  especificacoes: VehicleSpecifications;
  itensSerie: VehicleItem[];
  opcionais?: VehicleItem[];
  historico: VehicleHistory;
  condicoesVenda: VehicleSaleConditions;
  veiculosSimilares?: SimilarVehicle[];
}
