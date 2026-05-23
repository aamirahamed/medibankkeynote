import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Shield, FileText, Phone, 
  Bell, Lock, Globe, Sliders, 
  MessageCircle, HelpCircle, FileQuestion,
  ChevronRight, Edit2, ArrowRight, ArrowLeft
} from 'lucide-react';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="profile-page">
      {/* ── 1. Profile Header ── */}
      <div className="profile-header-card">
        <div className="profile-header-top">
          <button className="profile-back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={22} />
          </button>
          <button className="profile-edit-btn">
            <Edit2 size={16} />
            <span>Edit</span>
          </button>
        </div>

        <div className="profile-identity">
          <div className="profile-avatar-large">AA</div>
          <h1 className="profile-name">Aamir Ahamed</h1>
          <p className="profile-subtitle">International Student · RMIT</p>
          <div className="profile-status-badge">🥇 Gold Member</div>
        </div>
      </div>

      <div className="profile-content">
        
        {/* ── 2. Progress Overview ── */}
        <div className="profile-progress-grid">
          <div className="progress-card" onClick={() => navigate('/health/impact')}>
            <span className="progress-value">78</span>
            <span className="progress-label">Health Score</span>
          </div>
          <div className="progress-card" onClick={() => navigate('/health/impact')}>
            <span className="progress-value">2,400</span>
            <span className="progress-label">Rewards pts</span>
          </div>
          <div className="progress-card" onClick={() => navigate('/health/impact')}>
            <span className="progress-value gold-tier">Gold</span>
            <span className="progress-label">Your Status</span>
          </div>
        </div>

        {/* ── 3. Transition Status (OSHC to OVHC) ── */}
        <div className="profile-transition-card">
          <div className="transition-header">
            <div className="transition-icon-wrap">🎓</div>
            <div className="transition-text">
              <h2 className="transition-title">Your next step</h2>
              <p className="transition-subtext">Your student cover ends in 2 months</p>
            </div>
          </div>
          <div className="transition-progress-bar">
            <div className="transition-progress-fill" style={{ width: '85%' }}></div>
          </div>
          <button className="transition-cta" onClick={() => navigate('/cover')}>
            Explore your cover options <ArrowRight size={16} />
          </button>
        </div>

        {/* ── 4. Account & Personal Details ── */}
        <div className="profile-section">
          <h3 className="section-title">Your Account</h3>
          <div className="settings-card">
            <SettingsItem icon={<User size={18} />} label="Personal details" />
            <SettingsItem icon={<Shield size={18} />} label="Policy details (OSHC)" />
            <SettingsItem icon={<FileText size={18} />} label="Documents & certificates" />
            <SettingsItem icon={<Phone size={18} />} label="Contact information" isLast />
          </div>
        </div>

        {/* ── 5. App Settings ── */}
        <div className="profile-section">
          <h3 className="section-title">Settings</h3>
          <div className="settings-card">
            <SettingsItem icon={<Bell size={18} />} label="Notifications" />
            <SettingsItem icon={<Lock size={18} />} label="Privacy & permissions" />
            <SettingsItem icon={<Globe size={18} />} label="Language preferences" />
            <SettingsItem icon={<Sliders size={18} />} label="App preferences" isLast />
          </div>
        </div>

        {/* ── 6. Support & Help ── */}
        <div className="profile-section">
          <h3 className="section-title">Support</h3>
          <div className="settings-card">
            <SettingsItem icon={<MessageCircle size={18} />} label="Contact Medibank" />
            <SettingsItem icon={<HelpCircle size={18} />} label="Help centre" />
            <SettingsItem icon={<FileQuestion size={18} />} label="FAQs" isLast />
          </div>
        </div>

        {/* ── 7. Logout ── */}
        <div className="profile-logout-section">
          <button className="logout-btn">Log out</button>
        </div>
      </div>
    </div>
  );
};

/* Settings Item Helper Component */
const SettingsItem = ({ icon, label, onClick, isLast }) => (
  <div className={`settings-item ${isLast ? 'last' : ''}`} onClick={onClick}>
    <div className="settings-icon-wrap">{icon}</div>
    <span className="settings-label">{label}</span>
    <ChevronRight size={18} className="settings-chevron" />
  </div>
);

export default Profile;
