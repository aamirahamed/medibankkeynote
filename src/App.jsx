import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Scene1 from './components/Scene1';
import Scene2 from './components/Scene2';
import FlywheelScene from './components/FlywheelScene';
import ThankYouScene from './components/ThankYouScene';
import IntelligenceEcosystemScene from './components/IntelligenceEcosystemScene';
import EngagementFlywheelsScene from './components/EngagementFlywheelsScene';
import GatewayScene from './components/GatewayScene';
import './index.css';
import './App.css';

function App() {
  // globalStep controls the entire pacing of the keynote.
  // We start at 0 (blank dark screen)
  const [globalStep, setGlobalStep] = useState(0);

  // Audio Background Music State & Ref
  const [audioTrigger, setAudioTrigger] = useState(false);
  const audioRef = useRef(null);
  const fadeIntervalRef = useRef(null);

  // Initialize audio file
  useEffect(() => {
    // Background Music.m4a (encoded properly for spaces)
    const audio = new Audio('/Background Music.m4a');
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Helper to fade audio volume to target value
  const fadeVolume = useCallback((targetVolume, durationMs, onComplete) => {
    if (!audioRef.current) return;
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    const startVolume = audioRef.current.volume;
    const steps = 30;
    const stepTime = durationMs / steps;
    const volumeChangePerStep = (targetVolume - startVolume) / steps;
    let currentStep = 0;

    fadeIntervalRef.current = setInterval(() => {
      currentStep++;
      let newVolume = startVolume + volumeChangePerStep * currentStep;

      // Clamp volume
      if (newVolume < 0) newVolume = 0;
      if (newVolume > 1) newVolume = 1;

      audioRef.current.volume = newVolume;

      if (currentStep >= steps) {
        clearInterval(fadeIntervalRef.current);
        audioRef.current.volume = targetVolume;
        if (onComplete) onComplete();
      }
    }, stepTime);
  }, []);

  // Sync music playback with global steps and glowing animation
  useEffect(() => {
    let fadeOutTimer;
    if (globalStep === 7 || globalStep === 8) {
      if (audioRef.current && (audioTrigger || globalStep === 8)) {
        if (audioRef.current.paused) {
          audioRef.current.play().then(() => {
            fadeVolume(0.18, 2000); // Gentle background volume
          }).catch(err => {
            console.warn("Autoplay blocked by browser policy:", err);
          });
        } else {
          fadeVolume(0.18, 2000);
        }
      }
    } else if (globalStep === 9) {
      // Fade out 4 seconds after landing on step 9
      fadeOutTimer = setTimeout(() => {
        fadeVolume(0, 3000, () => {
          if (audioRef.current) {
            audioRef.current.pause();
          }
        });
      }, 4000);
    } else {
      // Any other step: fade out and pause
      if (audioRef.current && !audioRef.current.paused) {
        fadeVolume(0, 1000, () => {
          if (audioRef.current) {
            audioRef.current.pause();
          }
          if (globalStep < 7) {
            setAudioTrigger(false);
          }
        });
      } else if (globalStep < 7) {
        setAudioTrigger(false);
      }
    }

    return () => {
      if (fadeOutTimer) clearTimeout(fadeOutTimer);
    };
  }, [globalStep, audioTrigger, fadeVolume]);

  // Audio Admin Music State & Ref
  const adminAudioRef = useRef(null);
  const adminFadeIntervalRef = useRef(null);

  // Initialize admin audio file
  useEffect(() => {
    const audio = new Audio('/admin.mp3');
    audio.loop = true;
    audio.volume = 0;
    adminAudioRef.current = audio;

    return () => {
      if (adminFadeIntervalRef.current) clearInterval(adminFadeIntervalRef.current);
      if (adminAudioRef.current) {
        adminAudioRef.current.pause();
      }
    };
  }, []);

  // Helper to fade admin audio volume to target value
  const fadeAdminVolume = useCallback((targetVolume, durationMs, onComplete) => {
    if (!adminAudioRef.current) return;
    if (adminFadeIntervalRef.current) clearInterval(adminFadeIntervalRef.current);

    const startVolume = adminAudioRef.current.volume;
    const steps = 30;
    const stepTime = durationMs / steps;
    const volumeChangePerStep = (targetVolume - startVolume) / steps;
    let currentStep = 0;

    adminFadeIntervalRef.current = setInterval(() => {
      currentStep++;
      let newVolume = startVolume + volumeChangePerStep * currentStep;

      // Clamp volume
      if (newVolume < 0) newVolume = 0;
      if (newVolume > 1) newVolume = 1;

      adminAudioRef.current.volume = newVolume;

      if (currentStep >= steps) {
        clearInterval(adminFadeIntervalRef.current);
        adminAudioRef.current.volume = targetVolume;
        if (onComplete) onComplete();
      }
    }, stepTime);
  }, []);

  // Sync admin music with global step 20 timeline
  useEffect(() => {
    let playTimer;
    let fadeOutTimer;

    if (globalStep === 20) {
      // Play & Fade in after 13 seconds (when conversion engine chip appears)
      playTimer = setTimeout(() => {
        if (adminAudioRef.current) {
          adminAudioRef.current.play().then(() => {
            fadeAdminVolume(0.15, 2000); // Keep volume low
          }).catch(err => {
            console.warn("Admin audio autoplay blocked:", err);
          });
        }
      }, 13000);

      // Fade out & Pause 3 seconds after laptop UI appears (18.5s + 3s = 21.5s)
      fadeOutTimer = setTimeout(() => {
        fadeAdminVolume(0, 3000, () => {
          if (adminAudioRef.current) {
            adminAudioRef.current.pause();
          }
        });
      }, 21500);
    } else {
      // If we leave step 20, fade out immediately (1s duration) and pause
      if (adminAudioRef.current && !adminAudioRef.current.paused) {
        fadeAdminVolume(0, 1000, () => {
          if (adminAudioRef.current) {
            adminAudioRef.current.pause();
          }
        });
      }
    }

    return () => {
      if (playTimer) clearTimeout(playTimer);
      if (fadeOutTimer) clearTimeout(fadeOutTimer);
    };
  }, [globalStep, fadeAdminVolume]);

  const advanceStep = useCallback(() => {
    setGlobalStep(prev => {
      if (prev === 2) return 4;
      if (prev === 26) return 28;
      if (prev === 28) return 30;
      return prev < 33 ? prev + 1 : prev;
    });
  }, []);

  const reverseStep = useCallback(() => {
    setGlobalStep(prev => {
      if (prev === 4) return 2;
      if (prev === 28) return 26;
      if (prev === 30) return 28;
      return prev > 0 ? prev - 1 : prev;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ' ' || e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault(); // Prevent page scroll on spacebar
        advanceStep();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        reverseStep();
      }
    };

    const handleClick = (e) => {
      if (!e.isTrusted) return;
      advanceStep();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleClick);
    };
  }, [advanceStep, reverseStep]);

  // Lock window scroll to 0,0 to prevent automatic browser scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY !== 0 || window.scrollX !== 0) {
        window.scrollTo(0, 0);
      }
    };
    window.scrollTo(0, 0);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Scene1 globalStep={globalStep} onCompanionGlow={() => setAudioTrigger(true)} />
      
      <AnimatePresence>
        {globalStep >= 9 && globalStep < 30 && globalStep !== 28 && (
          <motion.div
            key="scene2-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            style={{ position: 'fixed', width: '100vw', height: '100vh', top: 0, left: 0, zIndex: 5 }}
          >
            <Scene2 globalStep={globalStep} />
          </motion.div>
        )}
        {globalStep === 28 && (
          <motion.div
            key="gateway-scene-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{ position: 'fixed', width: '100vw', height: '100vh', top: 0, left: 0, zIndex: 10 }}
          >
            <GatewayScene />
          </motion.div>
        )}
        {globalStep === 30 && (
          <motion.div
            key="flywheel-scene-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{ position: 'fixed', width: '100vw', height: '100vh', top: 0, left: 0, zIndex: 10 }}
          >
            <FlywheelScene />
          </motion.div>
        )}
        {globalStep === 31 && (
          <motion.div
            key="thank-you-scene-container"
            className="thank-you-scene-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ position: 'fixed', width: '100vw', height: '100vh', top: 0, left: 0, zIndex: 15 }}
          >
            <ThankYouScene />
          </motion.div>
        )}

        {globalStep === 32 && (
          <motion.div
            key="intelligence-ecosystem-scene"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ position: 'fixed', width: '100vw', height: '100vh', top: 0, left: 0, zIndex: 15 }}
          >
            <IntelligenceEcosystemScene />
          </motion.div>
        )}

        {globalStep === 33 && (
          <motion.div
            key="engagement-flywheels-scene"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ position: 'fixed', width: '100vw', height: '100vh', top: 0, left: 0, zIndex: 15 }}
          >
            <EngagementFlywheelsScene />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Debug UI for development (can be disabled later) */}
      <div style={{ position: 'fixed', bottom: 10, right: 10, color: 'rgba(255,255,255,0.2)', fontSize: '12px', zIndex: 100 }}>
        Step: {globalStep} | Press Space/Click to advance
      </div>
    </>
  );
}

export default App;
