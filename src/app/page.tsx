
"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Heart, Gift, Flower2 } from 'lucide-react'; 
import ParticleBackground from '@/components/eternal-devotion/ParticleBackground';
import NavigationBar from '@/components/eternal-devotion/NavigationBar';
import HeroSection from '@/components/eternal-devotion/HeroSection';
import PhotoGallery from '@/components/eternal-devotion/PhotoGallery';
import CountdownTimer from '@/components/eternal-devotion/CountdownTimer';
import QuoteCarousel from '@/components/eternal-devotion/QuoteCarousel';
import FamilyTree from '@/components/eternal-devotion/FamilyTree';
import MusicControl from '@/components/eternal-devotion/MusicControl';
import VideoHighlights from '@/components/eternal-devotion/VideoHighlights';
import FirstVisitModal from '@/components/eternal-devotion/FirstVisitModal'; // Added this line
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';


export default function EternalDevotionPage() {
  const [isSurpriseMessageVisible, setIsSurpriseMessageVisible] = useState(false);
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const countdownEvents = [
    { title: "My Queen's Arrival (Gift from God)", targetDate: "2025-08-15T00:00:00" }, 
    { title: "Our Second Year With Love", targetDate: "2025-06-01T00:00:00" } 
  ];

  const recipientName = "My Beautiful Girl";
  const senderName = "Your Loving Partner";


  return (
    <>
      <Head>
        <title>Eternal Devotion 💖 For My Love</title>
        <meta name="description" content={`A special dedication to ${recipientName} from ${senderName}.`} />
      </Head>

      <FirstVisitModal /> {/* Added this component here */}
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
              className="shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 py-3 px-8 text-lg"
              aria-label="Click for a surprise message"
            >
              <Gift className="mr-2 h-6 w-6" /> A Special Surprise For You
            </Button>
            
            <Dialog open={isSurpriseMessageVisible} onOpenChange={setIsSurpriseMessageVisible}>
              <DialogContent className="surprise-dialog-bg bg-card text-card-foreground shadow-2xl rounded-xl border-primary/50 max-w-md p-6 sm:p-8">
                <div className="flex flex-col items-center justify-center text-center">
                  {/* Background image is handled by surprise-dialog-bg class */}
                  {/* Image element here is for the foreground flower image, if still desired. 
                      If the background is the main flower, this specific image can be removed or changed.
                      For now, I'll keep it as it was to show the centered flower icon over the new background.
                  */}
                  <div className="relative w-full max-w-xs h-48 sm:h-56 mb-4 sm:mb-6 rounded-lg overflow-hidden shadow-lg">
                    <Image 
                      src="https://placehold.co/400x300.png" 
                      alt="Beautiful Flowers for My Love" 
                      layout="fill" 
                      objectFit="cover"
                      data-ai-hint="flowers romantic bouquet"
                      className="opacity-0" /* Make this invisible if background is the main flower, or style differently */
                    />
                  </div>
                  <Flower2 className="w-16 h-16 sm:w-20 sm:h-20 text-primary mb-3 sm:mb-4 pulse-gentle" strokeWidth={1.5} />
                  <DialogHeader className="mb-2 sm:mb-3">
                    <DialogTitle className="text-3xl sm:text-4xl font-script text-primary">My Dearest Love,</DialogTitle>
                  </DialogHeader>
                  <DialogDescription className="text-lg sm:text-xl my-3 sm:my-4 text-card-foreground/90 leading-relaxed">
                    You are the most precious flower in the garden of my heart. Every moment with you is a dream I never want to wake from. My love for you grows deeper with every passing day. This little surprise is just a whisper of the adoration I feel.
                  </DialogDescription>
                  <DialogFooter className="mt-4 sm:mt-6">
                    <DialogClose asChild>
                      <Button variant="outline" className="text-base px-6 py-2">Close</Button>
                    </DialogClose>
                  </DialogFooter>
                </div>
              </DialogContent>
            </Dialog>
          </section>
          
          <div id="family">
            <FamilyTree recipientName={recipientName} senderName={senderName} />
          </div>
          <div id="videos">
            <VideoHighlights />
          </div>
          <MusicControl />
        </main>

        <footer className="text-center py-10 px-4 mt-16 bg-background/10 text-foreground/70 border-t border-border/30 backdrop-blur-sm">
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
