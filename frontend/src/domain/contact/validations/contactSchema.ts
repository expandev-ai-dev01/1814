import { z } from 'zod';

export const contactSchema = z.object({
  nomeCompleto: z
    .string('Nome completo é obrigatório')
    .min(3, 'O nome deve conter pelo menos 3 caracteres')
    .max(100, 'O nome deve conter no máximo 100 caracteres')
    .refine(
      (val) => val.trim().split(/\s+/).length >= 2,
      'Por favor, informe seu nome completo (nome e sobrenome)'
    ),
  email: z
    .string('E-mail é obrigatório')
    .email('Por favor, informe um endereço de e-mail válido no formato usuario@dominio.com')
    .max(100, 'O e-mail deve conter no máximo 100 caracteres')
    .refine(
      (val) => val.includes('.') && val.split('@')[1]?.includes('.'),
      'O e-mail deve conter um domínio válido com pelo menos um ponto'
    ),
  telefone: z
    .string('Telefone é obrigatório')
    .min(10, 'O telefone deve conter pelo menos 10 dígitos incluindo DDD')
    .regex(
      /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/,
      'Por favor, informe um número de telefone válido com DDD'
    ),
  preferenciaContato: z.enum(
    ['Telefone', 'E-mail', 'WhatsApp'],
    'Por favor, selecione sua preferência de contato'
  ),
  melhorHorario: z
    .enum(['Manhã', 'Tarde', 'Noite', 'Qualquer horário'])
    .optional()
    .default('Qualquer horário'),
  idVeiculo: z.string('ID do veículo é obrigatório').min(1, 'ID do veículo não pode estar vazio'),
  modeloVeiculo: z
    .string('Modelo do veículo é obrigatório')
    .min(1, 'Modelo do veículo não pode estar vazio'),
  assunto: z.enum(
    [
      'Informações gerais',
      'Agendamento de test drive',
      'Negociação de preço',
      'Financiamento',
      'Outro',
    ],
    'Por favor, selecione o assunto da sua consulta'
  ),
  mensagem: z
    .string('Mensagem é obrigatória')
    .min(10, 'Por favor, forneça mais detalhes em sua mensagem (mínimo 10 caracteres)')
    .max(1000, 'Sua mensagem excedeu o limite de 1000 caracteres'),
  financiamento: z.boolean().optional().default(false),
  termosPrivacidade: z
    .boolean()
    .refine(
      (val) => val === true,
      'É necessário concordar com os termos de privacidade para prosseguir'
    ),
  receberNovidades: z.boolean().optional().default(false),
});
