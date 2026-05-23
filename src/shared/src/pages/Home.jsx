import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowRight, Lightbulb, CheckCircle2, Calendar, MessageCircle, Star, MessageSquare, HeartPulse, Stethoscope, CreditCard, FilePlus, Circle, Sparkles } from 'lucide-react';
import { journeyStages } from '../data/journeyData';
import OvhcConversionCard from '../components/OvhcConversionCard';
import './Home.css';

const quickActions = [
  { id: 'mediguide', label: 'MediGuide AI', icon: Sparkles, route: '/mediguide' },
  { id: 'contact', label: 'Contact us', icon: MessageSquare, route: '/support' },
  { id: 'support', label: '24/7 support', icon: HeartPulse, route: '/health-advice' },
  { id: 'doctor', label: 'Find a doctor', icon: Stethoscope, route: '/find' },
  { id: 'card', label: 'Digital card', icon: CreditCard, route: '/cover' },
  { id: 'claim', label: 'Make a claim', icon: FilePlus, route: '/cover' },
];

const statusMeta = {
  'not-started': { label: 'Not started', cls: 'pending', cta: 'Start', ctaCls: 'secondary' },
  'in-progress':  { label: 'In progress',  cls: 'active',  cta: 'Continue', ctaCls: 'primary' },
  'completed':    { label: 'Completed',    cls: 'completed', cta: 'Review',  ctaCls: 'secondary' },
};

const Home = () => {
  const navigate = useNavigate();

  const preArrival = journeyStages[0];
  const allTasks = preArrival.sections.flatMap(s => s.tasks);
  const total      = allTasks.length;
  // Mock completed state for the dashboard preview
  const completed  = 2;
  const progressPct = total > 0 ? Math.round((completed / total) * 100) : 0;
  const remaining   = total - completed;
  // Show first 3 tasks in the widget, injecting a mock status for display
  const previewTasks = allTasks.slice(0, 3).map((t, i) => ({
    ...t,
    status: i < 2 ? 'completed' : 'not-started'
  }));

  return (
    <div className="home-container">
      {/* Premium Gradient Header */}
      <div className="premium-header-section">
        <div className="premium-top-bar">
          <h1 className="logo-text">medibank</h1>
          <div className="top-bar-right">
            <button className="rewards-pill" onClick={() => navigate('/health/impact')}>
              <Star size={14} className="rewards-icon" />
              <span className="rewards-val">2.4K pts</span>
              <span className="rewards-notif-dot" />
            </button>
            <button className="profile-avatar-btn" onClick={() => navigate('/me')}>
              AA
            </button>
          </div>
        </div>
        
        <div className="premium-greeting-container">
          <h2 className="greeting-title">Hi Aamir 👋</h2>
          <p className="greeting-subtitle">You’ve come a long way!</p>
          <div className="greeting-dynamic-badge">
            1 year 6 months in Australia · You’re doing great
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="premium-main-content">

        {/* OVHC Conversion Card */}
        <OvhcConversionCard />

        {/* Quick Actions */}
        <div className="qa-section">
          <h3 className="qa-title">Quick actions</h3>
          <div className="qa-grid">
            {quickActions.map(action => {
              const Icon = action.icon;
              return (
                <div key={action.id} className="qa-item" onClick={() => navigate(action.route)}>
                  <div className="qa-icon-wrap"><Icon size={22} strokeWidth={1.8} /></div>
                  <span className="qa-label">{action.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Journey Progress Card — driven by Pre-Arrival data */}
        <div className="premium-journey-card">
          <div className="journey-card-header">
            <h3>Your journey</h3>
            <span className="journey-progress-text">{progressPct}% complete</span>
          </div>

          <div className="journey-progress-bar">
            <div className="journey-progress-fill" style={{ width: `${progressPct}%` }}></div>
          </div>

          <div className="journey-current-stage">
            <span className="stage-name">{preArrival.title}</span>
            <span className="stage-badge">You're here</span>
          </div>

          <div className="journey-tasks-list">
            {previewTasks.map((task, index) => {
              const Icon = task.icon || Circle;
              const meta = statusMeta[task.status];
              const isLast = index === previewTasks.length - 1;
              return (
                <React.Fragment key={task.id}>
                  <div
                    className={`journey-task-item${task.status === 'in-progress' ? ' active' : ''}`}
                    onClick={() => navigate(`/journey/task/${task.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div
                      className={`task-icon-wrapper ${meta.cls}`}
                      style={task.status === 'not-started' ? {} : { background: task.iconBg || '#f1f5f9', color: task.iconColor || '#64748b' }}
                    >
                      {task.status === 'completed'
                        ? <CheckCircle2 size={20} />
                        : <Icon size={20} />}
                    </div>
                    <div className="task-details">
                      <h4 style={task.status === 'completed' ? { textDecoration: 'line-through', color: '#9ca3af' } : {}}>
                        {task.title}
                      </h4>
                      <span className={`task-status ${meta.cls}`}>{meta.label}</span>
                    </div>
                    <button
                      className={`task-cta-btn ${meta.ctaCls}`}
                      onClick={e => { e.stopPropagation(); navigate(`/journey/task/${task.id}`); }}
                    >
                      {meta.cta}
                    </button>
                  </div>
                  {!isLast && <div className="task-divider"></div>}
                </React.Fragment>
              );
            })}
          </div>

          <div className="journey-card-footer">
            <p className="journey-footer-text">
              {remaining > 0 ? `${remaining} task${remaining !== 1 ? 's' : ''} left to complete` : 'All tasks complete ✓'}
            </p>
            <button className="journey-main-cta" onClick={() => navigate('/journey')}>
              {completed > 0 ? 'Continue your journey' : 'Start your journey'} <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Smart Insight Card */}
        <div className="premium-insight-card">
          <div className="insight-icon-wrapper">
            <Lightbulb size={24} className="insight-icon" />
          </div>
          <div className="insight-content">
            <h4>Helpful tip for you</h4>
            <p>You’ve just arrived in Melbourne. Here’s what you should do this week.</p>
            <button className="insight-cta-btn">
              Take action <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Community Widget — matches journey card design language */}
        <div className="premium-journey-card">
          <div className="journey-card-header">
            <h3>Community around you</h3>
            <span
              className="journey-progress-text"
              style={{ cursor: 'pointer', fontWeight: 600 }}
              onClick={() => navigate('/community')}
            >
              See all
            </span>
          </div>

          <div className="journey-tasks-list">
            {/* Event row */}
            <div
              className="journey-task-item"
              onClick={() => navigate('/community/event/e2')}
              style={{ cursor: 'pointer' }}
            >
              <div className="task-icon-wrapper" style={{ background: '#eff6ff', color: '#1e3f8a' }}>
                <Calendar size={20} />
              </div>
              <div className="task-details">
                <h4>Melbourne Student Meetup</h4>
                <span className="task-status pending">📍 Federation Square · This Saturday</span>
              </div>
              <button
                className="task-cta-btn secondary"
                onClick={e => { e.stopPropagation(); navigate('/community/event/e2'); }}
              >
                View
              </button>
            </div>

            <div className="task-divider" />

            {/* Group discussion row */}
            <div
              className="journey-task-item"
              onClick={() => navigate('/community/group/g1')}
              style={{ cursor: 'pointer' }}
            >
              <div className="task-icon-wrapper active">
                <MessageCircle size={20} />
              </div>
              <div className="task-details">
                <h4>Any good GP near campus?</h4>
                <span className="task-status active">RMIT Students · 8 replies · 2h ago</span>
              </div>
              <button
                className="task-cta-btn primary"
                onClick={e => { e.stopPropagation(); navigate('/community/group/g1'); }}
              >
                Join
              </button>
            </div>
          </div>

          <div className="journey-card-footer">
            <button className="journey-main-cta" onClick={() => navigate('/community')}>
              Explore community <ArrowRight size={18} />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Home;
