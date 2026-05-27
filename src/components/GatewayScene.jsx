import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── PARTICLE CANVAS ─────────────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const palette = [
      [56, 182, 255],   // Detection Blue
      [139, 92, 246],   // Intelligence Purple
      [255, 77, 106]    // Orchestration Red
    ];

    let W = canvas.width = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;

    function rand(a, b) { return Math.random() * (b - a) + a; }

    const nodes = Array.from({ length: 40 }, () => {
      const col = palette[Math.floor(Math.random() * palette.length)];
      return {
        x: rand(0, W), y: rand(0, H),
        vx: rand(-0.1, 0.1), vy: rand(-0.2, -0.05), // Directional upward flow
        r: rand(1.2, 2.5),
        alpha: rand(0.2, 0.5),
        col,
        phase: rand(0, Math.PI * 2),
        speed: rand(0.005, 0.01)
      };
    });

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 150) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(255,255,255,${(1 - d / 150) * 0.03})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // dots
      nodes.forEach(n => {
        n.phase += n.speed;
        const a = n.alpha * (0.6 + 0.4 * Math.sin(n.phase));
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${n.col[0]},${n.col[1]},${n.col[2]},${a.toFixed(2)})`;
        ctx.fill();

        n.x += n.vx; n.y += n.vy;
        
        // Loop back from top to bottom
        if (n.x < -10) n.x = W + 10;
        if (n.x > W + 10) n.x = -10;
        if (n.y < -10) {
          n.y = H + 10;
          n.x = rand(0, W);
        }
      });

      animId = requestAnimationFrame(draw);
    }

    draw();

    const ro = new ResizeObserver(() => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    });
    ro.observe(canvas);

    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 1
      }}
    />
  );
}

/* ─── SCENE MAIN ──────────────────────────────────────────────────── */
export default function GatewayScene() {
  const [isBooting, setIsBooting] = useState(false);

  const handleLaunch = () => {
    setIsBooting(true);
    setTimeout(() => {
      window.open('https://medibank-admin-engine.vercel.app/', '_blank');
      setIsBooting(false);
    }, 1200);
  };

  const layers = [
    {
      id: 'orchestration',
      name: 'Orchestration Layer',
      desc: 'Packages intelligence into actionable, channel-specific briefs.',
      color: '#FF4D6A',
      glow: 'rgba(255, 77, 106, 0.25)',
      dim: 'rgba(255, 77, 106, 0.05)',
      border: 'rgba(255, 77, 106, 0.22)',
      agents: ['Campaign Optimisation', 'Insight Narrator'],
      icon: (color) => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="21" x2="4" y2="14" />
          <line x1="4" y1="10" x2="4" y2="3" />
          <line x1="12" y1="21" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12" y2="3" />
          <line x1="20" y1="21" x2="20" y2="16" />
          <line x1="20" y1="12" x2="20" y2="3" />
          <line x1="2" y1="14" x2="6" y2="14" />
          <line x1="10" y1="8" x2="14" y2="8" />
          <line x1="18" y1="16" x2="22" y2="16" />
        </svg>
      )
    },
    {
      id: 'intelligence',
      name: 'Intelligence Layer',
      desc: 'Models behavioral telemetry, scores propensity, and tracks intent.',
      color: '#8B5CF6',
      glow: 'rgba(139, 92, 246, 0.25)',
      dim: 'rgba(139, 92, 246, 0.05)',
      border: 'rgba(139, 92, 246, 0.22)',
      agents: ['Conversion Agent', 'Activation Agent', 'Community Agent', 'Visa Transition Agent'],
      icon: (color) => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      )
    },
    {
      id: 'detection',
      name: 'Detection Layer',
      desc: 'Continuously monitors raw app telemetry to identify micro-events.',
      color: '#38B6FF',
      glow: 'rgba(56, 182, 255, 0.25)',
      dim: 'rgba(56, 182, 255, 0.05)',
      border: 'rgba(56, 182, 255, 0.22)',
      agents: ['Segmentation Agent', 'Retention Risk Agent', 'Referral Agent'],
      icon: (color) => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      )
    }
  ];

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'radial-gradient(ellipse at 50% 50%, rgba(20, 24, 45, 0.8) 0%, #030407 80%)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxSizing: 'border-box',
      padding: '40px 60px 48px',
      fontFamily: '"Neue Montreal", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Inter", sans-serif'
    }}>
      {/* Ambient background glow points */}
      {[
        { top: '-10%', left: '20%', size: 600, color: 'rgba(255, 77, 106, 0.06)' },
        { bottom: '-15%', left: '40%', size: 700, color: 'rgba(56, 182, 255, 0.07)' },
        { top: '30%', right: '-10%', size: 550, color: 'rgba(139, 92, 246, 0.08)' }
      ].map((g, i) => (
        <motion.div key={i}
          animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: i * 2 }}
          style={{
            position: 'absolute',
            top: g.top, bottom: g.bottom, left: g.left, right: g.right,
            width: g.size, height: g.size,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${g.color} 0%, transparent 70%)`,
            filter: 'blur(90px)',
            pointerEvents: 'none', zIndex: 0
          }}
        />
      ))}

      {/* Particle Canvas */}
      <ParticleCanvas />

      {/* Vertical Animated Energy Flow Lines behind content */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2 }}>
        <defs>
          <linearGradient id="flow-grad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#38B6FF" stopOpacity="0" />
            <stop offset="30%" stopColor="#38B6FF" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#8B5CF6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FF4D6A" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Left vertical rail */}
        <motion.line x1="12%" y1="90%" x2="12%" y2="10%" stroke="url(#flow-grad)" strokeWidth="2" strokeDasharray="10, 120"
          animate={{ strokeDashoffset: [0, -130] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
        
        {/* Right vertical rail */}
        <motion.line x1="88%" y1="90%" x2="88%" y2="10%" stroke="url(#flow-grad)" strokeWidth="2" strokeDasharray="15, 150"
          animate={{ strokeDashoffset: [0, -165] }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} />
          
        {/* Central visual pathways connecting layers */}
        {[30, 40, 50, 60, 70].map((pct, idx) => (
          <motion.path key={idx}
            d={`M ${pct}% 70% Q ${pct + (idx - 2) * 2}% 50% ${pct}% 30%`}
            fill="none"
            stroke="url(#flow-grad)"
            strokeWidth="1.2"
            strokeDasharray="8, 90"
            opacity="0.25"
            animate={{ strokeDashoffset: [0, -98] }}
            transition={{ duration: 3.5 + idx * 0.3, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </svg>

      {/* HEADER SECTION */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 10, position: 'relative' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{
            fontSize: 9.5,
            fontWeight: 800,
            letterSpacing: '0.18em',
            color: '#FF4D6A',
            textTransform: 'uppercase'
          }}>
            Live System Architecture
          </span>
          <h1 style={{
            fontSize: 'clamp(24px, 2.2vw, 32px)',
            fontWeight: 800,
            color: '#ffffff',
            margin: 0,
            letterSpacing: '-0.02em',
            lineHeight: 1.15
          }}>
            From Behavioural Signals to Operational Intelligence
          </h1>
          <p style={{
            fontSize: 'clamp(11.5px, 1.1vw, 14px)',
            color: 'rgba(255, 255, 255, 0.45)',
            margin: '2px 0 0 0',
            fontWeight: 300,
            maxWidth: '750px',
            lineHeight: 1.45
          }}>
            AI agents continuously detect, interpret, orchestrate, and prepare human-reviewable decisions across the student lifecycle.
          </p>
        </div>
        
        {/* Active System Pulse Status Indicator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          padding: '6px 14px',
          borderRadius: 20,
          backdropFilter: 'blur(10px)'
        }}>
          <span style={{ position: 'relative', display: 'flex', height: '8px', width: '8px' }}>
            <span style={{
              animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
              position: 'absolute',
              height: '100%', width: '100%',
              borderRadius: '50%',
              background: '#38B6FF',
              opacity: 0.75
            }} />
            <span style={{
              position: 'relative',
              borderRadius: '50%',
              height: '8px', width: '8px',
              background: '#38B6FF'
            }} />
          </span>
          <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>
            System Ready
          </span>
        </div>
      </div>

      {/* 3-LAYER STACK & SYSTEM NUCLEUS CORE */}
      <div style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: '20px 0',
        zIndex: 10
      }}>

        {/* ── CENTRAL SYSTEM NUCLEUS CORE ── */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 8,
          pointerEvents: 'none'
        }}>
          {/* Outer Rotating Glowing Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            style={{
              width: 240,
              height: 240,
              borderRadius: '50%',
              border: '1px dashed rgba(139, 92, 246, 0.2)',
              boxShadow: '0 0 50px rgba(139, 92, 246, 0.05), inset 0 0 30px rgba(139, 92, 246, 0.02)',
              position: 'absolute',
              top: -120,
              left: -120
            }}
          />

          {/* Inner Rotating Orbit Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            style={{
              width: 170,
              height: 170,
              borderRadius: '50%',
              border: '1px solid rgba(255, 77, 106, 0.1)',
              position: 'absolute',
              top: -85,
              left: -85
            }}
          >
            {/* Tiny orbiting electron particle */}
            <div style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#FF4D6A',
              boxShadow: '0 0 8px #FF4D6A',
              position: 'absolute',
              top: '12%',
              left: '12%'
            }} />
          </motion.div>

          {/* Glowing Center Core */}
          <motion.div
            animate={{ scale: [1, 1.08, 1], boxShadow: ['0 0 40px rgba(139, 92, 246, 0.35)', '0 0 60px rgba(139, 92, 246, 0.55)', '0 0 40px rgba(139, 92, 246, 0.35)'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: 90,
              height: 90,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(139, 92, 246, 0.15) 50%, rgba(3, 7, 18, 0.95) 90%)',
              border: '1.5px solid rgba(139, 92, 246, 0.3)',
              position: 'absolute',
              top: -45,
              left: -45,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(20px)'
            }}
          >
            {/* Core Icon/Graphic */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </motion.div>
        </div>

        {/* ── 3 STACKED ARCHITECTURE LAYERS ── */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 34,
          width: '100%',
          maxWidth: 960,
          position: 'relative',
          zIndex: 10
        }}>
          {layers.map((layer, idx) => (
            <motion.div
              key={layer.id}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.0, delay: 0.15 + idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.005) 100%)',
                border: `1px solid ${layer.border}`,
                boxShadow: `0 8px 32px rgba(0, 0, 0, 0.35), inset 0 0 0 0.5px rgba(255,255,255,0.02), 0 0 20px ${layer.glow}30`,
                borderRadius: 14,
                padding: '16px 24px',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 24,
                transition: 'box-shadow 0.3s ease, border-color 0.3s ease'
              }}
              whileHover={{
                boxShadow: `0 8px 40px rgba(0, 0, 0, 0.5), inset 0 0 0 1px ${layer.color}35, 0 0 35px ${layer.color}35`,
                borderColor: layer.color
              }}
            >
              {/* Left Side Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1.2 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: layer.dim,
                  border: `1px solid ${layer.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: layer.color,
                  boxShadow: `0 0 10px ${layer.color}15`
                }}>
                  {layer.icon(layer.color)}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <h3 style={{ fontSize: 13, fontWeight: 800, color: '#ffffff', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {layer.name}
                  </h3>
                  <span style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.4)', lineHeight: 1.35 }}>
                    {layer.desc}
                  </span>
                </div>
              </div>

              {/* Middle Connected Energy Channel (Space around center core) */}
              <div style={{ flex: 0.6, minWidth: 100 }} />

              {/* Right Side Specialized Agents List */}
              <div style={{
                display: 'flex',
                gap: 8,
                flexWrap: 'wrap',
                justifyContent: 'flex-end',
                flex: 1.8
              }}>
                {layer.agents.map((agent, aIdx) => (
                  <motion.div
                    key={agent}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 + idx * 0.15 + aIdx * 0.08 }}
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      padding: '5px 12px',
                      borderRadius: 20,
                      fontSize: 10.5,
                      color: 'rgba(255, 255, 255, 0.65)',
                      fontWeight: 500,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6
                    }}
                    whileHover={{
                      background: layer.dim,
                      borderColor: `${layer.color}60`,
                      color: '#ffffff',
                      boxShadow: `0 0 10px ${layer.color}15`
                    }}
                  >
                    <span style={{
                      width: 5, height: 5, borderRadius: '50%',
                      background: layer.color,
                      boxShadow: `0 0 5px ${layer.color}`
                    }} />
                    {agent}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* PORTAL LAUNCH GATEWAY SECTION */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        position: 'relative'
      }}>
        {/* Enter Operating System Gateway Component */}
        <motion.button
          onClick={handleLaunch}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{
            background: 'linear-gradient(135deg, rgba(205, 13, 45, 0.8) 0%, rgba(99, 102, 241, 0.75) 100%)',
            border: '1px solid rgba(255,255,255,0.18)',
            boxShadow: '0 10px 40px rgba(205, 13, 45, 0.25), 0 0 30px rgba(99, 102, 241, 0.2), inset 0 1px 0 rgba(255,255,255,0.2)',
            padding: '14px 44px',
            borderRadius: 24,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            minWidth: '380px'
          }}
          whileHover={{
            scale: 1.03,
            boxShadow: '0 15px 50px rgba(205, 13, 45, 0.35), 0 0 45px rgba(99, 102, 241, 0.35), inset 0 1px 0 rgba(255,255,255,0.3)',
            borderColor: 'rgba(255,255,255,0.35)'
          }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Animated Light Sweep Effect */}
          <motion.div
            animate={{ left: ['-100%', '200%'] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: 0,
              width: '50%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)',
              transform: 'skewX(-25deg)',
              pointerEvents: 'none'
            }}
          />

          {/* Button Text */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 1 }}>
            <span style={{
              fontSize: 16,
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              textShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}>
              Enter the Conversion Engine
            </span>
            <span style={{
              fontSize: 8.5,
              fontWeight: 800,
              color: '#ffffff',
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1.5px solid rgba(255,255,255,0.5)',
              padding: '1.5px 6px',
              borderRadius: 6,
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}>
              Live Demo
            </span>
          </div>

          {/* Button Subtext */}
          <span style={{
            fontSize: 10.5,
            fontWeight: 400,
            color: 'rgba(255, 255, 255, 0.75)',
            letterSpacing: '0.02em',
            textTransform: 'uppercase'
          }}>
            Launch live operational workspace ➔
          </span>
        </motion.button>
      </div>

      {/* SYSTEM BOOTING CINEMATIC OVERLAY */}
      <AnimatePresence>
        {isBooting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: '#040406',
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'all'
            }}
          >
            {/* System Boot Core pulse */}
            <motion.div
              animate={{ 
                scale: [1, 2.5, 5, 0],
                opacity: [0.3, 0.8, 1, 0]
              }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{
                width: 150,
                height: 150,
                borderRadius: '50%',
                background: 'radial-gradient(circle, #ffffff 0%, rgba(205, 13, 45, 0.8) 50%, rgba(99, 102, 241, 0.8) 80%, transparent 100%)',
                filter: 'blur(10px)',
                boxShadow: '0 0 100px 30px rgba(205, 13, 45, 0.5), 0 0 80px 20px rgba(99, 102, 241, 0.5)'
              }}
            />
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: '#ffffff',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginTop: 20
              }}
            >
              Booting Operational Engine...
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
