
"use client";

import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlayCircle, Music3 } from 'lucide-react';

const videoData = [
  {
    id: 1,
    src: "/images/video-poster-1.jpg", // Updated to local path
    alt: "Fun moment captured on video",
    caption: "Dancing in the rain 🎶",
    hint: "",
  },
  {
    id: 2,
    src: "https://placehold.co/300x533.png",
    alt: "Silly face compilation",
    caption: "Our goofy adventures 😂",
    hint: "couple silly faces",
  },
  {
    id: 3,
    src: "https://placehold.co/300x533.png",
    alt: "Singing our favorite song",
    caption: "Karaoke night stars ⭐",
    hint: "couple singing karaoke",
  },
];

const VideoHighlights = () => {
  return (
    <section id="videos" className="py-12 px-4 text-center">
      <h2 className="text-4xl font-script mb-4 text-primary drop-shadow-md">
        Our Fun Reels 🎬
      </h2>
      <p className="text-lg text-foreground/80 mb-10 flex items-center justify-center gap-2">
        <Music3 className="h-5 w-5 text-secondary" />
        Memories scored to the music of our hearts.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
        {videoData.map((video) => (
          <Card key={video.id} className="shadow-xl rounded-xl overflow-hidden bg-card/70 backdrop-blur-md border-secondary/30 group transform hover:scale-105 transition-transform duration-300">
            <CardContent className="p-0 relative">
              <Image
                src={video.src}
                alt={video.alt}
                width={300}
                height={533}
                className="object-cover w-full h-auto aspect-[9/16]"
                data-ai-hint={video.src.startsWith('http') ? video.hint : undefined}
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <PlayCircle className="h-16 w-16 text-white/80" />
              </div>
            </CardContent>
            <CardFooter className="p-3 bg-background/50">
              <p className="text-sm text-center w-full text-foreground/90">{video.caption}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default VideoHighlights;
