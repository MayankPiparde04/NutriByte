// app/components/AnimatedCanvas.tsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useMemo, useState } from "react";

interface Particle {
  id: number;
  x: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
  fallDistance: number;
  splashDistance: number;
  splashWaveCount: number;
  splashAngle: number;
  rainType: "heavy" | "soft";
}

interface GrassBlade {
  id: number;
  x: number;
  height: number;
  width: number;
  color: string;
  delay: number;
  swayAmount: number;
  curve: number;
  layer: number;
  rotation: number;
}

const generateParticles = (count: number): Particle[] => {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    // Starting x position spread across width
    const x = 5 + Math.random() * 90;

    // Rain type - 30% heavy, 70% soft
    const rainType = Math.random() < 0.3 ? "heavy" : "soft";

    // Smaller droplet sizes overall
    const baseSize = rainType === "heavy" ? 0.15 : 0.08;
    const size = baseSize + Math.random() * (rainType === "heavy" ? 0.2 : 0.1);

    // Speed/duration varies by size and rain type
    const speedFactor = 1 / (0.3 + size * 0.6);
    const duration =
      (rainType === "heavy" ? 1.2 : 2) + Math.random() * 1.5 * speedFactor;

    // Distance to fall - random distribution across screen
    const fallDistance = 70 + Math.random() * 25;

    // Each drop has unique splash properties
    const splashDistance = size * (2 + Math.random() * 4);
    const splashWaveCount = Math.floor(1 + Math.random() * 3); // 1-3 waves
    const splashAngle = Math.random() * 30 - 15; // -15 to 15 degrees

    // Water droplet colors - natural blues/silvers
    const hue = 200 + Math.random() * 20;
    const saturation = 20 + Math.random() * 40;
    const lightness = 60 + Math.random() * 20;
    const opacity = 0.3 + Math.random() * 0.3;

    particles.push({
      id: i,
      x,
      size,
      color: `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity})`,
      duration,
      delay: Math.random() * 8, // More staggered drops
      fallDistance,
      splashDistance,
      splashWaveCount,
      splashAngle,
      rainType,
    });
  }
  return particles;
};

const generateGrass = (count: number): GrassBlade[] => {
  const blades: GrassBlade[] = [];

  // Create layers of grass for depth effect
  const layerCount = 3;
  const bladesPerLayer = Math.floor(count / layerCount);

  for (let layer = 0; layer < layerCount; layer++) {
    for (let i = 0; i < bladesPerLayer; i++) {
      // Create grass blades across the bottom with slight randomness
      const x = (i * 100) / bladesPerLayer + (Math.random() * 3 - 1.5);

      // Vary properties based on layer (foreground/midground/background)
      const layerFactor = 1 - layer * 0.2; // 1.0, 0.8, 0.6 for depth

      // More varied height
      const height = (3 + Math.random() * 8) * layerFactor;

      // Thinner blades
      const width = (0.05 + Math.random() * 0.15) * layerFactor;

      // Natural green colors - no lime
      const hue = 90 + Math.random() * 40; // green to dark green
      const saturation = 30 + Math.random() * 40; // more natural, less saturated
      const lightness = (25 + Math.random() * 30) * layerFactor; // darker for foreground

      // Add curve and rotation variation for realism
      const curve = Math.random() * 3 - 1.5; // -1.5 to 1.5 curvature
      const rotation = Math.random() * 15 - 7.5; // -7.5 to 7.5 degrees

      blades.push({
        id: layer * 1000 + i,
        x,
        height,
        width,
        color: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
        delay: Math.random() * 0.5,
        swayAmount: (0.3 + Math.random() * 1.2) * layerFactor,
        curve,
        layer,
        rotation,
      });
    }
  }

  // Sort by layer to ensure proper rendering order
  return blades.sort((a, b) => b.layer - a.layer);
};

// Custom hook for wind effect
const useWindEffect = () => {
  const [windStrength, setWindStrength] = useState(0.5);
  const [windDirection, setWindDirection] = useState(1);

  useEffect(() => {
    const windInterval = setInterval(() => {
      // Change wind strength periodically
      setWindStrength(0.2 + Math.random() * 1.0);
      // Occasionally change wind direction
      if (Math.random() < 0.3) {
        setWindDirection((prev) => prev * -1);
      }
    }, 4000);

    return () => clearInterval(windInterval);
  }, []);

  return { strength: windStrength, direction: windDirection };
};

export default function AnimatedCanvas({
  compact = false,
}: {
  compact?: boolean;
}) {
  const particles = useMemo(() => generateParticles(60), []); // More particles for varied rain
  const grassBlades = useMemo(() => generateGrass(200), []); // Many more grass blades
  const canvasRef = useRef<HTMLDivElement>(null);
  const wind = useWindEffect();

  const [dimensions, setDimensions] = useState({
    width: "100%",
    height: "100vh",
  });

  useEffect(() => {
    if (compact) {
      setDimensions({ width: "100%", height: "400px" });
    }
  }, [compact]);

  return (
    <div
      ref={canvasRef}
      className={`relative w-full ${
        compact ? "h-96" : "h-screen"
      } overflow-hidden`}
      style={{
        background:
          "linear-gradient(135deg, #1a242b 0%, #1a2a30 50%, #192630 100%)",
        willChange: "transform",
      }}
      role="banner"
      aria-label="Animated rain and grass canvas"
    >
      {/* Natural dark background - no lime */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-slate-800/20 to-blue-900/10" />

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(30, 64, 90, 0.01)" />
            <stop offset="100%" stopColor="rgba(40, 70, 90, 0.05)" />
          </linearGradient>

          <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="0.3" />
            <feOffset dx="0.2" dy="0.3" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.15" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="100%" height="100%" fill="url(#waterGradient)" />

        {/* Ground/soil at bottom - more natural brown */}
        <rect
          x="0"
          y="90"
          width="100%"
          height="10"
          fill="rgba(40, 30, 25, 0.9)"
        />

        {/* Layered grass - render in sorted order for depth */}
        {grassBlades.map((blade) => (
          <motion.path
            key={`grass-${blade.id}`}
            d={`M${blade.x},90 
                C${blade.x - blade.width - blade.curve},${
              90 - blade.height / 3
            } 
                 ${blade.x + blade.width + blade.curve},${
              90 - (blade.height * 2) / 3
            } 
                 ${blade.x + blade.curve / 2},${90 - blade.height}`}
            stroke={blade.color}
            strokeWidth={blade.width}
            fill="none"
            strokeLinecap="round"
            style={{
              transformOrigin: `${blade.x}px 90px`,
              opacity: 0.7 + blade.layer * 0.1,
            }}
            animate={{
              d: [
                `M${blade.x},90 
                C${blade.x - blade.width - blade.curve},${
                  90 - blade.height / 3
                } 
                 ${blade.x + blade.width + blade.curve},${
                  90 - (blade.height * 2) / 3
                } 
                 ${blade.x + blade.curve / 2},${90 - blade.height}`,

                `M${blade.x},90 
                C${
                  blade.x -
                  blade.width -
                  blade.curve -
                  blade.swayAmount * wind.strength * wind.direction
                },${90 - blade.height / 3} 
                 ${
                   blade.x +
                   blade.width +
                   blade.curve +
                   blade.swayAmount * wind.strength * wind.direction
                 },${90 - (blade.height * 2) / 3} 
                 ${
                   blade.x +
                   blade.curve / 2 +
                   blade.swayAmount * wind.strength * wind.direction * 1.5
                 },${90 - blade.height}`,

                `M${blade.x},90 
                C${blade.x - blade.width - blade.curve},${
                  90 - blade.height / 3
                } 
                 ${blade.x + blade.width + blade.curve},${
                  90 - (blade.height * 2) / 3
                } 
                 ${blade.x + blade.curve / 2},${90 - blade.height}`,
              ],
              rotate: [
                blade.rotation - 1,
                blade.rotation + wind.strength * wind.direction * 2,
                blade.rotation - 1,
              ],
            }}
            transition={{
              duration: 2 + blade.delay + blade.layer * 0.3,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}

        {/* Rain droplets - mixed heavy and soft */}
        {particles.map((particle) => (
          <g key={`drop-${particle.id}`} style={{ willChange: "transform" }}>
            {/* Main water droplet with realistic teardrop shape */}
            <motion.path
              d={`
                M${particle.x},${10 - particle.size} 
                C${particle.x - particle.size},${10 - particle.size / 2} 
                 ${particle.x - particle.size},${10 + particle.size / 2} 
                 ${particle.x},${10 + particle.size}
                C${particle.x + particle.size},${10 + particle.size / 2} 
                 ${particle.x + particle.size},${10 - particle.size / 2} 
                 ${particle.x},${10 - particle.size}
              `}
              fill={particle.color}
              filter="url(#dropShadow)"
              initial={{ y: -10, opacity: 0 }}
              animate={{
                y: [0, particle.fallDistance],
                scaleY: [1, particle.rainType === "heavy" ? 1.3 : 1.1],
                scaleX: [1, particle.rainType === "heavy" ? 0.7 : 0.9],
                opacity: [0, particle.rainType === "heavy" ? 0.8 : 0.6, 0],
                rotate: [
                  0,
                  particle.rainType === "heavy"
                    ? particle.splashAngle / 3
                    : particle.splashAngle / 5,
                ],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                repeatDelay: particle.rainType === "heavy" ? 0.2 : 0.5,
                times: [0, 0.95, 1],
                ease: ["easeIn", "easeOut"],
              }}
              style={{ transformOrigin: "center" }}
            />

            {/* Individual splash effects with multiple waves */}
            {[...Array(particle.splashWaveCount)].map((_, waveIndex) => (
              <motion.g
                key={`splash-${particle.id}-${waveIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0] }}
                transition={{
                  duration: particle.duration * 0.3,
                  delay:
                    particle.delay + particle.duration * 0.9 + waveIndex * 0.08,
                  repeat: Infinity,
                  repeatDelay:
                    particle.duration +
                    (particle.rainType === "heavy" ? 0.2 : 0.5),
                }}
              >
                {/* Left splash particles */}
                <motion.circle
                  cx={particle.x}
                  cy={particle.fallDistance}
                  r={particle.size * (0.3 - waveIndex * 0.05)}
                  fill={particle.color}
                  animate={{
                    cx: [
                      particle.x,
                      particle.x -
                        particle.splashDistance *
                          (0.6 - waveIndex * 0.15) *
                          Math.cos(
                            ((-90 + particle.splashAngle) * Math.PI) / 180
                          ),
                    ],
                    cy: [
                      particle.fallDistance,
                      particle.fallDistance -
                        particle.splashDistance *
                          (0.4 - waveIndex * 0.1) *
                          Math.sin(
                            ((-90 + particle.splashAngle) * Math.PI) / 180
                          ),
                    ],
                  }}
                  transition={{
                    duration: particle.duration * (0.3 - waveIndex * 0.05),
                    repeat: Infinity,
                    repeatDelay:
                      particle.duration +
                      (particle.rainType === "heavy" ? 0.2 : 0.5),
                    ease: "easeOut",
                  }}
                />

                {/* Right splash particles */}
                <motion.circle
                  cx={particle.x}
                  cy={particle.fallDistance}
                  r={particle.size * (0.25 - waveIndex * 0.05)}
                  fill={particle.color}
                  animate={{
                    cx: [
                      particle.x,
                      particle.x +
                        particle.splashDistance *
                          (0.5 - waveIndex * 0.12) *
                          Math.cos(
                            ((90 + particle.splashAngle) * Math.PI) / 180
                          ),
                    ],
                    cy: [
                      particle.fallDistance,
                      particle.fallDistance -
                        particle.splashDistance *
                          (0.35 - waveIndex * 0.08) *
                          Math.sin(
                            ((90 + particle.splashAngle) * Math.PI) / 180
                          ),
                    ],
                  }}
                  transition={{
                    duration: particle.duration * (0.25 - waveIndex * 0.04),
                    repeat: Infinity,
                    repeatDelay:
                      particle.duration +
                      (particle.rainType === "heavy" ? 0.2 : 0.5),
                    ease: "easeOut",
                  }}
                />

                {/* Additional angled splash particles for variety */}
                <motion.circle
                  cx={particle.x}
                  cy={particle.fallDistance}
                  r={particle.size * (0.2 - waveIndex * 0.05)}
                  fill={particle.color}
                  animate={{
                    cx: [
                      particle.x,
                      particle.x +
                        particle.splashDistance *
                          (0.4 - waveIndex * 0.1) *
                          Math.cos(
                            ((30 + particle.splashAngle) * Math.PI) / 180
                          ),
                    ],
                    cy: [
                      particle.fallDistance,
                      particle.fallDistance -
                        particle.splashDistance *
                          (0.3 - waveIndex * 0.07) *
                          Math.sin(
                            ((30 + particle.splashAngle) * Math.PI) / 180
                          ),
                    ],
                  }}
                  transition={{
                    duration: particle.duration * (0.2 - waveIndex * 0.03),
                    repeat: Infinity,
                    repeatDelay:
                      particle.duration +
                      (particle.rainType === "heavy" ? 0.2 : 0.5),
                    ease: "easeOut",
                  }}
                />
              </motion.g>
            ))}

            {/* Water ripple at impact point - individual for each drop */}
            {particle.rainType === "heavy" && (
              <motion.circle
                cx={particle.x}
                cy={90}
                r={0.1}
                stroke={particle.color}
                strokeWidth={0.15}
                fill="none"
                initial={{ r: 0, opacity: 0 }}
                animate={{
                  r: [0, particle.size * 3],
                  opacity: [0, 0.6, 0],
                  strokeWidth: [0.2, 0.05],
                }}
                transition={{
                  duration: particle.duration * 0.6,
                  repeat: Infinity,
                  delay: particle.delay + particle.duration * 0.9,
                  repeatDelay: particle.duration + 0.2,
                  ease: "easeOut",
                }}
              />
            )}
          </g>
        ))}
      </svg>

      {/* Water pooling at bottom */}
      <div className="absolute bottom-0 w-full">
        <div className="h-2 bg-gradient-to-t from-blue-600/5 to-transparent" />
      </div>

      {/* Center content - updated to use natural blue tones instead of lime */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1
            className={`text-white font-bold tracking-wider ${
              compact ? "text-3xl md:text-4xl" : "text-5xl md:text-6xl"
            }`}
            style={{
              textShadow: "0 0 15px rgba(100, 149, 237, 0.5)",
              willChange: "transform",
            }}
            animate={{
              textShadow: [
                "0 0 15px rgba(100, 149, 237, 0.3)",
                "0 0 25px rgba(100, 149, 237, 0.5)",
                "0 0 15px rgba(100, 149, 237, 0.3)",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            MAYANK
          </motion.h1>

          {!compact && (
            <motion.div
              className="w-24 h-0.5 bg-gradient-to-r from-blue-400/50 to-indigo-400/50 mx-auto rounded-full mt-2"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}
