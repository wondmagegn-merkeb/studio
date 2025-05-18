
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Milestone } from 'lucide-react';

const timelineEvents = [
  { year: "2022", description: "Our paths crossed, and a beautiful story began... 💕" },
  { year: "2023", description: "Our first adventure together, creating memories to last a lifetime. 🌍" },
  { year: "2024", description: "So many wonderful moments, laughter, and love shared. 📸" },
  { year: "2025", description: "Excited for all the new adventures and dreams we'll chase together! ✈️" },
];

const TimelineDisplay = () => {
  return (
    <section className="py-8 px-4">
      <h2 className="text-4xl font-script text-center mb-8 text-primary">Our Journey Together 🌹</h2>
      <div className="max-w-2xl mx-auto space-y-8">
        {timelineEvents.map((event, index) => (
          <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg bg-white/30 backdrop-blur-md border-primary/30">
            <CardHeader>
              <CardTitle className="text-2xl font-script text-primary flex items-center gap-2">
                <Milestone className="h-6 w-6 text-secondary-foreground" />
                {event.year}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/90">{event.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default TimelineDisplay;
