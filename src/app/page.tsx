
"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Heart, Gift, Flower2 } from 'lucide-react'; 
import ParticleBackground from '@/components/eternal-devotion/ParticleBackground';
import NavigationBar from '@/components/eternal-devotion/NavigationBar';
import HeroSection from '@/components/eternal-devotion/HeroSection';
import PhotoGallery, { type PhotoData } from '@/components/eternal-devotion/PhotoGallery';
import CountdownTimer from '@/components/eternal-devotion/CountdownTimer';
import QuoteCarousel from '@/components/eternal-devotion/QuoteCarousel';
import FamilyTree from '@/components/eternal-devotion/FamilyTree';
import MusicControl from '@/components/eternal-devotion/MusicControl';
import VideoHighlights from '@/components/eternal-devotion/VideoHighlights';
import FirstVisitModal from '@/components/eternal-devotion/FirstVisitModal';
import PersonalizationSection from '@/components/eternal-devotion/PersonalizationSection';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';


const RECIPIENT_NAME_KEY = 'eternalDevotionRecipientName';
const SENDER_NAME_KEY = 'eternalDevotionSenderName';

// Default photo data - this will be the consistent base for all users
const defaultHerPhotosData: PhotoData[] = [
  { src: "/images/gallery-her-photo-1.jpg", alt: "Her beautiful smile", hint: "" },
  { src: "https://placehold.co/600x800.png", alt: "Smiling brightly", hint: "woman smiling happy" },
  { src: "https://placehold.co/600x800.png", alt: "Candid moment of joy", hint: "woman candid joy" },
  { src: "https://placehold.co/600x800.png", alt: "Thoughtful and serene", hint: "woman thoughtful serene" },
  { src: "https://placehold.co/600x800.png", alt: "Joyful expression in nature", hint: "woman joyful nature" },
  { src: "https://placehold.co/600x800.png", alt: "Another beautiful shot", hint: "woman beauty outdoor" },
];

const defaultOurPhotosData: PhotoData[] = [
  { src: "/images/gallery-our-photo-1.jpg", alt: "Our first adventure together", hint: "" },
  { src: "https://placehold.co/800x600.png", alt: "Watching the sunset", hint: "couple sunset romantic" },
  { src: "https://placehold.co/800x600.png", alt: "Sharing a laugh", hint: "couple laughing candid" },
  { src: "https://placehold.co/800x600.png", alt: "Celebrating a special occasion", hint: "couple celebration festive" },
  { src: "https://placehold.co/800x600.png", alt: "Cozy moment at home", hint: "couple cozy home" },
  { src: "https://placehold.co/800x600.png", alt: "Exploring a new city", hint: "couple travel city" },
];


export default function EternalDevotionPage() {
  const [isSurpriseMessageVisible, setIsSurpriseMessageVisible] = useState(false);
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  
  // State for dynamic names
  const [recipientName, setRecipientName] = useState("My Beautiful Girl");
  const [senderName, setSenderName] = useState("Your Loving Partner");

  // Photo Gallery State - initialized with defaults, additions are session-only
  const [herPhotos, setHerPhotos] = useState<PhotoData[]>(defaultHerPhotosData);
  const [ourPhotos, setOurPhotos] = useState<PhotoData[]>(defaultOurPhotosData);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());

    // Load names from localStorage on mount
    const storedRecipientName = localStorage.getItem(RECIPIENT_NAME_KEY);
    const storedSenderName = localStorage.getItem(SENDER_NAME_KEY);

    if (storedRecipientName) {
      setRecipientName(storedRecipientName);
    }
    if (storedSenderName) {
      setSenderName(storedSenderName);
    }
    // Note: Photo lists are NOT loaded from localStorage here anymore to ensure consistency for all users on load.
  }, []);

  const handleNamesUpdate = (data: { recipientName: string; senderName: string }) => {
    setRecipientName(data.recipientName);
    setSenderName(data.senderName);
    localStorage.setItem(RECIPIENT_NAME_KEY, data.recipientName);
    localStorage.setItem(SENDER_NAME_KEY, data.senderName);
  };

  const handleAddHerPhoto = (newPhoto: PhotoData) => {
    setHerPhotos(prevPhotos => [...prevPhotos, newPhoto]);
    // Not saving to localStorage anymore
  };

  const handleAddOurPhoto = (newPhoto: PhotoData) => {
    setOurPhotos(prevPhotos => [...prevPhotos, newPhoto]);
    // Not saving to localStorage anymore
  };

  const countdownEvents = [
    { title: "My Queen's Arrival (Gift from God)", targetDate: "2025-12-09T00:00:00" }, 
    { title: "Our Second Year With Love", targetDate: "2026-03-06T00:00:00" } 
  ];

  return (
    <>
      <Head>
        <title>Eternal Devotion 💖 For My Love</title>
        <meta name="description" content={`A special dedication to ${recipientName} from ${senderName}.`} />
      </Head>

      <FirstVisitModal />
      <ParticleBackground />
      <NavigationBar />

      <div className="relative z-10 min-h-screen flex flex-col">
        <div id="home">
          <HeroSection recipientName={recipientName} />
        </div>
        
        <main className="flex-grow container mx-auto px-2 sm:px-4 py-8 space-y-16 md:space-y-20">
          <PhotoGallery herPhotos={herPhotos} ourPhotos={ourPhotos} />
          <CountdownTimer countdownItems={countdownEvents} />
          <QuoteCarousel />
          
          <PersonalizationSection 
            currentRecipientName={recipientName}
            currentSenderName={senderName}
            onNamesUpdate={handleNamesUpdate}
            onAddHerPhoto={handleAddHerPhoto}
            onAddOurPhoto={handleAddOurPhoto}
          />

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
                  
                  <div className="relative w-full max-w-xs h-48 sm:h-56 mb-4 sm:mb-6 rounded-lg overflow-hidden shadow-lg">
                    <Image 
                      src="/images/surprise-dialog-flower.jpg" // Ensure this image exists in public/images
                      alt="Beautiful Flowers for My Love" 
                      layout="fill" 
                      objectFit="cover"
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

