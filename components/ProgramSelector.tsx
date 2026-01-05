'use client';

import React from 'react';
import { Program } from '@/types';
import { Check } from 'lucide-react';

interface ProgramSelectorProps {
  programs: Program[];
  selectedPrograms: number[];
  onChange: (programIds: number[]) => void;
  error?: string;
  disabled?: boolean;
}

const ProgramSelector: React.FC<ProgramSelectorProps> = ({
  programs,
  selectedPrograms,
  onChange,
  error,
  disabled = false,
}) => {
  const handleToggle = (programId: number) => {
    if (disabled) return;

    if (selectedPrograms.includes(programId)) {
      // Remove program
      onChange(selectedPrograms.filter((id) => id !== programId));
    } else {
      // Add program
      onChange([...selectedPrograms, programId]);
    }
  };

  // Group programs by category
  const groupedPrograms = programs.reduce((acc, program) => {
    const category = program.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(program);
    return acc;
  }, {} as Record<string, Program[]>);

  const categories = Object.keys(groupedPrograms).sort();

  return (
    <div>
      <label className="block text-xs sm:text-sm font-bold text-black mb-3 sm:mb-4 uppercase tracking-wide">
        Select Programs/Courses <span className="text-red-500">*</span>
      </label>
      
      <div className="space-y-4 sm:space-y-5">
        {categories.map((category) => (
          <div key={category}>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              {category}
            </h3>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {groupedPrograms[category].map((program) => {
                const isSelected = selectedPrograms.includes(program.id);
                return (
                  <button
                    key={program.id}
                    type="button"
                    onClick={() => handleToggle(program.id)}
                    disabled={disabled}
                    className={`
                      relative px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl
                      font-medium text-xs sm:text-sm
                      transition-all duration-200
                      border-2
                      ${
                        isSelected
                          ? 'bg-black text-white border-black shadow-lg scale-105'
                          : 'bg-white text-black border-gray-300 hover:border-black hover:shadow-md'
                      }
                      ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                      disabled:hover:scale-100
                      active:scale-95
                    `}
                  >
                    <span className="flex items-center gap-1.5 sm:gap-2">
                      {isSelected && (
                        <Check className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={3} />
                      )}
                      {program.program_name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {selectedPrograms.length > 0 && (
        <div className="mt-3 sm:mt-4 p-2.5 sm:p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-xs sm:text-sm text-green-800">
            <span className="font-bold">{selectedPrograms.length}</span> program
            {selectedPrograms.length > 1 ? 's' : ''} selected
          </p>
        </div>
      )}

      {error && (
        <p className="text-red-500 text-xs sm:text-sm mt-2 sm:mt-3 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
};

export default ProgramSelector;

