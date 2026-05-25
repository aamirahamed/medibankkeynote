import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smartphone, Shield, Radio, Brain, Send, RefreshCw, TrendingUp, HelpCircle, 
  HeartPulse, Activity, Network, Sparkles, ArrowRightLeft, Heart 
} from 'lucide-react';

const IconComponent = ({ name, color, size = 22 }) => {
  switch (name) {
    case 'Smartphone': return <Smartphone color={color} size={size} />;
    case 'Shield': return <Shield color={color} size={size} />;
    case 'Radio': return <Radio color={color} size={size} />;
    case 'Brain': return <Brain color={color} size={size} />;
    case 'Send': return <Send color={color} size={size} />;
    case 'RefreshCw': return <RefreshCw color={color} size={size} />;
    case 'TrendingUp': return <TrendingUp color={color} size={size} />;
    case 'HeartPulse': return <HeartPulse color={color} size={size} />;
    case 'Activity': return <Activity color={color} size={size} />;
    case 'Network': return <Network color={color} size={size} />;
    case 'Sparkles': return <Sparkles color={color} size={size} />;
    case 'ArrowRightLeft': return <ArrowRightLeft color={color} size={size} />;
    case 'Heart': return <Heart color={color} size={size} />;
    default: return <HelpCircle color={color} size={size} />;
  }
};

const hexToRgb = (hex) => {
  const rgb = hex.replace('#', '').match(/.{1,2}/g);
  if (!rgb) return '255, 255, 255';
  return `${parseInt(rgb[0], 16)}, ${parseInt(rgb[1], 16)}, ${parseInt(rgb[2], 16)}`;
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
      descSmall: "Health, rewards & support",
      color: "#38B6FF", // soft blue
      border: "rgba(56, 182, 255, 0.25)",
      glow: "rgba(56, 182, 255, 0.4)",
      desc: "Students engage daily through: health, rewards, support, community, and transition guidance.",
      cue: "Student joins a postgraduate community"
    },
    {
      id: 1,
      label: "Trust & Habit Formation",
      icon: "Shield",
      descSmall: "Daily student continuity",
      color: "#00E5FF", // warm white / soft cyan
      border: "rgba(0, 229, 255, 0.25)",
      glow: "rgba(0, 229, 255, 0.4)",
      desc: "Medibank becomes part of the student’s everyday journey — not just an insurer.",
      cue: "Student relies on Medibank during visa transition uncertainty"
    },
    {
      id: 2,
      label: "Behavioural Signals",
      icon: "Activity",
      descSmall: "Intent & behavioural patterns",
      color: "#8B5CF6", // purple-blue
      border: "rgba(139, 92, 246, 0.25)",
      glow: "rgba(139, 92, 246, 0.4)",
      desc: "Every interaction creates behavioural intelligence and intent signals.",
      cue: "Repeated OVHC exploration detected"
    },
    {
      id: 3,
      label: "AI Understanding",
      icon: "Network",
      descSmall: "Cohort & intent intelligence",
      color: "#D946EF", // purple
      border: "rgba(217, 70, 239, 0.25)",
      glow: "rgba(217, 70, 239, 0.4)",
      desc: "The Conversion Engine interprets intent, detects cohorts, and predicts transition readiness.",
      cue: "Graduate Transition Cohort identified"
    },
    {
      id: 4,
      label: "Personalised Interventions",
      icon: "Sparkles",
      descSmall: "Timely personalised journeys",
      color: "#EC4899", // red-purple
      border: "rgba(236, 72, 153, 0.25)",
      glow: "rgba(236, 72, 153, 0.4)",
      desc: "The ecosystem delivers timely, personalised journeys and recommendations.",
      cue: "Graduate Transition Sequence triggered"
    },
    {
      id: 5,
      label: "Continuity & Conversion",
      icon: "ArrowRightLeft",
      descSmall: "OSHC → OVHC continuity",
      color: "#FF4D6A", // Medibank red
      border: "rgba(255, 77, 106, 0.25)",
      glow: "rgba(255, 77, 106, 0.4)",
      desc: "Students transition seamlessly from OSHC to OVHC with reduced friction.",
      cue: "OSHC → OVHC continuity achieved"
    },
    {
      id: 6,
      label: "Loyalty & Lifetime Value",
      icon: "TrendingUp",
      descSmall: "Long-term student relationships",
      color: "#10B981", // green
      border: "rgba(16, 185, 129, 0.25)",
      glow: "rgba(16, 185, 129, 0.4)",
      desc: "Stronger engagement drives higher retention, loyalty, and long-term revenue.",
      cue: "Long-term Medibank relationship established"
    }
  ];

  // Orbiting concepts details
  const orbits = [
    { text: "Learns continuously", radius: 95, speed: 28, delay: 0 },
    { text: "Detects intent earlier", radius: 115, speed: 34, delay: -6 },
    { text: "Refines cohorts", radius: 135, speed: 40, delay: -12 },
    { text: "Adapts interventions", radius: 155, speed: 46, delay: -18 },
    { text: "Improves engagement", radius: 175, speed: 52, delay: -24 },
    { text: "Predicts behaviour", radius: 195, speed: 58, delay: -30 }
  ];

  const N = 7;
  const R = 300; // Flywheel circle radius connecting centers of node cards
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
          width: '900px',
          height: '900px',
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
          width: '1000px',
          height: '1000px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56, 182, 255, 0.04) 0%, transparent 75%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* ── LEFT PANEL (30% Width) ── */}
      <div style={{
        width: '30%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '5% 3.5%',
        boxSizing: 'border-box',
        borderRight: '1px solid rgba(255, 255, 255, 0.04)',
        background: 'rgba(2, 2, 4, 0.25)',
        zIndex: 10,
        position: 'relative'
      }}>
        {/* Header Block */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
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
            fontSize: '2.5rem',
            fontWeight: 800,
            color: '#ffffff',
            margin: 0,
            letterSpacing: '-0.03em',
            lineHeight: 1.15
          }}>
            The Student Continuity Flywheel
          </h1>
          <p style={{
            fontSize: '1.15rem',
            color: 'rgba(255, 255, 255, 0.65)',
            margin: '6px 0 0 0',
            fontWeight: 300
          }}>
            The ecosystem compounds value over time.
          </p>
        </div>

        {/* Middle: Active Stage Details Card */}
        <div style={{ margin: '30px 0', flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: '100%',
                background: 'rgba(6, 6, 8, 0.55)',
                backdropFilter: 'blur(20px)',
                borderRadius: '16px',
                border: `1px solid ${stages[activeStage].border}`,
                boxShadow: `0 12px 40px rgba(0, 0, 0, 0.6), 0 0 25px ${stages[activeStage].glow}`,
                padding: '24px',
                boxSizing: 'border-box'
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
        </div>

        {/* Bottom Closing Text Block */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
          <p style={{
            fontSize: '1.05rem',
            fontWeight: 500,
            color: '#ffffff',
            margin: 0,
            lineHeight: 1.35,
            letterSpacing: '-0.01em',
            textShadow: '0 0 12px rgba(255, 255, 255, 0.1)'
          }}>
            Better engagement creates better understanding. Better understanding creates better continuity.
          </p>
          <span style={{
            fontSize: '0.88rem',
            color: 'rgba(255, 255, 255, 0.45)',
            fontWeight: 300,
            lineHeight: 1.3
          }}>
            The more students engage, the smarter the ecosystem becomes.
          </span>
        </div>
      </div>

      {/* ── RIGHT PANEL (70% Width - Center Flywheel) ── */}
      <div style={{
        width: '70%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 5
      }}>
        {/* Flywheel Container */}
        <div style={{
          position: 'relative',
          width: '850px',
          height: '850px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          
          {/* SVG Flowing Path and Signal Particles (Connects BETWEEN nodes by running underneath centers) */}
          <svg style={{ position: 'absolute', width: '850px', height: '850px', pointerEvents: 'none', zIndex: 3 }}>
            <defs>
              <linearGradient id="flywheel-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38B6FF" stopOpacity="0.2" />
                <stop offset="33%" stopColor="#8B5CF6" stopOpacity="0.3" />
                <stop offset="66%" stopColor="#FF4D6A" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.2" />
              </linearGradient>
              <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Connection Ring */}
            <circle
              cx="425"
              cy="425"
              r={R}
              fill="none"
              stroke="rgba(255, 255, 255, 0.04)"
              strokeWidth="1.5"
            />

            {/* Glowing flowing dash path */}
            <motion.circle
              cx="425"
              cy="425"
              r={R}
              fill="none"
              stroke="url(#flywheel-gradient)"
              strokeWidth="3"
              strokeDasharray="80, 500"
              filter="url(#glow-filter)"
              animate={{ strokeDashoffset: [0, -1000] }}
              transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
            />
            <motion.circle
              cx="425"
              cy="425"
              r={R}
              fill="none"
              stroke="url(#flywheel-gradient)"
              strokeWidth="1.5"
              strokeDasharray="40, 250"
              animate={{ strokeDashoffset: [150, -850] }}
              transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
              opacity="0.5"
            />
          </svg>

          {/* Orbiting Concepts */}
          <div style={{
            position: 'absolute',
            width: '420px',
            height: '420px',
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
                  border: '1px dashed rgba(255, 255, 255, 0.02)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 2
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  fontSize: '8px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: 'rgba(255, 255, 255, 0.32)',
                  textTransform: 'uppercase',
                  background: '#040406',
                  padding: '2px 6px',
                  borderRadius: '8px',
                  transform: 'translateY(-50%)',
                  border: '1px solid rgba(255, 255, 255, 0.02)'
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
                '0 0 30px rgba(255, 77, 106, 0.06), inset 0 0 15px rgba(255, 77, 106, 0.02)',
                '0 0 45px rgba(255, 77, 106, 0.15), inset 0 0 25px rgba(255, 77, 106, 0.06)',
                '0 0 30px rgba(255, 77, 106, 0.06), inset 0 0 15px rgba(255, 77, 106, 0.02)'
              ]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: 'absolute',
              width: '156px',
              height: '156px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(10, 10, 15, 0.95) 0%, rgba(5, 5, 8, 0.95) 100%)',
              border: '1.5px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              boxSizing: 'border-box',
              zIndex: 6
            }}
          >
            {/* Internal Pulse Ripple */}
            <motion.div
              animate={{ scale: [1, 1.45], opacity: [0.12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                border: '2px solid rgba(255, 77, 106, 0.25)',
                pointerEvents: 'none'
              }}
            />
            
            <span style={{
              fontSize: '10px',
              fontWeight: 600,
              color: 'rgba(255, 255, 255, 0.85)',
              textAlign: 'center',
              lineHeight: '1.45',
              letterSpacing: '0.02em',
              textShadow: '0 0 8px rgba(255, 255, 255, 0.15)'
            }}>
              Every interaction makes the ecosystem smarter.
            </span>
          </motion.div>

          {/* 7 Node Cards */}
          {stages.map((stage, idx) => {
            const theta = idx * angleStep - Math.PI / 2;
            const x = R * Math.cos(theta);
            const y = R * Math.sin(theta);
            const isActive = activeStage === idx;

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
                <motion.div
                  onMouseEnter={() => {
                    setActiveStage(idx);
                    setIsHovered(true);
                  }}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={() => setActiveStage(idx)}
                  style={{
                    width: '230px',
                    height: '74px',
                    borderRadius: '14px',
                    background: isActive ? 'rgba(12, 12, 20, 0.88)' : 'rgba(8, 8, 12, 0.65)',
                    border: `1.5px solid ${isActive ? stage.color : 'rgba(255, 255, 255, 0.08)'}`,
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 16px',
                    cursor: 'pointer',
                    boxShadow: isActive 
                      ? `0 8px 30px rgba(0, 0, 0, 0.5), 0 0 25px rgba(${hexToRgb(stage.color)}, 0.35)` 
                      : '0 4px 15px rgba(0,0,0,0.4)',
                    boxSizing: 'border-box',
                    transform: 'translate(-50%, -50%)'
                  }}
                  animate={{
                    scale: isActive ? 1.08 : 1
                  }}
                  transition={{ type: 'spring', stiffness: 250, damping: 18 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
                    
                    {/* Glowing Icon */}
                    <motion.div 
                      animate={isActive ? { scale: [1, 1.06, 1] } : {}}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: isActive ? `rgba(${hexToRgb(stage.color)}, 0.14)` : 'rgba(255, 255, 255, 0.03)',
                        border: `1px solid ${isActive ? stage.color : 'rgba(255, 255, 255, 0.08)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: isActive ? `0 0 10px rgba(${hexToRgb(stage.color)}, 0.25)` : 'none',
                        transition: 'all 0.3s ease',
                        flexShrink: 0
                      }}
                    >
                      <IconComponent
                        name={stage.icon}
                        color={isActive ? stage.color : 'rgba(255, 255, 255, 0.45)'}
                        size={18}
                      />
                    </motion.div>

                    {/* Description Text */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', textAlign: 'left', overflow: 'hidden' }}>
                      <span style={{
                        fontSize: '12.5px',
                        fontWeight: 700,
                        color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.85)',
                        letterSpacing: '-0.02em',
                        transition: 'color 0.3s ease',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {stage.label}
                      </span>
                      <span style={{
                        fontSize: '9.5px',
                        fontWeight: 400,
                        color: isActive ? stage.color : 'rgba(255, 255, 255, 0.45)',
                        transition: 'color 0.3s ease',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        opacity: 0.85
                      }}>
                        {stage.descSmall}
                      </span>
                    </div>

                  </div>

                  {/* Micro Signal particle overlay */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.15, 0.4, 0.15] }}
                      transition={{ repeat: Infinity, duration: 2.5 }}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        borderRadius: '12px',
                        background: `radial-gradient(circle at 20% 50%, rgba(${hexToRgb(stage.color)}, 0.1) 0%, transparent 60%)`,
                        pointerEvents: 'none'
                      }}
                    />
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
