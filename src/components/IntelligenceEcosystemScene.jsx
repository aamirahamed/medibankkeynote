import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/* ─── SIGNAL DATA ─────────────────────────────────────────────────── */
const signalGroups = [
  {
    id: 'community',
    title: 'Community Signals',
    description: 'Reveals long-term Australia integration, career intent, and social continuity behaviour.',
    color: '#6E91F2',
    colorDim: 'rgba(110,145,242,0.08)',
    colorBorder: 'rgba(110,145,242,0.22)',
    colorGlow: 'rgba(110,145,242,0.4)',
    iconPath: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
    signals: [
      'Joined postgraduate communities',
      'Active in PR & migration discussions',
      'Attended graduate visa webinars',
      'Participated in networking events',
      'Joined job-seeking groups',
      'Saved employment-related posts',
      'Followed career-related groups',
      'Joined local city communities',
    ],
  },
  {
    id: 'ovhc',
    title: 'OVHC & Continuity Signals',
    description: 'Reveals direct transition intent and continuity readiness.',
    color: '#CD0D2D',
    colorDim: 'rgba(205,13,45,0.08)',
    colorBorder: 'rgba(205,13,45,0.22)',
    colorGlow: 'rgba(205,13,45,0.4)',
    iconPath: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
    signals: [
      'Viewed OVHC plans repeatedly',
      'Compared multiple OVHC tiers',
      'Revisited continuity pricing',
      'Explored benefits carry-forward',
      'Started but did not complete flow',
      'Viewed OVHC FAQs multiple times',
      'Saved recommended plans',
      'Checked transition eligibility',
    ],
  },
  {
    id: 'health',
    title: 'Health & Rewards Signals',
    description: 'Reveals trust formation, ecosystem stickiness, and long-term engagement habits.',
    color: '#34D399',
    colorDim: 'rgba(52,211,153,0.08)',
    colorBorder: 'rgba(52,211,153,0.22)',
    colorGlow: 'rgba(52,211,153,0.4)',
    iconPath: 'M22 12h-4l-3 9L9 3l-3 9H2',
    signals: [
      'Maintained daily step streaks',
      'Linked Apple Health / wearables',
      'Used health score consistently',
      'Maintained long-term streaks',
      'Engaged with wellness goals',
      'Returned to health challenges',
      'University health competitions',
      'Continued engagement near graduation',
    ],
  },
  {
    id: 'lifecycle',
    title: 'Student Lifecycle Signals',
    description: 'Reveals transition timing, future planning, and post-study intent.',
    color: '#F59E0B',
    colorDim: 'rgba(245,158,11,0.08)',
    colorBorder: 'rgba(245,158,11,0.22)',
    colorGlow: 'rgba(245,158,11,0.4)',
    iconPath: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
    signals: [
      'Graduation date approaching',
      'Viewed post-study guidance',
      'Accessed visa support resources',
      'Engaged with settlement content',
      'Viewed accommodation guidance',
      'Used employment resources',
      'Accessed Medicare / TFN info',
      'Participated in graduate content',
    ],
  },
];

/* ─── PARTICLE CANVAS ─────────────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const palette = [
      [110, 145, 242],
      [205, 13, 45],
      [52, 211, 153],
      [245, 158, 11],
      [139, 92, 246],
    ];

    let W = canvas.width = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;

    function rand(a, b) { return Math.random() * (b - a) + a; }

    const nodes = Array.from({ length: 55 }, () => {
      const col = palette[Math.floor(Math.random() * palette.length)];
      return {
        x: rand(0, W), y: rand(0, H),
        vx: rand(-0.15, 0.15), vy: rand(-0.15, 0.15),
        r: rand(1.2, 3),
        alpha: rand(0.3, 0.75),
        col,
        phase: rand(0, Math.PI * 2),
        speed: rand(0.006, 0.014),
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
          if (d < 170) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(255,255,255,${(1 - d / 170) * 0.045})`;
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
        if (n.x < -10) n.x = W + 10;
        if (n.x > W + 10) n.x = -10;
        if (n.y < -10) n.y = H + 10;
        if (n.y > H + 10) n.y = -10;
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
        pointerEvents: 'none', zIndex: 1,
      }}
    />
  );
}

/* ─── SIGNAL GROUP CARD ───────────────────────────────────────────── */
function SignalCard({ group, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'relative',
        background: 'rgba(255,255,255,0.025)',
        border: `1px solid ${group.colorBorder}`,
        borderRadius: 16,
        padding: '20px 18px 18px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        overflow: 'hidden',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: `0 0 0 0.5px rgba(255,255,255,0.04) inset, 0 1px 0 rgba(255,255,255,0.06) inset, 0 4px 24px rgba(0,0,0,0.35)`,
        flex: 1,
        transition: 'box-shadow 0.3s ease',
      }}
      whileHover={{
        boxShadow: `0 0 0 0.5px rgba(255,255,255,0.06) inset, 0 1px 0 rgba(255,255,255,0.08) inset, 0 8px 40px rgba(0,0,0,0.4), 0 0 36px ${group.colorGlow}`,
        y: -3,
      }}
    >
      {/* Corner glow */}
      <div style={{
        position: 'absolute', top: -28, right: -28,
        width: 88, height: 88, borderRadius: '50%',
        background: `radial-gradient(circle, ${group.colorGlow} 0%, transparent 70%)`,
        pointerEvents: 'none', opacity: 0.45,
      }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 11 }}>
        <div style={{
          width: 34, height: 34, minWidth: 34, borderRadius: 9,
          background: group.colorDim,
          border: `1px solid ${group.colorBorder}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: group.color,
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
            <path d={group.iconPath} />
          </svg>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <span style={{
            fontSize: 9, fontWeight: 700, color: group.color,
            letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.7,
          }}>Signal Intelligence</span>
          <h3 style={{
            fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.93)',
            margin: 0, lineHeight: 1.25, letterSpacing: '-0.01em',
          }}>{group.title}</h3>
        </div>
      </div>

      {/* Description */}
      <p style={{
        fontSize: 11, color: 'rgba(255,255,255,0.36)',
        lineHeight: 1.55, margin: 0,
      }}>{group.description}</p>

      {/* Divider */}
      <div style={{
        height: 1,
        background: `linear-gradient(90deg, ${group.colorBorder}, transparent)`,
        opacity: 0.6,
      }} />

      {/* Signals */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {group.signals.map((sig, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.12 + i * 0.04, duration: 0.4 }}
            style={{ display: 'flex', alignItems: 'center', gap: 7 }}
          >
            <motion.div
              animate={{ scale: [1, 1.35, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.5, delay: i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: 5, height: 5, minWidth: 5, borderRadius: '50%',
                background: group.color,
                boxShadow: `0 0 6px ${group.color}`,
              }}
            />
            <span style={{
              fontSize: 10.5, color: 'rgba(255,255,255,0.5)',
              fontWeight: 400, lineHeight: 1.4,
            }}>{sig}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── MAIN SCENE ──────────────────────────────────────────────────── */
export default function IntelligenceEcosystemScene() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'radial-gradient(ellipse at 20% 20%, rgba(110,145,242,0.06) 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(52,211,153,0.05) 0%, transparent 55%), #050609',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '"Neue Montreal", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Inter", sans-serif',
    }}>
      {/* Ambient glows */}
      {[
        { top: '-8%', left: '-4%', size: 500, color: 'rgba(110,145,242,0.10)', delay: 0 },
        { top: '15%', right: '-6%', size: 420, color: 'rgba(205,13,45,0.07)', delay: 2 },
        { bottom: '-8%', left: '28%', size: 460, color: 'rgba(52,211,153,0.07)', delay: 4 },
        { bottom: '2%', right: '8%', size: 340, color: 'rgba(245,158,11,0.06)', delay: 6 },
      ].map((g, i) => (
        <motion.div key={i}
          animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 8, delay: g.delay, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: g.top, bottom: g.bottom, left: g.left, right: g.right,
            width: g.size, height: g.size,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${g.color} 0%, transparent 70%)`,
            filter: 'blur(80px)',
            pointerEvents: 'none', zIndex: 0,
          }}
        />
      ))}

      {/* Particle canvas */}
      <ParticleCanvas />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 10,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center',
        padding: '36px 52px 48px',
        gap: 32, flex: 1,
      }}>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', maxWidth: 680 }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '3px 11px', borderRadius: 999,
            background: 'rgba(205,13,45,0.08)',
            border: '1px solid rgba(205,13,45,0.2)',
            fontSize: 10, fontWeight: 700, color: 'rgba(205,13,45,0.9)',
            letterSpacing: '0.06em', textTransform: 'uppercase',
            marginBottom: 16,
          }}>
            Step 32 · Behavioural Intelligence
          </div>
          <h1 style={{
            fontSize: 'clamp(30px,3.6vw,48px)',
            fontWeight: 800, color: '#ffffff',
            lineHeight: 1.1, letterSpacing: '-0.03em',
            margin: '0 0 14px',
          }}>
            Every Interaction Becomes Intelligence
          </h1>
          <p style={{
            fontSize: 'clamp(13px,1.3vw,16px)',
            color: 'rgba(255,255,255,0.42)',
            lineHeight: 1.6, margin: 0,
          }}>
            Behavioural signals across the ecosystem continuously power the Conversion Engine.
          </p>
        </motion.div>

        {/* Four signal cards */}
        <div style={{
          display: 'flex', flexDirection: 'row',
          gap: 16, width: '100%', maxWidth: 1300, flex: 1,
          alignItems: 'stretch',
        }}>
          {signalGroups.map((group, i) => (
            <SignalCard key={group.id} group={group} index={i} />
          ))}
        </div>

        {/* Bottom insight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative', maxWidth: 760, width: '100%',
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 18, padding: '26px 36px',
            textAlign: 'center',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            boxShadow: '0 0 0 0.5px rgba(255,255,255,0.04) inset, 0 1px 0 rgba(255,255,255,0.06) inset, 0 8px 48px rgba(0,0,0,0.35)',
            overflow: 'hidden',
          }}
        >
          {/* Orb */}
          <motion.div
            animate={{ scale: [1, 1.14, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', top: -55, left: '50%',
              transform: 'translateX(-50%)',
              width: 180, height: 180, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(205,13,45,0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{
              fontSize: 'clamp(15px,1.8vw,20px)',
              fontWeight: 700, color: 'rgba(255,255,255,0.93)',
              lineHeight: 1.35, letterSpacing: '-0.02em', margin: '0 0 12px',
            }}>
              Individual signals are valuable.{' '}
              <span style={{
                background: 'linear-gradient(135deg,#cd0d2d,#f26578)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Signal combinations create intelligence.
              </span>
            </p>
            <p style={{
              fontSize: 'clamp(11px,1vw,13.5px)',
              color: 'rgba(255,255,255,0.36)',
              lineHeight: 1.65, margin: 0, maxWidth: 580, marginInline: 'auto',
            }}>
              The Conversion Engine continuously combines behavioural patterns across the ecosystem
              to identify high-intent student cohorts, transition readiness, and continuity opportunities.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
