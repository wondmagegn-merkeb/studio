
"use client";

import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Heart, Gift, Music } from 'lucide-react';
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
  const [isLoveLetterModalOpen, setIsLoveLetterModalOpen] = useState(false);

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
        <header className="text-center py-12 px-4 bg-gradient-to-b from-background to-transparent">
          <h1 className="text-5xl md:text-7xl font-script text-primary drop-shadow-lg">
            For My Beautiful Girl 💖
          </h1>
          <p className="mt-4 text-lg md:text-xl text-foreground/90 max-w-2xl mx-auto">
            My love, you are my sunshine, my starlight, my everything. This is a small token of my endless affection for you.
          </p>
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
            
            {/* Surprise Message Dialog (was hidden div) */}
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
          <p className="text-xs mt-2">Crafted with adoration in {new Date().getFullYear()}</p>
        </footer>
      </div>

      {/* Floating Action Buttons */}
      <Button
        variant="default"
        size="icon"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl floating-btn-animation z-50"
        onClick={() => setIsSurpriseMessageVisible(true)}
        aria-label="I love you - reveal surprise message"
      >
        <Heart className="h-7 w-7" fill="white" />
      </Button>
      {/* 
        Music button placeholder - MusicControl component has its own button. 
        If a global floating music button is needed, it can be added here.
        For now, the MusicControl component provides the play/pause.
      */}
       {/* <Button
        variant="secondary"
        size="icon"
        className="fixed bottom-6 left-6 h-14 w-14 rounded-full shadow-2xl z-50"
        onClick={() => {
          // This would ideally interact with the MusicControl component's state/audio element.
          // For simplicity, it's currently a UI-only button.
          const musicPlayer = document.querySelector('audio'); // Simple way to find, better with context/ref
          if (musicPlayer) {
            musicPlayer.paused ? musicPlayer.play() : musicPlayer.pause();
          }
        }}
        aria-label="Toggle music"
      >
        <Music className="h-7 w-7" />
      </Button> */}
    </>
  );
}
