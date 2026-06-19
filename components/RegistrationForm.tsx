'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Loader2, User, Phone, ArrowRight, MapPin, GraduationCap, ChevronDown, Search } from 'lucide-react';
import gsap from 'gsap';
import { VisitorFormData, FormErrors, Program } from '@/types';
import Logo from './Logo';

interface RegistrationFormProps {
  formData: VisitorFormData;
  errors: FormErrors;
  isSubmitting: boolean;
  programs: Program[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectDistrict: (district: string) => void;
  onSelectProgram: (programId: number) => void;
  onSubmit: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

const DISTRICTS = [
  'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo',
  'Galle', 'Gampaha', 'Hambantota', 'Jaffna', 'Kalutara',
  'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar',
  'Matale', 'Matara', 'Moneragala', 'Mullaitivu', 'Nuwara Eliya',
  'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'
];

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  formData,
  errors,
  isSubmitting,
  programs,
  onChange,
  onSelectDistrict,
  onSelectProgram,
  onSubmit,
  onKeyPress,
}) => {
  const formRef = useRef<HTMLDivElement>(null);
  const logoHeaderRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Focus tracking for input icons (slate-400 turns blue-600)
  const [activeField, setActiveField] = useState<string | null>(null);

  // Custom District Typeahead States
  const [districtInput, setDistrictInput] = useState(formData.district);
  const [isDistrictOpen, setIsDistrictOpen] = useState(false);
  const [activeDistrictIndex, setActiveDistrictIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  // Program Dropdown States
  const [isProgramOpen, setIsProgramOpen] = useState(false);
  const [programSearch, setProgramSearch] = useState('');

  // Dropdown Refs for Click Outside Close
  const districtDropdownRef = useRef<HTMLDivElement>(null);
  const programDropdownRef = useRef<HTMLDivElement>(null);

  // Stagger animation on mount
  useEffect(() => {
    const tl = gsap.timeline();

    // Main layout fade in
    tl.fromTo(
      formRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    );

    // Stagger logo and form inputs
    const elements = [
      logoHeaderRef.current,
      cardRef.current,
      nameRef.current,
      phoneRef.current,
      districtDropdownRef.current,
      programDropdownRef.current,
      buttonRef.current,
    ];
    tl.fromTo(
      elements,
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.08,
        ease: 'power2.out',
      },
      '-=0.2'
    );

    return () => {
      tl.kill();
    };
  }, []);

  // Sync state if form resets
  useEffect(() => {
    setDistrictInput(formData.district);
    setIsTyping(false);
  }, [formData.district]);

  // Click Outside to Close Dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        districtDropdownRef.current &&
        !districtDropdownRef.current.contains(event.target as Node)
      ) {
        setIsDistrictOpen(false);
        // Reset typeahead text input to matched value if they click out
        if (formData.district) {
          setDistrictInput(formData.district);
        } else {
          setDistrictInput('');
        }
        setIsTyping(false);
      }
      if (
        programDropdownRef.current &&
        !programDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProgramOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [formData.district]);

  // Filter districts dynamically for typeahead
  const filteredDistricts = isTyping
    ? DISTRICTS.filter((district) =>
        district.toLowerCase().includes(districtInput.toLowerCase())
      )
    : DISTRICTS;

  // Filter programs based on search input
  const filteredPrograms = programs.filter((p) =>
    p.program_name.toLowerCase().includes(programSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(programSearch.toLowerCase())
  );

  // Get selected program name
  const selectedProgramName = programs.find((p) => p.id === formData.selectedProgramId)?.program_name;

  // Handle district keyboard navigation (Typeahead/Autocomplete)
  const handleDistrictKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isDistrictOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        setIsDistrictOpen(true);
        setActiveDistrictIndex(0);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveDistrictIndex((prev) => 
        prev < filteredDistricts.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveDistrictIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredDistricts[activeDistrictIndex]) {
        const selected = filteredDistricts[activeDistrictIndex];
        onSelectDistrict(selected);
        setDistrictInput(selected);
        setIsTyping(false);
        setIsDistrictOpen(false);
      }
    } else if (e.key === 'Escape') {
      setIsDistrictOpen(false);
      setIsTyping(false);
      if (formData.district) {
        setDistrictInput(formData.district);
      }
    }
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDistrictInput(value);
    setIsTyping(true); // User is actively typing
    setIsDistrictOpen(true);
    setActiveDistrictIndex(0);

    // If input matches exactly one of the list, select it in parent state
    const match = DISTRICTS.find((d) => d.toLowerCase() === value.trim().toLowerCase());
    if (match) {
      onSelectDistrict(match);
    } else {
      // Clear selection if it doesn't match
      onSelectDistrict('');
    }
  };

  return (
    <div ref={formRef} className="w-full max-w-xl relative z-10 opacity-0 px-2 sm:px-0">
      
      {/* Brand Header & Logo centered at the top */}
      <div ref={logoHeaderRef} className="flex flex-col items-center justify-center mb-6 text-center opacity-0">
        <div className="bg-white rounded-2xl p-3 shadow-md border border-slate-100 mb-3 hover:scale-105 transition-transform duration-300">
          <Logo src="/images/logo.png" className="w-16 h-16 sm:w-20 sm:h-20" />
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight leading-none mb-1">
          Times School of Higher Education
        </h1>
        <div className="h-1 w-16 bg-blue-600 rounded-full mt-1.5" />
      </div>

      <div ref={cardRef} className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_rgba(15,23,42,0.06)] p-6 sm:p-8 md:p-10 border border-slate-100 opacity-0">
        
        {/* Subtitle / Enquiry description */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 bg-rose-50 border border-rose-100 rounded-full px-3 py-1 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
            <span className="text-rose-700 font-bold text-[10px] sm:text-xs uppercase tracking-wider">
              Admissions Enquiry 2026
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xs sm:max-w-md mx-auto">
            Please enter your information below. Fields marked with an asterisk (<span className="text-rose-500 font-bold">*</span>) are required.
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4 sm:space-y-5">
          
          {/* Name Field - Optimized with native Autocomplete autofill */}
          <div ref={nameRef} className="opacity-0 space-y-1.5">
            <label htmlFor="name" className="block text-xs sm:text-sm font-semibold text-slate-700 uppercase tracking-wider">
              Full Name <span className="text-rose-500 font-bold">*</span>
            </label>
            <div className="relative rounded-xl shadow-sm">
              <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 ${
                activeField === 'name' ? 'text-blue-600' : 'text-slate-400'
              }`}>
                <User className="w-5 h-5" />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={onChange}
                onKeyPress={onKeyPress}
                onFocus={() => setActiveField('name')}
                onBlur={() => setActiveField(null)}
                autoComplete="name"
                placeholder="Enter your name"
                disabled={isSubmitting}
                className={`w-full pl-11 pr-4 py-3 sm:py-3.5 border ${
                  errors.name 
                    ? 'border-rose-300 bg-rose-50/10 text-rose-900 placeholder-rose-300 focus:border-rose-500 focus:ring-rose-500/20' 
                    : 'border-slate-200 placeholder-slate-400 focus:border-blue-600 focus:ring-blue-600/15'
                } rounded-xl focus:outline-none focus:ring-4 transition-all text-base text-slate-900 bg-white`}
              />
            </div>
            {errors.name && (
              <p className="text-rose-600 text-[11px] sm:text-xs mt-1 flex items-center gap-1 font-medium">
                <span className="text-sm leading-none">⚠️</span> {errors.name}
              </p>
            )}
          </div>

          {/* Phone Field - Optimized with native Autocomplete autofill */}
          <div ref={phoneRef} className="opacity-0 space-y-1.5">
            <label htmlFor="workPhone" className="block text-xs sm:text-sm font-semibold text-slate-700 uppercase tracking-wider">
              Phone Number <span className="text-rose-500 font-bold">*</span>
            </label>
            <div className="relative rounded-xl shadow-sm">
              <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 ${
                activeField === 'workPhone' ? 'text-blue-600' : 'text-slate-400'
              }`}>
                <Phone className="w-5 h-5" />
              </div>
              <input
                type="tel"
                id="workPhone"
                name="workPhone"
                value={formData.workPhone}
                onChange={onChange}
                onKeyPress={onKeyPress}
                onFocus={() => setActiveField('workPhone')}
                onBlur={() => setActiveField(null)}
                autoComplete="tel"
                placeholder="+94 77 123 4567"
                disabled={isSubmitting}
                className={`w-full pl-11 pr-4 py-3 sm:py-3.5 border ${
                  errors.workPhone 
                    ? 'border-rose-300 bg-rose-50/10 text-rose-900 placeholder-rose-300 focus:border-rose-500 focus:ring-rose-500/20' 
                    : 'border-slate-200 placeholder-slate-400 focus:border-blue-600 focus:ring-blue-600/15'
                } rounded-xl focus:outline-none focus:ring-4 transition-all text-base text-slate-900 bg-white`}
              />
            </div>
            {errors.workPhone && (
              <p className="text-rose-600 text-[11px] sm:text-xs mt-1 flex items-center gap-1 font-medium">
                <span className="text-sm leading-none">⚠️</span> {errors.workPhone}
              </p>
            )}
          </div>

          {/* District Field (Interactive Typeahead / Autocomplete Search) */}
          <div ref={districtDropdownRef} className={`opacity-0 space-y-1.5 relative ${isDistrictOpen ? 'z-30' : 'z-10'}`}>
            <label htmlFor="districtInput" className="block text-xs sm:text-sm font-semibold text-slate-700 uppercase tracking-wider">
              District <span className="text-rose-500 font-bold">*</span>
            </label>
            <div className="relative">
              <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 ${
                activeField === 'district' ? 'text-blue-600' : 'text-slate-400'
              }`}>
                <MapPin className="w-5 h-5" />
              </div>
              <input
                type="text"
                id="districtInput"
                name="districtInput"
                value={districtInput}
                onChange={handleDistrictChange}
                onKeyDown={handleDistrictKeyDown}
                onFocus={() => {
                  setActiveField('district');
                  setIsDistrictOpen(true);
                }}
                onBlur={() => setActiveField(null)}
                placeholder="Type or select district..."
                disabled={isSubmitting}
                autoComplete="off"
                className={`w-full pl-11 pr-10 py-3 sm:py-3.5 border ${
                  errors.district 
                    ? 'border-rose-300 bg-rose-50/10 text-rose-900 placeholder-rose-300 focus:border-rose-500 focus:ring-rose-500/20' 
                    : 'border-slate-200 placeholder-slate-400 focus:border-blue-600 focus:ring-blue-600/15'
                } rounded-xl focus:outline-none focus:ring-4 transition-all text-base text-slate-900 bg-white`}
              />
              <button
                type="button"
                onClick={() => !isSubmitting && setIsDistrictOpen(!isDistrictOpen)}
                tabIndex={-1}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              >
                <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isDistrictOpen ? 'transform rotate-180' : ''}`} />
              </button>

              {/* District Autocomplete Suggestions Panel */}
              {isDistrictOpen && (
                <div className="absolute z-20 w-full mt-1.5 bg-white border border-slate-200/80 rounded-xl shadow-xl max-h-56 overflow-y-auto focus:outline-none py-1">
                  {filteredDistricts.length > 0 ? (
                    filteredDistricts.map((district, index) => (
                      <button
                        key={district}
                        type="button"
                        onClick={() => {
                          onSelectDistrict(district);
                          setDistrictInput(district);
                          setIsTyping(false);
                          setIsDistrictOpen(false);
                        }}
                        onMouseEnter={() => setActiveDistrictIndex(index)}
                        className={`w-full text-left px-5 py-2.5 text-sm hover:bg-slate-50 transition-colors flex items-center justify-between ${
                          formData.district === district 
                            ? 'bg-blue-50/60 font-semibold text-blue-900' 
                            : index === activeDistrictIndex 
                              ? 'bg-slate-100/80 text-slate-900' 
                              : 'text-slate-700'
                        }`}
                      >
                        <span>{district}</span>
                        {formData.district === district && (
                          <span className="text-[10px] bg-blue-600 text-white font-bold px-1.5 py-0.5 rounded">Selected</span>
                        )}
                      </button>
                    ))
                  ) : (
                    <div className="px-5 py-3.5 text-xs text-slate-400 text-center">
                      No matching districts found
                    </div>
                  )}
                </div>
              )}
            </div>
            {errors.district && (
              <p className="text-rose-600 text-[11px] sm:text-xs mt-1 flex items-center gap-1 font-medium">
                <span className="text-sm leading-none">⚠️</span> {errors.district}
              </p>
            )}
          </div>

          {/* Program Selection Field (Searchable Dropdown) */}
          <div ref={programDropdownRef} className={`opacity-0 space-y-1.5 relative ${isProgramOpen ? 'z-30' : 'z-10'}`}>
            <label className="block text-xs sm:text-sm font-semibold text-slate-700 uppercase tracking-wider">
              Program of Study <span className="text-rose-500 font-bold">*</span>
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  if (!isSubmitting) {
                    setIsProgramOpen(!isProgramOpen);
                    setActiveField(isProgramOpen ? null : 'program');
                  }
                }}
                disabled={isSubmitting}
                className={`w-full text-left pl-11 pr-10 py-3 sm:py-3.5 border ${
                  errors.selectedProgramId 
                    ? 'border-rose-300 bg-rose-50/10 focus:border-rose-500 focus:ring-rose-500/20' 
                    : activeField === 'program' 
                      ? 'border-blue-600 ring-4 ring-blue-600/15'
                      : 'border-slate-200'
                } rounded-xl bg-white text-base text-slate-900 focus:outline-none transition-all flex items-center justify-between shadow-sm disabled:opacity-60 disabled:cursor-not-allowed`}
              >
                <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 ${
                  activeField === 'program' ? 'text-blue-600' : 'text-slate-400'
                }`}>
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className={formData.selectedProgramId ? 'text-slate-900 font-medium' : 'text-slate-400'}>
                  {selectedProgramName || 'Select course of interest'}
                </span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isProgramOpen ? 'transform rotate-180' : ''}`} />
              </button>

              {/* Program Dropdown Overlay */}
              {isProgramOpen && (
                <div className="absolute z-20 w-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl max-h-72 flex flex-col overflow-hidden py-1">
                  
                  {/* Search Input */}
                  <div className="p-2 border-b border-slate-100 flex items-center gap-2">
                    <Search className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
                    <input
                      type="text"
                      placeholder="Search courses..."
                      value={programSearch}
                      onChange={(e) => setProgramSearch(e.target.value)}
                      className="w-full text-sm text-slate-800 focus:outline-none bg-transparent placeholder-slate-400 py-1"
                    />
                  </div>

                  {/* Program Options */}
                  <div className="overflow-y-auto max-h-52 flex-1">
                    {filteredPrograms.length > 0 ? (
                      filteredPrograms.map((program) => (
                        <button
                          key={program.id}
                          type="button"
                          onClick={() => {
                            onSelectProgram(program.id);
                            setIsProgramOpen(false);
                            setActiveField(null);
                            setProgramSearch('');
                          }}
                          className={`w-full text-left px-5 py-3 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 ${
                            formData.selectedProgramId === program.id 
                              ? 'bg-blue-50/60 font-semibold text-blue-900 hover:bg-blue-50' 
                              : 'text-slate-700'
                          }`}
                        >
                          <div className="text-sm font-semibold">{program.program_name}</div>
                          {program.category && (
                            <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">{program.category}</div>
                          )}
                        </button>
                      ))
                    ) : (
                      <div className="px-5 py-4 text-xs text-slate-400 text-center">
                        No matching programs found.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            {errors.selectedProgramId && (
              <p className="text-rose-600 text-[11px] sm:text-xs mt-1 flex items-center gap-1 font-medium">
                <span className="text-sm leading-none">⚠️</span> {errors.selectedProgramId}
              </p>
            )}
          </div>

          {/* Submit Button (Premium Royal Blue Gradient) */}
          <button
            ref={buttonRef}
            onClick={onSubmit}
            disabled={isSubmitting}
            className="opacity-0 w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-xl font-bold text-base sm:text-lg focus:outline-none focus:ring-4 focus:ring-blue-500/20 active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-[0_10px_25px_-5px_rgba(37,99,235,0.2)] hover:shadow-[0_15px_30px_-5px_rgba(37,99,235,0.35)] flex items-center justify-center gap-2 group mt-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-white" />
                <span>Submitting Enquiry...</span>
              </>
            ) : (
              <>
                <span>Submit Enquiry</span>
                <ArrowRight className="w-5 h-5 text-white/90 transform group-hover:translate-x-1 transition-transform duration-200" />
              </>
            )}
          </button>

        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
