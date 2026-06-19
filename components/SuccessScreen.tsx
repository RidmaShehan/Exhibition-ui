'use client';

import React, { useEffect, useRef } from 'react';
import { CheckCircle, PhoneCall, User, Calendar, RotateCcw, MapPin, GraduationCap } from 'lucide-react';
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

  // Find the program name from the program list
  const selectedProgramName = programs.find((p) => p.id === formData.selectedProgramId)?.program_name;

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
      y: -8,
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
    <div ref={containerRef} className="w-full max-w-xl relative z-10 opacity-0 px-2 sm:px-0">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_rgba(15,23,42,0.06)] p-6 sm:p-8 md:p-10 text-center border border-slate-100">
        <div className="mb-6">
          
          {/* Re-themed checkmark icon to Blue/Red theme */}
          <div
            ref={iconRef}
            className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-100"
          >
            <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600" />
          </div>
          <h2
            ref={titleRef}
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3 opacity-0"
          >
            Enquiry Received!
          </h2>
          <p
            ref={descRef}
            className="text-sm sm:text-base text-slate-500 mb-8 max-w-md mx-auto leading-relaxed opacity-0"
          >
            Thank you for reaching out to Times School of Higher Education. Our academic advisors will call you shortly to guide you.
          </p>
          
          {/* Details Card with red/blue icons */}
          <div
            ref={detailsRef}
            className="bg-slate-50 rounded-2xl p-5 sm:p-6 text-left space-y-4 mb-8 border border-slate-100 opacity-0"
          >
            <div className="flex justify-between items-center pb-3.5 border-b border-slate-200/60">
              <span className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" /> Name
              </span>
              <span className="text-sm sm:text-base text-slate-800 font-semibold break-all ml-4">
                {formData.name}
              </span>
            </div>
            <div className="flex justify-between items-center pb-3.5 border-b border-slate-200/60">
              <span className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-blue-600" /> Phone
              </span>
              <span className="text-sm sm:text-base text-slate-800 font-semibold break-all ml-4">
                {formData.workPhone}
              </span>
            </div>
            <div className="flex justify-between items-center pb-3.5 border-b border-slate-200/60">
              <span className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" /> District
              </span>
              <span className="text-sm sm:text-base text-slate-800 font-semibold ml-4">
                {formData.district}
              </span>
            </div>
            {selectedProgramName && (
              <div className="flex justify-between items-center pb-3.5 border-b border-slate-200/60">
                <span className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-blue-600" /> Program
                </span>
                <span className="text-sm sm:text-base text-slate-800 font-semibold ml-4 text-right break-words max-w-[60%]">
                  {selectedProgramName}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center pt-0.5">
              <span className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" /> Date
              </span>
              <span className="text-sm sm:text-base text-slate-800 font-semibold ml-4">
                {new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
          </div>
        </div>
        
        {/* Reset button matching Blue/Red theme (Royal Blue button with red-accented rotate icon) */}
        <button
          ref={buttonRef}
          onClick={onReset}
          className="opacity-0 w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-xl font-bold text-base sm:text-lg focus:outline-none focus:ring-4 focus:ring-blue-500/25 active:scale-[0.99] transition-all shadow-[0_10px_25px_-5px_rgba(37,99,235,0.2)] hover:shadow-[0_15px_30px_-5px_rgba(37,99,235,0.35)] flex items-center justify-center gap-2 sm:gap-2.5"
        >
          <RotateCcw className="w-5 h-5 text-rose-300 group-hover:rotate-45 transition-transform duration-200" />
          <span>Submit Another Enquiry</span>
        </button>
      </div>
    </div>
  );
};

export default SuccessScreen;
