
"use client";

import { useEffect, useState } from 'react';

const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = Object.entries(timeLeft).map(([interval, value]) => {
    if (value <= 0 && interval !== 'days' && timeLeft.days === 0) return null; // Hide 0s unless it's days
    return (
      <div key={interval} className="text-center p-2 bg-white/20 backdrop-blur-sm rounded-lg shadow-md">
        <span className="text-3xl md:text-4xl font-bold text-primary">{value}</span>
        <span className="block text-xs uppercase text-foreground/80">{interval}</span>
      </div>
    );
  }).filter(Boolean);

  return (
    <section className="py-8 px-4 text-center">
      <h2 className="text-3xl font-script mb-6 text-primary">Counting down to our special day...</h2>
      {timerComponents.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-md mx-auto">
          {timerComponents}
        </div>
      ) : (
        <p className="text-2xl text-primary">Our special day is here!</p>
      )}
    </section>
  );
};

export default CountdownTimer;
