
"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Button } from '@/components/ui/button';
import { Heart, Gift } from 'lucide-react';
import ParticleBackground from '@/components/eternal-devotion/ParticleBackground';
import NavigationBar from '@/components/eternal-devotion/NavigationBar'; // New Import
import HeroSection from '@/components/eternal-devotion/HeroSection';
import PhotoGallery from '@/components/eternal-devotion/PhotoGallery';
import CountdownTimer from '@/components/eternal-devotion/CountdownTimer';
import QuoteCarousel from '@/components/eternal-devotion/QuoteCarousel';
import LoveLetterSection from '@/components/eternal-devotion/LoveLetterSection';
import TimelineDisplay from '@/components/eternal-devotion/TimelineDisplay';
import MusicControl from '@/components/eternal-devotion/MusicControl';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';


export default function EternalDevotionPage() {
  const [isSurpriseMessageVisible, setIsSurpriseMessageVisible] = useState(false);
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  // Define countdown items
  const countdownEvents = [
    { title: "Her Next Birthday", targetDate: "2025-08-15T00:00:00" }, // Example: August 15th
    { title: "Our Anniversary", targetDate: "2025-06-01T00:00:00" } // Example: June 1st
  ];


  const recipientName = "My Beautiful Girl";
  const senderName = "Your Loving Partner";


  return (
    <>
      <Head>
        <title>Eternal Devotion 💖 For My Love</title>
        <meta name="description" content={`A special dedication to ${recipientName} from ${senderName}.`} />
      </Head>

      <ParticleBackground />
      <NavigationBar />

      <div className="relative z-10 min-h-screen flex flex-col">
        <div id="home">
          <HeroSection recipientName={recipientName} />
        </div>
        

        <main className="flex-grow container mx-auto px-2 sm:px-4 py-8 space-y-16 md:space-y-20">
          <PhotoGallery />
          <CountdownTimer countdownItems={countdownEvents} />
          <QuoteCarousel />

          <section className="text-center space-y-4 py-8" id="surprise">
            <Button 
              onClick={() => setIsSurpriseMessageVisible(true)}
              size="lg" 
              className="shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90"
              aria-label="Click for a surprise message"
            >
              <Gift className="mr-2 h-5 w-5" /> A Little Surprise Just For You
            </Button>
            
            <Dialog open={isSurpriseMessageVisible} onOpenChange={setIsSurpriseMessageVisible}>
              <DialogContent className="bg-card text-card-foreground shadow-2xl rounded-xl border-primary/50">
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
          
          <div id="love-letter">
            <LoveLetterSection />
          </div>
          <div id="timeline">
            <TimelineDisplay />
          </div>
          <MusicControl />
        </main>

        <footer className="text-center py-10 px-4 mt-16 bg-foreground/5 text-foreground/70 border-t border-border/30">
          <p className="font-script text-3xl text-primary mb-2">With All My Love,</p>
          <p className="text-lg">{senderName} &amp; {recipientName} 💖</p>
          {currentYear !== null && <p className="text-xs mt-3 opacity-70">Crafted with adoration in {currentYear}</p>}
        </footer>
      </div>

      <Button
        variant="default"
        size="icon"
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl floating-btn-animation z-50 bg-primary hover:bg-primary/80"
        onClick={() => setIsSurpriseMessageVisible(true)}
        aria-label="I love you - reveal surprise message"
      >
        <Heart className="h-8 w-8" fill="currentColor" />
      </Button>
    </>
  );
}
