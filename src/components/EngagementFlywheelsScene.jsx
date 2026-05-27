import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/* ─── PARTICLE CANVAS ─────────────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const palette = [
      [29, 185, 84],    // Spotify Green
      [197, 168, 128],  // Starbucks Gold
      [205, 13, 45],    // Medibank Red
      [56, 182, 255],   // Soft Blue
      [139, 92, 246]    // Purple
    ];

    let W = canvas.width = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;

    function rand(a, b) { return Math.random() * (b - a) + a; }

    const nodes = Array.from({ length: 45 }, () => {
      const col = palette[Math.floor(Math.random() * palette.length)];
      return {
        x: rand(0, W), y: rand(0, H),
        vx: rand(-0.12, 0.12), vy: rand(-0.12, 0.12),
        r: rand(1.2, 2.8),
        alpha: rand(0.2, 0.6),
        col,
        phase: rand(0, Math.PI * 2),
        speed: rand(0.005, 0.012)
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
          if (d < 160) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(255,255,255,${(1 - d / 160) * 0.035})`;
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
        pointerEvents: 'none', zIndex: 1
      }}
    />
  );
}

/* ─── SCENE MAIN ──────────────────────────────────────────────────── */
export default function EngagementFlywheelsScene() {
  const columns = [
    {
      id: 'spotify',
      name: 'Spotify',
      tagline: 'HABIT LOOP & PERSONALISATION',
      headline: 'Spotify studies behavioural patterns to personalise experiences, strengthen habit loops, and increase subscription retention.',
      color: '#1DB954',
      glow: 'rgba(29, 185, 84, 0.15)',
      dim: 'rgba(29, 185, 84, 0.06)',
      border: 'rgba(29, 185, 84, 0.25)',
      tracks: [
        'Listening history & frequency',
        'Repeat session patterns',
        'Workout & mood playlists',
        'Skips, replays, and pauses',
        'Genre & artist preferences',
        'Time-of-day listening habits'
      ],
      creates: [
        'Hyper-personalised recommendations',
        'Strong daily habit formation',
        'Increased ecosystem stickiness',
        'Premium subscription retention'
      ],
      dataPoint: '30%+',
      dataLabel: 'of listening activity comes from Spotify recommendations.',
      source: 'Source: McKinsey / Spotify Personalisation Studies',
      bottomInsight: 'Behavioural data becomes retention intelligence.',
      icon: (color) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm4.5 13.5a.5.5 0 0 1-.7.2c-2.2-1.3-5-1.6-8.2-.9a.5.5 0 0 1-.3-.9c3.6-.8 6.7-.5 9.2 1a.5.5 0 0 1 .2.7zm1.3-2.5c-.2.3-.6.4-.9.2-2.5-1.5-6.3-2-9.2-1a.5.5 0 0 1-.3-.9c3.3-1 7.6-.5 10.4 1.2.3.2.4.6.2.9zm.1-2.7C15 8 9.2 7.8 5.8 8.8a.5.5 0 1 1-.3-.9c3.9-1.2 10.3-1 13.2 1a.5.5 0 0 1-.2.9z"/>
        </svg>
      )
    },
    {
      id: 'starbucks',
      name: 'Starbucks Rewards',
      tagline: 'LOYALTY & REWARD LOOPS',
      headline: 'Starbucks transformed everyday purchases into a long-term loyalty ecosystem through rewards, personalisation, and engagement loops.',
      color: '#C5A880',
      glow: 'rgba(197, 168, 128, 0.15)',
      dim: 'rgba(197, 168, 128, 0.06)',
      border: 'rgba(197, 168, 128, 0.25)',
      tracks: [
        'Purchase frequency & timing',
        'Star reward redemption rates',
        'Local store visit patterns',
        'Seasonal menu preferences',
        'Personalised offer responses',
        'Mobile pre-order habits'
      ],
      creates: [
        'Predictable repeat engagement',
        'Daily purchasing habits',
        'Deep brand loyalty & affinity',
        'Increased customer lifetime value'
      ],
      dataPoint: '57%+',
      dataLabel: 'of U.S. company-operated sales come from Starbucks Rewards members.',
      source: 'Source: Starbucks Investor Reports',
      bottomInsight: 'Daily engagement compounds into long-term loyalty.',
      icon: (color) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      )
    },
    {
      id: 'medibank',
      name: 'Medibank Companion',
      tagline: 'CONTINUITY & WELLBEING ENGINE',
      headline: 'Medibank Companion applies proven engagement and behavioural intelligence systems to the international student healthcare journey.',
      color: '#FF4D6A',
      glow: 'rgba(255, 77, 106, 0.15)',
      dim: 'rgba(255, 77, 106, 0.06)',
      border: 'rgba(255, 77, 106, 0.25)',
      tracks: [
        'Community forum participation',
        'Healthcare webinar attendance',
        'OVHC plan comparisons & pricing views',
        'Daily step goals & health streaks',
        'Pre-arrival onboarding checklists',
        'Transition resource downloads'
      ],
      creates: [
        'Continuous behavioural intelligence',
        'Clear stay intent & transition signals',
        'Mitigated silent disengagement risk',
        'Personalised transition to OVHC',
        'Multi-year member relationships'
      ],
      dataPoint: 'INTELLIGENCE',
      dataLabel: 'flowing seamlessly into a central Conversion Engine for human approval.',
      source: 'Group 6 Project Concept',
      bottomInsight: 'Every interaction strengthens continuity.',
      icon: (color) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="M8 11h8"/>
          <path d="M12 7v8"/>
        </svg>
      )
    }
  ];

  const flywheelStages = [
    {
      label: 'Engagement',
      desc: 'Daily interactive habit loops',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38B6FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9-9a9 9 0 0 0-9 9m9-9V3"/>
        </svg>
      )
    },
    {
      label: 'Understanding',
      desc: 'Pattern & stay intent detection',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
          <line x1="12" y1="2" x2="12" y2="4"/>
          <line x1="12" y1="20" x2="12" y2="22"/>
          <line x1="2" y1="12" x2="4" y2="12"/>
          <line x1="20" y1="12" x2="22" y2="12"/>
        </svg>
      )
    },
    {
      label: 'Retention',
      desc: 'Reduced drop-off & silent churn',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF4D6A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      )
    },
    {
      label: 'Long-Term Value',
      desc: 'Seamless transition loops',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      )
    }
  ];

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'radial-gradient(ellipse at 15% 15%, rgba(29,185,84,0.04) 0%, transparent 60%), radial-gradient(ellipse at 85% 15%, rgba(255,77,106,0.04) 0%, transparent 60%), #040406',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '"Neue Montreal", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Inter", sans-serif',
      boxSizing: 'border-box'
    }}>
      {/* Background ambient glows */}
      {[
        { top: '-10%', left: '30%', size: 480, color: 'rgba(197,168,128,0.06)', delay: 1 },
        { bottom: '-10%', left: '10%', size: 520, color: 'rgba(29,185,84,0.05)', delay: 3 },
        { bottom: '-10%', right: '10%', size: 450, color: 'rgba(255,77,106,0.05)', delay: 5 }
      ].map((g, i) => (
        <motion.div key={i}
          animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 10, delay: g.delay, repeat: Infinity, ease: 'easeInOut' }}
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

      {/* Futuristic Particle Canvas background */}
      <ParticleCanvas />

      {/* Main Container */}
      <div style={{
        position: 'relative', zIndex: 10,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center',
        padding: '30px 48px 30px',
        gap: 20, flex: 1,
        boxSizing: 'border-box',
        justifyContent: 'space-between',
        height: '100%'
      }}>

        {/* Title Block */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', maxWidth: 850 }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '3px 12px', borderRadius: 999,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            fontSize: 9.5, fontWeight: 700, color: 'rgba(255,255,255,0.45)',
            letterSpacing: '0.08em', textTransform: 'uppercase',
            marginBottom: 10
          }}>
            Step 33 · Strategic Reference Model
          </div>
          <h1 style={{
            fontSize: 'clamp(28px, 3vw, 36px)',
            fontWeight: 800, color: '#ffffff',
            lineHeight: 1.15, letterSpacing: '-0.03em',
            margin: '0 0 8px'
          }}>
            PROVEN ENGAGEMENT FLYWHEELS ALREADY EXIST
          </h1>
          <p style={{
            fontSize: 'clamp(12px, 1.2vw, 14.5px)',
            color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.5, margin: 0, fontWeight: 300
          }}>
            Behaviour-driven ecosystems have already transformed retention and long-term customer value across global platforms.
          </p>
        </motion.div>

        {/* 3-Column Card Layout */}
        <div style={{
          display: 'flex', flexDirection: 'row',
          gap: 16, width: '100%', maxWidth: 1280, flex: 1,
          alignItems: 'stretch', margin: '6px 0',
          boxSizing: 'border-box'
        }}>
          {columns.map((col, idx) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 + idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'relative',
                background: 'rgba(255,255,255,0.02)',
                border: `1px solid ${col.border}`,
                borderRadius: 16,
                padding: '20px 22px 18px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                overflow: 'hidden',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                boxShadow: '0 0 0 0.5px rgba(255,255,255,0.03) inset, 0 1px 0 rgba(255,255,255,0.05) inset, 0 10px 30px rgba(0,0,0,0.4)',
                flex: 1,
                transition: 'box-shadow 0.3s ease, border-color 0.3s ease'
              }}
              whileHover={{
                boxShadow: `0 0 0 0.5px rgba(255,255,255,0.05) inset, 0 1px 0 rgba(255,255,255,0.07) inset, 0 12px 40px rgba(0,0,0,0.5), 0 0 32px ${col.glow}`,
                borderColor: col.color,
                y: -3
              }}
            >
              {/* Corner Glow Accent */}
              <div style={{
                position: 'absolute', top: -35, right: -35,
                width: 100, height: 100, borderRadius: '50%',
                background: `radial-gradient(circle, ${col.glow} 0%, transparent 70%)`,
                pointerEvents: 'none', opacity: 0.6
              }} />

              {/* Card Contents */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: col.dim,
                    border: `1px solid ${col.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: col.color
                  }}>
                    {col.icon(col.color)}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: 8.5, fontWeight: 700, color: col.color, letterSpacing: '0.08em' }}>{col.tagline}</span>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: '#ffffff', margin: 0, lineHeight: 1.2 }}>{col.name}</h3>
                  </div>
                </div>

                {/* Headline Description */}
                <p style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.85)', lineHeight: 1.5, margin: 0, fontWeight: 400 }}>
                  {col.headline}
                </p>

                {/* Divider */}
                <div style={{ height: 1, background: `linear-gradient(90deg, ${col.border}, transparent)`, opacity: 0.6 }} />

                {/* Tracks list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <span style={{ fontSize: 9.5, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>What it tracks</span>
                  {col.tracks.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 4, height: 4, borderRadius: '50%', background: col.color, opacity: 0.7 }} />
                      <span style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.5)', lineHeight: 1.3 }}>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Creates list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <span style={{ fontSize: 9.5, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>What it creates</span>
                  {col.creates.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 4, height: 4, borderRadius: '50%', background: col.color }} />
                      <span style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.5)', lineHeight: 1.3 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data Point or Summary Foot */}
              <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {col.dataPoint && (
                  <div style={{
                    background: col.dim,
                    border: `1px solid ${col.border}`,
                    borderRadius: 10,
                    padding: '8px 12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                  }}>
                    <span style={{ fontSize: 18, fontWeight: 800, color: col.color, lineHeight: 1 }}>{col.dataPoint}</span>
                    <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', lineHeight: 1.3 }}>{col.dataLabel}</span>
                    {col.source && <span style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.25)', marginTop: 2, display: 'block', fontStyle: 'italic' }}>{col.source}</span>}
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: col.color, boxShadow: `0 0 6px ${col.color}` }} />
                  <span style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>{col.bottomInsight}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Connected Flywheel Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: '100%',
            maxWidth: 1280,
            background: 'rgba(255,255,255,0.015)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: 16,
            padding: '16px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            boxSizing: 'border-box',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)'
          }}
        >
          {/* Flow cards */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%'
          }}>
            {flywheelStages.map((stage, sIdx) => (
              <React.Fragment key={stage.label}>
                {/* Stage card */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  flex: 1,
                  maxWidth: '260px'
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {stage.icon}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#ffffff', lineHeight: 1.2 }}>{stage.label}</span>
                    <span style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.4)', lineHeight: 1.2 }}>{stage.desc}</span>
                  </div>
                </div>

                {/* Connector arrow */}
                {sIdx < flywheelStages.length - 1 && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: '0.2',
                    position: 'relative'
                  }}>
                    {/* Glowing neon animated line */}
                    <div style={{
                      width: '40px',
                      height: '2px',
                      background: 'linear-gradient(90deg, rgba(255,255,255,0.05), rgba(255,255,255,0.2), rgba(255,255,255,0.05))',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end'
                    }}>
                      {/* Pulse circle moving along the connector */}
                      <motion.div
                        animate={{ x: [-40, 0], opacity: [0, 1, 0] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: sIdx * 0.4 }}
                        style={{
                          width: 4, height: 4, borderRadius: '50%',
                          background: sIdx === 0 ? '#38B6FF' : sIdx === 1 ? '#a78bfa' : '#FF4D6A',
                          boxShadow: sIdx === 0 ? '0 0 6px #38B6FF' : sIdx === 1 ? '0 0 6px #a78bfa' : '0 0 6px #FF4D6A',
                          position: 'absolute'
                        }}
                      />
                      <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: 10, transform: 'translateY(-0.5px)' }}>➔</span>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Bottom Summary Quote */}
          <div style={{
            textAlign: 'center',
            borderTop: '1px dashed rgba(255,255,255,0.08)',
            paddingTop: 10,
            marginTop: 4
          }}>
            <p style={{
              fontSize: 10.5,
              color: 'rgba(255,255,255,0.35)',
              margin: 0,
              lineHeight: 1.5,
              letterSpacing: '0.01em'
            }}>
              “Proven behavioural engagement systems already exist.{' '}
              <span style={{ color: '#ffffff', fontWeight: 600 }}>
                Medibank Companion adapts these proven retention and loyalty flywheels to the international student healthcare lifecycle.
              </span>”
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
