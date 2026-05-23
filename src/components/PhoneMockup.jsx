import React from 'react';
import { motion } from 'framer-motion';

export default function PhoneMockup({ children, className = '', ...motionProps }) {
  return (
    <motion.div 
      className={`phone-mockup ${className}`}
      {...motionProps}
      style={{
        width: 393,
        height: 852,
        borderRadius: 55,
        backgroundColor: '#000',
        border: '8px solid #222',
        boxShadow: '0 20px 50px rgba(0,0,0,0.8), inset 0 0 10px rgba(255,255,255,0.1)',
        position: 'relative',
        overflow: 'hidden',
        // Slight perspective rotation
        transformPerspective: 1000,
        ...motionProps.style
      }}
    >
      {/* Notch */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 150,
        height: 30,
        backgroundColor: '#222',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        zIndex: 100
      }} />

      {/* Screen container */}
      <div style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        backgroundColor: '#0C1728', // default companion app bg
        overflow: 'hidden'
      }}>
        {children}
      </div>
      
      {/* Soft edge glare/glow */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 40%)',
        pointerEvents: 'none',
        zIndex: 50
      }} />
    </motion.div>
  );
}
