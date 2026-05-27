import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Cpu } from 'lucide-react';

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
    <div 
      className="thank-you-scene-full"
      style={{
        width: '100vw',
        height: '100vh',
        background: 'radial-gradient(circle at 50% 50%, #0d0f19 0%, #040508 60%, #000000 100%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Neue Montreal", "SF Pro Display", "-apple-system", sans-serif'
      }}
    >
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

      {/* Atmospheric Central Aura (High Visibility) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: [0.7, 0.9, 0.7],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(255, 77, 106, 0.22) 0%, rgba(139, 92, 246, 0.16) 40%, rgba(37, 99, 235, 0.08) 70%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Deep Red Bloom bottom-left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.75 }}
        transition={{ duration: 4.0 }}
        style={{
          position: 'absolute',
          bottom: '-20%',
          left: '-20%',
          width: '80%',
          height: '80%',
          background: 'radial-gradient(circle at 30% 70%, rgba(255, 77, 106, 0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Purple/Navy Glow top-right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.65 }}
        transition={{ duration: 4.5, delay: 0.3 }}
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-20%',
          width: '80%',
          height: '80%',
          background: 'radial-gradient(circle at 70% 30%, rgba(139, 92, 246, 0.14) 0%, rgba(37, 99, 235, 0.09) 60%, transparent 80%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Bottom-right glow to match particles */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 4.8, delay: 0.5 }}
        style={{
          position: 'absolute',
          bottom: '-20%',
          right: '-20%',
          width: '70%',
          height: '70%',
          background: 'radial-gradient(circle at 70% 70%, rgba(255, 77, 106, 0.12) 0%, rgba(139, 92, 246, 0.10) 50%, transparent 80%)',
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

        {/* Animated signal flow lines to cards */}
        <svg width="800" height="800" viewBox="0 0 800 800" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <defs>
            <linearGradient id="pulse-gradient-blue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(56, 182, 255, 0.4)" />
              <stop offset="100%" stopColor="rgba(56, 182, 255, 0.05)" />
            </linearGradient>
            <linearGradient id="pulse-gradient-red" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 77, 106, 0.4)" />
              <stop offset="100%" stopColor="rgba(255, 77, 106, 0.05)" />
            </linearGradient>
          </defs>
          <motion.path
            d="M 400 360 Q 300 400 220 500"
            fill="none"
            stroke="url(#pulse-gradient-blue)"
            strokeWidth="1.5"
            strokeDasharray="6, 35"
            animate={{ strokeDashoffset: [0, -41] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
          />
          <motion.path
            d="M 400 360 Q 500 400 580 500"
            fill="none"
            stroke="url(#pulse-gradient-red)"
            strokeWidth="1.5"
            strokeDasharray="6, 35"
            animate={{ strokeDashoffset: [0, -41] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'linear' }}
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
        justifyContent: 'center',
        gap: '40px',
        marginTop: '-20px'
      }}>
        {/* Core Thank You Header */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          style={{
            fontSize: '5.5rem',
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

        {/* Portal Entry Buttons */}
        <div style={{
          display: 'flex',
          gap: '28px',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}>
          {/* Subtle Connecting Link between Buttons */}
          <div style={{
            position: 'absolute',
            left: '160px',
            right: '160px',
            top: '50%',
            transform: 'translateY(-50%)',
            height: '1.5px',
            background: 'linear-gradient(90deg, rgba(56, 182, 255, 0.15) 0%, rgba(139, 92, 246, 0.35) 50%, rgba(255, 77, 106, 0.15) 100%)',
            zIndex: 1,
            pointerEvents: 'none'
          }} />

          {/* BUTTON 1 — COMPANION APP */}
          <motion.div
            onClick={() => window.open('https://medibank-student-companion.vercel.app/', '_blank')}
            initial={{ opacity: 0, x: -30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 1.0 }}
            style={{
              width: '330px',
              height: '220px',
              boxSizing: 'border-box',
              padding: '24px 30px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.005) 100%)',
              border: '1.5px solid rgba(56, 182, 255, 0.12)',
              boxShadow: '0 15px 35px rgba(0,0,0,0.65), 0 0 25px rgba(56, 182, 255, 0.04), inset 0 1px 0 rgba(255,255,255,0.05)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              cursor: 'pointer',
              zIndex: 2,
              position: 'relative',
              transition: 'box-shadow 0.4s ease, border-color 0.4s ease, background 0.4s ease'
            }}
            whileHover={{
              y: -8,
              scale: 1.03,
              background: 'linear-gradient(135deg, rgba(56, 182, 255, 0.08) 0%, rgba(56, 182, 255, 0.01) 100%)',
              borderColor: 'rgba(56, 182, 255, 0.45)',
              boxShadow: '0 25px 45px rgba(0,0,0,0.7), 0 0 35px rgba(56, 182, 255, 0.25), inset 0 1px 0 rgba(255,255,255,0.1)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Subtle inner glowing radial point */}
            <div style={{
              position: 'absolute',
              top: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(56, 182, 255, 0.22) 0%, transparent 70%)',
              filter: 'blur(10px)',
              pointerEvents: 'none',
              zIndex: 0
            }} />

            {/* Icon */}
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              background: 'rgba(56, 182, 255, 0.08)',
              border: '1px solid rgba(56, 182, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#38B6FF',
              marginBottom: '14px',
              boxShadow: '0 0 15px rgba(56, 182, 255, 0.1)',
              flexShrink: 0
            }}>
              <Smartphone size={24} strokeWidth={1.5} />
            </div>

            {/* Title */}
            <h2 style={{
              fontSize: '1.3rem',
              fontWeight: 700,
              color: '#ffffff',
              margin: '0 0 6px 0',
              letterSpacing: '-0.01em'
            }}>
              Explore Companion App
            </h2>

            {/* Description */}
            <p style={{
              fontSize: '0.88rem',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.45)',
              margin: 0,
              lineHeight: '1.4'
            }}>
              Student experience & engagement ecosystem
            </p>
          </motion.div>

          {/* BUTTON 2 — CONVERSION ENGINE */}
          <motion.div
            onClick={() => window.open('https://medibank-admin-engine.vercel.app/', '_blank')}
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
            style={{
              width: '330px',
              height: '220px',
              boxSizing: 'border-box',
              padding: '24px 30px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.005) 100%)',
              border: '1.5px solid rgba(255, 77, 106, 0.12)',
              boxShadow: '0 15px 35px rgba(0,0,0,0.65), 0 0 25px rgba(255, 77, 106, 0.04), inset 0 1px 0 rgba(255,255,255,0.05)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              cursor: 'pointer',
              zIndex: 2,
              position: 'relative',
              transition: 'box-shadow 0.4s ease, border-color 0.4s ease, background 0.4s ease'
            }}
            whileHover={{
              y: -8,
              scale: 1.03,
              background: 'linear-gradient(135deg, rgba(255, 77, 106, 0.08) 0%, rgba(255, 77, 106, 0.01) 100%)',
              borderColor: 'rgba(255, 77, 106, 0.45)',
              boxShadow: '0 25px 45px rgba(0,0,0,0.7), 0 0 35px rgba(255, 77, 106, 0.25), inset 0 1px 0 rgba(255,255,255,0.1)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Subtle inner glowing radial point */}
            <div style={{
              position: 'absolute',
              top: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 77, 106, 0.22) 0%, transparent 70%)',
              filter: 'blur(10px)',
              pointerEvents: 'none',
              zIndex: 0
            }} />

            {/* Icon */}
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              background: 'rgba(255, 77, 106, 0.08)',
              border: '1px solid rgba(255, 77, 106, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FF4D6A',
              marginBottom: '14px',
              boxShadow: '0 0 15px rgba(255, 77, 106, 0.1)',
              flexShrink: 0
            }}>
              <Cpu size={24} strokeWidth={1.5} />
            </div>

            {/* Title */}
            <h2 style={{
              fontSize: '1.3rem',
              fontWeight: 700,
              color: '#ffffff',
              margin: '0 0 6px 0',
              letterSpacing: '-0.01em'
            }}>
              Open Conversion Engine
            </h2>

            {/* Description */}
            <p style={{
              fontSize: '0.88rem',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.45)',
              margin: 0,
              lineHeight: '1.4'
            }}>
              Operational intelligence & behavioural AI
            </p>
          </motion.div>
        </div>
      </div>

      {/* Faint Continuity Footer Statement */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ duration: 2.0, ease: "easeOut", delay: 2.0 }}
        style={{
          position: 'absolute',
          bottom: '6%',
          fontSize: '0.85rem',
          fontWeight: 500,
          color: 'rgba(255, 255, 255, 0.65)',
          letterSpacing: '0.14em',
          textAlign: 'center',
          textTransform: 'uppercase',
          lineHeight: '1.5',
          fontFamily: '"Neue Montreal", sans-serif'
        }}
      >
        <span>Built for continuity. </span>
        <span style={{ color: 'rgba(255, 255, 255, 0.35)' }}>Designed for the future.</span>
      </motion.div>
    </div>
  );
};

export default ThankYouScene;
