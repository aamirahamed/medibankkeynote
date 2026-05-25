import React from 'react';
import { motion } from 'framer-motion';

const ThankYouScene = () => {
  // Dust motes for the atmospheric particles (fewer, calmer)
  const dustMotes = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 2 + 1.5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 30 + 25,
    delay: Math.random() * -30,
    opacity: Math.random() * 0.05 + 0.02
  }));

  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: '#020204',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '"SF Pro Display", "-apple-system", sans-serif'
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

      {/* Atmospheric Ambient Glows */}
      {/* Deep Red Bloom bottom-left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 4, ease: "easeOut" }}
        style={{
          position: 'absolute',
          bottom: '-15%',
          left: '-15%',
          width: '65%',
          height: '65%',
          background: 'radial-gradient(circle, rgba(255, 77, 106, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />
      
      {/* Deep Purple/Navy Glow top-right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 4.5, ease: "easeOut", delay: 0.3 }}
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '60%',
          height: '60%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, rgba(37, 99, 235, 0.02) 60%, transparent 80%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Subtle bottom-right bloom matching the YOU typography glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 4.8, ease: "easeOut", delay: 0.6 }}
        style={{
          position: 'absolute',
          bottom: '-20%',
          right: '-15%',
          width: '55%',
          height: '55%',
          background: 'radial-gradient(circle, rgba(255, 77, 106, 0.05) 0%, rgba(139, 92, 246, 0.04) 50%, transparent 80%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Floating Dust Motes */}
      {dustMotes.map((mote) => (
        <motion.div
          key={mote.id}
          animate={{
            y: ['105vh', '-5vh'],
            x: [`${mote.x}vw`, `${mote.x + (Math.sin(mote.id) * 3)}vw`]
          }}
          transition={{
            duration: mote.duration,
            repeat: Infinity,
            ease: "linear",
            delay: mote.delay
          }}
          style={{
            position: 'absolute',
            width: `${mote.size}px`,
            height: `${mote.size}px`,
            borderRadius: '50%',
            background: '#ffffff',
            opacity: mote.opacity,
            filter: 'blur(0.5px)',
            pointerEvents: 'none',
            zIndex: 2
          }}
        />
      ))}

      {/* ASYMMETRIC BACKGROUND LAYER 1: "THANK" (Top Left) */}
      <div 
        style={{
          position: 'absolute',
          top: '-8%',
          left: '-10%',
          width: '60%',
          height: '50%',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          zIndex: 2,
          pointerEvents: 'none'
        }}
      >
        <motion.h1
          initial={{ opacity: 0, scale: 1.05, filter: 'blur(12px)' }}
          animate={{ 
            opacity: [0.03, 0.05, 0.03],
            scale: 1,
            filter: ['blur(4px)', 'blur(6px)', 'blur(4px)']
          }}
          transition={{
            opacity: {
              repeat: Infinity,
              duration: 10,
              ease: "easeInOut",
              repeatType: "reverse"
            },
            filter: {
              repeat: Infinity,
              duration: 10,
              ease: "easeInOut",
              repeatType: "reverse"
            },
            scale: { duration: 4.0, ease: [0.16, 1, 0.3, 1] }
          }}
          style={{
            fontSize: '22vw',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            margin: 0,
            padding: 0,
            lineHeight: '0.8',
            fontFamily: '"SF Pro Display", "Neue Montreal", "Satoshi", sans-serif',
            color: 'rgba(255, 255, 255, 0.15)',
            whiteSpace: 'nowrap'
          }}
        >
          THANK
        </motion.h1>
      </div>

      {/* ASYMMETRIC BACKGROUND LAYER 2: "YOU" (Bottom Right) */}
      <div 
        style={{
          position: 'absolute',
          bottom: '-12%',
          right: '-8%',
          width: '60%',
          height: '50%',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          zIndex: 2,
          pointerEvents: 'none'
        }}
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
          animate={{ 
            opacity: [0.07, 0.11, 0.07],
            scale: [1, 1.015, 1],
            filter: 'blur(1.5px)'
          }}
          transition={{
            opacity: {
              repeat: Infinity,
              duration: 12,
              ease: "easeInOut",
              repeatType: "reverse"
            },
            scale: {
              repeat: Infinity,
              duration: 15,
              ease: "easeInOut",
              repeatType: "reverse"
            },
            filter: { duration: 3.5, ease: "easeOut" }
          }}
          style={{
            fontSize: '24vw',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            margin: 0,
            padding: 0,
            lineHeight: '0.8',
            fontFamily: '"SF Pro Display", "Neue Montreal", "Satoshi", sans-serif',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.85) 30%, rgba(255,77,106,0.7) 60%, rgba(139,92,246,0.6) 100%)',
            backgroundSize: '300% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 60px rgba(255, 77, 106, 0.15), 0 0 120px rgba(139, 92, 246, 0.1)',
            whiteSpace: 'nowrap',
            animation: 'gradientSweep 12s ease-in-out infinite'
          }}
        >
          YOU
        </motion.h1>
      </div>

      {/* FOREGROUND MESSAGE (Lower Center) */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.0, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          zIndex: 3,
          position: 'absolute',
          bottom: '22%'
        }}
      >
        <p style={{
          fontSize: '2.8rem',
          fontWeight: 500,
          color: '#ffffff',
          margin: '0 0 10px 0',
          letterSpacing: '-0.03em',
          lineHeight: '1.2',
          fontFamily: '"Neue Montreal", "Satoshi", "-apple-system", sans-serif',
          opacity: 0.95
        }}>
          Built for continuity.
        </p>
        <p style={{
          fontSize: '2.8rem',
          fontWeight: 400,
          color: 'rgba(255, 255, 255, 0.65)',
          margin: 0,
          letterSpacing: '-0.03em',
          lineHeight: '1.2',
          fontFamily: '"Neue Montreal", "Satoshi", "-apple-system", sans-serif'
        }}>
          Designed for the future.
        </p>
      </motion.div>

      {/* Keyframe animation for YOU text color sweep */}
      <style>{`
        @keyframes gradientSweep {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default ThankYouScene;
