import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse, createError } from '@/middleware';
import { HTTP_STATUS } from '@/constants';
import { contactCreate, ContactCreateRequest } from '@/services/contact';

/**
 * @api {post} /api/v1/external/contact Submit Contact Form
 * @apiName SubmitContactForm
 * @apiGroup Contact
 * @apiVersion 1.0.0
 *
 * @apiDescription Submits a contact form for a specific vehicle
 *
 * @apiParam {String} nomeCompleto Full name (minimum 3 characters, must include first and last name)
 * @apiParam {String} email Valid email address
 * @apiParam {String} telefone Brazilian phone number with DDD
 * @apiParam {String} preferenciaContato Contact preference (Telefone, E-mail, WhatsApp)
 * @apiParam {String} [melhorHorario] Best time to contact (Manhã, Tarde, Noite, Qualquer horário)
 * @apiParam {String} idVeiculo Vehicle identifier
 * @apiParam {String} modeloVeiculo Vehicle model information
 * @apiParam {String} assunto Subject of inquiry
 * @apiParam {String} mensagem Detailed message (10-1000 characters)
 * @apiParam {Boolean} [financiamento=false] Interest in financing
 * @apiParam {Boolean} termosPrivacidade Privacy terms acceptance
 * @apiParam {Boolean} [receberNovidades=false] Newsletter subscription
 *
 * @apiSuccess {String} protocolo Contact protocol number
 * @apiSuccess {String} mensagem Confirmation message
 *
 * @apiError {String} ValidationError Invalid form data
 * @apiError {String} ServerError Internal server error
 */
export async function postHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    /**
     * @validation Parse and validate request body
     */
    const bodySchema = z.object({
      nomeCompleto: z
        .string()
        .min(3, 'nomeDeveTerPeloMenosTresCaracteres')
        .max(100, 'nomeDeveTerNoMaximoCemCaracteres')
        .refine((val) => val.trim().split(/\s+/).length >= 2, 'nomeDeveConterNomeESobrenome'),
      email: z
        .string()
        .email('emailInvalido')
        .max(100, 'emailDeveTerNoMaximoCemCaracteres')
        .refine(
          (val) => val.includes('.') && val.split('@')[1]?.includes('.'),
          'emailDeveConterDominioValido'
        ),
      telefone: z
        .string()
        .min(10, 'telefoneDeveConterPeloMenosDezDigitos')
        .regex(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, 'telefoneInvalido'),
      preferenciaContato: z.enum(['Telefone', 'E-mail', 'WhatsApp'], {
        errorMap: () => ({ message: 'preferenciaContatoInvalida' }),
      }),
      melhorHorario: z
        .enum(['Manhã', 'Tarde', 'Noite', 'Qualquer horário'])
        .optional()
        .default('Qualquer horário'),
      idVeiculo: z.string().min(1, 'idVeiculoObrigatorio'),
      modeloVeiculo: z.string().min(1, 'modeloVeiculoObrigatorio'),
      assunto: z.enum(
        [
          'Informações gerais',
          'Agendamento de test drive',
          'Negociação de preço',
          'Financiamento',
          'Outro',
        ],
        {
          errorMap: () => ({ message: 'assuntoInvalido' }),
        }
      ),
      mensagem: z
        .string()
        .min(10, 'mensagemDeveTerPeloMenosDezCaracteres')
        .max(1000, 'mensagemDeveTerNoMaximoMilCaracteres'),
      financiamento: z.boolean().optional().default(false),
      termosPrivacidade: z
        .boolean()
        .refine((val) => val === true, 'termosPrivacidadeDevemSerAceitos'),
      receberNovidades: z.boolean().optional().default(false),
    });

    const validatedData = bodySchema.parse(req.body);

    /**
     * @rule {be-financing-auto-flag} Auto-set financing flag if subject is Financiamento
     */
    if (validatedData.assunto === 'Financiamento') {
      validatedData.financiamento = true;
    }

    /**
     * @rule {be-contact-submission} Submit contact form and generate protocol
     */
    const contactData: ContactCreateRequest = {
      nomeCompleto: validatedData.nomeCompleto,
      email: validatedData.email,
      telefone: validatedData.telefone,
      preferenciaContato: validatedData.preferenciaContato,
      melhorHorario: validatedData.melhorHorario,
      idVeiculo: validatedData.idVeiculo,
      modeloVeiculo: validatedData.modeloVeiculo,
      assunto: validatedData.assunto,
      mensagem: validatedData.mensagem,
      financiamento: validatedData.financiamento,
      receberNovidades: validatedData.receberNovidades,
    };

    const result = await contactCreate(contactData);

    res.status(HTTP_STATUS.CREATED).json(
      successResponse({
        protocolo: result.protocolo,
        mensagem: 'Seu contato foi recebido com sucesso. Retornaremos em até 24 horas úteis.',
      })
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0];
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse(firstError.message, 'VALIDATION_ERROR', error.errors));
    } else if (error.statusCode) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code));
    } else {
      next(error);
    }
  }
}
