import React from 'react';
import { motion } from 'framer-motion';

const ThankYouScene = () => {
  // Generate random stable stars for background depth
  const backgroundStars = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5,
    opacity: Math.random() * 0.25 + 0.05
  }));

  // Generate 8 slow-moving orbit particles
  const particles = Array.from({ length: 8 }, (_, i) => {
    const angle = (i * Math.PI * 2) / 8;
    return {
      id: i,
      angle,
      radius: i % 2 === 0 ? 200 : 280,
      size: Math.random() * 2 + 2,
      duration: Math.random() * 20 + 20,
      direction: i % 3 === 0 ? -1 : 1,
      color: i % 2 === 0 ? '#ff4d6a' : '#8b5cf6'
    };
  });

  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: '#030305',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '"Neue Montreal", "SF Pro Display", "-apple-system", sans-serif'
    }}>
      {/* Cinematic Grain Texture */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.012,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 250 250\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          pointerEvents: 'none',
          zIndex: 4
        }}
      />

      {/* Atmospheric Central Aura */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: [0.35, 0.45, 0.35],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(255, 77, 106, 0.05) 0%, rgba(139, 92, 246, 0.04) 40%, rgba(37, 99, 235, 0.01) 70%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Deep Corner Bloom */}
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-10%',
          width: '50%',
          height: '50%',
          background: 'radial-gradient(circle, rgba(255, 77, 106, 0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Background Starfield */}
      {backgroundStars.map((star) => (
        <div
          key={star.id}
          style={{
            position: 'absolute',
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            borderRadius: '50%',
            background: '#ffffff',
            opacity: star.opacity,
            pointerEvents: 'none',
            zIndex: 1
          }}
        />
      ))}

      {/* Elegant Vector Orbital Rings */}
      <div style={{
        position: 'absolute',
        width: '800px',
        height: '800px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 2
      }}>
        <svg width="800" height="800" viewBox="0 0 800 800" style={{ transform: 'rotate(-45deg)' }}>
          {/* Inner ring */}
          <motion.circle
            cx="400"
            cy="400"
            r="200"
            fill="none"
            stroke="rgba(255, 255, 255, 0.03)"
            strokeWidth="0.8"
            strokeDasharray="4, 12"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
          />

          {/* Middle ring */}
          <motion.circle
            cx="400"
            cy="400"
            r="280"
            fill="none"
            stroke="rgba(255, 77, 106, 0.05)"
            strokeWidth="0.8"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 110, ease: "linear" }}
          />

          {/* Outer ring */}
          <motion.circle
            cx="400"
            cy="400"
            r="360"
            fill="none"
            stroke="rgba(139, 92, 246, 0.04)"
            strokeWidth="1.2"
            strokeDasharray="160, 400"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 140, ease: "linear" }}
          />
        </svg>

        {/* Orbiting Signal Particles */}
        {particles.map((p) => {
          const rotationAngle = p.direction === 1 ? [0, 360] : [360, 0];
          return (
            <motion.div
              key={p.id}
              animate={{ rotate: rotationAngle }}
              transition={{
                repeat: Infinity,
                duration: p.duration,
                ease: "linear"
              }}
              style={{
                position: 'absolute',
                width: `${p.radius * 2}px`,
                height: `${p.radius * 2}px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end'
              }}
            >
              <div
                style={{
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  borderRadius: '50%',
                  background: p.color,
                  boxShadow: `0 0 10px ${p.color}`,
                  opacity: 0.35,
                  marginRight: `-${p.size / 2}px`
                }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Main Core Typography Lockup */}
      <div style={{
        textAlign: 'center',
        zIndex: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Core Thank You Header */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          style={{
            fontSize: '4.2rem',
            fontWeight: 200,
            color: '#ffffff',
            margin: 0,
            padding: 0,
            letterSpacing: '-0.03em',
            fontFamily: '"Neue Montreal", "SF Pro Display", sans-serif',
            textShadow: '0 0 40px rgba(255, 255, 255, 0.1)'
          }}
        >
          Thank you.
        </motion.h1>

        {/* Subtitle / Caption */}
        <motion.div
          initial={{ opacity: 0, letterSpacing: '0.2em' }}
          animate={{ opacity: 0.4, letterSpacing: '0.35em' }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1], delay: 1.5 }}
          style={{
            marginTop: '20px',
            fontSize: '9.5px',
            fontWeight: 600,
            color: '#ffffff',
            textTransform: 'uppercase'
          }}
        >
          Orbital Ecosystem &middot; Group 6
        </motion.div>
      </div>

      {/* Faint Continuity Footer Statement */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ duration: 2.0, ease: "easeOut", delay: 2.8 }}
        style={{
          position: 'absolute',
          bottom: '10%',
          fontSize: '1.6rem',
          fontWeight: 300,
          color: '#ffffff',
          letterSpacing: '-0.02em',
          textAlign: 'center',
          lineHeight: '1.3',
          fontFamily: '"Neue Montreal", sans-serif'
        }}
      >
        <span>Built for continuity. </span>
        <span style={{ color: 'rgba(255, 255, 255, 0.55)' }}>Designed for the future.</span>
      </motion.div>
    </div>
  );
};

export default ThankYouScene;
