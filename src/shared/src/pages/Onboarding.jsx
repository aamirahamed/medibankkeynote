import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onboardingData } from '../data/onboardingData';
import logo from '../assets/medibank-logo.png';
import './Onboarding.css';

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [animate, setAnimate] = useState(true);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrigger entrance animations on step change
    setAnimate(false);
    const timer = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(timer);
  }, [currentStep]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    if (touchStartX.current - touchEndX.current > 50) {
      if (currentStep < onboardingData.length - 1) {
        setCurrentStep(prev => prev + 1);
      }
    }

    if (touchStartX.current - touchEndX.current < -50) {
      if (currentStep > 0) {
        setCurrentStep(prev => prev - 1);
      }
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const handleComplete = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    navigate('/', { replace: true });
  };

  const activeData = onboardingData[currentStep];

  return (
    <div className={`onboarding-container ${activeData.bgClass}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}>

      <div className="onboarding-logo-container">
        <img src={logo} alt="Medibank" className="onboarding-medibank-logo" />
      </div>

      <div
        className="onboarding-slider"
        style={{ transform: `translateX(-${currentStep * 100}%)` }}
      >
        {onboardingData.map((screen) => (
          <div key={screen.id} className="onboarding-slide">

            <div className={`onboarding-content-top ${animate && currentStep === screen.id - 1 ? 'animate-enter' : ''}`}>

              {(screen.type === 'image' || screen.type === 'image-cta') && (
                <div className="onboarding-image-container premium-image-glow">
                  <img src={screen.image} alt="Onboarding illustration" className="onboarding-image premium-image" />
                </div>
              )}

              {screen.type === 'timeline' && (
                <div className="premium-timeline-container">
                  <div className="timeline-path-bg"></div>
                  {screen.stages.map((stage, idx) => (
                    <div key={idx} className={`premium-timeline-item ${stage.active ? 'active' : ''}`}>
                      <div className="timeline-dot-wrapper">
                        <div className="premium-timeline-dot">
                          {stage.active && <div className="timeline-dot-inner"></div>}
                        </div>
                        {idx < screen.stages.length - 1 && (
                          <div className={`premium-timeline-line ${stage.active ? 'active-line' : ''}`}></div>
                        )}
                      </div>
                      <div className="premium-timeline-card">
                        <h4>{stage.title}</h4>
                        <p>{stage.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {screen.type === 'features' && (
                <div className="premium-features-grid">
                  {screen.features.map((feature, idx) => {
                    const Icon = feature.icon;
                    return (
                      <div key={idx} className="premium-feature-card" style={{ '--card-bg': feature.bgColor }}>
                        <div className="feature-icon premium-icon" style={{ color: feature.color }}>
                          <Icon size={24} />
                        </div>
                        <div className="premium-feature-text">
                          <h4>{feature.title}</h4>
                          <p>{feature.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className={`onboarding-content-bottom ${animate && currentStep === screen.id - 1 ? 'animate-slide-up' : ''}`}>
              <h2 className="onboarding-headline">{screen.headline}</h2>
              <p className="onboarding-subtext">{screen.subtext}</p>
              {screen.supportingLine && (
                <p className="onboarding-supporting premium-supporting-text">{screen.supportingLine}</p>
              )}

              {screen.type === 'image-cta' && (
                <button className="premium-cta-btn" onClick={handleComplete}>
                  Continue
                </button>
              )}
            </div>

          </div>
        ))}
      </div>

      <div className="pagination-dots premium-dots">
        {onboardingData.map((_, idx) => (
          <div
            key={idx}
            className={`dot premium-dot ${currentStep === idx ? 'active' : ''}`}
            onClick={() => setCurrentStep(idx)}
          />
        ))}
      </div>

    </div>
  );
};

export default Onboarding;
