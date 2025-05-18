
"use client";

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Maximize, Film, Grid } from 'lucide-react';

const herPhotosData = [
  { src: "https://placehold.co/600x800.png", alt: "Elegant portrait", hint: "woman elegant" },
  { src: "https://placehold.co/600x800.png", alt: "Smiling brightly", hint: "woman smiling" },
  { src: "https://placehold.co/600x800.png", alt: "Candid moment", hint: "woman candid" },
  { src: "https://placehold.co/600x800.png", alt: "Thoughtful pose", hint: "woman thinking" },
  { src: "https://placehold.co/600x800.png", alt: "Joyful expression", hint: "woman joyful" },
];

const ourPhotosData = [
  { src: "https://placehold.co/800x600.png", alt: "Our first adventure", hint: "couple adventure" },
  { src: "https://placehold.co/800x600.png", alt: "Sunset together", hint: "couple sunset" },
  { src: "https://placehold.co/800x600.png", alt: "Laughing hard", hint: "couple laughing" },
  { src: "https://placehold.co/800x600.png", alt: "Special celebration", hint: "couple celebration" },
  { src: "https://placehold.co/800x600.png", alt: "Cozy moment", hint: "couple cozy" },
  { src: "https://placehold.co/800x600.png", alt: "Exploring new places", hint: "couple travel" },
];

interface PhotoSectionProps {
  title: string;
  photos: Array<{ src: string; alt: string; hint: string }>;
  initialView?: 'carousel' | 'grid';
  carouselAspectRatio?: string;
  gridAspectRatio?: string;
}

const PhotoSection: React.FC<PhotoSectionProps> = ({ title, photos, initialView = 'carousel', carouselAspectRatio = "aspect-[4/3]", gridAspectRatio = "aspect-square" }) => {
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>(initialView);

  const toggleViewMode = () => {
    setViewMode(prevMode => prevMode === 'carousel' ? 'grid' : 'carousel');
  };

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-3xl font-script text-primary">{title}</h3>
        <Button onClick={toggleViewMode} variant="outline" size="sm" className="text-sm">
          {viewMode === 'carousel' ? <Grid className="mr-2 h-4 w-4" /> : <Film className="mr-2 h-4 w-4" />}
          {viewMode === 'carousel' ? 'View Album' : 'View Slideshow'}
        </Button>
      </div>

      {viewMode === 'carousel' ? (
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-3xl mx-auto"
        >
          <CarouselContent>
            {photos.map((photo, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/1">
                <Card className="overflow-hidden shadow-lg rounded-xl border-2 border-primary/30">
                  <CardContent className="p-0">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      width={800}
                      height={600}
                      className={`object-cover w-full h-auto ${carouselAspectRatio}`}
                      data-ai-hint={photo.hint}
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-primary hover:bg-primary/10 border-primary/50"/>
          <CarouselNext className="text-primary hover:bg-primary/10 border-primary/50"/>
        </Carousel>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg group">
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
          ))}
        </div>
      )}
    </div>
  );
};


const PhotoGallery = () => {
  return (
    <section id="gallery" aria-labelledby="gallery-title" className="py-8 px-4 space-y-12">
      <h2 id="gallery-title" className="text-5xl font-script text-center mb-12 text-primary drop-shadow-md">Gallery of Our Love</h2>
      
      <PhotoSection 
        title="For My Eyes Only: Her Beauty" 
        photos={herPhotosData} 
        carouselAspectRatio="aspect-[3/4]"
        gridAspectRatio="aspect-[3/4]"
      />
      
      <hr className="my-12 border-dashed border-foreground/20" />

      <PhotoSection 
        title="Our Cherished Moments Together" 
        photos={ourPhotosData}
        carouselAspectRatio="aspect-[16/9]"
        gridAspectRatio="aspect-[4/3]"
      />
    </section>
  );
};

export default PhotoGallery;
