'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Logo from './Logo';

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Ensure all refs are available
    if (!logoContainerRef.current || !titleRef.current || !dividerRef.current || !subtitleRef.current || !containerRef.current) {
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 400);
      },
    });

    // Logo animation
    if (logoContainerRef.current) {
      tl.fromTo(
        logoContainerRef.current,
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }

    // Title animation - split into characters
    if (titleRef.current) {
      try {
        const text = titleRef.current.textContent || '';
        const words = text.split(' ').filter(word => word.length > 0);
        titleRef.current.innerHTML = '';

        words.forEach((word, index) => {
          const wordSpan = document.createElement('span');
          wordSpan.style.display = 'inline-block';

          word.split('').forEach((letter) => {
            const span = document.createElement('span');
            span.textContent = letter;
            span.style.display = 'inline-block';
            span.className = 'letter';
            wordSpan.appendChild(span);
          });

          titleRef.current!.appendChild(wordSpan);

          // Add space between words (except after the last word)
          if (index < words.length - 1) {
            const spaceSpan = document.createElement('span');
            spaceSpan.textContent = ' ';
            spaceSpan.style.display = 'inline-block';
            spaceSpan.style.width = '0.3em';
            spaceSpan.className = 'letter';
            titleRef.current!.appendChild(spaceSpan);
          }
        });

        const letters = titleRef.current.querySelectorAll('.letter');
        if (letters.length > 0) {
          tl.fromTo(
            letters,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.03,
              ease: 'power2.out',
            },
            '-=0.3'
          );
        }
      } catch (error) {
        console.error('Error animating title:', error);
      }
    }

    // Divider animation
    if (dividerRef.current) {
      tl.fromTo(
        dividerRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, ease: 'power2.inOut' },
        '-=0.2'
      );
    }

    // Subtitle animation
    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      );
    }

    // Fade out entire screen
    if (containerRef.current) {
      tl.to(
        containerRef.current,
        { opacity: 0, y: -30, duration: 0.6, ease: 'power2.inOut' },
        '+=1.5'
      );
    }

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div ref={containerRef} className="text-center max-w-5xl relative z-10 w-full">
        {/* Logo */}
        <div
          ref={logoContainerRef}
          className="mb-8 sm:mb-10 md:mb-12 flex justify-center opacity-0"
        >
          <div className="bg-gray-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border-2 border-gray-200">
            <Logo 
              src="/images/logo.png" 
              alt="Times School Higher Education Logo"
            />
          </div>
        </div>

        <h1
          ref={titleRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-black mb-4 sm:mb-5 md:mb-6 leading-tight px-2"
          style={{ letterSpacing: '0.01em' }}
        >
          WELCOME TO TIMES SCHOOL HIGHER EDUCATION
        </h1>
        <div ref={dividerRef} className="h-1 w-24 sm:w-32 bg-yellow-400 mx-auto mb-4 sm:mb-5 md:mb-6 rounded-full" />
        <p ref={subtitleRef} className="text-lg sm:text-xl md:text-2xl text-gray-600 font-light px-4 opacity-0">
          Exhibition Registration Portal
        </p>
      </div>
    </div>
  );
};

export default IntroScreen;

