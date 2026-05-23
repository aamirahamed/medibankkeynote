import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import { healthImpact } from '../data/healthData';
import './HealthImpactDetail.css';

const flowSteps = [
  { icon: '👟', label: 'Activity',       arrow: true  },
  { icon: '⭐', label: 'Rewards',        arrow: true  },
  { icon: '🎁', label: 'Better Benefits', arrow: true  },
  { icon: '💰', label: 'Lower Costs',    arrow: false },
];

const benefits = [
  { icon: '🎁', title: 'Rewards & perks',        desc: 'Earn points redeemable for health products, gym passes, and more.' },
  { icon: '🏥', title: 'Priority services',       desc: 'Faster access to specialists and preferred provider networks.' },
  { icon: '📉', title: 'Potential cost reduction', desc: 'Active members may qualify for reduced OVHC premiums at renewal.' },
];

const HealthImpactDetail = () => {
  const navigate = useNavigate();
  const hi = healthImpact;
  const pct = (hi.score / hi.scoreMax) * 100;
  const currentTier = hi.tiers.find(t => t.id === hi.currentTier);

  return (
    <div className="hid-page">
      {/* Back header */}
      <div className="hid-header">
        <button className="hid-back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={22} />
        </button>
        <h1 className="hid-header-title">How to reduce your cover cost</h1>
      </div>

      <div className="hid-content">

        {/* Section 1 — How this works */}
        <div className="hid-section">
          <h2 className="hid-section-title">How this works</h2>
          <div className="hid-explain-card">
            <p className="hid-explain-text">
              The more active you are, the more rewards you earn.<br /><br />
              More rewards unlock better benefits — and that can lead to lower future cover costs when you transition to OVHC.
            </p>
          </div>
        </div>

        {/* Section 2 — Visual flow */}
        <div className="hid-section">
          <h2 className="hid-section-title">The pathway</h2>
          <div className="hid-flow-row">
            {flowSteps.map((step) => (
              <React.Fragment key={step.label}>
                <div className="hid-flow-step">
                  <div className="hid-flow-icon">{step.icon}</div>
                  <p className="hid-flow-label">{step.label}</p>
                </div>
                {step.arrow && <div className="hid-flow-arrow">→</div>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Section 3 — Tier system */}
        <div className="hid-section">
          <h2 className="hid-section-title">Your benefit tiers</h2>
          <div className="hid-tiers-list">
            {hi.tiers.map((tier, i) => {
              const isActive = tier.id === hi.currentTier;
              const tierLabels = ['Bronze', 'Silver', 'Gold'];
              return (
                <div
                  key={tier.id}
                  className={`hid-tier-row ${isActive ? 'hid-tier-active' : ''}`}
                  style={isActive ? { borderColor: tier.color, background: tier.bg } : {}}
                >
                  <div className="hid-tier-medal">
                    {i === 0 ? '🥉' : i === 1 ? '🥈' : '🥇'}
                  </div>
                  <div className="hid-tier-body">
                    <span className="hid-tier-name" style={isActive ? { color: tier.color } : {}}>
                      {tierLabels[i]}
                    </span>
                    <span className="hid-tier-benefit">{tier.benefit}</span>
                    <span className="hid-tier-desc">{tier.desc}</span>
                  </div>
                  {isActive && (
                    <span className="hid-tier-you-badge" style={{ background: tier.color }}>
                      You're here
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 4 — Personal progress */}
        <div className="hid-section">
          <h2 className="hid-section-title">Your progress</h2>
          <div className="hid-progress-card">
            <div className="hid-progress-top">
              <div>
                <p className="hid-progress-label">Health Score</p>
                <p className="hid-progress-score" style={{ color: currentTier.color }}>
                  {hi.score}<span className="hid-progress-max">/ 100</span>
                </p>
              </div>
              <div className="hid-current-tier-chip" style={{ background: currentTier.bg, color: currentTier.color }}>
                🥇 Gold tier
              </div>
            </div>
            <div className="hid-progress-bar-track">
              <div className="hid-progress-bar-fill" style={{ width: `${pct}%`, background: currentTier.color }} />
            </div>
            <p className="hid-progress-note">{hi.nextMilestone.label}</p>
          </div>
        </div>

        {/* Section 5 — Benefits */}
        <div className="hid-section">
          <h2 className="hid-section-title">What you can unlock</h2>
          {benefits.map(b => (
            <div key={b.title} className="hid-benefit-row">
              <span className="hid-benefit-icon">{b.icon}</span>
              <div className="hid-benefit-body">
                <p className="hid-benefit-title">{b.title}</p>
                <p className="hid-benefit-desc">{b.desc}</p>
              </div>
              <ChevronRight size={16} className="hid-benefit-chevron" />
            </div>
          ))}
        </div>

        {/* Section 6 — CTA */}
        <button className="hid-final-cta" onClick={() => navigate('/cover')}>
          See your personalised cover <ArrowRight size={17} />
        </button>

      </div>
    </div>
  );
};

export default HealthImpactDetail;
