import React from 'react';
import { 
  Network, TrendingUp, Users, DollarSign, Activity, ChevronRight, 
  Sparkles, ShieldCheck, Mail, Target, ArrowRight, Zap, Play,
  GitBranch, Box, Filter, Award
} from 'lucide-react';
import './ReferralOps.css';

const ReferralOps = () => {
  return (
    <div className="referral-ops-container fade-in">
      
      {/* ── 1. Executive Intelligence Header ── */}
      <h2 className="ro-section-title"><Network size={16} /> Ecosystem Health</h2>
      <div className="ro-header-grid">
        <div className="ro-kpi-card hero">
          <div className="ro-kpi-top">
            <span className="ro-kpi-label">Total Referrals Generated</span>
            <div className="ro-kpi-icon"><Users size={16} /></div>
          </div>
          <div>
            <div className="ro-kpi-value">18,420</div>
            <div className="ro-kpi-trend positive"><TrendingUp size={12} /> +12.4% vs last month</div>
          </div>
        </div>
        
        <div className="ro-kpi-card">
          <div className="ro-kpi-top">
            <span className="ro-kpi-label">OVHC Conversions</span>
            <div className="ro-kpi-icon"><ShieldCheck size={16} /></div>
          </div>
          <div>
            <div className="ro-kpi-value">1,240</div>
            <div className="ro-kpi-trend positive"><TrendingUp size={12} /> 22% conversion rate</div>
          </div>
        </div>

        <div className="ro-kpi-card">
          <div className="ro-kpi-top">
            <span className="ro-kpi-label">Referral Revenue</span>
            <div className="ro-kpi-icon"><DollarSign size={16} /></div>
          </div>
          <div>
            <div className="ro-kpi-value">$2.8M</div>
            <div className="ro-kpi-trend positive"><TrendingUp size={12} /> +$420k this quarter</div>
          </div>
        </div>
      </div>

      {/* ── 2. Referral Funnel Intelligence ── */}
      <div className="ro-card mb-8">
        <h2 className="ro-section-title"><Filter size={16} /> Conversion Funnel</h2>
        <div className="ro-funnel-wrapper">
          <div className="ro-funnel-stage">
            <div className="ro-fs-title">Referral Sent</div>
            <div className="ro-fs-val">18,420</div>
          </div>
          <ChevronRight className="ro-funnel-arrow" />
          <div className="ro-funnel-stage">
            <div className="ro-fs-title">App Downloaded</div>
            <div className="ro-fs-val">9,105</div>
            <div className="ro-fs-rate">49%</div>
          </div>
          <ChevronRight className="ro-funnel-arrow" />
          <div className="ro-funnel-stage">
            <div className="ro-fs-title">Exploring OVHC</div>
            <div className="ro-fs-val">4,200</div>
            <div className="ro-fs-rate">46%</div>
          </div>
          <ChevronRight className="ro-funnel-arrow" />
          <div className="ro-funnel-stage" style={{borderColor: 'rgba(230,0,40,0.3)', background: 'linear-gradient(180deg, rgba(230,0,40,0.05) 0%, transparent 100%)'}}>
            <div className="ro-fs-title" style={{color: '#FF4D6A'}}>OVHC Converted</div>
            <div className="ro-fs-val">1,240</div>
            <div className="ro-fs-rate">29%</div>
          </div>
        </div>
      </div>

      <div className="ro-two-col mb-8">
        {/* ── 4. AI Referral Intelligence Feed ── */}
        <div className="ro-card" style={{gridColumn: 'span 2'}}>
          <div className="ro-card-glow"></div>
          <h2 className="ro-section-title"><Sparkles size={16} /> Intelligence Feed</h2>
          <div className="ro-ai-feed">
            <div className="ro-ai-card">
              <div className="ro-ai-badge">98% Confidence</div>
              <p className="ro-ai-insight">"Peer-referred students convert 2.6x higher than those acquired via paid social campaigns."</p>
              <div className="ro-ai-footer">
                <span className="ro-ai-impact">Impact: <strong>High</strong></span>
                <span className="ro-ai-action">Shift Budget <ArrowRight size={14} /></span>
              </div>
            </div>
            <div className="ro-ai-card">
              <div className="ro-ai-badge">Opportunity</div>
              <p className="ro-ai-insight">"RMIT final-year cohorts generated the highest referral growth (+38%) this week."</p>
              <div className="ro-ai-footer">
                <span className="ro-ai-impact">Est. Uplift: <strong>+$120k</strong></span>
                <span className="ro-ai-action">Launch Campaign <ArrowRight size={14} /></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. Warm Referral Leads Queue ── */}
      <div className="ro-card mb-8">
        <h2 className="ro-section-title"><Target size={16} /> Warm Referral Leads Queue</h2>
        <div className="ro-table-container">
          <table className="ro-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Referred By</th>
                <th>University</th>
                <th>Intent</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="lead-name">
                    <div className="lead-avatar">SC</div>
                    Sarah Connor
                  </div>
                </td>
                <td><span style={{color: 'var(--fg-3)'}}>Aamir Ahamed</span></td>
                <td><span className="lead-uni">Monash University</span></td>
                <td>
                  <div className="lead-intent">
                    <div className="intent-bar"><div className="intent-fill high" style={{width: '90%'}}></div></div>
                    <span style={{fontSize: '12px', color: '#FFF'}}>High</span>
                  </div>
                </td>
                <td><span className="lead-status status-exploring">Exploring OVHC</span></td>
                <td><button className="ro-action-btn">Push Offer</button></td>
              </tr>
              <tr>
                <td>
                  <div className="lead-name">
                    <div className="lead-avatar" style={{background: '#047857'}}>JL</div>
                    James Lee
                  </div>
                </td>
                <td><span style={{color: 'var(--fg-3)'}}>Priya Patel</span></td>
                <td><span className="lead-uni">RMIT</span></td>
                <td>
                  <div className="lead-intent">
                    <div className="intent-bar"><div className="intent-fill med" style={{width: '60%'}}></div></div>
                    <span style={{fontSize: '12px', color: '#FFF'}}>Med</span>
                  </div>
                </td>
                <td><span className="lead-status status-contacted">Contacted</span></td>
                <td><button className="ro-action-btn secondary">Follow Up</button></td>
              </tr>
              <tr>
                <td>
                  <div className="lead-name">
                    <div className="lead-avatar" style={{background: '#B91C1C'}}>AK</div>
                    Aisha Khan
                  </div>
                </td>
                <td><span style={{color: 'var(--fg-3)'}}>Aamir Ahamed</span></td>
                <td><span className="lead-uni">UniMelb</span></td>
                <td>
                  <div className="lead-intent">
                    <div className="intent-bar"><div className="intent-fill high" style={{width: '85%'}}></div></div>
                    <span style={{fontSize: '12px', color: '#FFF'}}>High</span>
                  </div>
                </td>
                <td><span className="lead-status status-pending">Pending App</span></td>
                <td><button className="ro-action-btn secondary">Send Reminder</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── 5. Ambassador Intelligence ── */}
      <div className="ro-card mb-8">
        <h2 className="ro-section-title"><Award size={16} /> Top Ambassadors</h2>
        <div className="ro-amb-grid">
          <div className="ro-amb-card">
            <div className="ro-amb-avatar">AA</div>
            <h3 className="ro-amb-name">Aamir Ahamed</h3>
            <p className="ro-amb-uni">Monash University</p>
            <span className="ro-amb-tier">Community Leader</span>
            <div className="ro-amb-stats">
              <div className="ro-amb-stat">
                <span className="ro-amb-stat-val">18</span>
                <span className="ro-amb-stat-lbl">Referrals</span>
              </div>
              <div className="ro-amb-stat">
                <span className="ro-amb-stat-val text-success">7</span>
                <span className="ro-amb-stat-lbl">Converted</span>
              </div>
            </div>
          </div>
          
          <div className="ro-amb-card">
            <div className="ro-amb-avatar" style={{background: 'linear-gradient(135deg, #065F46, #064E3B)'}}>PP</div>
            <h3 className="ro-amb-name">Priya Patel</h3>
            <p className="ro-amb-uni">RMIT</p>
            <span className="ro-amb-tier">Ambassador</span>
            <div className="ro-amb-stats">
              <div className="ro-amb-stat">
                <span className="ro-amb-stat-val">12</span>
                <span className="ro-amb-stat-lbl">Referrals</span>
              </div>
              <div className="ro-amb-stat">
                <span className="ro-amb-stat-val text-success">4</span>
                <span className="ro-amb-stat-lbl">Converted</span>
              </div>
            </div>
          </div>

          <div className="ro-amb-card">
            <div className="ro-amb-avatar" style={{background: 'linear-gradient(135deg, #7F1D1D, #450A0A)'}}>LW</div>
            <h3 className="ro-amb-name">Li Wei</h3>
            <p className="ro-amb-uni">University of Sydney</p>
            <span className="ro-amb-tier">Ambassador</span>
            <div className="ro-amb-stats">
              <div className="ro-amb-stat">
                <span className="ro-amb-stat-val">15</span>
                <span className="ro-amb-stat-lbl">Referrals</span>
              </div>
              <div className="ro-amb-stat">
                <span className="ro-amb-stat-val text-success">5</span>
                <span className="ro-amb-stat-lbl">Converted</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="ro-two-col mb-8">
        {/* ── 6. University Referral Heatmap ── */}
        <div className="ro-card">
          <h2 className="ro-section-title"><Activity size={16} /> Campus Momentum</h2>
          <div className="ro-heatmap-list">
            <div className="ro-heatmap-row">
              <span className="ro-hm-name">RMIT</span>
              <div className="ro-hm-bar-wrap">
                <div className="ro-hm-bar" style={{width: '95%'}}></div>
              </div>
              <span className="ro-hm-val">+38%</span>
            </div>
            <div className="ro-heatmap-row">
              <span className="ro-hm-name">Monash</span>
              <div className="ro-hm-bar-wrap">
                <div className="ro-hm-bar" style={{width: '75%'}}></div>
              </div>
              <span className="ro-hm-val">+22%</span>
            </div>
            <div className="ro-heatmap-row">
              <span className="ro-hm-name">UniMelb</span>
              <div className="ro-hm-bar-wrap">
                <div className="ro-hm-bar" style={{width: '50%'}}></div>
              </div>
              <span className="ro-hm-val">+11%</span>
            </div>
            <div className="ro-heatmap-row">
              <span className="ro-hm-name">Deakin</span>
              <div className="ro-hm-bar-wrap">
                <div className="ro-hm-bar" style={{width: '25%', background: '#64748B'}}></div>
              </div>
              <span className="ro-hm-val" style={{color: 'var(--fg-3)'}}>+4%</span>
            </div>
          </div>
        </div>

        {/* ── 9. Referral Revenue Attribution ── */}
        <div className="ro-card">
          <h2 className="ro-section-title"><DollarSign size={16} /> Revenue Attribution</h2>
          <div className="ro-rev-chart">
            <div className="ro-rev-row">
              <span className="ro-rev-lbl"><div className="ro-rev-dot referral"></div> Referral Ecosystem</span>
              <span className="ro-rev-val">$2.8M</span>
            </div>
            <div className="ro-rev-row">
              <span className="ro-rev-lbl"><div className="ro-rev-dot paid"></div> Paid Ads</span>
              <span className="ro-rev-val">$1.4M</span>
            </div>
            <div className="ro-rev-row">
              <span className="ro-rev-lbl"><div className="ro-rev-dot organic"></div> Organic / Email</span>
              <span className="ro-rev-val">$920K</span>
            </div>
            <div style={{marginTop: '32px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)'}}>
              <p style={{fontSize: '12px', color: 'var(--fg-3)', lineHeight: '1.5'}}>
                <strong style={{color: '#FFF'}}>CAC Reduction:</strong> Acquiring through referrals is currently <strong>64% cheaper</strong> than paid channels.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="ro-two-col mb-8">
        {/* ── 7. Recommended Referral Actions ── */}
        <div className="ro-card">
          <h2 className="ro-section-title"><Zap size={16} /> Recommended Actions</h2>
          <div className="ro-actions-grid">
            <div className="ro-action-rec">
              <div className="ro-ar-left">
                <h4 className="ro-ar-title">Launch RMIT Push</h4>
                <p className="ro-ar-sub">Capitalize on 38% campus growth.</p>
                <span className="ro-ar-impact">Est. +$120k Revenue</span>
              </div>
              <button className="ro-ar-btn">Launch</button>
            </div>
            <div className="ro-action-rec">
              <div className="ro-ar-left">
                <h4 className="ro-ar-title">Reward Top 10%</h4>
                <p className="ro-ar-sub">Trigger Leader tier emails.</p>
                <span className="ro-ar-impact">Est. +450 Referrals</span>
              </div>
              <button className="ro-ar-btn">Execute</button>
            </div>
          </div>

          {/* ── 8. Referral Workflow Automation Preview ── */}
          <div style={{marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.05)'}}>
            <h2 className="ro-section-title"><GitBranch size={16} /> Automation Preview</h2>
            <div style={{background: 'rgba(0,0,0,0.2)', borderRadius: '12px', padding: '24px', display: 'flex', alignItems: 'center', gap: '16px'}}>
              <div style={{background: 'var(--bg-3)', padding: '12px', borderRadius: '8px', border: '1px solid var(--line-strong)', fontSize: '12px', fontWeight: 600}}>
                IF: OVHC Converted
              </div>
              <ArrowRight size={16} color="var(--fg-4)" />
              <div style={{background: 'rgba(221,8,34,0.1)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(221,8,34,0.2)', fontSize: '12px', fontWeight: 600, color: '#FF4D6A'}}>
                THEN: Unlock 10% Savings
              </div>
              <ArrowRight size={16} color="var(--fg-4)" />
              <div style={{background: 'var(--bg-3)', padding: '12px', borderRadius: '8px', border: '1px solid var(--line-strong)', fontSize: '12px', fontWeight: 600}}>
                Notify Ambassador
              </div>
            </div>
          </div>
        </div>

        {/* ── 10. Real-Time Activity Feed ── */}
        <div className="ro-card">
          <h2 className="ro-section-title"><Play size={16} /> Live Activity</h2>
          <div className="ro-feed-list">
            <div className="ro-feed-item">
              <div className="ro-feed-icon high"><ShieldCheck size={16} /></div>
              <div className="ro-feed-content">
                <p><strong>Sarah Connor</strong> converted to OVHC via Aamir's link.</p>
                <span className="ro-feed-time">2 mins ago</span>
              </div>
            </div>
            <div className="ro-feed-item">
              <div className="ro-feed-icon"><Users size={16} /></div>
              <div className="ro-feed-content">
                <p>3 new direct referrals submitted from <strong>Monash University</strong>.</p>
                <span className="ro-feed-time">14 mins ago</span>
              </div>
            </div>
            <div className="ro-feed-item">
              <div className="ro-feed-icon"><Award size={16} /></div>
              <div className="ro-feed-content">
                <p><strong>Priya Patel</strong> unlocked Ambassador Tier.</p>
                <span className="ro-feed-time">45 mins ago</span>
              </div>
            </div>
            <div className="ro-feed-item">
              <div className="ro-feed-icon"><TrendingUp size={16} /></div>
              <div className="ro-feed-content">
                <p>System detected a <strong>12% spike</strong> in referral link clicks.</p>
                <span className="ro-feed-time">2 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ReferralOps;
