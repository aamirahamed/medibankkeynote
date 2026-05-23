import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Sparkles, Send, MapPin, 
  ChevronRight, Stethoscope, BriefcaseMedical, 
  ArrowRight, HeartPulse, GraduationCap
} from 'lucide-react';
import './MediGuide.css';

const QUICK_CHIPS = [
  "I need to see a doctor",
  "What is OVHC?",
  "How do I set up a bank account?",
  "Transport in Melbourne"
];

const INITIAL_MESSAGE = {
  id: 'msg-0',
  sender: 'ai',
  type: 'text',
  content: "Hi Aamir! 👋 I'm MediGuide, your personal companion for settling into Australia. How can I help you today?"
};

const MediGuide = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chips, setChips] = useState(QUICK_CHIPS);

  const scrollToBottom = () => {
    const container = messagesEndRef.current?.parentElement;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text) => {
    if (!text.trim()) return;

    const userMsg = { id: `msg-${Date.now()}`, sender: 'user', type: 'text', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setChips([]); // Hide chips once conversation starts
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      processAiResponse(text);
    }, 1500);
  };

  const processAiResponse = async (userText) => {
    const lowerText = userText.toLowerCase();
    
    // FLOW 1: DOCTOR
    if (lowerText.includes('doctor') || lowerText.includes('gp') || lowerText.includes('sick')) {
      const responseMsg = {
        id: `msg-${Date.now()}`,
        sender: 'ai',
        type: 'text',
        content: "If it's an emergency, always call 000. For general illness, it's best to visit a General Practitioner (GP) rather than a hospital to save time and money. \n\nSince you are on Medibank OSHC, here are some nearby clinics that offer **Direct Billing** (meaning you won't have to pay out of pocket for standard consults):"
      };
      
      const actionMsg = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        type: 'action-card',
        cardType: 'doctor-list',
        data: [
          { name: 'Melbourne City Medical Centre', distance: '0.8 km', directBilling: true },
          { name: 'Swanston Street Clinic', distance: '1.2 km', directBilling: true }
        ]
      };

      setMessages(prev => [...prev, responseMsg, actionMsg]);
    } 
    // FLOW 2: OVHC
    else if (lowerText.includes('ovhc') || lowerText.includes('graduate') || lowerText.includes('visa')) {
      const responseMsg = {
        id: `msg-${Date.now()}`,
        sender: 'ai',
        type: 'text',
        content: "When you graduate and apply for a Temporary Graduate Visa (subclass 485), you must switch from OSHC to Overseas Visitor Health Cover (OVHC).\n\nBased on your profile, you are graduating in 2 months. We've prepared a seamless transition plan that keeps your existing loyalty rewards:"
      };
      
      const actionMsg = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        type: 'action-card',
        cardType: 'ovhc-promo',
        data: {
          title: 'Graduate Base Cover',
          benefits: ['Meets 485 visa requirements', 'Keep your 2,400 rewards points', '100% ambulance cover'],
          price: '$110 / month'
        }
      };

      setMessages(prev => [...prev, responseMsg, actionMsg]);
    }
    // FLOW 3: REAL AI (GEMINI) FALLBACK
    else {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (!apiKey || apiKey === '') {
        const fallbackMsg = {
          id: `msg-${Date.now()}`,
          sender: 'ai',
          type: 'text',
          content: "I'm ready to answer your questions, but it looks like my API key hasn't been added yet! Please paste your Gemini API key into the `.env` file and restart the server."
        };
        setMessages(prev => [...prev, fallbackMsg]);
        setIsTyping(false);
        return;
      }

      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: {
              parts: { text: "You are MediGuide, a friendly, concise personal guide for international students living in Australia using the Medibank Companion App. Help them with student life, transport, banking, and general queries. Keep answers extremely brief (1-2 short paragraphs). Do not use markdown headers." }
            },
            contents: [{ role: "user", parts: [{ text: userText }] }]
          })
        });

        if (!response.ok) throw new Error('API Request Failed');
        
        const data = await response.json();
        const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";

        const aiMsg = {
          id: `msg-${Date.now()}`,
          sender: 'ai',
          type: 'text',
          content: aiText
        };
        setMessages(prev => [...prev, aiMsg]);
      } catch (error) {
        console.error("Gemini API Error:", error);
        const errorMsg = {
          id: `msg-${Date.now()}`,
          sender: 'ai',
          type: 'text',
          content: "Oops, I'm having trouble connecting to my brain right now. Please try again later!"
        };
        setMessages(prev => [...prev, errorMsg]);
      }
    }
    
    setIsTyping(false);
  };

  const renderActionCard = (msg) => {
    if (msg.cardType === 'doctor-list') {
      return (
        <div className="mg-action-card doctor-card">
          <div className="mg-card-header">
            <Stethoscope size={18} className="text-primary" />
            <span>Nearby Direct Billing GPs</span>
          </div>
          <div className="mg-card-body">
            {msg.data.map((clinic, i) => (
              <div key={i} className="clinic-row">
                <div>
                  <h4>{clinic.name}</h4>
                  <div className="clinic-meta">
                    <MapPin size={12} /> {clinic.distance} • <span className="text-success">Direct Billing</span>
                  </div>
                </div>
                <ChevronRight size={16} className="text-muted" />
              </div>
            ))}
          </div>
          <button className="mg-cta-btn" onClick={() => navigate('/find')}>
            Find more doctors
          </button>
        </div>
      );
    }

    if (msg.cardType === 'ovhc-promo') {
      return (
        <div className="mg-action-card ovhc-card">
          <div className="mg-card-header bg-gradient">
            <GraduationCap size={18} className="text-white" />
            <span className="text-white font-medium">Recommended for you</span>
          </div>
          <div className="mg-card-body">
            <h3>{msg.data.title}</h3>
            <p className="price-tag">{msg.data.price}</p>
            <ul className="benefit-list">
              {msg.data.benefits.map((b, i) => (
                <li key={i}><Sparkles size={14} className="text-primary" /> {b}</li>
              ))}
            </ul>
          </div>
          <button className="mg-cta-btn primary-bg" onClick={() => navigate('/ovhc-transition')}>
            Explore OVHC Plans <ArrowRight size={16} />
          </button>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mediguide-container">
      {/* Header */}
      <header className="mg-header">
        <button className="mg-back-btn" onClick={() => navigate(-1)}>
          <ChevronLeft size={24} />
        </button>
        <div className="mg-title-block">
          <div className="mg-avatar">
            <Sparkles size={16} />
          </div>
          <div>
            <h1>MediGuide</h1>
            <span className="mg-status">Online • Personal Guide</span>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="mg-chat-area">
        {messages.map(msg => (
          <div key={msg.id} className={`mg-message-row ${msg.sender}`}>
            {msg.sender === 'ai' && msg.type === 'text' && (
              <div className="mg-ai-avatar"><Sparkles size={14} /></div>
            )}
            
            {msg.type === 'text' ? (
              <div className="mg-bubble">
                {msg.content}
              </div>
            ) : (
              <div className="mg-bubble-card">
                {renderActionCard(msg)}
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="mg-message-row ai">
            <div className="mg-ai-avatar"><Sparkles size={14} /></div>
            <div className="mg-bubble typing-indicator">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* Input Area */}
      <footer className="mg-footer">
        {chips.length > 0 && (
          <div className="mg-chips-scroll">
            {chips.map((chip, i) => (
              <button key={i} className="mg-chip" onClick={() => handleSend(chip)}>
                {chip}
              </button>
            ))}
          </div>
        )}
        <div className="mg-input-bar">
          <input 
            type="text" 
            placeholder="Ask me anything..." 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend(inputText)}
          />
          <button 
            className={`mg-send-btn ${inputText.trim() ? 'active' : ''}`}
            onClick={() => handleSend(inputText)}
          >
            <Send size={18} />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default MediGuide;
