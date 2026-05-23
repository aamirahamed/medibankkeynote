// Mock Data for the Admin Engine

export const metrics = {
  totalOshc: 12450,
  conversionRate: 14.2,
  atRisk: 840,
  graduatingSoon: 2100
};

export const todaysPriorities = [
  { id: 1, title: '2,100 students nearing expiry', type: 'urgent', insight: 'Immediate action required to prevent churn to competitors.', action: 'Push OVHC Offer' },
  { id: 2, title: '840 at-risk users identified', type: 'warning', insight: 'Engagement dropped significantly in the last 7 days.', action: 'Trigger Re-engagement' },
  { id: 3, title: 'High engagement cohort spike', type: 'opportunity', insight: '300 users actively exploring health content.', action: 'Send Nudge' }
];

export const nextBestActions = [
  { 
    id: 1, 
    title: 'Launch "Graduation Ready" Push', 
    target: '2,100 graduating students', 
    impact: '+3.2% Conversion Lift', 
    impactValue: '+$240K',
    priority: 'High', 
    confidence: '91%',
    agent: 'Conversion Agent',
    reasoning: 'Students repeatedly explored OVHC pricing and attended visa webinars.', 
    actionText: 'Review Recommendation' 
  },
  { 
    id: 2, 
    title: 'Deploy WhatsApp Onboarding Sequence', 
    target: '840 at-risk users', 
    impact: '+18% Activation', 
    impactValue: '+$180K',
    priority: 'High', 
    confidence: '94%',
    agent: 'Activation Agent',
    reasoning: 'OTP verification failures impacting onboarding performance. WhatsApp outperforming email by 24%.', 
    actionText: 'Review & Approve' 
  },
  { 
    id: 3, 
    title: 'Invite to "Navigating Healthcare" Webinar', 
    target: 'New Arrivals Cohort', 
    impact: '+15% Engagement', 
    impactValue: 'LTV Boost',
    priority: 'Medium', 
    confidence: '88%',
    agent: 'Community Agent',
    reasoning: 'Students participating in community groups explore OVHC earlier.', 
    actionText: 'Review Recommendation' 
  }
];

export const behaviourInsights = [
  { id: 1, metric: 'App Engagement', trend: '+12%', context: 'Driven by new rewards program' },
  { id: 2, metric: 'OVHC Page Views', trend: '+45%', context: 'Spike from Indian student cohort' },
  { id: 3, metric: 'Funnel Drop-off', trend: '-8%', context: 'Checkout flow improvements working' }
];

export const momentTracker = {
  exploringPlans: 124,
  inCheckout: 18,
  recentDropoffs: 42
};

export const studentSegments = [
  {
    id: 1,
    name: 'High-Intent OVHC Explorers',
    description: 'Highly active students exploring pricing and options.',
    generatedBy: 'Segmentation Agent',
    category: 'opportunity',
    count: 3450,
    revenueOpp: '+$2.1M',
    conversionPotential: 'High',
    trend: '+12%',
    trendDirection: 'positive',
    why: 'Users in this segment repeatedly explored OVHC pricing and participated in visa-related events.',
    signals: ['3+ OVHC page views', 'Visa webinar attendance', 'Active > 4x per week'],
    confidence: '94%',
    contributingAgents: ['Segmentation Agent', 'Conversion Agent'],
    recommendedActions: [
      { title: 'Trigger graduate transition campaign', impact: '+$180K', agent: 'Conversion Agent' }
    ],
    reviewDetails: {
      deepInsights: [
        '55% of this cohort are RMIT postgraduate nursing students.',
        'Highest exploration occurs on the "Compare Plans" step between 8 PM and 10 PM.',
        'Majority are accessing via iOS devices and checking rewards concurrently.'
      ],
      agentLogs: [
        { agent: 'Segmentation Agent', action: 'Clustered 3,450 users based on high weekly activity and visa status.', time: '2h ago' },
        { agent: 'Conversion Agent', action: 'Scored propensity to convert at 82% based on pricing page dwell time.', time: '1h ago' },
        { agent: 'Campaign Optimisation Agent', action: 'Determined in-app notifications outperform email by 3x for this cohort.', time: '30m ago' }
      ],
      projectedImpact: { metric: 'Conversion Rate', current: '4.2%', projected: '7.4%', timeframe: 'Next 14 Days' },
      executionSteps: [
        { step: 1, desc: 'Draft "Graduate Transition" in-app offer', status: 'ready' },
        { step: 2, desc: 'Target 3,450 users via iOS push', status: 'pending' },
        { step: 3, desc: 'Monitor conversion vs control group', status: 'pending' }
      ]
    }
  },
  {
    id: 2,
    name: 'Silent Churn Risk Cohort',
    description: 'Inactive users showing dropping engagement signals.',
    generatedBy: 'Retention Risk Agent',
    category: 'critical',
    count: 840,
    revenueOpp: '-$420K Risk',
    conversionPotential: 'Low',
    trend: '-5%',
    trendDirection: 'negative',
    why: 'Engagement dropped sharply after 30 days. Consistent ignoring of push notifications.',
    signals: ['0 logins in 14 days', 'Unread notifications > 5', 'Completed onboarding'],
    confidence: '88%',
    contributingAgents: ['Retention Risk Agent', 'Activation Agent'],
    recommendedActions: [
      { title: 'Deploy WhatsApp re-engagement sequence', impact: 'Recover 200 users', agent: 'Campaign Optimisation Agent' }
    ],
    reviewDetails: {
      deepInsights: [
        'Engagement drops sharply exactly 30 days after arrival in Australia.',
        'Push notification open rates are below 5% for this specific group.',
        'Most users in this cohort haven\'t completed their Medibank profile.'
      ],
      agentLogs: [
        { agent: 'Retention Risk Agent', action: 'Identified 840 users with dropping engagement signals over 14 days.', time: '5h ago' },
        { agent: 'Activation Agent', action: 'Correlated drop-off with incomplete profiles and unread notifications.', time: '4h ago' },
        { agent: 'Campaign Optimisation Agent', action: 'Recommended WhatsApp sequence to bypass ignored push notifications.', time: '3h ago' }
      ],
      projectedImpact: { metric: 'Re-activation Rate', current: '1.8%', projected: '12.5%', timeframe: 'Next 7 Days' },
      executionSteps: [
        { step: 1, desc: 'Generate personalized WhatsApp templates', status: 'ready' },
        { step: 2, desc: 'Deploy sequence to 840 users', status: 'pending' },
        { step: 3, desc: 'Track profile completion events', status: 'pending' }
      ]
    }
  },
  {
    id: 3,
    name: 'Community Ambassadors',
    description: 'Highly active in forums, driving peer referrals.',
    generatedBy: 'Referral Agent',
    category: 'growth',
    count: 450,
    revenueOpp: 'High LTV',
    conversionPotential: 'High',
    trend: '+18%',
    trendDirection: 'positive',
    why: 'Consistently answering forum questions and sharing referral links with peers.',
    signals: ['10+ forum posts', '3+ successful referrals', 'High MediGuide usage'],
    confidence: '96%',
    contributingAgents: ['Referral Agent', 'Community Agent'],
    recommendedActions: [
      { title: 'Grant "Community Ambassador" status', impact: '+35% referrals', agent: 'Referral Agent' }
    ],
    reviewDetails: {
      deepInsights: [
        'Generates 3x more referrals than average users.',
        'Often answers questions in the "Navigating Healthcare" forum.',
        'Highly responsive to gamification and point-based rewards.'
      ],
      agentLogs: [
        { agent: 'Referral Agent', action: 'Tracked a 38% increase in successful referrals from this cohort.', time: '1d ago' },
        { agent: 'Community Agent', action: 'Identified top 10% most active forum posters.', time: '20h ago' },
        { agent: 'Campaign Optimisation Agent', action: 'Suggested "Ambassador Status" badge to incentivize further sharing.', time: '18h ago' }
      ],
      projectedImpact: { metric: 'Referral Volume', current: '120/mo', projected: '250/mo', timeframe: 'Next 30 Days' },
      executionSteps: [
        { step: 1, desc: 'Create "Community Ambassador" badge', status: 'ready' },
        { step: 2, desc: 'Send exclusive event invitations to 450 users', status: 'pending' },
        { step: 3, desc: 'Increase referral bonus by 1.5x for this cohort', status: 'pending' }
      ]
    }
  },
  {
    id: 4,
    name: 'Activation Bottleneck Cohort',
    description: 'Users who dropped off during OTP verification.',
    generatedBy: 'Activation Agent',
    category: 'critical',
    count: 1200,
    revenueOpp: 'Blocked Value',
    conversionPotential: 'Medium',
    trend: '+8%',
    trendDirection: 'negative',
    why: 'High failure rate during international phone verification step.',
    signals: ['Failed OTP 2+ times', 'Abandoned at step 2', 'App deleted within 24h'],
    confidence: '92%',
    contributingAgents: ['Activation Agent', 'Segmentation Agent'],
    recommendedActions: [
      { title: 'Switch to email verification fallback', impact: '+12% activation', agent: 'Activation Agent' }
    ],
    reviewDetails: {
      deepInsights: [
        'High failure rate during international phone verification step.',
        '60% of failures are from users with Indian country codes.',
        'Users abandoning at this step rarely return without intervention.'
      ],
      agentLogs: [
        { agent: 'Activation Agent', action: 'Flagged 1,200 users stuck at OTP verification step 2.', time: '3h ago' },
        { agent: 'Segmentation Agent', action: 'Identified correlation with specific international country codes.', time: '2h ago' },
        { agent: 'Campaign Optimisation Agent', action: 'Recommended immediate switch to email verification fallback.', time: '1h ago' }
      ],
      projectedImpact: { metric: 'Activation Rate', current: '68%', projected: '80%', timeframe: 'Immediate' },
      executionSteps: [
        { step: 1, desc: 'Enable email verification fallback routing', status: 'ready' },
        { step: 2, desc: 'Send recovery email to 1,200 stuck users', status: 'pending' },
        { step: 3, desc: 'Monitor step 2 completion rates', status: 'pending' }
      ]
    }
  }
];

export const activeCampaigns = [
  { id: 1, name: 'Graduation Prep Nudge', channel: 'In-App', conversion: '8.4%', uplift: '+2.1%', revenue: '+$142k', status: 'Active' },
  { id: 2, name: 'Welcome to Australia', channel: 'Push', conversion: '12.1%', uplift: '+1.5%', revenue: '--', status: 'Active' },
  { id: 3, name: 'Visa Expiring Soon', channel: 'Email', conversion: '15.2%', uplift: '+4.8%', revenue: '+$315k', status: 'Active' }
];

export const funnelData = [
  { name: 'Eligible', value: 10000 },
  { name: 'Saw Nudge', value: 7500 },
  { name: 'Clicked', value: 4200 },
  { name: 'Viewed Plans', value: 2800 },
  { name: 'Started Checkout', value: 1500 },
  { name: 'Converted', value: 1420 }
];

export const recentActivity = [
  { id: 1, user: 'Student #4921', action: 'Viewed OVHC Plans', time: '2 mins ago' },
  { id: 2, user: 'Student #1103', action: 'Completed "First 30 Days" Journey', time: '15 mins ago' },
  { id: 3, user: 'Segment "At Risk"', action: 'Automated re-engagement push sent', time: '1 hr ago' },
  { id: 4, user: 'Student #8822', action: 'Converted to OVHC', time: '2 hrs ago' }
];

// --- NEW AI AGENT DATA ---

export const aiBriefing = {
  narrative: [
    "4 lifecycle moments triggered today — 3,240 graduating students represent your highest near-term OVHC conversion opportunity.",
    "Silent Disengagement risk across 1,200 inactive users threatens $85K in projected revenue if not intervened within 48 hours.",
    "127 students crossed the Ambassador Ready threshold, activating a high-LTV upstream referral lever."
  ],
  momentCount: 4,
  pendingDecisions: 3,
  revenueOpportunity: "+$265K",
  highestRisk: "Silent Disengagement · 1,200 students",
  confidence: "92%"
};

export const aiFeed = [
  { id: 1, agent: 'Segmentation Agent', insight: 'Detected high-intent graduate cohort from RMIT.', impact: '+$120K opportunity', confidence: '88%', time: 'Just now' },
  { id: 2, agent: 'Referral Agent', insight: 'Ambassador activity increased 38% this week.', impact: 'High growth', confidence: '96%', time: '12m ago' },
  { id: 3, agent: 'Retention Risk Agent', insight: 'Silent churn risk detected among inactive students.', impact: '-$80K risk', confidence: '82%', time: '1h ago' },
  { id: 4, agent: 'Campaign Optimisation Agent', insight: 'WhatsApp onboarding sequence outperforming email by 24%.', impact: '+18% activation', confidence: '94%', time: '2h ago' }
];

export const approvalWorkflows = [
  { id: 1, action: 'Launch WhatsApp onboarding sequence', impact: '+18% activation uplift', agent: 'Activation Agent', status: 'Awaiting Review' },
  { id: 2, action: 'Trigger Monash Graduate Transition Campaign', impact: '+3.2% conversion uplift', agent: 'Conversion Agent', status: 'Awaiting Review' }
];

export const revenueImpactMetrics = {
  identifiedToday: '+$420K',
  referralProjected: '$1.2M',
  recoverableChurn: '$180K',
  conversionImprovement: '+2.4%'
};

export const agentCollaborationFlow = [
  { id: 1, agent: 'Segmentation Agent',        layer: 'Detection',     action: 'Detected 3,240 students entering the graduation approach window based on visa and enrollment signals.' },
  { id: 2, agent: 'Conversion Agent',           layer: 'Intelligence',  action: 'Scored 82% OVHC conversion probability — above the 34% baseline — based on pricing page behaviour.' },
  { id: 3, agent: 'Visa Transition Intent Agent',layer: 'Intelligence',  action: 'Confirmed 94% post-study stay intent based on graduate visa content engagement signals.' },
  { id: 4, agent: 'Campaign Optimisation Agent', layer: 'Orchestration', action: 'Recommended Email + In-App channel mix, delivering 3.1x higher engagement for this demographic.' },
  { id: 5, agent: 'Insight Narrator Agent',      layer: 'Orchestration', action: 'Packaged executive brief with $180K revenue opportunity estimate for human review.' }
];

export const executiveSummary = "Referral-led engagement continues to outperform traditional acquisition channels, while graduate transition cohorts remain the strongest near-term conversion opportunity. Overall system conversion tracking above target, offset by activation drop-offs needing intervention.";

// --- NEW SEGMENTATION AGENT DATA ---

export const segmentHero = {
  title: "Emerging High-Intent Cohort Detected",
  insight: "RMIT postgraduate students nearing graduation who attended healthcare webinars are showing 2.1x higher OVHC exploration behaviour.",
  revenueOpp: "+$420K",
  size: "3,240 students",
  conversionProb: "82%",
  confidence: "91%",
  agent: "Segmentation Agent",
  reviewDetails: {
    deepInsights: [
      'Webinar attendees spend 3x longer on the "Compare Plans" page than the average user.',
      '90% of this cohort will see their current student visa expire within 90 days.',
      'Significant overlap detected with high MediGuide interaction rates.'
    ],
    agentLogs: [
      { agent: 'Segmentation Agent', action: 'Correlated university CRM data with recent webinar attendance logs.', time: '12h ago' },
      { agent: 'Community Agent', action: 'Flagged a spike in visa-related forum questions from this specific group.', time: '8h ago' },
      { agent: 'Conversion Agent', action: 'Calculated an 82% propensity to convert if presented with an exclusive post-graduate offer.', time: '2h ago' }
    ],
    projectedImpact: { metric: 'Revenue Opportunity', current: '$0', projected: '+$420K', timeframe: 'Next 30 Days' },
    executionSteps: [
      { step: 1, desc: 'Generate "RMIT Graduate Exclusive" pricing tier', status: 'ready' },
      { step: 2, desc: 'Draft multi-channel campaign (Email + In-App)', status: 'ready' },
      { step: 3, desc: 'Deploy to 3,240 identified students', status: 'pending' }
    ]
  }
};

export const segmentEvolution = [
  { metric: "High-intent OVHC explorers", trend: "+22%", status: "growing" },
  { metric: "Community ambassadors", trend: "+18%", status: "growing" },
  { metric: "Silent churn risk users", trend: "-12%", status: "reducing" },
  { metric: "Activation drop-offs", trend: "+8%", status: "alert" }
];

export const behaviouralClusters = [
  { id: 'A', name: 'Cluster A: The Explorers', traits: ['Frequent MediGuide usage', 'High community activity', 'Strong OVHC intent'], size: '45%' },
  { id: 'B', name: 'Cluster B: The Disengaged', traits: ['Inactive after onboarding', 'No community engagement', 'High churn risk'], size: '20%' },
  { id: 'C', name: 'Cluster C: The Advocates', traits: ['Strong referral behaviour', 'High content sharing', 'Ambassador potential'], size: '35%' }
];

export const microSegments = [
  { insight: "Students attending visa webinars AND engaging with referral rewards convert 38% higher.", agent: "Conversion Agent" },
  { insight: "Users participating in community events show OVHC exploration 4 weeks earlier than average.", agent: "Community Agent" }
];

export const segmentActions = [
  { id: 1, recommendation: "Launch RMIT graduate transition campaign", impact: "+$240K", confidence: "91%", agent: "Conversion Agent" },
  { id: 2, recommendation: "Reward Monash ambassadors", impact: "+18% referrals", confidence: "96%", agent: "Referral Agent" },
  { id: 3, recommendation: "Push onboarding recovery sequence", impact: "Recover 6,200 users", confidence: "88%", agent: "Activation Agent" }
];

export const segmentSummaryStr = "Behaviour-driven segmentation indicates graduating students participating in community engagement and healthcare education content show the strongest OVHC conversion readiness. Prioritise RMIT and Monash transition campaigns to capture emerging intent.";

// --- LIFECYCLE MOMENTS ---

export const lifecycleMoments = [
  {
    id: 'graduation-approach',
    name: 'Graduation Approach',
    description: 'OSHC expiry < 6 months',
    triggered: true,
    count: 3240,
    severity: 'opportunity',
    detectionAgent: 'Segmentation Agent'
  },
  {
    id: 'ovhc-high-intent',
    name: 'OVHC High Intent',
    description: 'OVHC pricing viewed 3+ times',
    triggered: true,
    count: 847,
    severity: 'opportunity',
    detectionAgent: 'Conversion Agent'
  },
  {
    id: 'silent-disengagement',
    name: 'Silent Disengagement',
    description: 'Inactive 14+ days',
    triggered: true,
    count: 1200,
    severity: 'critical',
    detectionAgent: 'Retention Risk Agent'
  },
  {
    id: 'new-arrival-dropoff',
    name: 'New Arrival Drop-off',
    description: 'Downloaded, not activated',
    triggered: false,
    count: 0,
    severity: 'critical',
    detectionAgent: 'Activation Agent'
  },
  {
    id: 'ambassador-ready',
    name: 'Ambassador Ready',
    description: '3+ successful referrals',
    triggered: true,
    count: 127,
    severity: 'growth',
    detectionAgent: 'Referral Agent'
  },
  {
    id: 'community-conversion',
    name: 'Community Conversion Signal',
    description: 'Webinar + OVHC within 48hrs',
    triggered: false,
    count: 0,
    severity: 'opportunity',
    detectionAgent: 'Community Agent'
  }
];

export const decisionHistory = [
  { id: 1, workflow: 'Winter Graduation Campaign', moment: 'Graduation Approach', decision: 'Approved', outcome: '+2.8% conversion lift', impact: '+$142K generated', date: 'May 12', approvedBy: 'S. Kumar' },
  { id: 2, workflow: '30-Day Re-engagement Push', moment: 'Silent Disengagement', decision: 'Modified & Approved', outcome: '+9.4% re-activation rate', impact: 'Recovered 340 users', date: 'May 8', approvedBy: 'J. Lin' },
  { id: 3, workflow: 'Autumn Ambassador Tier', moment: 'Ambassador Ready', decision: 'Approved', outcome: '+28% referral volume', impact: 'High LTV uplift', date: 'May 3', approvedBy: 'S. Kumar' }
];

// --- ACTION STUDIO MOCK DATA ---

export const actionHero = {
  title: "Recommended High-Impact Intervention",
  action: "Launch a graduate transition sequence for Monash postgraduate students engaging with OVHC pricing content.",
  uplift: "+3.2%",
  revenue: "+$240K",
  size: "8,200 users",
  confidence: "91%",
  agents: ['Conversion Agent', 'Campaign Optimisation Agent', 'Referral Agent', 'Retention Risk Agent']
};

export const aiWorkflows = [
  {
    id: 1,
    name: 'Graduate Transition Sequence',
    triggeredBy: 'graduation-approach',
    why: 'Students repeatedly explored OVHC pricing and attended visa-related webinars.',
    agents: ['Conversion Agent', 'Segmentation Agent'],
    audience: 'Final-year RMIT & Monash students',
    channels: 'Email + In-App',
    timing: '45 days before expiry',
    impact: { uplift: '+12% conversion', revenue: '+$180K' },
    confidence: '94%',
    triggerCondition: "Visa Expiry < 45 days AND Page Views include 'Pricing'",
    messageTitle: 'Exclusive Graduate Offer',
    messageBody: "Congratulations on nearing graduation! Transition to our exclusive graduate OVHC tier today and get 2 months free.",
    riskOfInaction: 'An estimated 15% of this cohort will lapse to a competitor if no intervention is made within 30 days. Students who miss the graduation approach window are 3x harder to re-engage post-expiry.',
    signalChain: [
      { signal: '3,240 students detected within the 6-month graduation window', agent: 'Segmentation Agent', weight: 'Primary' },
      { signal: 'Average OVHC page views at 4.2 per session — 3.1x above baseline', agent: 'Conversion Agent', weight: 'Strong' },
      { signal: 'Email + In-App delivers highest engagement for this demographic', agent: 'Campaign Optimisation Agent', weight: 'Supporting' }
    ],
    agentCollaboration: [
      { agent: 'Segmentation Agent', layer: 'Detection', action: 'Detected 3,240 students entering the 6-month graduation window based on visa expiry and enrollment signals.', time: '3h ago' },
      { agent: 'Conversion Agent', layer: 'Intelligence', action: 'Scored OVHC conversion probability at 82% — above the 34% baseline — based on pricing page dwell time and repeat visits.', time: '2h ago' },
      { agent: 'Visa Transition Intent Agent', layer: 'Intelligence', action: 'Confirmed 94% of this cohort engaged with graduate visa content, indicating strong intent to remain in Australia post-study.', time: '2h ago' },
      { agent: 'Campaign Optimisation Agent', layer: 'Orchestration', action: 'Recommended Email + In-App channel mix based on 3.1x higher engagement for this demographic vs. WhatsApp.', time: '1h ago' },
      { agent: 'Insight Narrator Agent', layer: 'Orchestration', action: 'Packaged full intervention brief with projected $180K revenue impact for human review.', time: '30m ago' }
    ]
  },
  {
    id: 2,
    name: 'Silent Churn Re-engagement',
    triggeredBy: 'silent-disengagement',
    why: 'High drop-off detected after 14 days of inactivity, correlated with incomplete profiles.',
    agents: ['Retention Risk Agent', 'Campaign Optimisation Agent'],
    audience: 'Inactive new arrivals (14+ days)',
    channels: 'WhatsApp',
    timing: 'Immediately',
    impact: { uplift: 'Recover 400 users', revenue: 'Mitigate -$85K risk' },
    confidence: '88%',
    triggerCondition: "Inactivity > 14 days AND Profile Status is 'Incomplete'",
    messageTitle: 'Complete your Medibank Profile',
    messageBody: "Hey! We noticed you haven't finished setting up your profile. Complete it today to unlock your full health cover benefits.",
    riskOfInaction: 'Students inactive beyond 45 days have an 80% probability of failing to convert to OVHC. Delaying this intervention by 7 days reduces projected re-engagement by an estimated 35%.',
    signalChain: [
      { signal: '1,200 students showing zero app sessions in the past 14 days', agent: 'Retention Risk Agent', weight: 'Primary' },
      { signal: '80% of silent users have incomplete profiles — primary disengagement predictor', agent: 'Activation Agent', weight: 'Strong' },
      { signal: 'WhatsApp bypasses ignored push notifications — 4.2x higher open rate', agent: 'Campaign Optimisation Agent', weight: 'Supporting' }
    ],
    agentCollaboration: [
      { agent: 'Retention Risk Agent', layer: 'Detection', action: 'Flagged 1,200 users with zero app sessions across a 14-day window, crossing the critical disengagement threshold.', time: '5h ago' },
      { agent: 'Activation Agent', layer: 'Intelligence', action: 'Correlated inactivity with incomplete profiles (80% overlap) — identified as the primary friction point blocking re-engagement.', time: '4h ago' },
      { agent: 'Campaign Optimisation Agent', layer: 'Orchestration', action: 'Determined WhatsApp outperforms push 4.2x for this profile due to notification fatigue. Recommended immediate deployment.', time: '3h ago' },
      { agent: 'Insight Narrator Agent', layer: 'Orchestration', action: 'Estimated $85K churn risk mitigation and packaged recovery brief for human review.', time: '2h ago' }
    ]
  },
  {
    id: 3,
    name: 'Referral Ambassador Activation',
    triggeredBy: 'ambassador-ready',
    why: 'Referral momentum increased among active community members crossing the 3-referral threshold.',
    agents: ['Referral Agent', 'Community Agent'],
    audience: 'High-referral community members',
    channels: 'Push Notification',
    timing: 'After 3rd successful referral',
    impact: { uplift: '+35% referral volume', revenue: 'High LTV' },
    confidence: '96%',
    triggerCondition: 'Successful Referrals >= 3 AND Community Activity Score > 70',
    messageTitle: "You've unlocked Ambassador Status!",
    messageBody: "Thanks for sharing Medibank! You've been upgraded to Ambassador status. Your next referral will earn you double rewards.",
    riskOfInaction: 'Ambassador momentum peaks within 7 days of the 3rd referral. Missing this window reduces subsequent referral probability by 40%. Referred students convert at 2.6x the baseline rate.',
    signalChain: [
      { signal: '127 students completed 3+ successful referrals within a 14-day window', agent: 'Referral Agent', weight: 'Primary' },
      { signal: 'Cohort shows 3x more forum activity than average — strong influence signal', agent: 'Community Agent', weight: 'Strong' },
      { signal: 'Push open rates at 94% for users who recently completed a referral action', agent: 'Campaign Optimisation Agent', weight: 'Supporting' }
    ],
    agentCollaboration: [
      { agent: 'Referral Agent', layer: 'Detection', action: 'Identified 127 users crossing the 3-referral threshold within a 14-day window, activating the ambassador eligibility trigger.', time: '1d ago' },
      { agent: 'Community Agent', layer: 'Intelligence', action: 'Confirmed these users show 3x higher forum activity, identifying them as strong community influencers with network amplification potential.', time: '20h ago' },
      { agent: 'Referral Agent', layer: 'Intelligence', action: 'Calculated ambassador status increases subsequent referral volume by 35% based on prior cohort performance data.', time: '18h ago' },
      { agent: 'Campaign Optimisation Agent', layer: 'Orchestration', action: 'Recommended push notification — 94% open rate for recent-referral users — as the highest-impact delivery channel.', time: '16h ago' },
      { agent: 'Insight Narrator Agent', layer: 'Orchestration', action: 'Packaged ambassador activation brief with LTV projections and referral multiplication estimates.', time: '14h ago' }
    ]
  }
];

export const crossAgentFlow = [
  { agent: "Segmentation Agent", action: "Identified high-intent graduate cohort based on webinar logs" },
  { agent: "Conversion Agent", action: "Predicted 82% OVHC likelihood" },
  { agent: "Campaign Optimisation Agent", action: "Recommended WhatsApp outreach for highest open rate" },
  { agent: "Referral Agent", action: "Injected ambassador activation logic for post-purchase" }
];

export const performanceIntelligence = [
  { insight: "Graduate onboarding workflow increased OVHC exploration by 18%.", confidence: "94%", impact: "High" },
  { insight: "Referral ambassador sequence generated strongest engagement at Monash.", confidence: "89%", impact: "Medium" },
  { insight: "Push notifications outperform email for onboarding recovery by 2.4x.", confidence: "98%", impact: "High" }
];

export const optimisationRecommendations = [
  { title: "Shift onboarding communication to WhatsApp", why: "Email open rates for new arrivals have dropped below 15%.", projected: "+22% engagement", impact: "+$45K" },
  { title: "Add webinar CTA inside referral flows", why: "Users referring peers are 3x more likely to attend educational events.", projected: "+15% attendance", impact: "High LTV" }
];

export const approvalQueue = [
  { id: 1, name: "Graduate Referral Campaign", status: "Awaiting Approval", impact: "+$180K" },
  { id: 2, name: "Onboarding Recovery Flow", status: "Awaiting Review", impact: "Recover 1,200 users" }
];

export const actionSummaryStr = "Behaviour-driven intervention workflows targeting graduating students and referral ambassadors continue to generate the strongest projected conversion uplift opportunities. 2 high-impact workflows await human approval.";

// --- CONVERSION FUNNEL ---

export const conversionFunnelStages = [
  {
    id: 1,
    name: 'OVHC Eligible',
    description: 'Students within 12 months of OSHC expiry',
    count: 10000,
    dropOff: 0,
    dropOffPct: 0,
    dropOffRevenue: null,
    severity: 'neutral',
    agentName: 'Segmentation Agent',
    agentLayer: 'Detection',
    agentInsight: '10,000 students identified as OVHC-eligible based on visa expiry and enrollment signals. 3,240 are in the highest-urgency graduation window.',
    recommendation: null,
    lifecycleMoment: 'graduation-approach'
  },
  {
    id: 2,
    name: 'Nudge Received',
    description: 'Students reached by at least one OVHC communication',
    count: 7500,
    dropOff: 2500,
    dropOffPct: 25,
    dropOffRevenue: '$85K',
    severity: 'warning',
    agentName: 'Campaign Optimisation Agent',
    agentLayer: 'Orchestration',
    agentInsight: '2,500 eligible students are unreachable via current channel mix. Push notification open rates below 8% for students inactive 7+ days.',
    recommendation: 'Expand to WhatsApp for the unreached cohort — 4.2× higher open rate for inactive users.',
    lifecycleMoment: 'silent-disengagement'
  },
  {
    id: 3,
    name: 'Clicked Through',
    description: 'Students who engaged with the OVHC offer',
    count: 4200,
    dropOff: 3300,
    dropOffPct: 44,
    dropOffRevenue: '$142K',
    severity: 'critical',
    agentName: 'Conversion Agent',
    agentLayer: 'Intelligence',
    agentInsight: 'Largest single drop-off in the funnel. Generic messaging is not resonating — university-specific cohorts respond 2.1× better to tailored offers.',
    recommendation: 'Personalise by university cohort. RMIT postgrads respond to graduate visa framing; Monash students respond to cost-comparison framing.',
    lifecycleMoment: 'ovhc-high-intent'
  },
  {
    id: 4,
    name: 'Viewed Plans',
    description: 'Students who explored OVHC plan options',
    count: 2800,
    dropOff: 1400,
    dropOffPct: 33,
    dropOffRevenue: '$60K',
    severity: 'warning',
    agentName: 'Segmentation Agent',
    agentLayer: 'Detection',
    agentInsight: 'Students spending less than 45 seconds on the plan comparison page. Pricing complexity is causing premature abandonment before a plan is selected.',
    recommendation: 'Introduce a graduate-specific pricing tier to simplify the decision. Students in this cohort are 2.4× more likely to convert with a pre-selected plan.',
    lifecycleMoment: 'ovhc-high-intent'
  },
  {
    id: 5,
    name: 'Started Checkout',
    description: 'Students who began the OVHC purchase flow',
    count: 1500,
    dropOff: 1300,
    dropOffPct: 46,
    dropOffRevenue: '$56K',
    severity: 'critical',
    agentName: 'Retention Risk Agent',
    agentLayer: 'Detection',
    agentInsight: "Checkout abandonment spikes for students who spent under 3 minutes on plan comparison — they haven't committed to a plan before entering checkout.",
    recommendation: 'Trigger a MediGuide AI prompt at the plan comparison step. Students who interact with MediGuide before checkout convert at 3.1× the baseline rate.',
    lifecycleMoment: 'silent-disengagement'
  },
  {
    id: 6,
    name: 'Converted to OVHC',
    description: 'Students who successfully purchased an OVHC plan',
    count: 1420,
    dropOff: 80,
    dropOffPct: 5,
    dropOffRevenue: '$3K',
    severity: 'good',
    agentName: 'Conversion Agent',
    agentLayer: 'Intelligence',
    agentInsight: '5.3% final checkout abandonment — primarily payment method friction. Students exiting at the payment step cite lack of direct debit as a blocker.',
    recommendation: 'Add direct debit as a payment option. Minor product change with outsized conversion impact at this stage.',
    lifecycleMoment: null
  }
];

export const conversionOpportunity = {
  currentRate: 14.2,
  projectedRate: 19.1,
  currentConverted: 1420,
  projectedConverted: 1910,
  additionalStudents: 490,
  additionalRevenue: '$343K',
  confidence: '89%',
  topLever: 'Personalising messaging by university cohort at the click-through stage',
  interventions: [
    { stage: 'Nudge Received', action: 'WhatsApp for unreached cohort', uplift: '+180 students', revenue: '+$85K' },
    { stage: 'Clicked Through', action: 'University-specific messaging', uplift: '+220 students', revenue: '+$142K' },
    { stage: 'Started Checkout', action: 'MediGuide prompt at plan comparison', uplift: '+90 students', revenue: '+$116K' }
  ]
};

// --- AGENT INTELLIGENCE HUB ---

export const agentRoster = [
  {
    id: 'segmentation',
    name: 'Segmentation Agent',
    layer: 'Detection',
    purpose: 'Groups all students into behavioural cohorts daily — surfaces who is ready to convert, who is at risk, and who is an ambassador candidate.',
    aiType: 'ML Clustering',
    status: 'active',
    statusLabel: 'Processing',
    lastAction: 'Detected 3,240 students entering the 6-month graduation window based on visa expiry and enrollment signals.',
    lastActionTime: '3h ago',
    confidence: '91%',
    signalsToday: 4
  },
  {
    id: 'retention-risk',
    name: 'Retention Risk Agent',
    layer: 'Detection',
    purpose: 'Watches for students going quiet before they churn — predicts disengagement 7–10 days before the 14-day inactivity threshold.',
    aiType: 'Predictive ML',
    status: 'active',
    statusLabel: 'Monitoring',
    lastAction: 'Flagged 1,200 students with zero app sessions across a 14-day window — Silent Disengagement triggered.',
    lastActionTime: '5h ago',
    confidence: '88%',
    signalsToday: 1
  },
  {
    id: 'visa-intent',
    name: 'Visa Transition Intent Agent',
    layer: 'Detection',
    purpose: 'Predicts which graduating students intend to stay in Australia post-study — the highest-value OVHC conversion signal in the system.',
    aiType: 'NLP + Scoring',
    status: 'active',
    statusLabel: 'Active',
    lastAction: 'Confirmed 94% post-study stay intent across the RMIT graduation cohort via graduate visa content signals.',
    lastActionTime: '2h ago',
    confidence: '94%',
    signalsToday: 2
  },
  {
    id: 'conversion',
    name: 'Conversion Agent',
    layer: 'Intelligence',
    purpose: 'Scores every student\'s OVHC conversion probability and calculates how much revenue is sitting in each cohort opportunity.',
    aiType: 'Scoring + Gen AI',
    status: 'active',
    statusLabel: 'Active',
    lastAction: 'Scored 82% OVHC conversion probability for 3,240 graduating students — 2.4× above the 34% baseline.',
    lastActionTime: '2h ago',
    confidence: '94%',
    signalsToday: 3
  },
  {
    id: 'activation',
    name: 'Activation Agent',
    layer: 'Intelligence',
    purpose: 'Identifies students stuck in onboarding and routes them to the right recovery path before they abandon permanently.',
    aiType: 'Rules / Logic',
    status: 'monitoring',
    statusLabel: 'Monitoring',
    lastAction: 'Identified 1,200 users blocked at OTP verification — email verification fallback recommended.',
    lastActionTime: '3h ago',
    confidence: '92%',
    signalsToday: 1
  },
  {
    id: 'referral',
    name: 'Referral Agent',
    layer: 'Intelligence',
    purpose: 'Identifies ambassador-ready students the moment they cross the referral threshold and tracks overall referral network momentum.',
    aiType: 'Rules / Logic',
    status: 'active',
    statusLabel: 'Active',
    lastAction: '127 students crossed the 3-referral threshold within 14 days — Ambassador Ready lifecycle moment triggered.',
    lastActionTime: '1d ago',
    confidence: '96%',
    signalsToday: 1
  },
  {
    id: 'community',
    name: 'Community Engagement Agent',
    layer: 'Intelligence',
    purpose: 'Analyses which content, events, and groups are gaining traction — and recommends new initiatives Medibank should run based on emerging student intent.',
    aiType: 'ML + Gen AI',
    status: 'active',
    statusLabel: 'Active',
    lastAction: 'Detected spike in graduate visa forum posts — recommending a new "Graduate Visa & OVHC" webinar initiative.',
    lastActionTime: '1h ago',
    confidence: '87%',
    signalsToday: 2
  },
  {
    id: 'campaign-opt',
    name: 'Campaign Optimisation Agent',
    layer: 'Orchestration',
    purpose: 'Selects the best channel, timing, and message format for every intervention — based on historical performance across each cohort.',
    aiType: 'Scoring + Gen AI',
    status: 'active',
    statusLabel: 'Active',
    lastAction: 'Recommended Email + In-App for the graduate cohort — 3.1× engagement lift vs baseline.',
    lastActionTime: '1h ago',
    confidence: '91%',
    signalsToday: 3
  },
  {
    id: 'narrator',
    name: 'Insight Narrator Agent',
    layer: 'Orchestration',
    purpose: 'Translates all agent outputs into the plain-English morning brief — the only agent that calls an LLM to generate narrative text.',
    aiType: 'Gen AI (LLM)',
    status: 'active',
    statusLabel: 'Active',
    lastAction: 'Generated morning brief — 4 lifecycle moments active, $265K opportunity identified, 3 decisions packaged.',
    lastActionTime: '30m ago',
    confidence: '92%',
    signalsToday: 4
  },
  {
    id: 'copilot',
    name: 'Admin Copilot Agent',
    layer: 'Orchestration',
    purpose: 'Answers admin questions with full system context across all 9 agents — always on, always current, conversational.',
    aiType: 'RAG + Gen AI',
    status: 'on-demand',
    statusLabel: 'On-demand',
    lastAction: 'Full system context loaded — 12,450 students, 10 agents, 4 active lifecycle moments.',
    lastActionTime: 'Live',
    confidence: null,
    signalsToday: null
  }
];

export const activePipelineToday = {
  trigger: 'Graduation Approach',
  name: 'Graduate Transition Sequence',
  description: '3,240 RMIT & Monash students · $180K revenue opportunity',
  steps: [
    { agent: 'Segmentation Agent', layer: 'Detection', status: 'complete', output: 'Identified 3,240 students in graduation window' },
    { agent: 'Conversion Agent', layer: 'Intelligence', status: 'complete', output: 'Scored 82% OVHC conversion probability' },
    { agent: 'Visa Intent Agent', layer: 'Intelligence', status: 'complete', output: 'Confirmed 94% post-study stay intent' },
    { agent: 'Community Agent', layer: 'Intelligence', status: 'complete', output: 'Validated webinar → OVHC conversion signal' },
    { agent: 'Campaign Optimisation', layer: 'Orchestration', status: 'complete', output: 'Email + In-App · 3.1× above baseline' },
    { agent: 'Insight Narrator', layer: 'Orchestration', status: 'complete', output: 'Packaged $180K opportunity brief' },
    { agent: 'Human Decision', layer: null, status: 'pending', output: 'Awaiting approval in Action Studio' }
  ]
};

export const agentActivityLog = [
  { agent: 'Insight Narrator Agent', layer: 'Orchestration', action: 'Generated morning brief — 4 lifecycle moments active, $265K revenue opportunity identified, 3 decisions packaged for review.', time: '30m ago' },
  { agent: 'Community Engagement Agent', layer: 'Intelligence', action: 'Detected 340 forum posts about graduate visa pathways in 48 hours — recommending a new webinar initiative.', time: '1h ago' },
  { agent: 'Campaign Optimisation Agent', layer: 'Orchestration', action: 'Confirmed Email + In-App delivers 3.1× engagement lift for the graduating RMIT cohort vs. WhatsApp baseline.', time: '1h ago' },
  { agent: 'Visa Transition Intent Agent', layer: 'Detection', action: 'Confirmed 94% post-study stay probability across graduating cohort — strong OVHC conversion signal validated.', time: '2h ago' },
  { agent: 'Conversion Agent', layer: 'Intelligence', action: 'Scored OVHC conversion probability at 82% for 3,240 students — 2.4× above the 34% system baseline.', time: '2h ago' },
  { agent: 'Segmentation Agent', layer: 'Detection', action: 'Detected 3,240 students entering the 6-month graduation window — Graduation Approach lifecycle moment triggered.', time: '3h ago' },
  { agent: 'Activation Agent', layer: 'Intelligence', action: 'Flagged 1,200 users stuck at OTP verification step — email fallback recovery path recommended.', time: '3h ago' },
  { agent: 'Retention Risk Agent', layer: 'Detection', action: 'Flagged 1,200 students crossing the 14-day inactivity threshold — Silent Disengagement lifecycle moment triggered.', time: '5h ago' },
  { agent: 'Referral Agent', layer: 'Intelligence', action: '127 students crossed the 3-referral threshold in 14 days — Ambassador Ready lifecycle moment triggered.', time: '1d ago' }
];

// --- ADMIN COPILOT AGENT ---

export const copilotContext = {
  systemSummary: {
    momentCount: 4,
    pendingDecisions: 3,
    revenueOpportunity: '$265K',
    highestRisk: 'Silent Disengagement — 1,200 students inactive 14+ days',
    topOpportunity: 'Graduate Transition — 3,240 students, 82% conversion probability',
  },
  responses: [
    {
      keywords: ['focus', 'today', 'priorit', 'start', 'what should'],
      reply: "Your 3 highest priorities today:\n\n1. **Graduate Transition Sequence** — 3,240 RMIT & Monash students in the conversion window. $180K revenue opportunity. Awaiting your approval in Action Studio.\n\n2. **Silent Disengagement Re-engagement** — 1,200 students inactive 14+ days. $85K at risk. WhatsApp intervention ready. Needs scheduling.\n\n3. **Ambassador Activation** — 127 students crossed the 3-referral threshold. Push notification ready to deploy. High open rate expected."
    },
    {
      keywords: ['graduate', 'graduation', 'rmit', 'monash', 'final year'],
      reply: "The Graduate Transition cohort is your strongest near-term opportunity right now.\n\n**3,240 students** from RMIT and Monash are within 6 months of OSHC expiry. The Conversion Agent scores them at **82% OVHC conversion probability** — more than double the 34% baseline.\n\n94% have engaged with graduate visa content, confirming strong intent to stay in Australia post-study.\n\nRecommended intervention: personalised Email + In-App sequence. Estimated revenue uplift: **$180K**. Waiting for your review in Action Studio."
    },
    {
      keywords: ['churn', 'risk', 'inactive', 'disengaged', 'silent', 'lost'],
      reply: "**1,200 students** have had zero app sessions in the past 14 days — they've crossed the Silent Disengagement threshold.\n\n80% have incomplete profiles, which is the primary friction point. Push notifications are being ignored due to fatigue.\n\nThe Retention Risk Agent recommends a **WhatsApp re-engagement sequence** — 4.2× higher open rate than push for this group.\n\nRisk of waiting: students inactive beyond 45 days have an 80% probability of not converting to OVHC. Revenue at risk: **$85K**."
    },
    {
      keywords: ['revenue', 'opportunity', 'money', 'value', 'dollar', '$'],
      reply: "Today's total revenue opportunity across all active signals:\n\n- **Graduate Transition** → +$180K (94% confidence)\n- **Ambassador Activation** → High LTV multiplier (referred students convert 2.6×)\n- **Silent Disengagement recovery** → Mitigate -$85K risk\n- **OVHC High Intent cohort** → 847 students with 3+ pricing views\n\n**Total identified today: $265K+**\n\nAll three decisions in Action Studio need your approval before anything is actioned."
    },
    {
      keywords: ['campaign', 'performance', 'performing', 'best', 'working'],
      reply: "Most recent campaign performance:\n\n- **Graduation Prep Nudge** (In-App) → 8.4% conversion, +$142K generated\n- **Visa Expiring Soon** (Email) → 15.2% conversion, +$315K generated — your top performer\n- **Welcome to Australia** (Push) → 12.1% conversion, strong onboarding signal\n\nThe Campaign Optimisation Agent notes: Email outperforms push 2× for expiry-related messages. WhatsApp outperforms email for new-arrival onboarding by 24%."
    },
    {
      keywords: ['ambassador', 'referral', 'refer', 'share'],
      reply: "**127 students** crossed the 3-referral threshold in the past 14 days — they're Ambassador-ready.\n\nThis cohort generates **3× more forum activity** than average, making them strong community influencers. Activating Ambassador status is projected to increase referral volume by 35%.\n\nKey stat: students referred by peers convert at **2.6× the baseline rate**. This is the highest-leverage upstream conversion lever in the system.\n\nThe activation push notification is ready in Action Studio. Recommended timing: now — momentum peaks within 7 days of the 3rd referral."
    },
    {
      keywords: ['segment', 'cohort', 'group', 'who are'],
      reply: "Active student segments right now:\n\n- **High-Intent OVHC Explorers** — 3,450 students, +$2.1M long-term opportunity\n- **Silent Churn Risk** — 840 students flagged, -$420K risk exposure\n- **Community Ambassadors** — 450 students, high LTV, referral multiplier active\n- **Activation Bottleneck** — 1,200 students stuck at OTP verification\n\nThe Segmentation Agent refreshes these cohorts every 4 hours. Full details are in the Student Segments page."
    },
    {
      keywords: ['draft', 'message', 'write', 'copy', 'template'],
      reply: "Here's a draft for the Graduate Transition intervention:\n\n---\n**Subject:** Your exclusive graduate health cover offer\n\nCongratulations on approaching graduation! As you prepare for the next chapter, Medibank has an exclusive OVHC plan designed for graduates like you — with 2 months free when you transition before your OSHC expires.\n\n[View Your Graduate Offer →]\n\n---\n\nThis is the template the Campaign Optimisation Agent generated. You can edit it directly in Action Studio before approving."
    },
    {
      keywords: ['how many', 'count', 'number', 'total students'],
      reply: "Current student counts across all active signals:\n\n- Total OSHC students: **12,450**\n- Graduating within 6 months: **3,240**\n- OVHC High Intent (3+ pricing views): **847**\n- Silent / Inactive 14+ days: **1,200**\n- Ambassador-ready: **127**\n- Stuck in onboarding: **1,200**\n\n4 lifecycle moments are active today. New Arrival Drop-off is not currently triggered."
    },
    {
      keywords: ['activation', 'onboard', 'otp', 'verification', 'sign up'],
      reply: "**1,200 students** are stuck at the OTP verification step during onboarding — the primary activation bottleneck.\n\n60% of failures are from users with Indian country codes, where international SMS delivery is unreliable.\n\nThe Activation Agent recommends switching these users to **email verification fallback** immediately. Projected improvement: +12% activation rate.\n\nStudents who abandon at this step rarely return without a targeted recovery message. Full details are in the Activation Engine page."
    },
    {
      keywords: ['community', 'webinar', 'event', 'forum', 'group'],
      reply: "Community engagement signals right now:\n\n- **340 forum posts** about graduate visa pathways in the past 48 hours — a strong emerging concern\n- Students who attend webinars explore OVHC **4 weeks earlier** than the average\n- The Community Conversion Signal trigger fires when a student attends a webinar then views OVHC pricing within 48 hours\n\nThe Community Engagement Agent recommends scheduling a **'Graduate Visa & OVHC' webinar** to capture this intent spike. You can action this in the Community page."
    }
  ],
  fallback: "I don't have a specific answer for that, but here's what's most urgent right now: **3 decisions** are waiting in Action Studio representing **$265K** in revenue opportunity. The Graduate Transition Sequence is your highest priority — 3,240 students, 82% conversion probability."
};

// ── Community & Events ──────────────────────────────────

export const communityStats = {
  activeGroups: 12,
  upcomingEvents: 4,
  totalMembers: 8240,
  aiRecommendations: 3,
  groupGrowthRate: '+12%',
  avgEventAttendance: '68%',
  highestEngagement: 'Indian Students Connect',
  lowestEngagement: 'Engineering Students',
  conversionMultiplier: '2.8×'
};

export const aiCommunityRecommendations = [
  {
    id: 1,
    type: 'event',
    title: 'Graduate Visa Q&A — Open Evening',
    reasoning: '2,340 students in the graduation-approach moment asked MediGuide about graduate visa requirements in the last 30 days. No existing Medibank event covers this topic.',
    targetCohort: 'Graduating students · RMIT, Monash, UniMelb',
    predictedAttendance: 420,
    confidence: '91%',
    lifecycleMoment: 'graduation-approach',
    suggestedDate: 'Nov 5, 2026',
    suggestedType: 'Webinar',
    suggestedDescription: 'Everything graduating students need to know about transitioning from a student visa to a graduate visa — including what happens to your OSHC coverage and how OVHC protects you after graduation.'
  },
  {
    id: 2,
    type: 'group',
    title: 'Nursing & Allied Health Professionals',
    reasoning: '680 students studying nursing and allied health have no dedicated community group. MediGuide query volume for "healthcare worker visa" has increased 34% this month.',
    targetCohort: 'Nursing, Physiotherapy & Allied Health students',
    predictedMembers: 340,
    confidence: '84%',
    lifecycleMoment: 'ovhc-high-intent',
    suggestedType: 'Profession',
    suggestedDescription: 'A community for international students studying nursing, physiotherapy, occupational therapy, and allied health — sharing visa tips, registration requirements, and healthcare career pathways in Australia.'
  },
  {
    id: 3,
    type: 'event',
    title: 'Settling In: Your First 90 Days',
    reasoning: '1,120 students flagged as new arrivals in the last 60 days show low Companion App engagement. A targeted onboarding event could reduce early churn and improve activation by 18%.',
    targetCohort: 'New arrivals · All universities · 0–90 days in Australia',
    predictedAttendance: 280,
    confidence: '78%',
    lifecycleMoment: 'new-arrival-dropoff',
    suggestedDate: 'Oct 28, 2026',
    suggestedType: 'Virtual Panel',
    suggestedDescription: 'A practical guide to your first 90 days in Australia — banking, transport, healthcare, and building your support network. Hosted by Medibank with student panellists from the Indian Students Connect and RMIT communities.'
  }
];

export const communityGroups = [
  { id: 1,  name: 'Indian Students Connect',    type: 'Hometown',    members: 820, growth: '+48 this month', activity: 'High',   status: 'live',  lastActive: '2 hours ago' },
  { id: 2,  name: 'Chinese Students Network',   type: 'Hometown',    members: 640, growth: '+31 this month', activity: 'High',   status: 'live',  lastActive: '1 hour ago' },
  { id: 3,  name: 'University of Melbourne',    type: 'University',  members: 520, growth: '+19 this month', activity: 'High',   status: 'live',  lastActive: '30 mins ago' },
  { id: 4,  name: 'RMIT Students',              type: 'University',  members: 450, growth: '+22 this month', activity: 'High',   status: 'live',  lastActive: '5 hours ago' },
  { id: 5,  name: 'South Asian Connect',        type: 'Hometown',    members: 430, growth: '+22 this month', activity: 'High',   status: 'live',  lastActive: '3 hours ago' },
  { id: 6,  name: 'Monash University',          type: 'University',  members: 390, growth: '+15 this month', activity: 'Medium', status: 'live',  lastActive: '1 day ago' },
  { id: 7,  name: 'Filipino Students Circle',   type: 'Hometown',    members: 290, growth: '+14 this month', activity: 'Medium', status: 'live',  lastActive: '1 day ago' },
  { id: 8,  name: 'Nursing & Health Students',  type: 'Profession',  members: 310, growth: '+8 this month',  activity: 'Medium', status: 'live',  lastActive: '3 hours ago' },
  { id: 9,  name: 'Wellness & Mindfulness',     type: 'Interest',    members: 215, growth: '+28 this month', activity: 'Medium', status: 'live',  lastActive: '6 hours ago' },
  { id: 10, name: 'Sydney University Students', type: 'University',  members: 345, growth: '+10 this month', activity: 'Medium', status: 'live',  lastActive: '2 days ago' },
  { id: 11, name: 'Graduate Job Seekers',       type: 'Interest',    members: 175, growth: '+42 this month', activity: 'High',   status: 'draft', lastActive: 'Not yet live' },
  { id: 12, name: 'Engineering Students (Aus)', type: 'Profession',  members: 180, growth: '-5 this month',  activity: 'Low',    status: 'live',  lastActive: '4 days ago' }
];

export const communityEvents = [
  { id: 1, title: 'Graduate Visa Q&A',                    type: 'Webinar',       date: 'Oct 22, 2026', time: '6:00 PM AEDT', targetCohort: 'Graduating students',          rsvp: 345, capacity: 500, status: 'upcoming' },
  { id: 2, title: 'OVHC Transition Workshop',             type: 'Virtual Panel', date: 'Oct 30, 2026', time: '7:00 PM AEDT', targetCohort: 'Graduation-approach cohort',   rsvp: 210, capacity: 400, status: 'upcoming' },
  { id: 3, title: 'Navigating Aussie Healthcare',         type: 'Webinar',       date: 'Nov 5, 2026',  time: '5:30 PM AEDT', targetCohort: 'All students',                 rsvp: 120, capacity: 300, status: 'upcoming' },
  { id: 4, title: 'Indian Student Community Meetup',      type: 'In-Person',     date: 'Oct 19, 2026', time: '2:00 PM AEDT', targetCohort: 'Indian Students Connect',      rsvp: 88,  capacity: 100, status: 'upcoming' },
  { id: 5, title: 'TFN & Banking Setup Guide',            type: 'Virtual Panel', date: 'Nov 10, 2026', time: '5:00 PM AEDT', targetCohort: 'New arrivals',                 rsvp: 0,   capacity: 200, status: 'draft' },
  { id: 6, title: 'Welcome to Australia — New Arrivals',  type: 'Webinar',       date: 'Sep 28, 2026', time: '4:00 PM AEDT', targetCohort: 'New arrivals (0–30 days)',     rsvp: 412, capacity: 500, status: 'past', attendees: 378 },
  { id: 7, title: 'Mental Health & Wellbeing',            type: 'Webinar',       date: 'Sep 12, 2026', time: '6:00 PM AEDT', targetCohort: 'All students',                 rsvp: 290, capacity: 350, status: 'past', attendees: 241 }
];

export const communityTrends = [
  { topic: 'Graduate visa requirements',  queries: 2340, trend: 'up',   trendPct: '+34%', lifecycleMoment: 'graduation-approach' },
  { topic: 'OVHC plan comparison',        queries: 1820, trend: 'up',   trendPct: '+28%', lifecycleMoment: 'ovhc-high-intent' },
  { topic: 'Medicare vs OVHC coverage',   queries: 980,  trend: 'up',   trendPct: '+12%', lifecycleMoment: 'graduation-approach' },
  { topic: 'Mental health support',       queries: 760,  trend: 'flat', trendPct: '±0%',  lifecycleMoment: null },
  { topic: 'TFN and banking setup',       queries: 640,  trend: 'down', trendPct: '-8%',  lifecycleMoment: 'new-arrival-dropoff' }
];

export const communityConversionImpact = [
  { event: 'Graduate Visa Q&A',       date: 'Sep 2026', attendees: 312, ovhcEngaged: 89,  conversionRate: '28.5%', revenue: '+$42K' },
  { event: 'OVHC Transition Workshop',date: 'Aug 2026', attendees: 278, ovhcEngaged: 124, conversionRate: '44.6%', revenue: '+$68K' },
  { event: 'Welcome Orientation',     date: 'Sep 2026', attendees: 378, ovhcEngaged: 41,  conversionRate: '10.8%', revenue: '+$18K' }
];

// --- CAMPAIGN INTELLIGENCE ---

export const campaignBrief = {
  narrative: "Healthcare webinar campaigns and referral-led engagement sequences are currently generating the strongest OVHC conversion behaviour among graduating students. WhatsApp onboarding flows are outperforming email campaigns by 2.4× engagement rate. Two campaign interventions are recommended this week.",
  projectedUplift: "+12%",
  confidence: "91%",
  strongestChannel: "WhatsApp",
  recommendedFocus: "Graduate transition sequences with community-led referral CTAs for RMIT and Monash cohorts.",
  agent: "Campaign Optimisation Agent",
  layer: "Orchestration",
};

export const campaignPerformance = [
  {
    id: 1,
    name: "Graduate Transition Campaign",
    audience: "Final-year RMIT and Monash students",
    channels: ["WhatsApp", "In-App", "Email"],
    performance: { headline: "+18% OVHC exploration uplift", ctr: "22.4%", engagement: "+18%", revenue: "+$142K" },
    whatWorked: "WhatsApp outperformed email by 2.4× for engagement. Community event invitations drove 38% higher OVHC page visits among webinar attendees.",
    whatUnderperformed: "Email open rate dropped to 8% for students inactive 14+ days. Generic messaging did not resonate with Chinese national students.",
    aiRecommendation: "Reduce email frequency for inactive cohort. Increase referral CTA placement in community-led touchpoints. Segment by nationality for personalised messaging.",
    projectedImpact: "+$120K additional conversion opportunity",
    confidence: "89%",
  },
  {
    id: 2,
    name: "Visa Expiry Awareness Push",
    audience: "Students within 90 days of OSHC expiry",
    channels: ["Push", "Email"],
    performance: { headline: "+15.2% OVHC enquiry rate", ctr: "15.2%", engagement: "+11%", revenue: "+$315K" },
    whatWorked: "Push notifications with personalised expiry countdown performed 3.1× better than generic alerts. In-app urgency banners converted 9% of viewers.",
    whatUnderperformed: "Open rates declined after the third email touchpoint. Conversion dropped sharply for students who delayed past the 30-day expiry window.",
    aiRecommendation: "Introduce WhatsApp as a third channel for students who haven't opened emails after touchpoint two. Reduce email cadence and increase push notification personalisation.",
    projectedImpact: "+$90K recoverable revenue opportunity",
    confidence: "86%",
  },
  {
    id: 3,
    name: "New Arrival Onboarding Sequence",
    audience: "New international students — OSHC purchased, app not activated",
    channels: ["WhatsApp", "Push"],
    performance: { headline: "+12.1% app activation rate uplift", ctr: "12.1%", engagement: "+22%", revenue: "LTV Impact" },
    whatWorked: "WhatsApp message open rates reached 84% within 2 hours of sending. Journey setup completion increased 34% among students who received the WhatsApp sequence.",
    whatUnderperformed: "OTP verification failures created significant drop-off for students with international phone numbers — 1,820 dropped at the verification step.",
    aiRecommendation: "Introduce email OTP as a fallback for international numbers. Add a 'skip for now' option to reduce friction. Deploy a 3-day recovery flow for drop-offs.",
    projectedImpact: "+$85K activation revenue recovery",
    confidence: "94%",
  },
];

export const suggestedCampaigns = [
  {
    id: 1,
    name: "Graduate Healthcare Confidence Journey",
    why: "Students attending healthcare webinars show 38% higher OVHC readiness. This cohort is currently underserved by conversion messaging and represents the highest near-term revenue opportunity.",
    targetCohort: "3,240 graduating RMIT and Monash students",
    channels: ["WhatsApp", "Community", "In-App"],
    predictedCTR: "22%",
    projectedRevenue: "+$240K",
    conversionUplift: "+3.2%",
    confidence: "91%",
    agent: "Campaign Optimisation Agent",
    priority: "high",
  },
  {
    id: 2,
    name: "Silent Cohort WhatsApp Recovery",
    why: "1,200 students are in silent disengagement — not opening emails, not using the app. WhatsApp has demonstrated 4.2× higher open rates for this cohort versus any other channel.",
    targetCohort: "1,200 students inactive 14+ days",
    channels: ["WhatsApp", "Push"],
    predictedCTR: "18%",
    projectedRevenue: "+$85K recoverable",
    conversionUplift: "+8.4%",
    confidence: "89%",
    agent: "Retention Risk Agent",
    priority: "high",
  },
  {
    id: 3,
    name: "Ambassador-Led Referral Activation",
    why: "127 students recently crossed the 3-referral ambassador threshold. Activating ambassador tier incentives now would unlock significant upstream referral growth at the lowest cost-per-acquisition.",
    targetCohort: "127 ambassador-ready students",
    channels: ["In-App", "WhatsApp"],
    predictedCTR: "34%",
    projectedRevenue: "+$180K upstream",
    conversionUplift: "+28% referral volume",
    confidence: "96%",
    agent: "Referral Agent",
    priority: "medium",
  },
];

export const channelInsights = [
  { channel: "WhatsApp",  insight: "WhatsApp sequences outperform email by 2.4× for onboarding recovery among students inactive for 7+ days.", stat: "2.4× open rate", direction: "positive" },
  { channel: "Community", insight: "Referral-led campaigns inside university community groups generate the strongest long-term OVHC conversion behaviour.", stat: "+38% OVHC readiness", direction: "positive" },
  { channel: "Push",      insight: "Push notifications perform poorly for disengaged cohorts after 14 days of inactivity — open rates fall below 4%.", stat: "<4% open rate", direction: "warning" },
  { channel: "Email",     insight: "Email campaigns are most effective within the first 7 days post-purchase. Effectiveness declines sharply for inactive segments.", stat: "−62% at 14d+", direction: "warning" },
];

export const weeklyShifts = [
  { label: "WhatsApp engagement",            change: "+28%", direction: "up",   note: "Driven by new onboarding sequence" },
  { label: "Referral conversion",            change: "+18%", direction: "up",   note: "Ambassador momentum growing" },
  { label: "Silent cohort risk",             change: "+12%", direction: "down", note: "Requires urgent intervention" },
  { label: "Community event campaign",       change: "+14%", direction: "up",   note: "Healthcare webinar driving earlier OVHC exploration" },
  { label: "Email open rates (inactive 14d+)", change: "−24%", direction: "down", note: "Channel switching recommended" },
];
