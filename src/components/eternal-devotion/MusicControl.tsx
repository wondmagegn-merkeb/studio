
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
    src: "", // Example: "/music/song1.mp3"
    title: "First Romantic Melody", 
    artist: "Our Love Story", 
    lyrics: `(Verse 1)
A whisper soft, a gentle start,
Two souls entwined, a beating heart.
This is the first note, sweet and low,
Of a love story, beginning to grow.

(Chorus)
Our serenade, for you and me,
Playing on, for eternity.
Each word a vow, each note a kiss,
Lost in this moment, pure love's bliss.`
  },
  { 
    src: "", // Example: "/music/song2.mp3"
    title: "Echoes of Our Laughter", 
    artist: "Joyful Hearts", 
    lyrics: `(Verse 1)
Remember days, beneath the sun,
Where every moment, joy had spun.
Your happy laugh, a melody,
Echoing through my memory.

(Chorus)
These are the echoes, bright and clear,
Chasing away all doubt and fear.
Our special song, a joyful sound,
The happiest love, I've ever found.`
  },
  { 
    src: "", // Example: "/music/song3.mp3"
    title: "Forever's Promise", 
    artist: "Eternal Devotion", 
    lyrics: `(Verse 1)
Through changing seasons, come what may,
My love for you won't fade away.
A promise whispered, soft and true,
My forever starts and ends with you.

(Chorus)
This is our promise, sealed with a tune,
Beneath the stars, beneath the moon.
Hand in hand, our journey's long,
Forever together, where we belong.`
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
    // Component is ready after mount for browser APIs
    setIsReady(true);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong?.src) {
      if (audio) audio.pause();
      setIsPlaying(false);
      return;
    }

    const wasPlayingBeforeSrcChange = isPlaying;
    
    if (audio.src !== currentSong.src) {
        audio.src = currentSong.src;
        audio.load(); // Important to load the new source
    }

    if (wasPlayingBeforeSrcChange) {
      audio.play().catch(e => {
        console.warn('Error playing new song after switch:', e);
        setIsPlaying(false);
      });
    } else {
      // If it wasn't playing, do nothing here, play is initiated by togglePlayPause or initial autoplay
    }

  }, [currentSongIndex, currentSong?.src]);

  // Effect for initial autoplay of the first song
  useEffect(() => {
    const audio = audioRef.current;
    if (isReady && audio && currentSongIndex === 0 && playlist[0]?.src && !isPlaying) {
      // Ensure src is set for the first song if not already
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
  }, [isReady, playlist[0]?.src]); // Depends on the first song's src and component readiness

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
          setIsPlaying(false);
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
              To enjoy the playlist, please update the <code>playlist</code> array in the <code>MusicControl.tsx</code> file with your actual song file paths and details for each of the 3 songs. Autoplay of the first song will be attempted.
            </p>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default MusicControl;
