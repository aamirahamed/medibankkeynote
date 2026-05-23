import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import {
  aiBriefing, aiFeed, agentCollaborationFlow,
  executiveSummary, aiWorkflows
} from '../data/mockData';

const OPS_METRICS = [
  {
    id: 'conversion',
    label: 'OVHC Conversion Rate',
    value: '18.4%',
    trend: '+2.1%',
    trendDir: 'up',
    subtitle: 'Highest in 60 days',
    hint: '82% of converters engaged with OVHC pricing 3+ times before purchasing.',
    accent: '#4ADE80',
    accentDim: 'rgba(74,222,128,0.08)',
    spark: [14.2, 15.1, 15.8, 16.4, 17.1, 17.8, 18.4],
  },
  {
    id: 'intent',
    label: 'High-Intent Students',
    value: '3,240',
    trend: '+14%',
    trendDir: 'up',
    subtitle: 'RMIT & Monash cohorts',
    hint: '82% are from RMIT & Monash — graduate transition window is currently active.',
    accent: '#38B6FF',
    accentDim: 'rgba(56,182,255,0.08)',
    spark: [1820, 2100, 2360, 2640, 2880, 3050, 3240],
  },
  {
    id: 'churn',
    label: 'Students at Churn Risk',
    value: '1,240',
    trend: '↓ 6%',
    trendDir: 'good',
    subtitle: '48h intervention window',
    hint: 'Silent disengagement detected. WhatsApp re-engagement recovers ~35% of at-risk students.',
    accent: '#FF4D6A',
    accentDim: 'rgba(255,77,106,0.08)',
    pulse: true,
  },
  {
    id: 'referral',
    label: 'Referral Revenue',
    value: '+$420K',
    trend: '+18%',
    trendDir: 'up',
    subtitle: 'Ambassador momentum growing',
    hint: '127 students recently crossed the 3-referral threshold — ambassador tier activation pending.',
    accent: '#4ADE80',
    accentDim: 'rgba(74,222,128,0.08)',
    spark: [210, 255, 285, 312, 355, 390, 420],
  },
  {
    id: 'pipeline',
    label: 'Active Pipeline',
    value: '12,420',
    trend: '63% done',
    trendDir: 'neutral',
    subtitle: 'Journey completion rate',
    hint: 'Students approaching the graduation window. Transition content engagement up 14% WoW.',
    accent: '#8B5CF6',
    accentDim: 'rgba(139,92,246,0.08)',
    completion: 63,
  },
];

function Sparkline({ data, color }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const W = 72; const H = 22;
  const pts = data.map((v, i) => {
    const x = ((i / (data.length - 1)) * W).toFixed(1);
    const y = (H - ((v - min) / range) * (H - 3) - 1).toFixed(1);
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none" className="cc-oc-spark">
      <polyline points={pts} stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const SHIFTS = [
  { text: 'Referral activity',       change: '+22%', pos: true  },
  { text: 'OVHC pricing engagement', change: '+14%', pos: true  },
  { text: 'Silent churn risk',       change: '↓ 6%', pos: true  },
  { text: 'Monash community',        change: 'Spike', pos: true },
];

const OPP_SIGNALS = [
  'Repeated OVHC pricing page exploration',
  'Graduate visa webinar participation',
  'Referral momentum increasing this week',
  'Higher health engagement activity detected',
];

const CONFIDENCE_FACTORS = [
  'Behavioural signals',
  'Campaign performance data',
  'Referral patterns',
  'Historical conversion trends',
];

const LAYER_COLORS = {
  Detection:     '#FF4D6A',
  Intelligence:  '#38B6FF',
  Orchestration: '#8B5CF6',
};

export default function CommandCentre() {
  const navigate = useNavigate();
  const [explainOpen, setExplainOpen] = useState(false);

  const [wfHigh, wfMed, wfLow] = aiWorkflows;

  return (
    <div className="cc-root">

      {/* ── HEADER ── */}
      <div className="cc-header">
        <h1>Command Centre</h1>
        <span className="cc-header-meta">
          Tuesday, 19 May 2026&nbsp;&nbsp;·&nbsp;&nbsp;<span className="cc-live-dot">●</span> System Active
        </span>
      </div>

      {/* ── 1. OPERATIONAL INTELLIGENCE STRIP ── */}
      <div className="cc-ops-wrap">
        <div className="cc-ops-grid">
          {OPS_METRICS.map((m) => (
            <div
              key={m.id}
              className="cc-ops-card"
              style={{ '--oc-accent': m.accent, '--oc-dim': m.accentDim }}
            >
              <div className="cc-oc-top">
                <span className="cc-oc-label">{m.label}</span>
                <span className={`cc-oc-trend cc-oct-${m.trendDir}`}>{m.trend}</span>
              </div>
              <div className="cc-oc-value">{m.value}</div>
              <div className="cc-oc-sub">{m.subtitle}</div>

              {m.spark && <Sparkline data={m.spark} color={m.accent} />}
              {m.completion !== undefined && (
                <div className="cc-oc-bar-bg">
                  <div className="cc-oc-bar-fill" style={{ width: `${m.completion}%`, background: m.accent }} />
                </div>
              )}
              {m.pulse && (
                <div className="cc-oc-pulse-row">
                  <span className="cc-oc-pulse-dot" />
                  <span className="cc-oc-pulse-txt">Active risk signal</span>
                </div>
              )}

              <div className="cc-oc-hint">{m.hint}</div>
            </div>
          ))}
        </div>
        <p className="cc-ops-narrative">
          <span className="cc-ops-ai-tag">AI</span>
          Referral momentum and graduate-transition behaviour continue to outperform baseline engagement patterns.
        </p>
      </div>

      {/* ── 2. INTELLIGENCE BRIEF ── */}
      <section className="cc-section cc-brief-section">
        <div className="cc-brief-eyebrow">
          Intelligence Brief&nbsp;&nbsp;·&nbsp;&nbsp;19 May 2026&nbsp;&nbsp;·&nbsp;&nbsp;Insight Narrator Agent
        </div>
        <h2 className="cc-brief-headline">
          3,240 graduating students are ready for OVHC conversion — and referral momentum is growing.
        </h2>
        <p className="cc-brief-sub">
          This cohort shows the strongest behavioural signals seen in the last 60 days. Two workflows targeting this opportunity are awaiting your review.
        </p>

        <div className="cc-brief-body">
          <div className="cc-opp-card">
            <div className="cc-opp-eyebrow">Primary Opportunity</div>
            <div className="cc-opp-title">RMIT &amp; Monash Graduating Cohort</div>
            <div className="cc-opp-sub">3,240 students · +$180K projected revenue</div>
            <div className="cc-opp-signals">
              {OPP_SIGNALS.map((s, i) => (
                <div key={i} className="cc-opp-sig">
                  <span className="cc-sig-dot" />
                  {s}
                </div>
              ))}
            </div>
            <button className="cc-opp-btn" onClick={() => navigate('/action-studio')}>
              Review in Action Studio <ArrowRight size={13} />
            </button>
          </div>

          <div className="cc-conf-panel">
            <div className="cc-conf-eyebrow">AI Confidence</div>
            <div className="cc-conf-pct">{aiBriefing.confidence}</div>
            <div className="cc-conf-label">Composite Score</div>
            <div className="cc-conf-factors">
              <div className="cc-cf-title">Based on</div>
              {CONFIDENCE_FACTORS.map((f, i) => (
                <div key={i} className="cc-cf-row">
                  <span className="cc-cf-check">✓</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="cc-shifts-strip">
          <span className="cc-shifts-label">Behavioral shifts this week</span>
          <div className="cc-shifts">
            {SHIFTS.map((s, i) => (
              <div key={i} className="cc-shift cc-shift-pos">
                <span className="cc-shift-change">{s.change}</span>
                <span className="cc-shift-text">{s.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="cc-focus-suggestion">
          <span className="cc-fs-label">Suggested focus</span>
          <span className="cc-fs-text">
            Prioritise the <strong>Graduate Transition Sequence</strong> in Action Studio today — highest confidence, highest near-term revenue impact of all pending decisions.
          </span>
        </div>
      </section>

      {/* ── 3. DECISIONS QUEUE ── */}
      <section className="cc-section">
        <div className="cc-section-head">
          <div className="cc-sh-left">
            <span className="cc-hitl-pill">Human Review Required</span>
            <h2 className="cc-sh-title">Decisions Pending Review</h2>
            <p className="cc-sh-sub">Agents have prepared recommendations. Your approval is required before any action is taken.</p>
          </div>
          <button className="cc-studio-btn" onClick={() => navigate('/action-studio')}>
            Open Action Studio <ArrowRight size={14} />
          </button>
        </div>

        {wfHigh && (
          <div className="cc-decision cc-d-high">
            <div className="cc-d-priority-tag">High Priority</div>
            <div className="cc-d-body">
              <div className="cc-d-left">
                <h3 className="cc-d-title">{wfHigh.name}</h3>
                <p className="cc-d-why">{wfHigh.why}</p>
                <div className="cc-d-signals">
                  {wfHigh.signalChain.map((s, i) => (
                    <div key={i} className="cc-d-sig">
                      <span className="cc-dsig-weight">{s.weight}</span>
                      <span className="cc-dsig-text">{s.signal}</span>
                    </div>
                  ))}
                </div>
                <div className="cc-d-risk">
                  <span className="cc-d-risk-label">Risk of inaction</span>
                  <span className="cc-d-risk-text">{wfHigh.riskOfInaction.split('.')[0]}.</span>
                </div>
              </div>
              <div className="cc-d-right">
                <div className="cc-d-impact-block">
                  <span className="cc-d-revenue">{wfHigh.impact.revenue}</span>
                  <span className="cc-d-uplift">{wfHigh.impact.uplift}</span>
                  <span className="cc-d-conf">{wfHigh.confidence} confidence</span>
                </div>
                <div className="cc-d-ctas">
                  <button className="cc-btn-approve" onClick={() => navigate('/action-studio')}>
                    Approve &amp; Launch
                  </button>
                  <button className="cc-btn-review" onClick={() => navigate('/action-studio')}>
                    Review Details <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {wfMed && (
          <div className="cc-decision cc-d-med">
            <div className="cc-d-med-body">
              <div className="cc-d-med-left">
                <div className="cc-d-priority-tag cc-d-priority-med">Medium Priority</div>
                <h3 className="cc-d-med-title">{wfMed.name}</h3>
                <p className="cc-d-med-why">{wfMed.why}</p>
              </div>
              <div className="cc-d-med-right">
                <span className="cc-d-med-revenue">{wfMed.impact.revenue}</span>
                <span className="cc-d-uplift">{wfMed.impact.uplift}</span>
                <button className="cc-btn-review" onClick={() => navigate('/action-studio')}>
                  Review <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </div>
        )}

        {wfLow && (
          <div className="cc-decision cc-d-low">
            <div className="cc-d-priority-tag cc-d-priority-low">Low Priority</div>
            <span className="cc-d-low-title">{wfLow.name}</span>
            <span className="cc-d-low-impact">{wfLow.impact.revenue}</span>
            <button className="cc-btn-link" onClick={() => navigate('/action-studio')}>
              Review <ArrowRight size={11} />
            </button>
          </div>
        )}
      </section>

      {/* ── 4. STRATEGIC FOCUS AREAS ── */}
      <section className="cc-section">
        <h2 className="cc-section-title-plain">Strategic Focus Areas</h2>
        <div className="cc-focus-panels">
          <div className="cc-focus-panel cc-fp-opp">
            <span className="cc-fp-eyebrow cc-green">Top Opportunity</span>
            <span className="cc-fp-title">RMIT Graduating Cohort</span>
            <span className="cc-fp-sub">3,240 students · 82% conversion likelihood · +$180K</span>
            <p className="cc-fp-desc">
              RMIT postgraduate students entering the graduation window are showing 2.1× higher OVHC exploration behaviour. The Graduate Transition Sequence is the recommended intervention — highest confidence rating of any pending workflow.
            </p>
            <button className="cc-fp-btn" onClick={() => navigate('/action-studio')}>
              Review in Action Studio <ArrowRight size={12} />
            </button>
          </div>
          <div className="cc-focus-panel cc-fp-risk">
            <span className="cc-fp-eyebrow cc-red">Highest Risk</span>
            <span className="cc-fp-title">Silent Disengagement</span>
            <span className="cc-fp-sub">1,200 students · $85K revenue at risk · 48h window</span>
            <p className="cc-fp-desc">
              Students inactive beyond 45 days have an 80% probability of failing to convert to OVHC. The re-engagement window closes rapidly — delaying this intervention by 7 days reduces projected recovery by an estimated 35%.
            </p>
            <button className="cc-fp-btn" onClick={() => navigate('/action-studio')}>
              Review in Action Studio <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </section>

      {/* ── 5. OPERATIONAL INTELLIGENCE FEED ── */}
      <section className="cc-section">
        <h2 className="cc-section-title-plain">Operational Intelligence Feed</h2>
        <div className="cc-feed">
          {aiFeed.map((item) => (
            <div key={item.id} className="cc-feed-row">
              <span className="cc-feed-agent">{item.agent}</span>
              <span className="cc-feed-insight">{item.insight}</span>
              <span className={`cc-feed-impact ${item.impact.includes('-') ? 'cc-red' : 'cc-green'}`}>
                {item.impact}
              </span>
              <span className="cc-feed-time">{item.time}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. EXPLAINABILITY LAYER ── */}
      <section className="cc-section">
        <button className="cc-explain-toggle" onClick={() => setExplainOpen(o => !o)}>
          <span>How was today's top recommendation built?</span>
          {explainOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {explainOpen && (
          <div className="cc-explain-body">
            <p className="cc-explain-intro">
              The Graduate Transition Sequence was assembled by 5 collaborating agents over the past 3 hours:
            </p>
            {agentCollaborationFlow.map((step, i) => (
              <div key={step.id} className="cc-explain-step">
                <div className="cc-es-num">{String(i + 1).padStart(2, '0')}</div>
                <div className="cc-es-content">
                  <div className="cc-es-agent">
                    <span className="cc-es-name">{step.agent}</span>
                    <span className="cc-es-layer" style={{ color: LAYER_COLORS[step.layer] || 'var(--fg-4)' }}>
                      {step.layer}
                    </span>
                  </div>
                  <p className="cc-es-action">{step.action}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── EXECUTIVE SUMMARY ── */}
      <div className="cc-exec-summary">
        <p className="cc-exec-text">"{executiveSummary}"</p>
        <span className="cc-exec-attr">Insight Narrator Agent · Daily Brief</span>
      </div>

      <style>{`
        /* ─── ROOT ─────────────────────────────────────── */
        .cc-root {
          font-family: var(--font-sans);
          color: #8899AA;
          padding: 28px 60px 140px;
          max-width: 1360px;
          margin: 0 auto;
          line-height: 1.5;
        }

        /* ─── UTILITIES ────────────────────────────────── */
        .cc-green { color: #4ADE80; }
        .cc-red   { color: #FF4D6A; }
        h1, h2, h3 { margin: 0; letter-spacing: -0.03em; }

        /* ─── HEADER ───────────────────────────────────── */
        .cc-header {
          display: flex;
          align-items: baseline;
          gap: 20px;
          margin-bottom: 64px;
        }
        .cc-header h1 {
          font-size: 34px;
          font-weight: 800;
          color: #FFFFFF;
          letter-spacing: -0.04em;
        }
        .cc-header-meta {
          font-size: 14px;
          color: #475569;
        }
        .cc-live-dot { color: #4ADE80; }

        /* ─── OPERATIONAL INTELLIGENCE STRIP ──────────── */
        .cc-ops-wrap { margin-bottom: 40px; }
        .cc-ops-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 14px;
          margin-bottom: 18px;
        }

        .cc-ops-card {
          background: #0E1825;
          border: 1px solid rgba(255,255,255,0.08);
          border-top: 3px solid var(--oc-accent, rgba(255,255,255,0.1));
          border-radius: 14px;
          padding: 22px 22px 20px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 2px 16px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04);
          transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease, background 0.22s ease;
          cursor: default;
        }
        .cc-ops-card::before {
          content: '';
          position: absolute;
          top: -30px;
          right: -30px;
          width: 120px;
          height: 120px;
          background: radial-gradient(circle, var(--oc-dim, transparent) 0%, transparent 70%);
          pointer-events: none;
        }
        .cc-ops-card:hover {
          background: #111F30;
          border-color: rgba(255,255,255,0.13);
          transform: translateY(-3px);
          box-shadow: 0 10px 36px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06);
        }

        .cc-oc-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 8px;
          margin-bottom: 14px;
        }
        .cc-oc-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.55px;
          color: #485E78;
          line-height: 1.35;
        }
        .cc-oc-trend {
          font-size: 11px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 5px;
          white-space: nowrap;
          flex-shrink: 0;
          letter-spacing: 0.2px;
        }
        .cc-oct-up      { background: rgba(74,222,128,0.12);  color: #4ADE80; border: 1px solid rgba(74,222,128,0.22); }
        .cc-oct-good    { background: rgba(74,222,128,0.12);  color: #4ADE80; border: 1px solid rgba(74,222,128,0.22); }
        .cc-oct-neutral { background: rgba(139,92,246,0.12); color: #8B5CF6; border: 1px solid rgba(139,92,246,0.22); }

        .cc-oc-value {
          font-size: 36px;
          font-weight: 800;
          color: #FFFFFF;
          letter-spacing: -1.5px;
          line-height: 1;
          margin-bottom: 7px;
        }
        .cc-oc-sub {
          font-size: 12px;
          color: #6A8AA6;
          line-height: 1.4;
          margin-bottom: 14px;
        }

        /* Sparkline */
        .cc-oc-spark { display: block; opacity: 0.85; }

        /* Completion bar */
        .cc-oc-bar-bg {
          height: 3px;
          background: rgba(255,255,255,0.07);
          border-radius: 2px;
          overflow: hidden;
          margin-top: 2px;
        }
        .cc-oc-bar-fill {
          height: 100%;
          border-radius: 2px;
        }

        /* Pulse */
        .cc-oc-pulse-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 2px;
        }
        .cc-oc-pulse-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #FF4D6A;
          flex-shrink: 0;
          animation: ccPulseRed 1.8s infinite;
        }
        .cc-oc-pulse-txt {
          font-size: 11px;
          color: rgba(255,77,106,0.65);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.4px;
        }
        @keyframes ccPulseRed {
          0%   { box-shadow: 0 0 0 0 rgba(255,77,106,0.5); }
          70%  { box-shadow: 0 0 0 6px rgba(255,77,106,0); }
          100% { box-shadow: 0 0 0 0 rgba(255,77,106,0); }
        }

        /* Hover hint */
        .cc-oc-hint {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          background: linear-gradient(0deg, rgba(8,14,26,0.97) 0%, rgba(8,14,26,0.94) 100%);
          border-top: 1px solid rgba(255,255,255,0.06);
          border-radius: 0 0 13px 13px;
          padding: 14px 18px;
          font-size: 12px;
          color: #A8BECF;
          line-height: 1.55;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.22s ease, transform 0.22s ease;
          pointer-events: none;
        }
        .cc-ops-card:hover .cc-oc-hint {
          opacity: 1;
          transform: translateY(0);
        }

        /* AI narrative line */
        .cc-ops-narrative {
          font-size: 13px;
          color: #526375;
          margin: 0;
          line-height: 1.6;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 2px;
        }
        .cc-ops-ai-tag {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: #38B6FF;
          background: rgba(56,182,255,0.1);
          border: 1px solid rgba(56,182,255,0.2);
          padding: 2px 7px;
          border-radius: 4px;
          flex-shrink: 0;
        }

        /* ─── SECTIONS ─────────────────────────────────── */
        .cc-section { margin-bottom: 88px; }
        .cc-section-title-plain {
          font-size: 22px;
          font-weight: 700;
          color: #E8F0FA;
          letter-spacing: -0.02em;
          margin-bottom: 28px;
        }

        /* ─── INTELLIGENCE BRIEF ───────────────────────── */
        .cc-brief-section {
          padding: 52px 48px;
          background: linear-gradient(145deg, #0F1E35 0%, #0C1728 50%, #090F1C 100%);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06);
          position: relative;
          overflow: hidden;
        }
        .cc-brief-section::before {
          content: '';
          position: absolute;
          top: -80px;
          right: -80px;
          width: 480px;
          height: 480px;
          background: radial-gradient(ellipse, rgba(56,182,255,0.07) 0%, transparent 65%);
          pointer-events: none;
        }
        .cc-brief-eyebrow {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: #485E78;
          margin-bottom: 20px;
          position: relative;
        }
        .cc-brief-headline {
          font-size: 30px;
          font-weight: 800;
          line-height: 1.2;
          color: #FFFFFF;
          margin-bottom: 14px;
          letter-spacing: -0.035em;
          position: relative;
        }
        .cc-brief-sub {
          font-size: 15px;
          color: #8899AA;
          margin: 0 0 40px;
          line-height: 1.65;
          max-width: 680px;
          position: relative;
        }
        .cc-brief-body {
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 20px;
          margin-bottom: 36px;
          position: relative;
        }

        /* Opportunity Card */
        .cc-opp-card {
          background: rgba(14,30,50,0.8);
          border: 1px solid rgba(74,222,128,0.15);
          border-top: 2px solid #4ADE80;
          border-radius: 14px;
          padding: 32px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04);
        }
        .cc-opp-eyebrow {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          color: #4ADE80;
          margin-bottom: 12px;
        }
        .cc-opp-title {
          font-size: 20px;
          font-weight: 800;
          color: #FFFFFF;
          margin-bottom: 6px;
          letter-spacing: -0.02em;
        }
        .cc-opp-sub {
          font-size: 13px;
          color: #6A8AA6;
          margin-bottom: 24px;
        }
        .cc-opp-signals {
          display: flex;
          flex-direction: column;
          gap: 11px;
          margin-bottom: 28px;
        }
        .cc-opp-sig {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: #A8BECF;
        }
        .cc-sig-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #4ADE80;
          flex-shrink: 0;
          opacity: 0.7;
        }
        .cc-opp-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #FFFFFF;
          color: #090F1C;
          border: none;
          padding: 12px 22px;
          border-radius: 9px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          font-family: var(--font-sans);
        }
        .cc-opp-btn:hover { filter: brightness(0.92); transform: translateY(-1px); }

        /* Confidence Panel */
        .cc-conf-panel {
          background: rgba(10,18,34,0.8);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 14px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04);
        }
        .cc-conf-eyebrow {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          color: #485E78;
          margin-bottom: 14px;
        }
        .cc-conf-pct {
          font-size: 60px;
          font-weight: 900;
          color: #FFFFFF;
          letter-spacing: -3px;
          line-height: 1;
          margin-bottom: 4px;
        }
        .cc-conf-label {
          font-size: 12px;
          color: #485E78;
          margin-bottom: 24px;
        }
        .cc-conf-factors {
          border-top: 1px solid rgba(255,255,255,0.06);
          padding-top: 20px;
          flex: 1;
        }
        .cc-cf-title {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #485E78;
          margin-bottom: 12px;
        }
        .cc-cf-row {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: #8899AA;
          margin-bottom: 9px;
        }
        .cc-cf-check { color: #4ADE80; font-size: 11px; font-weight: 700; }

        /* Behavioral Shifts */
        .cc-shifts-strip {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 22px 0;
          border-top: 1px solid rgba(255,255,255,0.06);
          margin-bottom: 20px;
          flex-wrap: wrap;
          position: relative;
        }
        .cc-shifts-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          color: #485E78;
          flex-shrink: 0;
        }
        .cc-shifts { display: flex; gap: 8px; flex-wrap: wrap; }
        .cc-shift {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
        }
        .cc-shift-pos {
          background: rgba(74,222,128,0.1);
          color: #4ADE80;
          border: 1px solid rgba(74,222,128,0.2);
        }
        .cc-shift-change { font-weight: 800; }
        .cc-shift-text   { opacity: 0.8; }

        /* Focus Suggestion */
        .cc-focus-suggestion {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          background: rgba(56,182,255,0.06);
          border: 1px solid rgba(56,182,255,0.16);
          border-radius: 10px;
          padding: 18px 22px;
          position: relative;
        }
        .cc-fs-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #38B6FF;
          flex-shrink: 0;
          padding-top: 2px;
        }
        .cc-fs-text { font-size: 14px; color: #A8BECF; line-height: 1.6; }
        .cc-fs-text strong { color: #FFFFFF; }

        /* ─── SECTION HEAD ─────────────────────────────── */
        .cc-section-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 32px;
          padding-bottom: 28px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .cc-sh-left { flex: 1; }
        .cc-hitl-pill {
          display: inline-block;
          background: rgba(56,182,255,0.1);
          border: 1px solid rgba(56,182,255,0.22);
          color: #38B6FF;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.7px;
          padding: 5px 12px;
          border-radius: 6px;
          margin-bottom: 14px;
        }
        .cc-sh-title {
          font-size: 24px;
          font-weight: 800;
          color: #E8F0FA;
          margin-bottom: 8px;
          letter-spacing: -0.025em;
        }
        .cc-sh-sub { font-size: 14px; color: #526375; margin: 0; line-height: 1.6; }
        .cc-studio-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #FFFFFF;
          color: #090F1C;
          border: none;
          padding: 12px 22px;
          border-radius: 9px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          flex-shrink: 0;
          font-family: var(--font-sans);
        }
        .cc-studio-btn:hover { filter: brightness(0.92); transform: translateY(-1px); }

        /* ─── DECISION CARDS ───────────────────────────── */
        .cc-decision { margin-bottom: 14px; }

        .cc-d-priority-tag {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          color: #FF4D6A;
          margin-bottom: 14px;
        }
        .cc-d-priority-med { color: #F5A623; }
        .cc-d-priority-low { color: #485E78; margin-bottom: 0; }

        /* High */
        .cc-d-high {
          background: #111C2C;
          border: 1px solid rgba(255,77,106,0.2);
          border-left: 3px solid #FF4D6A;
          border-radius: 16px;
          padding: 36px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.04);
        }
        .cc-d-body {
          display: grid;
          grid-template-columns: 1fr 220px;
          gap: 36px;
          align-items: start;
        }
        .cc-d-left  { flex: 1; }
        .cc-d-title {
          font-size: 22px;
          font-weight: 800;
          color: #FFFFFF;
          margin-bottom: 12px;
          letter-spacing: -0.025em;
        }
        .cc-d-why {
          font-size: 14px;
          color: #8899AA;
          line-height: 1.65;
          margin: 0 0 28px;
        }
        .cc-d-signals {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
        }
        .cc-d-sig {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13px;
          color: #A8BECF;
        }
        .cc-dsig-weight {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          color: #526375;
          background: rgba(255,255,255,0.06);
          padding: 2px 7px;
          border-radius: 4px;
          flex-shrink: 0;
          margin-top: 1px;
          white-space: nowrap;
        }
        .cc-dsig-text { line-height: 1.5; }
        .cc-d-risk {
          background: rgba(255,77,106,0.06);
          border: 1px solid rgba(255,77,106,0.15);
          border-radius: 10px;
          padding: 16px 18px;
        }
        .cc-d-risk-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: rgba(255,77,106,0.6);
          display: block;
          margin-bottom: 6px;
        }
        .cc-d-risk-text { font-size: 13px; color: #8899AA; line-height: 1.6; }
        .cc-d-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 24px;
        }
        .cc-d-impact-block {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
        }
        .cc-d-revenue {
          font-size: 32px;
          font-weight: 800;
          color: #4ADE80;
          letter-spacing: -1.5px;
          line-height: 1;
        }
        .cc-d-uplift { font-size: 13px; color: #526375; }
        .cc-d-conf   { font-size: 12px; color: #485E78; }
        .cc-d-ctas {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 100%;
        }
        .cc-btn-approve {
          background: #DD0822;
          color: #FFFFFF;
          border: none;
          padding: 13px 18px;
          border-radius: 9px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          width: 100%;
          font-family: var(--font-sans);
          box-shadow: 0 4px 12px rgba(221,8,34,0.3);
        }
        .cc-btn-approve:hover { background: #FF1F3A; box-shadow: 0 6px 16px rgba(221,8,34,0.4); transform: translateY(-1px); }
        .cc-btn-review {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          color: #C8D8E8;
          padding: 11px 16px;
          border-radius: 9px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          font-family: var(--font-sans);
        }
        .cc-btn-review:hover { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.2); }

        /* Medium */
        .cc-d-med {
          background: #0E1825;
          border: 1px solid rgba(245,166,35,0.18);
          border-left: 3px solid #F5A623;
          border-radius: 14px;
          padding: 26px 32px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03);
        }
        .cc-d-med-body {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
        }
        .cc-d-med-left { flex: 1; }
        .cc-d-med-title {
          font-size: 18px;
          font-weight: 700;
          color: #E8F0FA;
          margin: 8px 0 8px;
          letter-spacing: -0.02em;
        }
        .cc-d-med-why { font-size: 13px; color: #6A8AA6; line-height: 1.55; margin: 0; }
        .cc-d-med-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
          flex-shrink: 0;
        }
        .cc-d-med-revenue {
          font-size: 22px;
          font-weight: 800;
          color: #E8F0FA;
          letter-spacing: -0.5px;
        }

        /* Low */
        .cc-d-low {
          display: flex;
          align-items: center;
          gap: 16px;
          background: rgba(14,24,37,0.6);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 10px;
          padding: 18px 22px;
        }
        .cc-d-low-title  { flex: 1; font-size: 14px; font-weight: 600; color: #8899AA; }
        .cc-d-low-impact { font-size: 14px; font-weight: 600; color: #526375; }
        .cc-btn-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: none;
          border: none;
          color: #526375;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s;
          font-family: var(--font-sans);
        }
        .cc-btn-link:hover { color: #E8F0FA; }

        /* ─── STRATEGIC FOCUS PANELS ───────────────────── */
        .cc-focus-panels {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .cc-focus-panel {
          border: 1px solid rgba(255,255,255,0.09);
          border-left: 3px solid transparent;
          border-radius: 16px;
          padding: 36px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04);
        }
        .cc-fp-opp {
          background: linear-gradient(145deg, #0D1F17 0%, #0A1620 100%);
          border-left-color: #4ADE80;
          border-color: rgba(74,222,128,0.15);
        }
        .cc-fp-risk {
          background: linear-gradient(145deg, #1E0D14 0%, #150A14 100%);
          border-left-color: #FF4D6A;
          border-color: rgba(255,77,106,0.15);
        }
        .cc-fp-eyebrow {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          margin-bottom: 12px;
          display: block;
        }
        .cc-fp-title {
          font-size: 22px;
          font-weight: 800;
          color: #FFFFFF;
          display: block;
          margin-bottom: 8px;
          letter-spacing: -0.025em;
        }
        .cc-fp-sub {
          font-size: 13px;
          color: #526375;
          display: block;
          margin-bottom: 20px;
        }
        .cc-fp-desc {
          font-size: 14px;
          color: #8899AA;
          line-height: 1.7;
          margin: 0 0 28px;
          flex: 1;
        }
        .cc-fp-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          color: #C8D8E8;
          padding: 10px 18px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          align-self: flex-start;
          font-family: var(--font-sans);
        }
        .cc-fp-btn:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.18); }

        /* ─── INTEL FEED ───────────────────────────────── */
        .cc-feed { display: flex; flex-direction: column; }
        .cc-feed-row {
          display: grid;
          grid-template-columns: 220px 1fr 140px 80px;
          align-items: center;
          gap: 20px;
          padding: 18px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          font-size: 13px;
        }
        .cc-feed-row:last-child { border-bottom: none; }
        .cc-feed-agent   { font-weight: 700; color: #6A8AA6; }
        .cc-feed-insight { color: #A8BECF; line-height: 1.4; }
        .cc-feed-impact  { font-size: 13px; font-weight: 700; text-align: right; }
        .cc-feed-time    { font-size: 12px; color: #485E78; text-align: right; }

        /* ─── EXPLAINABILITY ───────────────────────────── */
        .cc-explain-toggle {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          background: #0E1825;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 22px 32px;
          color: #A8BECF;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
          font-family: var(--font-sans);
          box-shadow: 0 2px 12px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04);
        }
        .cc-explain-toggle:hover { background: #111F30; border-color: rgba(255,255,255,0.13); color: #E8F0FA; }
        .cc-explain-body {
          background: #080E1A;
          border: 1px solid rgba(255,255,255,0.07);
          border-top: none;
          border-radius: 0 0 14px 14px;
          padding: 36px 32px;
          margin-top: -1px;
        }
        .cc-explain-intro {
          font-size: 14px;
          color: #526375;
          margin: 0 0 32px;
          line-height: 1.6;
        }
        .cc-explain-step {
          display: flex;
          gap: 20px;
          align-items: flex-start;
          padding-bottom: 28px;
          margin-bottom: 28px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .cc-explain-step:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
        .cc-es-num {
          font-size: 12px;
          font-weight: 700;
          color: #485E78;
          letter-spacing: 0.5px;
          flex-shrink: 0;
          padding-top: 2px;
          min-width: 22px;
        }
        .cc-es-content { flex: 1; }
        .cc-es-agent {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }
        .cc-es-name {
          font-size: 14px;
          font-weight: 700;
          color: #C8D8E8;
        }
        .cc-es-layer {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .cc-es-action {
          font-size: 14px;
          color: #8899AA;
          line-height: 1.65;
          margin: 0;
        }

        /* ─── EXECUTIVE SUMMARY ────────────────────────── */
        .cc-exec-summary {
          background: linear-gradient(100deg, rgba(110,231,242,0.07) 0%, rgba(110,231,242,0.01) 50%, transparent 100%);
          border: 1px solid rgba(255,255,255,0.08);
          border-left: 2px solid #6EE7F2;
          border-radius: 14px;
          padding: 40px 44px;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
        }
        .cc-exec-text {
          font-family: var(--font-display, 'Instrument Serif', Georgia, serif);
          font-size: 18px;
          font-style: italic;
          font-weight: 400;
          color: #D8E8F0;
          line-height: 1.8;
          margin: 0 0 16px;
        }
        .cc-exec-attr {
          font-size: 12px;
          color: #485E78;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
