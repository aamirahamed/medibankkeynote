import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Calendar, Handshake, Compass, Search, ChevronRight, MapPin, Clock, UserCheck, TrendingUp, Flame, MessageCircle, Zap } from 'lucide-react';
import { groups, events, buddies, discoverItems, groupCategories } from '../data/communityData';
import './Community.css';

const TABS = [
  { id: 'groups',   label: 'Groups',   icon: Users },
  { id: 'events',   label: 'Events',   icon: Calendar },
  { id: 'buddy',    label: 'Buddy',    icon: Handshake },
  { id: 'discover', label: 'Discover', icon: Compass },
];

/* ── GROUPS TAB ─────────────────────────────────── */
const GroupsTab = ({ navigate }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [joinedMap, setJoinedMap] = useState(() => {
    const m = {};
    groups.forEach(g => { m[g.id] = g.joined; });
    return m;
  });

  const filtered = activeFilter === 'all' ? groups : groups.filter(g => g.category === activeFilter);

  const toggle = (id, e) => {
    e.stopPropagation();
    setJoinedMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="tab-content">
      {/* Search */}
      <div className="search-bar-wrapper">
        <Search size={16} className="search-icon" />
        <input className="search-input" placeholder="Search groups…" readOnly />
      </div>

      {/* Filter chips */}
      <div className="filter-chips">
        {groupCategories.map(cat => (
          <button
            key={cat.id}
            className={`filter-chip ${activeFilter === cat.id ? 'chip-active' : ''}`}
            onClick={() => setActiveFilter(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Group cards */}
      <div className="cards-list">
        {filtered.map(group => (
          <div key={group.id} className="group-card" onClick={() => navigate(`/community/group/${group.id}`)} style={{ cursor: 'pointer' }}>
            <div className="group-card-left">
              <div className="group-icon-circle" style={{ background: group.bg, color: group.color }}>
                <span className="group-emoji">{group.icon}</span>
              </div>
            </div>
            <div className="group-card-body">
              <div className="group-card-top">
                <span className="group-category-tag" style={{ color: group.color, background: group.bg }}>
                  {group.categoryLabel}
                </span>
                {joinedMap[group.id] && (
                  <span className="group-joined-badge">✓ Joined</span>
                )}
              </div>
              <h3 className="group-name">{group.name}</h3>
              <p className="group-desc">{group.description}</p>
              <div className="group-card-footer">
                <span className="group-members">
                  <Users size={13} /> {group.members.toLocaleString()} members
                </span>
                <button
                  className={`group-join-btn ${joinedMap[group.id] ? 'btn-joined' : 'btn-join'}`}
                  onClick={e => toggle(group.id, e)}
                >
                  {joinedMap[group.id] ? 'Leave' : 'Join'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── EVENTS TAB ─────────────────────────────────── */
const EventsTab = ({ navigate, step }) => {
  const [registeredMap, setRegisteredMap] = useState(() => {
    const m = {};
    events.forEach(e => { m[e.id] = e.registered; });
    return m;
  });

  const toggle = (id) => {
    setRegisteredMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="tab-content">
      <div className="section-intro">
        <p className="section-intro-text">Real-world events to help you connect and settle in</p>
      </div>
      <div className="cards-list">
        {events.map(event => {
          const isHighlighted = step === 13 && event.id === 'e_graduate_visa';
          const isDimmed = step === 13 && event.id !== 'e_graduate_visa';
          
          return (
            <div 
              key={event.id} 
              className="event-card" 
              onClick={() => navigate(`/community/event/${event.id}`)} 
              style={{ 
                cursor: 'pointer',
                transition: 'all 0.5s ease',
                ...(isHighlighted ? {
                  boxShadow: '0 0 20px 4px rgba(59, 130, 246, 0.5)',
                  border: '1px solid rgba(59, 130, 246, 0.8)',
                  transform: 'scale(1.02)'
                } : {}),
                ...(isDimmed ? {
                  opacity: 0.3,
                  filter: 'blur(1px)'
                } : {})
              }}
            >
              <div className="event-card-header">
              <div className="event-icon-circle" style={{ background: event.bg, color: event.color }}>
                <span className="event-emoji">{event.icon}</span>
              </div>
              <div className="event-header-right">
                <span className="event-type-tag" style={{ color: event.typeColor, background: event.typeBg }}>
                  {event.type}
                </span>
                {registeredMap[event.id] && (
                  <span className="event-registered-badge">✓ Registered</span>
                )}
              </div>
            </div>
            <h3 className="event-title">{event.title}</h3>
            <div className="event-meta">
              <div className="event-meta-row">
                <Clock size={13} className="meta-icon" />
                <span>{event.date} · {event.time}</span>
              </div>
              <div className="event-meta-row">
                <MapPin size={13} className="meta-icon" />
                <span>{event.location}</span>
              </div>
              <div className="event-meta-row">
                <Users size={13} className="meta-icon" />
                <span>{event.attendees} attending</span>
              </div>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
};

/* ── BUDDY TAB ──────────────────────────────────── */
const BuddyTab = ({ navigate }) => {
  const [requested, setRequested] = useState({});

  return (
    <div className="tab-content">
      {/* Intro Banner */}
      <div className="buddy-intro-card">
        <div className="buddy-intro-icon">🤝</div>
        <div className="buddy-intro-content">
          <h3>Find a buddy</h3>
          <p>Get matched with a student who has been through what you are going through. They know the city, the system, and how to help.</p>
        </div>
      </div>

      <div className="buddy-section-label">Suggested for you</div>

      <div className="cards-list">
        {buddies.map(buddy => (
          <div key={buddy.id} className="buddy-card" onClick={() => navigate(`/community/buddy/${buddy.id}`)} style={{ cursor: 'pointer' }}>
            <div className="buddy-card-top">
              <div className="buddy-avatar-wrapper">
                <span className="buddy-avatar">{buddy.avatar}</span>
                {buddy.online && <div className="buddy-online-dot" />}
              </div>
              <div className="buddy-info">
                <h3 className="buddy-name">{buddy.name}</h3>
                <p className="buddy-uni">{buddy.university}</p>
                <p className="buddy-details">{buddy.year} · {buddy.course}</p>
              </div>
              <div className="buddy-flag">
                <span className="buddy-country-label">{buddy.country}</span>
              </div>
            </div>

            <p className="buddy-bio">{buddy.bio}</p>

            <div className="buddy-tags">
              {buddy.tags.map(tag => (
                <span key={tag} className="buddy-tag">{tag}</span>
              ))}
            </div>

            <button
              className={`buddy-connect-btn ${requested[buddy.id] ? 'btn-requested' : 'btn-connect'}`}
              onClick={() => setRequested(prev => ({ ...prev, [buddy.id]: !prev[buddy.id] }))}
            >
              {requested[buddy.id] ? (
                <><UserCheck size={15} /> Request sent</>
              ) : (
                <>Connect with {buddy.name.split(' ')[0]}</>
              )}
            </button>
          </div>
        ))}
      </div>

      <div className="buddy-cta-section">
        <p className="buddy-cta-text">Not finding the right match?</p>
        <button className="buddy-browse-btn">
          Browse all buddies <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

/* ── DISCOVER TAB ───────────────────────────────── */
const DiscoverTab = ({ navigate }) => (
  <div className="tab-content">
    {/* Trending */}
    <div className="discover-section">
      <div className="discover-section-header">
        <Flame size={16} className="discover-section-icon flame" />
        <h2 className="discover-section-title">Trending now</h2>
      </div>
      <div className="cards-list">
        {discoverItems.filter(d => d.hot).map(item => (
          <div key={item.id} className="discover-card hot-card" onClick={() => navigate(`/community/discover/${item.id}`)} style={{ cursor: 'pointer' }}>
            <div className="discover-card-left">
              <span className="discover-emoji">{item.icon}</span>
            </div>
            <div className="discover-card-body">
              <h3 className="discover-title">{item.title}</h3>
              <div className="discover-meta">
                <span className="discover-group">{item.group}</span>
                <span className="discover-dot">·</span>
                <MessageCircle size={12} />
                <span>{item.replies} replies</span>
                <span className="discover-dot">·</span>
                <span>{item.time}</span>
              </div>
            </div>
            <ChevronRight size={16} className="discover-chevron" />
          </div>
        ))}
      </div>
    </div>

    {/* All discussions */}
    <div className="discover-section">
      <div className="discover-section-header">
        <TrendingUp size={16} className="discover-section-icon trending" />
        <h2 className="discover-section-title">Recent discussions</h2>
      </div>
      <div className="cards-list">
        {discoverItems.filter(d => !d.hot).map(item => (
          <div key={item.id} className="discover-card" onClick={() => navigate(`/community/discover/${item.id}`)} style={{ cursor: 'pointer' }}>
            <div className="discover-card-left">
              <span className="discover-emoji">{item.icon}</span>
            </div>
            <div className="discover-card-body">
              <h3 className="discover-title">{item.title}</h3>
              <div className="discover-meta">
                <span className="discover-group">{item.group}</span>
                <span className="discover-dot">·</span>
                <MessageCircle size={12} />
                <span>{item.replies} replies</span>
                <span className="discover-dot">·</span>
                <span>{item.time}</span>
              </div>
            </div>
            <ChevronRight size={16} className="discover-chevron" />
          </div>
        ))}
      </div>
    </div>

    {/* Active groups callout */}
    <div className="discover-callout">
      <Zap size={16} className="callout-icon" />
      <div className="callout-text">
        <strong>3 groups are active right now</strong>
        <p>Jump in and introduce yourself</p>
      </div>
      <ChevronRight size={16} className="callout-chevron" />
    </div>
  </div>
);

/* ── MAIN COMMUNITY PAGE ────────────────────────── */
const Community = ({ forcedTab, step }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('groups');

  React.useEffect(() => {
    if (forcedTab) {
      setActiveTab(forcedTab);
    }
  }, [forcedTab]);

  const renderTab = () => {
    switch (activeTab) {
      case 'groups':   return <GroupsTab navigate={navigate} />;
      case 'events':   return <EventsTab navigate={navigate} step={step} />;
      case 'buddy':    return <BuddyTab navigate={navigate} />;
      case 'discover': return <DiscoverTab navigate={navigate} />;
      default:         return <GroupsTab navigate={navigate} />;
    }
  };

  return (
    <div className="community-page">
      {/* Header */}
      <div className="community-header">
        <div className="community-header-top">
          <h1 className="community-logo">medibank</h1>
        </div>
        <div className="community-header-content">
          <div className="community-header-eyebrow">
            <Users size={13} />
            <span>Community</span>
          </div>
          <h2 className="community-header-title">Find your people</h2>
          <p className="community-header-sub">
            Connect with students like you, discover events, and get support
          </p>

          {/* Stats strip */}
          <div className="community-stats-strip">
            <div className="stat-item">
              <span className="stat-number">9,200+</span>
              <span className="stat-label">Students</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number">24</span>
              <span className="stat-label">Groups</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number">5</span>
              <span className="stat-label">Events</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="community-tab-bar">
        {TABS.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`community-tab ${activeTab === tab.id ? 'tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="community-tab-content">
        {renderTab()}
      </div>
    </div>
  );
};

export default Community;
