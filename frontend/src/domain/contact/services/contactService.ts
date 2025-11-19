import { publicClient } from '@/core/lib/api';
import type { ContactFormData, ContactResponse } from '../types/contact';
import DOMPurify from 'dompurify';

export const contactService = {
  async submit(data: ContactFormData): Promise<ContactResponse> {
    const sanitizedData = {
      ...data,
      mensagem: DOMPurify.sanitize(data.mensagem),
    };

    const { data: response } = await publicClient.post('/contact', sanitizedData);
    return response.data;
  },
};
