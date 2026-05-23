import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Heart, Share2, ChevronUp, Send } from 'lucide-react';
import { discoverItems } from '../data/communityData';
import './CommunityDetail.css';

const mockReplies = [
  { id: 'r1', author: 'Priya S.',  avatar: '👩🏽', time: '1h ago',  text: 'Aldi is the cheapest by far! There\'s one on Elizabeth Street near the CBD. Great for basics.', likes: 12, liked: false },
  { id: 'r2', author: 'Wei C.',    avatar: '👨🏻', time: '2h ago',  text: 'IGA is also decent and often open later than supermarkets. Good for late-night grocery runs.', likes: 8,  liked: false },
  { id: 'r3', author: 'Carlos M.', avatar: '👨🏽', time: '3h ago',  text: 'Woolworths at Melbourne Central has a student discount on Wednesdays if you show your student card!', likes: 22, liked: false },
  { id: 'r4', author: 'Aisha K.',  avatar: '👩🏾', time: '5h ago',  text: 'Queen Victoria Market on weekends is great for fresh produce at lower prices too.', likes: 15, liked: false },
];

const DiscoverDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = discoverItems.find(d => d.id === id);
  const [likedMap, setLikedMap] = useState({});
  const [upvoted, setUpvoted] = useState(false);

  if (!item) { navigate('/community'); return null; }

  const toggleLike = (rid) => setLikedMap(prev => ({ ...prev, [rid]: !prev[rid] }));

  const typeConfig = {
    question: { label: 'Question', color: '#1e3f8a', bg: '#eff6ff' },
    tip:      { label: 'Tip',      color: '#10b981', bg: '#ecfdf5' },
  };
  const cfg = typeConfig[item.type] || typeConfig.question;

  return (
    <div className="detail-page">
      {/* Header */}
      <div className="detail-header discover-detail-header">
        <button className="detail-back-btn" onClick={() => navigate('/community')}>
          <ArrowLeft size={22} />
        </button>

        <div className="discover-detail-hero">
          <div className="discover-detail-type-row">
            <span className="discover-detail-type-badge" style={{ color: cfg.color, background: cfg.bg }}>
              {cfg.label}
            </span>
            <span className="discover-detail-group">{item.group}</span>
          </div>
          <div className="discover-detail-emoji">{item.icon}</div>
          <h1 className="detail-title discover-detail-title">{item.title}</h1>
          <div className="discover-detail-meta">
            <span>{item.time}</span>
            <span className="dot-sep">·</span>
            <MessageCircle size={13} />
            <span>{item.replies} replies</span>
          </div>

          {/* Upvote */}
          <button
            className={`discover-upvote-btn ${upvoted ? 'upvote-active' : ''}`}
            onClick={() => setUpvoted(p => !p)}
          >
            <ChevronUp size={18} />
            <span>{upvoted ? 'Upvoted' : 'Upvote this'}</span>
          </button>
        </div>
      </div>

      <div className="detail-body">
        {/* Full question body */}
        <div className="detail-section">
          <div className="question-full-card">
            <div className="question-author-row">
              <span className="question-avatar">👤</span>
              <div>
                <span className="question-author">Anonymous student</span>
                <span className="question-time">{item.time}</span>
              </div>
            </div>
            <p className="question-full-text">
              {item.title} — I just arrived in Melbourne and I am trying to figure out where to shop without spending too much. Any recommendations for good value grocery stores near the city centre?
            </p>
          </div>
        </div>

        {/* Replies */}
        <div className="detail-section">
          <h2 className="detail-section-title">{mockReplies.length} Replies</h2>
          {mockReplies.map(reply => (
            <div key={reply.id} className="reply-card">
              <div className="reply-header">
                <span className="reply-avatar">{reply.avatar}</span>
                <div className="reply-meta">
                  <span className="reply-author">{reply.author}</span>
                  <span className="reply-time">{reply.time}</span>
                </div>
                <button
                  className={`reply-like-btn ${likedMap[reply.id] ? 'reply-liked' : ''}`}
                  onClick={() => toggleLike(reply.id)}
                >
                  <Heart size={14} fill={likedMap[reply.id] ? 'currentColor' : 'none'} />
                  <span>{reply.likes + (likedMap[reply.id] ? 1 : 0)}</span>
                </button>
              </div>
              <p className="reply-text">{reply.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reply bar */}
      <div className="detail-sticky-footer reply-footer">
        <input className="reply-bar-input" placeholder="Add your answer…" readOnly />
        <button className="reply-bar-send">
          <Send size={17} />
        </button>
      </div>
    </div>
  );
};

export default DiscoverDetail;
