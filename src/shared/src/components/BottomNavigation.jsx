import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, PlusCircle, Users, Shield, Route } from 'lucide-react';
import './BottomNavigation.css';

const BottomNavigation = () => {
  const navItems = [
    { name: 'Home',      path: '/',          icon: Home },
    { name: 'Journey',   path: '/journey',   icon: Route },
    { name: 'Community', path: '/community', icon: Users },
    { name: 'Health',    path: '/health-advice', icon: PlusCircle },
    { name: 'Cover',     path: '/cover',     icon: Shield },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
          >
            <Icon size={24} strokeWidth={2} />
            <span className="nav-label">{item.name}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default BottomNavigation;
