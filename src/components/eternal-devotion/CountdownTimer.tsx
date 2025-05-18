
"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarClock } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownItemProps {
  title: string;
  targetDate: string;
}

const CountdownInstance: React.FC<CountdownItemProps> = ({ title, targetDate }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

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

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, targetDate]); // Added timeLeft and targetDate to dependencies

  const timerComponents = Object.entries(timeLeft).map(([interval, value]) => {
    if (value === 0 && interval !== 'seconds' && timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0) return null; 
    if (value < 0) return null; // Don't show negative values once passed
    return (
      <div key={interval} className="text-center p-2 bg-background/20 backdrop-blur-sm rounded-lg shadow-md min-w-[60px]">
        <span className="text-3xl md:text-4xl font-bold text-primary">{value}</span>
        <span className="block text-xs uppercase text-foreground/80 pt-1">{interval}</span>
      </div>
    );
  }).filter(Boolean);

  const isEventPassed = +new Date(targetDate) - +new Date() <= 0;

  return (
    <Card className="shadow-lg rounded-xl bg-card/70 backdrop-blur-md border-primary/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl font-script text-primary flex items-center gap-2">
          <CalendarClock className="h-6 w-6" /> {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isEventPassed ? (
          <p className="text-xl text-center text-primary py-4">This special day has arrived or passed!</p>
        ) : timerComponents.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {timerComponents}
          </div>
        ) : (
          <p className="text-xl text-center text-primary py-4">Loading countdown...</p>
        )}
      </CardContent>
    </Card>
  );
};


interface CountdownTimerProps {
  countdownItems: Array<{ title: string; targetDate: string }>;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ countdownItems }) => {
  if (!countdownItems || countdownItems.length === 0) {
    return null;
  }

  return (
    <section className="py-12 px-4 text-center">
      <h2 className="text-4xl font-script mb-8 text-primary drop-shadow-md">Special Dates Countdown</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
        {countdownItems.map((item, index) => (
          <CountdownInstance key={index} title={item.title} targetDate={item.targetDate} />
        ))}
      </div>
    </section>
  );
};

export default CountdownTimer;
