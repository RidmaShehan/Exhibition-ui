'use client';

import React, { useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import gsap from 'gsap';
import { VisitorFormData, FormErrors, Program } from '@/types';
import ProgramSelector from './ProgramSelector';

interface RegistrationFormProps {
  formData: VisitorFormData;
  errors: FormErrors;
  isSubmitting: boolean;
  programs: Program[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onProgramsChange: (programIds: number[]) => void;
  onSubmit: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  formData,
  errors,
  isSubmitting,
  programs,
  onChange,
  onProgramsChange,
  onSubmit,
  onKeyPress,
}) => {
  const formRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const programsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Container fade in
    tl.fromTo(
      formRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    );

    // Stagger form elements
    const elements = [
      headerRef.current,
      nameRef.current,
      phoneRef.current,
      programsRef.current,
      buttonRef.current,
    ];
    tl.fromTo(
      elements,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
      },
      '-=0.2'
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={formRef} className="w-full max-w-2xl relative z-10 opacity-0">
      <div className="bg-gray-50 rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-6 md:p-8 lg:p-10 border-2 border-gray-200">
        <div ref={headerRef} className="text-center mb-6 sm:mb-8 md:mb-10 opacity-0">
          <div className="inline-block bg-black rounded-xl sm:rounded-2xl px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 mb-3 sm:mb-4">
            <span className="text-white font-semibold text-xs sm:text-sm tracking-wider">
              REGISTRATION
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-2 sm:mb-3">
            Visitor Information
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Please provide your details and select programs of interest
          </p>
        </div>

        <div className="space-y-5 sm:space-y-6 md:space-y-7">
          <div ref={nameRef} className="opacity-0">
            <label className="block text-xs sm:text-sm font-bold text-black mb-1.5 sm:mb-2 uppercase tracking-wide">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              onKeyPress={onKeyPress}
              className={`w-full px-3 sm:px-4 md:px-5 py-3 sm:py-3.5 md:py-4 border-2 ${
                errors.name ? 'border-red-400 bg-red-50' : 'border-gray-300 focus:border-black'
              } rounded-lg sm:rounded-xl focus:outline-none transition-all text-sm sm:text-base text-black placeholder-gray-400 bg-white`}
              placeholder="Enter your full name"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-red-500 text-xs sm:text-sm mt-1.5 sm:mt-2 flex items-center gap-1">
                <span>⚠</span> {errors.name}
              </p>
            )}
          </div>

          <div ref={phoneRef} className="opacity-0">
            <label className="block text-xs sm:text-sm font-bold text-black mb-1.5 sm:mb-2 uppercase tracking-wide">
              Work Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="workPhone"
              value={formData.workPhone}
              onChange={onChange}
              onKeyPress={onKeyPress}
              className={`w-full px-3 sm:px-4 md:px-5 py-3 sm:py-3.5 md:py-4 border-2 ${
                errors.workPhone ? 'border-red-400 bg-red-50' : 'border-gray-300 focus:border-black'
              } rounded-lg sm:rounded-xl focus:outline-none transition-all text-sm sm:text-base text-black placeholder-gray-400 bg-white`}
              placeholder="+1 (555) 000-0000"
              disabled={isSubmitting}
            />
            {errors.workPhone && (
              <p className="text-red-500 text-xs sm:text-sm mt-1.5 sm:mt-2 flex items-center gap-1">
                <span>⚠</span> {errors.workPhone}
              </p>
            )}
          </div>

          <div ref={programsRef} className="opacity-0">
            <ProgramSelector
              programs={programs}
              selectedPrograms={formData.selectedPrograms}
              onChange={onProgramsChange}
              error={errors.selectedPrograms}
              disabled={isSubmitting}
            />
          </div>

          <button
            ref={buttonRef}
            onClick={onSubmit}
            disabled={isSubmitting}
            className="opacity-0 w-full bg-black text-white py-3.5 sm:py-4 md:py-5 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg hover:bg-gray-800 transform hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 sm:gap-3"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
                <span className="text-sm sm:text-base md:text-lg">Submitting...</span>
              </>
            ) : (
              <>
                <span className="text-sm sm:text-base md:text-lg">Submit Registration</span>
                <span className="text-xl sm:text-2xl">→</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
