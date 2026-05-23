import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sliders, Sparkles, TrendingUp, Zap, 
  Users, Compass, Layers, ShieldAlert, UserPlus 
} from 'lucide-react';

const AGENTS = [
  // Detection Layer
  { id: 'segmentation', name: 'Segmentation Agent', layer: 'detection', icon: Layers, desc: 'Clusters cohorts & triggers lifecycle moments' },
  { id: 'retention', name: 'Retention Risk Agent', layer: 'detection', icon: ShieldAlert, desc: 'Flags disengagement & estimates churn risk' },
  { id: 'referral', name: 'Referral Agent', layer: 'detection', icon: UserPlus, desc: 'Tracks advocates & measures viral LTV' },

  // Intelligence Layer
  { id: 'conversion', name: 'Conversion Agent', layer: 'intelligence', icon: TrendingUp, desc: 'Predicts OSHC to OVHC conversion propensity' },
  { id: 'activation', name: 'Activation Agent', layer: 'intelligence', icon: Zap, desc: 'Diagnoses setup friction & drop-off' },
  { id: 'community', name: 'Community Agent', layer: 'intelligence', icon: Users, desc: 'Correlates participation with outcomes' },
  { id: 'visa', name: 'Visa Transition Agent', layer: 'intelligence', icon: Compass, desc: 'Scores post-study stay intent' },

  // Orchestration Layer
  { id: 'campaign', name: 'Campaign Optimisation', layer: 'orchestration', icon: Sliders, desc: 'Determines channel mix & fatigue limits' },
  { id: 'narrator', name: 'Insight Narrator', layer: 'orchestration', icon: Sparkles, desc: 'Synthesises briefings for human review' }
];

const LAYERS = {
  orchestration: {
    title: 'ORCHESTRATION LAYER',
    desc: 'Packages intelligence into human-reviewable recommendations.',
    color: '#FF4D6A', // Medibank Coral / Red
    y: -150,
    width: 620
  },
  intelligence: {
    title: 'INTELLIGENCE LAYER',
    desc: 'Scores intent, predicts outcomes, and explains behaviour.',
    color: '#8B5CF6', // Purple
    y: 0,
    width: 880
  },
  detection: {
    title: 'DETECTION LAYER',
    desc: 'Detects behavioural signals, lifecycle moments, and risk patterns.',
    color: '#38B6FF', // Blue
    y: 150,
    width: 760
  }
};

const SCATTER_COORDS = {
  segmentation: { x: -280, y: 180 },
  retention: { x: -80, y: 220 },
  referral: { x: 180, y: 190 },
  conversion: { x: -350, y: -40 },
  activation: { x: -120, y: 40 },
  community: { x: 120, y: -20 },
  visa: { x: 340, y: 60 },
  campaign: { x: -220, y: -190 },
  narrator: { x: 220, y: -160 }
};

const GRID_COORDS = {
  // Orchestration (y: -138)
  campaign: { x: -150, y: -138 },
  narrator: { x: 150, y: -138 },
  // Intelligence (y: 12)
  conversion: { x: -324, y: 12 },
  activation: { x: -108, y: 12 },
  community: { x: 108, y: 12 },
  visa: { x: 324, y: 12 },
  // Detection (y: 162)
  segmentation: { x: -220, y: 162 },
  retention: { x: 0, y: 162 },
  referral: { x: 220, y: 162 }
};

export default function AgentEcosystem({ step, agentPhase }) {
  // Only active for step === 12 (globalStep 21) and subsequent steps
  const isActive = step >= 12;
  if (!isActive) return null;

  // Master container animations
  const masterX = step === 12 && agentPhase < 4 
    ? 280 
    : step === 13 
    ? 400 
    : (step >= 14 && step <= 16) 
    ? 0 
    : (step === 17 || step === 18) 
    ? 12 
    : 0;

  const masterScale = step === 12 && agentPhase < 4 
    ? 0.65 
    : step === 13 
    ? 0.64 
    : (step >= 14 && step <= 16) 
    ? 0.80 
    : (step === 17 || step === 18) 
    ? 0.54 
    : 0.95;

  const isLayerActive = (layerKey) => {
    if (step === 14 && layerKey === 'detection') return true;
    if (step === 15 && layerKey === 'intelligence') return true;
    if (step === 16 && layerKey === 'orchestration') return true;
    return false;
  };

  const getAgentGlow = (agentId) => {
    if (step === 14) {
      return agentId === 'segmentation';
    }
    if (step === 15) {
      return agentId === 'conversion' || agentId === 'visa';
    }
    if (step === 16) {
      return agentId === 'campaign' || agentId === 'narrator';
    }
    return false;
  };

  const getAgentOutput = (agentId) => {
    if (step === 14) {
      return null; // Cohort detection uses the custom premium card in Scene2
    }
    if (step === 15) {
      if (agentId === 'conversion') {
        return {
          title: '84% OVHC transition probability',
          desc: 'Behavior strongly aligns with successful transitions'
        };
      }
      if (agentId === 'visa') {
        return {
          title: 'Stay intent confirmed (94%)',
          desc: 'Visa webinar attendance & graduate discussions'
        };
      }
    }
    if (step === 16) {
      if (agentId === 'campaign') {
        return {
          title: 'Optimum channel sequence',
          desc: 'In-App, WhatsApp, Community event CTA'
        };
      }
      if (agentId === 'narrator') {
        return {
          title: 'High-value brief generated',
          desc: '3,240 students · +$180K revenue · 94% confidence'
        };
      }
    }
    return null;
  };

  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '1000px',
      height: '600px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 15,
      pointerEvents: 'none'
    }}>
      <motion.div
        animate={{
          x: masterX,
          scale: masterScale,
        }}
        transition={{
          duration: 1.8,
          ease: [0.16, 1, 0.3, 1] // Custom easeOutExpo
        }}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {Object.entries(LAYERS).map(([key, layer]) => {
          const showLayer = step >= 13 || (step === 12 && agentPhase >= 3);
          const active = isLayerActive(key);

          let opacityVal = showLayer ? 1 : 0;
          let borderVal = active ? `1px solid ${layer.color}60` : `1px solid rgba(255, 255, 255, 0.05)`;
          let shadowVal = active 
            ? `0 8px 32px rgba(0, 0, 0, 0.6), inset 0 0 0 1px ${layer.color}40, 0 0 35px ${layer.color}35`
            : `0 8px 32px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.02), 0 0 15px ${layer.color}15`;
          let scaleVal = showLayer ? 1 : 0.95;

          let transitionConfig = { duration: 1.2, ease: 'easeOut' };

          if (step === 14) {
            if (key === 'detection') {
              opacityVal = 1;
            } else if (key === 'intelligence') {
              opacityVal = [0.3, 0.3, 0.75];
              borderVal = [
                `1px solid rgba(255, 255, 255, 0.05)`,
                `1px solid rgba(255, 255, 255, 0.05)`,
                `1px solid ${layer.color}35`
              ];
              shadowVal = [
                `0 8px 32px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.02), 0 0 15px ${layer.color}05`,
                `0 8px 32px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.02), 0 0 15px ${layer.color}05`,
                `0 8px 32px rgba(0, 0, 0, 0.55), inset 0 0 0 1px ${layer.color}20, 0 0 25px ${layer.color}25`
              ];
              transitionConfig = {
                duration: 7.0,
                times: [0, 0.74, 1.0],
                ease: 'easeInOut'
              };
            } else if (key === 'orchestration') {
              opacityVal = 0.3;
            }
          }

          if (step === 15) {
            if (key === 'detection') {
              opacityVal = 0.5;
            } else if (key === 'intelligence') {
              opacityVal = [0.9, 0.9, 0.98, 0.9, 0.9, 0.5];
              scaleVal = [1.0, 1.0, 1.015, 1.0, 1.0, 0.98];
              borderVal = [
                `1px solid ${layer.color}60`,
                `1px solid ${layer.color}60`,
                `1.5px solid ${layer.color}e0`,
                `1px solid ${layer.color}60`,
                `1px solid ${layer.color}60`,
                `1px solid rgba(255, 255, 255, 0.05)`
              ];
              shadowVal = [
                `0 8px 32px rgba(0, 0, 0, 0.6), inset 0 0 0 1px ${layer.color}40, 0 0 35px ${layer.color}35`,
                `0 8px 32px rgba(0, 0, 0, 0.6), inset 0 0 0 1px ${layer.color}40, 0 0 35px ${layer.color}35`,
                `0 12px 40px rgba(0, 0, 0, 0.75), inset 0 0 0 2px ${layer.color}70, 0 0 50px ${layer.color}60`,
                `0 8px 32px rgba(0, 0, 0, 0.6), inset 0 0 0 1px ${layer.color}40, 0 0 35px ${layer.color}35`,
                `0 8px 32px rgba(0, 0, 0, 0.6), inset 0 0 0 1px ${layer.color}40, 0 0 35px ${layer.color}35`,
                `0 8px 32px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.02), 0 0 15px ${layer.color}05`
              ];
              transitionConfig = {
                duration: 10.5,
                times: [0, 0.44, 0.47, 0.50, 0.86, 1.0],
                ease: 'easeInOut'
              };
            } else if (key === 'orchestration') {
              opacityVal = [0.3, 0.3, 0.75];
              borderVal = [
                `1px solid rgba(255, 255, 255, 0.05)`,
                `1px solid rgba(255, 255, 255, 0.05)`,
                `1px solid ${layer.color}60`
              ];
              shadowVal = [
                `0 8px 32px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.02), 0 0 15px ${layer.color}05`,
                `0 8px 32px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.02), 0 0 15px ${layer.color}05`,
                `0 8px 32px rgba(0, 0, 0, 0.6), inset 0 0 0 1px ${layer.color}40, 0 0 35px ${layer.color}35`
              ];
              transitionConfig = {
                duration: 10.5,
                times: [0, 0.86, 1.0],
                ease: 'easeInOut'
              };
            }
          }

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ 
                opacity: opacityVal,
                scale: scaleVal,
                border: borderVal,
                boxShadow: shadowVal
              }}
              transition={transitionConfig}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginLeft: `-${layer.width / 2}px`,
                marginTop: `${layer.y - 46}px`,
                width: layer.width,
                height: '92px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(5, 12, 28, 0.45) 0%, rgba(3, 7, 18, 0.6) 100%)',
                backdropFilter: 'blur(12px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                padding: '12px 24px',
                pointerEvents: 'none'
              }}
            >
              {/* Layer Title / Headers */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ 
                  fontSize: '10px', 
                  fontWeight: 700, 
                  letterSpacing: '0.12em', 
                  color: layer.color,
                  textShadow: `0 0 10px ${layer.color}40`
                }}>
                  {layer.title}
                </span>
                <span style={{ 
                  fontSize: '11px', 
                  fontWeight: 300, 
                  color: 'rgba(255,255,255,0.4)' 
                }}>
                  {layer.desc}
                </span>
              </div>
            </motion.div>
          );
        })}

        {/* Agent Cards */}
        {AGENTS.map((agent, idx) => {
          const Icon = agent.icon;
          const layerInfo = LAYERS[agent.layer];

          // Determine position based on phase
          let tx = -580; // Starts behind laptop
          let ty = -30;
          let tScale = 0.15;
          let tOpacity = 0;
          let blurVal = 'blur(10px)';

          if (step === 12) {
            if (agentPhase === 1) {
              tx = -580;
              ty = -30;
              tScale = 0.15;
              tOpacity = 0;
              blurVal = 'blur(10px)';
            } else if (agentPhase === 2) {
              const scatter = SCATTER_COORDS[agent.id];
              tx = scatter.x;
              ty = scatter.y;
              tScale = 0.9;
              tOpacity = 0.85;
              blurVal = 'blur(0px)';
            } else {
              // Phase 3 & 4
              const grid = GRID_COORDS[agent.id];
              tx = grid.x;
              ty = grid.y;
              tScale = 1;
              tOpacity = 1;
              blurVal = 'blur(0px)';
            }
          } else {
            // Subsequent steps (step >= 13)
            const grid = GRID_COORDS[agent.id];
            tx = grid.x;
            ty = grid.y;
            tScale = 1;
            tOpacity = 1;
            blurVal = 'blur(0px)';
          }

          const output = getAgentOutput(agent.id);
          const isGlowing = getAgentGlow(agent.id);

          const baseAnimate = {
              x: tx,
              y: ty,
              scale: tScale,
              opacity: tOpacity,
              filter: blurVal
            };

            let animateConfig = baseAnimate;
            let transitionConfigForCard = {
              duration: step === 12 && agentPhase === 2 ? 1.8 : 1.2,
              delay: step === 12 && agentPhase === 2 ? idx * 0.08 : 0,
              ease: [0.16, 1, 0.3, 1]
            };

            if (step === 14 && isGlowing && agent.id === 'segmentation') {
              animateConfig = {
                ...baseAnimate,
                scale: [tScale, tScale * 1.03, tScale],
                boxShadow: [
                  `0 0 15px 1px ${layerInfo.color}35`,
                  `0 0 30px 4px ${layerInfo.color}65`,
                  `0 0 15px 1px ${layerInfo.color}35`
                ]
              };
              transitionConfigForCard = {
                scale: { repeat: Infinity, duration: 2.0, ease: "easeInOut" },
                boxShadow: { repeat: Infinity, duration: 2.0, ease: "easeInOut" },
                x: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                y: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 1.2 },
                filter: { duration: 1.2 }
              };
            } else if (step === 15) {
              const normalBorder = '1px solid rgba(255, 255, 255, 0.08)';
              const glowBorder = `1.5px solid ${layerInfo.color}`;
              const dimmedGlowBorder = `1px solid ${layerInfo.color}60`;

              const normalShadow = '0 4px 12px rgba(0,0,0,0.3)';
              const glowShadow = `0 0 25px 3px ${layerInfo.color}65`;
              const dimmedGlowShadow = `0 0 12px 1px ${layerInfo.color}30`;

              if (agent.id === 'visa') {
                animateConfig = {
                  ...baseAnimate,
                  scale: [1, 1, 1.08, 1.03, 1.03, 1],
                  opacity: [1, 1, 1, 1, 1, 0.7],
                  border: [normalBorder, normalBorder, glowBorder, glowBorder, glowBorder, dimmedGlowBorder],
                  boxShadow: [normalShadow, normalShadow, glowShadow, glowShadow, glowShadow, dimmedGlowShadow]
                };
                transitionConfigForCard = {
                  duration: 10.5,
                  times: [0, 0.04, 0.08, 0.53, 0.59, 1.0],
                  ease: 'easeInOut'
                };
              } else if (agent.id === 'community') {
                animateConfig = {
                  ...baseAnimate,
                  scale: [1, 1, 1.08, 1.03, 1.03, 1],
                  opacity: [1, 1, 1, 1, 1, 0.7],
                  border: [normalBorder, normalBorder, glowBorder, glowBorder, glowBorder, dimmedGlowBorder],
                  boxShadow: [normalShadow, normalShadow, glowShadow, glowShadow, glowShadow, dimmedGlowShadow]
                };
                transitionConfigForCard = {
                  duration: 10.5,
                  times: [0, 0.17, 0.21, 0.53, 0.59, 1.0],
                  ease: 'easeInOut'
                };
              } else if (agent.id === 'conversion') {
                animateConfig = {
                  ...baseAnimate,
                  scale: [1, 1, 1.08, 1.03, 1.03, 1],
                  opacity: [1, 1, 1, 1, 1, 0.7],
                  border: [normalBorder, normalBorder, glowBorder, glowBorder, glowBorder, dimmedGlowBorder],
                  boxShadow: [normalShadow, normalShadow, glowShadow, glowShadow, glowShadow, dimmedGlowShadow]
                };
                transitionConfigForCard = {
                  duration: 10.5,
                  times: [0, 0.29, 0.33, 0.53, 0.59, 1.0],
                  ease: 'easeInOut'
                };
              } else if (agent.layer === 'detection') {
                animateConfig = { ...baseAnimate, opacity: 0.5 };
              } else if (agent.layer === 'orchestration' || agent.id === 'activation') {
                animateConfig = { ...baseAnimate, opacity: 0.3 };
              }
            }

            return (
              <motion.div
                key={agent.id}
                animate={animateConfig}
                transition={transitionConfigForCard}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginLeft: '-92.5px',
                marginTop: '-23px',
                width: '185px',
                height: '46px',
                borderRadius: '10px',
                background: isGlowing 
                  ? `linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.06) 100%)`
                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                border: isGlowing 
                  ? `1.5px solid ${layerInfo.color}` 
                  : '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: isGlowing 
                  ? `0 0 25px 3px ${layerInfo.color}65` 
                  : '0 4px 12px rgba(0,0,0,0.3)',
                display: 'flex',
                alignItems: 'center',
                padding: '0 10px',
                gap: '10px',
                zIndex: 20,
                pointerEvents: 'auto',
                transition: 'border 0.3s ease, box-shadow 0.3s ease, background 0.3s ease'
              }}
            >
              {/* Output Popup Speech Bubble */}
              {output && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  style={{
                    position: 'absolute',
                    bottom: '54px',
                    left: '50%',
                    marginLeft: '-115px',
                    width: '230px',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: 'rgba(8, 14, 30, 0.95)',
                    border: `1.5px solid ${layerInfo.color}d0`,
                    boxShadow: `0 8px 24px rgba(0, 0, 0, 0.6), 0 0 15px ${layerInfo.color}35`,
                    backdropFilter: 'blur(8px)',
                    zIndex: 50,
                    pointerEvents: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '3px'
                  }}
                >
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#ffffff', textAlign: 'left' }}>
                    {output.title}
                  </span>
                  <span style={{ fontSize: '9.5px', fontWeight: 400, color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.25', textAlign: 'left' }}>
                    {output.desc}
                  </span>
                  {/* Small arrow */}
                  <div style={{
                    position: 'absolute',
                    bottom: '-6px',
                    left: '50%',
                    marginLeft: '-6px',
                    width: 0,
                    height: 0,
                    borderLeft: '6px solid transparent',
                    borderRight: '6px solid transparent',
                    borderTop: `6px solid ${layerInfo.color}d0`
                  }} />
                </motion.div>
              )}

              {/* Icon Container */}
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                background: `${layerInfo.color}15`,
                border: `1px solid ${layerInfo.color}30`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: layerInfo.color,
                boxShadow: `0 0 12px ${layerInfo.color}20`
              }}>
                <Icon size={14} />
              </div>

              {/* Text */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', textAlign: 'left' }}>
                <span style={{ 
                  fontSize: '11px', 
                  fontWeight: 600, 
                  color: '#ffffff',
                  letterSpacing: '-0.01em'
                }}>
                  {agent.name}
                </span>
                <span style={{ 
                  fontSize: '8.5px', 
                  fontWeight: 400, 
                  color: 'rgba(255,255,255,0.4)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em'
                }}>
                  {agent.layer}
                </span>
              </div>
            </motion.div>
          );
        })}

        <AnimatePresence>
          {step === 14 && (
            <>
              {/* Premium Cohort Detected Card - Scales up from Segmentation Agent, holds, shrinks back down */}
              <motion.div
                initial={{ x: -220, y: 162, opacity: 0, scale: 0.1 }}
                animate={{
                  x: [-220, -490, -490, -220],
                  y: [162, 162, 162, 162],
                  opacity: [0, 1, 1, 0],
                  scale: [0.1, 1.0, 1.0, 0.1]
                }}
                transition={{
                  duration: 4.4,
                  times: [0, 0.18, 0.86, 1.0],
                  delay: 0.8,
                  ease: "easeInOut"
                }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginLeft: '-160px',
                  marginTop: '-110px',
                  width: '320px',
                  background: 'rgba(10, 25, 47, 0.75)',
                  backdropFilter: 'blur(20px) saturate(140%)',
                  border: '1.5px solid rgba(56, 182, 255, 0.4)',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), inset 0 0 20px rgba(56, 182, 255, 0.1), 0 0 30px rgba(56, 182, 255, 0.15)',
                  borderRadius: '16px',
                  padding: '20px',
                  zIndex: 120,
                  color: '#ffffff',
                  pointerEvents: 'none',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#38B6FF' }}>
                      New cohort detected
                    </span>
                    <span style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.5)', background: 'rgba(56, 182, 255, 0.1)', padding: '2px 8px', borderRadius: '10px' }}>
                      Detection Layer
                    </span>
                  </div>
                  
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: '1.2' }}>
                      Graduate Transition Cohort
                    </h3>
                    <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', margin: '6px 0 0 0', lineHeight: '1.4' }}>
                      Students actively preparing for post-study life in Australia are showing strong graduate-transition behavioural patterns.
                    </p>
                  </div>

                  <div style={{ height: '1px', background: 'rgba(56, 182, 255, 0.2)' }} />

                  <div>
                    <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '6px' }}>
                      Signals contributing to cohort:
                    </span>
                    <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '11px', color: 'rgba(255,255,255,0.85)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <li>Graduate visa webinar participation</li>
                      <li>Repeated OVHC pricing exploration</li>
                      <li>Postgraduate community engagement</li>
                      <li>Benefits-retention exploration</li>
                    </ul>
                  </div>

                  <div style={{ height: '1px', background: 'rgba(56, 182, 255, 0.2)' }} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>Pattern consistency</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#38B6FF' }}>91%</span>
                  </div>
                </div>
              </motion.div>

              {/* Refined Intelligence Pulse moving up */}
              <motion.div
                initial={{ x: -220, y: 162, opacity: 0, scale: 0.8 }}
                animate={{
                  x: [-220, -220, -220],
                  y: [162, 162, 12],
                  opacity: [0, 1, 0],
                  scale: [0.8, 1.4, 0.6]
                }}
                transition={{
                  duration: 1.8,
                  times: [0, 0.1, 1.0],
                  delay: 5.2,
                  ease: "easeInOut"
                }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginLeft: '-17.5px',
                  marginTop: '-17.5px',
                  zIndex: 115,
                  pointerEvents: 'none'
                }}
              >
                <div
                  style={{
                    width: '35px',
                    height: '35px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #ffffff 0%, rgba(139, 92, 246, 0.9) 60%, transparent 100%)',
                    boxShadow: '0 0 30px 10px rgba(139, 92, 246, 0.7), 0 0 15px rgba(255, 255, 255, 0.8)'
                  }}
                />
              </motion.div>
            </>
          )}

          {step === 15 && (
            <>
              {/* Pop-out Card: Visa Transition Agent */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0, x: 324, y: 12 - 50 }}
                animate={{ scale: [0.8, 1, 1, 0.1], opacity: [0, 1, 1, 0], x: [324, 324, 324, 324], y: [12 - 50, 12 - 95, 12 - 95, 12] }}
                transition={{ duration: 5.1, times: [0, 0.08, 0.88, 1.0], delay: 0.5, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginLeft: '-105px',
                  marginTop: '-165px',
                  width: '210px',
                  background: 'rgba(10, 25, 47, 0.85)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(139, 92, 246, 0.4)',
                  boxShadow: '0 8px 24px rgba(139, 92, 246, 0.15), inset 0 0 10px rgba(139, 92, 246, 0.05)',
                  borderRadius: '10px',
                  padding: '10px 12px',
                  zIndex: 110,
                  color: '#ffffff',
                  textAlign: 'left',
                  pointerEvents: 'none'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Stay intent confirmed (94%)
                  </span>
                  <span style={{ fontSize: '8.5px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.3' }}>
                    Behaviour strongly aligns with successful postgraduate transition behaviour.
                  </span>
                  <div style={{ height: '1px', background: 'rgba(139, 92, 246, 0.2)' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <span style={{ fontSize: '7.5px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase' }}>
                      Contributing Signals:
                    </span>
                    <span style={{ fontSize: '8px', color: 'rgba(255, 255, 255, 0.8)' }}>• Graduate visa webinar attendance</span>
                    <span style={{ fontSize: '8px', color: 'rgba(255, 255, 255, 0.8)' }}>• Repeated postgraduate exploration</span>
                    <span style={{ fontSize: '8px', color: 'rgba(255, 255, 255, 0.8)' }}>• Migration-planning behaviour</span>
                  </div>
                </div>
                {/* Connector stem */}
                <div style={{
                  position: 'absolute',
                  bottom: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '1.5px',
                  height: '12px',
                  background: 'rgba(139, 92, 246, 0.4)'
                }} />
              </motion.div>

              {/* Pop-out Card: Community Agent */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0, x: 108, y: 12 - 50 }}
                animate={{ scale: [0.8, 1, 1, 0.1], opacity: [0, 1, 1, 0], x: [108, 108, 108, 108], y: [12 - 50, 12 - 95, 12 - 95, 12] }}
                transition={{ duration: 3.8, times: [0, 0.10, 0.84, 1.0], delay: 1.8, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginLeft: '-105px',
                  marginTop: '-165px',
                  width: '210px',
                  background: 'rgba(10, 25, 47, 0.85)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(139, 92, 246, 0.4)',
                  boxShadow: '0 8px 24px rgba(139, 92, 246, 0.15), inset 0 0 10px rgba(139, 92, 246, 0.05)',
                  borderRadius: '10px',
                  padding: '10px 12px',
                  zIndex: 110,
                  color: '#ffffff',
                  textAlign: 'left',
                  pointerEvents: 'none'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Postgrad engagement up
                  </span>
                  <span style={{ fontSize: '8.5px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.3' }}>
                    Behaviour indicates strong long-term community continuity.
                  </span>
                  <div style={{ height: '1px', background: 'rgba(139, 92, 246, 0.2)' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <span style={{ fontSize: '7.5px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase' }}>
                      Contributing Signals:
                    </span>
                    <span style={{ fontSize: '8px', color: 'rgba(255, 255, 255, 0.8)' }}>• Active in postgraduate communities</span>
                    <span style={{ fontSize: '8px', color: 'rgba(255, 255, 255, 0.8)' }}>• “Keep your benefits” views</span>
                    <span style={{ fontSize: '8px', color: 'rgba(255, 255, 255, 0.8)' }}>• High similarity with retained cohorts</span>
                  </div>
                </div>
                {/* Connector stem */}
                <div style={{
                  position: 'absolute',
                  bottom: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '1.5px',
                  height: '12px',
                  background: 'rgba(139, 92, 246, 0.4)'
                }} />
              </motion.div>

              {/* Pop-out Card: Conversion Agent */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0, x: -324, y: 12 - 50 }}
                animate={{ scale: [0.8, 1, 1, 0.1], opacity: [0, 1, 1, 0], x: [-324, -324, -324, -324], y: [12 - 50, 12 - 95, 12 - 95, 12] }}
                transition={{ duration: 2.5, times: [0, 0.16, 0.76, 1.0], delay: 3.1, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginLeft: '-105px',
                  marginTop: '-165px',
                  width: '210px',
                  background: 'rgba(10, 25, 47, 0.85)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(139, 92, 246, 0.4)',
                  boxShadow: '0 8px 24px rgba(139, 92, 246, 0.15), inset 0 0 10px rgba(139, 92, 246, 0.05)',
                  borderRadius: '10px',
                  padding: '10px 12px',
                  zIndex: 110,
                  color: '#ffffff',
                  textAlign: 'left',
                  pointerEvents: 'none'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    84% OVHC propensity
                  </span>
                  <span style={{ fontSize: '8.5px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.3' }}>
                    Behaviour strongly aligns with successful transition cohorts.
                  </span>
                  <div style={{ height: '1px', background: 'rgba(139, 92, 246, 0.2)' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <span style={{ fontSize: '7.5px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase' }}>
                      Contributing Signals:
                    </span>
                    <span style={{ fontSize: '8px', color: 'rgba(255, 255, 255, 0.8)' }}>• Repeated OVHC pricing views</span>
                    <span style={{ fontSize: '8px', color: 'rgba(255, 255, 255, 0.8)' }}>• Benefits-retention interaction</span>
                    <span style={{ fontSize: '8px', color: 'rgba(255, 255, 255, 0.8)' }}>• Historical cohort conversion similarity</span>
                  </div>
                </div>
                {/* Connector stem */}
                <div style={{
                  position: 'absolute',
                  bottom: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '1.5px',
                  height: '12px',
                  background: 'rgba(139, 92, 246, 0.4)'
                }} />
              </motion.div>

              {/* Connection Line: Conversion to Community */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: [0, 432, 432, 0], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.6, times: [0, 0.375, 0.875, 1.0], delay: 4.6, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  x: -324,
                  y: 12,
                  height: '1.5px',
                  background: 'rgba(139, 92, 246, 0.6)',
                  boxShadow: '0 0 10px rgba(139, 92, 246, 0.8)',
                  zIndex: 10,
                  transformOrigin: 'left center',
                  pointerEvents: 'none'
                }}
              />

              {/* Connection Line: Community to Visa */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: [0, 216, 216, 0], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.6, times: [0, 0.375, 0.875, 1.0], delay: 4.6, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  x: 108,
                  y: 12,
                  height: '1.5px',
                  background: 'rgba(139, 92, 246, 0.6)',
                  boxShadow: '0 0 10px rgba(139, 92, 246, 0.8)',
                  zIndex: 10,
                  transformOrigin: 'left center',
                  pointerEvents: 'none'
                }}
              />

              {/* Premium Compact Intelligence Brief */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0, x: 0, y: 12 }}
                animate={{ scale: [0.8, 1, 1, 0.1], opacity: [0, 1, 1, 0], x: [0, 0, 0, 0], y: [12, 12, 12, 12] }}
                transition={{ duration: 2.8, times: [0, 0.18, 0.82, 1.0], delay: 6.2, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginLeft: '-170px',
                  marginTop: '-100px',
                  width: '340px',
                  background: 'rgba(10, 25, 47, 0.9)',
                  backdropFilter: 'blur(20px) saturate(140%)',
                  border: '1.5px solid rgba(139, 92, 246, 0.5)',
                  boxShadow: '0 15px 40px rgba(0, 0, 0, 0.7), inset 0 0 15px rgba(139, 92, 246, 0.15), 0 0 25px rgba(139, 92, 246, 0.2)',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  zIndex: 125,
                  color: '#ffffff',
                  textAlign: 'left',
                  pointerEvents: 'none'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ fontSize: '9px', fontWeight: 700, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Business Intelligence Generated
                  </span>
                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: '#ffffff', letterSpacing: '-0.01em' }}>
                      Graduate Transition Cohort
                    </h4>
                    <p style={{ fontSize: '10.5px', color: 'rgba(255, 255, 255, 0.75)', margin: '4px 0 0 0', lineHeight: '1.35' }}>
                      Students in this cohort demonstrate strong indicators of post-study settlement intent and OVHC conversion readiness.
                    </p>
                  </div>
                  <div style={{ height: '1px', background: 'rgba(139, 92, 246, 0.3)' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#a78bfa' }}>
                      Estimated opportunity: +$180K
                    </span>
                    <span style={{ fontSize: '9px', color: 'rgba(255, 255, 255, 0.5)' }}>
                      High-confidence conversion cohort detected.
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Traveling Pulse to Orchestration Layer */}
              <motion.div
                initial={{ x: 0, y: 12, opacity: 0, scale: 0.8 }}
                animate={{
                  x: [0, 0, 0],
                  y: [12, 12, -138],
                  opacity: [0, 1, 0],
                  scale: [0.8, 1.4, 0.6]
                }}
                transition={{
                  duration: 1.5,
                  times: [0, 0.1, 1.0],
                  delay: 9.0,
                  ease: "easeInOut"
                }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginLeft: '-17.5px',
                  marginTop: '-17.5px',
                  zIndex: 115,
                  pointerEvents: 'none'
                }}
              >
                <div
                  style={{
                    width: '35px',
                    height: '35px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #ffffff 0%, rgba(236, 72, 153, 0.9) 60%, transparent 100%)',
                    boxShadow: '0 0 30px 10px rgba(236, 72, 153, 0.7), 0 0 15px rgba(255, 255, 255, 0.8)'
                  }}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
