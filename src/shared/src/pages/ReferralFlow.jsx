import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Users, Award, Copy, CheckCircle2, 
  MessageCircle, Smartphone, Mail, TrendingUp,
  Gift, HeartHandshake, ShieldCheck, Send
} from 'lucide-react';
import './ReferralFlow.css';

const ReferralFlow = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const mockLink = "medibank.com.au/invite/aamir";

  const handleCopy = () => {
    navigator.clipboard.writeText(mockLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDirectSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="referral-flow">
      {/* ── Hero Header ── */}
      <header className="rf-header">
        <div className="rf-bg-pattern"></div>
        <button className="rf-back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <div className="rf-hero-content">
          <div className="rf-hero-icon">
            <HeartHandshake size={32} color="#FFFFFF" />
          </div>
          <h1 className="rf-title">Refer a Friend</h1>
          <p className="rf-subtitle">Help your friends transition smoothly to OVHC and unlock exclusive loyalty savings for both of you.</p>
        </div>
      </header>

      <div className="rf-content">
        
        {/* ── Ambassador Status Dashboard ── */}
        <div className="rf-card">
          <div className="rf-status-header">
            <div>
              <div className="rf-tier-badge">
                <Award size={14} /> Ambassador Tier
              </div>
            </div>
            <div className="rf-savings-stat">
              <div className="rf-stat-val">10%</div>
              <div className="rf-stat-lbl">Current Savings</div>
            </div>
          </div>

          <div className="rf-progress-container">
            <div className="rf-progress-top">
              <span className="rf-progress-text">2 Successful Referrals</span>
              <span className="rf-progress-sub">3 more to Leader tier</span>
            </div>
            <div className="rf-bar-bg">
              <div className="rf-bar-fill" style={{width: '40%'}}></div>
            </div>
            <div className="rf-benefits-list">
              <div className="rf-benefit-item">
                <CheckCircle2 size={14} color="#10B981" /> 10% off your monthly premium
              </div>
              <div className="rf-benefit-item">
                <CheckCircle2 size={14} color="#10B981" /> Priority phone support access
              </div>
              <div className="rf-benefit-item" style={{color: '#94A3B8'}}>
                <Gift size={14} /> Leader Tier: 20% off + Gym Membership (Unlocked at 5)
              </div>
            </div>
          </div>
        </div>

        {/* ── Link Sharing Hub ── */}
        <div className="rf-card">
          <h3 className="rf-card-title"><Users size={18} color="#E60028" /> Invite your network</h3>
          
          <div className="rf-link-box">
            <span className="rf-link-text">{mockLink}</span>
            <button className="rf-copy-btn" onClick={handleCopy}>
              {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          <div className="rf-share-grid">
            <button className="rf-share-btn">
              <div className="rf-share-icon rf-share-whatsapp">
                <MessageCircle size={20} />
              </div>
              <span className="rf-share-lbl">WhatsApp</span>
            </button>
            <button className="rf-share-btn">
              <div className="rf-share-icon rf-share-sms">
                <Smartphone size={20} />
              </div>
              <span className="rf-share-lbl">SMS</span>
            </button>
            <button className="rf-share-btn">
              <div className="rf-share-icon rf-share-email">
                <Mail size={20} />
              </div>
              <span className="rf-share-lbl">Email</span>
            </button>
          </div>
        </div>

        {/* ── Direct Referral Form ── */}
        <div className="rf-card">
          <h3 className="rf-card-title"><HeartHandshake size={18} color="#E60028" /> Direct Referral</h3>
          <p style={{fontSize: '13px', color: '#64748B', marginBottom: '16px', lineHeight: '1.4'}}>
            Provide their details and our transition team will reach out to them directly.
          </p>

          {formSubmitted ? (
            <div className="rf-form-success fade-in">
              <div className="rf-form-success-icon">
                <CheckCircle2 size={24} />
              </div>
              <h4>Referral Sent!</h4>
              <p>We'll reach out to them shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleDirectSubmit}>
              <div className="rf-form-group">
                <label className="rf-label">Friend's Name</label>
                <input type="text" className="rf-input" placeholder="E.g. Sarah Connor" required />
              </div>
              <div className="rf-form-group">
                <label className="rf-label">Phone Number</label>
                <input type="tel" className="rf-input" placeholder="0400 000 000" required />
              </div>
              <div className="rf-form-group">
                <label className="rf-label">Email Address</label>
                <input type="email" className="rf-input" placeholder="sarah@example.com" required />
              </div>
              <button type="submit" className="rf-btn-submit">
                Submit Referral <Send size={16} />
              </button>
            </form>
          )}
        </div>

        {/* ── Tracking Metrics ── */}
        <div className="rf-card">
          <h3 className="rf-card-title"><TrendingUp size={18} color="#E60028" /> Your Impact</h3>
          <div className="rf-metrics-grid">
            <div className="rf-metric-box">
              <div className="rf-metric-lbl"><Mail size={14} /> Invites Sent</div>
              <div className="rf-metric-val">14</div>
            </div>
            <div className="rf-metric-box">
              <div className="rf-metric-lbl"><Users size={14} /> Friends Joined</div>
              <div className="rf-metric-val">5</div>
            </div>
            <div className="rf-metric-box">
              <div className="rf-metric-lbl"><ShieldCheck size={14} /> OVHC Converted</div>
              <div className="rf-metric-val text-success" style={{color: '#10B981'}}>2</div>
            </div>
            <div className="rf-metric-box">
              <div className="rf-metric-lbl"><Gift size={14} /> Value Saved</div>
              <div className="rf-metric-val">$180</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ReferralFlow;
