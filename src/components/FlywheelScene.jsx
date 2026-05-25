import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Shield, Radio, Brain, Send, RefreshCw, TrendingUp, HelpCircle } from 'lucide-react';

const IconComponent = ({ name, color, size = 22 }) => {
  switch (name) {
    case 'Smartphone': return <Smartphone color={color} size={size} />;
    case 'Shield': return <Shield color={color} size={size} />;
    case 'Radio': return <Radio color={color} size={size} />;
    case 'Brain': return <Brain color={color} size={size} />;
    case 'Send': return <Send color={color} size={size} />;
    case 'RefreshCw': return <RefreshCw color={color} size={size} />;
    case 'TrendingUp': return <TrendingUp color={color} size={size} />;
    default: return <HelpCircle color={color} size={size} />;
  }
};

export default function FlywheelScene() {
  const [activeStage, setActiveStage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Slow auto-cycle through stages
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % 7);
    }, 5500);
    return () => clearInterval(interval);
  }, [isHovered]);

  const stages = [
    {
      id: 0,
      label: "Engagement",
      icon: "Smartphone",
      color: "#38B6FF", // soft blue
      bg: "rgba(56, 182, 255, 0.05)",
      border: "rgba(56, 182, 255, 0.25)",
      glow: "rgba(56, 182, 255, 0.35)",
      desc: "Students engage daily through: health, rewards, support, community, and transition guidance.",
      cue: "Student joins a postgraduate community"
    },
    {
      id: 1,
      label: "Trust & Habit Formation",
      icon: "Shield",
      color: "#00E5FF", // warm white / soft cyan
      bg: "rgba(0, 229, 255, 0.05)",
      border: "rgba(0, 229, 255, 0.25)",
      glow: "rgba(0, 229, 255, 0.35)",
      desc: "Medibank becomes part of the student’s everyday journey — not just an insurer.",
      cue: "Student relies on Medibank during visa transition uncertainty"
    },
    {
      id: 2,
      label: "Behavioural Signals",
      icon: "Radio",
      color: "#8B5CF6", // purple-blue
      bg: "rgba(139, 92, 246, 0.05)",
      border: "rgba(139, 92, 246, 0.25)",
      glow: "rgba(139, 92, 246, 0.35)",
      desc: "Every interaction creates behavioural intelligence and intent signals.",
      cue: "Repeated OVHC exploration detected"
    },
    {
      id: 3,
      label: "AI Understanding",
      icon: "Brain",
      color: "#D946EF", // purple
      bg: "rgba(217, 70, 239, 0.05)",
      border: "rgba(217, 70, 239, 0.25)",
      glow: "rgba(217, 70, 239, 0.35)",
      desc: "The Conversion Engine interprets intent, detects cohorts, and predicts transition readiness.",
      cue: "Graduate Transition Cohort identified"
    },
    {
      id: 4,
      label: "Personalised Interventions",
      icon: "Send",
      color: "#EC4899", // red-purple
      bg: "rgba(236, 72, 153, 0.05)",
      border: "rgba(236, 72, 153, 0.25)",
      glow: "rgba(236, 72, 153, 0.35)",
      desc: "The ecosystem delivers timely, personalised journeys and recommendations.",
      cue: "Graduate Transition Sequence triggered"
    },
    {
      id: 5,
      label: "Continuity & Conversion",
      icon: "RefreshCw",
      color: "#FF4D6A", // Medibank red
      bg: "rgba(255, 77, 106, 0.05)",
      border: "rgba(255, 77, 106, 0.25)",
      glow: "rgba(255, 77, 106, 0.35)",
      desc: "Students transition seamlessly from OSHC to OVHC with reduced friction.",
      cue: "OSHC → OVHC continuity achieved"
    },
    {
      id: 6,
      label: "Loyalty & Lifetime Value",
      icon: "TrendingUp",
      color: "#10B981", // green
      bg: "rgba(16, 185, 129, 0.05)",
      border: "rgba(16, 185, 129, 0.25)",
      glow: "rgba(16, 185, 129, 0.35)",
      desc: "Stronger engagement drives higher retention, loyalty, and long-term revenue.",
      cue: "Long-term Medibank relationship established"
    }
  ];

  // Orbiting concepts details
  const orbits = [
    { text: "Learns continuously", radius: 110, speed: 28, delay: 0 },
    { text: "Detects intent earlier", radius: 135, speed: 34, delay: -6 },
    { text: "Refines cohorts", radius: 160, speed: 40, delay: -12 },
    { text: "Adapts interventions", radius: 185, speed: 46, delay: -18 },
    { text: "Improves engagement", radius: 210, speed: 52, delay: -24 },
    { text: "Predicts behaviour", radius: 235, speed: 58, delay: -30 }
  ];

  const N = 7;
  const R = 280; // Flywheel circle radius
  const angleStep = (2 * Math.PI) / N;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: '#040406',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}
    >
      {/* Background Soft Medibank Red Gradients */}
      <motion.div
        animate={{
          scale: [0.95, 1.05, 0.95],
          opacity: [0.35, 0.5, 0.35]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 77, 106, 0.08) 0%, rgba(255, 77, 106, 0.01) 60%, transparent 80%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />
      <motion.div
        animate={{
          scale: [1.05, 0.95, 1.05],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          width: '900px',
          height: '900px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56, 182, 255, 0.04) 0%, transparent 75%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Top-left Header */}
      <div style={{
        position: 'absolute',
        top: '8%',
        left: '8%',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
      }}>
        <span style={{
          fontSize: '11px',
          fontWeight: 800,
          color: '#ff4d6a',
          textTransform: 'uppercase',
          letterSpacing: '0.15em'
        }}>
          Future Vision
        </span>
        <h1 style={{
          fontSize: '2.8rem',
          fontWeight: 800,
          color: '#ffffff',
          margin: 0,
          letterSpacing: '-0.03em',
          lineHeight: 1.1
        }}>
          The Student Continuity Flywheel
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: 'rgba(255, 255, 255, 0.65)',
          margin: '4px 0 0 0',
          fontWeight: 300
        }}>
          The ecosystem compounds value over time.
        </p>
      </div>

      {/* ── CENTRAL FLYWHEEL AREA ── */}
      <div style={{
        position: 'relative',
        width: '750px',
        height: '750px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5
      }}>
        
        {/* SVG Flowing Path and Signal Particles */}
        <svg style={{ position: 'absolute', width: '750px', height: '750px', pointerEvents: 'none', zIndex: 3 }}>
          <defs>
            <linearGradient id="flywheel-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38B6FF" stopOpacity="0.3" />
              <stop offset="33%" stopColor="#8B5CF6" stopOpacity="0.4" />
              <stop offset="66%" stopColor="#FF4D6A" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.3" />
            </linearGradient>
            <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Connection Ring */}
          <circle
            cx="375"
            cy="375"
            r={R}
            fill="none"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth="2"
          />

          {/* Glowing flowing dash path */}
          <motion.circle
            cx="375"
            cy="375"
            r={R}
            fill="none"
            stroke="url(#flywheel-gradient)"
            strokeWidth="3.5"
            strokeDasharray="60, 420"
            filter="url(#glow-filter)"
            animate={{ strokeDashoffset: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
          />
          <motion.circle
            cx="375"
            cy="375"
            r={R}
            fill="none"
            stroke="url(#flywheel-gradient)"
            strokeWidth="2"
            strokeDasharray="30, 200"
            animate={{ strokeDashoffset: [200, -800] }}
            transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
            opacity="0.6"
          />
        </svg>

        {/* Orbiting Concepts */}
        <div style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none'
        }}>
          {orbits.map((orbit, index) => (
            <motion.div
              key={index}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: orbit.speed, ease: "linear", delay: orbit.delay }}
              style={{
                position: 'absolute',
                width: orbit.radius * 2,
                height: orbit.radius * 2,
                borderRadius: '50%',
                border: '1px dashed rgba(255, 255, 255, 0.025)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                fontSize: '8.5px',
                fontWeight: 600,
                letterSpacing: '0.09em',
                color: 'rgba(255, 255, 255, 0.38)',
                textTransform: 'uppercase',
                background: '#040406',
                padding: '2px 8px',
                borderRadius: '10px',
                transform: 'translateY(-50%)',
                border: '1px solid rgba(255, 255, 255, 0.03)'
              }}>
                {orbit.text}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Center Glowing Intelligence Core */}
        <motion.div
          animate={{
            boxShadow: [
              '0 0 35px rgba(255, 77, 106, 0.08), inset 0 0 20px rgba(255, 77, 106, 0.03)',
              '0 0 50px rgba(255, 77, 106, 0.18), inset 0 0 30px rgba(255, 77, 106, 0.08)',
              '0 0 35px rgba(255, 77, 106, 0.08), inset 0 0 20px rgba(255, 77, 106, 0.03)'
            ]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            width: '184px',
            height: '184px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(12, 12, 18, 0.95) 0%, rgba(6, 6, 9, 0.95) 100%)',
            border: '1.5px solid rgba(255, 255, 255, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            boxSizing: 'border-box',
            zIndex: 6
          }}
        >
          {/* Internal Pulse Ripple */}
          <motion.div
            animate={{ scale: [1, 1.4], opacity: [0.15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              border: '2px solid rgba(255, 77, 106, 0.35)',
              pointerEvents: 'none'
            }}
          />
          
          <span style={{
            fontSize: '11px',
            fontWeight: 600,
            color: 'rgba(255, 255, 255, 0.9)',
            textAlign: 'center',
            lineHeight: '1.5',
            letterSpacing: '0.02em',
            textShadow: '0 0 10px rgba(255, 255, 255, 0.2)'
          }}>
            Every interaction makes the ecosystem smarter.
          </span>
        </motion.div>

        {/* 7 Circular Perimeter Nodes */}
        {stages.map((stage, idx) => {
          const theta = idx * angleStep - Math.PI / 2;
          const x = R * Math.cos(theta);
          const y = R * Math.sin(theta);
          const isActive = activeStage === idx;

          // Outer label placements
          let labelStyle = {
            position: 'absolute',
            whiteSpace: 'nowrap',
            fontSize: '12.5px',
            fontWeight: 600,
            color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.45)',
            transition: 'color 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            pointerEvents: 'none'
          };

          if (Math.abs(x) < 40) {
            if (y < 0) {
              labelStyle = { ...labelStyle, bottom: '62px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' };
            } else {
              labelStyle = { ...labelStyle, top: '62px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' };
            }
          } else if (x > 0) {
            labelStyle = { ...labelStyle, left: '62px', top: '50%', transform: 'translateY(-50%)', textAlign: 'left' };
          } else {
            labelStyle = { ...labelStyle, right: '62px', top: '50%', transform: 'translateY(-50%)', textAlign: 'right' };
          }

          return (
            <div
              key={stage.id}
              style={{
                position: 'absolute',
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                width: '0px',
                height: '0px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10
              }}
            >
              {/* Actual Node */}
              <motion.div
                onMouseEnter={() => {
                  setActiveStage(idx);
                  setIsHovered(true);
                }}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setActiveStage(idx)}
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: isActive ? stage.bg : 'rgba(10, 10, 15, 0.85)',
                  border: `1.5px solid ${isActive ? stage.color : 'rgba(255, 255, 255, 0.1)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: isActive ? `0 0 25px ${stage.glow}` : '0 4px 12px rgba(0,0,0,0.5)',
                  transition: 'background-color 0.4s, border-color 0.4s, box-shadow 0.4s'
                }}
                animate={{
                  scale: isActive ? 1.15 : 1
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <IconComponent
                  name={stage.icon}
                  color={isActive ? stage.color : 'rgba(255, 255, 255, 0.45)'}
                  size={19}
                />
              </motion.div>

              {/* Node Label */}
              <span style={labelStyle}>
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* ── ACTIVE STAGE DETAILS CARD (BOTTOM RIGHT) ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStage}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            bottom: '14%',
            right: '8%',
            width: '380px',
            background: 'rgba(6, 6, 8, 0.55)',
            backdropFilter: 'blur(20px)',
            borderRadius: '16px',
            border: `1px solid ${stages[activeStage].border}`,
            boxShadow: `0 12px 40px rgba(0, 0, 0, 0.6), 0 0 25px ${stages[activeStage].glow}`,
            padding: '24px',
            boxSizing: 'border-box',
            zIndex: 20
          }}
        >
          {/* Stage Indicator Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: stages[activeStage].color,
              boxShadow: `0 0 8px ${stages[activeStage].color}`
            }} />
            <span style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: stages[activeStage].color,
              textTransform: 'uppercase'
            }}>
              Stage {activeStage + 1} of 7
            </span>
          </div>

          {/* Stage Label */}
          <h2 style={{
            fontSize: '1.45rem',
            fontWeight: 700,
            color: '#ffffff',
            margin: '0 0 8px 0',
            letterSpacing: '-0.02em'
          }}>
            {stages[activeStage].label}
          </h2>

          {/* Description */}
          <p style={{
            fontSize: '0.94rem',
            lineHeight: '1.5',
            color: 'rgba(255, 255, 255, 0.72)',
            margin: '0 0 18px 0',
            fontWeight: 300
          }}>
            {stages[activeStage].desc}
          </p>

          {/* Micro-human cue */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            borderLeft: `2.5px solid ${stages[activeStage].color}`,
            padding: '10px 14px',
            borderRadius: '0 8px 8px 0'
          }}>
            <div style={{
              fontSize: '8.5px',
              fontWeight: 700,
              color: 'rgba(255, 255, 255, 0.4)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '2px'
            }}>
              Emotional Continuity Moment
            </div>
            <div style={{
              fontSize: '0.88rem',
              fontWeight: 400,
              color: '#ffffff',
              fontStyle: 'italic',
              lineHeight: '1.4'
            }}>
              “{stages[activeStage].cue}”
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bottom Closing Statement */}
      <div style={{
        position: 'absolute',
        bottom: '5%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        textAlign: 'center',
        width: '90%',
        maxWidth: '850px'
      }}>
        <p style={{
          fontSize: '1.18rem',
          fontWeight: 500,
          color: '#ffffff',
          margin: 0,
          letterSpacing: '-0.01em',
          textShadow: '0 0 12px rgba(255, 255, 255, 0.1)'
        }}>
          Better engagement creates better understanding. Better understanding creates better continuity.
        </p>
        <span style={{
          fontSize: '0.95rem',
          color: 'rgba(255, 255, 255, 0.45)',
          fontWeight: 300
        }}>
          The more students engage, the smarter the ecosystem becomes.
        </span>
      </div>
    </motion.div>
  );
}
