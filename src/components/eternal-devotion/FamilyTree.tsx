
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, MapPin, GraduationCap, Church } from "lucide-react";

interface FamilyTreeProps {
  recipientName: string;
  senderName: string;
}

const FamilyTree: React.FC<FamilyTreeProps> = ({ recipientName, senderName }) => {
  return (
    <section id="family" className="py-12 px-4 text-center">
      <h2 className="text-4xl font-script mb-10 text-primary drop-shadow-md">
        Our Growing Family Tree 🌱
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
        {/* Her Parents */}
        <Card className="shadow-lg rounded-xl bg-card/70 backdrop-blur-md border-primary/30">
          <CardHeader>
            <CardTitle className="text-2xl font-script text-primary flex items-center justify-center gap-2">
              {recipientName}'s Parents
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20 border-2 border-secondary">
                <AvatarImage src="https://placehold.co/128x128.png" alt="Her Father" data-ai-hint="man portrait" />
                <AvatarFallback>HF</AvatarFallback>
              </Avatar>
              <Avatar className="w-20 h-20 border-2 border-secondary">
                <AvatarImage src="https://placehold.co/128x128.png" alt="Her Mother" data-ai-hint="woman portrait" />
                <AvatarFallback>HM</AvatarFallback>
              </Avatar>
            </div>
            <p className="text-sm text-muted-foreground">(Names to be cherished)</p>
          </CardContent>
        </Card>

        {/* My Parents */}
        <Card className="shadow-lg rounded-xl bg-card/70 backdrop-blur-md border-primary/30">
          <CardHeader>
            <CardTitle className="text-2xl font-script text-primary flex items-center justify-center gap-2">
              {senderName}'s Parents
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20 border-2 border-secondary">
                <AvatarImage src="https://placehold.co/128x128.png" alt="My Father" data-ai-hint="man portrait" />
                <AvatarFallback>MF</AvatarFallback>
              </Avatar>
              <Avatar className="w-20 h-20 border-2 border-secondary">
                <AvatarImage src="https://placehold.co/128x128.png" alt="My Mother" data-ai-hint="woman portrait" />
                <AvatarFallback>MM</AvatarFallback>
              </Avatar>
            </div>
            <p className="text-sm text-muted-foreground">(Names held dear)</p>
          </CardContent>
        </Card>
      </div>

      {/* Connecting Visual (Optional) */}
      <div className="flex justify-center items-center my-8">
        <Heart className="w-10 h-10 text-primary animate-pulse" />
      </div>
      
      {/* Us (Couple) */}
      <Card className="max-w-3xl mx-auto shadow-xl rounded-xl bg-card/80 backdrop-blur-lg border-primary/40 mb-12">
        <CardHeader>
          <CardTitle className="text-3xl font-script text-primary flex items-center justify-center gap-3">
            <Users className="w-8 h-8" /> Us, Together
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-around gap-6 md:gap-8">
            {/* Recipient Profile Card */}
            <div className="profile-card-container">
              <div className="profile-card-3d flex flex-col items-center space-y-3 bg-card/90 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                <Avatar className="w-28 h-28 border-4 border-primary">
                  <AvatarImage src="https://placehold.co/128x128.png" alt={`${recipientName} at Wachemo University`} data-ai-hint="woman university graduate" />
                  <AvatarFallback>{recipientName.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="font-semibold text-lg text-foreground">{recipientName}</p>
                <div className="flex items-center text-sm text-muted-foreground gap-1">
                  <MapPin className="w-4 h-4 text-secondary" /> Debretabor
                </div>
              </div>
            </div>
            
            <Heart className="w-8 h-8 text-primary hidden md:block self-center" />

            {/* Sender Profile Card */}
            <div className="profile-card-container">
              <div className="profile-card-3d flex flex-col items-center space-y-3 bg-card/90 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                <Avatar className="w-28 h-28 border-4 border-primary">
                  <AvatarImage src="https://placehold.co/128x128.png" alt={`${senderName} at Wachemo University`} data-ai-hint="man university graduate" />
                  <AvatarFallback>{senderName.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="font-semibold text-lg text-foreground">{senderName}</p>
                <div className="flex items-center text-sm text-muted-foreground gap-1">
                  <MapPin className="w-4 h-4 text-secondary" /> Hawassa
                </div>
              </div>
            </div>
          </div>
          <div className="text-center text-muted-foreground italic flex items-center justify-center gap-2 pt-4">
             <GraduationCap className="w-5 h-5 text-accent" /> Our journey began at Wachemo University.
          </div>
        </CardContent>
      </Card>

      {/* Future Children */}
      <Card className="max-w-xl mx-auto shadow-lg rounded-xl bg-card/70 backdrop-blur-md border-secondary/30 mb-12">
        <CardHeader>
          <CardTitle className="text-2xl font-script text-primary flex items-center justify-center gap-2">
            Our Future Blessings
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center space-x-4 p-6">
          <Avatar className="w-16 h-16 border-2 border-accent">
            <AvatarImage src="https://placehold.co/128x128.png" alt="Future Child 1" data-ai-hint="child illustration happy" />
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
          <Avatar className="w-16 h-16 border-2 border-accent">
            <AvatarImage src="https://placehold.co/128x128.png" alt="Future Child 2" data-ai-hint="child illustration joyful" />
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
          <Avatar className="w-16 h-16 border-2 border-accent">
            <AvatarImage src="https://placehold.co/128x128.png" alt="Future Child 3" data-ai-hint="child illustration cute" />
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
        </CardContent>
      </Card>
      
      {/* Marriage Plans */}
      <Card className="max-w-2xl mx-auto shadow-lg rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-md border-primary/50">
        <CardContent className="p-6 text-center">
            <Church className="w-12 h-12 text-primary mx-auto mb-4" />
          <p className="text-xl font-semibold text-foreground/90 leading-relaxed">
            We joyfully anticipate our Orthodox Church Kurban ceremony in 4 years, uniting our families and beginning our own chapter together.
          </p>
        </CardContent>
      </Card>
    </section>
  );
};

export default FamilyTree;
