
"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Music2, Disc3 } from 'lucide-react'; // Added Disc3
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const MusicControl = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // TODO: Replace with the actual path or URL to your song file
  const audioSrc = ""; // Example: "/music/our-song.mp3" or "https://example.com/our-song.mp3"
  
  const songDetails = {
    title: "Our Special Tune",
    artist: "A Melody of Love",
  };

  useEffect(() => {
    if (audioRef.current && audioSrc) {
      audioRef.current.src = audioSrc;
      // Optional: auto-play if an audio source is provided.
      // audioRef.current.play().catch(error => console.error("Error auto-playing audio:", error));
      // setIsPlaying(true);
    } else if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, [audioSrc]);

  const togglePlayPause = () => {
    if (!audioRef.current || !audioSrc) {
      console.warn("No audio source loaded. Please set the 'audioSrc' variable.");
      return;
    }
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => console.error("Error playing audio:", error));
    }
    setIsPlaying(!isPlaying);
  };

  const lyrics = `
(Verse 1)
In a world of fleeting moments, you're my constant star,
Guiding light in darkness, no matter how far.
With every beat of my heart, your name I softly call,
You're the beautiful answer to my soul's enthrall.

(Chorus)
This is our song, a melody of love,
Written in the heavens, sent from above.
Forever and always, my heart belongs to you,
In this eternal devotion, me and you.

(Verse 2)
Like a gentle breeze, you whispered in my life,
Chasing away the shadows, ending all my strife.
Your laughter is the sweetest sound, a symphony so clear,
In your loving arms, I conquer every fear.

(Chorus)
This is our song, a melody of love,
Written in the heavens, sent from above.
Forever and always, my heart belongs to you,
In this eternal devotion, me and you.
  `;

  return (
    <section className="py-8 px-4 text-center">
      <Card className="max-w-xl mx-auto shadow-lg rounded-lg bg-card/70 backdrop-blur-md border-primary/30">
        <CardHeader className="pb-4">
          <CardTitle className="text-3xl font-script text-primary flex items-center justify-center gap-2">
            <Music2 className="h-7 w-7" /> Our Song
          </CardTitle>
          <CardDescription className="text-sm text-foreground/80 flex items-center justify-center gap-1 pt-1">
            <Disc3 className="h-4 w-4 text-secondary"/> {songDetails.title} - {songDetails.artist}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={togglePlayPause}
            variant="outline"
            size="lg"
            className="mb-6 shadow-md hover:shadow-lg transition-shadow text-primary border-primary hover:bg-primary/10"
            aria-label={isPlaying ? "Pause music" : "Play music"}
            disabled={!audioSrc} 
          >
            {isPlaying ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
            {isPlaying ? 'Pause' : 'Play'} Our Tune
          </Button>
          
          <audio ref={audioRef} loop aria-hidden="true" />
          
          <div className="text-left max-h-60 overflow-y-auto p-4 bg-background/50 rounded-md whitespace-pre-line text-sm text-foreground/90">
            {lyrics.trim()}
          </div>

          {!audioSrc && (
            <p className="text-xs text-muted-foreground mt-3 p-2 bg-muted/50 rounded-md">
              To play 'Our Song', please update the <code>audioSrc</code> variable in the <code>MusicControl.tsx</code> file with your music file's path.
            </p>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default MusicControl;
