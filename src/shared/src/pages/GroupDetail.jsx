import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, Users, MessageCircle, ChevronRight,
  Heart, Send, Hash, Pin
} from 'lucide-react';
import { groups } from '../data/communityData';
import './CommunityDetail.css';

// Mock discussion threads per group
const mockThreads = [
  { id: 't1', author: 'Priya S.', avatar: '👩🏽', time: '2h ago', content: 'Hey everyone! Just moved to Melbourne last week. Any tips on the best areas to live near RMIT?', replies: 8, likes: 14 },
  { id: 't2', author: 'Wei C.',   avatar: '👨🏻', time: '4h ago', content: 'Does anyone know if Medibank OSHC covers mental health consultations? I\'ve been feeling a bit overwhelmed.', replies: 12, likes: 22 },
  { id: 't3', author: 'Carlos M.',avatar: '👨🏽', time: '1d ago', content: 'PSA: You can get a free Myki card at the airport. Don\'t buy one at the station — it\'s the same price but longer queue!', replies: 5,  likes: 38 },
  { id: 't4', author: 'Aisha K.', avatar: '👩🏾', time: '2d ago', content: 'Looking for a study buddy for COSC1107 at RMIT. DM me if you\'re in the same subject!', replies: 3,  likes: 7  },
];

const mockMembers = [
  { avatar: '👩🏽', name: 'Priya S.' },
  { avatar: '👨🏻', name: 'Wei C.' },
  { avatar: '👨🏽', name: 'Carlos M.' },
  { avatar: '👩🏾', name: 'Aisha K.' },
  { avatar: '👦🏻', name: 'Kenji T.' },
];

const GroupDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const group = groups.find(g => g.id === id);
  const [joined, setJoined] = useState(group?.joined || false);
  const [likedMap, setLikedMap] = useState({});
  const [activeTab, setActiveTab] = useState('discussions');

  if (!group) { navigate('/community'); return null; }

  const toggleLike = (tid) => setLikedMap(prev => ({ ...prev, [tid]: !prev[tid] }));

  return (
    <div className="detail-page">
      {/* Hero Header */}
      <div className="detail-header" style={{ background: `linear-gradient(135deg, ${group.color}22 0%, #ffffff 100%)` }}>
        <button className="detail-back-btn" onClick={() => navigate('/community')}>
          <ArrowLeft size={22} />
        </button>
        <div className="group-detail-hero">
          <div className="group-detail-icon" style={{ background: group.bg, color: group.color }}>
            <span style={{ fontSize: 36 }}>{group.icon}</span>
          </div>
          <span className="group-detail-category" style={{ color: group.color, background: group.bg }}>
            {group.categoryLabel}
          </span>
          <h1 className="detail-title">{group.name}</h1>
          <p className="detail-subtitle">{group.description}</p>
          <div className="group-detail-stats">
            <div className="detail-stat">
              <span className="detail-stat-num">{group.members.toLocaleString()}</span>
              <span className="detail-stat-label">Members</span>
            </div>
            <div className="detail-stat-divider" />
            <div className="detail-stat">
              <span className="detail-stat-num">{mockThreads.length}</span>
              <span className="detail-stat-label">Discussions</span>
            </div>
            <div className="detail-stat-divider" />
            <div className="detail-stat">
              <span className="detail-stat-num">Active</span>
              <span className="detail-stat-label">Status</span>
            </div>
          </div>
          <button
            className={`detail-primary-btn ${joined ? 'btn-secondary-outline' : ''}`}
            style={!joined ? { background: group.color } : {}}
            onClick={() => setJoined(p => !p)}
          >
            {joined ? '✓ Joined — Leave group' : 'Join group'}
          </button>
        </div>
      </div>

      {/* Inner Tabs */}
      <div className="detail-inner-tabs">
        {['discussions', 'members'].map(t => (
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
        {activeTab === 'discussions' && (
          <>
            {/* Pinned */}
            <div className="pinned-notice">
              <Pin size={13} /> <span>Pin your questions — the community will help</span>
            </div>

            {mockThreads.map(thread => (
              <div key={thread.id} className="thread-card">
                <div className="thread-header">
                  <span className="thread-avatar">{thread.avatar}</span>
                  <div className="thread-meta">
                    <span className="thread-author">{thread.author}</span>
                    <span className="thread-time">{thread.time}</span>
                  </div>
                </div>
                <p className="thread-content">{thread.content}</p>
                <div className="thread-footer">
                  <button className={`thread-action ${likedMap[thread.id] ? 'action-liked' : ''}`} onClick={() => toggleLike(thread.id)}>
                    <Heart size={14} fill={likedMap[thread.id] ? 'currentColor' : 'none'} />
                    <span>{thread.likes + (likedMap[thread.id] ? 1 : 0)}</span>
                  </button>
                  <button className="thread-action">
                    <MessageCircle size={14} />
                    <span>{thread.replies} replies</span>
                  </button>
                </div>
              </div>
            ))}

            {/* Reply bar */}
            <div className="reply-bar">
              <input className="reply-input" placeholder="Ask the group something…" readOnly />
              <button className="reply-send-btn" style={{ background: group.color }}>
                <Send size={16} />
              </button>
            </div>
          </>
        )}

        {activeTab === 'members' && (
          <div className="members-list">
            <p className="members-note">Showing {mockMembers.length} active members this week</p>
            {mockMembers.map(m => (
              <div key={m.name} className="member-row">
                <span className="member-avatar">{m.avatar}</span>
                <span className="member-name">{m.name}</span>
                <ChevronRight size={16} className="member-chevron" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupDetail;
