import { Map, HeartPulse, Users, Bell, Gift } from 'lucide-react';
import onboardingWelcome from '../assets/premium_onboarding_welcome.png';
import onboardingReady from '../assets/premium_onboarding_ready.png';

export const onboardingData = [
  {
    id: 1,
    headline: 'Welcome to Australia 👋',
    subtext: 'Moving to a new country can feel overwhelming. But you don’t have to figure it out alone.',
    supportingLine: 'We’ll guide you every step of the way.',
    image: onboardingWelcome,
    type: 'image',
    bgClass: 'bg-gradient-sky'
  },
  {
    id: 2,
    headline: 'Your journey, step by step',
    subtext: 'We’ll support you from the moment you prepare to arrive, all the way to your life after study.',
    type: 'timeline',
    bgClass: 'bg-gradient-warm',
    stages: [
      { title: 'Pre-Arrival', desc: 'Prepare before you get here', active: false },
      { title: 'Arrival (First 30 Days)', desc: 'Get set up and understand how things work', active: true },
      { title: 'Settling In', desc: 'Build your life, routines, and connections', active: false },
      { title: 'Transition', desc: 'Move smoothly into your next phase', active: false }
    ]
  },
  {
    id: 3,
    headline: 'Everything you need, in one place',
    subtext: 'The app is designed to make your life easier, not just manage your insurance.',
    type: 'features',
    bgClass: 'bg-gradient-teal',
    features: [
      { title: 'Guided Journey', desc: 'Step-by-step tasks to help you settle in', icon: Map, color: '#cd0d2d', bgColor: '#fff1f2' },
      { title: '24/7 Support (MediGuide)', desc: 'Ask anything about healthcare or life in Australia', icon: HeartPulse, color: '#cd0d2d', bgColor: '#fff1f2' },
      { title: 'Community', desc: 'Find people, events, and support around you', icon: Users, color: '#1e3f8a', bgColor: '#eff6ff' },
      { title: 'Smart Reminders', desc: 'Stay on top of important steps and deadlines', icon: Bell, color: '#f59e0b', bgColor: '#fffbeb' },
      { title: 'Rewards & Benefits', desc: 'Get more value as you engage', icon: Gift, color: '#10b981', bgColor: '#ecfdf5' }
    ]
  },
  {
    id: 4,
    headline: 'You’re all set ✨',
    subtext: 'Everything you need to settle in, stay healthy, and navigate life in Australia is right here.',
    supportingLine: 'This is your space to get started, stay on track, and feel at home.',
    image: onboardingReady,
    type: 'image-cta',
    bgClass: 'bg-gradient-rich'
  }
];
