'use client';

import React, { useEffect, useRef } from 'react';
import { CheckCircle } from 'lucide-react';
import gsap from 'gsap';
import { VisitorFormData, Program } from '@/types';

interface SuccessScreenProps {
  formData: VisitorFormData;
  programs: Program[];
  onReset: () => void;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({ formData, programs, onReset }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Get selected program names
  const selectedProgramNames = programs
    .filter((p) => formData.selectedPrograms.includes(p.id))
    .map((p) => p.program_name);

  useEffect(() => {
    const tl = gsap.timeline();

    // Container
    tl.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
    );

    // Icon with bounce
    tl.fromTo(
      iconRef.current,
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(2)' },
      '-=0.2'
    );

    // Add continuous subtle bounce to icon
    tl.to(iconRef.current, {
      y: -10,
      duration: 0.6,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    // Title
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.8'
    );

    // Description
    tl.fromTo(
      descRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.3'
    );

    // Details card
    tl.fromTo(
      detailsRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.2'
    );

    // Button
    tl.fromTo(
      buttonRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.2'
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-2xl relative z-10 opacity-0">
      <div className="bg-gray-50 rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-6 md:p-8 lg:p-10 text-center border-2 border-gray-200">
        <div className="mb-5 sm:mb-6">
          <div
            ref={iconRef}
            className="w-20 h-20 sm:w-24 sm:h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6"
          >
            <CheckCircle className="w-12 h-12 sm:w-14 sm:h-14 text-green-600" />
          </div>
          <h2
            ref={titleRef}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-3 sm:mb-4 opacity-0"
          >
            Registration Complete!
          </h2>
          <p
            ref={descRef}
            className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 px-2 opacity-0"
          >
            Thank you for registering with Times School Higher Education
          </p>
          <div
            ref={detailsRef}
            className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 text-left space-y-3 sm:space-y-4 mb-6 sm:mb-8 border-2 border-gray-200 opacity-0"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-3 border-b border-gray-200 gap-1 sm:gap-0">
              <span className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wide">
                Name
              </span>
              <span className="text-sm sm:text-base text-black font-semibold break-words">
                {formData.name}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-3 border-b border-gray-200 gap-1 sm:gap-0">
              <span className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wide">
                Phone
              </span>
              <span className="text-sm sm:text-base text-black font-semibold break-words">
                {formData.workPhone}
              </span>
            </div>
            {selectedProgramNames.length > 0 && (
              <div className="flex flex-col gap-2 pt-1">
                <span className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wide">
                  Selected Programs ({selectedProgramNames.length})
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedProgramNames.map((programName, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1.5 bg-black text-white text-xs sm:text-sm font-medium rounded-lg"
                    >
                      {programName}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <button
          ref={buttonRef}
          onClick={onReset}
          className="opacity-0 w-full bg-black text-white py-3.5 sm:py-4 md:py-5 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg hover:bg-gray-800 transform hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 sm:gap-3"
        >
          <span className="text-sm sm:text-base md:text-lg">Register Another Visitor</span>
          <span className="text-xl sm:text-2xl">+</span>
        </button>
      </div>
    </div>
  );
};

export default SuccessScreen;
