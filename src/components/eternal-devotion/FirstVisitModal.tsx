
"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Sparkles, Flower } from 'lucide-react';

const flowerImages = [
  { src: "/images/welcome-flower-1.jpg", alt: "Beautiful Pink Roses for Welcome", hint: "" }, // Updated to local path
  { src: "https://placehold.co/400x300.png", alt: "Elegant White Lilies", hint: "white lilies elegant" },
  { src: "https://placehold.co/400x300.png", alt: "Vibrant Sunflowers", hint: "sunflowers vibrant happy" },
  { src: "https://placehold.co/400x300.png", alt: "Delicate Cherry Blossoms", hint: "cherry blossoms delicate" },
];

const profileMessages = [
  { pp: "/images/welcome-profile-1.jpg", alt: "Her smiling face for Welcome", message: "Your smile is the brightest star in my sky. ✨", hint: "" }, // Updated to local path
  { pp: "https://placehold.co/200x200.png", alt: "Her looking thoughtful", message: "Lost in the beauty of your thoughts, my love. 💭", hint: "woman thoughtful candid" },
  { pp: "https://placehold.co/200x200.png", alt: "Her joyful laugh", message: "Your laughter is my favorite song. 🎶", hint: "woman laughing joyful" },
  { pp: "https://placehold.co/200x200.png", alt: "Her gentle gaze", message: "In your eyes, I find my home. ❤️", hint: "woman gaze gentle" },
];

const FirstVisitModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFlower, setSelectedFlower] = useState<{ src: string; alt: string; hint: string } | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<{ pp: string; alt: string; message: string; hint: string } | null>(null);

  useEffect(() => {
    const randomFlowerIndex = Math.floor(Math.random() * flowerImages.length);
    const randomProfileIndex = Math.floor(Math.random() * profileMessages.length);
    
    setSelectedFlower(flowerImages[randomFlowerIndex]);
    setSelectedProfile(profileMessages[randomProfileIndex]);
    
    setIsOpen(true);
  }, []);

  if (!isOpen || !selectedFlower || !selectedProfile) {
    return null; 
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-card text-card-foreground shadow-2xl rounded-xl border-primary/50 max-w-lg md:max-w-2xl lg:max-w-3xl p-6 sm:p-8 text-center">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-4xl font-script text-primary flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8 text-secondary animate-pulse" />
            Welcome My Girl
            <Sparkles className="w-8 h-8 text-secondary animate-pulse" />
          </DialogTitle>
        </DialogHeader>
        
        <div className="my-6 flex flex-col md:flex-row md:items-center md:gap-6 lg:gap-8">
          {/* Flower Image Section */}
          <div className="md:w-1/2 mb-6 md:mb-0">
            <div className="relative w-full max-w-sm mx-auto md:max-w-none h-56 sm:h-64 md:h-72 lg:h-80 rounded-lg overflow-hidden shadow-lg border-2 border-secondary/50">
              <Image
                src={selectedFlower.src}
                alt={selectedFlower.alt}
                layout="fill"
                objectFit="cover"
                data-ai-hint={selectedFlower.src.startsWith('http') ? selectedFlower.hint : undefined}
              />
            </div>
          </div>

          {/* Profile Picture and Message Section */}
          <div className="md:w-1/2 flex flex-col items-center space-y-3">
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden shadow-md border-4 border-primary">
              <Image
                src={selectedProfile.pp}
                alt={selectedProfile.alt}
                layout="fill"
                objectFit="cover"
                data-ai-hint={selectedProfile.src.startsWith('http') ? selectedProfile.hint : undefined}
              />
            </div>
            <DialogDescription className="text-xl text-card-foreground/90 italic px-4">
              "{selectedProfile.message}"
            </DialogDescription>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button variant="default" className="text-lg px-8 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90">
              <Flower className="mr-2 h-5 w-5" /> Explore Our Love
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FirstVisitModal;
