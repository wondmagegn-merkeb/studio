
"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const quotes = [
  "You are the reason for my smile. 😊",
  "Forever isn’t long enough with you. 💞",
  "My heart is yours, always. 💖",
  "You light up my world. 🌟",
  "With you, every moment is magic. ✨"
];

const QuoteCarousel = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000); // Change quote every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="py-8 px-4 text-center">
      <Card className="max-w-lg mx-auto bg-white/30 backdrop-blur-md shadow-xl border-primary/50 rounded-xl">
        <CardContent className="p-6">
          <p className="text-2xl font-script italic text-primary min-h-[3em]">
            {quotes[currentQuoteIndex]}
          </p>
        </CardContent>
      </Card>
    </section>
  );
};

export default QuoteCarousel;
