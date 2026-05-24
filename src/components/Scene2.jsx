import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MemoryRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Users, Clock, MapPin, MessageCircle, Star, Award, HeartPulse } from 'lucide-react';

import PhoneMockup from './PhoneMockup';
import LaptopMockup from './LaptopMockup';
import LaptopSilhouette from './LaptopSilhouette';
import AgentEcosystem from './AgentEcosystem';

import Home from '@src/pages/Home';
import Journey from '@src/pages/Journey';
import Community from '@src/pages/Community';
import Health, { Leaderboard, GroupChallenge, PersonalContrib, HealthImpactCard, ReduceCostCard } from '@src/pages/Health';
import '@src/pages/Health.css';
import Cover from '@src/pages/Cover';
import TaskDetail from '@src/pages/TaskDetail';
import CommandCentre from '@admin/pages/CommandCentre';
import Layout from '@admin/components/Layout';
import BottomNavigation from '@src/components/BottomNavigation';
import OvhcTransition, { RecommendedPlanCard, WhatYouKeepBox, OvhcSummaryCard, OvhcPersonalDetailsCard, OvhcPaymentMethodCard, OvhcSuccessDetailsCard } from '@src/pages/OvhcTransition';
import { OvhcHealthScore, OvhcRewardPoints, OvhcAdvantage, OvhcKeepRewards } from '@src/components/OvhcConversionCard';
import PremiumReferralCard from '@src/components/PremiumReferralCard';
import '@src/pages/OvhcTransition.css';

const NavigationSync = ({ step, cyclingStep }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if ((step === 0 || step === 7) && location.pathname !== '/') {
      navigate('/');
    } else if ((step === 1 || step === 2) && !location.pathname.startsWith('/journey')) {
      // Don't override if we are on a task detail route
      navigate('/journey');
    } else if (step === 3 && location.pathname !== '/community') {
      navigate('/community');
    } else if ((step === 4 || step === 5 || step === 6) && location.pathname !== '/health-advice') {
      navigate('/health-advice');
    } else if ((step === 8 || step === 9 || step === 10) && location.pathname !== '/ovhc-transition') {
      navigate('/ovhc-transition');
    } else if (step === 11) {
      const routes = ['/community', '/health-advice', '/', '/journey', '/ovhc-transition'];
      const target = routes[cyclingStep] || '/';
      if (location.pathname !== target) {
        navigate(target);
      }
    } else if (step === 12) {
      // no-op, phone is hidden
    } else if (step >= 13 && step <= 17 && location.pathname !== '/ovhc-transition') {
      navigate('/ovhc-transition');
    } else if (step === 18 && location.pathname !== '/community') {
      navigate('/community');
    } else if (step >= 19 && location.pathname !== '/cover') {
      navigate('/cover');
    }
  }, [step, cyclingStep, navigate, location.pathname]);

  return null;
};

const PhoneLayout = ({ children }) => {
  const location = useLocation();
  const isHiddenRoute =
    location.pathname === '/onboarding' ||
    location.pathname === '/ovhc-transition' ||
    location.pathname === '/mediguide' ||
    location.pathname === '/referral' ||
    location.pathname === '/health/impact' ||
    location.pathname.startsWith('/journey/task/');
    
  const showBottomNav = !isHiddenRoute;

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {children}
      {showBottomNav && <BottomNavigation />}
    </div>
  );
};

// To ensure CSS loads, we can either rely on their internal imports or import them here
import '@src/styles/variables.css';
import '@src/pages/Home.css';
import '@src/pages/Journey.css';
import '@src/pages/Community.css';
import '@src/pages/Health.css';
import '@src/pages/Cover.css';
import '@src/pages/TaskDetail.css';
import '@admin/pages/ActivationEngine.css'; // Just in case admin engine uses global layout css

const AnimatedTaskDetail = () => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to the correct task detail page when this mounts
    navigate('/journey/task/pa-4');
  }, [navigate]);

  useEffect(() => {
    let rafId;
    let start = null;
    
    const delayScrollDown = 1000; // Wait 1 second at the top
    const scrollDuration = 5000; // Scroll down over 5 seconds
    
    const animateScroll = (timestamp) => {
      if (!scrollRef.current) return;
      const el = scrollRef.current;
      
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const maxScroll = el.scrollHeight - el.clientHeight;
      
      if (maxScroll <= 0) {
        rafId = requestAnimationFrame(animateScroll);
        return;
      }
      
      if (elapsed < delayScrollDown) {
        el.scrollTop = 0;
      } else if (elapsed < delayScrollDown + scrollDuration) {
        const progress = (elapsed - delayScrollDown) / scrollDuration;
        const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
        el.scrollTop = maxScroll * ease;
      } else {
        el.scrollTop = maxScroll;
        return; // done
      }
      
      rafId = requestAnimationFrame(animateScroll);
    };
    
    rafId = requestAnimationFrame(animateScroll);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <motion.div ref={scrollRef} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>
      <Routes>
        <Route path="/journey/task/:taskId" element={<div className="page-container" style={{ paddingBottom: 0 }}><TaskDetail /></div>} />
      </Routes>
    </motion.div>
  );
};

const AnimatedJourney = ({ step }) => {
  const [phase, setPhase] = useState('journey'); // journey -> clicking -> detail -> backToJourney -> settlingIn
  const [scrollPhase, setScrollPhase] = useState('idle'); // idle -> scrolling
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    let t1, t2, t3;
    t1 = setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ top: 380, behavior: 'smooth' });
      }
    }, 2000);
    t2 = setTimeout(() => setPhase('clicking'), 3500);
    t3 = setTimeout(() => setPhase('detail'), 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  useEffect(() => {
    if (step === 2) {
      setPhase('backToJourney');
    }
  }, [step]);

  useEffect(() => {
    if (phase === 'backToJourney') {
      const t = setTimeout(() => {
        setPhase('settlingIn');
      }, 1500); // 1.5s after step 2 starts, snap back to Journey
      return () => clearTimeout(t);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'settlingIn') {
      navigate('/journey');
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
      
      const t = setTimeout(() => {
        const tabs = document.querySelectorAll('.journey-tab');
        if (tabs.length > 1) {
          tabs[1].style.boxShadow = '0 0 15px 5px rgba(30, 63, 138, 0.4)';
          tabs[1].style.transition = 'all 0.5s ease';
          
          setTimeout(() => {
             tabs[1].click(); 
             tabs[1].style.boxShadow = 'none'; 
             
             // Trigger scroll after 2 seconds
             setTimeout(() => {
               setScrollPhase('scrolling');
             }, 2000);
          }, 600);
        }
      }, 500);
      return () => clearTimeout(t);
    }
  }, [phase]);

  useEffect(() => {
    if (scrollPhase === 'scrolling' && scrollRef.current) {
      let rafId;
      let start = null;
      const duration = 6000; // take 6 seconds to scroll down slowly
      const el = scrollRef.current;
      
      const animate = (timestamp) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const maxScroll = el.scrollHeight - el.clientHeight;
        
        if (maxScroll <= 0) {
          rafId = requestAnimationFrame(animate);
          return;
        }
        
        if (elapsed < duration) {
          const progress = elapsed / duration;
          // Smooth easeInOut
          const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
          el.scrollTop = maxScroll * ease;
          rafId = requestAnimationFrame(animate);
        } else {
          el.scrollTop = maxScroll;
        }
      };
      
      rafId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(rafId);
    }
  }, [scrollPhase]);

  if (phase === 'detail' || phase === 'backToJourney') {
    return <AnimatedTaskDetail />;
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <div ref={scrollRef} style={{ width: '100%', height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>
        <div className="page-container">
          <Journey />
        </div>
      </div>
      
      {/* Fake click ripple */}
      <AnimatePresence>
        {phase === 'clicking' && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 2], opacity: [0, 0.8, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ 
              position: 'absolute', 
              top: '62%', 
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 60, 
              height: 60, 
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
              pointerEvents: 'none',
              zIndex: 100
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const MOCK_SIGNALS = [
  { id: 1, text: "OVHC pricing explored", color: "#FF4D6A", delay: 0.1, targetY: -160, targetX: 60 },
  { id: 2, text: "Referral activity increased", color: "#4ADE80", delay: 0.3, targetY: -90, targetX: 180 },
  { id: 3, text: "Health engagement spike", color: "#4ADE80", delay: 0.5, targetY: -20, targetX: 90 },
  { id: 4, text: "Community participation", color: "#38B6FF", delay: 0.7, targetY: 40, targetX: 160 },
  { id: 5, text: "Inactive for 14 days", color: "#FF9F43", delay: 0.9, targetY: 100, targetX: 70 },
  { id: 6, text: "Graduation approaching", color: "#38B6FF", delay: 1.1, targetY: 160, targetX: 190 },
  { id: 7, text: "Webinar attended", color: "#38B6FF", delay: 1.3, targetY: -130, targetX: -20 },
  { id: 8, text: "Graduate visa discussions", color: "#FF4D6A", delay: 1.5, targetY: 70, targetX: -30 },
  { id: 9, text: "MediGuide query resolved", color: "#38B6FF", delay: 1.7, targetY: -210, targetX: 40 },
  { id: 10, text: "OSHC policy activated", color: "#4ADE80", delay: 1.9, targetY: -50, targetX: -100 },
  { id: 11, text: "Daily step goal achieved", color: "#4ADE80", delay: 2.1, targetY: 130, targetX: -40 },
  { id: 12, text: "Ambassador tier unlocked", color: "#FF9F43", delay: 2.3, targetY: -100, targetX: -150 },
  { id: 13, text: "App opened 5 days in a row", color: "#4ADE80", delay: 2.5, targetY: 10, targetX: -120 },
  { id: 14, text: "Cost of living guide viewed", color: "#38B6FF", delay: 2.7, targetY: 200, targetX: 10 }
];

function SignalParticles({ transitionPhase }) {
  const getAnimateForPhase = (phase, s) => {
    if (phase === 1) {
      return {
        x: s.targetX,
        y: s.targetY,
        opacity: 0.85,
        scale: 1,
        transition: {
          x: { duration: 1.6, delay: s.delay, ease: "easeOut" },
          y: { duration: 1.6, delay: s.delay, ease: "easeOut" },
          opacity: { duration: 0.8, delay: s.delay },
          scale: { duration: 0.8, delay: s.delay }
        }
      };
    } else if (phase === 2) {
      // Remain spread out while connection lines draw
      return {
        x: s.targetX,
        y: s.targetY,
        opacity: 0.95,
        scale: 1.0,
        transition: { duration: 1.0, ease: "easeInOut" }
      };
    } else if (phase === 3) {
      // Cluster tightly in the center
      const clusterX = s.targetX * 0.2;
      const clusterY = s.targetY * 0.3;
      return {
        x: clusterX,
        y: clusterY,
        opacity: 0.95,
        scale: 0.85,
        transition: { duration: 1.6, ease: "easeInOut" }
      };
    } else {
      // Compress and fade out
      return {
        x: 0,
        y: 0,
        opacity: 0,
        scale: 0.2,
        transition: { duration: 1.2, ease: "easeInOut" }
      };
    }
  };

  // Helper to draw connecting lines between similar signals (same color)
  const renderConnectionLine = (fromIdx, toIdx, delay) => {
    const fromSignal = MOCK_SIGNALS[fromIdx];
    const toSignal = MOCK_SIGNALS[toIdx];
    if (!fromSignal || !toSignal) return null;

    return (
      <motion.line
        key={`line-${fromSignal.id}-${toSignal.id}`}
        initial={{ 
          x1: `${400 + fromSignal.targetX}px`,
          y1: `${300 + fromSignal.targetY}px`,
          x2: `${400 + toSignal.targetX}px`,
          y2: `${300 + toSignal.targetY}px`,
          pathLength: 0
        }}
        animate={{
          pathLength: 1,
          x1: transitionPhase >= 3 ? `${400 + fromSignal.targetX * 0.2}px` : `${400 + fromSignal.targetX}px`,
          y1: transitionPhase >= 3 ? `${400 + fromSignal.targetY * 0.3}px` : `${400 + fromSignal.targetY}px`,
          x2: transitionPhase >= 3 ? `${400 + toSignal.targetX * 0.2}px` : `${400 + toSignal.targetX}px`,
          y2: transitionPhase >= 3 ? `${400 + toSignal.targetY * 0.3}px` : `${400 + toSignal.targetY}px`
        }}
        transition={{ 
          pathLength: { duration: 1.0, delay },
          x1: { duration: 1.6, ease: "easeInOut" },
          y1: { duration: 1.6, ease: "easeInOut" },
          x2: { duration: 1.6, ease: "easeInOut" },
          y2: { duration: 1.6, ease: "easeInOut" }
        }}
        stroke={`${fromSignal.color}45`} // Match the signal category color with moderate opacity
        strokeWidth="1.5"
      />
    );
  };

  return (
    <div style={{
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: '800px',
      height: '600px',
      pointerEvents: 'none',
      zIndex: 15
    }}>

      {/* SVG Connecting Lines (Phase 2 & 3) */}
      {(transitionPhase === 2 || transitionPhase === 3) && (
        <svg style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', zIndex: 12 }}>
          {/* Green Category Connections (Health & Activity) */}
          {renderConnectionLine(1, 2, 0.05)}  {/* Referral -> Health */}
          {renderConnectionLine(2, 10, 0.15)} {/* Health -> OSHC Policy */}
          {renderConnectionLine(10, 12, 0.25)} {/* OSHC Policy -> App opened 5 days */}
          {renderConnectionLine(10, 11, 0.35)} {/* OSHC Policy -> Daily step goal */}

          {/* Red Category Connections (OSHC/OVHC Transition) */}
          {renderConnectionLine(0, 7, 0.1)}  {/* OVHC explored -> Graduate visa */}

          {/* Blue Category Connections (Community & Guidance) */}
          {renderConnectionLine(3, 6, 0.1)}  {/* Community -> Webinar */}
          {renderConnectionLine(6, 8, 0.2)}  {/* Webinar -> MediGuide query */}
          {renderConnectionLine(8, 5, 0.3)}  {/* MediGuide query -> Graduation approaching */}
          {renderConnectionLine(5, 13, 0.4)} {/* Graduation approaching -> Cost of living */}

          {/* Orange Category Connections (Alerts / Status) */}
          {renderConnectionLine(4, 11, 0.2)} {/* Inactive -> Ambassador */}
        </svg>
      )}

      {/* Floating signals pills */}
      {MOCK_SIGNALS.map(s => (
        <motion.div
          key={s.id}
          initial={{ opacity: 0, scale: 0.2, x: -280, y: 0 }}
          animate={getAnimateForPhase(transitionPhase, s)}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 0,
            height: 0,
            zIndex: 20
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              transform: 'translate(-50%, -50%)',
              background: 'rgba(255, 255, 255, 0.03)',
              border: `1px solid ${s.color}35`,
              color: '#ffffff',
              padding: '7px 14px',
              borderRadius: '20px',
              fontSize: '0.85rem',
              fontWeight: 500,
              boxShadow: `0 4px 15px ${s.color}15, inset 0 1px 0 rgba(255,255,255,0.05)`,
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              whiteSpace: 'nowrap'
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: s.color, boxShadow: `0 0 8px ${s.color}` }} />
            {s.text}
          </div>
        </motion.div>
      ))}

    </div>
  );
}
const SignalCapsule = ({ text, color, x, y, opacity = 1, scale = 1, pulseColor, transition }) => {
  return (
    <motion.div
      animate={{ x, y, opacity, scale }}
      transition={transition || { duration: 1.5, ease: "easeInOut" }}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        zIndex: 110,
        pointerEvents: 'none'
      }}
    >
      <div
        style={{
          transform: 'translate(-50%, -50%)',
          padding: '10px 18px',
          borderRadius: '24px',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(12px) saturate(120%)',
          border: `1.5px solid rgba(${color}, 0.35)`,
          boxShadow: `0 8px 32px rgba(0, 0, 0, 0.4), inset 0 0 12px rgba(${color}, 0.15), 0 0 15px rgba(${color}, 0.2)`,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          whiteSpace: 'nowrap'
        }}
      >
        <span style={{ position: 'relative', display: 'flex', height: '8px', width: '8px' }}>
          <span style={{
            animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
            position: 'absolute',
            display: 'inline-flex',
            height: '8px',
            width: '8px',
            borderRadius: '50%',
            backgroundColor: pulseColor,
            opacity: 0.75
          }} />
          <span style={{
            position: 'relative',
            display: 'inline-flex',
            borderRadius: '50%',
            height: '8px',
            width: '8px',
            backgroundColor: pulseColor
          }} />
        </span>
        <span style={{
          color: '#ffffff',
          fontSize: '12px',
          fontWeight: 600,
          letterSpacing: '-0.01em',
          textShadow: '0 2px 4px rgba(0,0,0,0.5)'
        }}>
          {text}
        </span>
      </div>
    </motion.div>
  );
};

export default function Scene2({ globalStep }) {
  // Scene 2 starts at globalStep = 9.
  // step = globalStep - 9
  const step = globalStep - 9;
  const homeScrollRef = useRef(null);
  const healthScrollRef = useRef(null);
  const [communityTab, setCommunityTab] = useState('groups');
  const [cyclingStep, setCyclingStep] = useState(0);
  const [transitionPhase, setTransitionPhase] = useState(1);
  const [agentPhase, setAgentPhase] = useState(1);

  useEffect(() => {
    if (step === 12) {
      setAgentPhase(1);
      const t2 = setTimeout(() => setAgentPhase(2), 3000);
      const t3 = setTimeout(() => setAgentPhase(3), 6000);
      const t4 = setTimeout(() => setAgentPhase(4), 9500);
      return () => {
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
      };
    } else if (step >= 13) {
      setAgentPhase(4);
    } else {
      setAgentPhase(1);
    }
  }, [step]);

  useEffect(() => {
    if (step === 11) {
      setCyclingStep(0);
      setTransitionPhase(1);
      
      const interval = setInterval(() => {
        setCyclingStep(prev => (prev + 1) % 5);
      }, 3000);
      
      const t2 = setTimeout(() => setTransitionPhase(2), 3000);
      const t3 = setTimeout(() => setTransitionPhase(3), 5500);
      const t4 = setTimeout(() => setTransitionPhase(4), 8000);
      const t5 = setTimeout(() => setTransitionPhase(5), 10500);
      const t6 = setTimeout(() => setTransitionPhase(6), 13500);
      
      return () => {
        clearInterval(interval);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
        clearTimeout(t5);
        clearTimeout(t6);
      };
    }
  }, [step]);

  // Auto-scroll the admin engine content-scroll container slowly to show what's below
  useEffect(() => {
    let intervalId = null;
    let scrollDirection = 1; // 1 = down, -1 = up
    let isPaused = false;
    let pauseTimeoutId = null;

    const startAutoScroll = () => {
      const container = document.querySelector('.admin-engine-scope .content-scroll');
      if (!container) return;

      intervalId = setInterval(() => {
        if (isPaused) return;

        const maxScroll = container.scrollHeight - container.clientHeight;
        if (maxScroll <= 0) return;

        // Slow smooth scroll: 0.8px per 30ms step
        let nextScroll = container.scrollTop + scrollDirection * 0.8;

        if (scrollDirection === 1 && nextScroll >= maxScroll) {
          nextScroll = maxScroll;
          isPaused = true;
          scrollDirection = -1; // Change direction to up
          pauseTimeoutId = setTimeout(() => {
            isPaused = false;
          }, 3000); // Pause for 3 seconds at the bottom
        } else if (scrollDirection === -1 && nextScroll <= 0) {
          nextScroll = 0;
          isPaused = true;
          scrollDirection = 1; // Change direction to down
          pauseTimeoutId = setTimeout(() => {
            isPaused = false;
          }, 3000); // Pause for 3 seconds at the top
        }

        container.scrollTop = nextScroll;
      }, 30);
    };

    const isActive = (step === 11 && transitionPhase === 6) || step >= 12;

    if (isActive) {
      const timer = setTimeout(startAutoScroll, 1000); // Brief delay for mounting
      return () => {
        clearTimeout(timer);
        if (intervalId) clearInterval(intervalId);
        if (pauseTimeoutId) clearTimeout(pauseTimeoutId);
        // Reset scroll position on unmount/deactivation
        const container = document.querySelector('.admin-engine-scope .content-scroll');
        if (container) {
          container.scrollTop = 0;
        }
      };
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (pauseTimeoutId) clearTimeout(pauseTimeoutId);
    };
  }, [step, transitionPhase]);

  useEffect(() => {
    if (step === 3) {
      setCommunityTab('groups');
      const t1 = setTimeout(() => setCommunityTab('events'), 6000);
      const t2 = setTimeout(() => setCommunityTab('buddy'), 12000);
      const t3 = setTimeout(() => setCommunityTab('discover'), 18000);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [step]);

  useEffect(() => {
    if (healthScrollRef.current) {
      const el = healthScrollRef.current;
      if (step === 4) {
        el.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (step === 5 || step === 6) {
        el.scrollTo({ top: 1800, behavior: 'smooth' });
      }
    }
  }, [step]);

  useEffect(() => {
    if (step === 7 && homeScrollRef.current) {
      homeScrollRef.current.scrollTo({ top: 180, behavior: 'smooth' });
    }
  }, [step]);

  useEffect(() => {
    // Only start if we are strictly on step 0
    if (step === 0 && homeScrollRef.current) {
      let rafId;
      let start = null;
      
      // Timing configuration (ms)
      const delayScrollDown = 2500; // wait 2.5s while phone centers and slides left
      const scrollDuration = 5000; // take 5s to scroll down
      const pauseDuration = 1000; // wait 1s at bottom
      const scrollUpDuration = 4000; // take 4s to scroll back up
      
      const el = homeScrollRef.current;
      
      const animateScroll = (timestamp) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const maxScroll = el.scrollHeight - el.clientHeight;
        
        if (maxScroll <= 0) {
          rafId = requestAnimationFrame(animateScroll);
          return;
        }
        
        if (elapsed < delayScrollDown) {
          el.scrollTop = 0;
        } else if (elapsed < delayScrollDown + scrollDuration) {
          const progress = (elapsed - delayScrollDown) / scrollDuration;
          const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
          el.scrollTop = maxScroll * ease;
        } else if (elapsed < delayScrollDown + scrollDuration + pauseDuration) {
          el.scrollTop = maxScroll;
        } else if (elapsed < delayScrollDown + scrollDuration + pauseDuration + scrollUpDuration) {
          const progress = (elapsed - (delayScrollDown + scrollDuration + pauseDuration)) / scrollUpDuration;
          const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
          el.scrollTop = maxScroll * (1 - ease);
        } else {
          el.scrollTop = 0;
          return; // done
        }
        
        rafId = requestAnimationFrame(animateScroll);
      };
      
      rafId = requestAnimationFrame(animateScroll);
      return () => cancelAnimationFrame(rafId);
    }
  }, [step]);
  
  if (step < 0) return null;

  // Cinematic settings
  const transitionSettings = { duration: 1.5, ease: "easeInOut" };
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: transitionSettings },
    exit: { opacity: 0, y: -20, transition: { duration: 1, ease: "easeInOut" } }
  };

  return (
    <div className="scene-container">
      
      {/* Background Atmosphere is handled continuously by Scene1 */}
      
      <div style={{ 
        display: 'flex', 
        width: '100%', 
        height: '100%', 
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: 2000
      }}>

        {/* ── PHONE MOCKUP (STUDENT APP) ── */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
          <AnimatePresence>
            {step >= 0 && (
              <>
                {/* Medibank Red Back Glow */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={
                    step === 0 
                      ? { 
                          opacity: [0, 0.8, 0.8, 0.25], 
                          scale: [0.6, 1.2, 1.2, 1.0],
                          x: [0, 0, -280] 
                        }
                      : (step >= 1 && step <= 11)
                      ? {
                          opacity: (step === 11 && transitionPhase >= 2) ? 0 : 0.25,
                          scale: 1.0,
                          x: -280
                        }
                      : step === 13
                      ? {
                          opacity: 0.15,
                          scale: 0.9,
                          x: -360,
                          y: 30
                        }
                      : { 
                          opacity: 0,
                          scale: 0.8,
                          x: -360 
                        }
                  }
                  transition={
                    step === 0
                      ? {
                          duration: 5.5,
                          ease: "easeInOut",
                          x: { times: [0, 0.7, 1], duration: 5.5, ease: "easeInOut" },
                          opacity: { times: [0, 0.4, 0.75, 1], duration: 5.5 }
                        }
                      : { duration: 1.5 }
                  }
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: 500,
                    height: 500,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255, 77, 106, 0.3) 0%, transparent 70%)',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 2,
                    pointerEvents: 'none'
                  }}
                />

                <PhoneMockup
                  initial={{ opacity: 0, scale: 0.7, y: 150, filter: 'blur(20px)', x: 0, rotateX: 10 }}
                  animate={
                    (step <= 11)
                      ? {
                          opacity: (step === 11 && transitionPhase >= 2) ? 0 : 1,
                          scale: 0.75,
                          y: -30,
                          filter: 'blur(0px)',
                          x: step === 0 ? [0, 0, -280] : -280,
                          rotateX: 0,
                          rotateY: 0
                        }
                      : step === 12
                      ? {
                          opacity: 0,
                          scale: 0.5,
                          x: -280,
                          filter: 'blur(10px)',
                          rotateX: 0,
                          rotateY: 15
                        }
                      : step === 13
                      ? {
                          opacity: 1,
                          scale: 0.7,
                          x: -390,
                          y: 30, // Shifted down to clear header
                          filter: 'blur(0px)',
                          rotateX: 0,
                          rotateY: 0
                        }
                      : { 
                          opacity: 0, 
                          scale: 0.5, 
                          y: -30, 
                          x: -390,
                          filter: 'blur(10px)',
                          rotateX: 0,
                          rotateY: 0 
                        }
                  }
                  transition={
                    step === 0
                      ? {
                          duration: 5.5,
                          ease: "easeInOut",
                          x: { times: [0, 0.7, 1], duration: 5.5, ease: "easeInOut" },
                          y: { duration: 2.5, ease: "easeOut" },
                          filter: { duration: 2.5, ease: "easeOut" },
                          opacity: { duration: 2.0, ease: "easeOut" },
                          rotateX: { duration: 2.5, ease: "easeOut" }
                        }
                      : step === 13
                      ? {
                          duration: 1.5,
                          ease: "easeInOut" // Disable infinite bobbing on step 22
                        }
                      : {
                          duration: 0.8,
                          ease: "easeOut"
                        }
                  }
                  style={{ position: 'relative' }}
                >
                <MemoryRouter>
                  <NavigationSync step={step} cyclingStep={cyclingStep} />
                  <PhoneLayout>
                    <AnimatePresence mode="wait">
                      {(step === 0 || step === 7) && (
                        <motion.div 
                          key="home" 
                          ref={homeScrollRef}
                          style={{ width: '100%', height: '100%', overflowY: 'auto', overflowX: 'hidden' }} 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }} 
                          exit={{ opacity: 0 }} 
                          transition={step === 0 ? { delay: 2.2, duration: 1.5 } : { duration: 1 }}
                        >
                          <Home />
                        </motion.div>
                      )}
                      {(step === 1 || step === 2) && (
                        <motion.div key="journey" style={{ width: '100%', height: '100%', overflow: 'hidden' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
                          <AnimatedJourney step={step} />
                        </motion.div>
                      )}
                      {step === 3 && (
                        <motion.div key="community" style={{ width: '100%', height: '100%', overflowY: 'auto', overflowX: 'hidden' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
                          <Community forcedTab={communityTab} />
                        </motion.div>
                      )}
                      {(step === 4 || step === 5 || step === 6) && (
                        <motion.div key="health" ref={healthScrollRef} style={{ width: '100%', height: '100%', overflowY: 'auto', overflowX: 'hidden' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
                          <Health />
                        </motion.div>
                      )}
                      {(step === 8 || step === 9 || step === 10) && (
                        <motion.div key="ovhc-transition-page" style={{ width: '100%', height: '100%', overflowY: 'auto', overflowX: 'hidden' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
                          <OvhcTransition forcedStep={step === 8 ? 1 : step === 9 ? 2 : 3} />
                        </motion.div>
                      )}
                      {/* Step 11: Cycling live simulator */}
                      {step === 11 && (
                        <motion.div key="cycling-screens" style={{ width: '100%', height: '100%', overflow: 'hidden' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          {cyclingStep === 0 && <Community forcedTab="discover" />}
                          {cyclingStep === 1 && <Health />}
                          {cyclingStep === 2 && <Home />}
                          {cyclingStep === 3 && <AnimatedJourney step={2} />}
                          {cyclingStep === 4 && <OvhcTransition forcedStep={3} />}
                        </motion.div>
                      )}
                      {/* Step 12: Ecosystem reveal (phone invisible) */}
                      {step === 12 && (
                        <motion.div key="empty-hold" style={{ width: '100%', height: '100%' }} />
                      )}
                      {/* Step 13 to 17: OVHC Transition recommendations tab (calm, focused screen with scroll drift) */}
                      {step >= 13 && step <= 17 && (
                        <motion.div 
                          key="ovhc-transition-hold" 
                          style={{ width: '100%', height: '100%', overflowY: 'auto', overflowX: 'hidden' }} 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }} 
                          exit={{ opacity: 0 }}
                        >
                          <motion.div
                            animate={{ y: [0, -12, 0] }}
                            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <OvhcTransition forcedStep={1} step={step} />
                          </motion.div>
                        </motion.div>
                      )}
                      {/* Shifted subsequent steps: Step 18 (old 13) */}
                      {step === 18 && (
                        <motion.div key="community-shifted" style={{ width: '100%', height: '100%', overflowY: 'auto', overflowX: 'hidden' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          <Community forcedTab="discover" />
                        </motion.div>
                      )}
                      {/* Shifted subsequent steps: Step 19+ (old 14+) */}
                      {step >= 19 && (
                        <motion.div key="cover" style={{ width: '100%', height: '100%', overflowY: 'auto', overflowX: 'hidden' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
                          <Cover />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </PhoneLayout>
                </MemoryRouter>
              </PhoneMockup>
            </>
          )}
        </AnimatePresence>
        </div>

        {/* ── LAPTOP SILHOUETTE (MATERIALISATION PHASE) ── */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 4 }}>
          <AnimatePresence>
            {step === 11 && (transitionPhase === 5 || transitionPhase === 6) && (
              <motion.div
                key="laptop-silhouette"
                initial={{ opacity: 0, scale: 0.65, y: -30 }}
                animate={{ 
                  opacity: transitionPhase === 6 ? 0.25 : 1,
                  scale: transitionPhase === 6 ? 0.85 : 0.65,
                  y: transitionPhase === 6 ? 20 : -30
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                style={{
                  width: 1024,
                  height: 640,
                  transformOrigin: 'center center'
                }}
              >
                <LaptopSilhouette />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── CONVERSION ENGINE CHIP ── */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 15, pointerEvents: 'none' }}>
          <AnimatePresence>
            {step === 11 && transitionPhase >= 4 && transitionPhase < 6 && (
              <motion.div
                key="conversion-engine-chip"
                initial={{ 
                  opacity: 0, 
                  scale: 0.4, 
                  x: 0, 
                  y: -30 
                }}
                animate={{ 
                  opacity: (step === 11 && transitionPhase === 6) ? 0 : 1, 
                  scale: step >= 12 ? 0.85 : 1, 
                  x: step >= 12 ? -300 : 0, 
                  y: -30 
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.4,
                  transition: { duration: 0.8 } 
                }}
                transition={{ 
                  duration: 2.0, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                style={{
                  width: 0,
                  height: 0,
                  position: 'relative'
                }}
              >
                {/* Concentric Pulse Ring 1 Wrapper */}
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  transform: 'translate(-50%, -50%)',
                  width: '280px',
                  height: '280px'
                }}>
                  <motion.div
                    animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      border: '2px solid rgba(255, 77, 106, 0.2)',
                      background: 'radial-gradient(circle, rgba(255, 77, 106, 0.05) 0%, transparent 70%)'
                    }}
                  />
                </div>

                {/* Concentric Pulse Ring 2 Wrapper */}
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  transform: 'translate(-50%, -50%)',
                  width: '280px',
                  height: '280px'
                }}>
                  <motion.div
                    animate={{ scale: [1, 1.4], opacity: [0.4, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeOut", delay: 2 }}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      border: '1px dashed rgba(56, 182, 255, 0.15)',
                      background: 'radial-gradient(circle, rgba(56, 182, 255, 0.03) 0%, transparent 70%)'
                    }}
                  />
                </div>

                {/* Central Glassmorphic Mesh Core Wrapper */}
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  transform: 'translate(-50%, -50%)',
                  width: '140px',
                  height: '140px'
                }}>
                  <motion.div
                    animate={{ 
                      rotate: 360,
                      boxShadow: [
                        '0 0 30px rgba(255, 77, 106, 0.2)',
                        '0 0 50px rgba(56, 182, 255, 0.2)',
                        '0 0 30px rgba(255, 77, 106, 0.2)'
                      ]
                    }}
                    transition={{ 
                      rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                      boxShadow: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '35px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      backdropFilter: 'blur(15px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative'
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      width: '80%',
                      height: '80%',
                      opacity: 0.2,
                      backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)',
                      backgroundSize: '16px 16px'
                    }} />

                    <span style={{
                      fontSize: '0.62rem',
                      fontWeight: 700,
                      color: 'rgba(255, 255, 255, 0.9)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      textAlign: 'center',
                      lineHeight: 1.25,
                      maxWidth: '90%',
                      zIndex: 2
                    }}>
                      Conversion<br/>Engine
                    </span>
                    
                    {/* Small floating orbital nodes */}
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0
                      }}
                    >
                      <span style={{ position: 'absolute', top: '-4px', left: '50%', transform: 'translateX(-50%)', width: '8px', height: '8px', borderRadius: '50%', background: '#4ADE80', boxShadow: '0 0 8px #4ADE80' }} />
                      <span style={{ position: 'absolute', bottom: '-4px', left: '50%', transform: 'translateX(-50%)', width: '8px', height: '8px', borderRadius: '50%', background: '#38B6FF', boxShadow: '0 0 8px #38B6FF' }} />
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── CONNECTION LINK: CHIP → LAPTOP ── */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, height: 600, pointerEvents: 'none', zIndex: 3 }}>
          <AnimatePresence>
            {step >= 12 && (
              <svg 
                viewBox="0 0 800 600" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  position: 'absolute', 
                  top: 0, 
                  left: 0 
                }}
              >
                <motion.path
                  d="M 160 270 H 318" // Drawn from chip right side to laptop left side bezel
                  fill="none"
                  stroke="url(#energyLinkGrad)"
                  strokeWidth="2.5"
                  strokeDasharray="6 6"
                  initial={{ pathLength: 0 }}
                  animate={{ 
                    pathLength: 1,
                    strokeDashoffset: -24
                  }}
                  transition={{ 
                    pathLength: { duration: 1.5, ease: "easeOut" },
                    strokeDashoffset: { duration: 2, ease: "linear", repeat: Infinity }
                  }}
                  style={{
                    filter: 'drop-shadow(0 0 4px rgba(56, 182, 255, 0.4))'
                  }}
                />
                <defs>
                  <linearGradient id="energyLinkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FF4D6A" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#38B6FF" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
              </svg>
            )}
          </AnimatePresence>
        </div>

        {/* ── LAPTOP MOCKUP (ADMIN ENGINE) ── */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 5 }}>
          <AnimatePresence>
            {((step === 11 && transitionPhase === 6) || (step === 12 && agentPhase < 4)) && (
              <LaptopMockup
                initial={{ opacity: 0, scale: 0.8, x: 0, y: -30, rotateY: 0 }}
                animate={
                  step === 11
                    ? { 
                        opacity: 1, 
                        scale: 0.85, 
                        x: 0,
                        y: 20,
                        rotateY: 0,
                        filter: 'brightness(1)'
                      }
                    : { 
                        opacity: 1, 
                        scale: agentPhase === 1 ? 0.85 : 0.65, 
                        x: agentPhase === 1 ? 0 : -320,
                        y: agentPhase === 1 ? 20 : -30, // Counter-float
                        rotateY: agentPhase === 1 ? 0 : 15,
                        filter: 'brightness(1)'
                      }
                }
                exit={{
                  opacity: 0,
                  scale: 0.5,
                  x: -320,
                  y: -30,
                  rotateY: 15,
                  filter: 'brightness(0)',
                  transition: { duration: 1.5, ease: 'easeInOut' }
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  y: { 
                    duration: 7, 
                    repeat: step === 12 ? Infinity : 0, 
                    ease: "easeInOut", 
                    delay: 1 
                  }
                }}
                style={{ position: 'relative' }}
              >
              <MemoryRouter initialEntries={['/']}>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<CommandCentre />} />
                  </Route>
                </Routes>
              </MemoryRouter>
            </LaptopMockup>
          )}
        </AnimatePresence>
        </div>

        {/* ── AGENT ECOSYSTEM REVEAL ── */}
        <AgentEcosystem step={step} agentPhase={agentPhase} />

        {/* ── DATA SIGNALS (PARTICLES) ── */}
        <AnimatePresence>
          {step === 13 && (
            <>
              {/* Signal 1: Graduate visa webinar attended */}
              <SignalCapsule
                key="sig-1-unified"
                text="Graduate visa webinar attended"
                color="56, 182, 255"
                pulseColor="#38B6FF"
                x={[-390, -90, -70, 20]}
                y={[30, -40, -20, 80]}
                opacity={[1, 1, 1, 0]}
                scale={[0.8, 1, 1, 0.7]}
                transition={{
                  duration: 5.2,
                  times: [0, 0.23, 0.81, 1.0],
                  ease: "easeInOut"
                }}
              />

              {/* Signal 2: OVHC pricing explored repeatedly */}
              <SignalCapsule
                key="sig-2-unified"
                text="OVHC pricing explored repeatedly"
                color="255, 77, 106"
                pulseColor="#FF4D6A"
                x={[-390, -390, -80, -60, 20]}
                y={[30, 30, 40, 50, 80]}
                opacity={[0, 1, 1, 1, 0]}
                scale={[0.8, 0.8, 1, 1, 0.7]}
                transition={{
                  duration: 5.2,
                  times: [0, 0.19, 0.42, 0.81, 1.0],
                  ease: "easeInOut"
                }}
              />

              {/* Signal 3: “Keep your benefits” viewed multiple times */}
              <SignalCapsule
                key="sig-3-unified"
                text="“Keep your benefits” viewed multiple times"
                color="245, 158, 11"
                pulseColor="#F59E0B"
                x={[-390, -390, -100, -80, 20]}
                y={[90, 90, 100, 110, 80]}
                opacity={[0, 1, 1, 1, 0]}
                scale={[0.8, 0.8, 1, 1, 0.7]}
                transition={{
                  duration: 5.2,
                  times: [0, 0.29, 0.52, 0.81, 1.0],
                  ease: "easeInOut"
                }}
              />

              {/* Signal 4: Active in postgraduate community */}
              <SignalCapsule
                key="sig-4-unified"
                text="Active in postgraduate community"
                color="139, 92, 246"
                pulseColor="#8B5CF6"
                x={[-390, -390, -70, -50, 20]}
                y={[120, 120, 130, 135, 80]}
                opacity={[0, 1, 1, 1, 0]}
                scale={[0.8, 0.8, 1, 1, 0.7]}
                transition={{
                  duration: 5.2,
                  times: [0, 0.42, 0.61, 0.81, 1.0],
                  ease: "easeInOut"
                }}
              />

              {/* Converged Intelligence Stream Pulse */}
              <motion.div
                initial={{ x: 20, y: 80, opacity: 0, scale: 0.8 }}
                animate={{
                  x: [20, 20, 20, 400],
                  y: [80, 80, 80, 150],
                  opacity: [0, 0, 1, 0],
                  scale: [0.8, 0.8, 1.4, 0.6]
                }}
                transition={{
                  times: [0, 0.75, 0.78, 1.0],
                  duration: 6.9,
                  ease: "easeInOut"
                }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  zIndex: 115,
                  pointerEvents: 'none'
                }}
              >
                <div
                  style={{
                    transform: 'translate(-50%, -50%)',
                    width: '45px',
                    height: '45px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #ffffff 0%, rgba(255, 77, 106, 0.9) 60%, transparent 100%)',
                    boxShadow: '0 0 40px 15px rgba(255, 77, 106, 0.7), 0 0 20px rgba(255, 255, 255, 0.9)'
                  }}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>



        <AnimatePresence>
          {(step === 17 || step === 18) && (
            <motion.div
              initial={{ opacity: 0, x: 360, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 320, y: -20, scale: 1 }}
              exit={{ opacity: 0, x: 360, y: -20, scale: 0.95 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-190px',
                width: '310px',
                padding: '24px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(8, 16, 32, 0.8) 0%, rgba(5, 8, 18, 0.9) 100%)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 77, 106, 0.3)',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.6), inset 0 0 0 1px rgba(255, 255, 255, 0.05), 0 0 20px rgba(255, 77, 106, 0.15)',
                zIndex: 100,
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                textAlign: 'left'
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{
                  background: 'rgba(255, 77, 106, 0.15)',
                  color: '#FF4D6A',
                  fontSize: '9.5px',
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: '10px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase'
                }}>
                  Intervention Brief
                </span>
                <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)' }}>
                  Action Studio
                </span>
              </div>

              {/* Title & Origin */}
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff', margin: '0 0 4px 0', letterSpacing: '-0.01em' }}>
                  Graduate Transition
                </h3>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>
                  Originating Agent: <strong style={{ color: '#ffffff' }}>Segmentation</strong>
                </p>
              </div>

              <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }} />

              {/* Opportunity / Metrics Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Revenue Opportunity</span>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#4ADE80', marginTop: '2px' }}>+$180,000</div>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cohort Size</span>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', marginTop: '2px' }}>3,240 Students</div>
                </div>
              </div>

              {/* Detail list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11.5px', color: 'rgba(255, 255, 255, 0.7)' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <span style={{ color: '#FF4D6A' }}>•</span>
                  <span><strong>Channels:</strong> In-App, WhatsApp, Email sequence</span>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <span style={{ color: '#FF4D6A' }}>•</span>
                  <span><strong>Confidence Score:</strong> 94% (High Stay Intent)</span>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <span style={{ color: '#FF4D6A' }}>•</span>
                  <span><strong>Urgency:</strong> Launch within 14 days (OSHC Expiry)</span>
                </div>
              </div>

              {/* Warning box */}
              <div style={{
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '10.5px',
                color: '#F59E0B',
                lineHeight: '1.4'
              }}>
                <strong>Human approval required.</strong> An estimated 15% of this cohort will lapse to a competitor if no intervention occurs.
              </div>

              {/* Approve CTA Button */}
              <button style={{
                background: 'linear-gradient(135deg, #FF4D6A 0%, #E63554 100%)',
                color: '#ffffff',
                border: 'none',
                padding: '12px',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(255, 77, 106, 0.3)',
                textAlign: 'center'
              }}>
                Approve & Launch Sequence
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── NARRATIVE HEADLINES (Foreground) ── */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 100 }}>
          <AnimatePresence mode="wait">
            
            {step === 0 && (
              <motion.div 
                key="text0" 
                style={{ 
                  position: 'absolute', 
                  right: '8%', 
                  top: '50%', 
                  maxWidth: '560px', 
                  pointerEvents: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.2rem'
                }}
                initial={{ opacity: 0, y: '-50%' }}
                animate={{ opacity: 1, y: '-50%' }}
                exit={{ opacity: 0, y: '-50%', transition: { duration: 0.8 } }}
                transition={{ duration: 1.0 }}
              >
                {/* 1. Small Upper Label */}
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 0.4 }}
                  transition={{ delay: 4.4, duration: 1.2, ease: "easeOut" }}
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    color: '#ffffff',
                    textTransform: 'uppercase'
                  }}
                >
                  From Insurance Provider &rarr; Daily Companion
                </motion.div>

                {/* 2. Main Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 4.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontSize: '2.8rem',
                    fontWeight: 600,
                    lineHeight: 1.2,
                    color: '#ffffff',
                    letterSpacing: '-0.02em',
                    margin: 0
                  }}
                >
                  Medibank becomes part of everyday student life.
                </motion.h1>

                {/* 3. Supporting Text */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.65 }}
                  transition={{ delay: 5.3, duration: 1.2, ease: "easeOut" }}
                  style={{
                    fontSize: '1.15rem',
                    lineHeight: 1.5,
                    color: '#ffffff',
                    margin: '0 0 0.8rem 0',
                    fontWeight: 300
                  }}
                >
                  Instead of interacting only during claims or emergencies, students now engage with Medibank throughout their journey in Australia.
                </motion.p>

                {/* 4. Signal Blocks (Staggered) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {/* Signal Block 1 */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 5.8, duration: 1.0, ease: "easeOut" }}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      borderRadius: '16px',
                      padding: '1rem 1.25rem',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.85rem',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
                    }}
                  >
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#38B6FF',
                      boxShadow: '0 0 8px #38B6FF',
                      marginTop: '0.45rem',
                      flexShrink: 0
                    }} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                      <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 500, color: '#ffffff' }}>
                        More engagement
                      </h4>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.55)', lineHeight: 1.4, fontWeight: 300 }}>
                        Students return through journey support, community experiences, health rewards, and everyday utilities.
                      </p>
                    </div>
                  </motion.div>

                  {/* Signal Block 2 */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 6.2, duration: 1.0, ease: "easeOut" }}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      borderRadius: '16px',
                      padding: '1rem 1.25rem',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.85rem',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
                    }}
                  >
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#00C896',
                      boxShadow: '0 0 8px #00C896',
                      marginTop: '0.45rem',
                      flexShrink: 0
                    }} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                      <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 500, color: '#ffffff' }}>
                        More behavioural understanding
                      </h4>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.55)', lineHeight: 1.4, fontWeight: 300 }}>
                        Every interaction creates signals around settlement, graduation, future plans, and intent to stay in Australia.
                      </p>
                    </div>
                  </motion.div>

                  {/* Signal Block 3 */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 6.6, duration: 1.0, ease: "easeOut" }}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      borderRadius: '16px',
                      padding: '1rem 1.25rem',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.85rem',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
                    }}
                  >
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#ff4d6a',
                      boxShadow: '0 0 8px #ff4d6a',
                      marginTop: '0.45rem',
                      flexShrink: 0
                    }} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                      <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 500, color: '#ffffff' }}>
                        Stronger conversion pathways
                      </h4>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.55)', lineHeight: 1.4, fontWeight: 300 }}>
                        Higher trust and loyalty make the transition from OSHC to OVHC feel natural instead of transactional.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {(step === 1 || step === 2) && (
              <motion.div 
                key="journey-text" 
                style={{ 
                  position: 'absolute', 
                  right: '10%', 
                  top: '28%', 
                  maxWidth: '600px', 
                  pointerEvents: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2.5rem'
                }}
                initial={{ opacity: 0, x: 30 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: 30, transition: { duration: 1 } }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                <motion.div
                  animate={{
                    scale: step === 2 ? 0.92 : 1,
                    opacity: step === 2 ? 0.4 : 1,
                    y: step === 2 ? -35 : 0
                  }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  style={{ transformOrigin: "left center" }}
                >
                  <h1 className="cinematic-text primary" style={{ fontSize: '3rem', textAlign: 'left' }}>Support begins before students even arrive.</h1>
                  <p className="cinematic-text secondary" style={{ fontSize: '1.5rem', marginTop: '1rem', textAlign: 'left' }}>Medibank becomes one of the earliest support systems in a student’s Australian journey.</p>
                </motion.div>
                
                <AnimatePresence>
                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 30 }}
                      transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                    >
                      <h1 className="cinematic-text primary" style={{ fontSize: '3rem', textAlign: 'left' }}>But the journey doesn’t stop at arrival.</h1>
                      <p className="cinematic-text secondary" style={{ fontSize: '1.5rem', marginTop: '1rem', textAlign: 'left' }}>
                        We continue helping students settle in, build connections, and feel at home in Australia.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="text2" 
                style={{ 
                  position: 'absolute', 
                  right: '6%', 
                  top: '46%', 
                  width: '560px', 
                  height: '600px',
                  pointerEvents: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                  zIndex: 110
                }}
                initial={{ opacity: 0, x: 30, y: '-50%' }} 
                animate={{ opacity: 1, x: 0, y: '-50%' }} 
                exit={{ opacity: 0, x: 30, y: '-50%', transition: { duration: 0.8 } }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                {/* Persistent Headline */}
                <h1 className="cinematic-text primary" style={{ fontSize: '2.8rem', fontWeight: 600, textAlign: 'left', margin: 0, lineHeight: 1.2, color: '#ffffff' }}>
                  Community creates belonging — and behavioural insight.
                </h1>

                {/* Dynamic Content based on communityTab */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={communityTab}
                    initial={{ opacity: 0, y: 15, filter: 'blur(5px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -15, filter: 'blur(5px)' }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', width: '100%' }}
                  >
                    {/* Supporting Line */}
                    <p style={{
                      fontSize: '1.2rem',
                      lineHeight: 1.5,
                      color: 'rgba(255, 255, 255, 0.7)',
                      margin: 0,
                      fontWeight: 300
                    }}>
                      {communityTab === 'groups' && "Students instantly find people experiencing the same transition."}
                      {communityTab === 'events' && "Real-world events turn digital engagement into genuine connection."}
                      {communityTab === 'buddy' && "Students never have to navigate a new country alone."}
                      {communityTab === 'discover' && "Community engagement reveals student intent, concerns, and future plans."}
                    </p>

                    {/* Cards Container */}
                    <div style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '1.2rem', 
                      marginTop: '0.5rem',
                      perspective: 1000
                    }}>
                      {communityTab === 'groups' && (
                        <>
                          {/* Card 1: RMIT International Students */}
                          <motion.div
                            initial={{ opacity: 0, y: 20, rotateX: 5 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="group-card"
                            style={{ 
                              background: 'rgba(30, 63, 138, 0.1)', 
                              border: '1px solid rgba(30, 63, 138, 0.2)',
                              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                              pointerEvents: 'none'
                            }}
                          >
                            <div className="group-card-left">
                              <div className="group-icon-circle" style={{ background: '#eff6ff', color: '#1e3f8a' }}>
                                <span className="group-emoji">🎓</span>
                              </div>
                            </div>
                            <div className="group-card-body">
                              <div className="group-card-top">
                                <span className="group-category-tag" style={{ color: '#1e3f8a', background: '#eff6ff' }}>
                                  University
                                </span>
                                <span className="group-joined-badge" style={{ background: 'rgba(30, 63, 138, 0.2)', color: '#93c5fd' }}>✓ Joined</span>
                              </div>
                              <h3 className="group-name" style={{ color: '#fff' }}>RMIT International Students</h3>
                              <p className="group-desc" style={{ color: 'rgba(255,255,255,0.6)' }}>Connect with fellow RMIT students — share tips, ask questions, and find your people.</p>
                              <div className="group-card-footer">
                                <span className="group-members" style={{ color: 'rgba(255,255,255,0.4)' }}>
                                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}><Users size={12} /> 1,240 members</span>
                                </span>
                              </div>
                            </div>
                          </motion.div>

                          {/* Card 2: Housing & Rentals Melbourne */}
                          <motion.div
                            initial={{ opacity: 0, y: 20, rotateX: 5 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="group-card"
                            style={{ 
                              background: 'rgba(6, 95, 70, 0.1)', 
                              border: '1px solid rgba(6, 95, 70, 0.2)',
                              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                              pointerEvents: 'none'
                            }}
                          >
                            <div className="group-card-left">
                              <div className="group-icon-circle" style={{ background: '#ecfdf5', color: '#065f46' }}>
                                <span className="group-emoji">🏠</span>
                              </div>
                            </div>
                            <div className="group-card-body">
                              <div className="group-card-top">
                                <span className="group-category-tag" style={{ color: '#065f46', background: '#ecfdf5' }}>
                                  Housing
                                </span>
                              </div>
                              <h3 className="group-name" style={{ color: '#fff' }}>Housing & Rentals Melbourne</h3>
                              <p className="group-desc" style={{ color: 'rgba(255,255,255,0.6)' }}>Find student accommodation, flatmates, and rental advice in Melbourne.</p>
                              <div className="group-card-footer">
                                <span className="group-members" style={{ color: 'rgba(255,255,255,0.4)' }}>
                                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}><Users size={12} /> 2,350 members</span>
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        </>
                      )}

                      {communityTab === 'events' && (
                        <>
                          {/* Card 1: Melbourne Coffee Meetup */}
                          <motion.div
                            initial={{ opacity: 0, y: 20, rotateX: 5 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="event-card"
                            style={{ 
                              background: 'rgba(255, 255, 255, 0.03)', 
                              border: '1px solid rgba(255, 255, 255, 0.08)',
                              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                              padding: '1.2rem',
                              pointerEvents: 'none'
                            }}
                          >
                            <div className="event-card-header">
                              <div className="event-icon-circle" style={{ background: '#eff6ff', color: '#1e3f8a' }}>
                                <span className="event-emoji">☕</span>
                              </div>
                              <div className="event-header-right">
                                <span className="event-type-tag" style={{ color: '#1e3f8a', background: '#eff6ff' }}>
                                  Student Meetup
                                </span>
                              </div>
                            </div>
                            <h3 className="event-title" style={{ color: '#fff', fontSize: '1.1rem', margin: '0.6rem 0' }}>Melbourne Coffee Meetup</h3>
                            <div className="event-meta" style={{ color: 'rgba(255,255,255,0.6)' }}>
                              <div className="event-meta-row" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', marginBottom: '4px' }}>
                                <Clock size={13} />
                                <span>Sat, 10 May · 10:00 AM</span>
                              </div>
                              <div className="event-meta-row" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', marginBottom: '4px' }}>
                                <MapPin size={13} />
                                <span>Dukes Coffee Roasters, CBD</span>
                              </div>
                              <div className="event-meta-row" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                                <Users size={13} />
                                <span>45 attending</span>
                              </div>
                            </div>
                          </motion.div>

                          {/* Card 2: International Student Cricket Tournament */}
                          <motion.div
                            initial={{ opacity: 0, y: 20, rotateX: 5 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="event-card"
                            style={{ 
                              background: 'rgba(255, 255, 255, 0.03)', 
                              border: '1px solid rgba(255, 255, 255, 0.08)',
                              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                              padding: '1.2rem',
                              pointerEvents: 'none'
                            }}
                          >
                            <div className="event-card-header">
                              <div className="event-icon-circle" style={{ background: '#ecfdf5', color: '#10b981' }}>
                                <span className="event-emoji">🏏</span>
                              </div>
                              <div className="event-header-right">
                                <span className="event-type-tag" style={{ color: '#10b981', background: '#ecfdf5' }}>
                                  Local Activity
                                </span>
                              </div>
                            </div>
                            <h3 className="event-title" style={{ color: '#fff', fontSize: '1.1rem', margin: '0.6rem 0' }}>International Student Cricket Tournament</h3>
                            <div className="event-meta" style={{ color: 'rgba(255,255,255,0.6)' }}>
                              <div className="event-meta-row" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', marginBottom: '4px' }}>
                                <Clock size={13} />
                                <span>Sun, 18 May · 1:00 PM</span>
                              </div>
                              <div className="event-meta-row" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', marginBottom: '4px' }}>
                                <MapPin size={13} />
                                <span>Royal Park Oval, Parkville</span>
                              </div>
                              <div className="event-meta-row" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                                <Users size={13} />
                                <span>120 attending</span>
                              </div>
                            </div>
                          </motion.div>
                        </>
                      )}

                      {communityTab === 'buddy' && (
                        <>
                          {/* Card 1: Match Message Bubble */}
                          <motion.div
                            initial={{ opacity: 0, y: 20, rotateX: 5 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="buddy-card"
                            style={{ 
                              background: 'rgba(255, 255, 255, 0.03)', 
                              border: '1px solid rgba(255, 255, 255, 0.08)',
                              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                              padding: '1.2rem',
                              pointerEvents: 'none'
                            }}
                          >
                            <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center', marginBottom: '0.6rem' }}>
                              <div className="buddy-avatar-wrapper" style={{ width: 40, height: 40, background: '#eff6ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span className="buddy-avatar" style={{ fontSize: '1.4rem', lineHeight: 1 }}>👩🏽</span>
                              </div>
                              <div>
                                <h4 style={{ margin: 0, color: '#fff', fontSize: '0.95rem', fontWeight: 500 }}>Priya S. &rarr; Rahul K.</h4>
                                <p style={{ margin: 0, fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)' }}>Matched 1 hour ago · RMIT Buddy Program</p>
                              </div>
                            </div>
                            <p style={{ margin: 0, fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.4, fontStyle: 'italic', background: 'rgba(255,255,255,0.03)', padding: '0.75rem 1rem', borderRadius: '12px' }}>
                              "Hey Rahul! Welcome to Melbourne. Don't worry about setting up your SIM or Myki card — I can walk you through it tomorrow!"
                            </p>
                          </motion.div>

                          {/* Card 2: Carlos matched details */}
                          <motion.div
                            initial={{ opacity: 0, y: 20, rotateX: 5 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="buddy-card"
                            style={{ 
                              background: 'rgba(255, 255, 255, 0.03)', 
                              border: '1px solid rgba(255, 255, 255, 0.08)',
                              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                              padding: '1.2rem',
                              pointerEvents: 'none'
                            }}
                          >
                            <div className="buddy-card-top" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                              <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <span className="buddy-avatar" style={{ fontSize: '1.4rem' }}>👨🏽</span>
                                <div className="buddy-info">
                                  <h3 className="buddy-name" style={{ color: '#fff', fontSize: '0.95rem', margin: 0 }}>Carlos M.</h3>
                                  <p className="buddy-uni" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', margin: 0 }}>Univ. of Melbourne · 2nd year</p>
                                </div>
                              </div>
                              <span style={{ fontSize: '0.75rem', background: 'rgba(74, 222, 128, 0.15)', color: '#4ADE80', border: '1px solid rgba(74,222,128,0.2)', padding: '2px 8px', borderRadius: '12px', height: 'fit-content', fontWeight: 500 }}>Active Match</span>
                            </div>
                            <p className="buddy-bio" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', margin: '0 0 0.6rem 0' }}>Carlos is online and helping a new student resolve housing search questions near Parkville.</p>
                            <div className="buddy-tags" style={{ display: 'flex', gap: '4px' }}>
                              <span className="buddy-tag" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', padding: '2px 6px', fontSize: '0.75rem', borderRadius: '4px' }}>OSHC</span>
                              <span className="buddy-tag" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', padding: '2px 6px', fontSize: '0.75rem', borderRadius: '4px' }}>Housing</span>
                            </div>
                          </motion.div>
                        </>
                      )}

                      {communityTab === 'discover' && (
                        <>
                          {/* Card 1: Trending Discussion */}
                          <motion.div
                            initial={{ opacity: 0, y: 20, rotateX: 5 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                            transition={{ delay: 0.1, duration: 0.8 }}
                            className="discover-card"
                            style={{ 
                              background: 'rgba(255, 255, 255, 0.03)', 
                              border: '1px solid rgba(255, 255, 255, 0.08)',
                              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                              padding: '1rem 1.2rem',
                              pointerEvents: 'none'
                            }}
                          >
                            <div className="discover-card-left" style={{ marginRight: '0.75rem' }}>
                              <span className="discover-emoji" style={{ fontSize: '1.25rem' }}>🏥</span>
                            </div>
                            <div className="discover-card-body">
                              <h3 className="discover-title" style={{ color: '#fff', fontSize: '0.95rem', margin: 0, fontWeight: 500 }}>How do I book a GP appointment without Medicare?</h3>
                              <div className="discover-meta" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                                <span className="discover-group">Indian Students Australia</span>
                                <span className="discover-dot">·</span>
                                <MessageCircle size={12} />
                                <span>31 replies</span>
                              </div>
                            </div>
                          </motion.div>

                          {/* Card 2: Career / Visa Discussion */}
                          <motion.div
                            initial={{ opacity: 0, y: 20, rotateX: 5 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="discover-card"
                            style={{ 
                              background: 'rgba(255, 255, 255, 0.03)', 
                              border: '1px solid rgba(255, 255, 255, 0.08)',
                              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                              padding: '1rem 1.2rem',
                              pointerEvents: 'none'
                            }}
                          >
                            <div className="discover-card-left" style={{ marginRight: '0.75rem' }}>
                              <span className="discover-emoji" style={{ fontSize: '1.25rem' }}>💼</span>
                            </div>
                            <div className="discover-card-body">
                              <h3 className="discover-title" style={{ color: '#fff', fontSize: '0.95rem', margin: 0, fontWeight: 500 }}>Graduate Careers & Temporary Graduate Visa (485)</h3>
                              <div className="discover-meta" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                                <span className="discover-group">RMIT International Students</span>
                                <span className="discover-dot">·</span>
                                <MessageCircle size={12} />
                                <span>42 replies</span>
                              </div>
                            </div>
                          </motion.div>

                          {/* Card 3: Subtle Intelligence Insight Card */}
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 1.0, ease: "easeOut" }}
                            style={{
                              background: 'radial-gradient(120% 120% at 0% 0%, rgba(56, 182, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
                              border: '1px solid rgba(56, 182, 255, 0.25)',
                              borderRadius: '16px',
                              padding: '1.1rem 1.3rem',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '0.4rem',
                              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)',
                              backdropFilter: 'blur(10px)',
                              WebkitBackdropFilter: 'blur(10px)'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <span style={{ fontSize: '1.1rem' }}>📈</span>
                              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#38B6FF', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                                Insight Detected
                              </span>
                            </div>
                            <p style={{ margin: 0, fontSize: '0.92rem', color: '#ffffff', lineHeight: 1.45, fontWeight: 300 }}>
                              “High engagement from final-year students exploring graduate employment discussions.”
                            </p>
                          </motion.div>
                        </>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}

            {(step === 4 || step === 5 || step === 6) && (
              <motion.div
                key="health-gamification"
                style={{
                  position: 'absolute',
                  right: '6%',
                  top: '46%',
                  width: '560px',
                  height: '730px',
                  pointerEvents: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.2rem',
                  zIndex: 110
                }}
                initial={{ opacity: 0, x: 30, y: '-50%' }}
                animate={{ opacity: 1, x: 0, y: '-50%' }}
                exit={{ opacity: 0, x: 30, y: '-50%', transition: { duration: 0.8 } }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                {/* Persistent Headline */}
                <h1 className="cinematic-text primary" style={{ fontSize: '2.8rem', fontWeight: 600, textAlign: 'left', margin: 0, lineHeight: 1.2, color: '#ffffff' }}>
                  {step === 4 && "Competition creates daily engagement."}
                  {step === 5 && "Better behaviour unlocks better outcomes."}
                  {step === 6 && "Health engagement becomes long-term loyalty."}
                </h1>

                {/* Supporting description */}
                <p style={{
                  fontSize: '1.2rem',
                  lineHeight: 1.5,
                  color: 'rgba(255, 255, 255, 0.7)',
                  margin: 0,
                  fontWeight: 300
                }}>
                  {step === 4 && "Students stay active because progress feels visible, social, and rewarding."}
                  {step === 5 && "Healthy activity contributes to a personalised health score and benefit progression system."}
                  {step === 6 && "Students who build healthier habits can unlock advantages when transitioning to OVHC."}
                </p>

                {/* Spotlight area for cards */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: step === 4 ? '460px' : step === 5 ? '320px' : '180px',
                  marginTop: '0.5rem',
                  perspective: 1000,
                  transition: 'height 0.8s ease-in-out'
                }}>
                  {/* Phase 1 Cards */}
                  
                  {/* 1. Group Challenge (Step Battle) Card */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: '50px',
                      width: '460px',
                      pointerEvents: 'none'
                    }}
                    initial={{ opacity: 0, scale: 0.8, x: 0, y: 0 }}
                    animate={
                      step === 4
                        ? { opacity: 1, scale: 1, x: 0, y: 0, zIndex: 3 }
                        : { opacity: 0, scale: 0.7, x: -60, y: -60, zIndex: 0 }
                    }
                    transition={{ duration: 1.0, ease: 'easeInOut' }}
                  >
                    <GroupChallenge />
                  </motion.div>

                  {/* 2. Personal Contribution (Weekly Step Progress) Card */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: '50px',
                      width: '460px',
                      pointerEvents: 'none'
                    }}
                    initial={{ opacity: 0, scale: 0.8, x: 0, y: 0 }}
                    animate={
                      step === 4
                        ? { opacity: 0.9, scale: 1, x: 0, y: 330, zIndex: 2 }
                        : { opacity: 0, scale: 0.7, x: -60, y: -60, zIndex: 0 }
                    }
                    transition={{ duration: 1.0, ease: 'easeInOut' }}
                  >
                    <PersonalContrib />
                  </motion.div>

                  {/* Floating micro-moment achievement snippets */}
                  <AnimatePresence>
                    {step === 4 && (
                      <>
                        <motion.div
                          key="snippet1"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 0.7, y: -20 }}
                          exit={{ opacity: 0 }}
                          transition={{ repeat: Infinity, repeatType: "reverse", duration: 4, delay: 0.5 }}
                          style={{ position: 'absolute', top: '10px', left: '-40px', color: '#10B981', fontSize: '0.85rem', fontWeight: 600, background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '4px 10px', borderRadius: '12px', backdropFilter: 'blur(4px)', zIndex: 10 }}
                        >
                          ↑ Climbed 2 ranks today
                        </motion.div>
                        <motion.div
                          key="snippet2"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 0.7, y: -15 }}
                          exit={{ opacity: 0 }}
                          transition={{ repeat: Infinity, repeatType: "reverse", duration: 5, delay: 1.5 }}
                          style={{ position: 'absolute', top: '220px', left: '-60px', color: '#FBBF24', fontSize: '0.85rem', fontWeight: 600, background: 'rgba(251, 191, 36, 0.08)', border: '1px solid rgba(251, 191, 36, 0.2)', padding: '4px 10px', borderRadius: '12px', backdropFilter: 'blur(4px)', zIndex: 10 }}
                        >
                          300 steps away from top 5
                        </motion.div>
                        <motion.div
                          key="snippet3"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 0.7, y: -25 }}
                          exit={{ opacity: 0 }}
                          transition={{ repeat: Infinity, repeatType: "reverse", duration: 4.5, delay: 2 }}
                          style={{ position: 'absolute', top: '40px', right: '-40px', color: '#38B6FF', fontSize: '0.85rem', fontWeight: 600, background: 'rgba(56, 182, 255, 0.08)', border: '1px solid rgba(56, 182, 255, 0.2)', padding: '4px 10px', borderRadius: '12px', backdropFilter: 'blur(4px)', zIndex: 10 }}
                        >
                          RMIT leading this week
                        </motion.div>
                        <motion.div
                          key="snippet4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 0.7, y: -10 }}
                          exit={{ opacity: 0 }}
                          transition={{ repeat: Infinity, repeatType: "reverse", duration: 4.8, delay: 1.0 }}
                          style={{ position: 'absolute', top: '180px', right: '-50px', color: '#10B981', fontSize: '0.85rem', fontWeight: 600, background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '4px 10px', borderRadius: '12px', backdropFilter: 'blur(4px)', zIndex: 10 }}
                        >
                          Top 15% this week
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>

                  {/* Phase 2 Card: Health Score (Gold Tier) */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: '50px',
                      width: '460px',
                      pointerEvents: 'none'
                    }}
                    initial={{ opacity: 0, scale: 0.8, x: 0, y: 40 }}
                    animate={
                      step === 5
                        ? { 
                            opacity: 1, 
                            scale: 1.05, 
                            x: 0, 
                            y: 100, 
                            zIndex: 5, 
                            boxShadow: '0 20px 50px rgba(251, 191, 36, 0.15)',
                            filter: 'drop-shadow(0 0 20px rgba(251, 191, 36, 0.2))' 
                          }
                        : { opacity: 0, scale: 0.75, x: 0, y: -50, zIndex: 0 }
                    }
                    transition={{ duration: 1.0, ease: 'easeInOut' }}
                  >
                    <HealthImpactCard navigate={() => {}} />
                  </motion.div>

                  {/* Phase 3 Card: Reduce Cover Cost */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: '50px',
                      width: '460px',
                      pointerEvents: 'none'
                    }}
                    initial={{ opacity: 0, scale: 0.8, x: 0, y: 120 }}
                    animate={
                      step === 6
                        ? { 
                            opacity: 1, 
                            scale: 1.05, 
                            x: 0, 
                            y: 60, 
                            zIndex: 5, 
                            boxShadow: '0 20px 50px rgba(239, 68, 68, 0.15)',
                            filter: 'drop-shadow(0 0 20px rgba(239, 68, 68, 0.2))'
                          }
                        : { opacity: 0, scale: 0.8, x: 0, y: 120, zIndex: 0 }
                    }
                    transition={{ duration: 1.0, ease: 'easeInOut' }}
                  >
                    <ReduceCostCard navigate={() => {}} />
                  </motion.div>
                </div>

                {/* Phase 3: Strategic Flow Diagram */}
                <AnimatePresence>
                  {step === 6 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                      style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        gap: '0.4rem',
                        marginTop: '0.5rem'
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', width: '100%', maxWidth: '460px' }}>
                        {/* Step 1 */}
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6, duration: 0.5 }}
                          style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '0.5rem 1rem', width: '100%' }}
                        >
                          <span style={{ fontSize: '1.1rem' }}>🏃🏽‍♂️</span>
                          <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'rgba(255,255,255,0.9)' }}>Daily activity</span>
                        </motion.div>

                        {/* Arrow 1 */}
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.4 }}
                          transition={{ delay: 0.9, duration: 0.3 }}
                          style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', height: '10px', display: 'flex', alignItems: 'center' }}
                        >
                          ↓
                        </motion.div>

                        {/* Step 2 */}
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1.1, duration: 0.5 }}
                          style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: 'rgba(16, 185, 129, 0.03)', border: '1px solid rgba(16, 185, 129, 0.12)', borderRadius: '12px', padding: '0.5rem 1rem', width: '100%' }}
                        >
                          <span style={{ fontSize: '1.1rem' }}>⚡</span>
                          <span style={{ fontSize: '0.9rem', fontWeight: 500, color: '#10B981' }}>Health engagement</span>
                        </motion.div>

                        {/* Arrow 2 */}
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.4 }}
                          transition={{ delay: 1.4, duration: 0.3 }}
                          style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', height: '10px', display: 'flex', alignItems: 'center' }}
                        >
                          ↓
                        </motion.div>

                        {/* Step 3 */}
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1.6, duration: 0.5 }}
                          style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: 'rgba(56, 182, 255, 0.03)', border: '1px solid rgba(56, 182, 255, 0.12)', borderRadius: '12px', padding: '0.5rem 1rem', width: '100%' }}
                        >
                          <span style={{ fontSize: '1.1rem' }}>🤝</span>
                          <span style={{ fontSize: '0.9rem', fontWeight: 500, color: '#38B6FF' }}>Trust & loyalty</span>
                        </motion.div>

                        {/* Arrow 3 */}
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.4 }}
                          transition={{ delay: 1.9, duration: 0.3 }}
                          style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', height: '10px', display: 'flex', alignItems: 'center' }}
                        >
                          ↓
                        </motion.div>

                        {/* Step 4 */}
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 2.1, duration: 0.5 }}
                          style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '12px', padding: '0.5rem 1rem', width: '100%', boxShadow: '0 4px 20px rgba(239, 68, 68, 0.1)' }}
                        >
                          <span style={{ fontSize: '1.1rem' }}>🛡️</span>
                          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#EF4444' }}>OVHC conversion potential</span>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {(step === 7 || step === 8 || step === 9 || step === 10) && (
              <motion.div
                key="ovhc-transition-story"
                style={{
                  position: 'absolute',
                  right: '6%',
                  top: '46%',
                  width: '560px',
                  height: '730px',
                  pointerEvents: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.2rem',
                  zIndex: 110
                }}
                initial={{ opacity: 0, x: 30, y: '-50%' }}
                animate={{ opacity: 1, x: 0, y: '-50%' }}
                exit={{ opacity: 0, x: 30, y: '-50%', transition: { duration: 0.8 } }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                <AnimatePresence mode="wait">
                  {step === 7 && (
                    <motion.div
                      key="step7"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.6 }}
                      style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', width: '100%' }}
                    >
                      {/* Intro Text Sequence */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', width: '100%' }}>
                        {/* Sentence 1 */}
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 0.65, y: 0 }}
                          transition={{ delay: 0.5, duration: 1.0 }}
                          style={{
                            margin: 0,
                            fontSize: '1.6rem',
                            fontWeight: 300,
                            color: '#ffffff',
                            letterSpacing: '-0.01em'
                          }}
                        >
                          When students transition…
                        </motion.p>
                        
                        {/* Sentence 2 */}
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.8, duration: 1.0 }}
                          style={{
                            margin: 0,
                            fontSize: '2.5rem',
                            fontWeight: 500,
                            color: '#ffffff',
                            letterSpacing: '-0.02em',
                            textShadow: '0 0 35px rgba(255, 255, 255, 0.4)'
                          }}
                        >
                          They shouldn’t have to start over.
                        </motion.p>
                      </div>

                      {/* Main Content Area */}
                      <motion.div
                        style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', width: '100%' }}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 3.2, duration: 1.0 }}
                      >
                        {/* Headline */}
                        <h1 className="cinematic-text primary" style={{ fontSize: '2.8rem', fontWeight: 600, textAlign: 'left', margin: 0, lineHeight: 1.2, color: '#ffffff' }}>
                          Your journey already has value.
                        </h1>

                        {/* Supporting Description */}
                        <p style={{
                          fontSize: '1.2rem',
                          lineHeight: 1.5,
                          color: 'rgba(255, 255, 255, 0.7)',
                          margin: 0,
                          fontWeight: 300
                        }}>
                          Activity, engagement, and loyalty continue into the next stage of cover.
                        </p>

                        {/* Spotlight Area */}
                        <div style={{
                          position: 'relative',
                          width: '100%',
                          height: '380px',
                          marginTop: '0.5rem',
                          perspective: 1000
                        }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', width: '460px', paddingLeft: '50px' }}>
                            <motion.div
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 3.5, duration: 0.6 }}
                            >
                              <OvhcKeepRewards />
                            </motion.div>
                            
                            <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
                              <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 3.8, duration: 0.6 }}
                                style={{ flex: 1 }}
                              >
                                <OvhcHealthScore />
                              </motion.div>
                              <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 4.0, duration: 0.6 }}
                                style={{ flex: 1 }}
                              >
                                <OvhcRewardPoints />
                              </motion.div>
                            </div>

                            <motion.div
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ 
                                opacity: 1, 
                                y: 0,
                                boxShadow: [
                                  '0 4px 12px rgba(0,0,0,0.02)',
                                  '0 4px 20px rgba(16, 185, 129, 0.25)',
                                  '0 4px 12px rgba(0,0,0,0.02)'
                                ]
                              }}
                              transition={{ 
                                delay: 4.3, 
                                duration: 1.2,
                                boxShadow: { delay: 5.5, repeat: Infinity, duration: 3, repeatType: 'reverse' }
                              }}
                            >
                              <OvhcAdvantage />
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}

                  {step === 8 && (
                    <motion.div
                      key="step8"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.6 }}
                      style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', width: '100%' }}
                    >
                      <h1 className="cinematic-text primary" style={{ fontSize: '2.8rem', fontWeight: 600, textAlign: 'left', margin: 0, lineHeight: 1.2, color: '#ffffff' }}>
                        The system already knows what fits.
                      </h1>
                      <p style={{
                        fontSize: '1.2rem',
                        lineHeight: 1.5,
                        color: 'rgba(255, 255, 255, 0.7)',
                        margin: 0,
                        fontWeight: 300
                      }}>
                        Plans are personalised using existing cover, engagement, and health activity.
                      </p>

                      <div style={{
                        position: 'relative',
                        width: '100%',
                        height: '440px',
                        marginTop: '0.5rem',
                        perspective: 1000
                      }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', width: '460px', paddingLeft: '50px' }}>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                          >
                            <RecommendedPlanCard hasGlow={true} />
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                          >
                            <div className="value-box keep" style={{ width: '100%', margin: 0 }}>
                              <h3 className="value-box-title">What you keep if you stay</h3>
                              <ul className="value-list" style={{ margin: 0, paddingLeft: 0, listStyle: 'none' }}>
                                <motion.li 
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.9, duration: 0.4 }}
                                  style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}
                                >
                                  <Star size={16} className="val-icon gold" /> 
                                  <span>2,400 Rewards points carried forward</span>
                                  <motion.span 
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1.2, type: 'spring' }}
                                    style={{ color: '#10b981', fontSize: '0.8rem', fontWeight: 600, marginLeft: 'auto' }}
                                  >
                                    ✓ Retained
                                  </motion.span>
                                </motion.li>

                                <motion.li 
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 1.4, duration: 0.4 }}
                                  style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}
                                >
                                  <Award size={16} className="val-icon blue" /> 
                                  <span>Active Gold Tier status & member history</span>
                                  <motion.span 
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1.7, type: 'spring' }}
                                    style={{ color: '#10b981', fontSize: '0.8rem', fontWeight: 600, marginLeft: 'auto' }}
                                  >
                                    ✓ Active
                                  </motion.span>
                                </motion.li>

                                <motion.li 
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 1.9, duration: 0.4 }}
                                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                                >
                                  <HeartPulse size={16} className="val-icon red" /> 
                                  <span>Accrued health score and activity metrics</span>
                                  <motion.span 
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 2.2, type: 'spring' }}
                                    style={{ color: '#10b981', fontSize: '0.8rem', fontWeight: 600, marginLeft: 'auto' }}
                                  >
                                    ✓ Carried over
                                  </motion.span>
                                </motion.li>
                              </ul>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 9 && (
                    <motion.div
                      key="step9"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.6 }}
                      style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', width: '100%' }}
                    >
                      <h1 className="cinematic-text primary" style={{ fontSize: '2.8rem', fontWeight: 600, textAlign: 'left', margin: 0, lineHeight: 1.2, color: '#ffffff' }}>
                        No forms. No restart. No friction.
                      </h1>
                      <p style={{
                        fontSize: '1.2rem',
                        lineHeight: 1.5,
                        color: 'rgba(255, 255, 255, 0.7)',
                        margin: 0,
                        fontWeight: 300
                      }}>
                        Personal details, payment methods, and cover continuity are already carried forward.
                      </p>

                      <div style={{
                        position: 'relative',
                        width: '100%',
                        height: '460px',
                        marginTop: '0.5rem',
                        perspective: 1000
                      }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '460px', paddingLeft: '50px' }}>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                          >
                            <OvhcSummaryCard dental={true} mental={false} />
                          </motion.div>
                          
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                          >
                            <OvhcPersonalDetailsCard hasCheckmark={true} />
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                          >
                            <OvhcPaymentMethodCard hasCheckmark={true} />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 10 && (
                    <motion.div
                      key="step10"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.6 }}
                      style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', width: '100%' }}
                    >
                      <h1 className="cinematic-text primary" style={{ fontSize: '2.8rem', fontWeight: 600, textAlign: 'left', margin: 0, lineHeight: 1.2, color: '#ffffff' }}>
                        Support evolves into long-term loyalty.
                      </h1>
                      <p style={{
                        fontSize: '1.2rem',
                        lineHeight: 1.5,
                        color: 'rgba(255, 255, 255, 0.7)',
                        margin: 0,
                        fontWeight: 300
                      }}>
                        What begins as OSHC becomes an ongoing health relationship.
                      </p>

                      <div style={{
                        position: 'relative',
                        width: '100%',
                        height: '440px',
                        marginTop: '0.5rem',
                        perspective: 1000
                      }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', width: '460px', paddingLeft: '50px' }}>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                          >
                            <OvhcSuccessDetailsCard />
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ 
                              opacity: 1, 
                              y: 0,
                              boxShadow: [
                                '0 12px 40px rgba(0,0,0,0.12)',
                                '0 12px 45px rgba(255, 77, 106, 0.15)',
                                '0 12px 40px rgba(0,0,0,0.12)'
                              ]
                            }}
                            transition={{ 
                              delay: 0.4, 
                              duration: 0.8,
                              boxShadow: { repeat: Infinity, duration: 4, repeatType: 'reverse' }
                            }}
                            style={{ borderRadius: '16px', overflow: 'hidden' }}
                          >
                            <MemoryRouter>
                              <PremiumReferralCard variant="compact" />
                            </MemoryRouter>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {step === 11 && (
              <motion.div
                key="signals-transition-scene"
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none',
                  zIndex: 90
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 1 } }}
                transition={{ duration: 1.5 }}
              >
                {/* Right Side Narrative block */}
                <motion.div 
                  animate={{
                    opacity: transitionPhase >= 2 ? 0 : 1,
                    scale: transitionPhase >= 2 ? 0.95 : 1,
                    y: transitionPhase >= 2 ? -20 : 0
                  }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  style={{
                    position: 'absolute',
                    right: '8%',
                    top: '10%',
                    width: '560px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    pointerEvents: 'auto',
                    zIndex: 10
                  }}
                >
                  <motion.h1 
                    className="cinematic-text primary" 
                    style={{ fontSize: '2.5rem', fontWeight: 600, textAlign: 'left', margin: 0, lineHeight: 1.2, color: '#ffffff' }}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2 }}
                  >
                    Every interaction tells a story.
                  </motion.h1>
                  
                  <motion.p 
                    style={{
                      fontSize: '1.15rem',
                      lineHeight: 1.6,
                      color: 'rgba(255, 255, 255, 0.7)',
                      margin: 0,
                      fontWeight: 300
                    }}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 1.2 }}
                  >
                    Behind the Companion App is a connected intelligence system helping Medibank understand engagement, intent, risk, and transition readiness.
                  </motion.p>
                </motion.div>

                <AnimatePresence>
                  {transitionPhase === 6 && (
                    <motion.div
                      initial={{ opacity: 0, y: -20, x: '-50%' }}
                      animate={{ opacity: 1, y: 0, x: '-50%' }}
                      exit={{ opacity: 0, y: -20, x: '-50%' }}
                      transition={{ duration: 1.0, ease: "easeOut" }}
                      style={{
                        position: 'absolute',
                        top: '4%',
                        left: '50%',
                        textAlign: 'center',
                        zIndex: 25,
                        pointerEvents: 'none'
                      }}
                    >
                      <h2 style={{
                        fontSize: '2.5rem',
                        fontWeight: 600,
                        color: '#ffffff',
                        margin: 0,
                        letterSpacing: '-0.02em',
                        textShadow: '0 4px 20px rgba(0,0,0,0.5)'
                      }}>
                        Introducing Conversion Engine
                      </h2>
                    </motion.div>
                  )}
                </AnimatePresence>

                <SignalParticles transitionPhase={transitionPhase} />
              </motion.div>
            )}

            {step >= 12 && step <= 18 && (
              <motion.div 
                key={`text-agent-reveal-header-${step}`} 
                style={{ 
                  position: 'absolute', 
                  top: '4%', 
                  left: '50%', 
                  width: '90%', 
                  maxWidth: '850px', 
                  pointerEvents: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.6rem',
                  zIndex: 100
                }}
                initial={{ opacity: 0, y: -20, x: '-50%' }} 
                animate={{ opacity: 1, y: 0, x: '-50%' }} 
                exit={{ opacity: 0, y: -20, x: '-50%', transition: { duration: 0.4 } }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h1 className="cinematic-text primary" style={{ fontSize: '2.5rem', fontWeight: 600, textAlign: 'center', margin: 0, color: '#ffffff', letterSpacing: '-0.02em' }}>
                  {step === 12 ? "Powered by a Collaborative Agent Ecosystem" :
                   step === 13 ? "1. Real-time Student Signals Detected" :
                   step === 14 ? "2. Cohort Detected & Synthesised" :
                   step === 15 ? "3. Intelligence Layer Interprets Cohort" :
                   step === 16 ? "4. Recommended Campaign Formulated" :
                   step === 17 ? "5. Actionable Recommendation Prepared" :
                   step === 18 ? "6. Human Review & Execution" :
                   "Signal Journey Complete"}
                </h1>
                
                <p style={{
                  fontSize: '1.25rem',
                  lineHeight: 1.5,
                  color: 'rgba(255, 255, 255, 0.7)',
                  margin: '0.2rem 0 0 0',
                  fontWeight: 300,
                  textAlign: 'center',
                  maxWidth: '750px'
                }}>
                  {step === 12 ? "Specialised agents detect signals, interpret behaviour, and prepare recommendations for human review." :
                   step === 13 ? "Multiple touchpoints (webinars, pricing, community posts) emit behavioral signals that converge into a unified stream." :
                   step === 14 ? "The Segmentation Agent monitors incoming signals and groups students into a high-opportunity Graduate Transition Cohort." :
                   step === 15 ? "The Intelligence Layer activates to interpret patterns, predict stay intent, and estimate conversion readiness." :
                   step === 16 ? "The Campaign Agent matches channels (In-App + WhatsApp) and schedules optimal nudge timings." :
                   step === 17 ? "The Insight Narrator Agent synthesises the agents' logic and packages a structured brief for approval." :
                   step === 18 ? "The collaborative output is compiled into a single intervention card for human approval." :
                   "Human operators maintain ultimate control, reviewing and launching the automated sequence."}
                </p>
              </motion.div>
            )}
            {((step === 12 && agentPhase === 4) || step >= 13) && (
              <motion.div
                key="agent-ecosystem-flow-line"
                style={{
                  position: 'absolute',
                  bottom: '8%',
                  left: '50%',
                  marginLeft: '-250px',
                  width: '500px',
                  zIndex: 100,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.4rem',
                  pointerEvents: 'none'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  color: 'rgba(255, 255, 255, 0.35)',
                  textTransform: 'uppercase',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  padding: '6px 18px',
                  borderRadius: '20px',
                  backdropFilter: 'blur(5px)'
                }}>
                  <span>Detection</span>
                  <span style={{ color: '#38B6FF' }}>➔</span>
                  <span>Intelligence</span>
                  <span style={{ color: '#8B5CF6' }}>➔</span>
                  <span>Orchestration</span>
                  <span style={{ color: '#FF4D6A' }}>➔</span>
                  <span style={{ color: '#ffffff', opacity: 0.8 }}>Human Review</span>
                </div>
              </motion.div>
            )}

            {/* Removed old text blocks to prevent overlap */}

          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
