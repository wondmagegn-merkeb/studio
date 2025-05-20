
"use client";

import Image from 'next/image';

interface HeroSectionProps {
  recipientName: string;
}

export default function HeroSection({ recipientName }: HeroSectionProps) {
  return (
    <header className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 w-full min-h-screen py-12 px-4 sm:px-8 lg:px-16 bg-indigo-900 text-foreground overflow-hidden">
      {/* Left Text Content */}
      <div className="md:w-1/2 lg:w-2/5 space-y-3 md:space-y-5 text-center md:text-left mb-10 md:mb-0 z-10 flex flex-col justify-center">
        
        <h1 
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-script text-primary drop-shadow-md mt-1 fade-in-element"
          style={{ animationDelay: '0.2s' }}
        >
          For My<br />Beautiful Girl 💖
        </h1>
        <p 
          className="text-base sm:text-lg md:text-xl text-foreground/90 max-w-md mx-auto md:mx-0 font-sans pt-2 fade-in-element"
          style={{ animationDelay: '0.7s' }}
        >
          My love, you are my sunshine and my everything.
        </p>
        <p 
          className="text-base sm:text-lg md:text-xl text-foreground/80 max-w-md mx-auto md:mx-0 font-sans fade-in-element"
          style={{ animationDelay: '1.2s' }}
        >
          Every beat of my heart whispers your name.
        </p>
      </div>

      {/* Right Image Content */}
      <div className="md:w-1/2 lg:w-3/5 flex justify-center md:justify-end items-center w-full md:h-full mt-10 md:mt-0 fade-in-element" style={{ animationDelay: '0.5s' }}>
        <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[75vh] rounded-lg overflow-hidden shadow-2xl border-2 border-primary/50 transform md:-rotate-3 hover:rotate-0 transition-all duration-300 ease-in-out group">
          <Image
            src="/images/her-portrait.jpg" 
            alt={`Portrait of ${recipientName}`}
            layout="fill"
            objectFit="cover"
            className="group-hover:scale-105 transition-transform duration-500 ease-out"
            priority 
          />
           <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300"></div>
        </div>
      </div>
    </header>
  );
}
