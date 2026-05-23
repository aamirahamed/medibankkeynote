import { useState } from 'react';
import {
  Bot, Sparkles, TrendingUp, ArrowRight, Activity, Network, Zap,
  Users, ChevronRight, BarChart3, CheckCircle2, ShieldAlert, Target,
  Clock, MessageSquare, Smartphone, X, GraduationCap, Eye,
  UserX, Star, AlertTriangle, CheckCheck, ChevronLeft, Calendar,
  CircleDot, Layers, GitBranch, Shield, AlertCircle, ChevronDown
} from 'lucide-react';
import {
  lifecycleMoments,
  aiWorkflows,
  decisionHistory,
  performanceIntelligence,
  approvalQueue,
  actionSummaryStr
} from '../data/mockData';

const momentConfig = {
  'graduation-approach': { icon: GraduationCap, color: '#4ADE80', dimColor: 'rgba(74,222,128,0.10)',  borderColor: 'rgba(74,222,128,0.3)',  label: 'Opportunity' },
  'ovhc-high-intent':    { icon: Eye,           color: '#38B6FF', dimColor: 'rgba(56,182,255,0.10)',  borderColor: 'rgba(56,182,255,0.3)',  label: 'Opportunity' },
  'silent-disengagement':{ icon: AlertTriangle,  color: '#FF4D6A', dimColor: 'rgba(255,77,106,0.10)',  borderColor: 'rgba(255,77,106,0.3)',  label: 'Critical' },
  'new-arrival-dropoff': { icon: UserX,          color: '#FF4D6A', dimColor: 'rgba(255,77,106,0.10)',  borderColor: 'rgba(255,77,106,0.3)',  label: 'Critical' },
  'ambassador-ready':    { icon: Star,           color: '#F5B544', dimColor: 'rgba(245,181,68,0.10)',  borderColor: 'rgba(245,181,68,0.3)',  label: 'Growth' },
  'community-conversion':{ icon: Users,          color: '#6EE7F2', dimColor: 'rgba(110,231,242,0.10)', borderColor: 'rgba(110,231,242,0.3)', label: 'Opportunity' }
};

const layerColors = {
  Detection:    { color: '#FF4D6A', bg: 'rgba(255,77,106,0.10)',  border: 'rgba(255,77,106,0.3)' },
  Intelligence: { color: '#38B6FF', bg: 'rgba(56,182,255,0.10)',  border: 'rgba(56,182,255,0.3)' },
  Orchestration:{ color: '#8B5CF6', bg: 'rgba(139,92,246,0.10)', border: 'rgba(139,92,246,0.3)' }
};

const STEPS = ['Signal Detected', 'Agent Reasoning', 'Intervention', 'Decision'];

/* ─────────────────────────────────────────────
   FEATURED CARD — primary decision hero
───────────────────────────────────────────── */
function FeaturedCard({ workflow, onReview }) {
  const [showSignals, setShowSignals] = useState(false);
  const moment  = lifecycleMoments.find(m => m.id === workflow.triggeredBy);
  const cfg     = momentConfig[workflow.triggeredBy];
  const Icon    = cfg.icon;
  const agentNames = [...new Set(workflow.agentCollaboration.map(a => a.agent.replace(' Agent', '')))].slice(0, 2);

  return (
    <div className="as-fc" style={{ '--fc-color': cfg.color }}>
      {/* eyebrow */}
      <div className="as-fc-eyebrow">
        <span className="as-state-pill state-review">Needs Review</span>
        <span className="as-fc-priority-lbl">Highest Priority Today</span>
      </div>

      {/* moment context + title */}
      <div className="as-fc-context">
        <Icon size={13} style={{ color: cfg.color }} />
        <span style={{ color: cfg.color, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {moment.name}
        </span>
      </div>
      <h2 className="as-fc-title">{workflow.name}</h2>

      {/* metrics strip */}
      <div className="as-fc-metrics">
        <div className="as-fc-m">
          <span className="as-fc-mv green">{workflow.impact.revenue}</span>
          <span className="as-fc-ml">Projected Opportunity</span>
        </div>
        <div className="as-fc-msep" />
        <div className="as-fc-m">
          <span className="as-fc-mv">{moment.count.toLocaleString()}</span>
          <span className="as-fc-ml">Students Affected</span>
        </div>
        <div className="as-fc-msep" />
        <div className="as-fc-m">
          <span className="as-fc-mv blue">{workflow.confidence}</span>
          <span className="as-fc-ml">AI Confidence</span>
        </div>
        <div className="as-fc-msep" />
        <div className="as-fc-m">
          <span className="as-fc-mv green">{workflow.impact.uplift}</span>
          <span className="as-fc-ml">Conversion Uplift</span>
        </div>
      </div>

      <div className="as-fc-line" />

      {/* Why this matters */}
      <div className="as-fc-block">
        <span className="as-fc-block-label">Why this matters</span>
        <p className="as-fc-block-text">{workflow.why}</p>
      </div>

      {/* AI Recommendation */}
      <div className="as-fc-block">
        <span className="as-fc-block-label">AI Recommendation</span>
        <p className="as-fc-block-text">
          Launch via <strong>{workflow.channels}</strong> targeting <strong>{workflow.audience}</strong>.
          {workflow.messageTitle && <> Message: "{workflow.messageTitle}"</>}
        </p>
      </div>

      {/* Risk of inaction */}
      <div className="as-fc-risk">
        <ShieldAlert size={13} />
        <span>{workflow.riskOfInaction}</span>
      </div>

      {/* Collapsible signals */}
      <button className="as-fc-signals-btn" onClick={() => setShowSignals(p => !p)}>
        <CircleDot size={11} />
        {showSignals ? 'Hide' : 'View'} behavioural signals ({workflow.signalChain.length})
        <ChevronDown size={11} style={{ marginLeft: 'auto', transform: showSignals ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
      </button>

      {showSignals && (
        <div className="as-fc-signals">
          {workflow.signalChain.map((s, i) => (
            <div key={i} className="as-fc-signal">
              <span className="as-fc-sig-dot" style={{ background: cfg.color }} />
              <span className="as-fc-sig-text">{s.signal}</span>
              <span className="as-fc-sig-w">{s.weight}</span>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="as-fc-footer">
        <div className="as-fc-agents">
          <Bot size={12} />
          <span>Generated by {agentNames.join(' + ')}</span>
        </div>
        <button className="as-fc-cta" onClick={() => onReview(workflow)}>
          Review Decision <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   QUEUE ITEM — compact scannable card
───────────────────────────────────────────── */
function QueueItem({ workflow, onReview }) {
  const moment = lifecycleMoments.find(m => m.id === workflow.triggeredBy);
  const cfg    = momentConfig[workflow.triggeredBy];
  const isCritical = cfg.label === 'Critical';

  return (
    <div className="as-qi">
      <div className="as-qi-bar" style={{ background: cfg.color }} />
      <div className="as-qi-body">
        <div className="as-qi-top">
          <span className="as-qi-title">{workflow.name}</span>
          <span className={`as-state-pill ${isCritical ? 'state-critical' : 'state-review'}`}>
            {isCritical ? 'Critical' : 'Needs Review'}
          </span>
        </div>
        <p className="as-qi-sub">{workflow.why}</p>
        <div className="as-qi-meta">
          <span className="as-qi-green">{workflow.impact.revenue}</span>
          <span className="as-qi-dot" />
          <span>{moment.count.toLocaleString()} students</span>
          <span className="as-qi-dot" />
          <span className="as-qi-blue">{workflow.confidence} confidence</span>
          <span className="as-qi-dot" />
          <span>{moment.name}</span>
        </div>
      </div>
      <button className="as-qi-btn" onClick={() => onReview(workflow)}>
        Review <ArrowRight size={12} />
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ACTION STUDIO — main export
───────────────────────────────────────────── */
export default function ActionStudio() {
  const [activeWorkflow, setActiveWorkflow] = useState(null);
  const [toastMessage, setToastMessage]     = useState('');
  const [insightOpen, setInsightOpen]       = useState(false);
  const [historyOpen, setHistoryOpen]       = useState(false);

  const [featured, ...queueItems] = aiWorkflows;

  const toast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="as-root">
      {toastMessage && (
        <div className="as-toast">
          <CheckCircle2 size={16} /> {toastMessage}
        </div>
      )}

      {/* ── HEADER ── */}
      <header className="as-header">
        <div>
          <h1>Action Studio</h1>
          <p className="as-subtitle">
            {aiWorkflows.length} high-priority intervention decisions awaiting review today.
          </p>
        </div>
        <div className="as-live-badge">
          <span className="as-pulse" />
          Intervention Engine Active
        </div>
      </header>

      {/* ── FEATURED DECISION ── */}
      <FeaturedCard workflow={featured} onReview={setActiveWorkflow} />

      {/* ── QUEUE ── */}
      {queueItems.length > 0 && (
        <div className="as-queue-section">
          <div className="as-queue-label">
            {queueItems.length} more decision{queueItems.length !== 1 ? 's' : ''} awaiting review
          </div>
          <div className="as-queue-list">
            {queueItems.map(wf => (
              <QueueItem key={wf.id} workflow={wf} onReview={setActiveWorkflow} />
            ))}
          </div>
        </div>
      )}

      {/* ── AI INSIGHT FEED (collapsible) ── */}
      <div className="as-collapsible">
        <button className="as-collapse-btn" onClick={() => setInsightOpen(p => !p)}>
          <Sparkles size={14} />
          AI Insight Feed
          <span className="as-collapse-count">{performanceIntelligence.length} observations</span>
          <ChevronDown size={13} style={{ marginLeft: 'auto', transform: insightOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', color: '#485E78' }} />
        </button>
        {insightOpen && (
          <div className="as-insight-list">
            {performanceIntelligence.map((pi, i) => (
              <div key={i} className="as-insight-item">
                <p className="as-insight-text">"{pi.insight}"</p>
                <span className="as-insight-meta">
                  <Bot size={11} /> {pi.confidence} confidence · {pi.impact} impact
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── DECISION HISTORY (collapsible) ── */}
      <div className="as-collapsible">
        <button className="as-collapse-btn" onClick={() => setHistoryOpen(p => !p)}>
          <CheckCheck size={14} />
          Decision History
          <span className="as-collapse-count">{decisionHistory.length} decisions</span>
          <ChevronDown size={13} style={{ marginLeft: 'auto', transform: historyOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', color: '#485E78' }} />
        </button>
        {historyOpen && (
          <div className="as-history-list">
            {decisionHistory.map(item => (
              <div key={item.id} className="as-history-row">
                <div className="as-hi-left">
                  <span className="as-hi-name">{item.workflow}</span>
                  <span className="as-hi-moment">{item.moment}</span>
                </div>
                <div className="as-hi-right">
                  <span className={`as-hi-decision ${item.decision.includes('Modified') ? 'warn' : 'success'}`}>
                    {item.decision}
                  </span>
                  <span className="as-hi-outcome">{item.outcome}</span>
                  <span className="as-hi-impact">{item.impact}</span>
                  <span className="as-hi-by">{item.approvedBy} · {item.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── EXECUTIVE SUMMARY ── */}
      <div className="as-exec-summary">
        <BarChart3 size={20} className="as-exec-icon" />
        <div>
          <span className="as-exec-label">Strategic Summary · Insight Narrator Agent</span>
          <p className="as-exec-text">"{actionSummaryStr}"</p>
        </div>
      </div>

      {/* ── HITL MODAL ── */}
      {activeWorkflow && (
        <HITLModal
          workflow={activeWorkflow}
          moment={lifecycleMoments.find(m => m.id === activeWorkflow.triggeredBy)}
          onClose={() => setActiveWorkflow(null)}
          onApprove={(wf) => {
            toast(`Approved & launched: ${wf.name}`);
            setActiveWorkflow(null);
          }}
        />
      )}

      <style>{`
        /* ── ROOT ── */
        .as-root {
          max-width: 860px;
          margin: 0 auto;
          padding: 0 0 120px;
          color: #8899AA;
          font-family: var(--font-sans);
        }

        /* ── HEADER ── */
        .as-header {
          display: flex; justify-content: space-between; align-items: flex-start;
          margin-bottom: 40px;
        }
        .as-header h1 {
          font-size: 34px; font-weight: 800; color: #FFFFFF;
          letter-spacing: -0.04em; margin: 0 0 7px;
        }
        .as-subtitle { font-size: 15px; color: #8899AA; margin: 0; }
        .as-live-badge {
          display: flex; align-items: center; gap: 8px;
          background: rgba(245,181,68,0.08); border: 1px solid rgba(245,181,68,0.2);
          color: #F5B544; padding: 7px 16px; border-radius: 20px;
          font-size: 12px; font-weight: 600; white-space: nowrap; flex-shrink: 0; margin-top: 4px;
        }
        .as-pulse {
          width: 6px; height: 6px; border-radius: 50%; background: #F5B544;
          box-shadow: 0 0 8px #F5B544; animation: asPulse 2s infinite;
        }

        /* ── STATE PILLS ── */
        .as-state-pill {
          font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px;
          padding: 3px 10px; border-radius: 20px; display: inline-block;
        }
        .state-review   { background: rgba(245,181,68,0.1);  color: #F5B544; border: 1px solid rgba(245,181,68,0.2); }
        .state-critical { background: rgba(255,77,106,0.1);  color: #FF4D6A; border: 1px solid rgba(255,77,106,0.2); }
        .state-approved { background: rgba(74,222,128,0.1);  color: #4ADE80; border: 1px solid rgba(74,222,128,0.2); }

        /* ── FEATURED CARD ── */
        .as-fc {
          background: #0D1520;
          border: 1px solid rgba(255,255,255,0.09);
          border-left: 3px solid var(--fc-color, rgba(255,255,255,0.2));
          border-radius: 14px;
          padding: 32px;
          margin-bottom: 28px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04);
          position: relative; overflow: hidden;
        }
        .as-fc::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 140px;
          background: radial-gradient(ellipse 60% 100px at 20% -30px, var(--fc-color, transparent), transparent);
          opacity: 0.07; pointer-events: none; border-radius: 14px;
        }

        .as-fc-eyebrow { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; }
        .as-fc-priority-lbl { font-size: 12px; color: #485E78; font-weight: 500; }

        .as-fc-context { display: flex; align-items: center; gap: 6px; margin-bottom: 8px; }
        .as-fc-title {
          font-size: 26px; font-weight: 800; color: #FFFFFF;
          letter-spacing: -0.03em; margin: 0 0 24px; line-height: 1.2;
        }

        /* METRICS */
        .as-fc-metrics {
          display: flex; align-items: stretch;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px; padding: 18px 24px;
          margin-bottom: 28px;
        }
        .as-fc-m { display: flex; flex-direction: column; gap: 5px; flex: 1; }
        .as-fc-mv { font-size: 20px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.03em; }
        .as-fc-mv.green { color: #4ADE80; }
        .as-fc-mv.blue  { color: #38B6FF; }
        .as-fc-ml { font-size: 11px; color: #485E78; font-weight: 600; text-transform: uppercase; letter-spacing: 0.4px; }
        .as-fc-msep { width: 1px; background: rgba(255,255,255,0.08); align-self: stretch; flex-shrink: 0; margin: 0 24px; }

        /* CONTENT */
        .as-fc-line { height: 1px; background: rgba(255,255,255,0.07); margin: 0 0 24px; }
        .as-fc-block { margin-bottom: 20px; }
        .as-fc-block-label {
          font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px;
          color: #485E78; display: block; margin-bottom: 7px;
        }
        .as-fc-block-text { font-size: 14px; color: #C8D8E8; line-height: 1.65; margin: 0; }
        .as-fc-block-text strong { color: #FFFFFF; font-weight: 600; }

        /* RISK */
        .as-fc-risk {
          display: flex; align-items: flex-start; gap: 9px;
          background: rgba(255,77,106,0.04); border: 1px solid rgba(255,77,106,0.12);
          border-radius: 8px; padding: 12px 14px;
          font-size: 13px; color: #FF8EA3; line-height: 1.5; margin-bottom: 16px;
        }
        .as-fc-risk svg { color: #FF4D6A; flex-shrink: 0; margin-top: 1px; }

        /* SIGNALS */
        .as-fc-signals-btn {
          display: flex; align-items: center; gap: 6px; width: 100%;
          background: none; border: none; padding: 8px 0; margin-bottom: 8px;
          font-size: 12px; color: #485E78; cursor: pointer; font-weight: 600;
          font-family: inherit; transition: color 0.15s;
        }
        .as-fc-signals-btn:hover { color: #C8D8E8; }
        .as-fc-signals {
          display: flex; flex-direction: column; gap: 9px; margin-bottom: 20px;
          padding: 14px 16px; background: #07101C;
          border-radius: 8px; border: 1px solid rgba(255,255,255,0.06);
        }
        .as-fc-signal { display: flex; align-items: center; gap: 10px; font-size: 13px; }
        .as-fc-sig-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }
        .as-fc-sig-text { flex: 1; color: #C8D8E8; }
        .as-fc-sig-w { font-size: 11px; font-weight: 700; color: #485E78; white-space: nowrap; }

        /* CARD FOOTER */
        .as-fc-footer {
          display: flex; justify-content: space-between; align-items: center;
          padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.07);
          margin-top: 4px;
        }
        .as-fc-agents { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #485E78; }
        .as-fc-cta {
          display: flex; align-items: center; gap: 8px;
          background: #FFFFFF; color: #06080F;
          border: none; padding: 12px 24px; border-radius: 8px;
          font-size: 14px; font-weight: 700; cursor: pointer;
          font-family: inherit; transition: all 0.2s;
        }
        .as-fc-cta:hover { background: #E8F0FA; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(255,255,255,0.1); }

        /* ── QUEUE ── */
        .as-queue-section { margin-bottom: 8px; }
        .as-queue-label {
          font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;
          color: #485E78; margin-bottom: 10px;
        }
        .as-queue-list { display: flex; flex-direction: column; gap: 3px; }

        .as-qi {
          display: flex; align-items: center;
          background: #09111A;
          border-radius: 10px; overflow: hidden;
          border: 1px solid rgba(255,255,255,0.06);
          transition: border-color 0.2s, background 0.2s;
        }
        .as-qi:hover { background: #0C1825; border-color: rgba(255,255,255,0.11); }
        .as-qi-bar { width: 3px; align-self: stretch; flex-shrink: 0; }
        .as-qi-body { flex: 1; padding: 16px 20px; min-width: 0; }
        .as-qi-top { display: flex; align-items: center; gap: 10px; margin-bottom: 5px; flex-wrap: wrap; }
        .as-qi-title { font-size: 15px; font-weight: 700; color: #FFFFFF; }
        .as-qi-sub {
          font-size: 13px; color: #8899AA; line-height: 1.4; margin: 0 0 9px;
          display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;
        }
        .as-qi-meta { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #8899AA; flex-wrap: wrap; }
        .as-qi-green { color: #4ADE80; font-weight: 600; }
        .as-qi-blue  { color: #38B6FF; font-weight: 600; }
        .as-qi-dot   { width: 3px; height: 3px; border-radius: 50%; background: rgba(255,255,255,0.18); }
        .as-qi-btn {
          display: flex; align-items: center; gap: 6px;
          background: none; border: 1px solid rgba(255,255,255,0.11); color: #C8D8E8;
          padding: 8px 16px; border-radius: 6px; margin: 0 16px;
          font-size: 12px; font-weight: 600; cursor: pointer; white-space: nowrap;
          font-family: inherit; transition: all 0.2s; flex-shrink: 0;
        }
        .as-qi-btn:hover { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.2); }

        /* ── COLLAPSIBLE ── */
        .as-collapsible { border-top: 1px solid rgba(255,255,255,0.06); }
        .as-collapse-btn {
          display: flex; align-items: center; gap: 10px; width: 100%;
          background: none; border: none; padding: 16px 0;
          font-size: 14px; font-weight: 600; color: #8899AA; cursor: pointer;
          font-family: inherit; transition: color 0.15s;
        }
        .as-collapse-btn:hover { color: #C8D8E8; }
        .as-collapse-count {
          font-size: 11px; background: rgba(255,255,255,0.06); border-radius: 20px;
          padding: 2px 9px; color: #485E78; font-weight: 600;
        }

        /* INSIGHT FEED */
        .as-insight-list { display: flex; flex-direction: column; gap: 8px; padding-bottom: 20px; }
        .as-insight-item {
          padding: 16px 18px;
          background: #09111A; border-radius: 8px; border: 1px solid rgba(255,255,255,0.06);
        }
        .as-insight-text { font-size: 14px; color: #C8D8E8; line-height: 1.5; margin: 0 0 8px; font-style: italic; }
        .as-insight-meta { font-size: 11px; color: #485E78; display: flex; align-items: center; gap: 5px; }

        /* HISTORY */
        .as-history-list { display: flex; flex-direction: column; padding-bottom: 20px; }
        .as-history-row {
          display: flex; justify-content: space-between; align-items: center; gap: 16px;
          padding: 13px 0; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 13px;
        }
        .as-history-row:last-child { border-bottom: none; }
        .as-hi-left { display: flex; flex-direction: column; gap: 3px; }
        .as-hi-name { font-weight: 600; color: #C8D8E8; }
        .as-hi-moment { font-size: 12px; color: #485E78; }
        .as-hi-right { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; justify-content: flex-end; }
        .as-hi-decision { font-weight: 600; }
        .as-hi-decision.success { color: #4ADE80; }
        .as-hi-decision.warn    { color: #F5B544; }
        .as-hi-outcome { color: #8899AA; }
        .as-hi-impact  { font-weight: 700; color: #4ADE80; }
        .as-hi-by      { color: #485E78; white-space: nowrap; font-size: 12px; }

        /* ── EXEC SUMMARY ── */
        .as-exec-summary {
          display: flex; gap: 20px; align-items: flex-start;
          padding: 28px 32px; margin-top: 32px;
          background: linear-gradient(100deg, rgba(110,231,242,0.06) 0%, transparent 70%);
          border-radius: 12px; border: 1px solid rgba(255,255,255,0.06);
          border-left: 2px solid #6EE7F2;
        }
        .as-exec-icon { color: #6EE7F2; flex-shrink: 0; margin-top: 4px; }
        .as-exec-label {
          font-size: 11px; text-transform: uppercase; font-weight: 700;
          color: #485E78; letter-spacing: 0.5px; display: block; margin-bottom: 10px;
        }
        .as-exec-text {
          font-size: 18px; font-weight: 400; line-height: 1.65; color: #D8E8F0;
          font-style: italic; margin: 0; font-family: 'Instrument Serif', Georgia, serif;
        }

        /* ── TOAST ── */
        .as-toast {
          position: fixed; bottom: 28px; right: 28px; z-index: 9999;
          background: #FFFFFF; color: #080808;
          padding: 11px 20px; border-radius: 8px; font-size: 13px; font-weight: 700;
          display: flex; align-items: center; gap: 8px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          animation: asSlideUp 0.3s ease forwards;
        }

        @keyframes asPulse {
          0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(245,181,68,0.7); }
          70%  { transform: scale(1);    box-shadow: 0 0 0 6px rgba(245,181,68,0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(245,181,68,0); }
        }
        @keyframes asSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes asModalIn {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HITL REVIEW MODAL
───────────────────────────────────────────── */
function HITLModal({ workflow, moment, onClose, onApprove }) {
  const [step, setStep]         = useState(0);
  const [config, setConfig]     = useState({
    audience: workflow.audience,
    trigger:  workflow.triggerCondition,
    channels: workflow.channels,
    title:    workflow.messageTitle,
    body:     workflow.messageBody
  });
  const [decision, setDecision]         = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [rejected, setRejected]         = useState(false);
  const [scheduled, setScheduled]       = useState(false);

  const cfg     = momentConfig[workflow.triggeredBy];
  const Icon    = cfg.icon;
  const isLast  = step === STEPS.length - 1;

  const handleApprove = () => onApprove(workflow);

  const handleReject = () => {
    setRejected(true);
    setTimeout(() => { onClose(); }, 1800);
  };

  const handleSchedule = () => {
    setScheduled(true);
    setTimeout(() => { onClose(); }, 1800);
  };

  return (
    <div className="hitl-overlay">
      <div className="hitl-modal" style={{ animation: 'asModalIn 0.3s cubic-bezier(0.16,1,0.3,1)' }}>

        {/* MODAL HEADER */}
        <div className="hitl-header">
          <div className="hitl-header-left">
            <button className="hitl-icon-btn" onClick={onClose}><X size={18} /></button>
            <div>
              <div className="hitl-moment-pill" style={{ background: cfg.dimColor, color: cfg.color, border: `1px solid ${cfg.borderColor}` }}>
                <Icon size={11} /> {moment.name}
              </div>
              <h2 className="hitl-title">{workflow.name}</h2>
            </div>
          </div>
          <div className="hitl-header-right">
            <div className="hitl-hmetric">
              <span className="hitl-hm-label">Revenue Opportunity</span>
              <span className="hitl-hm-val hitl-green">{workflow.impact.revenue}</span>
            </div>
            <div className="hitl-hmetric hitl-border-l">
              <span className="hitl-hm-label">Conversion Uplift</span>
              <span className="hitl-hm-val hitl-green">{workflow.impact.uplift}</span>
            </div>
            <div className="hitl-hmetric hitl-border-l">
              <span className="hitl-hm-label">AI Confidence</span>
              <span className="hitl-hm-val hitl-blue">{workflow.confidence}</span>
            </div>
          </div>
        </div>

        {/* STEP INDICATOR */}
        <div className="hitl-steps">
          {STEPS.map((s, i) => (
            <button
              key={i}
              className={`hitl-step-btn ${i === step ? 'hitl-step-active' : ''} ${i < step ? 'hitl-step-done' : ''}`}
              onClick={() => setStep(i)}
            >
              <span className="hitl-step-num">{i < step ? <CheckCircle2 size={13} /> : i + 1}</span>
              {s}
            </button>
          ))}
        </div>

        {/* MODAL BODY */}
        <div className="hitl-body">

          {/* ── STEP 0: SIGNAL DETECTED ── */}
          {step === 0 && (
            <div className="hitl-canvas">
              <div className="hitl-block">
                <div className="hitl-block-head">
                  <AlertCircle size={16} style={{ color: cfg.color }} />
                  <h3>Signal Detected</h3>
                  <span className="hitl-block-tag" style={{ background: cfg.dimColor, color: cfg.color, border: `1px solid ${cfg.borderColor}` }}>
                    {moment.name} · {moment.count.toLocaleString()} students
                  </span>
                </div>
                <p className="hitl-desc">
                  The <strong style={{ color: cfg.color }}>{workflow.agentCollaboration[0].agent}</strong> detected
                  a lifecycle signal matching the <em>{moment.name}</em> moment. This triggered the agent pipeline
                  to analyse the opportunity and generate this intervention recommendation.
                </p>
                <div className="hitl-signal-list">
                  <span className="hitl-list-label">Detected Signals</span>
                  {workflow.signalChain.map((s, i) => (
                    <div key={i} className="hitl-signal-row">
                      <div className="hitl-signal-dot" style={{ background: i === 0 ? cfg.color : 'var(--hm)' }} />
                      <div className="hitl-signal-content">
                        <span className="hitl-signal-text">{s.signal}</span>
                        <div className="hitl-signal-meta">
                          <span className="hitl-signal-agent"><Bot size={10} /> {s.agent}</span>
                          <span className="hitl-signal-weight" style={{ color: i === 0 ? cfg.color : 'var(--hm)' }}>{s.weight}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="hitl-inaction-box">
                  <ShieldAlert size={14} style={{ color: 'var(--hd)' }} />
                  <div>
                    <span className="hitl-inaction-label">Risk of Inaction</span>
                    <p className="hitl-inaction-text">{workflow.riskOfInaction}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 1: AGENT REASONING ── */}
          {step === 1 && (
            <div className="hitl-canvas">
              <div className="hitl-block">
                <div className="hitl-block-head">
                  <Network size={16} className="hitl-icon-muted" />
                  <h3>Agent Reasoning Chain</h3>
                  <span className="hitl-block-tag hitl-tag-neutral">{workflow.agentCollaboration.length} agents collaborated</span>
                </div>
                <p className="hitl-desc">
                  The agent ecosystem processed the detected signal through three collaborative layers —
                  Detection, Intelligence, and Orchestration — to produce this recommendation.
                </p>
                <div className="hitl-chain">
                  {workflow.agentCollaboration.map((step, i) => {
                    const lc = layerColors[step.layer];
                    const isLast = i === workflow.agentCollaboration.length - 1;
                    return (
                      <div key={i} className="hitl-chain-step">
                        <div className="hitl-chain-node">
                          <div className="hitl-chain-dot" style={{ background: lc.color, boxShadow: `0 0 8px ${lc.color}` }} />
                          {!isLast && <div className="hitl-chain-line" />}
                        </div>
                        <div className="hitl-chain-content">
                          <div className="hitl-chain-meta">
                            <span className="hitl-chain-layer" style={{ background: lc.bg, color: lc.color, border: `1px solid ${lc.border}` }}>
                              {step.layer}
                            </span>
                            <span className="hitl-chain-agent"><Bot size={10} /> {step.agent}</span>
                            <span className="hitl-chain-time">{step.time}</span>
                          </div>
                          <p className="hitl-chain-action">{step.action}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 2: INTERVENTION ── */}
          {step === 2 && (
            <div className="hitl-canvas">
              <div className="hitl-block">
                <div className="hitl-block-head">
                  <Target size={16} className="hitl-icon-muted" />
                  <h3>Audience & Trigger</h3>
                </div>
                <div className="hitl-ai-reason">
                  <Bot size={13} style={{ color: 'var(--hp)' }} />
                  <p><strong>AI Reasoning:</strong> {workflow.why}</p>
                </div>
                <div className="hitl-form-row">
                  <div className="hitl-form-group">
                    <label className="hitl-label">Target Audience</label>
                    <input className="hitl-input" value={config.audience} onChange={e => setConfig({...config, audience: e.target.value})} />
                  </div>
                  <div className="hitl-form-group">
                    <label className="hitl-label">Trigger Condition</label>
                    <input className="hitl-input hitl-mono" value={config.trigger} onChange={e => setConfig({...config, trigger: e.target.value})} />
                  </div>
                </div>
              </div>

              <div className="hitl-connector" />

              <div className="hitl-block">
                <div className="hitl-block-head">
                  <Smartphone size={16} className="hitl-icon-muted" />
                  <h3>Delivery Channel</h3>
                </div>
                <div className="hitl-channels">
                  {['WhatsApp', 'Push Notification', 'Email + In-App'].map(ch => (
                    <button
                      key={ch}
                      className={`hitl-channel-btn ${config.channels === ch ? 'hitl-channel-selected' : ''}`}
                      onClick={() => setConfig({...config, channels: ch})}
                    >
                      {ch}
                    </button>
                  ))}
                </div>
                <p className="hitl-channel-note">
                  <Bot size={11} style={{ color: 'var(--hp)' }} />
                  AI-recommended: <strong>{workflow.channels}</strong> based on historical performance for this segment.
                </p>
              </div>

              <div className="hitl-connector" />

              <div className="hitl-block hitl-split-block">
                <div className="hitl-sb-left">
                  <div className="hitl-block-head">
                    <MessageSquare size={16} className="hitl-icon-muted" />
                    <h3>Intervention Content</h3>
                  </div>
                  <div className="hitl-form-group hitl-mb-16">
                    <label className="hitl-label">Notification Title</label>
                    <input className="hitl-input" value={config.title} onChange={e => setConfig({...config, title: e.target.value})} />
                  </div>
                  <div className="hitl-form-group">
                    <label className="hitl-label">Message Body</label>
                    <textarea rows={4} className="hitl-textarea" value={config.body} onChange={e => setConfig({...config, body: e.target.value})} />
                  </div>
                </div>
                <div className="hitl-sb-right">
                  <div className="hitl-phone">
                    <div className="hitl-phone-notch" />
                    <div className="hitl-phone-screen">
                      <div className="hitl-notif">
                        <div className="hitl-notif-header">
                          <div className="hitl-app-icon">M</div>
                          <span>Medibank</span>
                          <span style={{ marginLeft: 'auto', opacity: 0.5 }}>now</span>
                        </div>
                        <div className="hitl-notif-title">{config.title}</div>
                        <div className="hitl-notif-body">{config.body}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 3: DECISION ── */}
          {step === 3 && !rejected && !scheduled && (
            <div className="hitl-canvas">
              <div className="hitl-block">
                <div className="hitl-block-head">
                  <BarChart3 size={16} className="hitl-icon-muted" />
                  <h3>Projected Impact</h3>
                </div>
                <div className="hitl-impact-grid">
                  <div className="hitl-impact-box hitl-impact-success">
                    <span className="hitl-impact-label">Revenue Opportunity</span>
                    <span className="hitl-impact-val hitl-green">{workflow.impact.revenue}</span>
                  </div>
                  <div className="hitl-impact-box hitl-impact-success">
                    <span className="hitl-impact-label">Conversion Uplift</span>
                    <span className="hitl-impact-val hitl-green">{workflow.impact.uplift}</span>
                  </div>
                  <div className="hitl-impact-box">
                    <span className="hitl-impact-label">Students Targeted</span>
                    <span className="hitl-impact-val">{moment.count.toLocaleString()}</span>
                  </div>
                  <div className="hitl-impact-box">
                    <span className="hitl-impact-label">AI Confidence</span>
                    <span className="hitl-impact-val hitl-blue">{workflow.confidence}</span>
                  </div>
                </div>
              </div>

              <div className="hitl-connector" />

              <div className="hitl-block hitl-inaction-full">
                <ShieldAlert size={16} style={{ color: 'var(--hd)' }} />
                <div>
                  <span className="hitl-inaction-label">Risk of Inaction</span>
                  <p className="hitl-inaction-text">{workflow.riskOfInaction}</p>
                </div>
              </div>

              <div className="hitl-connector" />

              <div className="hitl-block">
                <div className="hitl-block-head">
                  <Shield size={16} className="hitl-icon-muted" />
                  <h3>Your Decision</h3>
                </div>
                <p className="hitl-desc">This intervention will not launch until you explicitly approve it. You can modify it in the previous step, schedule it for a future date, or reject it with a documented reason.</p>

                <div className="hitl-decision-btns">
                  <button className="hitl-btn-approve" onClick={handleApprove}>
                    <Zap size={15} /> Approve & Launch
                  </button>

                  <div className="hitl-schedule-wrap">
                    <input
                      type="date"
                      className="hitl-date-input"
                      value={scheduleDate}
                      onChange={e => setScheduleDate(e.target.value)}
                    />
                    <button
                      className="hitl-btn-schedule"
                      disabled={!scheduleDate}
                      onClick={handleSchedule}
                    >
                      <Calendar size={14} /> Schedule
                    </button>
                  </div>

                  <div className="hitl-reject-wrap">
                    <select className="hitl-reject-select" value={rejectReason} onChange={e => setRejectReason(e.target.value)}>
                      <option value="">Select reason to reject…</option>
                      <option value="timing">Poor timing for this cohort</option>
                      <option value="audience">Audience definition needs refinement</option>
                      <option value="message">Message needs further review</option>
                      <option value="strategy">Does not align with current strategy</option>
                      <option value="other">Other — will add note</option>
                    </select>
                    <button className="hitl-btn-reject" disabled={!rejectReason} onClick={handleReject}>
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {rejected && (
            <div className="hitl-canvas hitl-outcome">
              <AlertTriangle size={40} style={{ color: 'var(--hd)' }} />
              <h3>Recommendation Rejected</h3>
              <p>Reason logged. The agent pipeline will re-evaluate this signal with updated parameters.</p>
            </div>
          )}

          {scheduled && (
            <div className="hitl-canvas hitl-outcome">
              <Calendar size={40} style={{ color: 'var(--ha)' }} />
              <h3>Intervention Scheduled</h3>
              <p>Queued for {scheduleDate}. You can modify or cancel it from the Campaigns page.</p>
            </div>
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className="hitl-footer">
          <button className="hitl-btn-secondary" onClick={onClose}>Close</button>
          <div className="hitl-footer-nav">
            {step > 0 && (
              <button className="hitl-btn-secondary" onClick={() => setStep(s => s - 1)}>
                <ChevronLeft size={14} /> Back
              </button>
            )}
            {!isLast && (
              <button className="hitl-btn-next" onClick={() => setStep(s => s + 1)}>
                Next: {STEPS[step + 1]} <ChevronRight size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .hitl-overlay {
          position: fixed; inset: 0; z-index: 1000;
          background: rgba(4,8,18,0.88); backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center; padding: 24px;
        }
        .hitl-modal {
          --hm: #485E78; --hg: #4ADE80; --hd: #FF4D6A; --ha: #38B6FF; --hw: #F5B544; --hp: #8B5CF6;
          background: #0C1520; border: 1px solid rgba(255,255,255,0.10);
          border-radius: 16px; width: 100%; max-width: 820px; max-height: 90vh;
          display: flex; flex-direction: column; overflow: hidden;
          box-shadow: 0 40px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04);
          color: #C8D8E8; font-family: var(--font-sans);
        }

        /* HEADER */
        .hitl-header {
          display: flex; justify-content: space-between; align-items: center;
          padding: 20px 28px; border-bottom: 1px solid rgba(255,255,255,0.07);
          background: #091019; flex-shrink: 0;
        }
        .hitl-header-left { display: flex; align-items: center; gap: 16px; }
        .hitl-icon-btn {
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
          color: #fff; width: 34px; height: 34px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0;
        }
        .hitl-icon-btn:hover { background: rgba(255,255,255,0.1); }
        .hitl-moment-pill {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;
          padding: 3px 9px; border-radius: 20px; margin-bottom: 4px;
        }
        .hitl-title { font-size: 18px; font-weight: 700; color: #fff; margin: 0; letter-spacing: -0.02em; }
        .hitl-header-right { display: flex; align-items: center; gap: 24px; }
        .hitl-hmetric  { display: flex; flex-direction: column; gap: 3px; }
        .hitl-hm-label { font-size: 10px; text-transform: uppercase; color: var(--hm); font-weight: 700; letter-spacing: 0.4px; }
        .hitl-hm-val   { font-size: 18px; font-weight: 700; letter-spacing: -0.5px; }
        .hitl-green    { color: var(--hg); }
        .hitl-blue     { color: var(--ha); }
        .hitl-border-l { border-left: 1px solid rgba(255,255,255,0.08); padding-left: 24px; }

        /* STEPS */
        .hitl-steps {
          display: flex; padding: 0 28px; border-bottom: 1px solid rgba(255,255,255,0.06);
          background: #0A1219; flex-shrink: 0;
        }
        .hitl-step-btn {
          display: flex; align-items: center; gap: 8px;
          padding: 14px 16px; font-size: 13px; font-weight: 600;
          color: var(--hm); background: none; border: none; border-bottom: 2px solid transparent;
          cursor: pointer; transition: all 0.2s; margin-bottom: -1px;
        }
        .hitl-step-btn:hover { color: #fff; }
        .hitl-step-active { color: #fff !important; border-bottom-color: #fff !important; }
        .hitl-step-done   { color: var(--hg) !important; }
        .hitl-step-num {
          width: 20px; height: 20px; border-radius: 50%; background: rgba(255,255,255,0.07);
          display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700;
        }
        .hitl-step-active .hitl-step-num { background: #fff; color: #000; }
        .hitl-step-done   .hitl-step-num { background: rgba(74,222,128,0.15); color: var(--hg); }

        /* BODY */
        .hitl-body { flex: 1; overflow-y: auto; padding: 28px; background: #0C1520; }

        /* CANVAS */
        .hitl-canvas { display: flex; flex-direction: column; gap: 0; max-width: 680px; margin: 0 auto; }

        .hitl-connector { width: 2px; height: 28px; background: rgba(255,255,255,0.08); margin: 0 auto; }

        /* BLOCK */
        .hitl-block {
          background: #0F1E30; border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px; padding: 24px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.03);
        }
        .hitl-block-head {
          display: flex; align-items: center; gap: 10px; margin-bottom: 16px;
          padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .hitl-block-head h3 { font-size: 15px; font-weight: 600; color: #fff; margin: 0; }
        .hitl-block-tag {
          font-size: 11px; font-weight: 700; padding: 3px 9px; border-radius: 20px;
          margin-left: auto;
        }
        .hitl-tag-neutral { background: rgba(255,255,255,0.06); color: var(--hm); border: 1px solid rgba(255,255,255,0.1); }
        .hitl-icon-muted { color: var(--hm); }

        .hitl-desc { font-size: 14px; color: var(--hm); line-height: 1.6; margin: 0 0 20px; }

        /* SIGNAL LIST */
        .hitl-signal-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px; }
        .hitl-list-label { font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--hm); letter-spacing: 0.5px; display: block; margin-bottom: 4px; }
        .hitl-signal-row { display: flex; gap: 14px; align-items: flex-start; }
        .hitl-signal-dot { width: 8px; height: 8px; border-radius: 50%; margin-top: 5px; flex-shrink: 0; background: var(--hm); }
        .hitl-signal-content { flex: 1; }
        .hitl-signal-text { font-size: 14px; color: #fff; display: block; margin-bottom: 4px; }
        .hitl-signal-meta { display: flex; align-items: center; gap: 10px; }
        .hitl-signal-agent { display: flex; align-items: center; gap: 4px; font-size: 11px; color: var(--hm); font-weight: 600; }
        .hitl-signal-weight { font-size: 11px; font-weight: 700; }

        /* INACTION BOX */
        .hitl-inaction-box {
          display: flex; gap: 12px; align-items: flex-start;
          background: rgba(255,77,106,0.07); border: 1px solid rgba(255,77,106,0.2);
          border-radius: 8px; padding: 14px;
        }
        .hitl-inaction-full {
          display: flex; gap: 14px; align-items: flex-start;
          background: rgba(255,77,106,0.07); border: 1px solid rgba(255,77,106,0.2);
        }
        .hitl-inaction-label { font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--hd); letter-spacing: 0.4px; display: block; margin-bottom: 4px; }
        .hitl-inaction-text  { font-size: 13px; color: #E2E8F0; line-height: 1.5; margin: 0; }

        /* AGENT CHAIN */
        .hitl-chain { display: flex; flex-direction: column; }
        .hitl-chain-step { display: flex; gap: 20px; }
        .hitl-chain-node { display: flex; flex-direction: column; align-items: center; flex-shrink: 0; }
        .hitl-chain-dot  { width: 12px; height: 12px; border-radius: 50%; z-index: 2; margin-top: 3px; }
        .hitl-chain-line { width: 2px; flex: 1; background: rgba(255,255,255,0.08); margin: 4px 0; min-height: 28px; }
        .hitl-chain-content { flex: 1; padding-bottom: 28px; }
        .hitl-chain-meta { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; flex-wrap: wrap; }
        .hitl-chain-layer { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; padding: 3px 8px; border-radius: 4px; }
        .hitl-chain-agent { display: flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 700; color: #fff; }
        .hitl-chain-time  { font-size: 11px; color: var(--hm); margin-left: auto; }
        .hitl-chain-action { font-size: 14px; color: #E2E8F0; line-height: 1.5; margin: 0; }

        /* INTERVENTION FORM */
        .hitl-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .hitl-form-group { display: flex; flex-direction: column; gap: 6px; }
        .hitl-mb-16 { margin-bottom: 16px; }
        .hitl-label { font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--hm); letter-spacing: 0.5px; }
        .hitl-input, .hitl-textarea {
          background: #07101C; border: 1px solid rgba(255,255,255,0.09); border-radius: 8px;
          color: #fff; padding: 10px 14px; font-size: 13px; outline: none;
          font-family: inherit; transition: border-color 0.2s; width: 100%; box-sizing: border-box;
        }
        .hitl-input:focus, .hitl-textarea:focus { border-color: var(--hp); box-shadow: 0 0 0 2px rgba(139,92,246,0.15); }
        .hitl-mono { font-family: 'SF Mono', 'Fira Code', monospace; font-size: 12px; }
        .hitl-textarea { resize: vertical; }

        .hitl-ai-reason {
          display: flex; gap: 10px; align-items: flex-start;
          background: rgba(139,92,246,0.08); border: 1px solid rgba(139,92,246,0.2);
          border-radius: 8px; padding: 12px 14px; margin-bottom: 16px;
          font-size: 13px; color: #C8D8E8; line-height: 1.5;
        }

        .hitl-channels { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 12px; }
        .hitl-channel-btn {
          flex: 1; min-width: 120px; padding: 12px 16px; background: #07101C;
          border: 1px solid rgba(255,255,255,0.09); border-radius: 8px;
          color: #fff; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s;
        }
        .hitl-channel-btn:hover { border-color: rgba(255,255,255,0.2); }
        .hitl-channel-selected { background: rgba(139,92,246,0.15) !important; border-color: var(--hp) !important; color: var(--hp) !important; }
        .hitl-channel-note {
          display: flex; align-items: center; gap: 6px;
          font-size: 12px; color: var(--hm); margin: 0;
        }

        .hitl-split-block { display: flex; gap: 24px; }
        .hitl-sb-left { flex: 1; }
        .hitl-sb-right { width: 220px; display: flex; align-items: flex-start; justify-content: center; }

        .hitl-phone { width: 200px; height: 320px; border: 6px solid #1A1C22; border-radius: 28px; background: #000; overflow: hidden; position: relative; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
        .hitl-phone-notch { position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 90px; height: 18px; background: #1A1C22; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px; z-index: 10; }
        .hitl-phone-screen { padding: 28px 12px 12px; height: 100%; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); }
        .hitl-notif { background: rgba(20,20,25,0.9); backdrop-filter: blur(10px); padding: 12px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.1); }
        .hitl-notif-header { display: flex; align-items: center; gap: 6px; font-size: 10px; color: rgba(255,255,255,0.5); margin-bottom: 7px; }
        .hitl-app-icon { width: 14px; height: 14px; background: #E60028; border-radius: 3px; display: flex; align-items: center; justify-content: center; font-size: 8px; font-weight: 700; color: #fff; }
        .hitl-notif-title { font-size: 12px; font-weight: 700; color: #fff; margin-bottom: 4px; }
        .hitl-notif-body  { font-size: 11px; color: rgba(255,255,255,0.7); line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }

        /* DECISION STEP */
        .hitl-impact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .hitl-impact-box {
          padding: 16px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06);
          border-radius: 10px; display: flex; flex-direction: column; gap: 6px;
        }
        .hitl-impact-success { background: rgba(74,222,128,0.05); border-color: rgba(74,222,128,0.2); }
        .hitl-impact-label { font-size: 11px; text-transform: uppercase; color: var(--hm); font-weight: 700; letter-spacing: 0.4px; }
        .hitl-impact-val   { font-size: 22px; font-weight: 700; letter-spacing: -0.5px; color: #fff; }

        .hitl-decision-btns { display: flex; flex-direction: column; gap: 12px; }
        .hitl-btn-approve {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          background: var(--hg); color: #000; border: none;
          padding: 14px 24px; border-radius: 8px; font-size: 14px; font-weight: 700; cursor: pointer;
          transition: all 0.2s; width: 100%;
        }
        .hitl-btn-approve:hover { filter: brightness(1.1); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(74,222,128,0.3); }

        .hitl-schedule-wrap { display: flex; gap: 10px; }
        .hitl-date-input {
          flex: 1; background: #07101C; border: 1px solid rgba(255,255,255,0.09); border-radius: 8px;
          color: #fff; padding: 10px 14px; font-size: 13px; outline: none; font-family: inherit;
        }
        .hitl-date-input:focus { border-color: var(--ha); }
        .hitl-btn-schedule {
          display: flex; align-items: center; gap: 6px;
          background: rgba(56,182,255,0.1); border: 1px solid rgba(56,182,255,0.3); color: var(--ha);
          padding: 10px 18px; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer;
          transition: all 0.2s; white-space: nowrap;
        }
        .hitl-btn-schedule:disabled { opacity: 0.4; cursor: not-allowed; }
        .hitl-btn-schedule:not(:disabled):hover { background: rgba(56,182,255,0.2); }

        .hitl-reject-wrap { display: flex; gap: 10px; }
        .hitl-reject-select {
          flex: 1; background: #07101C; border: 1px solid rgba(255,255,255,0.09); border-radius: 8px;
          color: #E2E8F0; padding: 10px 14px; font-size: 13px; outline: none; font-family: inherit;
        }
        .hitl-reject-select:focus { border-color: var(--hd); }
        .hitl-btn-reject {
          background: rgba(255,77,106,0.1); border: 1px solid rgba(255,77,106,0.3); color: var(--hd);
          padding: 10px 18px; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer;
          transition: all 0.2s; white-space: nowrap;
        }
        .hitl-btn-reject:disabled { opacity: 0.4; cursor: not-allowed; }
        .hitl-btn-reject:not(:disabled):hover { background: rgba(255,77,106,0.2); }

        /* OUTCOME SCREENS */
        .hitl-outcome {
          align-items: center; justify-content: center; text-align: center;
          padding: 80px 40px; gap: 20px; color: #E2E8F0;
        }
        .hitl-outcome h3 { font-size: 22px; font-weight: 700; color: #fff; margin: 0; }
        .hitl-outcome p  { font-size: 15px; color: var(--hm); margin: 0; max-width: 400px; }

        /* FOOTER */
        .hitl-footer {
          display: flex; justify-content: space-between; align-items: center;
          padding: 16px 28px; border-top: 1px solid rgba(255,255,255,0.07);
          background: #091019; flex-shrink: 0;
        }
        .hitl-footer-nav { display: flex; gap: 10px; }
        .hitl-btn-secondary {
          background: transparent; border: 1px solid rgba(255,255,255,0.12); color: #E2E8F0;
          padding: 9px 18px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer;
          display: flex; align-items: center; gap: 6px; transition: all 0.2s;
        }
        .hitl-btn-secondary:hover { background: rgba(255,255,255,0.05); }
        .hitl-btn-next {
          background: #fff; color: #080808;
          border: none; padding: 9px 20px; border-radius: 8px;
          font-size: 13px; font-weight: 700; cursor: pointer;
          display: flex; align-items: center; gap: 6px; transition: all 0.2s;
        }
        .hitl-btn-next:hover { background: #E2E8F0; transform: translateY(-1px); }
      `}</style>
    </div>
  );
}
