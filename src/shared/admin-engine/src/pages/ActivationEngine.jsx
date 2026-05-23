import React from 'react';
import { 
  Users, Smartphone, DollarSign, AlertTriangle, TrendingUp, 
  BrainCircuit, Zap, Target, ArrowRight, ArrowRightCircle,
  Mail, MessageSquare, ShieldAlert, CheckCircle2, Bot, Sparkles
} from 'lucide-react';
import './ActivationEngine.css';

const ActivationEngine = () => {

  return (
    <div className="ae-container">
      {/* HEADER */}
      <header className="ae-header">
        <h1>Student Activation Engine</h1>
        <p>Identify activation gaps, diagnose root causes, and launch operational workflows to drive OSHC purchasers into active app users.</p>
      </header>

      {/* 1. EXECUTIVE SUMMARY HERO */}
      <section className="ae-section">
        <div className="ae-section-title"><Target size={20} /> Executive Summary</div>
        <div className="ae-hero-grid">
          <div className="ae-metric-card">
            <span className="ae-metric-label">Total OSHC Users</span>
            <span className="ae-metric-val">100,000</span>
          </div>
          <div className="ae-metric-card">
            <span className="ae-metric-label">App Download Rate</span>
            <span className="ae-metric-val">68.0%</span>
          </div>
          <div className="ae-metric-card critical">
            <span className="ae-metric-label">Users Not Activated</span>
            <span className="ae-metric-val">32,000</span>
          </div>
          <div className="ae-metric-card critical">
            <span className="ae-metric-label">Revenue Opportunity at Risk</span>
            <span className="ae-metric-val">$4.8M</span>
          </div>
          <div className="ae-metric-card">
            <span className="ae-metric-label">Highest Risk Cohort</span>
            <span className="ae-metric-val" style={{fontSize:'24px', paddingTop:'8px'}}>New Arrivals (&lt;14d)</span>
          </div>
          <div className="ae-metric-card success">
            <span className="ae-metric-label">Potential Lift (Target)</span>
            <span className="ae-metric-val">+12.0%</span>
          </div>
        </div>
      </section>

      {/* 2. ACTIVATION FUNNEL VISUAL */}
      <section className="ae-section">
        <div className="ae-section-title"><TrendingUp size={20} /> Activation Funnel Drop-off</div>
        <div className="ae-glass-card">
          <div className="ae-funnel-container">
            <div className="ae-funnel-line"></div>
            <div className="ae-funnel-fill" style={{width: '75%'}}></div>
            
            <div className="ae-funnel-node">
              <div className="ae-funnel-dot"></div>
              <span className="ae-funnel-val">100k</span>
              <span className="ae-funnel-label">OSHC Purchased</span>
            </div>
            
            <div className="ae-funnel-node">
              <div className="ae-funnel-drop">-32% (32k)</div>
              <div className="ae-funnel-dot"></div>
              <span className="ae-funnel-val">68k</span>
              <span className="ae-funnel-label">App Downloaded</span>
            </div>

            <div className="ae-funnel-node">
              <div className="ae-funnel-drop">-23% (16k)</div>
              <div className="ae-funnel-dot"></div>
              <span className="ae-funnel-val">52k</span>
              <span className="ae-funnel-label">Registered</span>
            </div>

            <div className="ae-funnel-node">
              <div className="ae-funnel-drop">-25% (13k)</div>
              <div className="ae-funnel-dot"></div>
              <span className="ae-funnel-val">39k</span>
              <span className="ae-funnel-label">Setup Complete</span>
            </div>

            <div className="ae-funnel-node">
              <div className="ae-funnel-drop">-38% (15k)</div>
              <div className="ae-funnel-dot" style={{borderColor: 'var(--bg-2)', background: '#38B6FF'}}></div>
              <span className="ae-funnel-val text-info">24k</span>
              <span className="ae-funnel-label">Weekly Active</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COHORT INTELLIGENCE */}
      <section className="ae-section">
        <div className="ae-section-title"><Users size={20} /> Cohort Adoption Intelligence</div>
        <div className="ae-cohort-grid">
          
          <div className="ae-cohort-card">
            <div className="ae-cohort-header">
              <span className="ae-cohort-title">Monash Univ.</span>
              <span className="ae-risk-badge risk-high">High Risk</span>
            </div>
            <div className="flex-between mb-8">
              <span className="text-muted text-sm">Adoption Rate</span>
              <span className="font-bold">42%</span>
            </div>
            <div className="ae-cohort-bar-bg">
              <div className="ae-cohort-bar-fill bg-danger" style={{width: '42%', background: '#FF4D6A'}}></div>
            </div>
            <p className="text-sm mt-16 text-muted">Est. Gap: $1.2M Opportunity</p>
          </div>

          <div className="ae-cohort-card">
            <div className="ae-cohort-header">
              <span className="ae-cohort-title">RMIT Univ.</span>
              <span className="ae-risk-badge risk-medium">Med Risk</span>
            </div>
            <div className="flex-between mb-8">
              <span className="text-muted text-sm">Adoption Rate</span>
              <span className="font-bold">71%</span>
            </div>
            <div className="ae-cohort-bar-bg">
              <div className="ae-cohort-bar-fill" style={{width: '71%', background: '#F5B544'}}></div>
            </div>
            <p className="text-sm mt-16 text-muted">Est. Gap: $450k Opportunity</p>
          </div>

          <div className="ae-cohort-card">
            <div className="ae-cohort-header">
              <span className="ae-cohort-title">UniMelb</span>
              <span className="ae-risk-badge risk-low">Low Risk</span>
            </div>
            <div className="flex-between mb-8">
              <span className="text-muted text-sm">Adoption Rate</span>
              <span className="font-bold">84%</span>
            </div>
            <div className="ae-cohort-bar-bg">
              <div className="ae-cohort-bar-fill" style={{width: '84%', background: '#4ADE80'}}></div>
            </div>
            <p className="text-sm mt-16 text-muted">Est. Gap: $120k Opportunity</p>
          </div>

        </div>
      </section>

      {/* 4. ROOT CAUSE INTELLIGENCE */}
      <section className="ae-section">
        <div className="ae-section-title"><BrainCircuit size={20} /> AI Root Cause Diagnostics</div>
        <div className="ae-rc-grid">
          
          <div className="ae-rc-card">
            <div className="ae-rc-icon"><Mail size={20} /></div>
            <div className="ae-rc-content">
              <h4>44% of agent-purchased OSHC users never opened the onboarding email.</h4>
              <p>Users who purchased through education agents are missing initial Medibank comms, likely due to generic agent emails being used on file.</p>
              <div className="ae-ai-confidence"><Sparkles size={12}/> AI Confidence: 94% • High Severity</div>
            </div>
          </div>

          <div className="ae-rc-card">
            <div className="ae-rc-icon" style={{color: '#FF4D6A', background: 'rgba(255,77,106,0.1)'}}><ShieldAlert size={20} /></div>
            <div className="ae-rc-content">
              <h4>1,820 users dropped off during App OTP verification this week.</h4>
              <p>International SMS delivery failures to overseas numbers are causing a massive bottleneck at the first login step.</p>
              <div className="ae-ai-confidence" style={{color: '#FF4D6A'}}><Sparkles size={12}/> AI Confidence: 89% • Critical Drop-off</div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. RECOMMENDED ACTIONS CENTRE */}
      <section className="ae-section">
        <div className="ae-section-title"><Zap size={20} /> Recommended Immediate Actions</div>
        <div className="ae-action-grid">
          
          <div className="ae-action-card">
            <div className="ae-action-header">
              <h3>WhatsApp Onboarding Flow</h3>
              <p>Bypass email and send a direct WhatsApp message to agent-purchased users.</p>
            </div>
            <div className="ae-action-stats">
              <div className="ae-astat">
                <span className="ae-astat-lbl">Est. Uplift</span>
                <span className="ae-astat-val text-success">+18%</span>
              </div>
              <div className="ae-astat">
                <span className="ae-astat-lbl">Target Cohort</span>
                <span className="ae-astat-val">Agent Users</span>
              </div>
            </div>
            <button className="ae-btn-primary"><Zap size={16}/> Launch Campaign</button>
          </div>

          <div className="ae-action-card">
            <div className="ae-action-header">
              <h3>Monash Orientation QR Push</h3>
              <p>Deploy digital QR assets to Monash student portals to drive direct app installs.</p>
            </div>
            <div className="ae-action-stats">
              <div className="ae-astat">
                <span className="ae-astat-lbl">Est. Uplift</span>
                <span className="ae-astat-val text-success">+12%</span>
              </div>
              <div className="ae-astat">
                <span className="ae-astat-lbl">Target Cohort</span>
                <span className="ae-astat-val">Monash (42%)</span>
              </div>
            </div>
            <button className="ae-btn-primary" style={{background: '#38B6FF'}}><ArrowRightCircle size={16}/> View Assets</button>
          </div>

          <div className="ae-action-card">
            <div className="ae-action-header">
              <h3>First-Login Rewards Promo</h3>
              <p>Offer 500 Health Points immediately upon successful app registration.</p>
            </div>
            <div className="ae-action-stats">
              <div className="ae-astat">
                <span className="ae-astat-lbl">Est. Uplift</span>
                <span className="ae-astat-val text-success">+22%</span>
              </div>
              <div className="ae-astat">
                <span className="ae-astat-lbl">Rev Impact</span>
                <span className="ae-astat-val">$840k</span>
              </div>
            </div>
            <button className="ae-btn-primary" style={{background: '#4ADE80', color: '#000'}}><Target size={16}/> Execute Workflow</button>
          </div>

        </div>
      </section>

      {/* 6. SMART WORKFLOW PREVIEW */}
      <section className="ae-section">
        <div className="ae-section-title"><Users size={20} /> Automation Flow Designer</div>
        <div className="ae-glass-card">
          <p className="text-muted mb-24">Previewing active workflow: "Inactivity Recovery (0-14 Days)"</p>
          <div className="ae-workflow-canvas">
            
            <div className="ae-wf-node trigger">
              <CheckCircle2 size={18} color="#8B5CF6" />
              <span>OSHC Purchased</span>
            </div>
            
            <ArrowRight className="ae-wf-arrow" />
            
            <div className="ae-wf-node trigger">
              <AlertTriangle size={18} color="#F5B544" />
              <span>App NOT downloaded (14d)</span>
            </div>

            <ArrowRight className="ae-wf-arrow" />

            <div className="ae-wf-node action">
              <Mail size={18} color="#38B6FF" />
              <span>Send Email sequence</span>
            </div>

            <ArrowRight className="ae-wf-arrow" />

            <div className="ae-wf-node action">
              <MessageSquare size={18} color="#4ADE80" />
              <span>Trigger WhatsApp nudge</span>
            </div>

          </div>
        </div>
      </section>

      {/* 7. OPPORTUNITY MATRIX */}
      <section className="ae-section">
        <div className="ae-section-title"><Target size={20} /> Ranked Opportunity Matrix</div>
        <div className="ae-glass-card" style={{padding: 0}}>
          <table className="ae-matrix-table">
            <thead>
              <tr>
                <th>Cohort / University</th>
                <th>Adoption Rate</th>
                <th>Users Inactive</th>
                <th>Churn Risk</th>
                <th>Revenue Opportunity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Monash University</strong></td>
                <td>42.1%</td>
                <td>4,820</td>
                <td><span className="ae-heat-cell heat-red">High</span></td>
                <td><strong>$1.2M</strong></td>
              </tr>
              <tr>
                <td><strong>Chinese Nationals (Direct)</strong></td>
                <td>51.3%</td>
                <td>3,100</td>
                <td><span className="ae-heat-cell heat-red">High</span></td>
                <td><strong>$890k</strong></td>
              </tr>
              <tr>
                <td><strong>RMIT University</strong></td>
                <td>71.0%</td>
                <td>1,850</td>
                <td><span className="ae-heat-cell heat-orange">Medium</span></td>
                <td><strong>$450k</strong></td>
              </tr>
              <tr>
                <td><strong>University of Melbourne</strong></td>
                <td>84.5%</td>
                <td>420</td>
                <td><span className="ae-heat-cell heat-green">Low</span></td>
                <td><strong>$120k</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 8. REVENUE IMPACT CALCULATOR & 9. AI FEED */}
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '64px'}}>
        
        <section>
          <div className="ae-section-title"><DollarSign size={20} /> Strategic Impact Calculator</div>
          <div className="ae-glass-card">
            <div className="ae-rev-flex mb-24">
              <div className="ae-rev-block">
                <span className="ae-rev-lbl">Inactive Users Targeted</span>
                <span className="ae-rev-val">32,000</span>
              </div>
              <div className="ae-rev-block" style={{textAlign: 'right'}}>
                <span className="ae-rev-lbl">Target Conversion Uplift</span>
                <span className="ae-rev-val text-success">12.0%</span>
              </div>
            </div>
            <div className="ae-rev-block" style={{borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px'}}>
              <span className="ae-rev-lbl">Estimated Additional Revenue (ARR)</span>
              <span className="ae-rev-total">$11.5M</span>
            </div>
          </div>
        </section>

        <section>
          <div className="ae-section-title"><Bot size={20} /> Live AI Insights Feed</div>
          <div className="ae-ai-feed">
            <div className="ae-ai-msg">
              <Sparkles size={16} style={{flexShrink: 0, marginTop: '2px'}}/>
              <p><strong>Insight:</strong> Students from Monash respond 31% better to webinar-based onboarding vs standard email sequences.</p>
            </div>
            <div className="ae-ai-msg" style={{borderColor: '#38B6FF', background: 'rgba(56,182,255,0.05)'}}>
              <Sparkles size={16} color="#38B6FF" style={{flexShrink: 0, marginTop: '2px'}}/>
              <p><strong>Observation:</strong> Users who complete the "Journey Setup" within their first 7 days convert to OVHC at a 2.4x higher rate.</p>
            </div>
          </div>
        </section>

      </div>

    </div>
  );
};

export default ActivationEngine;
