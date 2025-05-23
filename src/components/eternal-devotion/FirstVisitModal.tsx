
"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Sparkles, Flower } from 'lucide-react';

const flowerImages = [
  { src: "/uploads/welcome-flower-1.jpg", alt: "Beautiful Pink Roses for Welcome" },
  { src: "/uploads/welcome-flower-2.jpg", alt: "Elegant White Lilies", hint: "white lilies elegant" },
  { src: "/uploads/welcome-flower-3.jpg", alt: "Vibrant Sunflowers", hint: "sunflowers vibrant happy" },
  { src: "/uploads/welcome-flower-4.jpg", alt: "Delicate Cherry Blossoms", hint: "cherry blossoms delicate" },
];

const profileMessages = [
  { pp: "/uploads/welcome-profile-1.jpg", alt: "Her smiling face for Welcome", message: "Your smile is the brightest star in my sky. ✨" },
  { pp: "/uploads/welcome-profile-2.jpg", alt: "Her looking thoughtful", message: "Lost in the beauty of your thoughts, my love. 💭", hint: "woman thoughtful candid" },
  { pp: "/uploads/welcome-profile-3.jpg", alt: "Her joyful laugh", message: "Your laughter is my favorite song. 🎶", hint: "woman laughing joyful" },
  { pp: "/uploads/welcome-profile-4.jpg", alt: "Her gentle gaze", message: "In your eyes, I find my home. ❤️", hint: "woman gaze gentle" },
];

const FirstVisitModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFlower, setSelectedFlower] = useState<{ src: string; alt: string; hint?: string } | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<{ pp: string; alt: string; message: string; hint?: string } | null>(null);

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
      <DialogContent className="bg-primary/90 backdrop-blur-md text-primary-foreground shadow-2xl rounded-xl border-primary/50 max-w-lg md:max-w-2xl lg:max-w-3xl p-6 sm:p-8 text-center">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-4xl font-script text-primary-foreground flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8 text-secondary animate-pulse" />
            Welcome My Girl
            <Sparkles className="w-8 h-8 text-secondary animate-pulse" />
          </DialogTitle>
        </DialogHeader>
        
        <div className="my-6 flex flex-col md:flex-row md:items-center md:gap-6 lg:gap-8">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <div className="relative w-full max-w-sm mx-auto md:max-w-none h-56 sm:h-64 md:h-72 lg:h-80 rounded-lg overflow-hidden shadow-lg border-2 border-secondary/50">
              <Image
                src={selectedFlower.src}
                alt={selectedFlower.alt}
                layout="fill"
                objectFit="cover"
                data-ai-hint={selectedFlower.hint}
              />
            </div>
          </div>

          <div className="md:w-1/2 flex flex-col items-center space-y-3">
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden shadow-md border-4 border-secondary"> {/* Changed border to secondary for contrast on primary bg */}
              <Image
                src={selectedProfile.pp}
                alt={selectedProfile.alt}
                layout="fill"
                objectFit="cover"
                data-ai-hint={selectedProfile.hint}
              />
            </div>
            <DialogDescription className="text-xl text-primary-foreground/90 italic px-4">
              "{selectedProfile.message}"
            </DialogDescription>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button variant="secondary" className="text-lg px-8 py-3 bg-gradient-to-r from-secondary to-accent text-secondary-foreground hover:opacity-90">
              <Flower className="mr-2 h-5 w-5" /> Explore Our Love
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FirstVisitModal;
