import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, Users, Calendar, Share2, CheckCircle2 } from 'lucide-react';
import { events } from '../data/communityData';
import './CommunityDetail.css';

const mockAttendees = [
  { avatar: '👩🏽', name: 'Priya S.' },
  { avatar: '👨🏻', name: 'Wei C.' },
  { avatar: '👨🏽', name: 'Carlos M.' },
  { avatar: '👩🏾', name: 'Aisha K.' },
  { avatar: '👦🏻', name: 'Kenji T.' },
];

const agendaItems = [
  { time: '3:00 PM', item: 'Welcome & introductions' },
  { time: '3:20 PM', item: 'How to use your Medibank OSHC' },
  { time: '3:45 PM', item: 'Q&A — your questions answered' },
  { time: '4:15 PM', item: 'Free networking & mingle' },
];

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find(e => e.id === id);
  const [registered, setRegistered] = useState(event?.registered || false);

  if (!event) { navigate('/community'); return null; }

  return (
    <div className="detail-page">
      {/* Hero */}
      <div className="detail-header" style={{ background: `linear-gradient(135deg, ${event.color}18 0%, #ffffff 100%)` }}>
        <button className="detail-back-btn" onClick={() => navigate('/community')}>
          <ArrowLeft size={22} />
        </button>

        <div className="event-detail-hero">
          <div className="event-detail-icon" style={{ background: event.bg, color: event.color }}>
            <span style={{ fontSize: 40 }}>{event.icon}</span>
          </div>
          <span className="event-type-badge" style={{ color: event.typeColor, background: event.typeBg }}>
            {event.type}
          </span>
          <h1 className="detail-title">{event.title}</h1>

          <div className="event-detail-meta-list">
            <div className="event-detail-meta-item">
              <div className="event-meta-icon-wrap" style={{ background: event.bg, color: event.color }}>
                <Calendar size={16} />
              </div>
              <div>
                <span className="event-meta-label">Date & Time</span>
                <span className="event-meta-value">{event.date} · {event.time}</span>
              </div>
            </div>
            <div className="event-detail-meta-item">
              <div className="event-meta-icon-wrap" style={{ background: '#f3f4f6', color: '#6b7280' }}>
                <MapPin size={16} />
              </div>
              <div>
                <span className="event-meta-label">Location</span>
                <span className="event-meta-value">{event.location}</span>
              </div>
            </div>
            <div className="event-detail-meta-item">
              <div className="event-meta-icon-wrap" style={{ background: '#ecfdf5', color: '#10b981' }}>
                <Users size={16} />
              </div>
              <div>
                <span className="event-meta-label">Attending</span>
                <span className="event-meta-value">{event.attendees + (registered ? 1 : 0)} people registered</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="detail-body">
        {/* Attendees preview */}
        <div className="detail-section">
          <h2 className="detail-section-title">Who's going</h2>
          <div className="attendees-row">
            {mockAttendees.map(a => (
              <div key={a.name} className="attendee-bubble" title={a.name}>
                <span>{a.avatar}</span>
              </div>
            ))}
            <div className="attendee-more">+{event.attendees - mockAttendees.length}</div>
          </div>
        </div>

        {/* About */}
        <div className="detail-section">
          <h2 className="detail-section-title">About this event</h2>
          <p className="detail-body-text">
            Join fellow international students for a relaxed and welcoming gathering. Whether you just arrived or have been here a while, this is a great chance to meet people, share experiences, and build connections that make life in Australia feel a little more like home.
          </p>
          <p className="detail-body-text" style={{ marginTop: 10 }}>
            All are welcome — no sign-up required on the day. Just bring yourself!
          </p>
        </div>

        {/* Agenda */}
        <div className="detail-section">
          <h2 className="detail-section-title">Agenda</h2>
          <div className="agenda-list">
            {agendaItems.map((a, i) => (
              <div key={i} className="agenda-item">
                <span className="agenda-time">{a.time}</span>
                <div className="agenda-dot" />
                <span className="agenda-text">{a.item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Location card */}
        <div className="detail-section">
          <h2 className="detail-section-title">Location</h2>
          <div className="location-card">
            <div className="location-map-placeholder">
              <MapPin size={28} className="location-map-icon" />
              <span>Map preview</span>
            </div>
            <div className="location-address">
              <MapPin size={14} />
              <span>{event.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="detail-sticky-footer">
        <button
          className={`detail-primary-btn ${registered ? 'btn-registered-full' : ''}`}
          style={!registered ? { background: event.color } : {}}
          onClick={() => setRegistered(p => !p)}
        >
          {registered ? (
            <><CheckCircle2 size={18} /> Registered — Cancel</>
          ) : (
            'Join this event'
          )}
        </button>
        <button className="detail-share-btn">
          <Share2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default EventDetail;
