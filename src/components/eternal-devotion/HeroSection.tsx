
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

interface HeroSectionProps {
  recipientName: string;
}

export default function HeroSection({ recipientName }: HeroSectionProps) {
  return (
    <header className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 w-full min-h-screen py-12 px-4 sm:px-8 lg:px-16 bg-indigo-900 text-white">
      {/* Left Text Content */}
      <div className="md:w-1/2 lg:w-2/5 space-y-3 md:space-y-5 text-center md:text-left mb-10 md:mb-0 z-10 flex flex-col justify-center">
        
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-script text-pink-400 drop-shadow-md mt-1">
          For My<br />Beautiful Girl 💖
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-md mx-auto md:mx-0 font-sans pt-2">
          My love, you are my sunshine and my everything.
        </p>
        <Button size="lg" className="mt-8 shadow-lg hover:shadow-xl transition-shadow bg-primary hover:bg-primary/90 text-primary-foreground self-center md:self-start">
          Discover Our Story <Heart className="ml-2 h-5 w-5" />
        </Button>
      </div>

      {/* Right Image Content */}
      <div className="md:w-1/2 lg:w-3/5 flex justify-center md:justify-end items-center w-full md:h-full mt-10 md:mt-0">
        <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[75vh] rounded-lg overflow-hidden shadow-2xl border-2 border-primary/50 transform md:-rotate-3 hover:rotate-0 transition-all duration-300 ease-in-out group">
          <Image
            src="https://placehold.co/600x800.png"
            alt={`Portrait of ${recipientName}`}
            layout="fill"
            objectFit="cover"
            className="group-hover:scale-105 transition-transform duration-500 ease-out"
            data-ai-hint="woman portrait elegant"
            priority
          />
        </div>
      </div>
    </header>
  );
}
