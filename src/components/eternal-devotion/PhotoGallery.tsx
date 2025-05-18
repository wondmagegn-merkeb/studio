
"use client";

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState, useRef, useCallback } from 'react'; // Added useCallback
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Autoplay from "embla-carousel-autoplay";
import { Maximize, Film, Grid, X } from 'lucide-react';

const herPhotosData = [
  { src: "https://placehold.co/600x800.png", alt: "Elegant portrait", hint: "woman elegant fashion" },
  { src: "https://placehold.co/600x800.png", alt: "Smiling brightly", hint: "woman smiling happy" },
  { src: "https://placehold.co/600x800.png", alt: "Candid moment of joy", hint: "woman candid joy" },
  { src: "https://placehold.co/600x800.png", alt: "Thoughtful and serene", hint: "woman thoughtful serene" },
  { src: "https://placehold.co/600x800.png", alt: "Joyful expression in nature", hint: "woman joyful nature" },
  { src: "https://placehold.co/600x800.png", alt: "Another beautiful shot", hint: "woman beauty outdoor" },
];

const ourPhotosData = [
  { src: "https://placehold.co/800x600.png", alt: "Our first adventure together", hint: "couple adventure landscape" },
  { src: "https://placehold.co/800x600.png", alt: "Watching the sunset", hint: "couple sunset romantic" },
  { src: "https://placehold.co/800x600.png", alt: "Sharing a laugh", hint: "couple laughing candid" },
  { src: "https://placehold.co/800x600.png", alt: "Celebrating a special occasion", hint: "couple celebration festive" },
  { src: "https://placehold.co/800x600.png", alt: "Cozy moment at home", hint: "couple cozy home" },
  { src: "https://placehold.co/800x600.png", alt: "Exploring a new city", hint: "couple travel city" },
];

interface PhotoData {
  src: string;
  alt: string;
  hint: string;
}

interface PhotoSectionProps {
  title: string;
  photos: PhotoData[];
  initialView?: 'carousel' | 'grid';
  carouselAspectRatio?: string;
  gridAspectRatio?: string;
  carouselItemBasis?: string;
}

const PhotoSection: React.FC<PhotoSectionProps> = ({ title, photos, initialView = 'carousel', carouselAspectRatio = "aspect-[4/3]", gridAspectRatio = "aspect-square", carouselItemBasis = "md:basis-1/2 lg:basis-1/1" }) => {
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>(initialView);
  const [selectedImage, setSelectedImage] = useState<PhotoData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const autoplayPlugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true }));

  const toggleViewMode = () => {
    setViewMode(prevMode => prevMode === 'carousel' ? 'grid' : 'carousel');
  };

  const handleModalOpenChange = useCallback((open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      setSelectedImage(null); // Reset selected image when modal closes
    }
  }, []);

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6 px-2">
        <h3 className="text-3xl font-script text-primary">{title}</h3>
        <Button onClick={toggleViewMode} variant="outline" size="sm" className="text-sm">
          {viewMode === 'carousel' ? <Grid className="mr-2 h-4 w-4" /> : <Film className="mr-2 h-4 w-4" />}
          {viewMode === 'carousel' ? 'View Album' : 'View Slideshow'}
        </Button>
      </div>

      <Dialog open={isModalOpen} onOpenChange={handleModalOpenChange}>
        {viewMode === 'carousel' ? (
          <Carousel
            plugins={[autoplayPlugin.current]}
            opts={{
              align: "start",
              loop: photos.length > (carouselItemBasis.includes('lg:basis-1/3') ? 3 : (carouselItemBasis.includes('md:basis-1/2') ? 2 : 1)),
            }}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent>
              {photos.map((photo, index) => (
                <CarouselItem key={index} className={carouselItemBasis}>
                  <div className="p-1">
                    <Card className="overflow-hidden shadow-lg rounded-xl border-2 border-primary/30">
                      <CardContent className="p-0">
                        <DialogTrigger asChild onClick={() => setSelectedImage(photo)}>
                          <Image
                            src={photo.src}
                            alt={photo.alt}
                            width={800}
                            height={600}
                            className={`object-cover w-full h-auto ${carouselAspectRatio} cursor-pointer`}
                            data-ai-hint={photo.hint}
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </DialogTrigger>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-primary hover:bg-primary/10 border-primary/50 ml-2 sm:ml-0"/>
            <CarouselNext className="text-primary hover:bg-primary/10 border-primary/50 mr-2 sm:mr-0"/>
          </Carousel>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-2">
            {photos.map((photo, index) => (
              <DialogTrigger key={index} asChild onClick={() => setSelectedImage(photo)}>
                <Card 
                  className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg group cursor-pointer"
                >
                  <CardContent className="p-0 relative">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      width={400}
                      height={300}
                      className={`object-cover w-full h-auto ${gridAspectRatio} transition-transform group-hover:scale-105`}
                      data-ai-hint={photo.hint}
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Maximize className="h-8 w-8 text-white" />
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
            ))}
          </div>
        )}

        {selectedImage && (
          <DialogContent className="max-w-3xl w-[90vw] h-auto p-2 bg-card/90 backdrop-blur-md border-primary/50 rounded-xl">
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={1200}
              height={900}
              className="object-contain w-full h-auto max-h-[85vh] rounded-lg"
              data-ai-hint={selectedImage.hint}
            />
            <Button variant="ghost" size="icon" className="absolute top-3 right-3 text-primary-foreground bg-primary/70 hover:bg-primary z-10" onClick={() => setIsModalOpen(false)}>
              <X className="h-5 w-5"/>
              <span className="sr-only">Close</span>
            </Button>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};


const PhotoGallery = () => {
  return (
    <section 
      id="gallery" 
      aria-labelledby="gallery-title" 
      className="py-8 px-2 sm:px-4 space-y-12 bg-primary/5 rounded-2xl shadow-lg backdrop-blur-sm mt-12 mb-12"
    >
      <h2 id="gallery-title" className="text-5xl font-script text-center mb-12 text-primary drop-shadow-md pt-4">Gallery of Our Love</h2>
      
      <PhotoSection 
        title="For My Eyes Only: Her Beauty" 
        photos={herPhotosData} 
        carouselAspectRatio="aspect-[3/4]"
        gridAspectRatio="aspect-[3/4]"
        carouselItemBasis="basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3"
      />
      
      <hr className="my-12 border-dashed border-foreground/20" />

      <PhotoSection 
        title="Our Cherished Moments Together" 
        photos={ourPhotosData}
        initialView="carousel"
        carouselAspectRatio="aspect-[16/9]"
        gridAspectRatio="aspect-[4/3]"
        carouselItemBasis="basis-full md:basis-1/2 lg:basis-1/1"
      />
    </section>
  );
};

export default PhotoGallery;
