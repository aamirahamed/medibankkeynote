import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ThoughtBubble = ({ children, tailPosition = 'bottom-left' }) => {
  const getTailOffsets = () => {
    switch (tailPosition) {
      case 'bottom-left':
        return [
          { size: 9, bottom: -11, left: 16 },
          { size: 5, bottom: -20, left: 8 }
        ];
      case 'bottom-right':
        return [
          { size: 9, bottom: -11, right: 16 },
          { size: 5, bottom: -20, right: 8 }
        ];
      case 'top-left':
        return [
          { size: 9, top: -11, left: 16 },
          { size: 5, top: -20, left: 8 }
        ];
      case 'top-right':
        return [
          { size: 9, top: -11, right: 16 },
          { size: 5, top: -20, right: 8 }
        ];
      default:
        return [
          { size: 9, bottom: -11, left: 16 },
          { size: 5, bottom: -20, left: 8 }
        ];
    }
  };

  const tails = getTailOffsets();

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* Main Bubble */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '24px',
          padding: '0.7rem 1.3rem',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
          color: '#ffffff',
          fontSize: '1.25rem',
          fontWeight: 400,
          whiteSpace: 'nowrap',
          letterSpacing: '0.04em'
        }}
      >
        {children}
      </div>
      
      {/* Tail Circle 1 */}
      <div
        style={{
          position: 'absolute',
          width: `${tails[0].size}px`,
          height: `${tails[0].size}px`,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          ...tails[0]
        }}
      />
      
      {/* Tail Circle 2 */}
      <div
        style={{
          position: 'absolute',
          width: `${tails[1].size}px`,
          height: `${tails[1].size}px`,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(3px)',
          WebkitBackdropFilter: 'blur(3px)',
          ...tails[1]
        }}
      />
    </div>
  );
};

const CinematicRevealFlow = ({ globalStep, onCompanionGlow }) => {
  const [phase, setPhase] = useState('backspacing'); // 'backspacing' | 'pause1' | 'typing' | 'pause2' | 'glowing'
  const [text, setText] = useState('What if Medibank became more than insurance?');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (phase === 'glowing' && onCompanionGlow) {
      onCompanionGlow();
    }
  }, [phase, onCompanionGlow]);

  useEffect(() => {
    let timer;
    if (phase === 'backspacing') {
      const originalSuffix = ' more than insurance?';
      let currentLength = originalSuffix.length;
      
      const backspace = () => {
        if (currentLength > 0) {
          currentLength--;
          setText('What if Medibank became' + originalSuffix.substring(0, currentLength));
          const delay = 40 + Math.random() * 20; // 40-60ms
          timer = setTimeout(backspace, delay);
        } else {
          setPhase('pause1');
        }
      };
      
      timer = setTimeout(backspace, 600); // Pause briefly before backspacing
    } else if (phase === 'pause1') {
      timer = setTimeout(() => {
        setPhase('typing');
      }, 500); // 500ms pause
    } else if (phase === 'typing') {
      const newSuffix = ' the companion students grow with?';
      let currentIndex = 0;
      
      const type = () => {
        if (currentIndex < newSuffix.length) {
          currentIndex++;
          setText('What if Medibank became' + newSuffix.substring(0, currentIndex));
          const delay = 50 + Math.random() * 20; // 50-70ms
          timer = setTimeout(type, delay);
        } else {
          setPhase('pause2');
        }
      };
      
      timer = setTimeout(type, 100);
    } else if (phase === 'pause2') {
      timer = setTimeout(() => {
        setShowCursor(false);
        setPhase('glowing');
      }, 400); // 400ms pause
    }

    return () => clearTimeout(timer);
  }, [phase]);

  let content;

  if (globalStep === 8) {
    content = (
      <>
        {/* Faded down background sentence */}
        <motion.h1
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 0 }}
          transition={{ type: "tween", duration: 1.2, ease: "easeOut" }}
          className="cinematic-text primary"
          style={{
            fontSize: '4rem',
            fontWeight: 600,
            letterSpacing: '-0.04em',
            lineHeight: 1.2,
            textAlign: 'center',
            color: '#ffffff',
            margin: 0,
            width: '100%'
          }}
        >
          What if Medibank became the <span style={{ opacity: 0 }}>companion</span> students grow with?
        </motion.h1>

        {/* Centered Product Card Wrapper */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            width: '100%',
            zIndex: 10,
            pointerEvents: 'none'
          }}
        >
          <motion.div
            initial={{ opacity: 1, y: 0, scale: 1 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              originY: 0.3
            }}
          >
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 1.5, ease: "easeOut" }}
              style={{
                fontSize: '1.8rem',
                fontWeight: 300,
                color: 'rgba(255, 255, 255, 0.5)',
                textTransform: 'uppercase',
                letterSpacing: '0.25em',
                marginBottom: '1rem'
              }}
            >
              Introducing
            </motion.span>

            <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', margin: 0 }}>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.0, duration: 1.5, ease: "easeOut" }}
                style={{ fontSize: '4.5rem', fontWeight: 600, color: '#ffffff', letterSpacing: '-0.04em' }}
              >
                Medibank
              </motion.span>
              <motion.span
                layoutId="companion-word"
                transition={{ type: "tween", duration: 3.5, ease: [0.16, 1, 0.3, 1] }}
                className="glow-text"
                style={{
                  fontSize: '4.5rem',
                  fontWeight: 600,
                  letterSpacing: '-0.04em',
                  display: 'inline-block'
                }}
              >
                Companion
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8, duration: 1.5, ease: "easeOut" }}
              style={{
                fontSize: '1.8rem',
                color: '#ff4d6a',
                fontWeight: 500,
                marginTop: '2.5rem',
                marginBottom: '1.5rem',
                maxWidth: '650px'
              }}
            >
              “Built around every stage of student life in Australia.”
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.2, duration: 1.5, ease: "easeOut" }}
              style={{
                fontSize: '1.25rem',
                color: 'rgba(255, 255, 255, 0.6)',
                lineHeight: 1.6,
                maxWidth: '600px',
                margin: 0
              }}
            >
              From arrival and settling in to health, community, rewards, and cover, the Companion App turns Medibank into a daily student support system.
            </motion.p>
          </motion.div>
        </div>
      </>
    );
  } else if (phase === 'glowing') {
    content = (
      <h1 
        className="cinematic-text primary"
        style={{ fontSize: '4rem', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1.2, textAlign: 'center', margin: 0, width: '100%' }}
      >
        What if Medibank became the <motion.span layoutId="companion-word" transition={{ type: "tween", duration: 3.5, ease: [0.16, 1, 0.3, 1] }} className="glow-text" style={{ display: 'inline-block' }}>companion</motion.span> students grow with?
      </h1>
    );
  } else {
    content = (
      <h1 
        className="cinematic-text primary"
        style={{ fontSize: '4rem', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1.2, textAlign: 'center', margin: 0, width: '100%' }}
      >
        {text}
        {showCursor && <span className="typing-cursor" />}
      </h1>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {content}
    </div>
  );
};

const TeamProfile = ({ name, initials, index, x, y }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.8 + index * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        position: 'absolute',
        left: x,
        top: y,
        width: '120px'
      }}
    >
      <motion.div
        animate={{
          boxShadow: [
            '0 0 10px rgba(255, 77, 106, 0.08), inset 0 0 10px rgba(255, 255, 255, 0.03)',
            '0 0 20px rgba(255, 77, 106, 0.22), inset 0 0 15px rgba(255, 77, 106, 0.12)',
            '0 0 10px rgba(255, 77, 106, 0.08), inset 0 0 10px rgba(255, 255, 255, 0.03)'
          ],
          scale: [1, 1.015, 1]
        }}
        transition={{
          repeat: Infinity,
          duration: 5 + index * 0.4,
          ease: "easeInOut"
        }}
        style={{
          width: '110px',
          height: '110px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #13141c 0%, #08090d 100%)',
          border: '1.5px solid rgba(255, 77, 106, 0.22)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Abstract gradient glow */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          left: '-20%',
          width: '140%',
          height: '140%',
          background: 'radial-gradient(circle, rgba(255, 77, 106, 0.12) 0%, transparent 60%)',
          pointerEvents: 'none'
        }} />
        
        {/* Initials */}
        <span style={{
          fontSize: '24px',
          fontWeight: 600,
          color: '#ffffff',
          letterSpacing: '0.05em',
          textShadow: '0 0 8px rgba(255, 255, 255, 0.2)'
        }}>
          {initials}
        </span>
      </motion.div>
      
      {/* Name */}
      <span style={{
        fontSize: '12.5px',
        fontWeight: 500,
        color: 'rgba(255, 255, 255, 0.85)',
        textAlign: 'center',
        width: '100%',
        whiteSpace: 'nowrap',
        letterSpacing: '0.01em'
      }}>
        {name}
      </span>
    </motion.div>
  );
};

const teamMembers = [
  { name: "Aamir Ahamed", initials: "AA", x: 95, y: 0 },
  { name: "Akanksha Hiremath", initials: "AH", x: 285, y: 0 },
  { name: "Harshitha Rupesh", initials: "HR", x: 0, y: 135 },
  { name: "Lalit Aditya", initials: "LA", x: 190, y: 135 },
  { name: "Navneet Krishna", initials: "NK", x: 380, y: 135 },
  { name: "Umair Ahamed", initials: "UA", x: 95, y: 270 },
  { name: "Yojit Kohli", initials: "YK", x: 285, y: 270 }
];

const Scene1 = ({ globalStep, onCompanionGlow }) => {
  // We use the globalStep to advance the narrative.
  // The global orchestrator (App.jsx) controls this step.
  // Scene 1 handles steps 0 through 8.
  
  // Cinematic transition settings
  const transitionSettings = { duration: 1.5, ease: "easeInOut" };
  const textVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: transitionSettings },
    exit: { opacity: 0, y: -20, transition: { duration: 1, ease: "easeInOut" } }
  };

  return (
    <div className="scene-container" style={{ background: '#040406', width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <AnimatePresence mode="wait">
        {globalStep === 0 ? (
          <motion.div
            key="executive-holding-slide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: '#040406',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 8%',
              boxSizing: 'border-box',
              overflow: 'hidden'
            }}
          >
            {/* Grain */}
            <motion.div
              animate={{
                x: [0, 8, -5, 6, -8, 0],
                y: [0, -6, 8, -4, 5, 0],
                scale: [1, 1.04, 1.01, 1.06, 1.02, 1]
              }}
              transition={{
                repeat: Infinity,
                duration: 25,
                ease: "linear"
              }}
              style={{
                position: 'absolute',
                top: '-10%',
                left: '-10%',
                width: '120%',
                height: '120%',
                opacity: 0.015,
                backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 250 250\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                pointerEvents: 'none',
                zIndex: 1
              }}
            />

            {/* Bottom-left Ambient AI Globe background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2.0 }}
              style={{
                position: 'absolute',
                bottom: '-150px',
                left: '-150px',
                width: '650px',
                height: '650px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255, 77, 106, 0.14) 0%, rgba(255, 77, 106, 0.03) 50%, transparent 80%)',
                filter: 'blur(40px)',
                pointerEvents: 'none',
                zIndex: 2
              }}
            />

            {/* SVG Curved Neural Lines */}
            <svg style={{ position: 'absolute', bottom: 0, left: 0, width: '600px', height: '600px', pointerEvents: 'none', zIndex: 3 }}>
              <defs>
                <filter id="globe-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="remove-white-bg">
                  <feColorMatrix type="matrix" values="
                    1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    -3 -3 -3 8.5 -0.5
                  "/>
                </filter>
              </defs>

              {/* Curved paths */}
              <motion.path
                d="M-50,650 Q120,480 250,650"
                fill="none"
                stroke="#ff4d6a"
                strokeWidth="1.5"
                opacity="0.22"
                filter="url(#globe-glow)"
                animate={{ strokeDashoffset: [0, -100] }}
                transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                style={{ strokeDasharray: "30, 100" }}
              />
              <motion.path
                d="M-50,650 C180,420 220,280 450,650"
                fill="none"
                stroke="#ff4d6a"
                strokeWidth="1.2"
                opacity="0.18"
                filter="url(#globe-glow)"
                animate={{ strokeDashoffset: [0, 150] }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                style={{ strokeDasharray: "50, 120" }}
              />
              <motion.path
                d="M-50,650 Q280,220 550,550"
                fill="none"
                stroke="#ff4d6a"
                strokeWidth="1"
                opacity="0.12"
                filter="url(#globe-glow)"
                animate={{ strokeDashoffset: [0, -200] }}
                transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                style={{ strokeDasharray: "70, 150" }}
              />

              {/* Concentric arcs */}
              <motion.ellipse
                cx="60" cy="540" rx="150" ry="130"
                fill="none"
                stroke="#ff4d6a"
                strokeWidth="1.2"
                opacity="0.1"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
                style={{ transformOrigin: '60px 540px' }}
              />
              <motion.ellipse
                cx="60" cy="540" rx="180" ry="90"
                fill="none"
                stroke="#ff4d6a"
                strokeWidth="1.0"
                opacity="0.06"
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 55, ease: "linear" }}
                style={{ transformOrigin: '60px 540px' }}
              />

              {/* Pulsing signal dots */}
              <motion.circle
                cx="220" cy="420" r="3"
                fill="#ffffff"
                opacity="0.4"
                filter="url(#globe-glow)"
                animate={{ scale: [1, 1.8, 1], opacity: [0.1, 0.5, 0.1] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              />
              <motion.circle
                cx="150" cy="320" r="2.5"
                fill="#ff4d6a"
                opacity="0.3"
                filter="url(#globe-glow)"
                animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.4, 0.1] }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 1.5 }}
              />
            </svg>

            {/* Left Column */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              maxWidth: '620px',
              height: '100%',
              zIndex: 10,
              gap: '2.2rem'
            }}>
              {/* Logos */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 1.0, ease: "easeOut" }}
                style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
              >
                <img 
                  src="/Medibank.png" 
                  alt="Medibank" 
                  style={{ 
                    height: '42px', 
                    filter: 'url(#remove-white-bg)',
                    objectFit: 'contain'
                  }} 
                />
                <span style={{ color: 'rgba(255, 255, 255, 0.35)', fontSize: '24px', fontWeight: 300 }}>×</span>
                <img 
                  src="/RMIT.png" 
                  alt="RMIT" 
                  style={{ 
                    height: '48px', 
                    objectFit: 'contain'
                  }} 
                />
              </motion.div>

              {/* Main Title Group */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontSize: '3.4rem',
                    fontWeight: 800,
                    lineHeight: '1.15',
                    color: '#ffffff',
                    margin: 0,
                    letterSpacing: '-0.03em',
                    textAlign: 'left'
                  }}
                >
                  Reimagining the<br />International Student<br />Journey
                </motion.h1>
                
                {/* Thin glowing red line */}
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 60, opacity: 1 }}
                  transition={{ delay: 1.5, duration: 1.0, ease: "easeOut" }}
                  style={{
                    height: '2px',
                    background: '#ff4d6a',
                    boxShadow: '0 0 10px #ff4d6a, 0 0 20px rgba(255, 77, 106, 0.5)',
                    marginTop: '1.8rem',
                    marginBottom: '1.8rem'
                  }}
                />

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 1.2, ease: "easeOut" }}
                  style={{
                    fontSize: '1.15rem',
                    lineHeight: '1.65',
                    color: 'rgba(255, 255, 255, 0.65)',
                    margin: 0,
                    fontWeight: 300,
                    textAlign: 'left',
                    maxWidth: '520px'
                  }}
                >
                  Transforming OSHC engagement into long-term health continuity through behavioural intelligence and AI-powered conversion workflows.
                </motion.p>
              </div>

              {/* Bottom-left presented by info */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 1.0, ease: "easeOut" }}
                style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}
              >
                <span style={{ fontSize: '10px', fontWeight: 800, color: '#ff4d6a', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                  Presented by
                </span>
                <span style={{ fontSize: '15px', fontWeight: 500, color: '#ffffff', letterSpacing: '0.01em' }}>
                  RMIT MBIT Industry Project Team
                </span>
              </motion.div>
            </div>

            {/* Right Column (Team Clustered Layout) */}
            <div style={{
              position: 'relative',
              width: '500px',
              height: '410px',
              zIndex: 10
            }}>
              {teamMembers.map((member, idx) => (
                <TeamProfile
                  key={member.name}
                  name={member.name}
                  initials={member.initials}
                  index={idx}
                  x={member.x}
                  y={member.y}
                />
              ))}
            </div>

            {/* Bottom-Right Footnote */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }}
              transition={{ delay: 2.2, duration: 1.2 }}
              style={{
                position: 'absolute',
                bottom: '40px',
                right: '8%',
                fontSize: '11px',
                color: '#ffffff',
                letterSpacing: '0.05em',
                zIndex: 10
              }}
            >
              Medibank Industry Collaboration • 2026
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="narrative-steps"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0 }}
            style={{ width: '100%', height: '100%', position: 'relative' }}
          >
            {/* Background Atmosphere */}
            <motion.div 
              className="ambient-glow"
              initial={{ opacity: 0.2, scale: 0.8 }}
              animate={{ 
                opacity: globalStep >= 7 ? 0.6 : (globalStep >= 3 ? 0.6 : 0.2),
                scale: globalStep >= 7 ? 1.5 : (globalStep >= 3 ? 1.2 : 0.8),
                background: globalStep >= 9 
                  ? "radial-gradient(circle, rgba(255, 77, 106, 0.15) 0%, rgba(56, 182, 255, 0.15) 50%, transparent 80%)"
                  : (globalStep === 7 || globalStep === 8
                      ? "radial-gradient(circle, rgba(255, 77, 106, 0.18) 0%, transparent 70%)"
                      : (globalStep >= 3 
                          ? "radial-gradient(circle, rgba(0, 200, 150, 0.2) 0%, transparent 70%)" 
                          : "radial-gradient(circle, rgba(0, 122, 255, 0.15) 0%, transparent 70%)"))
              }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
            
            {/* Floating Emotional Fragments (Step 2 & 3) */}
            <AnimatePresence>
              {(globalStep === 2 || globalStep === 3) && (
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 5 }}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2.0 }}
                    style={{ width: '100%', height: '100%', position: 'relative' }}
                  >
                    {/* Fragment 1: What's TFN? */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: 0.45,
                        x: [0, 10, 0, -10, 0],
                        y: [0, -15, 0, 15, 0]
                      }}
                      transition={{
                        opacity: { delay: 0.5, duration: 2.5 },
                        x: { repeat: Infinity, duration: 18, ease: "easeInOut" },
                        y: { repeat: Infinity, duration: 22, ease: "easeInOut" }
                      }}
                      style={{
                        position: 'absolute',
                        top: '12%',
                        left: '6%'
                      }}
                    >
                      <ThoughtBubble tailPosition="bottom-left">What's TFN?</ThoughtBubble>
                    </motion.div>

                    {/* Fragment 2: What to pack? */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: 0.45,
                        x: [0, -8, 0, 8, 0],
                        y: [0, 12, 0, -12, 0]
                      }}
                      transition={{
                        opacity: { delay: 1.0, duration: 2.5 },
                        x: { repeat: Infinity, duration: 20, ease: "easeInOut" },
                        y: { repeat: Infinity, duration: 16, ease: "easeInOut" }
                      }}
                      style={{
                        position: 'absolute',
                        top: '10%',
                        right: '8%'
                      }}
                    >
                      <ThoughtBubble tailPosition="bottom-right">What to pack?</ThoughtBubble>
                    </motion.div>

                    {/* Fragment 3: Accommodation? */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: 0.45,
                        x: [0, 12, 0, -12, 0],
                        y: [0, -10, 0, 10, 0]
                      }}
                      transition={{
                        opacity: { delay: 0.8, duration: 2.5 },
                        x: { repeat: Infinity, duration: 24, ease: "easeInOut" },
                        y: { repeat: Infinity, duration: 20, ease: "easeInOut" }
                      }}
                      style={{
                        position: 'absolute',
                        top: '78%',
                        left: '5%'
                      }}
                    >
                      <ThoughtBubble tailPosition="top-left">Accommodation?</ThoughtBubble>
                    </motion.div>

                    {/* Fragment 4: Find friends? */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: 0.45,
                        x: [0, -12, 0, 12, 0],
                        y: [0, 15, 0, -15, 0]
                      }}
                      transition={{
                        opacity: { delay: 1.4, duration: 2.5 },
                        x: { repeat: Infinity, duration: 22, ease: "easeInOut" },
                        y: { repeat: Infinity, duration: 26, ease: "easeInOut" }
                      }}
                      style={{
                        position: 'absolute',
                        top: '80%',
                        right: '6%'
                      }}
                    >
                      <ThoughtBubble tailPosition="top-right">Find friends?</ThoughtBubble>
                    </motion.div>

                    {/* Fragment 5: Where do I begin? */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: 0.45,
                        x: [0, 6, 0, -6, 0],
                        y: [0, -8, 0, 8, 0]
                      }}
                      transition={{
                        opacity: { delay: 1.8, duration: 2.5 },
                        x: { repeat: Infinity, duration: 16, ease: "easeInOut" },
                        y: { repeat: Infinity, duration: 18, ease: "easeInOut" }
                      }}
                      style={{
                        position: 'absolute',
                        bottom: '6%',
                        left: '20%'
                      }}
                    >
                      <ThoughtBubble tailPosition="bottom-left">Where do I begin?</ThoughtBubble>
                    </motion.div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10, width: '100%', height: '100%' }}>
              <AnimatePresence mode="wait">
                
                {/* Part 1: The Problem (Steps 1 & 2) */}
                {(globalStep === 1 || globalStep === 2 || globalStep === 3) && (
                  <motion.div 
                    key="part1"
                    layout
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', width: '100%', maxWidth: '850px', textAlign: 'center' }}
                    initial="hidden" animate="visible" exit="exit"
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                  >
                    {globalStep >= 1 && (
                      <motion.h2 
                        layout
                        variants={textVariant}
                        className="cinematic-text"
                      >
                        “Every year, thousands of international students arrive in Australia…”
                      </motion.h2>
                    )}
                    {globalStep >= 2 && (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                        <motion.span
                          initial={{ opacity: 0, filter: 'blur(5px)', y: 8 }}
                          animate={{ 
                            opacity: 0.55, 
                            filter: 'blur(1.2px)',
                            y: [0, -3, 0, 3, 0],
                            x: [0, 2, 0, -2, 0]
                          }}
                          transition={{
                            opacity: { duration: 1.8, ease: "easeOut" },
                            filter: { duration: 1.8, ease: "easeOut" },
                            y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                            x: { duration: 9, repeat: Infinity, ease: "easeInOut" }
                          }}
                          style={{ 
                            fontSize: '2.1rem', 
                            fontWeight: 300,
                            color: 'rgba(255, 255, 255, 0.7)', 
                            letterSpacing: '0.04em',
                            display: 'inline-block'
                          }}
                        >
                          lost,
                        </motion.span>
                        
                        <motion.span
                          initial={{ opacity: 0, scale: 0.95, filter: 'blur(3px)' }}
                          animate={{ 
                            opacity: 0.95, 
                            scale: 1.12,
                            filter: 'blur(0px)'
                          }}
                          transition={{
                            delay: 0.5,
                            duration: 1.5,
                            ease: [0.25, 1, 0.5, 1]
                          }}
                          className="tension-shake"
                          style={{ 
                            fontSize: '2.5rem', 
                            color: 'rgba(255, 255, 255, 0.95)', 
                            fontWeight: 500,
                            letterSpacing: '-0.02em',
                            textShadow: '0 0 12px rgba(255, 255, 255, 0.1)',
                            display: 'inline-block'
                          }}
                        >
                          overwhelmed,
                        </motion.span>
                        
                        <motion.span
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 0.55, y: 0 }}
                          transition={{ delay: 1.2, duration: 2.2, ease: "easeOut" }}
                          style={{ 
                            fontSize: '2.1rem', 
                            fontWeight: 300,
                            color: 'rgba(255, 255, 255, 0.6)', 
                            marginTop: '0.6rem',
                            letterSpacing: '0.08em',
                            textAlign: 'center',
                            lineHeight: 1.5
                          }}
                        >
                          alone.
                        </motion.span>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Part 2: The Medibank Position (Steps 4 & 5) */}
                {(globalStep === 4 || globalStep === 5) && (
                  <motion.div 
                    key="part2"
                    layout
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', width: '100%', maxWidth: '800px', textAlign: 'center' }}
                    initial="hidden" animate="visible" exit="exit"
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                  >
                    {globalStep >= 4 && (
                      <motion.h3 
                        layout
                        variants={textVariant}
                        className="cinematic-text secondary"
                      >
                        “But before they arrive…”
                      </motion.h3>
                    )}
                    {globalStep >= 5 && (
                      <motion.h1 
                        layout
                        variants={textVariant}
                        className="cinematic-text primary"
                      >
                        Medibank is already one of their first touchpoints.
                      </motion.h1>
                    )}
                  </motion.div>
                )}

                {/* Part 3: The What If / Final Reveal (Steps 6, 7 & 8) */}
                {(globalStep === 6 || globalStep === 7 || globalStep === 8) && (
                  <motion.div 
                    key="part3"
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '900px', textAlign: 'center' }}
                    initial="hidden" animate="visible" exit="exit"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, scale: 1, transition: transitionSettings },
                      exit: { opacity: 0, y: -50, scale: 0.95, transition: { duration: 1.2, ease: "easeOut" } }
                    }}
                  >
                    {globalStep === 6 && (
                      <h1 
                        className="cinematic-text primary"
                        style={{ fontSize: '4rem', fontWeight: 600, letterSpacing: '-0.04em' }}
                      >
                        What if Medibank became more than insurance?
                      </h1>
                    )}
                    {(globalStep === 7 || globalStep === 8) && (
                      <CinematicRevealFlow globalStep={globalStep} onCompanionGlow={onCompanionGlow} />
                    )}
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Scene1;
