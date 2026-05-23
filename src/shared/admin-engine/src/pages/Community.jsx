import { useState } from 'react';
import {
  Users, Calendar, Plus, TrendingUp, TrendingDown, Minus,
  Sparkles, CheckCircle2, X, ChevronRight, Globe,
  Briefcase, Heart, MapPin, Video, Mic, BookOpen,
  ArrowRight, BarChart3, Shield, Clock, Zap
} from 'lucide-react';
import {
  communityStats, aiCommunityRecommendations,
  communityGroups, communityEvents,
  communityTrends, communityConversionImpact
} from '../data/mockData';

// ── Config ──────────────────────────────────────────────

const MOMENT_CONFIG = {
  'graduation-approach':  { color: '#4ADE80', bg: 'rgba(74,222,128,0.10)',  label: 'Graduation Approach' },
  'ovhc-high-intent':     { color: '#38B6FF', bg: 'rgba(56,182,255,0.10)',  label: 'OVHC Intent' },
  'new-arrival-dropoff':  { color: '#FF4D6A', bg: 'rgba(255,77,106,0.10)',  label: 'New Arrival' },
};

const GROUP_TYPE_CONFIG = {
  University: { color: '#38B6FF', bg: 'rgba(56,182,255,0.10)',  icon: BookOpen },
  Hometown:   { color: '#8B5CF6', bg: 'rgba(139,92,246,0.10)', icon: MapPin },
  Profession: { color: '#F5B544', bg: 'rgba(245,181,68,0.10)',  icon: Briefcase },
  Interest:   { color: '#6EE7F2', bg: 'rgba(110,231,242,0.10)', icon: Heart },
};

const EVENT_TYPE_CONFIG = {
  'Webinar':       { color: '#38B6FF', bg: 'rgba(56,182,255,0.10)',  icon: Video },
  'Virtual Panel': { color: '#8B5CF6', bg: 'rgba(139,92,246,0.10)', icon: Mic },
  'In-Person':     { color: '#4ADE80', bg: 'rgba(74,222,128,0.10)',  icon: Users },
};

const ACTIVITY_CONFIG = {
  High:   { color: '#4ADE80', bg: 'rgba(74,222,128,0.10)' },
  Medium: { color: '#F5B544', bg: 'rgba(245,181,68,0.10)' },
  Low:    { color: '#FF4D6A', bg: 'rgba(255,77,106,0.10)' },
};

const EVENT_STATUS_CONFIG = {
  upcoming: { color: '#38B6FF', bg: 'rgba(56,182,255,0.10)',  label: 'Upcoming' },
  past:     { color: '#5D6577', bg: 'rgba(93,101,119,0.10)',  label: 'Past' },
  draft:    { color: '#F5B544', bg: 'rgba(245,181,68,0.10)',  label: 'Draft' },
};

const GROUP_FILTERS  = ['All', 'University', 'Hometown', 'Profession', 'Interest'];
const EVENT_FILTERS  = ['All', 'Upcoming', 'Past', 'Draft'];

// ── Main page ───────────────────────────────────────────

export default function Community() {
  const [activeTab,    setActiveTab]    = useState('groups');
  const [groupFilter,  setGroupFilter]  = useState('All');
  const [eventFilter,  setEventFilter]  = useState('All');
  const [showEvent,    setShowEvent]    = useState(false);
  const [showGroup,    setShowGroup]    = useState(false);
  const [activeRec,    setActiveRec]    = useState(null);
  const [dismissed,    setDismissed]    = useState([]);
  const [toast,        setToast]        = useState('');

  const notify = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const openFromRec = (rec) => {
    setActiveRec(rec);
    rec.type === 'event' ? setShowEvent(true) : setShowGroup(true);
  };

  const filteredGroups = communityGroups.filter(g =>
    groupFilter === 'All' || g.type === groupFilter
  );

  const filteredEvents = communityEvents.filter(e =>
    eventFilter === 'All' || e.status === eventFilter.toLowerCase()
  );

  const visibleRecs = aiCommunityRecommendations.filter(r => !dismissed.includes(r.id));

  return (
    <div className="cm-root">

      {/* TOAST */}
      {toast && (
        <div className="cm-toast"><CheckCircle2 size={15} /> {toast}</div>
      )}

      {/* ── HEADER ── */}
      <div className="cm-header">
        <div>
          <h1>Community &amp; Events</h1>
          <p className="cm-subtitle">
            What you create here appears directly in students' Companion App — the Community AI Agent surfaces what to build next.
          </p>
        </div>
        <div className="cm-header-right">
          <div className="cm-agent-badge">
            <span className="cm-ai-dot" />
            Community AI Agent Active
          </div>
          <button className="cm-btn-create-group" onClick={() => { setActiveRec(null); setShowGroup(true); }}>
            <Users size={14} /> New Group
          </button>
          <button className="cm-btn-create-event" onClick={() => { setActiveRec(null); setShowEvent(true); }}>
            <Calendar size={14} /> New Event
          </button>
        </div>
      </div>

      {/* ── STATS ROW ── */}
      <div className="cm-stats-row">
        {[
          { label: 'Active Groups',        value: communityStats.activeGroups,      sub: `${communityStats.groupGrowthRate} this month` },
          { label: 'Upcoming Events',      value: communityStats.upcomingEvents,    sub: 'Next 30 days' },
          { label: 'Total Members',        value: communityStats.totalMembers.toLocaleString(), sub: 'Across all groups' },
          { label: 'AI Recommendations',   value: communityStats.aiRecommendations, sub: 'Awaiting review', accent: true },
        ].map((s, i) => (
          <div key={i} className={`cm-stat-card${s.accent ? ' cm-stat-accent' : ''}`}>
            <span className="cm-stat-val">{s.value}</span>
            <span className="cm-stat-label">{s.label}</span>
            <span className="cm-stat-sub">{s.sub}</span>
          </div>
        ))}
      </div>

      {/* ── AI RECOMMENDATIONS ── */}
      <section className="cm-section">
        <div className="cm-section-head">
          <div className="cm-section-title">
            <Sparkles size={16} className="cm-icon-ai" />
            <span>Community AI Agent — Recommendations</span>
          </div>
          <span className="cm-ai-badge-pill">{visibleRecs.length} pending</span>
        </div>

        <div className="cm-rec-grid">
          {visibleRecs.map(rec => {
            const moment = rec.lifecycleMoment ? MOMENT_CONFIG[rec.lifecycleMoment] : null;
            return (
              <div key={rec.id} className="cm-rec-card">
                <div className="cm-rec-top">
                  <div className="cm-rec-type-chip">
                    {rec.type === 'event' ? <Calendar size={11} /> : <Users size={11} />}
                    {rec.type === 'event' ? 'New Event' : 'New Group'}
                  </div>
                  <button className="cm-rec-dismiss" onClick={() => setDismissed(d => [...d, rec.id])}>
                    <X size={13} />
                  </button>
                </div>

                <h3 className="cm-rec-title">{rec.title}</h3>

                <div className="cm-rec-reasoning">
                  <Sparkles size={11} className="cm-icon-ai" style={{flexShrink: 0, marginTop: 2}} />
                  <p>{rec.reasoning}</p>
                </div>

                <div className="cm-rec-meta-row">
                  {moment && (
                    <span className="cm-rec-moment" style={{ background: moment.bg, color: moment.color }}>
                      {moment.label}
                    </span>
                  )}
                  <span className="cm-rec-cohort">{rec.targetCohort}</span>
                </div>

                <div className="cm-rec-foot">
                  <div className="cm-rec-impact">
                    <span className="cm-rec-impact-val">
                      {rec.type === 'event'
                        ? `Est. ${rec.predictedAttendance} RSVPs`
                        : `Est. ${rec.predictedMembers} members`}
                    </span>
                    <span className="cm-rec-conf">{rec.confidence} confidence</span>
                  </div>
                  <button className="cm-btn-create-from-rec" onClick={() => openFromRec(rec)}>
                    Create from template <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            );
          })}

          {visibleRecs.length === 0 && (
            <div className="cm-rec-empty">
              <CheckCircle2 size={20} className="cm-icon-success" />
              <span>All recommendations reviewed</span>
            </div>
          )}
        </div>
      </section>

      {/* ── MAIN SPLIT ── */}
      <div className="cm-split">

        {/* LEFT: TABBED GROUPS / EVENTS */}
        <div className="cm-col-main">
          <div className="cm-tab-strip">
            <button
              className={`cm-tab${activeTab === 'groups' ? ' cm-tab-active' : ''}`}
              onClick={() => setActiveTab('groups')}
            >
              <Users size={14} /> Active Groups
              <span className="cm-tab-count">{communityGroups.length}</span>
            </button>
            <button
              className={`cm-tab${activeTab === 'events' ? ' cm-tab-active' : ''}`}
              onClick={() => setActiveTab('events')}
            >
              <Calendar size={14} /> Events
              <span className="cm-tab-count">{communityEvents.length}</span>
            </button>
          </div>

          {/* GROUPS TAB */}
          {activeTab === 'groups' && (
            <div className="cm-tab-body">
              <div className="cm-filter-strip">
                {GROUP_FILTERS.map(f => (
                  <button
                    key={f}
                    className={`cm-filter-chip${groupFilter === f ? ' cm-filter-active' : ''}`}
                    onClick={() => setGroupFilter(f)}
                  >
                    {f}
                  </button>
                ))}
                <button className="cm-btn-new-sm" onClick={() => { setActiveRec(null); setShowGroup(true); }}>
                  <Plus size={12} /> New Group
                </button>
              </div>

              <div className="cm-list">
                {filteredGroups.map(group => {
                  const tc = GROUP_TYPE_CONFIG[group.type];
                  const ac = ACTIVITY_CONFIG[group.activity];
                  const TypeIcon = tc.icon;
                  return (
                    <div key={group.id} className={`cm-group-row${group.status === 'draft' ? ' cm-row-draft' : ''}`}>
                      <div className="cm-group-icon" style={{ background: tc.bg, color: tc.color }}>
                        <TypeIcon size={14} />
                      </div>
                      <div className="cm-group-info">
                        <span className="cm-group-name">{group.name}</span>
                        <span className="cm-group-meta">
                          <span className="cm-group-type" style={{ color: tc.color }}>{group.type}</span>
                          · {group.members.toLocaleString()} members
                          · <span style={{ color: group.growth.startsWith('-') ? '#FF4D6A' : '#4ADE80' }}>{group.growth}</span>
                        </span>
                      </div>
                      <div className="cm-group-signals">
                        <span className="cm-activity-chip" style={{ background: ac.bg, color: ac.color }}>
                          {group.activity}
                        </span>
                        <span className={`cm-status-dot ${group.status === 'live' ? 'cm-dot-live' : 'cm-dot-draft'}`}>
                          {group.status === 'live' ? 'Live in App' : 'Draft'}
                        </span>
                      </div>
                      <span className="cm-group-last">
                        <Clock size={11} /> {group.lastActive}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* EVENTS TAB */}
          {activeTab === 'events' && (
            <div className="cm-tab-body">
              <div className="cm-filter-strip">
                {EVENT_FILTERS.map(f => (
                  <button
                    key={f}
                    className={`cm-filter-chip${eventFilter === f ? ' cm-filter-active' : ''}`}
                    onClick={() => setEventFilter(f)}
                  >
                    {f}
                  </button>
                ))}
                <button className="cm-btn-new-sm" onClick={() => { setActiveRec(null); setShowEvent(true); }}>
                  <Plus size={12} /> New Event
                </button>
              </div>

              <div className="cm-list">
                {filteredEvents.map(event => {
                  const tc = EVENT_TYPE_CONFIG[event.type];
                  const sc = EVENT_STATUS_CONFIG[event.status];
                  const TypeIcon = tc.icon;
                  const pct = Math.round((event.rsvp / event.capacity) * 100);
                  return (
                    <div key={event.id} className={`cm-event-row${event.status === 'draft' ? ' cm-row-draft' : ''}`}>
                      <div className="cm-event-icon" style={{ background: tc.bg, color: tc.color }}>
                        <TypeIcon size={14} />
                      </div>
                      <div className="cm-event-info">
                        <span className="cm-event-name">{event.title}</span>
                        <span className="cm-event-meta">
                          <span style={{ color: tc.color }}>{event.type}</span>
                          · {event.date} · {event.time}
                        </span>
                        <span className="cm-event-cohort">{event.targetCohort}</span>
                      </div>
                      <div className="cm-event-rsvp">
                        {event.status === 'past' ? (
                          <>
                            <span className="cm-rsvp-val">{event.attendees}</span>
                            <span className="cm-rsvp-sub">attended</span>
                          </>
                        ) : (
                          <>
                            <span className="cm-rsvp-val">{event.rsvp} / {event.capacity}</span>
                            <div className="cm-rsvp-bar-bg">
                              <div className="cm-rsvp-bar-fill" style={{ width: `${pct}%`, background: tc.color }} />
                            </div>
                            <span className="cm-rsvp-sub">{pct}% capacity</span>
                          </>
                        )}
                      </div>
                      <span className="cm-event-status-pill" style={{ background: sc.bg, color: sc.color }}>
                        {sc.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: TREND INTELLIGENCE */}
        <div className="cm-col-side">

          <div className="cm-side-card">
            <div className="cm-side-head">
              <Sparkles size={14} className="cm-icon-ai" />
              <span>What Students Are Asking</span>
              <span className="cm-side-sub">via MediGuide · last 30 days</span>
            </div>
            <div className="cm-trend-list">
              {communityTrends.map((t, i) => {
                const moment = t.lifecycleMoment ? MOMENT_CONFIG[t.lifecycleMoment] : null;
                const TrendIcon = t.trend === 'up' ? TrendingUp : t.trend === 'down' ? TrendingDown : Minus;
                const trendColor = t.trend === 'up' ? '#4ADE80' : t.trend === 'down' ? '#FF4D6A' : '#5D6577';
                return (
                  <div key={i} className="cm-trend-row">
                    <div className="cm-trend-left">
                      <span className="cm-trend-topic">{t.topic}</span>
                      <div className="cm-trend-tags">
                        {moment && (
                          <span className="cm-trend-moment" style={{ background: moment.bg, color: moment.color }}>
                            {moment.label}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="cm-trend-right">
                      <span className="cm-trend-vol">{t.queries.toLocaleString()}</span>
                      <span className="cm-trend-arrow" style={{ color: trendColor }}>
                        <TrendIcon size={13} /> {t.trendPct}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="cm-side-card cm-mt-20">
            <div className="cm-side-head">
              <BarChart3 size={14} className="cm-icon-muted" />
              <span>Community Health</span>
            </div>
            <div className="cm-health-list">
              {[
                { label: 'Group growth rate',       value: communityStats.groupGrowthRate,     positive: true },
                { label: 'Avg event attendance',    value: communityStats.avgEventAttendance,  positive: true },
                { label: 'Highest engagement',      value: communityStats.highestEngagement,   positive: true },
                { label: 'Needs attention',         value: communityStats.lowestEngagement,    positive: false },
              ].map((h, i) => (
                <div key={i} className="cm-health-row">
                  <span className="cm-health-label">{h.label}</span>
                  <span className="cm-health-val" style={{ color: h.positive ? '#4ADE80' : '#FF4D6A' }}>{h.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── CONVERSION IMPACT ── */}
      <section className="cm-impact-panel">
        <div className="cm-impact-headline">
          <div className="cm-impact-stat">
            <span className="cm-impact-multiplier">{communityStats.conversionMultiplier}</span>
            <div className="cm-impact-stat-text">
              <span className="cm-impact-stat-main">more likely to engage with OVHC content</span>
              <span className="cm-impact-stat-sub">Students who attended a Medibank event in the last 90 days</span>
            </div>
          </div>
          <div className="cm-impact-divider" />
          <div className="cm-impact-cards">
            {communityConversionImpact.map((item, i) => (
              <div key={i} className="cm-impact-card">
                <span className="cm-impact-event">{item.event}</span>
                <span className="cm-impact-date">{item.date} · {item.attendees} attended</span>
                <div className="cm-impact-card-stats">
                  <div>
                    <span className="cm-impact-card-val" style={{ color: '#38B6FF' }}>{item.ovhcEngaged}</span>
                    <span className="cm-impact-card-lbl">OVHC engaged</span>
                  </div>
                  <div>
                    <span className="cm-impact-card-val" style={{ color: '#4ADE80' }}>{item.conversionRate}</span>
                    <span className="cm-impact-card-lbl">conversion rate</span>
                  </div>
                  <div>
                    <span className="cm-impact-card-val" style={{ color: '#4ADE80' }}>{item.revenue}</span>
                    <span className="cm-impact-card-lbl">revenue</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXEC SUMMARY ── */}
      <div className="cm-exec-summary">
        <Sparkles size={20} className="cm-icon-ai" style={{flexShrink: 0, marginTop: 2}} />
        <div>
          <span className="cm-exec-label">Strategic Summary · Community Engagement Agent</span>
          <p className="cm-exec-text">
            "The graduation-approach cohort represents the highest-value community opportunity right now — 2,340 students are asking graduate visa questions with no existing Medibank content to meet them. A Graduate Visa Q&A event is projected to drive 420 RSVPs and positions Medibank as the trusted advisor at the most critical transition moment in a student's journey."
          </p>
        </div>
      </div>

      {/* ── MODALS ── */}
      {showEvent && (
        <CreateEventModal
          rec={activeRec?.type === 'event' ? activeRec : null}
          onClose={() => { setShowEvent(false); setActiveRec(null); }}
          onPublish={(title) => { setShowEvent(false); setActiveRec(null); notify(`Event published: ${title}`); }}
        />
      )}

      {showGroup && (
        <CreateGroupModal
          rec={activeRec?.type === 'group' ? activeRec : null}
          onClose={() => { setShowGroup(false); setActiveRec(null); }}
          onCreate={(name) => { setShowGroup(false); setActiveRec(null); notify(`Group created: ${name}`); }}
        />
      )}

      <style>{`
        /* ROOT */
        .cm-root {
          --ai:      #6EE7F2;
          --ai-wash: rgba(110,231,242,0.06);
          --success: #4ADE80;
          --warning: #F5B544;
          --danger:  #FF4D6A;
          --human:   #38B6FF;
          font-family: var(--font-sans);
          color: var(--fg-2);
          padding-bottom: 80px;
        }

        /* HEADER */
        .cm-header {
          display: flex; justify-content: space-between; align-items: flex-start;
          margin-bottom: 28px;
        }
        .cm-header h1 { font-size: 30px; font-weight: 700; color: var(--fg-1); letter-spacing: -0.03em; margin: 0 0 6px; }
        .cm-subtitle  { font-size: 14px; color: var(--fg-4); margin: 0; max-width: 560px; }
        .cm-header-right { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }

        .cm-agent-badge {
          display: flex; align-items: center; gap: 8px;
          background: var(--ai-wash); border: 1px solid rgba(110,231,242,0.2);
          color: var(--ai); padding: 6px 14px; border-radius: 20px;
          font-size: 12px; font-weight: 600;
        }
        .cm-ai-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--ai); box-shadow: 0 0 8px var(--ai);
          animation: cmPulse 2s infinite;
        }
        @keyframes cmPulse {
          0%,100% { opacity: 1; transform: scale(0.95); }
          50%      { opacity: 0.6; transform: scale(1.1); }
        }

        .cm-btn-create-group {
          display: flex; align-items: center; gap: 6px;
          background: rgba(255,255,255,0.06); border: 1px solid var(--line-strong);
          color: var(--fg-1); padding: 7px 14px; border-radius: 8px;
          font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s;
        }
        .cm-btn-create-group:hover { background: rgba(255,255,255,0.1); }

        .cm-btn-create-event {
          display: flex; align-items: center; gap: 6px;
          background: linear-gradient(180deg, #FF1F3A 0%, var(--medibank-red) 100%);
          border: none; color: #fff; padding: 7px 16px; border-radius: 8px;
          font-size: 13px; font-weight: 700; cursor: pointer; transition: all 0.2s;
          box-shadow: 0 2px 8px rgba(221,8,34,0.3);
        }
        .cm-btn-create-event:hover { box-shadow: 0 4px 16px rgba(221,8,34,0.5); transform: translateY(-1px); }

        /* STATS */
        .cm-stats-row {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
          margin-bottom: 36px;
        }
        .cm-stat-card {
          background: var(--bg-2); border: 1px solid var(--line); border-radius: 12px;
          padding: 20px; display: flex; flex-direction: column; gap: 4px;
        }
        .cm-stat-card.cm-stat-accent {
          background: var(--ai-wash); border-color: rgba(110,231,242,0.2);
        }
        .cm-stat-val   { font-size: 28px; font-weight: 700; color: var(--fg-1); letter-spacing: -0.03em; }
        .cm-stat-label { font-size: 13px; font-weight: 600; color: var(--fg-3); }
        .cm-stat-sub   { font-size: 12px; color: var(--fg-4); }
        .cm-stat-accent .cm-stat-val { color: var(--ai); }

        /* SECTIONS */
        .cm-section { margin-bottom: 36px; }
        .cm-section-head {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 20px; padding-bottom: 12px;
          border-bottom: 1px solid var(--line-soft);
        }
        .cm-section-title {
          display: flex; align-items: center; gap: 8px;
          font-size: 15px; font-weight: 600; color: var(--fg-1);
        }
        .cm-ai-badge-pill {
          margin-left: auto;
          background: var(--ai-wash); border: 1px solid rgba(110,231,242,0.2);
          color: var(--ai); padding: 3px 10px; border-radius: 20px;
          font-size: 11px; font-weight: 700;
        }

        /* AI RECOMMENDATIONS */
        .cm-rec-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
        }
        .cm-rec-card {
          background: var(--bg-2); border: 1px solid rgba(110,231,242,0.15);
          border-radius: 12px; padding: 20px; display: flex; flex-direction: column; gap: 14px;
          box-shadow: 0 0 0 1px rgba(110,231,242,0.05), 0 4px 16px rgba(0,0,0,0.2);
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .cm-rec-card:hover {
          border-color: rgba(110,231,242,0.3);
          box-shadow: 0 0 20px rgba(110,231,242,0.06), 0 8px 24px rgba(0,0,0,0.3);
        }
        .cm-rec-top { display: flex; justify-content: space-between; align-items: center; }
        .cm-rec-type-chip {
          display: flex; align-items: center; gap: 5px;
          background: var(--ai-wash); border: 1px solid rgba(110,231,242,0.2);
          color: var(--ai); padding: 3px 10px; border-radius: 20px;
          font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px;
        }
        .cm-rec-dismiss {
          background: none; border: none; color: var(--fg-4); cursor: pointer; padding: 4px;
          border-radius: 4px; transition: color 0.2s;
        }
        .cm-rec-dismiss:hover { color: var(--fg-1); }
        .cm-rec-title { font-size: 16px; font-weight: 700; color: var(--fg-1); letter-spacing: -0.02em; margin: 0; }
        .cm-rec-reasoning {
          display: flex; gap: 8px; align-items: flex-start;
          background: rgba(110,231,242,0.04); border: 1px solid rgba(110,231,242,0.1);
          border-radius: 8px; padding: 10px 12px;
          font-size: 13px; color: var(--fg-3); line-height: 1.5; font-style: italic;
        }
        .cm-rec-meta-row { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
        .cm-rec-moment {
          font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;
          text-transform: uppercase; letter-spacing: 0.3px;
        }
        .cm-rec-cohort { font-size: 12px; color: var(--fg-4); }
        .cm-rec-foot {
          display: flex; justify-content: space-between; align-items: center;
          padding-top: 12px; border-top: 1px solid var(--line-soft);
          margin-top: auto;
        }
        .cm-rec-impact { display: flex; flex-direction: column; gap: 2px; }
        .cm-rec-impact-val { font-size: 15px; font-weight: 700; color: var(--fg-1); }
        .cm-rec-conf      { font-size: 11px; color: var(--fg-4); }
        .cm-btn-create-from-rec {
          display: flex; align-items: center; gap: 5px;
          background: var(--ai-wash); border: 1px solid rgba(110,231,242,0.25);
          color: var(--ai); padding: 7px 12px; border-radius: 7px;
          font-size: 12px; font-weight: 700; cursor: pointer; transition: all 0.2s;
          white-space: nowrap;
        }
        .cm-btn-create-from-rec:hover { background: rgba(110,231,242,0.12); }

        .cm-rec-empty {
          grid-column: 1 / -1;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          padding: 40px; color: var(--fg-4); font-size: 14px; font-weight: 600;
        }

        /* SPLIT LAYOUT */
        .cm-split { display: grid; grid-template-columns: 1.5fr 1fr; gap: 28px; margin-bottom: 36px; }

        /* TABS */
        .cm-tab-strip {
          display: flex; gap: 0; border-bottom: 1px solid var(--line);
          margin-bottom: 0;
        }
        .cm-tab {
          display: flex; align-items: center; gap: 7px;
          padding: 12px 18px; font-size: 13px; font-weight: 600;
          color: var(--fg-4); background: none; border: none; border-bottom: 2px solid transparent;
          cursor: pointer; transition: all 0.2s; margin-bottom: -1px;
        }
        .cm-tab:hover { color: var(--fg-1); }
        .cm-tab-active { color: var(--fg-1) !important; border-bottom-color: var(--medibank-red) !important; }
        .cm-tab-count {
          background: rgba(255,255,255,0.07); border: 1px solid var(--line);
          color: var(--fg-4); font-size: 11px; font-weight: 700;
          padding: 1px 7px; border-radius: 20px;
        }
        .cm-tab-active .cm-tab-count { background: rgba(221,8,34,0.1); border-color: rgba(221,8,34,0.2); color: #FF4D6A; }

        .cm-tab-body {
          background: var(--bg-2); border: 1px solid var(--line); border-top: none;
          border-radius: 0 0 12px 12px; overflow: hidden;
        }

        /* FILTERS */
        .cm-filter-strip {
          display: flex; align-items: center; gap: 8px;
          padding: 14px 16px; border-bottom: 1px solid var(--line-soft);
          flex-wrap: wrap;
        }
        .cm-filter-chip {
          padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;
          background: transparent; border: 1px solid var(--line); color: var(--fg-4);
          cursor: pointer; transition: all 0.15s;
        }
        .cm-filter-chip:hover { border-color: var(--line-strong); color: var(--fg-2); }
        .cm-filter-active { background: rgba(221,8,34,0.08) !important; border-color: rgba(221,8,34,0.3) !important; color: #FF4D6A !important; }
        .cm-btn-new-sm {
          display: flex; align-items: center; gap: 5px; margin-left: auto;
          background: rgba(255,255,255,0.05); border: 1px solid var(--line-strong);
          color: var(--fg-2); padding: 4px 12px; border-radius: 7px;
          font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s;
        }
        .cm-btn-new-sm:hover { background: rgba(255,255,255,0.09); }

        /* GROUP ROWS */
        .cm-list { display: flex; flex-direction: column; }
        .cm-group-row, .cm-event-row {
          display: flex; align-items: center; gap: 14px;
          padding: 14px 16px; border-bottom: 1px solid var(--line-soft);
          transition: background 0.15s;
        }
        .cm-group-row:last-child, .cm-event-row:last-child { border-bottom: none; }
        .cm-group-row:hover, .cm-event-row:hover { background: rgba(255,255,255,0.02); }
        .cm-row-draft { opacity: 0.7; }

        .cm-group-icon, .cm-event-icon {
          width: 34px; height: 34px; border-radius: 8px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .cm-group-info, .cm-event-info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 3px; }
        .cm-group-name, .cm-event-name { font-size: 14px; font-weight: 600; color: var(--fg-1); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .cm-group-meta, .cm-event-meta { font-size: 12px; color: var(--fg-4); }
        .cm-event-cohort { font-size: 11px; color: var(--fg-5); }

        .cm-group-signals { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
        .cm-activity-chip { font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px; }
        .cm-status-dot {
          font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;
          display: flex; align-items: center; gap: 4px;
        }
        .cm-status-dot::before {
          content: ''; width: 5px; height: 5px; border-radius: 50%;
        }
        .cm-dot-live   { background: rgba(74,222,128,0.1);  color: #4ADE80; }
        .cm-dot-live::before   { background: #4ADE80; box-shadow: 0 0 4px #4ADE80; }
        .cm-dot-draft  { background: rgba(245,181,68,0.1);  color: #F5B544; }
        .cm-dot-draft::before  { background: #F5B544; }
        .cm-group-last { font-size: 11px; color: var(--fg-5); display: flex; align-items: center; gap: 4px; white-space: nowrap; flex-shrink: 0; }

        /* EVENT ROWS */
        .cm-event-rsvp { display: flex; flex-direction: column; gap: 4px; align-items: flex-end; flex-shrink: 0; min-width: 90px; }
        .cm-rsvp-val { font-size: 13px; font-weight: 700; color: var(--fg-1); }
        .cm-rsvp-sub { font-size: 11px; color: var(--fg-4); }
        .cm-rsvp-bar-bg { width: 80px; height: 3px; background: rgba(255,255,255,0.07); border-radius: 2px; overflow: hidden; }
        .cm-rsvp-bar-fill { height: 100%; border-radius: 2px; transition: width 0.3s; }
        .cm-event-status-pill { font-size: 11px; font-weight: 700; padding: 3px 9px; border-radius: 20px; white-space: nowrap; flex-shrink: 0; }

        /* RIGHT COLUMN */
        .cm-side-card {
          background: var(--bg-2); border: 1px solid var(--line); border-radius: 12px; overflow: hidden;
        }
        .cm-mt-20 { margin-top: 20px; }
        .cm-side-head {
          display: flex; align-items: center; gap: 8px;
          padding: 14px 16px; border-bottom: 1px solid var(--line-soft);
          font-size: 13px; font-weight: 600; color: var(--fg-1);
        }
        .cm-side-sub { font-size: 11px; color: var(--fg-4); margin-left: auto; }

        .cm-trend-list { display: flex; flex-direction: column; }
        .cm-trend-row {
          display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;
          padding: 12px 16px; border-bottom: 1px solid var(--line-soft);
        }
        .cm-trend-row:last-child { border-bottom: none; }
        .cm-trend-left { display: flex; flex-direction: column; gap: 5px; flex: 1; min-width: 0; }
        .cm-trend-topic { font-size: 13px; font-weight: 600; color: var(--fg-1); }
        .cm-trend-tags  { display: flex; gap: 5px; flex-wrap: wrap; }
        .cm-trend-moment { font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 20px; letter-spacing: 0.3px; }
        .cm-trend-right { display: flex; flex-direction: column; align-items: flex-end; gap: 3px; flex-shrink: 0; }
        .cm-trend-vol   { font-size: 14px; font-weight: 700; color: var(--fg-1); }
        .cm-trend-arrow { display: flex; align-items: center; gap: 3px; font-size: 11px; font-weight: 700; }

        .cm-health-list { display: flex; flex-direction: column; }
        .cm-health-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 12px 16px; border-bottom: 1px solid var(--line-soft);
        }
        .cm-health-row:last-child { border-bottom: none; }
        .cm-health-label { font-size: 13px; color: var(--fg-4); }
        .cm-health-val   { font-size: 13px; font-weight: 700; }

        /* CONVERSION IMPACT */
        .cm-impact-panel {
          background: var(--bg-2); border: 1px solid var(--line); border-radius: 14px;
          padding: 28px 32px; margin-bottom: 24px;
          background: linear-gradient(120deg, rgba(56,182,255,0.04) 0%, rgba(74,222,128,0.04) 100%);
        }
        .cm-impact-headline { display: flex; align-items: center; gap: 32px; }
        .cm-impact-stat { display: flex; align-items: center; gap: 20px; flex-shrink: 0; }
        .cm-impact-multiplier {
          font-size: 56px; font-weight: 800; letter-spacing: -2px;
          background: linear-gradient(135deg, #4ADE80, #38B6FF);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .cm-impact-stat-text { display: flex; flex-direction: column; gap: 4px; max-width: 180px; }
        .cm-impact-stat-main { font-size: 15px; font-weight: 700; color: var(--fg-1); line-height: 1.3; }
        .cm-impact-stat-sub  { font-size: 12px; color: var(--fg-4); }
        .cm-impact-divider   { width: 1px; height: 80px; background: var(--line); flex-shrink: 0; }
        .cm-impact-cards { display: flex; gap: 16px; flex: 1; }
        .cm-impact-card {
          flex: 1; background: var(--bg-1); border: 1px solid var(--line); border-radius: 10px;
          padding: 16px; display: flex; flex-direction: column; gap: 6px;
        }
        .cm-impact-event { font-size: 13px; font-weight: 700; color: var(--fg-1); }
        .cm-impact-date  { font-size: 11px; color: var(--fg-4); }
        .cm-impact-card-stats { display: flex; gap: 16px; margin-top: 8px; padding-top: 10px; border-top: 1px solid var(--line-soft); }
        .cm-impact-card-stats > div { display: flex; flex-direction: column; gap: 2px; }
        .cm-impact-card-val { font-size: 18px; font-weight: 700; letter-spacing: -0.5px; }
        .cm-impact-card-lbl { font-size: 10px; color: var(--fg-5); text-transform: uppercase; letter-spacing: 0.4px; font-weight: 600; }

        /* EXEC SUMMARY */
        .cm-exec-summary {
          display: flex; gap: 20px; align-items: flex-start; padding: 28px 32px;
          background: var(--ai-wash); border: 1px solid rgba(110,231,242,0.12);
          border-radius: 14px;
        }
        .cm-exec-label { font-size: 11px; text-transform: uppercase; font-weight: 700; color: var(--ai); letter-spacing: 0.5px; display: block; margin-bottom: 8px; }
        .cm-exec-text  { font-size: 15px; font-weight: 400; line-height: 1.7; color: var(--fg-1); font-style: italic; margin: 0; font-family: var(--font-display); }

        /* UTILITY */
        .cm-icon-ai     { color: var(--ai); }
        .cm-icon-muted  { color: var(--fg-4); }
        .cm-icon-success { color: var(--success); }

        /* TOAST */
        .cm-toast {
          position: fixed; bottom: 28px; right: 28px; z-index: 9999;
          background: var(--fg-1); color: var(--bg-0);
          padding: 11px 20px; border-radius: 8px; font-size: 13px; font-weight: 700;
          display: flex; align-items: center; gap: 8px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.4);
          animation: cmSlideUp 0.3s ease forwards;
        }
        @keyframes cmSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ── Create Event Modal ──────────────────────────────────

function CreateEventModal({ rec, onClose, onPublish }) {
  const [form, setForm] = useState({
    title:      rec?.title || '',
    type:       rec?.suggestedType || 'Webinar',
    date:       rec?.suggestedDate || '',
    time:       '',
    capacity:   '',
    cohort:     rec?.targetCohort || '',
    description: rec?.suggestedDescription || '',
    visibility: 'draft'
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const prefilledFromAI = !!rec;

  return (
    <div className="cm-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="cm-modal" style={{animation: 'cmModalIn 0.25s cubic-bezier(0.16,1,0.3,1)'}}>

        <div className="cm-modal-header">
          <div>
            {prefilledFromAI && (
              <div className="cm-modal-ai-pill">
                <Sparkles size={11} /> AI pre-filled from recommendation
              </div>
            )}
            <h2 className="cm-modal-title">Create Event</h2>
          </div>
          <button className="cm-modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="cm-modal-body">
          <div className="cm-form-group">
            <label className="cm-label">Event Title</label>
            <input className="cm-input" value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. Graduate Visa Q&A" />
          </div>

          <div className="cm-form-group">
            <label className="cm-label">Event Type</label>
            <div className="cm-type-selector">
              {['Webinar', 'Virtual Panel', 'In-Person'].map(t => {
                const cfg = EVENT_TYPE_CONFIG[t];
                return (
                  <button
                    key={t}
                    className={`cm-type-btn${form.type === t ? ' cm-type-selected' : ''}`}
                    style={form.type === t ? { borderColor: cfg.color, color: cfg.color, background: cfg.bg } : {}}
                    onClick={() => set('type', t)}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="cm-form-row">
            <div className="cm-form-group">
              <label className="cm-label">Date</label>
              <input className="cm-input" type="text" value={form.date} onChange={e => set('date', e.target.value)} placeholder="e.g. Nov 5, 2026" />
            </div>
            <div className="cm-form-group">
              <label className="cm-label">Time (AEDT)</label>
              <input className="cm-input" type="text" value={form.time} onChange={e => set('time', e.target.value)} placeholder="e.g. 6:00 PM" />
            </div>
            <div className="cm-form-group">
              <label className="cm-label">Capacity</label>
              <input className="cm-input" type="number" value={form.capacity} onChange={e => set('capacity', e.target.value)} placeholder="e.g. 500" />
            </div>
          </div>

          <div className="cm-form-group">
            <label className="cm-label">Target Audience</label>
            <input className="cm-input" value={form.cohort} onChange={e => set('cohort', e.target.value)} placeholder="e.g. Graduating students · RMIT, Monash" />
          </div>

          <div className="cm-form-group">
            <label className="cm-label">Description</label>
            <textarea
              className="cm-textarea"
              rows={4}
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="What students will learn or experience at this event…"
            />
          </div>

          <div className="cm-form-group">
            <label className="cm-label">Visibility</label>
            <div className="cm-vis-selector">
              {[
                { key: 'draft',    label: 'Save as Draft',  sub: 'Not visible to students yet' },
                { key: 'publish',  label: 'Publish Now',    sub: 'Live in Companion App immediately' },
              ].map(v => (
                <button
                  key={v.key}
                  className={`cm-vis-btn${form.visibility === v.key ? ' cm-vis-selected' : ''}`}
                  onClick={() => set('visibility', v.key)}
                >
                  <span className="cm-vis-label">{v.label}</span>
                  <span className="cm-vis-sub">{v.sub}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="cm-modal-footer">
          <button className="cm-modal-btn-cancel" onClick={onClose}>Cancel</button>
          <button
            className="cm-modal-btn-publish"
            onClick={() => onPublish(form.title || 'Untitled Event')}
            disabled={!form.title}
          >
            {form.visibility === 'publish' ? <><Zap size={14} /> Publish Event</> : <><Shield size={14} /> Save as Draft</>}
          </button>
        </div>
      </div>

      <style>{`
        .cm-overlay {
          position: fixed; inset: 0; z-index: 1000;
          background: rgba(0,0,0,0.65); backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center; padding: 24px;
        }
        .cm-modal {
          background: var(--bg-1); border: 1px solid var(--line-strong);
          border-radius: 16px; width: 100%; max-width: 560px; max-height: 90vh;
          display: flex; flex-direction: column; overflow: hidden;
          box-shadow: 0 40px 80px rgba(0,0,0,0.6);
          font-family: var(--font-sans); color: var(--fg-2);
        }
        @keyframes cmModalIn {
          from { opacity: 0; transform: scale(0.97) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .cm-modal-header {
          display: flex; justify-content: space-between; align-items: flex-start;
          padding: 24px 28px 20px; border-bottom: 1px solid var(--line);
          background: var(--bg-2); flex-shrink: 0;
        }
        .cm-modal-ai-pill {
          display: inline-flex; align-items: center; gap: 5px;
          background: var(--ai-wash); border: 1px solid rgba(110,231,242,0.2);
          color: var(--ai); padding: 2px 9px; border-radius: 20px;
          font-size: 11px; font-weight: 700; margin-bottom: 8px;
        }
        .cm-modal-title { font-size: 20px; font-weight: 700; color: var(--fg-1); margin: 0; letter-spacing: -0.02em; }
        .cm-modal-close {
          background: rgba(255,255,255,0.05); border: 1px solid var(--line-strong);
          color: var(--fg-1); width: 32px; height: 32px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0;
        }
        .cm-modal-close:hover { background: rgba(255,255,255,0.1); }

        .cm-modal-body { flex: 1; overflow-y: auto; padding: 24px 28px; display: flex; flex-direction: column; gap: 20px; }

        .cm-form-group { display: flex; flex-direction: column; gap: 7px; }
        .cm-form-row   { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }
        .cm-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--fg-4); }
        .cm-input, .cm-textarea {
          background: var(--bg-2); border: 1px solid var(--line-strong); border-radius: 8px;
          color: var(--fg-1); padding: 10px 14px; font-size: 13px; outline: none;
          font-family: var(--font-sans); transition: border-color 0.2s; width: 100%; box-sizing: border-box;
        }
        .cm-input::placeholder, .cm-textarea::placeholder { color: var(--fg-5); }
        .cm-input:focus, .cm-textarea:focus { border-color: var(--ai); box-shadow: 0 0 0 2px rgba(110,231,242,0.1); }
        .cm-textarea { resize: vertical; }

        .cm-type-selector { display: flex; gap: 8px; }
        .cm-type-btn {
          flex: 1; padding: 9px 12px; border-radius: 8px; font-size: 13px; font-weight: 600;
          background: var(--bg-2); border: 1px solid var(--line-strong); color: var(--fg-3);
          cursor: pointer; transition: all 0.15s;
        }
        .cm-type-btn:hover { border-color: var(--line-bright); color: var(--fg-1); }

        .cm-vis-selector { display: flex; gap: 10px; }
        .cm-vis-btn {
          flex: 1; padding: 12px 16px; border-radius: 8px; text-align: left;
          background: var(--bg-2); border: 1px solid var(--line-strong);
          cursor: pointer; transition: all 0.15s; display: flex; flex-direction: column; gap: 3px;
        }
        .cm-vis-btn:hover { border-color: var(--line-bright); }
        .cm-vis-selected { border-color: var(--medibank-red) !important; background: rgba(221,8,34,0.06) !important; }
        .cm-vis-label { font-size: 13px; font-weight: 700; color: var(--fg-1); }
        .cm-vis-sub   { font-size: 11px; color: var(--fg-4); }

        .cm-modal-footer {
          display: flex; justify-content: flex-end; gap: 10px;
          padding: 16px 28px; border-top: 1px solid var(--line); background: var(--bg-2); flex-shrink: 0;
        }
        .cm-modal-btn-cancel {
          background: transparent; border: 1px solid var(--line-strong); color: var(--fg-2);
          padding: 9px 18px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s;
          font-family: var(--font-sans);
        }
        .cm-modal-btn-cancel:hover { background: rgba(255,255,255,0.05); }
        .cm-modal-btn-publish {
          display: flex; align-items: center; gap: 7px;
          background: linear-gradient(180deg, #FF1F3A 0%, var(--medibank-red) 100%);
          border: none; color: #fff; padding: 9px 20px; border-radius: 8px;
          font-size: 13px; font-weight: 700; cursor: pointer; transition: all 0.2s;
          font-family: var(--font-sans); box-shadow: 0 2px 8px rgba(221,8,34,0.3);
        }
        .cm-modal-btn-publish:hover { box-shadow: 0 4px 16px rgba(221,8,34,0.5); }
        .cm-modal-btn-publish:disabled { opacity: 0.4; cursor: not-allowed; }
      `}</style>
    </div>
  );
}

// ── Create Group Modal ──────────────────────────────────

function CreateGroupModal({ rec, onClose, onCreate }) {
  const [form, setForm] = useState({
    name:        rec?.title || '',
    type:        rec?.suggestedType || 'University',
    description: rec?.suggestedDescription || '',
    privacy:     'public'
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const prefilledFromAI = !!rec;

  return (
    <div className="cm-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="cm-modal" style={{animation: 'cmModalIn 0.25s cubic-bezier(0.16,1,0.3,1)', maxWidth: '480px'}}>

        <div className="cm-modal-header">
          <div>
            {prefilledFromAI && (
              <div className="cm-modal-ai-pill">
                <Sparkles size={11} /> AI pre-filled from recommendation
              </div>
            )}
            <h2 className="cm-modal-title">Create Group</h2>
          </div>
          <button className="cm-modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="cm-modal-body">
          <div className="cm-form-group">
            <label className="cm-label">Group Name</label>
            <input className="cm-input" value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Nursing & Allied Health Professionals" />
          </div>

          <div className="cm-form-group">
            <label className="cm-label">Group Type</label>
            <div className="cm-type-selector" style={{flexWrap: 'wrap'}}>
              {['University', 'Hometown', 'Profession', 'Interest'].map(t => {
                const cfg = GROUP_TYPE_CONFIG[t];
                return (
                  <button
                    key={t}
                    className={`cm-type-btn${form.type === t ? ' cm-type-selected' : ''}`}
                    style={form.type === t ? { borderColor: cfg.color, color: cfg.color, background: cfg.bg } : {}}
                    onClick={() => set('type', t)}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="cm-form-group">
            <label className="cm-label">Description</label>
            <textarea
              className="cm-textarea"
              rows={4}
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="What is this group for? Who should join?"
            />
          </div>

          <div className="cm-form-group">
            <label className="cm-label">Privacy</label>
            <div className="cm-vis-selector">
              {[
                { key: 'public',       label: 'Public',       sub: 'Any student can discover and join' },
                { key: 'invite-only',  label: 'Invite-Only',  sub: 'Students must be invited to join' },
              ].map(v => (
                <button
                  key={v.key}
                  className={`cm-vis-btn${form.privacy === v.key ? ' cm-vis-selected' : ''}`}
                  onClick={() => set('privacy', v.key)}
                >
                  <span className="cm-vis-label">{v.label}</span>
                  <span className="cm-vis-sub">{v.sub}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="cm-modal-footer">
          <button className="cm-modal-btn-cancel" onClick={onClose}>Cancel</button>
          <button
            className="cm-modal-btn-publish"
            onClick={() => onCreate(form.name || 'Untitled Group')}
            disabled={!form.name}
          >
            <Users size={14} /> Create Group
          </button>
        </div>
      </div>
    </div>
  );
}
