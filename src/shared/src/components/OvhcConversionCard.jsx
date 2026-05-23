import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, AlertCircle, Activity, Award, TrendingDown } from 'lucide-react';
import './OvhcConversionCard.css';

const OvhcConversionCard = () => {
  const navigate = useNavigate();

  return (
    <div className="ovhc-card">
      <div className="ovhc-header">
        <h3 className="ovhc-title">Your cover ends in 2 months</h3>
      </div>

      <div className="ovhc-compact-value">
        <div className="ovhc-value-row-flex">
          <div className="ovhc-val-item">
            <Activity size={16} className="ovhc-val-icon red" />
            <span><strong>78</strong> Health Score</span>
          </div>
          <div className="ovhc-val-divider" />
          <div className="ovhc-val-item">
            <Award size={16} className="ovhc-val-icon gold" />
            <span><strong>2,400 pts</strong> earned</span>
          </div>
        </div>
        <div className="ovhc-val-item bottom">
          <TrendingDown size={16} className="ovhc-val-icon green" />
          <span>Up to <strong>$18/month</strong> advantage</span>
        </div>
      </div>

      <div className="ovhc-messaging">
        <div className="ovhc-msg-row">
          <CheckCircle2 size={18} className="ovhc-msg-icon positive" />
          <p>Stay with Medibank to keep your rewards and benefits</p>
        </div>
        <div className="ovhc-msg-row">
          <AlertCircle size={18} className="ovhc-msg-icon neutral" />
          <p>Switching means starting over with no activity benefits</p>
        </div>
      </div>

      <button className="ovhc-cta" onClick={() => navigate('/ovhc-transition')}>
        Keep your benefits <ArrowRight size={16} />
      </button>
    </div>
  );
};

export const OvhcHealthScore = () => (
  <div className="ovhc-val-item" style={{ background: '#fff', padding: '10px 16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
    <Activity size={16} className="ovhc-val-icon red" />
    <span style={{ fontSize: '0.95rem', color: '#1f2937' }}><strong style={{ color: '#cd0d2d' }}>78</strong> Health Score</span>
  </div>
);

export const OvhcRewardPoints = () => (
  <div className="ovhc-val-item" style={{ background: '#fff', padding: '10px 16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
    <Award size={16} className="ovhc-val-icon gold" />
    <span style={{ fontSize: '0.95rem', color: '#1f2937' }}><strong style={{ color: '#d97706' }}>2,400 pts</strong> earned</span>
  </div>
);

export const OvhcAdvantage = () => (
  <div className="ovhc-val-item bottom" style={{ background: '#fff', padding: '10px 16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', display: 'inline-flex', alignItems: 'center', gap: '8px', margin: 0 }}>
    <TrendingDown size={16} className="ovhc-val-icon green" />
    <span style={{ fontSize: '0.95rem', color: '#1f2937' }}>Up to <strong style={{ color: '#10b981' }}>$18/month</strong> advantage</span>
  </div>
);

export const OvhcKeepRewards = () => (
  <div className="ovhc-msg-row" style={{ background: '#fff', padding: '12px 18px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', width: '100%', display: 'flex', alignItems: 'center', gap: '10px' }}>
    <CheckCircle2 size={18} className="ovhc-msg-icon positive" />
    <p style={{ margin: 0, fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.3 }}>Stay with Medibank to keep your rewards and benefits</p>
  </div>
);

export default OvhcConversionCard;
