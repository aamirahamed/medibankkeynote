import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Zap,
  Megaphone,
  Globe2,
  Network,
  Rocket,
  Brain,
  Filter,
  Search,
  Settings,
} from 'lucide-react';

const NAV_GROUPS = [
  {
    label: 'Operate',
    items: [
      { path: '/',              label: 'Command Centre',    icon: LayoutDashboard },
      { path: '/segments',      label: 'Student Segments',  icon: Users },
      { path: '/action-studio', label: 'Action Studio',     icon: Zap },
    ],
  },
  {
    label: 'Engage',
    items: [
      { path: '/campaigns',  label: 'Campaigns',    icon: Megaphone },
      { path: '/community',  label: 'Community',    icon: Globe2 },
      { path: '/referrals',  label: 'Referral Ops', icon: Network },
    ],
  },
  {
    label: 'Intelligence',
    items: [
      { path: '/agents',     label: 'Agent Hub',          icon: Brain },
      { path: '/funnel',     label: 'Conversion Funnel',  icon: Filter },
      { path: '/activation', label: 'Activation Engine',  icon: Rocket },
    ],
  },
];

const Sidebar = () => (
  <aside className="sidebar">

    {/* Premium workspace identity card */}
    <div className="sidebar-brand">
      <div className="sidebar-brand-logo-wrap">
        <img src="/medibank-wordmark.svg" alt="Medibank" className="sidebar-brand-logo" />
      </div>
      <div className="sidebar-brand-identity">
        <span className="sidebar-brand-title">Conversion Engine</span>
        <span className="sidebar-brand-badge">AI OPS</span>
      </div>
    </div>

    {/* Command search */}
    <button className="sidebar-search">
      <Search size={13} strokeWidth={1.75} />
      <span className="sidebar-search-placeholder">Search cohorts, campaigns, workflows…</span>
      <kbd className="sidebar-search-kbd">⌘K</kbd>
    </button>

    {/* Grouped navigation */}
    <nav className="sidebar-nav">
      {NAV_GROUPS.map((group) => (
        <div key={group.label} className="sidebar-nav-group">
          <div className="sidebar-group-label">{group.label}</div>
          {group.items.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              <Icon size={16} strokeWidth={1.6} className="nav-link-icon" />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      ))}
    </nav>

    {/* User + system status */}
    <div className="sidebar-footer">
      <div className="sidebar-footer-user">
        <div className="sidebar-avatar">AT</div>
        <div className="sidebar-user-info">
          <span className="sidebar-user-name">Admin User</span>
          <span className="sidebar-user-role">Retention Operations Lead</span>
        </div>
        <Settings size={14} className="sidebar-settings-icon" />
      </div>
      <div className="sidebar-status-bar">
        <span className="sidebar-status-dot" />
        <span className="sidebar-status-label">Live Workspace</span>
        <span className="sidebar-status-env">PROD</span>
      </div>
    </div>

  </aside>
);

export default Sidebar;
