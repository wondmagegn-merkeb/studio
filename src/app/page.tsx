
"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Button } from '@/components/ui/button';
import { Heart, Gift } from 'lucide-react';
import ParticleBackground from '@/components/eternal-devotion/ParticleBackground';
import HeroSection from '@/components/eternal-devotion/HeroSection'; // New Import
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
        <HeroSection recipientName={recipientName} /> {/* Using the new HeroSection component */}

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
