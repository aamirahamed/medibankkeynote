import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import './PremiumReferralCard.css';

const PremiumReferralCard = ({ variant = 'default' }) => {
  const navigate = useNavigate();
  const isCompact = variant === 'compact';

  return (
    <div className={`premium-referral-card ${isCompact ? 'compact' : ''}`}>
      <div className="prc-noise-overlay"></div>
      <div className="prc-ambient-glow"></div>
      
      <div className="prc-content">
        <div className="prc-header">
          <div className="prc-icon-glass">
            <Award size={16} className="prc-icon" />
          </div>
          <span className="prc-pill">Exclusive Loyalty</span>
        </div>
        
        <div className="prc-text-area">
          <h3 className="prc-title">Help friends stay covered</h3>
          <p className="prc-subtitle">
            Support them through their OVHC transition and unlock premium community benefits.
          </p>
        </div>

        <div className="prc-wallet-tiers">
          <div className="prc-wallet-card inactive">
            <div className="prc-wallet-top">
              <span className="prc-wallet-name">Supporter</span>
              <CheckCircle size={14} className="prc-check-icon" />
            </div>
            <span className="prc-wallet-val">5% Savings</span>
          </div>
          <div className="prc-wallet-card active">
            <div className="prc-active-glow"></div>
            <div className="prc-wallet-top">
              <span className="prc-wallet-name">Ambassador</span>
              <Sparkles size={14} className="prc-sparkle-icon" />
            </div>
            <span className="prc-wallet-val">10% Savings</span>
          </div>
          {!isCompact && (
            <div className="prc-wallet-card locked">
              <div className="prc-wallet-top">
                <span className="prc-wallet-name">Leader</span>
              </div>
              <span className="prc-wallet-val">20% Savings</span>
            </div>
          )}
        </div>

        {!isCompact && (
          <div className="prc-premium-progress">
            <div className="prc-progress-header">
              <span className="prc-prog-status"><strong>2</strong> successful referrals</span>
              <span className="prc-prog-target">3 more to Leader</span>
            </div>
            <div className="prc-prog-track">
              <div className="prc-prog-fill" style={{ width: '40%' }}>
                <div className="prc-prog-flare"></div>
              </div>
              <div className="prc-prog-marker" style={{left: '0%'}}></div>
              <div className="prc-prog-marker active" style={{left: '40%'}}></div>
              <div className="prc-prog-marker" style={{left: '100%'}}></div>
            </div>
          </div>
        )}

        <div className="prc-actions">
          <button className="prc-btn-primary" onClick={() => navigate('/referral')}>
            <span>Invite Friends</span>
            <ArrowRight size={16} className="prc-btn-arrow" />
          </button>
          {!isCompact && (
            <button className="prc-btn-ghost" onClick={() => navigate('/referral')}>
              Learn about benefits
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PremiumReferralCard;
