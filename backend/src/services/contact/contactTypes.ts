/**
 * @interface ContactEntity
 * @description Represents a contact submission in the system
 *
 * @property {string} id - Unique contact identifier
 * @property {string} protocolo - Contact protocol number
 * @property {string} nomeCompleto - Full name of the person
 * @property {string} email - Email address
 * @property {string} telefone - Phone number
 * @property {string} preferenciaContato - Preferred contact method
 * @property {string} melhorHorario - Best time to contact
 * @property {string} idVeiculo - Vehicle identifier
 * @property {string} modeloVeiculo - Vehicle model information
 * @property {string} assunto - Subject of inquiry
 * @property {string} mensagem - Detailed message
 * @property {boolean} financiamento - Interest in financing
 * @property {boolean} receberNovidades - Newsletter subscription
 * @property {string} status - Contact status
 * @property {Date} dataEnvio - Submission date and time
 * @property {string} ipUsuario - User IP address
 */
export interface ContactEntity {
  id: string;
  protocolo: string;
  nomeCompleto: string;
  email: string;
  telefone: string;
  preferenciaContato: string;
  melhorHorario: string;
  idVeiculo: string;
  modeloVeiculo: string;
  assunto: string;
  mensagem: string;
  financiamento: boolean;
  receberNovidades: boolean;
  status: ContactStatus;
  dataEnvio: Date;
  ipUsuario: string;
}

/**
 * @interface ContactCreateRequest
 * @description Request parameters for creating a new contact
 *
 * @property {string} nomeCompleto - Full name
 * @property {string} email - Email address
 * @property {string} telefone - Phone number
 * @property {string} preferenciaContato - Contact preference
 * @property {string} melhorHorario - Best time to contact
 * @property {string} idVeiculo - Vehicle identifier
 * @property {string} modeloVeiculo - Vehicle model
 * @property {string} assunto - Subject
 * @property {string} mensagem - Message
 * @property {boolean} financiamento - Financing interest
 * @property {boolean} receberNovidades - Newsletter subscription
 */
export interface ContactCreateRequest {
  nomeCompleto: string;
  email: string;
  telefone: string;
  preferenciaContato: string;
  melhorHorario: string;
  idVeiculo: string;
  modeloVeiculo: string;
  assunto: string;
  mensagem: string;
  financiamento: boolean;
  receberNovidades: boolean;
}

/**
 * @interface ContactCreateResponse
 * @description Response structure for contact creation
 *
 * @property {string} id - Contact identifier
 * @property {string} protocolo - Protocol number
 */
export interface ContactCreateResponse {
  id: string;
  protocolo: string;
}

/**
 * @enum ContactStatus
 * @description Valid contact status values
 */
export enum ContactStatus {
  Novo = 'Novo',
  EmAtendimento = 'Em atendimento',
  Concluido = 'Concluído',
  Cancelado = 'Cancelado',
}

/**
 * @enum ContactPreference
 * @description Valid contact preference values
 */
export enum ContactPreference {
  Telefone = 'Telefone',
  Email = 'E-mail',
  WhatsApp = 'WhatsApp',
}

/**
 * @enum ContactSubject
 * @description Valid contact subject values
 */
export enum ContactSubject {
  InformacoesGerais = 'Informações gerais',
  AgendamentoTestDrive = 'Agendamento de test drive',
  NegociacaoPreco = 'Negociação de preço',
  Financiamento = 'Financiamento',
  Outro = 'Outro',
}

/**
 * @enum BestTime
 * @description Valid best time to contact values
 */
export enum BestTime {
  Manha = 'Manhã',
  Tarde = 'Tarde',
  Noite = 'Noite',
  QualquerHorario = 'Qualquer horário',
}
