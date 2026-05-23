import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import CommandCentre from './pages/CommandCentre';
import AgentHub from './pages/AgentHub';
import StudentSegments from './pages/StudentSegments';
import ActionStudio from './pages/ActionStudio';
import Campaigns from './pages/Campaigns';
import Community from './pages/Community';
import ConversionFunnel from './pages/ConversionFunnel';
import ActivationEngine from './pages/ActivationEngine';
import ReferralOps from './pages/ReferralOps';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CommandCentre />} />
          <Route path="agents" element={<AgentHub />} />
          <Route path="segments" element={<StudentSegments />} />
          <Route path="action-studio" element={<ActionStudio />} />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="community" element={<Community />} />
          <Route path="funnel" element={<ConversionFunnel />} />
          <Route path="activation" element={<ActivationEngine />} />
          <Route path="referrals" element={<ReferralOps />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
