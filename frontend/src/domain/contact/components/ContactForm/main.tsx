import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from '../../validations/contactSchema';
import { useContactSubmit } from '../../hooks/useContactSubmit';
import type { ContactFormData } from '../../types/contact';
import { Button } from '@/core/components/button';
import { Input } from '@/core/components/input';
import { Select } from '@/core/components/select';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

interface ContactFormProps {
  vehicleId: string;
  vehicleModel: string;
}

export const ContactForm = ({ vehicleId, vehicleModel }: ContactFormProps) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [protocol, setProtocol] = useState<string>('');
  const { mutateAsync: submitContact, isPending } = useContactSubmit();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
    defaultValues: {
      idVeiculo: vehicleId,
      modeloVeiculo: vehicleModel,
      melhorHorario: 'Qualquer horário',
      financiamento: false,
      termosPrivacidade: false,
      receberNovidades: false,
    },
  });

  const assunto = watch('assunto');

  useEffect(() => {
    if (assunto === 'Financiamento') {
      setValue('financiamento', true);
    }
  }, [assunto, setValue]);

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await submitContact(data);
      setProtocol(response.protocolo);
      setShowSuccess(true);
      reset();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    }
  };

  if (showSuccess) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-8 shadow-sm">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-green-900">Mensagem enviada com sucesso!</h3>
            <p className="mt-2 text-sm text-green-800">
              Seu contato foi recebido. Retornaremos em até 24 horas úteis.
            </p>
          </div>
          <div className="rounded-md bg-white p-4">
            <p className="text-sm text-muted-foreground">Número de protocolo:</p>
            <p className="text-lg font-bold text-foreground">{protocol}</p>
          </div>
          <Button onClick={() => setShowSuccess(false)} variant="outline">
            Enviar nova mensagem
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-lg border bg-white p-6 shadow-sm"
    >
      <div>
        <h2 className="text-2xl font-semibold">Entre em Contato</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Preencha o formulário abaixo para manifestar seu interesse neste veículo
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Nome Completo <span className="text-red-500">*</span>
          </label>
          <Input {...register('nomeCompleto')} placeholder="Digite seu nome completo" />
          {errors.nomeCompleto && (
            <p className="mt-1 text-sm text-red-600">{errors.nomeCompleto.message}</p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              E-mail <span className="text-red-500">*</span>
            </label>
            <Input {...register('email')} type="email" placeholder="seu@email.com" />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Telefone <span className="text-red-500">*</span>
            </label>
            <Input {...register('telefone')} placeholder="(00) 00000-0000" />
            {errors.telefone && (
              <p className="mt-1 text-sm text-red-600">{errors.telefone.message}</p>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Preferência de Contato <span className="text-red-500">*</span>
            </label>
            <Select {...register('preferenciaContato')}>
              <option value="">Selecione</option>
              <option value="Telefone">Telefone</option>
              <option value="E-mail">E-mail</option>
              <option value="WhatsApp">WhatsApp</option>
            </Select>
            {errors.preferenciaContato && (
              <p className="mt-1 text-sm text-red-600">{errors.preferenciaContato.message}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Melhor Horário</label>
            <Select {...register('melhorHorario')}>
              <option value="Qualquer horário">Qualquer horário</option>
              <option value="Manhã">Manhã</option>
              <option value="Tarde">Tarde</option>
              <option value="Noite">Noite</option>
            </Select>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Assunto <span className="text-red-500">*</span>
          </label>
          <Select {...register('assunto')}>
            <option value="">Selecione o assunto</option>
            <option value="Informações gerais">Informações gerais</option>
            <option value="Agendamento de test drive">Agendamento de test drive</option>
            <option value="Negociação de preço">Negociação de preço</option>
            <option value="Financiamento">Financiamento</option>
            <option value="Outro">Outro</option>
          </Select>
          {errors.assunto && <p className="mt-1 text-sm text-red-600">{errors.assunto.message}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Mensagem <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register('mensagem')}
            rows={5}
            className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Descreva seu interesse no veículo e quaisquer dúvidas que possa ter..."
          />
          <div className="mt-1 flex items-center justify-between">
            {errors.mensagem && <p className="text-sm text-red-600">{errors.mensagem.message}</p>}
            <p className="ml-auto text-xs text-muted-foreground">
              {watch('mensagem')?.length || 0}/1000 caracteres
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            {...register('financiamento')}
            className="mt-1 h-4 w-4 rounded border-input"
          />
          <label className="text-sm">Tenho interesse em opções de financiamento</label>
        </div>

        <div className="rounded-md border border-muted bg-muted/50 p-4">
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              {...register('termosPrivacidade')}
              className="mt-1 h-4 w-4 rounded border-input"
            />
            <label className="text-sm">
              <span className="text-red-500">*</span> Li e concordo com os{' '}
              <a href="#" className="text-primary-600 underline hover:text-primary-600/90">
                termos de privacidade
              </a>
              . Autorizo o uso dos meus dados para contato conforme a LGPD.
            </label>
          </div>
          {errors.termosPrivacidade && (
            <p className="mt-2 text-sm text-red-600">{errors.termosPrivacidade.message}</p>
          )}
        </div>

        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            {...register('receberNovidades')}
            className="mt-1 h-4 w-4 rounded border-input"
          />
          <label className="text-sm">Desejo receber novidades e promoções por e-mail</label>
        </div>
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? (
          <>
            <LoadingSpinner className="mr-2" />
            Enviando...
          </>
        ) : (
          'Enviar Mensagem'
        )}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        Ao enviar este formulário, você concorda que entraremos em contato através dos dados
        fornecidos.
      </p>
    </form>
  );
};
