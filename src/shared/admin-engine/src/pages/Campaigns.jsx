import { useNavigate } from 'react-router-dom';
import { Sparkles, TrendingUp, ChevronRight, Zap } from 'lucide-react';
import {
  campaignBrief, campaignPerformance, suggestedCampaigns,
  channelInsights, weeklyShifts,
} from '../data/mockData';

const CHANNEL_COLORS = {
  WhatsApp:  { color: '#4ADE80', bg: 'rgba(74,222,128,0.1)',   border: 'rgba(74,222,128,0.2)' },
  'In-App':  { color: '#38B6FF', bg: 'rgba(56,182,255,0.1)',   border: 'rgba(56,182,255,0.2)' },
  Email:     { color: '#F5B544', bg: 'rgba(245,181,68,0.1)',   border: 'rgba(245,181,68,0.2)' },
  Push:      { color: '#8B5CF6', bg: 'rgba(139,92,246,0.1)',   border: 'rgba(139,92,246,0.2)' },
  Community: { color: '#6EE7F2', bg: 'rgba(110,231,242,0.1)',  border: 'rgba(110,231,242,0.2)' },
};

const METRICS = [
  { label: 'Campaign CTR',       value: '18.4%',   color: '#4ADE80' },
  { label: 'Avg. Engagement',    value: '+22%',    color: '#38B6FF' },
  { label: 'OVHC Influence',     value: '+12%',    color: '#4ADE80' },
  { label: 'Top Channel',        value: 'WhatsApp',color: '#F0F4FA' },
  { label: 'Revenue Influenced', value: '+$420K',  color: '#4ADE80' },
];

function ChannelChip({ name }) {
  const c = CHANNEL_COLORS[name] || { color: '#8A93A6', bg: 'rgba(138,147,166,0.1)', border: 'rgba(138,147,166,0.2)' };
  return (
    <span className="ci-chip" style={{ color: c.color, background: c.bg, borderColor: c.border }}>
      {name}
    </span>
  );
}

export default function Campaigns() {
  const navigate = useNavigate();

  return (
    <div className="ci-root">
      <style>{`
        .ci-root {
          max-width: 960px; margin: 0 auto; padding: 0 0 120px;
          font-family: var(--font-sans); color: #8899AA;
        }

        /* Header */
        .ci-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 28px; }
        .ci-header h1 { font-size: 34px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.04em; margin: 0 0 7px; }
        .ci-subtitle { font-size: 15px; color: #8899AA; margin: 0; }
        .ci-header-pills { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; padding-top: 4px; }
        .ci-pill {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 20px;
          border: 1px solid;
        }
        .ci-pill.green { color: #4ADE80; background: rgba(74,222,128,0.08);  border-color: rgba(74,222,128,0.2); }
        .ci-pill.amber { color: #F5B544; background: rgba(245,181,68,0.08);  border-color: rgba(245,181,68,0.2); }
        .ci-pill.blue  { color: #38B6FF; background: rgba(56,182,255,0.08);  border-color: rgba(56,182,255,0.2); }
        .ci-pill-dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; animation: ciPulse 2.5s ease-in-out infinite; }
        @keyframes ciPulse { 0%,100%{opacity:1} 50%{opacity:0.35} }

        /* Metrics strip */
        .ci-metrics {
          display: flex; background: #0A111A; border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px; margin-bottom: 32px; overflow: hidden;
        }
        .ci-metric { flex: 1; padding: 18px 20px; border-right: 1px solid rgba(255,255,255,0.06); }
        .ci-metric:last-child { border-right: none; }
        .ci-metric-val { display: block; font-size: 22px; font-weight: 700; letter-spacing: -0.02em; line-height: 1; margin-bottom: 5px; }
        .ci-metric-lbl { font-size: 11px; color: #4A5268; font-weight: 500; }

        /* Section label */
        .ci-section-label {
          font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          color: #3D4560; margin-bottom: 14px; display: flex; align-items: center; gap: 10px;
        }
        .ci-section-label::after { content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.05); }

        /* Channel chip */
        .ci-chip {
          font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 20px;
          border: 1px solid; letter-spacing: 0.04em;
        }

        /* Intelligence Brief */
        .ci-brief {
          background: linear-gradient(135deg, #0D1928 0%, #0A111A 100%);
          border: 1px solid rgba(255,255,255,0.09); border-left: 3px solid #6EE7F2;
          border-radius: 14px; padding: 32px 36px; margin-bottom: 40px;
          position: relative; overflow: hidden;
        }
        .ci-brief::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 160px;
          background: radial-gradient(ellipse 100% 120px at 30% -30px, rgba(110,231,242,0.06), transparent);
          pointer-events: none;
        }
        .ci-brief-eyebrow { display: flex; align-items: center; gap: 8px; margin-bottom: 20px; position: relative; }
        .ci-tag-cyan { font-size: 11px; font-weight: 700; color: #6EE7F2; background: rgba(110,231,242,0.1); border: 1px solid rgba(110,231,242,0.2); padding: 3px 9px; border-radius: 20px; letter-spacing: 0.04em; }
        .ci-tag-purple { font-size: 11px; font-weight: 700; color: #8B5CF6; background: rgba(139,92,246,0.1); border: 1px solid rgba(139,92,246,0.2); padding: 3px 9px; border-radius: 20px; }
        .ci-brief-narrative {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: 20px; font-style: italic; color: #D8E8F0; line-height: 1.65;
          margin-bottom: 28px; position: relative;
        }
        .ci-brief-stats {
          display: flex; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px; overflow: hidden; margin-bottom: 20px;
        }
        .ci-bstat { flex: 1; padding: 14px 18px; border-right: 1px solid rgba(255,255,255,0.06); }
        .ci-bstat:last-child { border-right: none; }
        .ci-bstat-val { display: block; font-size: 18px; font-weight: 700; color: #F0F4FA; letter-spacing: -0.02em; margin-bottom: 3px; }
        .ci-bstat-lbl { font-size: 11px; color: #4A5268; }
        .ci-brief-focus {
          font-size: 13px; color: #6A7486; line-height: 1.55; padding: 12px 16px;
          background: rgba(255,255,255,0.02); border-radius: 8px; border-left: 2px solid rgba(110,231,242,0.3);
          position: relative;
        }
        .ci-brief-focus strong { color: #8A93A6; }

        /* Campaign performance cards */
        .ci-perf-card {
          background: #09111A; border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px; padding: 24px 28px; margin-bottom: 12px;
          transition: border-color 0.15s ease;
        }
        .ci-perf-card:hover { border-color: rgba(255,255,255,0.1); }
        .ci-perf-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px; }
        .ci-perf-name { font-size: 16px; font-weight: 700; color: #E8F0FA; letter-spacing: -0.02em; margin-bottom: 4px; }
        .ci-perf-audience { font-size: 12px; color: #4A5268; margin-bottom: 14px; }
        .ci-perf-chips { display: flex; align-items: center; gap: 6px; flex-shrink: 0; padding-top: 2px; }
        .ci-status-active {
          font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 20px; letter-spacing: 0.06em;
          background: rgba(74,222,128,0.1); color: #4ADE80; border: 1px solid rgba(74,222,128,0.2);
        }
        .ci-perf-headline { font-size: 15px; font-weight: 600; color: #4ADE80; margin-bottom: 16px; }
        .ci-perf-body { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 14px; }
        .ci-perf-block { background: rgba(255,255,255,0.025); border-radius: 8px; padding: 12px 14px; }
        .ci-perf-block-lbl { font-size: 10px; font-weight: 700; color: #3D4560; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 6px; }
        .ci-perf-block-txt { font-size: 12px; color: #7A8496; line-height: 1.55; }
        .ci-rec-block {
          background: linear-gradient(90deg, rgba(56,182,255,0.05) 0%, transparent 100%);
          border: 1px solid rgba(56,182,255,0.1); border-radius: 8px; padding: 14px 16px; margin-bottom: 18px;
        }
        .ci-rec-lbl { font-size: 10px; font-weight: 700; color: #38B6FF; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 6px; display: flex; align-items: center; gap: 5px; }
        .ci-rec-txt { font-size: 13px; color: #8A93A6; line-height: 1.55; }
        .ci-perf-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.05); }
        .ci-impact { font-size: 13px; font-weight: 600; color: #4ADE80; display: flex; align-items: center; gap: 6px; }
        .ci-impact-conf { font-size: 11px; color: #3D4560; font-weight: 400; }
        .ci-actions { display: flex; gap: 8px; }

        /* Buttons */
        .ci-btn-ghost {
          font-size: 12px; font-weight: 600; color: #6A7486;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
          padding: 7px 14px; border-radius: 7px; cursor: pointer;
          display: flex; align-items: center; gap: 5px; transition: all 0.15s ease;
          font-family: var(--font-sans);
        }
        .ci-btn-ghost:hover { background: rgba(255,255,255,0.07); color: #C0CADC; }
        .ci-btn-green {
          font-size: 12px; font-weight: 600; color: #000;
          background: #4ADE80; border: none; padding: 7px 14px; border-radius: 7px; cursor: pointer;
          display: flex; align-items: center; gap: 5px; transition: filter 0.15s ease;
          font-family: var(--font-sans);
        }
        .ci-btn-green:hover { filter: brightness(1.08); }
        .ci-btn-red {
          font-size: 12px; font-weight: 600; color: #fff;
          background: #DD0822; border: none; padding: 8px 16px; border-radius: 7px; cursor: pointer;
          display: flex; align-items: center; gap: 6px; transition: filter 0.15s ease;
          font-family: var(--font-sans);
        }
        .ci-btn-red:hover { filter: brightness(1.1); }

        /* Suggested campaign cards */
        .ci-suggest-card {
          border-radius: 14px; padding: 28px 32px; margin-bottom: 12px;
          position: relative; overflow: hidden; transition: border-color 0.15s ease;
          background: #0D1520; border: 1px solid rgba(255,255,255,0.08);
        }
        .ci-suggest-card.high   { border-left: 3px solid #DD0822; background: linear-gradient(90deg, rgba(221,8,34,0.05) 0%, #0D1520 50%); }
        .ci-suggest-card.medium { border-left: 3px solid #F5B544; background: linear-gradient(90deg, rgba(245,181,68,0.04) 0%, #0D1520 50%); }
        .ci-suggest-card:hover { border-color: rgba(255,255,255,0.13); }
        .ci-opp-badge {
          display: inline-flex; align-items: center; gap: 5px; margin-bottom: 12px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
          color: #DD0822; background: rgba(221,8,34,0.1); border: 1px solid rgba(221,8,34,0.2);
          padding: 3px 9px; border-radius: 20px;
        }
        .ci-suggest-name { font-size: 18px; font-weight: 700; color: #E8F0FA; letter-spacing: -0.02em; margin-bottom: 10px; }
        .ci-suggest-why { font-size: 14px; color: #7A8496; line-height: 1.6; margin-bottom: 16px; }
        .ci-suggest-chips { display: flex; gap: 6px; margin-bottom: 20px; }
        .ci-suggest-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 20px; }
        .ci-suggest-metric { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 10px 12px; }
        .ci-suggest-metric-val { display: block; font-size: 16px; font-weight: 700; color: #F0F4FA; letter-spacing: -0.02em; margin-bottom: 2px; }
        .ci-suggest-metric-lbl { font-size: 10px; color: #3D4560; }
        .ci-suggest-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.05); }
        .ci-suggest-agent { font-size: 11px; color: #3D4560; display: flex; align-items: center; gap: 6px; }
        .ci-suggest-agent strong { color: #5A6478; }

        /* Channel intelligence */
        .ci-intel-card { background: #0A111A; border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; padding: 22px 26px; }
        .ci-channel-row { display: flex; align-items: flex-start; gap: 14px; padding: 13px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .ci-channel-row:first-child { padding-top: 0; }
        .ci-channel-row:last-child { border-bottom: none; padding-bottom: 0; }
        .ci-channel-name { width: 86px; flex-shrink: 0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; padding-top: 1px; }
        .ci-channel-text { flex: 1; font-size: 13px; color: #7A8496; line-height: 1.55; }
        .ci-channel-stat { font-size: 11px; font-weight: 700; padding: 3px 9px; border-radius: 6px; flex-shrink: 0; white-space: nowrap; border: 1px solid; }
        .ci-channel-stat.positive { color: #4ADE80; background: rgba(74,222,128,0.08); border-color: rgba(74,222,128,0.18); }
        .ci-channel-stat.warning  { color: #F5B544; background: rgba(245,181,68,0.08);  border-color: rgba(245,181,68,0.18); }

        /* Weekly shifts */
        .ci-shift-row { display: flex; align-items: center; gap: 14px; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.04); }
        .ci-shift-row:first-child { padding-top: 0; }
        .ci-shift-row:last-child { border-bottom: none; padding-bottom: 0; }
        .ci-shift-delta { font-size: 14px; font-weight: 700; width: 56px; flex-shrink: 0; text-align: right; }
        .ci-shift-delta.up   { color: #4ADE80; }
        .ci-shift-delta.down { color: #FF4D6A; }
        .ci-shift-body { flex: 1; min-width: 0; }
        .ci-shift-label { font-size: 13px; font-weight: 500; color: #C0CADC; margin-bottom: 2px; }
        .ci-shift-note  { font-size: 11px; color: #3D4560; }
      `}</style>

      {/* HEADER */}
      <div className="ci-header">
        <div>
          <h1>Campaign Intelligence</h1>
          <p className="ci-subtitle">AI-optimised engagement and conversion workflows across the student lifecycle.</p>
        </div>
        <div className="ci-header-pills">
          <div className="ci-pill green"><span className="ci-pill-dot" />4 campaigns outperforming baseline</div>
          <div className="ci-pill amber"><span className="ci-pill-dot" />2 interventions detected</div>
          <div className="ci-pill blue"><span className="ci-pill-dot" />Campaign Optimisation Agent active</div>
        </div>
      </div>

      {/* METRICS STRIP */}
      <div className="ci-metrics">
        {METRICS.map((m) => (
          <div key={m.label} className="ci-metric">
            <span className="ci-metric-val" style={{ color: m.color }}>{m.value}</span>
            <span className="ci-metric-lbl">{m.label}</span>
          </div>
        ))}
      </div>

      {/* CAMPAIGN INTELLIGENCE BRIEF */}
      <div className="ci-section-label">Campaign Intelligence Brief</div>
      <div className="ci-brief">
        <div className="ci-brief-eyebrow">
          <span className="ci-tag-cyan">{campaignBrief.agent}</span>
          <span className="ci-tag-purple">{campaignBrief.layer}</span>
        </div>
        <div className="ci-brief-narrative">"{campaignBrief.narrative}"</div>
        <div className="ci-brief-stats">
          <div className="ci-bstat">
            <span className="ci-bstat-val" style={{ color: '#4ADE80' }}>{campaignBrief.projectedUplift}</span>
            <div className="ci-bstat-lbl">Projected uplift</div>
          </div>
          <div className="ci-bstat">
            <span className="ci-bstat-val">{campaignBrief.confidence}</span>
            <div className="ci-bstat-lbl">AI Confidence</div>
          </div>
          <div className="ci-bstat">
            <span className="ci-bstat-val">{campaignBrief.strongestChannel}</span>
            <div className="ci-bstat-lbl">Strongest channel</div>
          </div>
        </div>
        <div className="ci-brief-focus">
          <strong>Recommended focus:</strong> {campaignBrief.recommendedFocus}
        </div>
      </div>

      {/* CAMPAIGN PERFORMANCE FEED */}
      <div className="ci-section-label">Campaign Performance</div>
      {campaignPerformance.map((camp) => (
        <div key={camp.id} className="ci-perf-card">
          <div className="ci-perf-top">
            <div>
              <div className="ci-perf-name">{camp.name}</div>
            </div>
            <div className="ci-perf-chips">
              {camp.channels.map(ch => <ChannelChip key={ch} name={ch} />)}
              <span className="ci-status-active">Active</span>
            </div>
          </div>
          <div className="ci-perf-audience">{camp.audience}</div>
          <div className="ci-perf-headline">{camp.performance.headline}</div>
          <div className="ci-perf-body">
            <div className="ci-perf-block">
              <div className="ci-perf-block-lbl">What worked</div>
              <div className="ci-perf-block-txt">{camp.whatWorked}</div>
            </div>
            <div className="ci-perf-block">
              <div className="ci-perf-block-lbl">What underperformed</div>
              <div className="ci-perf-block-txt">{camp.whatUnderperformed}</div>
            </div>
          </div>
          <div className="ci-rec-block">
            <div className="ci-rec-lbl"><Sparkles size={10} /> AI Recommendation</div>
            <div className="ci-rec-txt">{camp.aiRecommendation}</div>
          </div>
          <div className="ci-perf-footer">
            <div className="ci-impact">
              <TrendingUp size={14} />
              {camp.projectedImpact}
              <span className="ci-impact-conf">· {camp.confidence} confidence</span>
            </div>
            <div className="ci-actions">
              <button className="ci-btn-ghost">View Analysis</button>
              <button className="ci-btn-green" onClick={() => navigate('/action-studio')}>
                Optimise <ChevronRight size={12} />
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* AI SUGGESTED CAMPAIGNS */}
      <div className="ci-section-label" style={{ marginTop: '40px' }}>AI Detected Opportunities</div>
      {suggestedCampaigns.map((camp) => (
        <div key={camp.id} className={`ci-suggest-card ${camp.priority}`}>
          <div className="ci-opp-badge"><Sparkles size={9} /> AI Detected Opportunity</div>
          <div className="ci-suggest-name">{camp.name}</div>
          <div className="ci-suggest-why">{camp.why}</div>
          <div className="ci-suggest-chips">
            {camp.channels.map(ch => <ChannelChip key={ch} name={ch} />)}
          </div>
          <div className="ci-suggest-grid">
            <div className="ci-suggest-metric">
              <span className="ci-suggest-metric-val" style={{ color: '#4ADE80' }}>{camp.projectedRevenue}</span>
              <div className="ci-suggest-metric-lbl">Revenue opportunity</div>
            </div>
            <div className="ci-suggest-metric">
              <span className="ci-suggest-metric-val">{camp.predictedCTR}</span>
              <div className="ci-suggest-metric-lbl">Predicted CTR</div>
            </div>
            <div className="ci-suggest-metric">
              <span className="ci-suggest-metric-val" style={{ color: '#4ADE80' }}>{camp.conversionUplift}</span>
              <div className="ci-suggest-metric-lbl">Conversion uplift</div>
            </div>
            <div className="ci-suggest-metric">
              <span className="ci-suggest-metric-val">{camp.confidence}</span>
              <div className="ci-suggest-metric-lbl">AI Confidence</div>
            </div>
          </div>
          <div className="ci-suggest-footer">
            <div className="ci-suggest-agent">
              <Sparkles size={11} />
              Recommended by <strong>{camp.agent}</strong> · Target: {camp.targetCohort}
            </div>
            <div className="ci-actions">
              <button className="ci-btn-ghost">Review Audience</button>
              <button className="ci-btn-red" onClick={() => navigate('/action-studio')}>
                <Zap size={12} /> Send to Action Studio
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* CHANNEL INTELLIGENCE + WEEKLY SHIFTS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', marginTop: '40px' }}>

        <div>
          <div className="ci-section-label">Channel Intelligence</div>
          <div className="ci-intel-card">
            {channelInsights.map((c, i) => (
              <div key={i} className="ci-channel-row">
                <div className="ci-channel-name" style={{ color: (CHANNEL_COLORS[c.channel] || {}).color || '#8A93A6' }}>
                  {c.channel}
                </div>
                <div className="ci-channel-text">{c.insight}</div>
                <div className={`ci-channel-stat ${c.direction}`}>{c.stat}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="ci-section-label">What Changed This Week</div>
          <div className="ci-intel-card">
            {weeklyShifts.map((s, i) => (
              <div key={i} className="ci-shift-row">
                <span className={`ci-shift-delta ${s.direction}`}>{s.change}</span>
                <div className="ci-shift-body">
                  <div className="ci-shift-label">{s.label}</div>
                  <div className="ci-shift-note">{s.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
