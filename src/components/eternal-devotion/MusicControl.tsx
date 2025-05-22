
"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, ChevronLeft, ChevronRight, Music2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface Song {
  src: string;
  title: string;
  artist: string;
  lyrics: string;
}

// IMPORTANT: User must update this playlist with actual song paths and details
const playlist: Song[] = [
  { 
    src: "", // Example: "/music/our-special-song.mp3"
    title: "Our Special Tune", 
    artist: "A Melody of Love", 
    lyrics: `(Verse 1)
In a world of fleeting moments, you're my constant star,
A beacon shining brightly, no matter how near or far.
With every beat, my heart composes a symphony for you,
A love song whispered softly, in everything I do.

(Chorus)
This is our special tune, a melody just for us,
Woven with threads of laughter, and a love that's truly plus.
Dancing to its rhythm, in sunshine or in rain,
Forever in this moment, again and yet again.`
  },
  { 
    src: "", // Example: "/music/serenade-of-stars.mp3"
    title: "Serenade of Stars", 
    artist: "Cosmic Harmony", 
    lyrics: `(Verse 1)
Beneath a velvet sky, where constellations gleam,
We found a universe of love, living out a dream.
Each star a silent witness, to the promises we made,
In this celestial ballet, our destinies persuade.

(Chorus)
A serenade of stars, for you, my guiding light,
Illuminating pathways, through the darkest night.
Our love's a constellation, forever shining true,
My heart orbits only around the wonder that is you.`
  },
  { 
    src: "", // Example: "/music/echoes-of-forever.mp3"
    title: "Echoes of Forever", 
    artist: "Timeless Vows", 
    lyrics: `(Verse 1)
Time may dance and seasons turn, the world may rearrange,
But one thing stays unaltered, a love that will not change.
Like echoes in a canyon, my devotion will resound,
The truest, deepest feeling, that ever could be found.

(Chorus)
These are the echoes of forever, a promise I hold dear,
With every passing moment, my love for you is clear.
Hand in hand we'll journey, 'til the end of all our days,
Lost in love's sweet echoes, in a hundred thousand ways.`
  },
];

const MusicControl = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  const currentSong = playlist[currentSongIndex];
  const hasPlayableSongs = playlist.length > 0 && playlist.some(song => song.src);

  useEffect(() => {
    setIsReady(true); // Component is ready for browser APIs after mount
  }, []);
  
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong?.src) {
      if (audio) audio.pause();
      setIsPlaying(false);
      return;
    }
  
    const wasPlayingBeforeSrcChange = isPlaying;
    
    if (audio.src !== currentSong.src) { // Check if src actually changed
        audio.src = currentSong.src;
        audio.load(); 
    }
  
    if (wasPlayingBeforeSrcChange) {
      audio.play().catch(e => {
        console.warn('Error playing new song after switch:', e);
        setIsPlaying(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSongIndex, currentSong?.src]); // Removed 'isPlaying' from dependencies

  // Effect for initial autoplay of the first song
  useEffect(() => {
    const audio = audioRef.current;
    if (isReady && audio && currentSongIndex === 0 && playlist[0]?.src && !isPlaying) {
      if (audio.src !== playlist[0].src) {
        audio.src = playlist[0].src;
        audio.load();
      }
      audio.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(error => {
          console.warn("Audio autoplay for the first song failed. User interaction might be required.", error);
          setIsPlaying(false); 
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, playlist[0]?.src]); // Depends only on isReady and the first song's src
  

  const togglePlayPause = useCallback(() => {
    if (!audioRef.current || !currentSong?.src) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(error => {
          console.error("Error playing audio:", error);
          setIsPlaying(false); // Ensure state is false if play fails
        });
    }
  }, [isPlaying, currentSong?.src]);

  const playNextSong = useCallback(() => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  }, []);

  const playPreviousSong = useCallback(() => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length);
  }, []);

  const handleSongEnd = useCallback(() => {
    playNextSong();
  }, [playNextSong]);
  
  return (
    <section className="py-8 px-4 text-center">
      <Card className="max-w-xl mx-auto shadow-lg rounded-lg bg-card/70 backdrop-blur-md border-primary/30">
        <CardHeader className="pb-4">
          <CardTitle className="text-3xl font-script text-primary flex items-center justify-center gap-2">
            <Music2 className="h-7 w-7" /> Our Playlist
          </CardTitle>
          {currentSong && (
            <CardDescription className="text-sm text-foreground/80 pt-1">
              {currentSong.title} - {currentSong.artist}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Button
              onClick={playPreviousSong}
              variant="outline"
              size="icon"
              className="shadow-md hover:shadow-lg transition-shadow text-primary border-primary hover:bg-primary/10 rounded-full h-12 w-12"
              aria-label="Previous song"
              disabled={!hasPlayableSongs}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              onClick={togglePlayPause}
              variant="outline"
              size="icon"
              className="shadow-lg hover:shadow-xl transition-shadow text-primary border-primary hover:bg-primary/10 rounded-full h-16 w-16"
              aria-label={isPlaying ? "Pause current song" : "Play current song"}
              disabled={!hasPlayableSongs}
            >
              <Heart fill={isPlaying && hasPlayableSongs ? "currentColor" : "none"} className="h-8 w-8" />
            </Button>
            <Button
              onClick={playNextSong}
              variant="outline"
              size="icon"
              className="shadow-md hover:shadow-lg transition-shadow text-primary border-primary hover:bg-primary/10 rounded-full h-12 w-12"
              aria-label="Next song"
              disabled={!hasPlayableSongs}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
          
          <audio ref={audioRef} onEnded={handleSongEnd} />
          
          <div className="text-left max-h-60 overflow-y-auto p-4 bg-background/50 rounded-md whitespace-pre-line text-sm text-foreground/90 mb-6">
            {currentSong?.lyrics.trim() || "Lyrics will appear here..."}
          </div>

          {!hasPlayableSongs && (
             <p className="text-xs text-muted-foreground mt-6 p-2 bg-muted/50 rounded-md">
              To enjoy the playlist, please update the <code>playlist</code> array in the <code>MusicControl.tsx</code> file with your actual song file paths (<code>src</code> field) and details for each of the 3 songs. Autoplay of the first song will be attempted.
            </p>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default MusicControl;
