import React from 'react';
import { motion } from 'framer-motion';
import '../admin-theme.css';

export default function LaptopMockup({ children, className = '', ...motionProps }) {
  return (
    <motion.div 
      className={`laptop-mockup ${className}`}
      {...motionProps}
      style={{
        width: 1024,
        height: 640,
        borderRadius: 16,
        backgroundColor: '#000',
        border: '12px solid #222',
        borderBottomWidth: '24px', // Simulating laptop chin
        boxShadow: '0 30px 60px rgba(0,0,0,0.9), inset 0 0 10px rgba(255,255,255,0.05)',
        position: 'relative',
        overflow: 'hidden',
        // Slight perspective
        transformPerspective: 1200,
        ...motionProps.style
      }}
    >
      {/* Screen container */}
      <div className="admin-engine-scope" style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        backgroundColor: 'var(--bg-0, #080E1A)', // Admin engine default bg
        overflow: 'hidden'
      }}>
        {/* We can scale down the admin engine slightly so it fits beautifully in the mockup */}
        <div style={{ width: '1360px', height: '850px', transform: 'scale(0.7529)', transformOrigin: 'top left', overflowY: 'auto', overflowX: 'hidden' }}>
          {children}
        </div>
      </div>
      
      {/* Soft glare */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%)',
        pointerEvents: 'none',
        zIndex: 50
      }} />
    </motion.div>
  );
}
