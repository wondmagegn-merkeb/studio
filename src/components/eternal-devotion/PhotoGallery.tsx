
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

const photos = [
  { src: "https://placehold.co/300x400.png", alt: "Cherished memory 1", hint: "couple smiling" },
  { src: "https://placehold.co/400x300.png", alt: "Cherished memory 2", hint: "nature landscape" },
  { src: "https://placehold.co/300x350.png", alt: "Cherished memory 3", hint: "city lights" },
  { src: "https://placehold.co/350x400.png", alt: "Cherished memory 4", hint: "beach sunset" },
  { src: "https://placehold.co/400x400.png", alt: "Cherished memory 5", hint: "happy moment" },
];

const PhotoGallery = () => {
  return (
    <section aria-labelledby="gallery-title" className="py-8 px-4">
      <h2 id="gallery-title" className="text-4xl font-script text-center mb-8 text-primary">Our Moments</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {photos.map((photo, index) => (
          <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
            <CardContent className="p-0">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={400}
                height={400}
                className="object-cover w-full h-auto aspect-[3/4] sm:aspect-square md:aspect-[4/5]"
                data-ai-hint={photo.hint}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default PhotoGallery;
