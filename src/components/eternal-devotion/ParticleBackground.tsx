
"use client";

import { useEffect, useState, useCallback } from 'react';
import { Heart } from 'lucide-react';
import { PetalIcon } from '@/components/icons/PetalIcon';

interface Particle {
  id: number;
  type: 'heart' | 'petal';
  x: number;
  y: number;
  size: number;
  opacity: number;
  color?: string;
  animationDuration: string;
}

const ParticleBackground = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  const createParticle = useCallback(() => {
    const typeRandom = Math.random();
    let type: Particle['type'];
    let color: string | undefined;

    // Favor petals and hearts, remove stars
    if (typeRandom < 0.7) { // 70% chance for petal
      type = 'petal';
      const petalColors = [
        '#FFC0CB', /* Pink */ 
        '#FFB6C1', /* LightPink */ 
        '#FFA07A', /* LightSalmon */ 
        '#FF7F50', /* Coral */
        '#F8F8FF', /* GhostWhite */
        '#FFDAE0', /* Lighter Pink */
        'hsl(var(--primary) / 0.7)', /* Theme primary */
        'hsl(var(--secondary) / 0.6)' /* Theme secondary */
      ];
      color = petalColors[Math.floor(Math.random() * petalColors.length)];
    } else { // 30% chance for heart
      type = 'heart';
      const heartColors = [
        '#FF69B4', /* HotPink */ 
        '#DC143C', /* Crimson */ 
        '#C71585', /* MediumVioletRed */
        'hsl(var(--primary))', /* Theme primary */
      ];
      color = heartColors[Math.floor(Math.random() * heartColors.length)];
    }

    const newParticle: Particle = {
      id: Date.now() + Math.random(),
      type,
      x: Math.random() * 100,
      y: -10, // Start above screen
      size: Math.random() * 15 + 10, // Adjusted size for petals and hearts
      opacity: Math.random() * 0.4 + 0.4, // Opacity from 0.4 to 0.8
      color,
      animationDuration: `${Math.random() * 7 + 6}s`, // 6 to 13 seconds
    };
    setParticles((prev) => [...prev, newParticle]);

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
    }, parseFloat(newParticle.animationDuration) * 1000 + 2000); // Remove after animation + buffer
  }, []);

  useEffect(() => {
    const intervalId = setInterval(createParticle, 400); // Create a new particle more frequently
    return () => clearInterval(intervalId);
  }, [createParticle]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute particle-float" // All particles use float now
          style={{
            left: `${particle.x}vw`,
            top: `${particle.y}vh`, 
            opacity: particle.opacity,
            animationDuration: particle.animationDuration,
            animationDelay: `${Math.random() * 3}s`, 
          }}
        >
          {particle.type === 'heart' && (
            <Heart
              size={particle.size}
              color={particle.color}
              fill={particle.color}
              className="transform rotate-[-45deg]" 
            />
          )}
          {particle.type === 'petal' && (
            <PetalIcon
              style={{ width: particle.size, height: particle.size, color: particle.color }}
              className="transform" 
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ParticleBackground;
