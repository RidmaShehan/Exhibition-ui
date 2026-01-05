import { VisitorFormData, FormErrors } from '@/types';

const PHONE_REGEX = /^\+?[\d\s\-()]+$/;

export const validateForm = (formData: VisitorFormData): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.name.trim()) {
    errors.name = 'Name is required';
  }

  if (!formData.workPhone.trim()) {
    errors.workPhone = 'Phone number is required';
  } else if (!PHONE_REGEX.test(formData.workPhone)) {
    errors.workPhone = 'Please enter a valid phone number';
  }

  if (!formData.selectedPrograms || formData.selectedPrograms.length === 0) {
    errors.selectedPrograms = 'Please select at least one program';
  }

  return errors;
};
