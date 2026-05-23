import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, TrendingUp, TrendingDown, Minus, ArrowRight, Zap, Bell, Shield } from 'lucide-react';
import {
  leaderboardTabs, leaderboards, groupChallenge, nudges, activityUpdates, healthImpact,
} from '../data/healthData';
import './Health.css';

/* ── helpers ── */
const fmtSteps = (n) => n.toLocaleString();

const rankMedal = (rank) => {
  if (rank === 1) return { emoji: '🥇', cls: 'medal-gold' };
  if (rank === 2) return { emoji: '🥈', cls: 'medal-silver' };
  if (rank === 3) return { emoji: '🥉', cls: 'medal-bronze' };
  return null;
};

const DeltaIcon = ({ delta }) => {
  if (delta > 0) return <span className="delta up"><TrendingUp size={12} /> +{delta}</span>;
  if (delta < 0) return <span className="delta down"><TrendingDown size={12} /> {delta}</span>;
  return <span className="delta flat"><Minus size={12} /></span>;
};

/* ── LEADERBOARD ── */
export const Leaderboard = () => {
  const [tab, setTab] = useState('Friends');
  const rows = leaderboards[tab];
  return (
    <div className="health-card leaderboard-card">
      <div className="lb-tabs">
        {leaderboardTabs.map(t => (
          <button key={t} className={`lb-tab ${tab === t ? 'lb-tab-active' : ''}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className="lb-list">
        {rows.map((row, i) => {
          const medal = rankMedal(row.rank);
          const isTop3 = row.rank <= 3;
          if (i > 0 && row.isGap && rows[i - 1].rank < row.rank - 1) {
            return (
              <React.Fragment key={row.name}>
                <div className="lb-gap-row"><span>• • •</span><span>rank {row.rank - 1} — {row.rank}</span></div>
                <div className={`lb-row ${row.isUser ? 'lb-row-user' : ''} ${isTop3 ? 'lb-row-top3' : ''}`}>
                  <LbRowInner row={row} medal={medal} />
                </div>
              </React.Fragment>
            );
          }
          return (
            <div key={row.name} className={`lb-row ${row.isUser ? 'lb-row-user' : ''} ${isTop3 ? 'lb-row-top3' : ''}`}>
              <LbRowInner row={row} medal={medal} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const LbRowInner = ({ row, medal }) => (
  <>
    <div className="lb-rank-col">
      {medal ? <span className="lb-medal">{medal.emoji}</span> : <span className="lb-rank-num">#{row.rank}</span>}
    </div>
    <span className="lb-avatar">{row.avatar}</span>
    <div className="lb-name-col">
      <span className="lb-name">{row.isUser ? 'You' : row.name}</span>
      <DeltaIcon delta={row.delta} />
    </div>
    <div className="lb-steps-col">
      <span className="lb-steps">{fmtSteps(row.steps)}</span>
      <span className="lb-steps-label">steps</span>
    </div>
  </>
);

/* ── GROUP CHALLENGE ── */
export const GroupChallenge = () => {
  const gc = groupChallenge;
  const totalSteps = gc.groupA.steps + gc.groupB.steps;
  const pctA = Math.round((gc.groupA.steps / totalSteps) * 100);
  const pctB = 100 - pctA;
  const userPct = ((gc.userContribution / gc.groupA.steps) * 100).toFixed(1);
  return (
    <div className="health-card group-challenge-card">
      <div className="gc-header">
        <div>
          <span className="gc-eyebrow">⚡ Group Challenge</span>
          <h2 className="gc-title">{gc.title}</h2>
          <p className="gc-period">{gc.period}</p>
        </div>
        <span className="gc-leading-badge" style={{ background: gc.groupA.bg, color: gc.groupA.color }}>
          {gc.groupA.name} leading
        </span>
      </div>
      <div className="gc-vs-row">
        <div className="gc-team gc-team-a">
          <span className="gc-team-name" style={{ color: gc.groupA.color }}>{gc.groupA.name}</span>
          <span className="gc-team-steps">{fmtSteps(gc.groupA.steps)}</span>
          <span className="gc-team-members">{gc.groupA.members} members</span>
        </div>
        <div className="gc-vs-divider"><span className="gc-vs-text">VS</span></div>
        <div className="gc-team gc-team-b">
          <span className="gc-team-name" style={{ color: gc.groupB.color }}>{gc.groupB.name}</span>
          <span className="gc-team-steps">{fmtSteps(gc.groupB.steps)}</span>
          <span className="gc-team-members">{gc.groupB.members} members</span>
        </div>
      </div>
      <div className="gc-bars">
        <div className="gc-bar-track">
          <div className="gc-bar-fill gc-bar-a" style={{ width: `${pctA}%`, background: gc.groupA.color }} />
          <div className="gc-bar-fill gc-bar-b" style={{ width: `${pctB}%`, background: gc.groupB.color }} />
        </div>
        <div className="gc-bar-labels">
          <span style={{ color: gc.groupA.color }}>{pctA}%</span>
          <span style={{ color: gc.groupB.color }}>{pctB}%</span>
        </div>
      </div>
      <div className="gc-contribution">
        <div className="gc-contrib-left">
          <span className="gc-contrib-emoji">🧑🏽</span>
          <div>
            <p className="gc-contrib-text">Your contribution</p>
            <p className="gc-contrib-steps">
              <strong>{fmtSteps(gc.userContribution)} steps</strong>
              <span className="gc-contrib-pct"> · {userPct}% of {gc.userGroup}</span>
            </p>
          </div>
        </div>
        <button className="gc-cta-btn">Contribute <ArrowRight size={15} /></button>
      </div>
    </div>
  );
};

/* ── PERSONAL CONTRIBUTION ── */
export const PersonalContrib = () => (
  <div className="health-card personal-contrib-card">
    <div className="pc-top">
      <div className="pc-icon-wrap"><Activity size={20} /></div>
      <div>
        <p className="pc-label">This week</p>
        <h3 className="pc-steps">8,200 <span className="pc-unit">steps</span></h3>
      </div>
    </div>
    <div className="pc-percentile-row">
      <div className="pc-percentile-bar-track">
        <div className="pc-percentile-fill" style={{ width: '85%' }} />
        <div className="pc-percentile-marker" style={{ left: '85%' }}>
          <span className="pc-marker-label">You</span>
        </div>
      </div>
      <div className="pc-percentile-ends">
        <span>0%</span>
        <span className="pc-top15">Top 15% 🎯</span>
        <span>100%</span>
      </div>
    </div>
    <p className="pc-sub">You&apos;re in the <strong>top 15%</strong> of RMIT students this week</p>
  </div>
);

/* ── NUDGES ── */
const Nudges = () => (
  <div className="nudges-row">
    {nudges.map(n => (
      <div key={n.id} className="nudge-card" style={{ background: n.color }}>
        <span className="nudge-emoji">{n.icon}</span>
        <p className="nudge-text" style={{ color: n.textColor }}>{n.text}</p>
      </div>
    ))}
  </div>
);

/* ── ACTIVITY UPDATES ── */
const ActivityUpdates = () => (
  <div className="health-card updates-card">
    <div className="updates-header">
      <Bell size={14} className="updates-bell" />
      <h3 className="updates-title">Recent activity</h3>
    </div>
    {activityUpdates.map((u, i) => (
      <React.Fragment key={u.id}>
        <div className="update-row">
          <span className="update-avatar">{u.avatar}</span>
          <p className="update-text">{u.text}</p>
          <span className="update-time">{u.time}</span>
        </div>
        {i < activityUpdates.length - 1 && <div className="update-divider" />}
      </React.Fragment>
    ))}
  </div>
);

/* ── HEALTH IMPACT CARD — simplified snapshot ── */
export const HealthImpactCard = ({ navigate }) => {
  const hi = healthImpact;
  const pct = (hi.score / hi.scoreMax) * 100;
  const R = 52;
  const C = 2 * Math.PI * R;
  const filled = C * (pct / 100);
  return (
    <div className="health-card hi-simple-card">
      <div className="hi-simple-header">
        <h2 className="hi-simple-title">Your Health Score</h2>
        <span className="hi-tier-pill">🥇 Gold tier</span>
      </div>
      <div className="hi-simple-body">
        <div className="hi-ring-wrap">
          <svg className="hi-ring-svg" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r={R} fill="none" stroke="#f0f0f0" strokeWidth="10" />
            <circle cx="60" cy="60" r={R} fill="none" stroke="url(#sGrad)" strokeWidth="10"
              strokeLinecap="round" strokeDasharray={`${filled} ${C - filled}`}
              strokeDashoffset={C * 0.25}
              style={{ transition: 'stroke-dasharray 0.8s cubic-bezier(0.4,0,0.2,1)' }} />
            <defs>
              <linearGradient id="sGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#cd0d2d" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
            <text x="60" y="54" textAnchor="middle" className="hi-ring-num">{hi.score}</text>
            <text x="60" y="68" textAnchor="middle" className="hi-ring-denom">/ 100</text>
          </svg>
        </div>
        <div className="hi-simple-right">
          <p className="hi-simple-insight">You're on track for better benefits</p>
          <div className="hi-simple-progress">
            <div className="hi-simple-bar-track">
              <div className="hi-simple-bar-fill" style={{ width: `${pct}%` }} />
            </div>
            <p className="hi-simple-next">+2 points to reach next level</p>
          </div>
          <button className="hi-simple-cta" onClick={() => navigate('/health/impact')}>
            View your benefits <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── REDUCE COST ENTRY CARD ── */
export const ReduceCostCard = ({ navigate }) => (
  <div className="health-card reduce-cost-card" onClick={() => navigate('/health/impact')} style={{ cursor: 'pointer' }}>
    <div className="rc-icon-wrap"><Shield size={22} /></div>
    <div className="rc-body">
      <h3 className="rc-title">Reduce your cover cost</h3>
      <p className="rc-sub">See how staying active can help lower your future health cover costs</p>
    </div>
    <button className="rc-cta" onClick={e => { e.stopPropagation(); navigate('/health/impact'); }}>
      Learn how <ArrowRight size={14} />
    </button>
  </div>
);

/* ── MAIN HEALTH PAGE ── */
const Health = () => {
  const navigate = useNavigate();
  return (
    <div className="health-page">
      <div className="health-header">
        <div className="health-header-top"><h1 className="health-logo">medibank</h1></div>
        <div className="health-header-content">
          <div className="health-eyebrow"><Zap size={13} /><span>Active Challenge</span></div>
          <h2 className="health-header-title">Stay active,<br />climb the ranks</h2>
          <p className="health-header-sub">Compete with your university, beat your friends, earn your spot.</p>
          <div className="health-stats-strip">
            <div className="health-stat"><span className="health-stat-num">#7</span><span className="health-stat-label">Friends</span></div>
            <div className="health-stat-div" />
            <div className="health-stat"><span className="health-stat-num">#23</span><span className="health-stat-label">University</span></div>
            <div className="health-stat-div" />
            <div className="health-stat"><span className="health-stat-num">8,200</span><span className="health-stat-label">Steps today</span></div>
          </div>
        </div>
      </div>
      <div className="health-content">
        <Leaderboard />
        <GroupChallenge />
        <PersonalContrib />
        <HealthImpactCard navigate={navigate} />
        <ReduceCostCard navigate={navigate} />
        <Nudges />
        <ActivityUpdates />
      </div>
    </div>
  );
};

export default Health;
