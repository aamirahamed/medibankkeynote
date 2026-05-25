import React from 'react';
import { motion } from 'framer-motion';

const ThankYouScene = () => {
  // Dust motes for the atmospheric particles
  const dustMotes = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 25 + 20,
    delay: Math.random() * -30,
    opacity: Math.random() * 0.08 + 0.03
  }));

  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: '#040406',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
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
      {/* Deep Red Glow bottom-left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 3.5, ease: "easeOut" }}
        style={{
          position: 'absolute',
          bottom: '-15%',
          left: '-10%',
          width: '60%',
          height: '60%',
          background: 'radial-gradient(circle, rgba(255, 77, 106, 0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />
      {/* Deep Purple/Navy Glow top-right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 4.0, ease: "easeOut", delay: 0.5 }}
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '65%',
          height: '65%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, rgba(30, 64, 175, 0.02) 65%, transparent 80%)',
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
            x: [`${mote.x}vw`, `${mote.x + (Math.sin(mote.id) * 5)}vw`]
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

      {/* BACKGROUND TYPOGRAPHY: HUGE "THANK YOU" */}
      <div 
        style={{
          position: 'absolute',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          zIndex: 2,
          pointerEvents: 'none'
        }}
      >
        <motion.h1
          initial={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          animate={{ 
            opacity: [0.03, 0.05, 0.03],
            scale: 1,
            filter: 'blur(2px)'
          }}
          transition={{
            opacity: {
              repeat: Infinity,
              duration: 8,
              ease: "easeInOut",
              repeatType: "reverse"
            },
            scale: { duration: 3.5, ease: [0.16, 1, 0.3, 1] },
            filter: { duration: 3.0, ease: "easeOut" }
          }}
          style={{
            fontSize: '15vw',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            margin: 0,
            padding: 0,
            textAlign: 'center',
            whiteSpace: 'nowrap',
            lineHeight: '0.9',
            fontFamily: '"SF Pro Display", "Neue Montreal", "Satoshi", "-apple-system", sans-serif',
            background: 'linear-gradient(90deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.06) 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'gradientSweep 15s linear infinite'
          }}
        >
          THANK YOU
        </motion.h1>
      </div>

      {/* FOREGROUND MESSAGE */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          zIndex: 3,
          marginTop: '6vw'
        }}
      >
        <p style={{
          fontSize: '2.5rem',
          fontWeight: 300,
          color: '#ffffff',
          margin: '0 0 10px 0',
          letterSpacing: '-0.02em',
          lineHeight: '1.25',
          fontFamily: '"Neue Montreal", "Satoshi", "-apple-system", sans-serif',
          opacity: 0.95
        }}>
          Built for continuity.
        </p>
        <p style={{
          fontSize: '2.5rem',
          fontWeight: 300,
          color: 'rgba(255, 255, 255, 0.65)',
          margin: 0,
          letterSpacing: '-0.02em',
          lineHeight: '1.25',
          fontFamily: '"Neue Montreal", "Satoshi", "-apple-system", sans-serif'
        }}>
          Designed for the future.
        </p>
      </motion.div>

      {/* Simple embedded keyframe animation for the sweep */}
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
