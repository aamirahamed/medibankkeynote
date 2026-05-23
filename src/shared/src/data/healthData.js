/* ── Leaderboard data ── */
export const leaderboardTabs = ['Friends', 'University', 'City'];

export const leaderboards = {
  Friends: [
    { rank: 1, name: 'Priya S.',    avatar: '👩🏽', steps: 14820, delta: +2, isUser: false },
    { rank: 2, name: 'Carlos M.',   avatar: '👨🏽', steps: 13540, delta: +1, isUser: false },
    { rank: 3, name: 'Wei C.',      avatar: '👨🏻', steps: 12910, delta: -1, isUser: false },
    { rank: 4, name: 'Aisha K.',    avatar: '👩🏾', steps: 11200, delta: 0,  isUser: false },
    { rank: 5, name: 'Kenji T.',    avatar: '👦🏻', steps: 10430, delta: +3, isUser: false },
    { rank: 6, name: 'Sara L.',     avatar: '👩🏼', steps:  9870, delta: -2, isUser: false },
    { rank: 7, name: 'You',         avatar: '🧑🏽', steps:  8200, delta: +2, isUser: true  },
    { rank: 8, name: 'Mehmet A.',   avatar: '👨🏽', steps:  7650, delta: -1, isUser: false },
    { rank: 9, name: 'Lena K.',     avatar: '👩🏼', steps:  6900, delta: 0,  isUser: false },
    { rank: 10, name: 'Raj P.',     avatar: '👨🏽', steps:  5400, delta: -2, isUser: false },
  ],
  University: [
    { rank: 1,  name: 'Alex T.',   avatar: '👦🏻', steps: 21200, delta: 0,  isUser: false },
    { rank: 2,  name: 'Mia S.',    avatar: '👩🏻', steps: 19800, delta: +1, isUser: false },
    { rank: 3,  name: 'Priya S.',  avatar: '👩🏽', steps: 18400, delta: -1, isUser: false },
    { rank: 4,  name: 'Carlos M.', avatar: '👨🏽', steps: 17100, delta: +2, isUser: false },
    { rank: 5,  name: 'Josh R.',   avatar: '👦🏼', steps: 15600, delta: 0,  isUser: false },
    { rank: 23, name: 'You',       avatar: '🧑🏽', steps:  8200, delta: +2, isUser: true, isGap: true },
  ],
  City: [
    { rank: 1,   name: 'Emma W.',   avatar: '👩🏻', steps: 28400, delta: 0,  isUser: false },
    { rank: 2,   name: 'Liam K.',   avatar: '👦🏻', steps: 26900, delta: +1, isUser: false },
    { rank: 3,   name: 'Zara M.',   avatar: '👩🏾', steps: 25100, delta: -1, isUser: false },
    { rank: 4,   name: 'Ryo T.',    avatar: '👦🏻', steps: 23800, delta: +3, isUser: false },
    { rank: 5,   name: 'Anita J.',  avatar: '👩🏽', steps: 22500, delta: 0,  isUser: false },
    { rank: 142, name: 'You',       avatar: '🧑🏽', steps:  8200, delta: +4, isUser: true, isGap: true },
  ],
};

/* ── Group Challenge ── */
export const groupChallenge = {
  title: 'University Step Battle',
  period: 'This week · Ends Sunday',
  groupA: {
    name: 'RMIT',
    color: '#cd0d2d',
    bg: '#fff1f2',
    steps: 1248300,
    members: 412,
    leading: true,
  },
  groupB: {
    name: 'Monash',
    color: '#1e3f8a',
    bg: '#eff6ff',
    steps: 987500,
    members: 388,
    leading: false,
  },
  userContribution: 8200,
  userGroup: 'RMIT',
};

/* ── Motivation nudges ── */
export const nudges = [
  { id: 'n1', icon: '🎯', text: "You're 300 steps away from top 6", color: '#eff6ff', textColor: '#1e3f8a' },
  { id: 'n2', icon: '📈', text: 'You climbed 2 ranks today', color: '#ecfdf5', textColor: '#10b981' },
];

/* ── Activity updates ── */
export const activityUpdates = [
  { id: 'u1', avatar: '👩🏽', text: 'Priya moved to #1 in Friends', time: '2h ago' },
  { id: 'u2', avatar: '🏛️', text: 'Monash gained 20,000 steps today', time: '3h ago' },
  { id: 'u3', avatar: '👦🏻', text: 'Kenji climbed 3 spots in University', time: '5h ago' },
];

/* ── Health Impact ── */
export const healthImpact = {
  score: 78,
  scoreMax: 100,
  scoreBasis: 'Based on your activity, consistency, and community participation',

  /* Value tiers – low / moderate / high */
  tiers: [
    {
      id: 'low',
      label: 'Low Activity',
      benefit: 'Standard cost',
      desc: 'Base OVHC pricing, no adjustments',
      color: '#94a3b8',
      bg: '#f8fafc',
      minScore: 0,
      maxScore: 40,
    },
    {
      id: 'moderate',
      label: 'Moderate Activity',
      benefit: 'Better benefits',
      desc: 'Priority access + wellness extras',
      color: '#f59e0b',
      bg: '#fffbeb',
      minScore: 41,
      maxScore: 74,
    },
    {
      id: 'high',
      label: 'High Activity',
      benefit: 'Lower future cost',
      desc: 'Up to 10% off OVHC on renewal',
      color: '#10b981',
      bg: '#ecfdf5',
      minScore: 75,
      maxScore: 100,
    },
  ],

  /* Current tier the user is in */
  currentTier: 'high',

  /* Projected monthly saving */
  projectedSaving: 18,
  renewalDate: 'Jan 2026',

  /* Earned badges */
  badges: [
    { id: 'b1', icon: '🔥', label: '7-day streak',   earned: true  },
    { id: 'b2', icon: '👟', label: '50K steps',      earned: true  },
    { id: 'b3', icon: '🏆', label: 'Top 15%',        earned: true  },
    { id: 'b4', icon: '🤝', label: 'Challenge winner', earned: false },
    { id: 'b5', icon: '⭐', label: '100K steps',     earned: false },
  ],

  /* Milestone to next benefit unlock */
  nextMilestone: {
    label: 'Maintain score above 80 for 4 more weeks to lock in maximum savings',
    current: 78,
    target: 80,
  },
};
