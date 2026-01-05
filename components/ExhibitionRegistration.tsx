'use client';

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import IntroScreen from './IntroScreen';
import RegistrationForm from './RegistrationForm';
import SuccessScreen from './SuccessScreen';
import PaperPlane from './PaperPlane';
import { VisitorFormData, FormErrors, Program } from '@/types';
import { validateForm } from '@/lib/validation';
import { submitVisitorRegistration, fetchPrograms } from '@/lib/supabase';
import { captureVisitorMetadata } from '@/lib/metadata';

const INITIAL_FORM_DATA: VisitorFormData = {
  name: '',
  workPhone: '',
  selectedPrograms: [],
};

const ExhibitionRegistration: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [formData, setFormData] = useState<VisitorFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoadingPrograms, setIsLoadingPrograms] = useState(true);

  const planeRef = useRef<HTMLDivElement>(null);

  // Fetch programs on mount
  useEffect(() => {
    const loadPrograms = async () => {
      setIsLoadingPrograms(true);
      const programList = await fetchPrograms();
      setPrograms(programList);
      setIsLoadingPrograms(false);
    };

    loadPrograms();
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleProgramsChange = (programIds: number[]) => {
    setFormData((prev) => ({ ...prev, selectedPrograms: programIds }));

    // Clear programs error
    if (errors.selectedPrograms) {
      setErrors((prev) => ({ ...prev, selectedPrograms: '' }));
    }
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    // Paper plane animation
    if (planeRef.current) {
      gsap.set(planeRef.current, { display: 'block' });
      gsap.to(planeRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });

      gsap.to(planeRef.current, {
        x: '30vw',
        y: '-100vh',
        scale: 0.5,
        opacity: 0,
        duration: 2.5,
        ease: 'power2.inOut',
        delay: 0.1,
      });
    }

    try {
      // Capture visitor metadata (IP, location, device, etc.)
      const metadata = await captureVisitorMetadata();

      // Wait for animation to play
      await new Promise((resolve) => setTimeout(resolve, 2500));

      // Submit to database
      const result = await submitVisitorRegistration(formData, metadata);
      if (!result.success) {
        throw new Error(result.error);
      }

      console.log('Registration successful!', {
        visitorId: result.visitorId,
        metadata,
      });

      setIsSuccess(true);
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred during registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isSubmitting) {
      handleSubmit();
    }
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setIsSuccess(false);
  };

  if (showIntro) {
    return <IntroScreen onComplete={handleIntroComplete} />;
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-3 sm:p-4 md:p-6 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Paper Plane Animation */}
      <PaperPlane ref={planeRef} />

      {/* Main Content */}
      {isLoadingPrograms ? (
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          <p className="mt-4 text-gray-600">Loading programs...</p>
        </div>
      ) : !isSuccess ? (
        <RegistrationForm
          formData={formData}
          errors={errors}
          isSubmitting={isSubmitting}
          programs={programs}
          onChange={handleChange}
          onProgramsChange={handleProgramsChange}
          onSubmit={handleSubmit}
          onKeyPress={handleKeyPress}
        />
      ) : (
        <SuccessScreen formData={formData} programs={programs} onReset={resetForm} />
      )}
    </div>
  );
};

export default ExhibitionRegistration;
