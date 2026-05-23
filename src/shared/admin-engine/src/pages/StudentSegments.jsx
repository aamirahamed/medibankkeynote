import { useState } from 'react';
import {
  Sparkles, TrendingUp, ArrowRight, Activity,
  Users, Zap, ChevronRight, CheckCircle2,
  X, GitMerge, PlayCircle, AlertTriangle,
  BarChart3, ChevronDown, CircleDot, Bot
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  studentSegments, segmentHero, segmentEvolution,
  behaviouralClusters, microSegments, segmentActions, segmentSummaryStr
} from '../data/mockData';

const CATEGORY = {
  opportunity: { color: '#4ADE80', dim: 'rgba(74,222,128,0.10)',  border: 'rgba(74,222,128,0.25)',  label: 'Opportunity' },
  critical:    { color: '#FF4D6A', dim: 'rgba(255,77,106,0.10)',  border: 'rgba(255,77,106,0.25)',  label: 'At Risk'      },
  growth:      { color: '#38B6FF', dim: 'rgba(56,182,255,0.10)',  border: 'rgba(56,182,255,0.25)',  label: 'Growth'       },
};

/* ─────────────────────────────────────────────
   SEGMENT CARD — ranked editorial insight row
───────────────────────────────────────────── */
function SegmentCard({ segment, cat, rank, onDrillIn, onActionStudio }) {
  const isRisk = segment.category === 'critical';
  return (
    <div className="ss-sc" style={{ '--sc-color': cat.color }}>
      <div className="ss-sc-bar" style={{ background: cat.color }} />
      <div className="ss-sc-body">

        <div className="ss-sc-top">
          <span className="ss-sc-rank">#{rank}</span>
          <span className="ss-sc-cat" style={{ background: cat.dim, color: cat.color, border: `1px solid ${cat.border}` }}>
            {cat.label}
          </span>
          <span className="ss-sc-trend" style={{ color: segment.trendDirection === 'positive' ? '#4ADE80' : '#FF4D6A' }}>
            {segment.trend} this week
          </span>
        </div>

        <h3 className="ss-sc-name">{segment.name}</h3>
        <p className="ss-sc-why">{segment.why}</p>

        <div className="ss-sc-signals">
          {segment.signals.map((s, i) => (
            <div key={i} className="ss-sc-signal">
              <span className="ss-sc-sig-dot" style={{ background: cat.color }} />
              <span>{s}</span>
            </div>
          ))}
        </div>

        <div className="ss-sc-metrics">
          <div className="ss-sc-m">
            <span className="ss-sc-mv" style={{ color: isRisk ? '#FF8EA3' : '#4ADE80' }}>{segment.revenueOpp}</span>
            <span className="ss-sc-ml">{isRisk ? 'Revenue Risk' : 'Opportunity'}</span>
          </div>
          <div className="ss-sc-msep" />
          <div className="ss-sc-m">
            <span className="ss-sc-mv">{segment.count.toLocaleString()}</span>
            <span className="ss-sc-ml">Students</span>
          </div>
          <div className="ss-sc-msep" />
          <div className="ss-sc-m">
            <span className="ss-sc-mv blue">{segment.confidence}</span>
            <span className="ss-sc-ml">Confidence</span>
          </div>
          {segment.conversionPotential && (
            <>
              <div className="ss-sc-msep" />
              <div className="ss-sc-m">
                <span className="ss-sc-mv">{segment.conversionPotential}</span>
                <span className="ss-sc-ml">Conversion Potential</span>
              </div>
            </>
          )}
        </div>

        {segment.recommendedActions[0] && (
          <div className="ss-sc-rec">
            <span className="ss-sc-rec-label">Recommended</span>
            <span className="ss-sc-rec-text">{segment.recommendedActions[0].title}</span>
            {segment.recommendedActions[0].impact && (
              <span className="ss-sc-rec-impact">{segment.recommendedActions[0].impact}</span>
            )}
          </div>
        )}

        <div className="ss-sc-footer">
          <div className="ss-sc-attr">
            <Sparkles size={11} />
            Behavioural Intelligence Engine
          </div>
          <div className="ss-sc-btns">
            <button className="ss-sc-btn-ghost" onClick={onActionStudio}>
              Action Studio
            </button>
            <button className="ss-sc-btn-primary" onClick={onDrillIn}>
              Drill In <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function StudentSegments() {
  const navigate = useNavigate();
  const [activeSegment, setActiveSegment] = useState(null);
  const [toast, setToast]         = useState('');
  const [clustersOpen, setClustersOpen]   = useState(false);
  const [obsOpen, setObsOpen]             = useState(false);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  const heroSegment = {
    category: 'opportunity',
    name: segmentHero.title,
    count: 3240,
    revenueOpp: segmentHero.revenueOpp,
    confidence: segmentHero.confidence,
    reviewDetails: segmentHero.reviewDetails,
  };

  return (
    <div className="ss-root">

      {toast && (
        <div className="ss-toast"><CheckCircle2 size={14} />{toast}</div>
      )}

      {/* ── HEADER ── */}
      <header className="ss-header">
        <div>
          <h1>Student Segments</h1>
          <p className="ss-subtitle">AI-discovered behavioural cohorts and emerging conversion signals.</p>
        </div>
        <div className="ss-live-badge">
          <span className="ss-live-dot" />
          Behavioural Engine Active
        </div>
      </header>

      {/* ── METRICS STRIP ── */}
      <div className="ss-metrics-strip">
        <div className="ss-metric">
          <span className="ss-metric-val green">3,450</span>
          <span className="ss-metric-lbl">High-Intent Students</span>
        </div>
        <div className="ss-metric-sep" />
        <div className="ss-metric">
          <span className="ss-metric-val red">2,040</span>
          <span className="ss-metric-lbl">At-Risk Students</span>
        </div>
        <div className="ss-metric-sep" />
        <div className="ss-metric">
          <span className="ss-metric-val">82%</span>
          <span className="ss-metric-lbl">Conversion Readiness</span>
        </div>
        <div className="ss-metric-sep" />
        <div className="ss-metric">
          <span className="ss-metric-val green">+$2.5M</span>
          <span className="ss-metric-lbl">Opportunity Pool</span>
        </div>
        <div className="ss-metric-sep" />
        <div className="ss-metric">
          <span className="ss-metric-val blue">4</span>
          <span className="ss-metric-lbl">Emerging Segments Today</span>
        </div>
      </div>

      {/* ── EDITORIAL HERO ── */}
      <div className="ss-hero">
        <div className="ss-hero-left">
          <div className="ss-hero-eyebrow">
            <Sparkles size={13} />
            Behavioural Intelligence Engine · Top Signal Today
          </div>
          <h2 className="ss-hero-title">{segmentHero.title}</h2>
          <p className="ss-hero-insight">{segmentHero.insight}</p>

          <div className="ss-hero-observations">
            <span className="ss-hero-obs-label">What AI observed</span>
            {segmentHero.reviewDetails.deepInsights.map((ins, i) => (
              <div key={i} className="ss-hero-obs-row">
                <span className="ss-hero-obs-dot" />
                <span>{ins}</span>
              </div>
            ))}
          </div>

          <div className="ss-hero-actions">
            <button className="ss-btn-primary" onClick={() => setActiveSegment(heroSegment)}>
              Review Cohort <ArrowRight size={14} />
            </button>
            <button className="ss-btn-ghost" onClick={() => navigate('/action-studio')}>
              Open in Action Studio <ChevronRight size={14} />
            </button>
          </div>

          <div className="ss-hero-attr">
            <Sparkles size={11} /> Generated by Behavioural Intelligence Engine
          </div>
        </div>

        <div className="ss-hero-right">
          <div className="ss-hero-metrics">
            <div className="ss-hm">
              <span className="ss-hm-val green">{segmentHero.revenueOpp}</span>
              <span className="ss-hm-lbl">Revenue Opportunity</span>
            </div>
            <div className="ss-hm">
              <span className="ss-hm-val">{segmentHero.size}</span>
              <span className="ss-hm-lbl">Cohort Size</span>
            </div>
            <div className="ss-hm">
              <span className="ss-hm-val blue">{segmentHero.conversionProb}</span>
              <span className="ss-hm-lbl">Conversion Probability</span>
            </div>
            <div className="ss-hm">
              <span className="ss-hm-val">{segmentHero.confidence}</span>
              <span className="ss-hm-lbl">AI Confidence</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── SEGMENT FEED ── */}
      <div className="ss-feed-section">
        <div className="ss-feed-header">
          <span className="ss-feed-label">AI-Discovered Cohorts</span>
          <span className="ss-feed-sub">Ranked by priority · {studentSegments.length} cohorts identified</span>
        </div>
        <div className="ss-feed-list">
          {studentSegments.map((seg, idx) => {
            const cat = CATEGORY[seg.category] || CATEGORY.opportunity;
            return (
              <SegmentCard
                key={seg.id}
                segment={seg}
                cat={cat}
                rank={idx + 1}
                onDrillIn={() => setActiveSegment(seg)}
                onActionStudio={() => {
                  showToast(`Sent "${seg.name}" to Action Studio`);
                  navigate('/action-studio');
                }}
              />
            );
          })}
        </div>
      </div>

      {/* ── AI RECOMMENDATIONS ── */}
      <div className="ss-rec-section">
        <div className="ss-section-label">AI Recommendations</div>
        <div className="ss-rec-list">
          {segmentActions.map(action => (
            <div key={action.id} className="ss-rec-card">
              <div className="ss-rec-left">
                <span className="ss-rec-eyebrow">Recommended Intervention</span>
                <div className="ss-rec-title">{action.recommendation}</div>
                <div className="ss-rec-meta">
                  <span className="ss-rec-impact">{action.impact}</span>
                  <span className="ss-rec-dot" />
                  <span className="ss-rec-conf">{action.confidence} confidence</span>
                </div>
              </div>
              <button
                className="ss-rec-btn"
                onClick={() => { showToast(`Sent to Action Studio: ${action.recommendation}`); navigate('/action-studio'); }}
              >
                Send to Action Studio <ArrowRight size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── BEHAVIOURAL CLUSTERS (collapsible) ── */}
      <div className="ss-collapsible">
        <button className="ss-collapse-btn" onClick={() => setClustersOpen(p => !p)}>
          <Activity size={14} />
          Behavioural Cluster Analysis
          <span className="ss-collapse-count">{behaviouralClusters.length} patterns</span>
          <ChevronDown size={13} style={{ marginLeft: 'auto', transform: clustersOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', color: '#485E78' }} />
        </button>
        {clustersOpen && (
          <div className="ss-cluster-list">
            {behaviouralClusters.map(cluster => (
              <div key={cluster.id} className="ss-cluster-card">
                <div className="ss-cluster-top">
                  <span className="ss-cluster-name">{cluster.name}</span>
                  <span className="ss-cluster-size">{cluster.size} of cohort</span>
                </div>
                <div className="ss-cluster-traits">
                  {cluster.traits.map((t, i) => (
                    <div key={i} className="ss-cluster-trait">
                      <span className="ss-ct-dot" />
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── PATTERN OBSERVATIONS (collapsible) ── */}
      <div className="ss-collapsible">
        <button className="ss-collapse-btn" onClick={() => setObsOpen(p => !p)}>
          <Sparkles size={14} />
          Pattern Observations
          <span className="ss-collapse-count">{microSegments.length} insights</span>
          <ChevronDown size={13} style={{ marginLeft: 'auto', transform: obsOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', color: '#485E78' }} />
        </button>
        {obsOpen && (
          <div className="ss-obs-list">
            {microSegments.map((ms, i) => (
              <div key={i} className="ss-obs-item">
                <p className="ss-obs-text">"{ms.insight}"</p>
                <span className="ss-obs-attr">Behavioural Intelligence Engine</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── EXEC SUMMARY ── */}
      <div className="ss-exec-summary">
        <BarChart3 size={20} className="ss-exec-icon" />
        <div>
          <span className="ss-exec-label">Strategic Summary · Insight Narrator Agent</span>
          <p className="ss-exec-text">"{segmentSummaryStr}"</p>
        </div>
      </div>

      {/* ── DRAWER ── */}
      {activeSegment && (
        <>
          <div className="ss-overlay" onClick={() => setActiveSegment(null)} />
          <div className="ss-drawer">
            <div className="ss-drawer-top">
              <div className="ss-drawer-toprow">
                <span
                  className="ss-drawer-cat"
                  style={{
                    background: CATEGORY[activeSegment.category]?.dim || 'rgba(74,222,128,0.1)',
                    color: CATEGORY[activeSegment.category]?.color || '#4ADE80',
                    border: `1px solid ${CATEGORY[activeSegment.category]?.border || 'rgba(74,222,128,0.25)'}`,
                  }}
                >
                  {CATEGORY[activeSegment.category]?.label || 'Segment'}
                </span>
                <button className="ss-close-btn" onClick={() => setActiveSegment(null)}><X size={16} /></button>
              </div>
              <div className="ss-drawer-title">{activeSegment.name}</div>
              <div className="ss-drawer-meta">
                <span><Users size={12} /> {typeof activeSegment.count === 'number' ? activeSegment.count.toLocaleString() : activeSegment.count} students</span>
                <span style={{ color: CATEGORY[activeSegment.category]?.color }}>{activeSegment.revenueOpp}</span>
                <span>{activeSegment.confidence} confidence</span>
              </div>
            </div>

            <div className="ss-drawer-body">
              <div className="ss-dp-section">
                <h3><Activity size={13} /> Deep Behavioural Analysis</h3>
                <ul className="ss-insight-list">
                  {activeSegment.reviewDetails.deepInsights.map((ins, i) => (
                    <li key={i}><span className="ss-li-dot" />{ins}</li>
                  ))}
                </ul>
              </div>

              <div className="ss-dp-section">
                <h3><GitMerge size={13} /> Agent Collaboration Log</h3>
                <div className="ss-timeline">
                  {activeSegment.reviewDetails.agentLogs.map((log, i) => (
                    <div key={i} className="ss-tl-item">
                      <div className="ss-tl-dot" />
                      <div className="ss-tl-agent">
                        <span>{log.agent}</span>
                        <span className="ss-tl-time">{log.time}</span>
                      </div>
                      <p className="ss-tl-action">{log.action}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="ss-dp-section">
                <h3><TrendingUp size={13} /> Impact Projection</h3>
                <div className="ss-impact-box">
                  <span className="ss-impact-label">{activeSegment.reviewDetails.projectedImpact.metric}</span>
                  <div className="ss-impact-compare">
                    <span className="ss-impact-val muted">{activeSegment.reviewDetails.projectedImpact.current}</span>
                    <ArrowRight size={16} style={{ color: '#485E78' }} />
                    <span className="ss-impact-val green">{activeSegment.reviewDetails.projectedImpact.projected}</span>
                  </div>
                  <div className="ss-impact-timeframe">{activeSegment.reviewDetails.projectedImpact.timeframe}</div>
                </div>
              </div>

              <div className="ss-dp-section">
                <h3><PlayCircle size={13} /> Execution Strategy</h3>
                <div className="ss-steps">
                  {activeSegment.reviewDetails.executionSteps.map((step, i) => (
                    <div key={i} className="ss-step">
                      <div className={`ss-step-num ${step.status}`}>{step.step}</div>
                      <div className="ss-step-desc">{step.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="ss-drawer-footer">
              <button
                className="ss-drawer-primary"
                onClick={() => { showToast('Strategy approved — moving to Action Studio'); setActiveSegment(null); navigate('/action-studio'); }}
              >
                <Zap size={14} /> Approve & Move to Action Studio
              </button>
              <button className="ss-drawer-secondary" onClick={() => setActiveSegment(null)}>
                Close
              </button>
            </div>
          </div>
        </>
      )}

      <style>{`
        /* ── ROOT ── */
        .ss-root {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 0 120px;
          color: #8899AA;
          font-family: var(--font-sans);
        }

        /* ── HEADER ── */
        .ss-header {
          display: flex; justify-content: space-between; align-items: flex-start;
          margin-bottom: 32px;
        }
        .ss-header h1 {
          font-size: 34px; font-weight: 800; color: #FFFFFF;
          letter-spacing: -0.04em; margin: 0 0 7px;
        }
        .ss-subtitle { font-size: 15px; color: #8899AA; margin: 0; }
        .ss-live-badge {
          display: flex; align-items: center; gap: 8px;
          background: rgba(74,222,128,0.08); border: 1px solid rgba(74,222,128,0.2);
          color: #4ADE80; padding: 7px 16px; border-radius: 20px;
          font-size: 12px; font-weight: 600; white-space: nowrap; flex-shrink: 0; margin-top: 4px;
        }
        .ss-live-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #4ADE80;
          box-shadow: 0 0 8px #4ADE80; animation: ssBlink 2s infinite;
        }
        @keyframes ssBlink { 0%,100%{opacity:1} 50%{opacity:0.35} }

        /* ── METRICS STRIP ── */
        .ss-metrics-strip {
          display: flex; align-items: center;
          background: #0A111A; border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px; padding: 20px 28px;
          margin-bottom: 32px;
        }
        .ss-metric { display: flex; flex-direction: column; gap: 4px; flex: 1; }
        .ss-metric-val { font-size: 22px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.03em; }
        .ss-metric-val.green { color: #4ADE80; }
        .ss-metric-val.red   { color: #FF4D6A; }
        .ss-metric-val.blue  { color: #38B6FF; }
        .ss-metric-lbl { font-size: 11px; color: #485E78; font-weight: 600; text-transform: uppercase; letter-spacing: 0.4px; }
        .ss-metric-sep { width: 1px; background: rgba(255,255,255,0.08); align-self: stretch; margin: 0 24px; flex-shrink: 0; }

        /* ── HERO ── */
        .ss-hero {
          display: flex; gap: 40px;
          background: #0D1928;
          border: 1px solid rgba(255,255,255,0.09);
          border-left: 3px solid #6EE7F2;
          border-radius: 14px; padding: 32px 36px;
          margin-bottom: 40px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04);
          position: relative; overflow: hidden;
        }
        .ss-hero::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 160px;
          background: radial-gradient(ellipse 70% 120px at 30% -20px, rgba(110,231,242,0.08), transparent);
          pointer-events: none;
        }
        .ss-hero-left { flex: 1.4; display: flex; flex-direction: column; gap: 0; }
        .ss-hero-right { flex: 1; }

        .ss-hero-eyebrow {
          display: flex; align-items: center; gap: 6px;
          font-size: 11px; font-weight: 700; color: #6EE7F2;
          text-transform: uppercase; letter-spacing: 0.6px;
          margin-bottom: 14px;
        }
        .ss-hero-title {
          font-size: 24px; font-weight: 800; color: #FFFFFF;
          letter-spacing: -0.03em; margin: 0 0 12px; line-height: 1.25;
        }
        .ss-hero-insight {
          font-size: 14px; color: #C8D8E8; line-height: 1.65; margin: 0 0 22px;
        }

        .ss-hero-observations { margin-bottom: 24px; }
        .ss-hero-obs-label {
          font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;
          color: #485E78; display: block; margin-bottom: 10px;
        }
        .ss-hero-obs-row {
          display: flex; align-items: flex-start; gap: 10px;
          font-size: 13px; color: #C8D8E8; line-height: 1.5; margin-bottom: 8px;
        }
        .ss-hero-obs-dot {
          width: 5px; height: 5px; border-radius: 50%; background: #6EE7F2;
          flex-shrink: 0; margin-top: 6px;
        }

        .ss-hero-actions { display: flex; gap: 12px; margin-bottom: 20px; }
        .ss-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: #FFFFFF; color: #06080F;
          border: none; padding: 11px 22px; border-radius: 8px;
          font-size: 13px; font-weight: 700; cursor: pointer;
          font-family: inherit; transition: all 0.2s;
        }
        .ss-btn-primary:hover { background: #E8F0FA; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(255,255,255,0.1); }
        .ss-btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: #C8D8E8;
          border: 1px solid rgba(255,255,255,0.15); padding: 11px 22px; border-radius: 8px;
          font-size: 13px; font-weight: 600; cursor: pointer;
          font-family: inherit; transition: all 0.2s;
        }
        .ss-btn-ghost:hover { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.25); }

        .ss-hero-attr {
          display: flex; align-items: center; gap: 6px;
          font-size: 11px; color: #485E78;
        }

        /* HERO RIGHT METRICS */
        .ss-hero-metrics {
          display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
          height: 100%;
        }
        .ss-hm {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px; padding: 18px 16px;
          display: flex; flex-direction: column; gap: 6px;
        }
        .ss-hm-val { font-size: 22px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.03em; }
        .ss-hm-val.green { color: #4ADE80; }
        .ss-hm-val.blue  { color: #38B6FF; }
        .ss-hm-lbl { font-size: 11px; color: #485E78; font-weight: 600; text-transform: uppercase; letter-spacing: 0.4px; }

        /* ── SEGMENT FEED ── */
        .ss-feed-section { margin-bottom: 40px; }
        .ss-feed-header {
          display: flex; align-items: baseline; justify-content: space-between;
          margin-bottom: 14px;
        }
        .ss-feed-label {
          font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;
          color: #485E78;
        }
        .ss-feed-sub { font-size: 12px; color: #485E78; }
        .ss-feed-list { display: flex; flex-direction: column; gap: 4px; }

        /* SEGMENT CARD */
        .ss-sc {
          display: flex;
          background: #0A111A;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px; overflow: hidden;
          transition: border-color 0.2s, background 0.2s;
          cursor: default;
        }
        .ss-sc:hover { background: #0D1826; border-color: rgba(255,255,255,0.12); }
        .ss-sc-bar { width: 3px; align-self: stretch; flex-shrink: 0; }
        .ss-sc-body { flex: 1; padding: 22px 24px; }

        .ss-sc-top {
          display: flex; align-items: center; gap: 10px; margin-bottom: 10px; flex-wrap: wrap;
        }
        .ss-sc-rank { font-size: 12px; font-weight: 700; color: #485E78; }
        .ss-sc-cat {
          font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px;
          padding: 3px 9px; border-radius: 20px;
        }
        .ss-sc-trend { font-size: 12px; font-weight: 600; margin-left: auto; }

        .ss-sc-name {
          font-size: 18px; font-weight: 800; color: #FFFFFF;
          letter-spacing: -0.025em; margin: 0 0 8px; line-height: 1.2;
        }
        .ss-sc-why {
          font-size: 13px; color: #8899AA; line-height: 1.55; margin: 0 0 16px;
        }

        .ss-sc-signals { display: flex; flex-direction: column; gap: 6px; margin-bottom: 18px; }
        .ss-sc-signal {
          display: flex; align-items: center; gap: 9px;
          font-size: 13px; color: #C8D8E8;
        }
        .ss-sc-sig-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }

        .ss-sc-metrics {
          display: flex; align-items: center;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 8px; padding: 14px 18px;
          margin-bottom: 16px;
        }
        .ss-sc-m { display: flex; flex-direction: column; gap: 4px; flex: 1; }
        .ss-sc-mv { font-size: 17px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.02em; }
        .ss-sc-mv.blue { color: #38B6FF; }
        .ss-sc-ml { font-size: 10px; color: #485E78; font-weight: 600; text-transform: uppercase; letter-spacing: 0.3px; }
        .ss-sc-msep { width: 1px; background: rgba(255,255,255,0.07); align-self: stretch; flex-shrink: 0; margin: 0 18px; }

        .ss-sc-rec {
          display: flex; align-items: center; gap: 10px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 7px; padding: 10px 14px; margin-bottom: 18px;
          flex-wrap: wrap;
        }
        .ss-sc-rec-label {
          font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px;
          color: #485E78; white-space: nowrap;
        }
        .ss-sc-rec-text { font-size: 13px; color: #C8D8E8; font-weight: 500; flex: 1; }
        .ss-sc-rec-impact { font-size: 12px; font-weight: 700; color: #4ADE80; white-space: nowrap; }

        .ss-sc-footer {
          display: flex; justify-content: space-between; align-items: center;
          padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.07);
        }
        .ss-sc-attr { display: flex; align-items: center; gap: 6px; font-size: 11px; color: #485E78; }
        .ss-sc-btns { display: flex; gap: 8px; }
        .ss-sc-btn-ghost {
          background: none; border: 1px solid rgba(255,255,255,0.11); color: #8899AA;
          padding: 7px 14px; border-radius: 6px; font-size: 12px; font-weight: 600;
          cursor: pointer; font-family: inherit; transition: all 0.2s;
        }
        .ss-sc-btn-ghost:hover { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.2); color: #C8D8E8; }
        .ss-sc-btn-primary {
          display: flex; align-items: center; gap: 5px;
          background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); color: #FFFFFF;
          padding: 7px 14px; border-radius: 6px; font-size: 12px; font-weight: 700;
          cursor: pointer; font-family: inherit; transition: all 0.2s;
        }
        .ss-sc-btn-primary:hover { background: rgba(255,255,255,0.13); }

        /* ── SECTION LABEL ── */
        .ss-section-label {
          font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;
          color: #485E78; margin-bottom: 14px; display: block;
        }

        /* ── RECOMMENDATIONS ── */
        .ss-rec-section { margin-bottom: 8px; }
        .ss-rec-list { display: flex; flex-direction: column; gap: 3px; }
        .ss-rec-card {
          display: flex; align-items: center; justify-content: space-between; gap: 24px;
          background: #09111A;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px; padding: 18px 22px;
          transition: border-color 0.2s, background 0.2s;
        }
        .ss-rec-card:hover { background: #0C1825; border-color: rgba(255,255,255,0.12); }
        .ss-rec-left { flex: 1; }
        .ss-rec-eyebrow {
          font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px;
          color: #485E78; display: block; margin-bottom: 5px;
        }
        .ss-rec-title { font-size: 15px; font-weight: 700; color: #FFFFFF; margin-bottom: 8px; }
        .ss-rec-meta { display: flex; align-items: center; gap: 8px; font-size: 12px; }
        .ss-rec-impact { color: #4ADE80; font-weight: 700; }
        .ss-rec-dot { width: 3px; height: 3px; border-radius: 50%; background: rgba(255,255,255,0.2); }
        .ss-rec-conf { color: #8899AA; }
        .ss-rec-btn {
          display: flex; align-items: center; gap: 7px;
          background: none; border: 1px solid rgba(255,255,255,0.13); color: #C8D8E8;
          padding: 9px 18px; border-radius: 7px;
          font-size: 13px; font-weight: 600; cursor: pointer; white-space: nowrap;
          font-family: inherit; transition: all 0.2s; flex-shrink: 0;
        }
        .ss-rec-btn:hover { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.22); }

        /* ── COLLAPSIBLES ── */
        .ss-collapsible { border-top: 1px solid rgba(255,255,255,0.06); }
        .ss-collapse-btn {
          display: flex; align-items: center; gap: 10px; width: 100%;
          background: none; border: none; padding: 16px 0;
          font-size: 14px; font-weight: 600; color: #8899AA; cursor: pointer;
          font-family: inherit; transition: color 0.15s;
        }
        .ss-collapse-btn:hover { color: #C8D8E8; }
        .ss-collapse-count {
          font-size: 11px; background: rgba(255,255,255,0.06); border-radius: 20px;
          padding: 2px 9px; color: #485E78; font-weight: 600;
        }

        .ss-cluster-list { display: flex; flex-direction: column; gap: 8px; padding-bottom: 20px; }
        .ss-cluster-card {
          background: #09111A; border: 1px solid rgba(255,255,255,0.06);
          border-radius: 8px; padding: 16px 18px;
        }
        .ss-cluster-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .ss-cluster-name { font-size: 14px; font-weight: 700; color: #FFFFFF; }
        .ss-cluster-size { font-size: 12px; color: #485E78; font-weight: 600; }
        .ss-cluster-traits { display: flex; flex-direction: column; gap: 6px; }
        .ss-cluster-trait {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; color: #8899AA;
        }
        .ss-ct-dot { width: 4px; height: 4px; border-radius: 50%; background: rgba(255,255,255,0.2); flex-shrink: 0; }

        .ss-obs-list { display: flex; flex-direction: column; gap: 8px; padding-bottom: 20px; }
        .ss-obs-item {
          background: #09111A; border: 1px solid rgba(255,255,255,0.06);
          border-radius: 8px; padding: 16px 18px;
        }
        .ss-obs-text { font-size: 14px; color: #C8D8E8; line-height: 1.5; margin: 0 0 8px; font-style: italic; }
        .ss-obs-attr { font-size: 11px; color: #485E78; }

        /* ── EXEC SUMMARY ── */
        .ss-exec-summary {
          display: flex; gap: 20px; align-items: flex-start;
          padding: 28px 32px; margin-top: 32px;
          background: linear-gradient(100deg, rgba(110,231,242,0.06) 0%, transparent 70%);
          border-radius: 12px; border: 1px solid rgba(255,255,255,0.06);
          border-left: 2px solid #6EE7F2;
        }
        .ss-exec-icon { color: #6EE7F2; flex-shrink: 0; margin-top: 4px; }
        .ss-exec-label {
          font-size: 11px; text-transform: uppercase; font-weight: 700;
          color: #485E78; letter-spacing: 0.5px; display: block; margin-bottom: 10px;
        }
        .ss-exec-text {
          font-size: 18px; font-weight: 400; line-height: 1.65; color: #D8E8F0;
          font-style: italic; margin: 0; font-family: 'Instrument Serif', Georgia, serif;
        }

        /* ── TOAST ── */
        .ss-toast {
          position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%);
          background: #0D1520; border: 1px solid rgba(74,222,128,0.3); color: #4ADE80;
          padding: 10px 20px; border-radius: 8px; font-size: 13px; font-weight: 600;
          display: flex; align-items: center; gap: 8px; z-index: 200;
          box-shadow: 0 8px 30px rgba(0,0,0,0.5);
          animation: ssFadeUp 0.25s ease;
        }
        @keyframes ssFadeUp { from { opacity:0; transform: translateX(-50%) translateY(8px); } to { opacity:1; transform: translateX(-50%) translateY(0); } }

        /* ── DRAWER ── */
        .ss-overlay {
          position: fixed; inset: 0;
          background: rgba(4,8,18,0.75); backdrop-filter: blur(4px); z-index: 100;
        }
        .ss-drawer {
          position: fixed; top: 0; right: 0; bottom: 0; width: 460px; max-width: 100%;
          background: #0C1520; border-left: 1px solid rgba(255,255,255,0.09);
          z-index: 110; display: flex; flex-direction: column;
          box-shadow: -20px 0 60px rgba(0,0,0,0.7);
          animation: ssSlide 0.28s cubic-bezier(0.16,1,0.3,1);
        }
        @keyframes ssSlide { from { transform: translateX(100%); } to { transform: translateX(0); } }

        .ss-drawer-top {
          padding: 28px 28px 20px; border-bottom: 1px solid rgba(255,255,255,0.08);
          background: #091019;
        }
        .ss-drawer-toprow { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
        .ss-drawer-cat {
          font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px;
          padding: 3px 10px; border-radius: 20px;
        }
        .ss-close-btn {
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
          color: #8899AA; cursor: pointer; padding: 6px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center; transition: all 0.2s;
        }
        .ss-close-btn:hover { color: #FFFFFF; background: rgba(255,255,255,0.1); transform: rotate(90deg); }
        .ss-drawer-title { font-size: 20px; font-weight: 800; color: #FFFFFF; margin-bottom: 8px; letter-spacing: -0.025em; line-height: 1.2; }
        .ss-drawer-meta {
          display: flex; align-items: center; gap: 16px;
          font-size: 12px; font-weight: 500; color: #485E78;
        }
        .ss-drawer-meta span { display: flex; align-items: center; gap: 5px; }

        .ss-drawer-body {
          flex: 1; overflow-y: auto; padding: 24px 28px;
          display: flex; flex-direction: column; gap: 28px;
          scrollbar-width: thin; scrollbar-color: #1A2940 transparent;
        }
        .ss-dp-section h3 {
          font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;
          color: #485E78; margin-bottom: 14px; display: flex; align-items: center; gap: 6px;
        }
        .ss-insight-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
        .ss-insight-list li { display: flex; gap: 10px; font-size: 13px; line-height: 1.55; color: #C8D8E8; }
        .ss-li-dot { width: 5px; height: 5px; background: #485E78; border-radius: 50%; margin-top: 7px; flex-shrink: 0; }

        .ss-timeline { display: flex; flex-direction: column; gap: 16px; position: relative; padding-left: 8px; }
        .ss-timeline::before { content: ''; position: absolute; left: 11px; top: 6px; bottom: 0; width: 1px; background: rgba(255,255,255,0.08); }
        .ss-tl-item { position: relative; padding-left: 22px; }
        .ss-tl-dot { position: absolute; left: -1px; top: 5px; width: 7px; height: 7px; border-radius: 50%; background: #38B6FF; box-shadow: 0 0 6px rgba(56,182,255,0.5); }
        .ss-tl-agent { font-size: 11px; font-weight: 700; color: #38B6FF; margin-bottom: 3px; display: flex; align-items: center; justify-content: space-between; }
        .ss-tl-time { font-size: 10px; color: #485E78; }
        .ss-tl-action { font-size: 12px; color: #8899AA; line-height: 1.5; margin: 0; }

        .ss-impact-box { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; padding: 16px 20px; }
        .ss-impact-label { font-size: 11px; color: #485E78; text-transform: uppercase; font-weight: 700; letter-spacing: 0.4px; margin-bottom: 10px; display: block; }
        .ss-impact-compare { display: flex; align-items: center; gap: 12px; }
        .ss-impact-val { font-size: 24px; font-weight: 800; letter-spacing: -0.03em; color: #FFFFFF; }
        .ss-impact-val.muted { color: #485E78; }
        .ss-impact-val.green { color: #4ADE80; }
        .ss-impact-timeframe { font-size: 12px; color: #485E78; margin-top: 10px; }

        .ss-steps { display: flex; flex-direction: column; gap: 8px; }
        .ss-step {
          display: flex; align-items: center; gap: 14px;
          background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.07);
          padding: 12px 14px; border-radius: 8px;
        }
        .ss-step-num {
          width: 24px; height: 24px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 700; flex-shrink: 0;
        }
        .ss-step-num.ready   { background: rgba(74,222,128,0.1);  color: #4ADE80; border: 1px solid rgba(74,222,128,0.25); }
        .ss-step-num.pending { background: rgba(255,255,255,0.05); color: #485E78; border: 1px solid rgba(255,255,255,0.1); }
        .ss-step-desc { font-size: 13px; color: #C8D8E8; font-weight: 500; }

        .ss-drawer-footer {
          padding: 20px 28px; border-top: 1px solid rgba(255,255,255,0.08);
          background: #091019; display: flex; flex-direction: column; gap: 10px;
        }
        .ss-drawer-primary {
          width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px;
          background: #FFFFFF; color: #06080F;
          border: none; border-radius: 8px;
          padding: 13px; font-size: 14px; font-weight: 700; cursor: pointer;
          font-family: inherit; transition: all 0.2s;
        }
        .ss-drawer-primary:hover { background: #E8F0FA; }
        .ss-drawer-secondary {
          width: 100%; display: flex; align-items: center; justify-content: center;
          background: transparent; color: #8899AA;
          border: 1px solid rgba(255,255,255,0.1); border-radius: 8px;
          padding: 11px; font-size: 13px; font-weight: 600; cursor: pointer;
          font-family: inherit; transition: all 0.2s;
        }
        .ss-drawer-secondary:hover { background: rgba(255,255,255,0.04); color: #C8D8E8; }
      `}</style>
    </div>
  );
}
