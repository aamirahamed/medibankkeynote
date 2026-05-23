import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CreditCard, Receipt, MapPin, BookOpen, HelpCircle,
  ChevronRight, ArrowRight, Lightbulb, Shield,
  FileText, Phone, CheckCircle, Eye, EyeOff, Users, Award, Sparkles
} from 'lucide-react';
import PremiumReferralCard from '../components/PremiumReferralCard';
import './Cover.css';

/* ── Mock cover data ── */
const coverData = {
  name: 'Aamir Ahmed',
  planName: 'Student Essentials OSHC',
  memberId: '4821 9034 7612',
  validFrom: '12 Jan 2025',
  validUntil: '11 Jan 2026',
  status: 'Active',
  coverType: 'Overseas Student Health Cover',
  provider: 'Medibank',
};

/* ── Action cards ── */
const actionCards = [
  {
    id: 'claim',
    icon: Receipt,
    iconBg: '#fff1f2',
    iconColor: '#cd0d2d',
    title: 'Get money back',
    sub: 'Upload your receipt and we\'ll process your claim',
    cta: 'Make a claim',
  },
  {
    id: 'doctor',
    icon: MapPin,
    iconBg: '#eff6ff',
    iconColor: '#1e3f8a',
    title: 'Find a doctor',
    sub: 'Search clinics that accept your insurance',
    cta: 'Find a doctor',
  },
  {
    id: 'coverage',
    icon: BookOpen,
    iconBg: '#ecfdf5',
    iconColor: '#10b981',
    title: "What's covered for you",
    sub: 'Simple breakdown of your benefits',
    cta: 'View coverage',
  },
  {
    id: 'howto',
    icon: HelpCircle,
    iconBg: '#fefce8',
    iconColor: '#d97706',
    title: 'How to use your insurance',
    sub: 'Step-by-step guide for your first visit',
    cta: 'Learn how',
  },
];

/* ── Support items ── */
const supportItems = [
  { id: 's1', icon: Phone,    label: 'Talk to support',    sub: 'Available 24/7' },
  { id: 's2', icon: FileText, label: 'Get your documents', sub: 'Policy, certificates & more' },
  { id: 's3', icon: Receipt,  label: 'View past claims',   sub: 'Check your history' },
];

/* ── Digital Card Component ── */
const DigitalCard = ({ show, onToggle }) => (
  <div className="digital-card-outer">
    <div className="digital-card">
      {/* Card top */}
      <div className="card-top-row">
        <div className="card-logo-area">
          <span className="card-logo-text">medibank</span>
          <span className="card-cover-label">OSHC</span>
        </div>
        <div className="card-status-pill">
          <CheckCircle size={11} />
          <span>Active</span>
        </div>
      </div>

      {/* Member ID */}
      <div className="card-member-id">
        {show ? coverData.memberId : '•••• •••• ••••'}
      </div>
      <p className="card-member-id-label">Member ID</p>

      {/* Card bottom */}
      <div className="card-bottom-row">
        <div>
          <p className="card-field-label">Name</p>
          <p className="card-field-value">{coverData.name}</p>
        </div>
        <div>
          <p className="card-field-label">Valid until</p>
          <p className="card-field-value">{coverData.validUntil}</p>
        </div>
        <div>
          <p className="card-field-label">Plan</p>
          <p className="card-field-value">Essentials</p>
        </div>
      </div>
    </div>

    {/* Toggle button */}
    <button className="show-card-btn" onClick={onToggle}>
      {show ? <EyeOff size={15} /> : <Eye size={15} />}
      <span>{show ? 'Hide card' : 'Show card'}</span>
    </button>
  </div>
);

/* ── MAIN COVER PAGE ── */
const Cover = () => {
  const navigate = useNavigate();
  const [cardVisible, setCardVisible] = useState(false);

  return (
    <div className="cover-page">

      {/* ── Header ── */}
      <div className="cover-header">
        <div className="cover-header-top">
          <h1 className="cover-logo">medibank</h1>
        </div>
        <div className="cover-header-content">
          <div className="cover-header-eyebrow">
            <Shield size={13} />
            <span>Health Cover</span>
          </div>
          <h2 className="cover-header-title">Your Health Cover</h2>

          <div className="cover-snapshot-row">
            <div className="cover-snapshot-item">
              <span className="snapshot-label">Plan</span>
              <span className="snapshot-value">Student Essentials</span>
            </div>
            <div className="cover-snapshot-divider" />
            <div className="cover-snapshot-item">
              <span className="snapshot-label">Status</span>
              <span className="snapshot-value snapshot-active">
                <span className="snapshot-dot" /> Active
              </span>
            </div>
            <div className="cover-snapshot-divider" />
            <div className="cover-snapshot-item">
              <span className="snapshot-label">Valid until</span>
              <span className="snapshot-value">{coverData.validUntil}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="cover-content">

        {/* Digital Card */}
        <DigitalCard show={cardVisible} onToggle={() => setCardVisible(p => !p)} />

        {/* ── Guided Actions ── */}
        <div className="cover-section">
          <h2 className="cover-section-title">What do you need?</h2>
          <div className="action-cards-grid">
            {actionCards.map(card => {
              const Icon = card.icon;
              return (
                <div key={card.id} className="action-card">
                  <div
                    className="action-card-icon"
                    style={{ background: card.iconBg, color: card.iconColor }}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 className="action-card-title">{card.title}</h3>
                  <p className="action-card-sub">{card.sub}</p>
                  <button
                    className="action-card-cta"
                    style={{ color: card.iconColor }}
                  >
                    {card.cta} <ArrowRight size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Premium Referral Card ── */}
        <PremiumReferralCard />

        {/* ── Smart Insight ── */}
        <div className="cover-insight-card">
          <div className="insight-icon-circle">
            <Lightbulb size={20} />
          </div>
          <div className="insight-body">
            <h3 className="insight-title">First time using your OSHC?</h3>
            <p className="insight-text">
              You haven't used your cover yet. Here's how to book your first doctor visit in Australia.
            </p>
            <button className="insight-cta-pill">
              Get started <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* ── Support Section ── */}
        <div className="cover-section">
          <h2 className="cover-section-title">Need help?</h2>
          <div className="support-card">
            {supportItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <React.Fragment key={item.id}>
                  <div className="support-row">
                    <div className="support-icon-wrap">
                      <Icon size={18} />
                    </div>
                    <div className="support-text">
                      <span className="support-label">{item.label}</span>
                      <span className="support-sub">{item.sub}</span>
                    </div>
                    <ChevronRight size={18} className="support-chevron" />
                  </div>
                  {index < supportItems.length - 1 && (
                    <div className="support-divider" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cover;
