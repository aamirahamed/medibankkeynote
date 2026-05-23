import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, CheckCircle2, Shield, Star, 
  AlertTriangle, ArrowRight, CreditCard, 
  Clock, Award, HeartPulse, Sparkles
} from 'lucide-react';
import PremiumReferralCard from '../components/PremiumReferralCard';
import './OvhcTransition.css';

const OvhcTransition = ({ forcedStep, step }) => {
  const navigate = useNavigate();
  const [localStep, setLocalStep] = useState(1);
  const currentStep = forcedStep || localStep;
  const setStep = setLocalStep;
  const [loading, setLoading] = useState(false);

  // Add-on state
  const [addons, setAddons] = useState({ dental: true, mental: false });

  const toggleAddon = (key) => setAddons(prev => ({ ...prev, [key]: !prev[key] }));

  const handleActivate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3); // Go to confirmation
    }, 1500);
  };

  const renderStep1 = () => {
    const isStep14 = false; // Disable step-specific highlighted styling for keynote flow
    const isKeynoteFlow = step >= 13 && step <= 19;
    return (
    <div className="transition-step fade-in">
      <div className="transition-header" style={isStep14 ? { opacity: 0.3, filter: 'blur(1px)', transition: 'all 0.5s ease' } : { transition: 'all 0.5s ease' }}>
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <div className="transition-progress">
          <div className="progress-dot active" />
          <div className="progress-dot" />
        </div>
      </div>

      <div className="transition-content">
        <div className="title-block" style={isStep14 ? { opacity: 0.3, filter: 'blur(1px)', transition: 'all 0.5s ease' } : { transition: 'all 0.5s ease' }}>
          <h1 className="main-title">Your recommended plan</h1>
          <p className="main-sub">This plan is tailored based on your current cover and activity.</p>
        </div>

        {/* Hero Plan Card */}
        <div 
          className={`recommended-plan-card ${isKeynoteFlow ? 'keynote-breath' : ''}`}
          style={{ transition: 'all 0.5s ease' }}
        >
          <div className="plan-badge">Best Match</div>
          <h2 className="plan-name">Graduate Premium OVHC</h2>
          <div className="plan-price">
            <span className="price-val">$85</span>
            <span className="price-period">/month</span>
          </div>
          <p className="plan-advantage-msg">
            <Sparkles size={14} className="sparkle-icon" /> Your activity unlocks a $18/month advantage.
          </p>
          <ul className="plan-benefits-list">
            <li><CheckCircle2 size={16} className="benefit-icon" /> Full hospital cover & ambulance</li>
            <li><CheckCircle2 size={16} className="benefit-icon" /> 100% Medicare benefit schedule</li>
            <li><CheckCircle2 size={16} className="benefit-icon" /> No waiting period reset</li>
          </ul>
        </div>

        {/* Value Reinforcement */}
        <div className="value-reinforcement">
          <div 
            className="value-box keep"
            style={isStep14 ? {
              transition: 'all 0.5s ease',
              boxShadow: '0 0 20px 4px rgba(59, 130, 246, 0.5)',
              border: '1px solid rgba(59, 130, 246, 0.8)',
              transform: 'scale(1.02)'
            } : { transition: 'all 0.5s ease' }}
          >
            <h3 className="value-box-title">What you keep if you stay</h3>
            <ul className="value-list">
              <li><Star size={16} className="val-icon gold" /> 2,400 Rewards points carried forward</li>
              <li><Award size={16} className="val-icon blue" /> Gold Tier status maintained</li>
              <li><HeartPulse size={16} className="val-icon red" /> 78 Health score retained</li>
            </ul>
          </div>

          <div className="value-box lose" style={isStep14 ? { opacity: 0.3, filter: 'blur(1px)', transition: 'all 0.5s ease' } : { transition: 'all 0.5s ease' }}>
            <h3 className="value-box-title">What changes if you switch</h3>
            <ul className="value-list">
              <li><AlertTriangle size={16} className="val-icon grey" /> Rewards and tier reset to zero</li>
              <li><AlertTriangle size={16} className="val-icon grey" /> Lose activity-based benefits</li>
            </ul>
          </div>
        </div>

        {/* Add-ons */}
        <div className="addons-section" style={isStep14 ? { opacity: 0.3, filter: 'blur(1px)', transition: 'all 0.5s ease' } : { transition: 'all 0.5s ease' }}>
          <h3 className="section-title">Optional Add-ons</h3>
          
          <div className={`addon-card ${addons.dental ? 'selected' : ''}`} onClick={() => toggleAddon('dental')}>
            <div className="addon-info">
              <h4>Dental & Optical</h4>
              <p>Top choice for graduates</p>
            </div>
            <div className="addon-price">+$12/mo</div>
            <div className="addon-checkbox">
              {addons.dental && <CheckCircle2 size={20} className="check-icon" />}
            </div>
          </div>

          <div className={`addon-card ${addons.mental ? 'selected' : ''}`} onClick={() => toggleAddon('mental')}>
            <div className="addon-info">
              <h4>Mental Health Plus</h4>
              <p>Expanded psychology visits</p>
            </div>
            <div className="addon-price">+$8/mo</div>
            <div className="addon-checkbox">
              {addons.mental && <CheckCircle2 size={20} className="check-icon" />}
            </div>
          </div>
        </div>

      </div>

      <div className="sticky-footer" style={isStep14 ? { opacity: 0.3, filter: 'blur(1px)', transition: 'all 0.5s ease' } : { transition: 'all 0.5s ease' }}>
        <button className="primary-btn" onClick={() => setStep(2)}>
          Confirm & Activate <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

  const renderStep2 = () => (
    <div className="transition-step fade-in">
      <div className="transition-header">
        <button className="back-btn" onClick={() => setStep(1)}>
          <ArrowLeft size={24} />
        </button>
        <div className="transition-progress">
          <div className="progress-dot active" />
          <div className="progress-dot active" />
        </div>
      </div>

      <div className="transition-content">
        <div className="title-block">
          <h1 className="main-title">Confirm & Activate</h1>
          <div className="magic-fill-badge">
            <Sparkles size={14} /> We've filled everything for you
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-row">
            <span className="summary-label">Plan</span>
            <span className="summary-value">Graduate Premium OVHC</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Start Date</span>
            <span className="summary-value highlight">12 Jan 2026 (OSHC expiry)</span>
          </div>
          {addons.dental && (
             <div className="summary-row">
               <span className="summary-label">Add-on</span>
               <span className="summary-value">Dental & Optical</span>
             </div>
          )}
          {addons.mental && (
             <div className="summary-row">
               <span className="summary-label">Add-on</span>
               <span className="summary-value">Mental Health Plus</span>
             </div>
          )}
          <div className="summary-divider" />
          <div className="summary-row total">
            <span className="summary-label">Total Monthly</span>
            <span className="summary-value">${85 + (addons.dental ? 12 : 0) + (addons.mental ? 8 : 0)}</span>
          </div>
        </div>

        <div className="info-card">
          <h3 className="info-card-title">Personal Details</h3>
          <p className="info-card-text">Aamir Ahamed</p>
          <p className="info-card-text">aamir.ahamed@example.com</p>
          <button className="edit-link">Edit</button>
        </div>

        <div className="info-card">
          <h3 className="info-card-title">Payment Method</h3>
          <div className="payment-row">
            <CreditCard size={20} className="payment-icon" />
            <span className="payment-text">Visa ending in 4242</span>
          </div>
          <button className="edit-link">Edit</button>
        </div>

      </div>

      <div className="sticky-footer">
        <div className="time-indicator">
          <Clock size={14} /> Takes less than 30 seconds
        </div>
        <button className={`primary-btn ${loading ? 'loading' : ''}`} onClick={handleActivate} disabled={loading}>
          {loading ? 'Activating...' : 'Activate my cover'}
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="transition-step success-step fade-in">
      <div className="success-content">
        <div className="success-icon-wrap">
          <Shield size={48} className="success-shield" />
          <div className="success-check"><CheckCircle2 size={24} /></div>
        </div>
        
        <h1 className="success-title">You're covered!</h1>
        <p className="success-sub">Your seamless transition to Graduate Premium OVHC is confirmed.</p>

        <div className="success-details-card">
          <div className="success-detail-row">
            <span className="sd-label">Starts on</span>
            <span className="sd-value">12 Jan 2026</span>
          </div>
          <div className="success-detail-row">
            <span className="sd-label">Status</span>
            <span className="sd-value gold">Gold Member Continues</span>
          </div>
          <div className="success-detail-row">
            <span className="sd-label">Rewards</span>
            <span className="sd-value">2,400 pts carried over</span>
          </div>
        </div>
        
        <div className="success-referral-wrapper" style={{ marginTop: '24px' }}>
          <PremiumReferralCard variant="compact" />
        </div>
      </div>

      <div className="sticky-footer absolute-bottom">
        <button className="primary-btn" onClick={() => navigate('/')}>
          Go to my dashboard
        </button>
      </div>
    </div>
  );

  return (
    <div className="ovhc-transition-page">
      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
      {currentStep === 3 && renderStep3()}
    </div>
  );
};

export const RecommendedPlanCard = ({ hasGlow = false }) => (
  <div className="recommended-plan-card" style={hasGlow ? { boxShadow: '0 0 25px rgba(16, 185, 129, 0.45)', border: '1px solid rgba(16, 185, 129, 0.5)', width: '100%', margin: 0 } : { width: '100%', margin: 0 }}>
    <div className="plan-badge">Best Match</div>
    <h2 className="plan-name">Graduate Premium OVHC</h2>
    <div className="plan-price">
      <span className="price-val">$85</span>
      <span className="price-period">/month</span>
    </div>
    <p className="plan-advantage-msg">
      <Sparkles size={14} className="sparkle-icon" /> Your activity unlocks a $18/month advantage.
    </p>
    <ul className="plan-benefits-list" style={{ margin: 0, paddingLeft: 0, listStyle: 'none' }}>
      <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}><CheckCircle2 size={16} className="benefit-icon" /> Full hospital cover & ambulance</li>
      <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}><CheckCircle2 size={16} className="benefit-icon" /> 100% Medicare benefit schedule</li>
      <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} className="benefit-icon" /> No waiting period reset</li>
    </ul>
  </div>
);

export const WhatYouKeepBox = () => (
  <div className="value-box keep" style={{ width: '100%', margin: 0 }}>
    <h3 className="value-box-title">What you keep if you stay</h3>
    <ul className="value-list" style={{ margin: 0, paddingLeft: 0, listStyle: 'none' }}>
      <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}><Star size={16} className="val-icon gold" /> 2,400 Rewards points carried forward</li>
      <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}><Award size={16} className="val-icon blue" /> Gold Tier status maintained</li>
      <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><HeartPulse size={16} className="val-icon red" /> 78 Health score retained</li>
    </ul>
  </div>
);

export const OvhcSummaryCard = ({ dental = true, mental = false }) => (
  <div className="summary-card" style={{ width: '100%', margin: 0 }}>
    <div className="summary-row">
      <span className="summary-label">Plan</span>
      <span className="summary-value">Graduate Premium OVHC</span>
    </div>
    <div className="summary-row">
      <span className="summary-label">Start Date</span>
      <span className="summary-value highlight">12 Jan 2026 (OSHC expiry)</span>
    </div>
    {dental && (
       <div className="summary-row">
         <span className="summary-label">Add-on</span>
         <span className="summary-value">Dental & Optical</span>
       </div>
    )}
    {mental && (
       <div className="summary-row">
         <span className="summary-label">Add-on</span>
         <span className="summary-value">Mental Health Plus</span>
       </div>
    )}
    <div className="summary-divider" style={{ margin: '12px 0' }} />
    <div className="summary-row total">
      <span className="summary-label">Total Monthly</span>
      <span className="summary-value">${85 + (dental ? 12 : 0) + (mental ? 8 : 0)}</span>
    </div>
  </div>
);

export const OvhcPersonalDetailsCard = ({ hasCheckmark = false }) => (
  <div className="info-card" style={{ width: '100%', margin: 0, position: 'relative' }}>
    <h3 className="info-card-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span>Personal Details</span>
      {hasCheckmark && <CheckCircle2 size={18} style={{ color: '#10b981' }} />}
    </h3>
    <p className="info-card-text">Aamir Ahamed</p>
    <p className="info-card-text" style={{ marginBottom: 0 }}>aamir.ahamed@example.com</p>
    {!hasCheckmark && <button className="edit-link" style={{ top: '16px', right: '16px' }}>Edit</button>}
  </div>
);

export const OvhcPaymentMethodCard = ({ hasCheckmark = false }) => (
  <div className="info-card" style={{ width: '100%', margin: 0, position: 'relative' }}>
    <h3 className="info-card-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span>Payment Method</span>
      {hasCheckmark && <CheckCircle2 size={18} style={{ color: '#10b981' }} />}
    </h3>
    <div className="payment-row" style={{ marginBottom: 0 }}>
      <CreditCard size={20} className="payment-icon" />
      <span className="payment-text">Visa ending in 4242</span>
    </div>
    {!hasCheckmark && <button className="edit-link" style={{ top: '16px', right: '16px' }}>Edit</button>}
  </div>
);

export const OvhcSuccessDetailsCard = () => (
  <div className="success-details-card" style={{ width: '100%', margin: 0 }}>
    <div className="success-detail-row">
      <span className="sd-label">Starts on</span>
      <span className="sd-value">12 Jan 2026</span>
    </div>
    <div className="success-detail-row">
      <span className="sd-label">Status</span>
      <span className="sd-value gold">Gold Member Continues</span>
    </div>
    <div className="success-detail-row">
      <span className="sd-label">Rewards</span>
      <span className="sd-value">2,400 pts carried over</span>
    </div>
  </div>
);

export default OvhcTransition;
