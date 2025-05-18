
"use client";

import { useEffect, useState, useCallback } from 'react';
import { Heart } from 'lucide-react';
import { PetalIcon } from '@/components/icons/PetalIcon';

interface Particle {
  id: number;
  type: 'heart' | 'petal' | 'star';
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

    if (typeRandom < 0.4) {
      type = 'heart';
      const heartColors = ['#FF69B4' /* HotPink */, '#FFC0CB' /* Pink */, '#DB7093' /* PaleVioletRed */];
      color = heartColors[Math.floor(Math.random() * heartColors.length)];
    } else if (typeRandom < 0.8) {
      type = 'petal';
      const petalColors = ['#FFB6C1' /* LightPink */, '#FFA07A' /* LightSalmon */, '#FF7F50' /* Coral */];
      color = petalColors[Math.floor(Math.random() * petalColors.length)];
    } else {
      type = 'star';
      color = '#FFFFFF'; // White
    }

    const newParticle: Particle = {
      id: Date.now() + Math.random(),
      type,
      x: Math.random() * 100,
      y: -10, // Start above screen
      size: type === 'star' ? Math.random() * 2 + 1 : Math.random() * 15 + 10,
      opacity: type === 'star' ? Math.random() * 0.5 + 0.2 : Math.random() * 0.5 + 0.5,
      color,
      animationDuration: `${Math.random() * 5 + 5}s`, // 5 to 10 seconds
    };
    setParticles((prev) => [...prev, newParticle]);

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
    }, parseFloat(newParticle.animationDuration) * 1000 + 2000); // Remove after animation + buffer
  }, []);

  useEffect(() => {
    const intervalId = setInterval(createParticle, 500); // Create a new particle every 500ms
    return () => clearInterval(intervalId);
  }, [createParticle]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute ${particle.type === 'star' ? 'particle-twinkle' : 'particle-float'}`}
          style={{
            left: `${particle.x}vw`,
            top: `${particle.y}vh`, // Initial position, CSS animation will handle Y movement
            opacity: particle.opacity,
            animationDuration: particle.animationDuration,
            animationDelay: `${Math.random() * 2}s`, // Random delay for staggered start
          }}
        >
          {particle.type === 'heart' && (
            <Heart
              size={particle.size}
              color={particle.color}
              fill={particle.color}
              className="transform rotate-[-45deg]" // Initial rotation for hearts
            />
          )}
          {particle.type === 'petal' && (
            <PetalIcon
              style={{ width: particle.size, height: particle.size, color: particle.color }}
              className="transform" 
            />
          )}
          {particle.type === 'star' && (
            <div
              style={{
                width: particle.size,
                height: particle.size,
                backgroundColor: particle.color,
                borderRadius: '50%',
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ParticleBackground;
