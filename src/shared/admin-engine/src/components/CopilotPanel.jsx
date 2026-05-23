import { useState, useRef, useEffect } from 'react';
import { MessageSquare, ChevronRight, Send, Sparkles, X } from 'lucide-react';
import { copilotContext } from '../data/mockData';

const WELCOME = {
  id: 'welcome',
  role: 'copilot',
  text: "I have full context across all 10 agents right now. 4 lifecycle moments are active, 3 decisions await your review, and there's $265K in identified revenue opportunity today. Ask me anything — or try a suggestion below."
};

const SUGGESTIONS = [
  "What should I focus on today?",
  "Tell me about the graduate cohort",
  "What's the churn risk right now?",
  "Which campaign is performing best?"
];

function getResponse(input) {
  const lower = input.toLowerCase();
  const match = copilotContext.responses.find(r =>
    r.keywords.some(k => lower.includes(k))
  );
  return match ? match.reply : copilotContext.fallback;
}

function renderText(text) {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    const boldified = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    return (
      <span key={i}>
        <span dangerouslySetInnerHTML={{ __html: boldified }} />
        {i < lines.length - 1 && <br />}
      </span>
    );
  });
}

export default function CopilotPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    const container = bottomRef.current?.parentElement;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, isTyping]);

  function send(text) {
    const userMsg = { id: Date.now(), role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'copilot',
        text: getResponse(text)
      }]);
    }, 700);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!inputValue.trim()) return;
    send(inputValue.trim());
  }

  const showSuggestions = messages.length === 1;

  return (
    <>
      <style>{`
        .cop-panel {
          position: fixed;
          right: 0;
          top: 0;
          height: 100vh;
          width: 360px;
          background: #0D0F14;
          border-left: 1px solid rgba(255,255,255,0.07);
          display: flex;
          flex-direction: column;
          z-index: 200;
          transform: translateX(0);
          transition: transform 0.28s cubic-bezier(0.4,0,0.2,1);
          box-shadow: -8px 0 40px rgba(0,0,0,0.4);
        }
        .cop-panel.cop-closed {
          transform: translateX(360px);
        }
        .cop-toggle {
          position: fixed;
          right: ${isOpen ? '372px' : '24px'};
          bottom: 28px;
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #1E3A5F 0%, #1A2744 100%);
          border: 1px solid rgba(59,130,246,0.35);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 201;
          transition: right 0.28s cubic-bezier(0.4,0,0.2,1), box-shadow 0.2s ease, transform 0.15s ease;
          color: #93C5FD;
          box-shadow: 0 0 0 1px rgba(59,130,246,0.2), 0 0 16px rgba(59,130,246,0.35), 0 4px 20px rgba(0,0,0,0.5);
          animation: cop-pulse-glow 3s ease-in-out infinite;
        }
        .cop-toggle:hover {
          color: #FFFFFF;
          transform: scale(1.08);
          box-shadow: 0 0 0 1px rgba(59,130,246,0.4), 0 0 28px rgba(59,130,246,0.55), 0 4px 24px rgba(0,0,0,0.5);
          animation: none;
        }
        @keyframes cop-pulse-glow {
          0%, 100% { box-shadow: 0 0 0 1px rgba(59,130,246,0.2), 0 0 16px rgba(59,130,246,0.35), 0 4px 20px rgba(0,0,0,0.5); }
          50% { box-shadow: 0 0 0 1px rgba(59,130,246,0.35), 0 0 28px rgba(59,130,246,0.55), 0 4px 20px rgba(0,0,0,0.5); }
        }
        .cop-toggle-dot {
          display: none;
        }
        .cop-header {
          padding: 20px 20px 16px;
          background: linear-gradient(160deg, rgba(59,130,246,0.1) 0%, transparent 60%);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          flex-shrink: 0;
        }
        .cop-header-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 4px;
        }
        .cop-header-label {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .cop-header-label svg {
          color: #3B82F6;
        }
        .cop-header-label span {
          font-size: 13px;
          font-weight: 600;
          color: #FFFFFF;
          letter-spacing: 0.02em;
        }
        .cop-close-btn {
          background: none;
          border: none;
          color: #6B7280;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          display: flex;
          align-items: center;
        }
        .cop-close-btn:hover { color: #D8DCE8; background: rgba(255,255,255,0.05); }
        .cop-status {
          font-size: 11px;
          color: #4B5563;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .cop-status-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #10B981;
          box-shadow: 0 0 5px rgba(16,185,129,0.6);
        }
        .cop-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,0.08) transparent;
        }
        .cop-messages::-webkit-scrollbar { width: 4px; }
        .cop-messages::-webkit-scrollbar-track { background: transparent; }
        .cop-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 2px; }
        .cop-msg {
          display: flex;
          flex-direction: column;
          max-width: 100%;
        }
        .cop-msg-user {
          align-items: flex-end;
        }
        .cop-msg-copilot {
          align-items: flex-start;
        }
        .cop-bubble {
          padding: 10px 13px;
          border-radius: 12px;
          font-size: 13px;
          line-height: 1.6;
          max-width: 90%;
        }
        .cop-bubble-user {
          background: #1E2330;
          color: #FFFFFF;
          border-bottom-right-radius: 4px;
        }
        .cop-bubble-copilot {
          background: rgba(59,130,246,0.09);
          border: 1px solid rgba(59,130,246,0.15);
          color: #D8DCE8;
          border-bottom-left-radius: 4px;
        }
        .cop-bubble-copilot strong {
          color: #FFFFFF;
          font-weight: 600;
        }
        .cop-typing {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 10px 13px;
          background: rgba(59,130,246,0.09);
          border: 1px solid rgba(59,130,246,0.15);
          border-radius: 12px;
          border-bottom-left-radius: 4px;
          width: fit-content;
        }
        .cop-typing span {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #3B82F6;
          opacity: 0.4;
          animation: cop-bounce 1.2s infinite;
        }
        .cop-typing span:nth-child(2) { animation-delay: 0.2s; }
        .cop-typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes cop-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-4px); opacity: 1; }
        }
        .cop-suggestions {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-top: 4px;
        }
        .cop-suggestion-label {
          font-size: 11px;
          color: #4B5563;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 2px;
        }
        .cop-suggestion-btn {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          padding: 8px 12px;
          font-size: 12px;
          color: #9CA3AF;
          cursor: pointer;
          text-align: left;
          transition: all 0.15s;
        }
        .cop-suggestion-btn:hover {
          background: rgba(59,130,246,0.08);
          border-color: rgba(59,130,246,0.25);
          color: #D8DCE8;
        }
        .cop-input-area {
          padding: 12px 16px 16px;
          border-top: 1px solid rgba(255,255,255,0.06);
          flex-shrink: 0;
        }
        .cop-input-row {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 8px 10px 8px 14px;
          transition: border-color 0.15s;
        }
        .cop-input-row:focus-within {
          border-color: rgba(59,130,246,0.3);
        }
        .cop-input {
          flex: 1;
          background: none;
          border: none;
          outline: none;
          color: #FFFFFF;
          font-size: 13px;
          line-height: 1.5;
          resize: none;
          max-height: 100px;
          min-height: 20px;
          font-family: inherit;
        }
        .cop-input::placeholder { color: #4B5563; }
        .cop-send-btn {
          background: #3B82F6;
          border: none;
          border-radius: 6px;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #FFFFFF;
          flex-shrink: 0;
          transition: background 0.15s;
        }
        .cop-send-btn:hover { background: #2563EB; }
        .cop-send-btn:disabled { background: rgba(59,130,246,0.3); cursor: not-allowed; }
        .cop-footer-note {
          font-size: 10px;
          color: #374151;
          text-align: center;
          margin-top: 8px;
        }
      `}</style>

      {/* Toggle button — bottom right FAB */}
      <button
        className="cop-toggle"
        onClick={() => setIsOpen(o => !o)}
        title={isOpen ? 'Close Copilot' : 'Open System Copilot'}
      >
        <MessageSquare size={22} />
      </button>

      {/* Panel */}
      <div className={`cop-panel${isOpen ? '' : ' cop-closed'}`}>
        {/* Header */}
        <div className="cop-header">
          <div className="cop-header-top">
            <div className="cop-header-label">
              <Sparkles size={15} />
              <span>System Copilot</span>
            </div>
            <button className="cop-close-btn" onClick={() => setIsOpen(false)}>
              <X size={15} />
            </button>
          </div>
          <div className="cop-status">
            <div className="cop-status-dot" />
            Full system context loaded · 10 agents active
          </div>
        </div>

        {/* Messages */}
        <div className="cop-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`cop-msg cop-msg-${msg.role}`}>
              <div className={`cop-bubble cop-bubble-${msg.role}`}>
                {renderText(msg.text)}
              </div>
            </div>
          ))}

          {showSuggestions && (
            <div className="cop-suggestions">
              <div className="cop-suggestion-label">Try asking</div>
              {SUGGESTIONS.map(s => (
                <button
                  key={s}
                  className="cop-suggestion-btn"
                  onClick={() => send(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {isTyping && (
            <div className="cop-msg cop-msg-copilot">
              <div className="cop-typing">
                <span /><span /><span />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="cop-input-area">
          <form className="cop-input-row" onSubmit={handleSubmit}>
            <textarea
              ref={inputRef}
              className="cop-input"
              placeholder="Ask anything about the system…"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              rows={1}
            />
            <button
              className="cop-send-btn"
              type="submit"
              disabled={!inputValue.trim() || isTyping}
            >
              <Send size={13} />
            </button>
          </form>
          <div className="cop-footer-note">AI-generated · Always review before acting</div>
        </div>
      </div>
    </>
  );
}
