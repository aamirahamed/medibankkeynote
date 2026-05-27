import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import LaptopMockup from './LaptopMockup';
import CommandCentre from '@admin/pages/CommandCentre';
import Layout from '@admin/components/Layout';

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
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
        gap: 6,
        zIndex: 10,
        position: 'relative'
      }}>
        <h1 style={{
          fontSize: 'clamp(24px, 2.2vw, 32px)',
          fontWeight: 800,
          color: '#ffffff',
          margin: 0,
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
          maxWidth: '900px'
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

        {/* Active System Pulse Status Indicator */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
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
        margin: '10px 0',
        zIndex: 10
      }}>
        {/* Unified Center Stage Wrapper */}
        <div style={{
          position: 'relative',
          width: '666px',
          height: '416px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          {/* ── CENTRAL SYSTEM NUCLEUS CORE ── */}
          <div style={{
            position: 'absolute',
            top: 'calc(50% - 25px)',
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

          {/* ── CENTERED LAPTOP MOCKUP (ADMIN ENGINE) ── */}
          <LaptopMockup
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 0.65, y: -25 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              transformOrigin: 'center center',
              zIndex: 10
            }}
          >
            <MemoryRouter initialEntries={['/']}>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<CommandCentre />} />
                </Route>
              </Routes>
            </MemoryRouter>
          </LaptopMockup>
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
            background: 'linear-gradient(135deg, rgba(205, 13, 45, 0.75) 0%, rgba(56, 182, 255, 0.7) 100%)',
            border: '1.5px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 25px rgba(205, 13, 45, 0.25), 0 0 25px rgba(56, 182, 255, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
            padding: '16px 48px',
            borderRadius: 30,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            minWidth: '400px',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            transition: 'box-shadow 0.4s ease, border-color 0.4s ease, background 0.4s ease'
          }}
          whileHover={{
            scale: 1.04,
            background: 'linear-gradient(135deg, rgba(205, 13, 45, 0.9) 0%, rgba(56, 182, 255, 0.85) 100%)',
            boxShadow: '0 15px 50px rgba(205, 13, 45, 0.45), 0 0 40px rgba(56, 182, 255, 0.45), 0 0 50px rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.35)',
            borderColor: 'rgba(255, 255, 255, 0.45)'
          }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Futuristic Border Glow */}
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 30,
            padding: 1.5,
            background: 'linear-gradient(135deg, rgba(255, 77, 106, 0.4) 0%, rgba(56, 182, 255, 0.4) 100%)',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
            pointerEvents: 'none',
            opacity: 0.8
          }} />

          {/* Animated Light Sweep Effect */}
          <motion.div
            animate={{ left: ['-100%', '200%'] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: 0,
              width: '50%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), transparent)',
              transform: 'skewX(-25deg)',
              pointerEvents: 'none'
            }}
          />

          {/* Button Text */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <span style={{
              fontSize: 17,
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}>
              Enter the Conversion Engine
            </span>
            <span style={{
              fontSize: 8.5,
              fontWeight: 900,
              color: '#ffffff',
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1.5px solid rgba(255, 255, 255, 0.6)',
              padding: '2px 7px',
              borderRadius: 6,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              boxShadow: '0 0 10px rgba(255,255,255,0.2)'
            }}>
              Live Demo
            </span>
          </div>

          {/* Button Subtext */}
          <span style={{
            fontSize: 10,
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.8)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            textShadow: '0 1px 2px rgba(0,0,0,0.2)'
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
