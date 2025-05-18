
"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Heart, Gift } from 'lucide-react';
import ParticleBackground from '@/components/eternal-devotion/ParticleBackground';
import PhotoGallery from '@/components/eternal-devotion/PhotoGallery';
import CountdownTimer from '@/components/eternal-devotion/CountdownTimer';
import QuoteCarousel from '@/components/eternal-devotion/QuoteCarousel';
import LoveLetterSection from '@/components/eternal-devotion/LoveLetterSection';
import TimelineDisplay from '@/components/eternal-devotion/TimelineDisplay';
import MusicControl from '@/components/eternal-devotion/MusicControl';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';


export default function EternalDevotionPage() {
  const [isSurpriseMessageVisible, setIsSurpriseMessageVisible] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const specialDate = "2025-06-01T00:00:00"; // Example date, change as needed

  const recipientName = "My Beautiful Girl"; // Default or customize
  const senderName = "Your Loving Partner"; // Default or customize


  return (
    <>
      <Head>
        <title>Eternal Devotion 💖 For My Love</title>
        <meta name="description" content={`A special dedication to ${recipientName} from ${senderName}.`} />
      </Head>

      <ParticleBackground />

      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 w-full min-h-screen py-12 px-4 sm:px-8 lg:px-16 bg-black text-white">
          {/* Left Text Content */}
          <div className="md:w-1/2 lg:w-2/5 space-y-3 md:space-y-5 text-center md:text-left mb-10 md:mb-0 z-10 flex flex-col justify-center">
            <p className="text-xl md:text-2xl text-secondary font-sans font-medium">A love like ours...</p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-sans font-bold tracking-tight text-foreground">
              Is <span className="text-primary">Forever</span>,<br className="hidden xl:block" /> {recipientName}
            </h1>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-script text-pink-400 drop-shadow-md mt-2">
              My Guiding Star ✨
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-foreground/80 max-w-md mx-auto md:mx-0 font-sans pt-4">
              This space is a testament to the journey we share, the dreams we build, and the love that lights our way.
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

        <main className="flex-grow container mx-auto px-2 sm:px-4 py-8 space-y-12 md:space-y-16">
          <PhotoGallery />
          <CountdownTimer targetDate={specialDate} />
          <QuoteCarousel />

          <section className="text-center space-y-4 py-8">
            <Button 
              onClick={() => setIsSurpriseMessageVisible(true)}
              size="lg" 
              className="shadow-lg hover:shadow-xl transition-shadow"
              aria-label="Click for a surprise message"
            >
              <Gift className="mr-2 h-5 w-5" /> A Little Surprise Just For You
            </Button>
            
            <Dialog open={isSurpriseMessageVisible} onOpenChange={setIsSurpriseMessageVisible}>
              <DialogContent className="bg-card text-card-foreground shadow-2xl rounded-xl">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-script text-primary">A Special Note 💌</DialogTitle>
                </DialogHeader>
                <DialogDescription className="text-xl my-6 text-center text-card-foreground/90">
                  I love you more than words can ever say. You are my everything, forever and always.
                </DialogDescription>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Close</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </section>
          
          <LoveLetterSection />
          <TimelineDisplay />
          <MusicControl />
        </main>

        <footer className="text-center py-8 px-4 mt-12 bg-foreground/5 text-foreground/70">
          <p className="font-script text-2xl text-primary">With All My Love,</p>
          <p>{senderName} &amp; {recipientName} 💖</p>
          {currentYear !== null && <p className="text-xs mt-2">Crafted with adoration in {currentYear}</p>}
        </footer>
      </div>

      <Button
        variant="default"
        size="icon"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl floating-btn-animation z-50"
        onClick={() => setIsSurpriseMessageVisible(true)}
        aria-label="I love you - reveal surprise message"
      >
        <Heart className="h-7 w-7" fill="white" />
      </Button>
    </>
  );
}
