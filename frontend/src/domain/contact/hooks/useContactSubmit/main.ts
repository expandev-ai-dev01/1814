import { useMutation } from '@tanstack/react-query';
import { contactService } from '../../services/contactService';
import type { ContactFormData } from '../../types/contact';

export const useContactSubmit = () => {
  return useMutation({
    mutationFn: (data: ContactFormData) => contactService.submit(data),
    retry: 1,
  });
};
