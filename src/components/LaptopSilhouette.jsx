import React from 'react';
import { motion } from 'framer-motion';

export default function LaptopSilhouette() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* 1. Edge Outlines (SVG) */}
      <svg 
        viewBox="0 0 1024 640" 
        style={{ 
          width: '100%', 
          height: '100%', 
          position: 'absolute', 
          top: 0, 
          left: 0,
          zIndex: 4,
          pointerEvents: 'none'
        }}
      >
        {/* Screen Bezel Outline */}
        <motion.rect
          x="12"
          y="12"
          width="1000"
          height="600"
          rx="12"
          fill="none"
          stroke="rgba(56, 182, 255, 0.4)"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        {/* Screen Inside Lip */}
        <motion.rect
          x="24"
          y="24"
          width="976"
          height="576"
          rx="6"
          fill="none"
          stroke="rgba(255, 77, 106, 0.2)"
          strokeWidth="1.0"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut", delay: 0.4 }}
        />
        {/* Bottom Chassis Keyboard Lip */}
        <motion.path
          d="M 12 612 L 0 632 L 1024 632 L 1012 612 Z"
          fill="none"
          stroke="rgba(56, 182, 255, 0.4)"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
        />
        {/* Trackpad silhouette outline */}
        <motion.path
          d="M 452 622 L 456 630 L 568 630 L 572 622 Z"
          fill="none"
          stroke="rgba(255, 77, 106, 0.25)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.0, ease: "easeOut", delay: 1.2 }}
        />
      </svg>

      {/* 2. Metallic Frame Forms */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(8, 14, 26, 0.65)',
          border: '12px solid rgba(24, 24, 28, 0.8)',
          borderBottomWidth: '24px',
          borderRadius: 16,
          boxShadow: 'inset 0 0 30px rgba(56, 182, 255, 0.08), 0 15px 40px rgba(0,0,0,0.8)',
          pointerEvents: 'none',
          zIndex: 2
        }}
      />

      {/* 3. Browser Frame Appears */}
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          right: '20px',
          height: '36px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          gap: '8px',
          backgroundColor: 'rgba(255, 255, 255, 0.01)',
          pointerEvents: 'none',
          zIndex: 3
        }}
      >
        {/* Window control dots */}
        <div style={{ display: 'flex', gap: '6px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(255,77,106,0.3)' }} />
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(74,222,128,0.3)' }} />
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(56,182,255,0.3)' }} />
        </div>
        {/* Address bar mockup */}
        <div style={{
          marginLeft: '24px',
          flex: 1,
          maxWidth: '320px',
          height: '18px',
          background: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '4px',
          border: '1px solid rgba(255, 255, 255, 0.04)',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '8px'
        }}>
          <div style={{ width: '120px', height: '6px', background: 'rgba(255, 255, 255, 0.15)', borderRadius: '2px' }} />
        </div>
      </motion.div>

      {/* 4. Screen Glow Activates */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 0.45, scale: 1 }}
        transition={{ 
          opacity: { duration: 1.5, delay: 2.0, ease: "easeOut" },
          scale: { duration: 1.5, delay: 2.0, ease: "easeOut" }
        }}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          right: '20px',
          bottom: '32px',
          background: 'radial-gradient(circle at center, rgba(56, 182, 255, 0.18) 0%, rgba(255, 77, 106, 0.06) 50%, transparent 100%)',
          pointerEvents: 'none',
          filter: 'blur(12px)',
          borderRadius: '6px',
          zIndex: 1
        }}
      />
    </div>
  );
}
