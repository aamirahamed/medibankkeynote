import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, UserCheck, MessageCircle, Star, GraduationCap, Globe } from 'lucide-react';
import { buddies } from '../data/communityData';
import './CommunityDetail.css';

const helpTopics = [
  { icon: '🏥', label: 'Healthcare & OSHC' },
  { icon: '🚌', label: 'Public transport' },
  { icon: '🏠', label: 'Finding housing' },
  { icon: '🛒', label: 'Grocery & daily life' },
  { icon: '🎓', label: 'Uni & enrolment' },
  { icon: '📱', label: 'SIM & banking' },
];

const recentReviews = [
  { author: 'Mehmet A.', avatar: '👨🏽', text: 'Super helpful! Answered all my OSHC questions within hours. Highly recommend connecting.', rating: 5 },
  { author: 'Lena K.', avatar: '👩🏼', text: 'Made my first week so much less stressful. Knew exactly what I needed to do.', rating: 5 },
];

const BuddyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const buddy = buddies.find(b => b.id === id);
  const [requested, setRequested] = useState(false);
  const [activeTab, setActiveTab] = useState('about');

  if (!buddy) { navigate('/community'); return null; }

  return (
    <div className="detail-page">
      {/* Header */}
      <div className="detail-header buddy-detail-header">
        <button className="detail-back-btn detail-back-light" onClick={() => navigate('/community')}>
          <ArrowLeft size={22} />
        </button>

        <div className="buddy-detail-hero">
          <div className="buddy-detail-avatar-wrap">
            <span className="buddy-detail-avatar">{buddy.avatar}</span>
            {buddy.online && <div className="buddy-detail-online" />}
          </div>
          <h1 className="buddy-detail-name">{buddy.name}</h1>
          <div className="buddy-detail-badges">
            <span className="buddy-detail-badge">
              <GraduationCap size={13} /> {buddy.university}
            </span>
            <span className="buddy-detail-badge">
              <Globe size={13} /> {buddy.country}
            </span>
          </div>
          <div className="buddy-detail-stats">
            <div className="detail-stat">
              <span className="detail-stat-num" style={{ color: '#fff' }}>32</span>
              <span className="detail-stat-label" style={{ color: 'rgba(255,255,255,0.75)' }}>Students helped</span>
            </div>
            <div className="detail-stat-divider" style={{ background: 'rgba(255,255,255,0.25)' }} />
            <div className="detail-stat">
              <span className="detail-stat-num" style={{ color: '#fff' }}>18 mo</span>
              <span className="detail-stat-label" style={{ color: 'rgba(255,255,255,0.75)' }}>In Australia</span>
            </div>
            <div className="detail-stat-divider" style={{ background: 'rgba(255,255,255,0.25)' }} />
            <div className="detail-stat">
              <span className="detail-stat-num" style={{ color: '#fff' }}>4.9 ⭐</span>
              <span className="detail-stat-label" style={{ color: 'rgba(255,255,255,0.75)' }}>Rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Inner Tabs */}
      <div className="detail-inner-tabs">
        {['about', 'reviews'].map(t => (
          <button
            key={t}
            className={`detail-inner-tab ${activeTab === t ? 'inner-tab-active' : ''}`}
            onClick={() => setActiveTab(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div className="detail-body">
        {activeTab === 'about' && (
          <>
            <div className="detail-section">
              <h2 className="detail-section-title">About {buddy.name.split(' ')[0]}</h2>
              <p className="detail-body-text">{buddy.bio}</p>
              <p className="detail-body-text" style={{ marginTop: 10 }}>
                Currently studying <strong>{buddy.course}</strong> — {buddy.year}.
              </p>
            </div>

            <div className="detail-section">
              <h2 className="detail-section-title">Can help with</h2>
              <div className="help-topics-grid">
                {helpTopics.map(h => (
                  <div key={h.label} className="help-topic-chip">
                    <span>{h.icon}</span>
                    <span>{h.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="detail-section">
              <h2 className="detail-section-title">Skills & tags</h2>
              <div className="buddy-tags-list">
                {buddy.tags.map(tag => (
                  <span key={tag} className="buddy-detail-tag">{tag}</span>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'reviews' && (
          <div className="detail-section">
            <h2 className="detail-section-title">What others say</h2>
            {recentReviews.map(r => (
              <div key={r.author} className="review-card">
                <div className="review-header">
                  <span className="review-avatar">{r.avatar}</span>
                  <div>
                    <span className="review-author">{r.author}</span>
                    <div className="review-stars">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} size={12} fill="#f59e0b" stroke="none" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="review-text">{r.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sticky CTA */}
      <div className="detail-sticky-footer">
        <button
          className={`detail-primary-btn ${requested ? 'btn-secondary-outline' : ''}`}
          onClick={() => setRequested(p => !p)}
        >
          {requested ? (
            <><UserCheck size={18} /> Request sent</>
          ) : (
            <>Connect with {buddy.name.split(' ')[0]}</>
          )}
        </button>
        <button className="detail-share-btn">
          <MessageCircle size={18} />
        </button>
      </div>
    </div>
  );
};

export default BuddyDetail;
