
"use client";

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState, useRef, useCallback } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger, DialogClose, DialogTitle } from "@/components/ui/dialog";
import Autoplay from "embla-carousel-autoplay";
import { Maximize, Film, Grid, X } from 'lucide-react';

// Default photo data using /uploads/ path
const herPhotosData = [
  { src: "/uploads/gallery-her-photo-1.jpg", alt: "Her beautiful smile" },
  { src: "/uploads/gallery-her-photo-2.jpg", alt: "Smiling brightly", hint: "woman smiling happy" },
  { src: "/uploads/gallery-her-photo-3.jpg", alt: "Candid moment of joy", hint: "woman candid joy" },
  { src: "/uploads/gallery-her-photo-4.jpg", alt: "Thoughtful and serene", hint: "woman thoughtful serene" },
  { src: "/uploads/gallery-her-photo-5.jpg", alt: "Joyful expression in nature", hint: "woman joyful nature" },
  { src: "/uploads/gallery-her-photo-6.jpg", alt: "Another beautiful shot", hint: "woman beauty outdoor" },
];

const ourPhotosData = [
  { src: "/uploads/gallery-our-photo-1.jpg", alt: "Our first adventure together" },
  { src: "/uploads/gallery-our-photo-2.jpg", alt: "Watching the sunset", hint: "couple sunset romantic" },
  { src: "/uploads/gallery-our-photo-3.jpg", alt: "Sharing a laugh", hint: "couple laughing candid" },
  { src: "/uploads/gallery-our-photo-4.jpg", alt: "Celebrating a special occasion", hint: "couple celebration festive" },
  { src: "/uploads/gallery-our-photo-5.jpg", alt: "Cozy moment at home", hint: "couple cozy home" },
  { src: "/uploads/gallery-our-photo-6.jpg", alt: "Exploring a new city", hint: "couple travel city" },
];


interface PhotoData {
  src: string;
  alt: string;
  hint?: string;
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

  const autoplayPlugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true }));

  const toggleViewMode = () => {
    setViewMode(prevMode => prevMode === 'carousel' ? 'grid' : 'carousel');
  };
  
  const openModalWithImage = (photo: PhotoData) => {
    setSelectedImage(photo);
    setIsModalOpen(true);
  };

  const handleModalOpenChange = useCallback((open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      setSelectedImage(null); 
    }
  }, []);

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6 px-2">
        <h3 className="text-3xl font-script text-primary">{title}</h3>
        <Button onClick={toggleViewMode} variant="outline" size="sm" className="text-sm border-primary/70 text-primary hover:bg-primary/10">
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
              loop: photos.length > (carouselItemBasis.includes('basis-full sm:basis-1/2 lg:basis-1/3') ? 3 : (carouselItemBasis.includes('md:basis-1/2') ? 2 : 1)),
            }}
            className="w-full max-w-4xl sm:max-w-5xl md:max-w-6xl mx-auto"
          >
            <CarouselContent>
              {photos.map((photo, index) => (
                <CarouselItem key={index} className={carouselItemBasis}>
                  <div className="p-1 md:p-2">
                    <Card className="overflow-hidden shadow-lg rounded-xl border-2 border-primary/30 group">
                      <CardContent className="p-0 relative">
                        <DialogTrigger asChild onClick={() => openModalWithImage(photo)}>
                          <div className="relative w-full cursor-pointer">
                            <Image
                              src={photo.src}
                              alt={photo.alt}
                              width={800}
                              height={600}
                              className={`object-cover w-full h-auto ${carouselAspectRatio} transition-transform duration-300 group-hover:scale-105`}
                              data-ai-hint={photo.hint}
                              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Maximize className="h-10 w-10 text-white/80" />
                            </div>
                          </div>
                        </DialogTrigger>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-primary hover:bg-primary/10 border-primary/50 ml-2 sm:ml-0 disabled:opacity-40"/>
            <CarouselNext className="text-primary hover:bg-primary/10 border-primary/50 mr-2 sm:mr-0 disabled:opacity-40"/>
          </Carousel>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4 px-2">
            {photos.map((photo, index) => (
              <DialogTrigger key={index} asChild>
                <Card 
                  className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg group cursor-pointer"
                  onClick={() => openModalWithImage(photo)}
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
          <DialogContent className="max-w-3xl w-[90vw] h-auto p-1 sm:p-2 bg-card/95 backdrop-blur-lg border-primary/50 rounded-xl">
            <DialogTitle className="sr-only">{selectedImage.alt}</DialogTitle>
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={1200}
              height={900}
              className="object-contain w-full h-auto max-h-[85vh] rounded-lg"
              data-ai-hint={selectedImage.hint}
            />
            <DialogClose asChild>
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 sm:top-3 sm:right-3 text-primary-foreground bg-primary/70 hover:bg-primary z-50 h-8 w-8 sm:h-9 sm:w-9">
                <X className="h-4 w-4 sm:h-5 sm:w-5"/>
                <span className="sr-only">Close</span>
              </Button>
            </DialogClose>
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
      className="py-8 px-2 sm:px-4 space-y-12 bg-primary/5 rounded-2xl shadow-inner backdrop-blur-sm mt-12 mb-12 border border-primary/10"
    >
      <h2 id="gallery-title" className="text-5xl font-script text-center mb-12 text-primary drop-shadow-md pt-4">Gallery of Our Love</h2>
      
      <PhotoSection 
        title="For My Eyes Only: Her Beauty" 
        photos={herPhotosData} 
        carouselAspectRatio="aspect-[3/4]"
        gridAspectRatio="aspect-[3/4]"
        carouselItemBasis="basis-full sm:basis-1/2 lg:basis-1/3"
      />
      
      <hr className="my-12 border-dashed border-foreground/20 max-w-xl mx-auto" />

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
