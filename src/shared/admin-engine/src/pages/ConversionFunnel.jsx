import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, TrendingUp, ChevronRight } from 'lucide-react';
import { conversionFunnelStages, conversionOpportunity } from '../data/mockData';

const SEVERITY = {
  neutral:  { color: '#5D6577', glow: 'rgba(93,101,119,0.4)',   bar: '#161A23' },
  warning:  { color: '#F5B544', glow: 'rgba(245,181,68,0.35)',  bar: '#1F1A10' },
  critical: { color: '#FF4D6A', glow: 'rgba(255,77,106,0.35)',  bar: '#1F1215' },
  good:     { color: '#4ADE80', glow: 'rgba(74,222,128,0.35)',  bar: '#101F16' },
};

const LAYER_COLOR = {
  Detection:     '#FF4D6A',
  Intelligence:  '#38B6FF',
  Orchestration: '#8B5CF6',
};

// Visual widths — convey the narrowing clearly without tiny bars
const VISUAL_PCT = { 1: 100, 2: 80, 3: 56, 4: 42, 5: 28, 6: 26 };

export default function ConversionFunnel() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(3); // default: biggest drop-off
  const selected = conversionFunnelStages.find(s => s.id === selectedId);
  const sev = SEVERITY[selected.severity];
  const layerColor = LAYER_COLOR[selected.agentLayer] || '#8A93A6';

  return (
    <div className="cf-page">
      <style>{`
        .cf-page {
          padding: 40px 48px 80px;
          background: var(--bg-0);
          min-height: 100vh;
          color: var(--fg-2);
          font-family: var(--font-sans);
        }

        /* ── Header ── */
        .cf-header {
          display: flex; align-items: flex-start; justify-content: space-between;
          gap: 32px; margin-bottom: 40px;
        }
        .cf-header-left h1 {
          font-size: 28px; font-weight: 700; color: var(--fg-1);
          margin: 0 0 6px; letter-spacing: -0.02em;
        }
        .cf-header-top { display: flex; align-items: center; gap: 12px; margin-bottom: 6px; }
        .cf-live-badge {
          display: flex; align-items: center; gap: 6px;
          background: var(--success-wash); border: 1px solid rgba(74,222,128,0.25);
          border-radius: 20px; padding: 3px 10px;
          font-size: 11px; font-weight: 600; color: var(--success);
          letter-spacing: 0.06em; text-transform: uppercase;
        }
        .cf-live-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--success); box-shadow: 0 0 5px rgba(74,222,128,0.8);
          animation: cf-blink 2s ease-in-out infinite;
        }
        @keyframes cf-blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .cf-subtitle { font-size: 14px; color: var(--fg-4); margin: 0; line-height: 1.6; }
        .cf-kpis { display: flex; gap: 0; flex-shrink: 0; }
        .cf-kpi { text-align: right; padding: 0 24px; border-right: 1px solid var(--line); }
        .cf-kpi:last-child { border-right: none; padding-right: 0; }
        .cf-kpi-val {
          display: block; font-size: 30px; font-weight: 700;
          color: var(--fg-1); letter-spacing: -0.03em; line-height: 1;
        }
        .cf-kpi-val.green { color: var(--success); }
        .cf-kpi-val.blue  { color: var(--medibank-blue-glow); }
        .cf-kpi-label { font-size: 11px; color: var(--fg-4); margin-top: 4px; display: block; }

        /* ── Body: funnel + detail ── */
        .cf-body { display: grid; grid-template-columns: 1fr 340px; gap: 32px; margin-bottom: 32px; align-items: start; }

        /* ── Funnel ── */
        .cf-funnel-wrap {
          background: var(--bg-2); border: 1px solid var(--line);
          border-radius: 16px; padding: 32px 28px; box-shadow: var(--shadow-2);
        }
        .cf-funnel-eyebrow {
          font-size: 11px; font-weight: 600; color: var(--fg-5);
          text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 28px;
        }
        .cf-funnel { width: 100%; display: flex; flex-direction: column; align-items: center; gap: 0; }
        .cf-stage-wrap { width: 100%; display: flex; flex-direction: column; align-items: center; }

        .cf-stage-bar {
          height: 52px; border-radius: 8px;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 16px; cursor: pointer;
          transition: all var(--dur-2) var(--ease-out);
          border: 1px solid var(--line); position: relative; overflow: hidden;
        }
        .cf-stage-bar:hover { filter: brightness(1.15); }
        .cf-stage-bar.selected { border-width: 1.5px; filter: brightness(1.2); }

        .cf-bar-name {
          font-size: 13px; font-weight: 600; color: var(--fg-1);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1;
        }
        .cf-bar-count {
          font-size: 14px; font-weight: 700; color: var(--fg-1);
          margin-left: 12px; flex-shrink: 0; letter-spacing: -0.01em;
        }

        /* Drop-off connector */
        .cf-connector { display: flex; flex-direction: column; align-items: center; padding: 6px 0; gap: 2px; }
        .cf-connector-line { width: 1px; height: 10px; background: var(--line-strong); }
        .cf-connector-label {
          font-size: 11px; font-weight: 600;
          display: flex; align-items: center; gap: 8px;
          padding: 4px 12px; border-radius: 20px;
        }
        .cf-connector-pct { font-weight: 700; }
        .cf-connector-count { font-weight: 400; opacity: 0.8; }

        /* ── Detail Panel ── */
        .cf-detail {
          background: var(--bg-2); border: 1px solid var(--line);
          border-radius: 16px; padding: 24px; position: sticky; top: 24px;
          box-shadow: var(--shadow-2);
        }
        .cf-detail-stage-num {
          display: inline-flex; align-items: center; justify-content: center;
          width: 22px; height: 22px; border-radius: 6px;
          background: var(--bg-4); font-size: 10px; font-weight: 700;
          color: var(--fg-4); margin-bottom: 10px;
        }
        .cf-detail-name { font-size: 18px; font-weight: 700; color: var(--fg-1); margin-bottom: 4px; line-height: 1.2; }
        .cf-detail-desc { font-size: 12px; color: var(--fg-4); margin-bottom: 20px; }

        .cf-detail-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 20px; }
        .cf-detail-stat { background: var(--bg-3); border: 1px solid var(--line-soft); border-radius: 8px; padding: 10px 12px; }
        .cf-detail-stat-val { font-size: 20px; font-weight: 700; display: block; letter-spacing: -0.02em; line-height: 1; }
        .cf-detail-stat-label { font-size: 10px; color: var(--fg-5); margin-top: 3px; display: block; }

        .cf-divider { height: 1px; background: var(--line-soft); margin: 16px 0; }

        .cf-agent-row { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
        .cf-agent-name { font-size: 12px; font-weight: 600; color: var(--fg-1); }
        .cf-layer-chip { font-size: 10px; font-weight: 600; padding: 2px 7px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.04em; }
        .cf-insight { font-size: 12px; color: var(--fg-3); line-height: 1.6; font-style: italic; margin-bottom: 14px; }
        .cf-rec-label { font-size: 10px; font-weight: 600; color: var(--fg-5); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 6px; }
        .cf-rec { font-size: 12px; color: var(--fg-2); line-height: 1.55; margin-bottom: 16px; }
        .cf-detail-cta {
          width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px;
          background: linear-gradient(180deg, var(--medibank-blue-glow) 0%, var(--medibank-blue) 100%);
          color: #00141f; border: none; border-radius: var(--r-3);
          padding: 11px; font-size: 13px; font-weight: 600; cursor: pointer;
          box-shadow: 0 1px 0 rgba(255,255,255,0.25) inset, var(--glow-human);
          transition: filter var(--dur-2) var(--ease-out);
        }
        .cf-detail-cta:hover { filter: brightness(1.08); }
        .cf-good-note { text-align: center; padding: 12px; font-size: 13px; color: var(--success); font-weight: 600; }

        /* ── Projected Impact ── */
        .cf-impact {
          background: var(--bg-2); border: 1px solid var(--line);
          border-radius: 16px; padding: 28px 32px;
          display: grid; grid-template-columns: auto 1fr auto;
          gap: 40px; align-items: center; box-shadow: var(--shadow-2);
        }
        .cf-impact-rate-block { text-align: center; }
        .cf-impact-rate-val { font-size: 40px; font-weight: 700; letter-spacing: -0.03em; line-height: 1; display: block; }
        .cf-impact-rate-label { font-size: 12px; color: var(--fg-4); margin-top: 4px; display: block; }
        .cf-impact-arrow { color: var(--fg-5); display: flex; align-items: center; }
        .cf-impact-items { display: flex; flex-direction: column; gap: 8px; }
        .cf-impact-item {
          display: flex; align-items: center; justify-content: space-between; gap: 16px;
          padding: 10px 14px; background: var(--bg-3);
          border: 1px solid var(--line-soft); border-radius: 8px;
        }
        .cf-impact-item-stage { font-size: 11px; color: var(--fg-5); font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; width: 120px; flex-shrink: 0; }
        .cf-impact-item-action { font-size: 12px; color: var(--fg-2); flex: 1; }
        .cf-impact-item-nums { text-align: right; flex-shrink: 0; }
        .cf-impact-item-rev { font-size: 13px; color: var(--success); font-weight: 600; display: block; }
        .cf-impact-item-students { font-size: 11px; color: var(--fg-5); display: block; margin-top: 1px; }
        .cf-impact-cta {
          display: flex; align-items: center; gap: 8px;
          background: linear-gradient(180deg, #FF1F3A 0%, var(--medibank-red) 100%);
          color: #fff; border: none; border-radius: var(--r-3);
          padding: 12px 20px; font-size: 13px; font-weight: 600; cursor: pointer;
          box-shadow: 0 1px 0 rgba(255,255,255,0.18) inset, 0 6px 16px rgba(221,8,34,0.30);
          white-space: nowrap; transition: filter var(--dur-2) var(--ease-out);
        }
        .cf-impact-cta:hover { filter: brightness(1.08); }
        .cf-impact-meta { font-size: 11px; color: var(--fg-5); margin-top: 6px; text-align: center; }
      `}</style>

      {/* Header */}
      <div className="cf-header">
        <div className="cf-header-left">
          <div className="cf-header-top">
            <h1>Conversion Funnel</h1>
            <div className="cf-live-badge"><div className="cf-live-dot" />Live</div>
          </div>
          <p className="cf-subtitle">OSHC → OVHC · Click any stage to see the agent insight and recommendation.</p>
        </div>
        <div className="cf-kpis">
          <div className="cf-kpi">
            <span className="cf-kpi-val">10,000</span>
            <span className="cf-kpi-label">Eligible Students</span>
          </div>
          <div className="cf-kpi">
            <span className="cf-kpi-val">1,420</span>
            <span className="cf-kpi-label">Converted</span>
          </div>
          <div className="cf-kpi">
            <span className="cf-kpi-val">14.2%</span>
            <span className="cf-kpi-label">Current Rate</span>
          </div>
          <div className="cf-kpi">
            <span className="cf-kpi-val green">19.1%</span>
            <span className="cf-kpi-label">Projected Rate</span>
          </div>
          <div className="cf-kpi">
            <span className="cf-kpi-val blue">+$343K</span>
            <span className="cf-kpi-label">Opportunity</span>
          </div>
        </div>
      </div>

      {/* Body: Funnel + Detail */}
      <div className="cf-body">

        {/* Funnel */}
        <div className="cf-funnel-wrap">
          <div className="cf-funnel-eyebrow">OSHC → OVHC Conversion Pipeline</div>
          <div className="cf-funnel">
            {conversionFunnelStages.map((stage, i) => {
              const isSelected = stage.id === selectedId;
              const isLast = i === conversionFunnelStages.length - 1;
              const stageSev = SEVERITY[stage.severity];
              const pct = VISUAL_PCT[stage.id];
              const nextStage = !isLast ? conversionFunnelStages[i + 1] : null;
              const nextSev = nextStage ? SEVERITY[nextStage.severity] : null;

              return (
                <div key={stage.id} className="cf-stage-wrap">
                  <div
                    className={`cf-stage-bar${isSelected ? ' selected' : ''}`}
                    style={{
                      width: `${pct}%`,
                      background: isSelected ? stageSev.bar : 'var(--bg-2)',
                      borderColor: isSelected ? stageSev.color : 'rgba(255,255,255,0.08)',
                      boxShadow: isSelected ? `0 0 16px ${stageSev.glow}` : 'none',
                    }}
                    onClick={() => setSelectedId(stage.id)}
                  >
                    <span className="cf-bar-name">{stage.name}</span>
                    <span className="cf-bar-count">{stage.count.toLocaleString()}</span>
                  </div>

                  {!isLast && nextStage && nextStage.dropOff > 0 && (
                    <div className="cf-connector">
                      <div className="cf-connector-line" />
                      <div
                        className="cf-connector-label"
                        style={{
                          background: `${nextSev.glow}`,
                          color: nextSev.color,
                        }}
                      >
                        <span className="cf-connector-pct">▼ {nextStage.dropOffPct}%</span>
                        <span className="cf-connector-count">{nextStage.dropOff.toLocaleString()} lost</span>
                        {nextStage.dropOffRevenue && (
                          <span className="cf-connector-count">· {nextStage.dropOffRevenue}</span>
                        )}
                      </div>
                      <div className="cf-connector-line" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Detail Panel */}
        <div className="cf-detail">
          <div className="cf-detail-stage-num">{selected.id}</div>
          <div className="cf-detail-name">{selected.name}</div>
          <div className="cf-detail-desc">{selected.description}</div>

          <div className="cf-detail-stats">
            <div className="cf-detail-stat">
              <span className="cf-detail-stat-val" style={{ color: '#FFFFFF' }}>
                {selected.count.toLocaleString()}
              </span>
              <span className="cf-detail-stat-label">Students at stage</span>
            </div>
            {selected.dropOff > 0 ? (
              <div className="cf-detail-stat">
                <span className="cf-detail-stat-val" style={{ color: sev.color }}>
                  {selected.dropOffPct}%
                </span>
                <span className="cf-detail-stat-label">Drop-off from prev.</span>
              </div>
            ) : (
              <div className="cf-detail-stat">
                <span className="cf-detail-stat-val" style={{ color: '#10B981' }}>—</span>
                <span className="cf-detail-stat-label">Baseline stage</span>
              </div>
            )}
            {selected.dropOffRevenue && (
              <div className="cf-detail-stat">
                <span className="cf-detail-stat-val" style={{ color: sev.color }}>
                  {selected.dropOffRevenue}
                </span>
                <span className="cf-detail-stat-label">Revenue at risk</span>
              </div>
            )}
            {selected.dropOff > 0 && (
              <div className="cf-detail-stat">
                <span className="cf-detail-stat-val" style={{ color: '#6B7280' }}>
                  {selected.dropOff.toLocaleString()}
                </span>
                <span className="cf-detail-stat-label">Students lost</span>
              </div>
            )}
          </div>

          <div className="cf-divider" />

          <div className="cf-agent-row">
            <span className="cf-agent-name">{selected.agentName}</span>
            <span
              className="cf-layer-chip"
              style={{
                background: `rgba(${layerColor === '#FF4D6A' ? '255,77,106' : layerColor === '#38B6FF' ? '56,182,255' : '139,92,246'},0.12)`,
                color: layerColor
              }}
            >
              {selected.agentLayer}
            </span>
          </div>
          <div className="cf-insight">{selected.agentInsight}</div>

          {selected.recommendation ? (
            <>
              <div className="cf-rec-label">Recommendation</div>
              <div className="cf-rec">{selected.recommendation}</div>
              <button className="cf-detail-cta" onClick={() => navigate('/action-studio')}>
                Review in Action Studio <ChevronRight size={14} />
              </button>
            </>
          ) : (
            <div className="cf-good-note">✓ No action needed at this stage</div>
          )}
        </div>
      </div>

      {/* Projected Impact */}
      <div className="cf-impact">
        <div className="cf-impact-rate-block">
          <span className="cf-impact-rate-val" style={{ color: '#6B7280' }}>
            {conversionOpportunity.currentRate}%
          </span>
          <span className="cf-impact-rate-label">Current rate</span>
        </div>

        <div className="cf-impact-arrow">
          <ArrowRight size={20} />
        </div>

        <div className="cf-impact-rate-block" style={{ marginRight: 8 }}>
          <span className="cf-impact-rate-val" style={{ color: '#10B981' }}>
            {conversionOpportunity.projectedRate}%
          </span>
          <span className="cf-impact-rate-label">Projected rate</span>
          <span className="cf-impact-meta">{conversionOpportunity.confidence} confidence</span>
        </div>

        <div className="cf-impact-items">
          {conversionOpportunity.interventions.map((item, i) => (
            <div key={i} className="cf-impact-item">
              <span className="cf-impact-item-stage">{item.stage}</span>
              <span className="cf-impact-item-action">{item.action}</span>
              <div className="cf-impact-item-nums">
                <span className="cf-impact-item-rev">{item.revenue}</span>
                <span className="cf-impact-item-students">{item.uplift}</span>
              </div>
            </div>
          ))}
        </div>

        <div>
          <button className="cf-impact-cta" onClick={() => navigate('/action-studio')}>
            <TrendingUp size={14} />
            Action All <ArrowRight size={14} />
          </button>
          <div className="cf-impact-meta">+{conversionOpportunity.additionalStudents} students · {conversionOpportunity.additionalRevenue}</div>
        </div>
      </div>

    </div>
  );
}
