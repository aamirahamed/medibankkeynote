import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import Journey from './pages/Journey';
import StageDetail from './pages/StageDetail';
import TaskDetail from './pages/TaskDetail';
import Community from './pages/Community';
import GroupDetail from './pages/GroupDetail';
import EventDetail from './pages/EventDetail';
import BuddyDetail from './pages/BuddyDetail';
import DiscoverDetail from './pages/DiscoverDetail';
import Cover from './pages/Cover';
import Health from './pages/Health';
import HealthImpactDetail from './pages/HealthImpactDetail';
import Profile from './pages/Profile';
import OvhcTransition from './pages/OvhcTransition';
import MediGuide from './pages/MediGuide';
import ReferralFlow from './pages/ReferralFlow';
import BottomNavigation from './components/BottomNavigation';
import './index.css';

const PlaceholderPage = ({ title }) => (
  <div style={{ padding: '40px 20px', textAlign: 'center' }}>
    <h2>{title}</h2>
    <p>This screen is under construction.</p>
  </div>
);

const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding && location.pathname !== '/onboarding') {
      navigate('/onboarding', { replace: true });
    }
  }, [navigate, location.pathname]);

  const isHiddenRoute =
    location.pathname === '/onboarding' ||
    location.pathname === '/ovhc-transition' ||
    location.pathname === '/mediguide' ||
    location.pathname === '/referral' ||
    location.pathname === '/health/impact' ||
    location.pathname.startsWith('/journey/task/') ||
    location.pathname.startsWith('/community/group/') ||
    location.pathname.startsWith('/community/event/') ||
    location.pathname.startsWith('/community/buddy/') ||
    location.pathname.startsWith('/community/discover/');

  const showBottomNav = !isHiddenRoute;
  return (
    <>
      <div className="page-container" style={{ paddingBottom: showBottomNav ? 'var(--nav-height)' : '0' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/journey/:stageId" element={<StageDetail />} />
          <Route path="/journey/task/:taskId" element={<TaskDetail />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community/group/:id" element={<GroupDetail />} />
          <Route path="/community/event/:id" element={<EventDetail />} />
          <Route path="/community/buddy/:id" element={<BuddyDetail />} />
          <Route path="/community/discover/:id" element={<DiscoverDetail />} />
          <Route path="/cover" element={<Cover />} />
          <Route path="/health-advice" element={<Health />} />
          <Route path="/health/impact" element={<HealthImpactDetail />} />
          <Route path="/ovhc-transition" element={<OvhcTransition />} />
          <Route path="/mediguide" element={<MediGuide />} />
          <Route path="/referral" element={<ReferralFlow />} />
          <Route path="/find" element={<PlaceholderPage title="Find" />} />
          <Route path="/me" element={<Profile />} />
        </Routes>
      </div>
      {showBottomNav && <BottomNavigation />}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
