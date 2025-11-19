import {
  ContactEntity,
  ContactCreateRequest,
  ContactCreateResponse,
  ContactStatus,
} from './contactTypes';

/**
 * @summary
 * In-memory storage for contact submissions
 */
const contacts: ContactEntity[] = [];

/**
 * @summary
 * Counter for generating sequential protocol numbers
 */
let protocolCounter = 1;

/**
 * @summary
 * Generates a unique protocol number in format YYYYMMDDNNNNN
 *
 * @function generateProtocol
 * @module contact
 *
 * @returns {string} Protocol number
 *
 * @example
 * const protocol = generateProtocol(); // Returns '2024011200001'
 */
function generateProtocol(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const sequence = String(protocolCounter).padStart(5, '0');

  protocolCounter++;

  return `${year}${month}${day}${sequence}`;
}

/**
 * @summary
 * Generates a unique contact identifier
 *
 * @function generateContactId
 * @module contact
 *
 * @returns {string} Contact identifier
 *
 * @example
 * const id = generateContactId(); // Returns 'contact_1'
 */
function generateContactId(): string {
  return `contact_${contacts.length + 1}`;
}

/**
 * @summary
 * Simulates getting user IP address (in real implementation, extract from request)
 *
 * @function getUserIp
 * @module contact
 *
 * @returns {string} User IP address
 *
 * @example
 * const ip = getUserIp(); // Returns '192.168.1.1'
 */
function getUserIp(): string {
  return '192.168.1.1';
}

/**
 * @summary
 * Creates a new contact submission and generates protocol number
 *
 * @function contactCreate
 * @module contact
 *
 * @param {ContactCreateRequest} params - Contact submission parameters
 *
 * @returns {Promise<ContactCreateResponse>} Created contact with protocol number
 *
 * @example
 * const result = await contactCreate({
 *   nomeCompleto: 'João Silva',
 *   email: 'joao@example.com',
 *   telefone: '(11) 98765-4321',
 *   preferenciaContato: 'WhatsApp',
 *   melhorHorario: 'Tarde',
 *   idVeiculo: '1',
 *   modeloVeiculo: 'Honda Civic 2023',
 *   assunto: 'Informações gerais',
 *   mensagem: 'Gostaria de mais informações sobre este veículo',
 *   financiamento: false,
 *   receberNovidades: true
 * });
 */
export async function contactCreate(params: ContactCreateRequest): Promise<ContactCreateResponse> {
  /**
   * @rule {be-protocol-generation} Generate unique protocol number
   */
  const protocolo = generateProtocol();
  const id = generateContactId();
  const dataEnvio = new Date();
  const ipUsuario = getUserIp();

  /**
   * @rule {be-contact-storage} Store contact submission in memory
   */
  const newContact: ContactEntity = {
    id,
    protocolo,
    nomeCompleto: params.nomeCompleto,
    email: params.email,
    telefone: params.telefone,
    preferenciaContato: params.preferenciaContato,
    melhorHorario: params.melhorHorario,
    idVeiculo: params.idVeiculo,
    modeloVeiculo: params.modeloVeiculo,
    assunto: params.assunto,
    mensagem: params.mensagem,
    financiamento: params.financiamento,
    receberNovidades: params.receberNovidades,
    status: ContactStatus.Novo,
    dataEnvio,
    ipUsuario,
  };

  contacts.push(newContact);

  /**
   * @remarks Simulate email sending (in real implementation, integrate with email service)
   * Email confirmation to user and notification to sales team would be sent here
   */
  console.log('Email de confirmação enviado para:', params.email);
  console.log('Email de notificação enviado para equipe de vendas');
  console.log('Protocolo:', protocolo);

  return {
    id,
    protocolo,
  };
}

/**
 * @summary
 * Retrieves all contact submissions (for administrative purposes)
 *
 * @function contactList
 * @module contact
 *
 * @returns {Promise<ContactEntity[]>} Array of all contacts
 *
 * @example
 * const allContacts = await contactList();
 */
export async function contactList(): Promise<ContactEntity[]> {
  return [...contacts];
}

/**
 * @summary
 * Retrieves a specific contact by ID
 *
 * @function contactGet
 * @module contact
 *
 * @param {string} id - Contact identifier
 *
 * @returns {Promise<ContactEntity | null>} Contact entity or null if not found
 *
 * @example
 * const contact = await contactGet('contact_1');
 */
export async function contactGet(id: string): Promise<ContactEntity | null> {
  const contact = contacts.find((c) => c.id === id);
  return contact || null;
}
