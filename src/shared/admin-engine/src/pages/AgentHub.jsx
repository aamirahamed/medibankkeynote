import { useNavigate } from 'react-router-dom';
import { Zap, ArrowRight, CheckCircle, Clock, Activity, ChevronRight } from 'lucide-react';
import { agentRoster, activePipelineToday, agentActivityLog } from '../data/mockData';

const LAYER_CONFIG = {
  Detection:     { color: '#FF4D6A', dim: 'rgba(255,77,106,0.12)',   border: 'rgba(255,77,106,0.25)',   label: 'Detection Layer' },
  Intelligence:  { color: '#38B6FF', dim: 'rgba(56,182,255,0.12)',   border: 'rgba(56,182,255,0.25)',   label: 'Intelligence Layer' },
  Orchestration: { color: '#8B5CF6', dim: 'rgba(139,92,246,0.12)',   border: 'rgba(139,92,246,0.25)',   label: 'Orchestration Layer' },
};

const AI_TYPE_CONFIG = {
  'ML Clustering':    { bg: 'rgba(74,222,128,0.10)',  color: '#4ADE80' },
  'Predictive ML':    { bg: 'rgba(74,222,128,0.10)',  color: '#4ADE80' },
  'NLP + Scoring':    { bg: 'rgba(74,222,128,0.10)',  color: '#4ADE80' },
  'Rules / Logic':    { bg: 'rgba(138,147,166,0.12)', color: '#8A93A6' },
  'Scoring + Gen AI': { bg: 'rgba(110,231,242,0.10)', color: '#6EE7F2' },
  'ML + Gen AI':      { bg: 'rgba(110,231,242,0.10)', color: '#6EE7F2' },
  'Gen AI (LLM)':     { bg: 'rgba(139,92,246,0.12)',  color: '#A78BFA' },
  'RAG + Gen AI':     { bg: 'rgba(139,92,246,0.12)',  color: '#A78BFA' },
};

const STATUS_CONFIG = {
  active:     { color: '#4ADE80', label: 'Active' },
  monitoring: { color: '#F5B544', label: 'Monitoring' },
  'on-demand':{ color: '#38B6FF', label: 'On-demand' },
};

function AgentCard({ agent }) {
  const layer = LAYER_CONFIG[agent.layer] || {};
  const aiStyle = AI_TYPE_CONFIG[agent.aiType] || { bg: 'rgba(107,114,128,0.15)', color: '#9CA3AF' };
  const status = STATUS_CONFIG[agent.status] || STATUS_CONFIG.monitoring;

  return (
    <div className="aih-agent-card" style={{ borderLeft: `3px solid ${layer.color}` }}>
      <div className="aih-ac-top">
        <span className="aih-ac-name">{agent.name}</span>
        <div className="aih-ac-status">
          <span className="aih-ac-dot" style={{ background: status.color, boxShadow: `0 0 5px ${status.color}` }} />
          <span className="aih-ac-status-label" style={{ color: status.color }}>{agent.statusLabel}</span>
        </div>
      </div>
      <p className="aih-ac-purpose">{agent.purpose}</p>
      <div className="aih-ac-badges">
        <span className="aih-ac-badge" style={{ background: aiStyle.bg, color: aiStyle.color }}>{agent.aiType}</span>
        {agent.confidence && (
          <span className="aih-ac-badge" style={{ background: 'rgba(255,255,255,0.05)', color: '#6B7280' }}>{agent.confidence} confidence</span>
        )}
      </div>
      <div className="aih-ac-last">
        <span className="aih-ac-last-text">{agent.lastAction}</span>
        <span className="aih-ac-last-time">{agent.lastActionTime}</span>
      </div>
      {agent.signalsToday !== null && (
        <div className="aih-ac-signals">
          <Activity size={11} style={{ color: 'var(--fg-5)' }} />
          <span>{agent.signalsToday} signal{agent.signalsToday !== 1 ? 's' : ''} today</span>
        </div>
      )}
    </div>
  );
}

const LAYERS = ['Detection', 'Intelligence', 'Orchestration'];

export default function AgentHub() {
  const navigate = useNavigate();

  return (
    <div className="aih-page">
      <style>{`
        .aih-page {
          padding: 40px 48px 80px;
          background: var(--bg-0);
          min-height: 100vh;
          color: var(--fg-2);
          font-family: var(--font-sans);
        }

        /* ── Header ── */
        .aih-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 32px;
          margin-bottom: 48px;
        }
        .aih-header-left h1 {
          font-size: 28px;
          font-weight: 700;
          color: var(--fg-1);
          margin: 0 0 6px;
          letter-spacing: -0.02em;
        }
        .aih-header-top {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 6px;
        }
        .aih-live-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          background: var(--success-wash);
          border: 1px solid rgba(74,222,128,0.25);
          border-radius: 20px;
          padding: 3px 10px;
          font-size: 11px;
          font-weight: 600;
          color: var(--success);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .aih-live-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--success);
          box-shadow: 0 0 5px rgba(74,222,128,0.8);
          animation: aih-blink 2s ease-in-out infinite;
        }
        @keyframes aih-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .aih-subtitle {
          font-size: 14px;
          color: var(--fg-4);
          margin: 0;
          max-width: 580px;
          line-height: 1.6;
        }
        .aih-header-stats {
          display: flex;
          gap: 32px;
          flex-shrink: 0;
        }
        .aih-hstat {
          text-align: right;
        }
        .aih-hstat-val {
          display: block;
          font-size: 36px;
          font-weight: 700;
          color: var(--fg-1);
          letter-spacing: -0.03em;
          line-height: 1;
        }
        .aih-hstat-label {
          font-size: 12px;
          color: var(--fg-4);
          margin-top: 4px;
          display: block;
        }

        /* ── Pipeline ── */
        .aih-pipeline {
          background: var(--bg-2);
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 28px 32px;
          margin-bottom: 48px;
          box-shadow: var(--shadow-2);
        }
        .aih-section-eyebrow {
          font-size: 11px;
          font-weight: 600;
          color: var(--fg-5);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 8px;
        }
        .aih-pipeline-name {
          font-size: 17px;
          font-weight: 600;
          color: var(--fg-1);
          margin-bottom: 4px;
        }
        .aih-pipeline-desc {
          font-size: 13px;
          color: var(--fg-4);
          margin-bottom: 24px;
        }
        .aih-pipeline-steps {
          display: flex;
          align-items: center;
          gap: 0;
          overflow-x: auto;
          padding-bottom: 4px;
          scrollbar-width: none;
        }
        .aih-pipeline-steps::-webkit-scrollbar { display: none; }
        .aih-step-wrap {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
        .aih-step-card {
          width: 148px;
          background: var(--bg-1);
          border: 1px solid var(--line);
          border-radius: 10px;
          padding: 12px 14px;
          flex-shrink: 0;
        }
        .aih-step-card.aih-step-complete {
          border-color: rgba(74,222,128,0.25);
        }
        .aih-step-card.aih-step-pending {
          border-color: rgba(245,181,68,0.35);
          background: rgba(245,181,68,0.04);
        }
        .aih-step-layer-tag {
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 5px;
        }
        .aih-step-agent-name {
          font-size: 12px;
          font-weight: 600;
          color: var(--fg-1);
          margin-bottom: 5px;
          line-height: 1.3;
        }
        .aih-step-output {
          font-size: 11px;
          color: var(--fg-4);
          line-height: 1.4;
        }
        .aih-step-status {
          margin-top: 8px;
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 10px;
        }
        .aih-step-arrow {
          color: var(--fg-5);
          font-size: 16px;
          padding: 0 6px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
        }

        /* ── Three-layer columns ── */
        .aih-layers {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 24px;
          margin-bottom: 48px;
          align-items: start;
        }
        .aih-layer-col {}
        .aih-layer-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--line-soft);
        }
        .aih-layer-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .aih-layer-name {
          font-size: 13px;
          font-weight: 600;
          color: var(--fg-1);
          flex: 1;
        }
        .aih-layer-count {
          font-size: 11px;
          color: var(--fg-5);
        }
        .aih-layer-desc {
          font-size: 12px;
          color: var(--fg-5);
          margin-bottom: 16px;
          line-height: 1.5;
        }
        .aih-agent-cards {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        /* ── Agent card ── */
        .aih-agent-card {
          background: var(--bg-2);
          border: 1px solid var(--line-soft);
          border-radius: 12px;
          padding: 16px 18px;
          box-shadow: var(--shadow-1);
          transition: border-color var(--dur-2) var(--ease-out);
        }
        .aih-agent-card:hover {
          border-color: var(--line-strong);
        }
        .aih-ac-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 8px;
        }
        .aih-ac-name {
          font-size: 13px;
          font-weight: 600;
          color: var(--fg-1);
          line-height: 1.3;
        }
        .aih-ac-status {
          display: flex;
          align-items: center;
          gap: 5px;
          flex-shrink: 0;
        }
        .aih-ac-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .aih-ac-status-label {
          font-size: 11px;
          font-weight: 500;
        }
        .aih-ac-purpose {
          font-size: 12px;
          color: var(--fg-4);
          line-height: 1.55;
          margin: 0 0 10px;
        }
        .aih-ac-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 10px;
        }
        .aih-ac-badge {
          font-size: 10px;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 20px;
          letter-spacing: 0.02em;
        }
        .aih-ac-last {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 8px;
          padding-top: 10px;
          border-top: 1px solid var(--line-soft);
        }
        .aih-ac-last-text {
          font-size: 11px;
          color: var(--fg-5);
          line-height: 1.5;
          flex: 1;
          font-style: italic;
        }
        .aih-ac-last-time {
          font-size: 10px;
          color: var(--fg-5);
          flex-shrink: 0;
          margin-top: 1px;
        }
        .aih-ac-signals {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-top: 8px;
          font-size: 10px;
          color: var(--fg-5);
        }

        /* ── Activity log ── */
        .aih-log-section {
          margin-bottom: 48px;
        }
        .aih-log-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .aih-log-head h2 {
          font-size: 17px;
          font-weight: 600;
          color: var(--fg-1);
          margin: 0;
        }
        .aih-log-period {
          font-size: 12px;
          color: var(--fg-5);
        }
        .aih-log-list {
          background: var(--bg-2);
          border: 1px solid var(--line);
          border-radius: 14px;
          overflow: hidden;
          box-shadow: var(--shadow-2);
        }
        .aih-log-entry {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 14px 20px;
          border-bottom: 1px solid var(--line-soft);
        }
        .aih-log-entry:last-child { border-bottom: none; }
        .aih-log-entry:hover { background: var(--bg-3); }
        .aih-log-layer-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 5px;
        }
        .aih-log-body {
          flex: 1;
          min-width: 0;
        }
        .aih-log-agent-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 3px;
        }
        .aih-log-agent-name {
          font-size: 12px;
          font-weight: 600;
          color: var(--fg-1);
        }
        .aih-log-layer-tag {
          font-size: 10px;
          font-weight: 600;
          padding: 1px 7px;
          border-radius: 20px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .aih-log-action {
          font-size: 12px;
          color: var(--fg-4);
          line-height: 1.5;
        }
        .aih-log-time {
          font-size: 11px;
          color: var(--fg-5);
          flex-shrink: 0;
          margin-top: 3px;
        }

        /* ── CTA ── */
        .aih-cta-row {
          display: flex;
          gap: 12px;
          margin-bottom: 48px;
        }
        .aih-cta-primary {
          display: flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(180deg, var(--medibank-blue-glow) 0%, var(--medibank-blue) 100%);
          color: #00141f;
          border: none;
          border-radius: var(--r-3);
          padding: 12px 20px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 1px 0 rgba(255,255,255,0.25) inset, var(--glow-human);
          transition: filter var(--dur-2) var(--ease-out);
        }
        .aih-cta-primary:hover { filter: brightness(1.08); }
        .aih-cta-secondary {
          display: flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(180deg, var(--bg-4) 0%, var(--bg-3) 100%);
          color: var(--fg-2);
          border: 1px solid var(--line-strong);
          border-radius: var(--r-3);
          padding: 12px 20px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          box-shadow: var(--shadow-1);
          transition: filter var(--dur-2) var(--ease-out);
        }
        .aih-cta-secondary:hover { filter: brightness(1.10); }

        /* ── Summary ── */
        .aih-summary {
          background: var(--ai-wash);
          border: 1px solid rgba(110,231,242,0.15);
          border-radius: 14px;
          padding: 24px 28px;
          font-size: 14px;
          color: var(--fg-3);
          line-height: 1.7;
          font-style: italic;
          font-family: var(--font-display);
        }
      `}</style>

      {/* Header */}
      <div className="aih-header">
        <div className="aih-header-left">
          <div className="aih-header-top">
            <h1>Agent Intelligence Hub</h1>
            <div className="aih-live-badge">
              <div className="aih-live-dot" />
              Live
            </div>
          </div>
          <p className="aih-subtitle">
            10 specialised agents operating across 3 intelligence layers — detecting signals, reasoning about opportunities, and packaging decisions for human review.
          </p>
        </div>
        <div className="aih-header-stats">
          <div className="aih-hstat">
            <span className="aih-hstat-val">10</span>
            <span className="aih-hstat-label">Agents Active</span>
          </div>
          <div className="aih-hstat">
            <span className="aih-hstat-val">4</span>
            <span className="aih-hstat-label">Signals Today</span>
          </div>
          <div className="aih-hstat">
            <span className="aih-hstat-val">3</span>
            <span className="aih-hstat-label">Decisions Generated</span>
          </div>
        </div>
      </div>

      {/* Active Pipeline */}
      <div className="aih-pipeline">
        <div className="aih-section-eyebrow">Today's Active Pipeline</div>
        <div className="aih-pipeline-name">{activePipelineToday.name}</div>
        <div className="aih-pipeline-desc">{activePipelineToday.description}</div>
        <div className="aih-pipeline-steps">
          {activePipelineToday.steps.map((step, i) => {
            const layerCfg = LAYER_CONFIG[step.layer] || {};
            const isHuman = step.layer === null;
            return (
              <div key={i} className="aih-step-wrap">
                <div className={`aih-step-card aih-step-${step.status}`}>
                  {!isHuman && (
                    <div className="aih-step-layer-tag" style={{ color: layerCfg.color }}>
                      {step.layer}
                    </div>
                  )}
                  <div className="aih-step-agent-name">{step.agent}</div>
                  <div className="aih-step-output">{step.output}</div>
                  <div className="aih-step-status">
                    {step.status === 'complete' ? (
                      <><CheckCircle size={10} style={{ color: '#4ADE80' }} /><span style={{ color: '#4ADE80' }}>Complete</span></>
                    ) : (
                      <><Clock size={10} style={{ color: '#F5B544' }} /><span style={{ color: '#F5B544' }}>Awaiting you</span></>
                    )}
                  </div>
                </div>
                {i < activePipelineToday.steps.length - 1 && (
                  <div className="aih-step-arrow">
                    <ArrowRight size={14} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA row */}
      <div className="aih-cta-row">
        <button className="aih-cta-primary" onClick={() => navigate('/action-studio')}>
          <Zap size={15} />
          Review Pending Decisions
        </button>
        <button className="aih-cta-secondary" onClick={() => navigate('/')}>
          <ChevronRight size={15} />
          Back to Command Centre
        </button>
      </div>

      {/* Three-layer agent grid */}
      <div className="aih-layers">
        {LAYERS.map(layer => {
          const cfg = LAYER_CONFIG[layer];
          const agents = agentRoster.filter(a => a.layer === layer);
          const layerDescriptions = {
            Detection: 'Monitor raw data and raise lifecycle signals. These agents never wait — they watch continuously.',
            Intelligence: 'Take signals from the Detection layer and reason about what to do. They score, predict, and recommend.',
            Orchestration: 'Package everything for human action. They decide how to deliver, what to say, and how to summarise.',
          };
          return (
            <div key={layer} className="aih-layer-col">
              <div className="aih-layer-header">
                <div className="aih-layer-dot" style={{ background: cfg.color, boxShadow: `0 0 6px ${cfg.color}` }} />
                <span className="aih-layer-name">{cfg.label}</span>
                <span className="aih-layer-count">{agents.length} agents</span>
              </div>
              <p className="aih-layer-desc">{layerDescriptions[layer]}</p>
              <div className="aih-agent-cards">
                {agents.map(agent => <AgentCard key={agent.id} agent={agent} />)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Activity Log */}
      <div className="aih-log-section">
        <div className="aih-log-head">
          <h2>Agent Activity Log</h2>
          <span className="aih-log-period">Last 24 hours</span>
        </div>
        <div className="aih-log-list">
          {agentActivityLog.map((entry, i) => {
            const layerCfg = LAYER_CONFIG[entry.layer] || { color: '#8A93A6', dim: 'rgba(138,147,166,0.1)' };
            return (
              <div key={i} className="aih-log-entry">
                <div className="aih-log-layer-dot" style={{ background: layerCfg.color }} />
                <div className="aih-log-body">
                  <div className="aih-log-agent-row">
                    <span className="aih-log-agent-name">{entry.agent}</span>
                    {entry.layer && (
                      <span
                        className="aih-log-layer-tag"
                        style={{ background: layerCfg.dim, color: layerCfg.color }}
                      >
                        {entry.layer}
                      </span>
                    )}
                  </div>
                  <div className="aih-log-action">{entry.action}</div>
                </div>
                <span className="aih-log-time">{entry.time}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary */}
      <div className="aih-summary">
        "The 10-agent pipeline collectively processed 12,450 student profiles today — triggering 4 lifecycle moments, generating 3 packaged decisions, and identifying $265K in near-term revenue opportunity. All decisions await human approval."
      </div>
    </div>
  );
}
