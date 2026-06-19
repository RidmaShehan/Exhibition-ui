import { VisitorFormData, FormErrors } from '@/types';

const PHONE_REGEX = /^\+?[\d\s\-()]+$/;

export const validateForm = (formData: VisitorFormData): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.name.trim()) {
    errors.name = 'Name is required';
  } else if (formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!formData.workPhone.trim()) {
    errors.workPhone = 'Phone number is required';
  } else if (!PHONE_REGEX.test(formData.workPhone)) {
    errors.workPhone = 'Please enter a valid phone number';
  }

  if (!formData.district) {
    errors.district = 'Please select your district';
  }

  if (formData.selectedProgramId === null || formData.selectedProgramId === undefined) {
    errors.selectedProgramId = 'Please select a program';
  }

  return errors;
};
