import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2, Circle, ChevronDown, ChevronUp,
  ArrowRight, Sparkles, ArrowUpRight, Shield
} from 'lucide-react';
import { journeyStages } from '../data/journeyData';
import './Journey.css';

// ─── Flat list of all tasks per stage for progress counting ───────────────────
const flatTasks = (stage) => stage.sections.flatMap(s => s.tasks);

const Journey = () => {
  const navigate = useNavigate();

  // ── Stage toggle (active stage tab) ──────────────────────────────────────
  const [activeStageId, setActiveStageId] = useState('pre-arrival');

  // ── Completion state: { taskId: boolean } ────────────────────────────────
  const [completed, setCompleted] = useState({});
  const toggleTask = (id) => setCompleted(prev => ({ ...prev, [id]: !prev[id] }));

  // ── Section collapse state: { sectionId: boolean } ───────────────────────
  const [collapsed, setCollapsed] = useState({});
  const toggleSection = (id) => setCollapsed(prev => ({ ...prev, [id]: !prev[id] }));

  const currentStage = journeyStages.find(s => s.id === activeStageId);
  const tasks = useMemo(() => flatTasks(currentStage), [currentStage]);
  const completedCount = tasks.filter(t => completed[t.id]).length;
  const pct = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  // ── "What to do next" — first incomplete task across all sections ─────────
  const nextTask = tasks.find(t => !completed[t.id]);

  return (
    <div className="journey-page">

      {/* ── Header ── */}
      <div className="journey-header">
        <div className="journey-header-top">
          <h1 className="journey-header-logo">medibank</h1>
        </div>
        <div className="journey-header-content">
          <div className="journey-header-eyebrow">
            <Sparkles size={13} />
            <span>Your guided journey</span>
          </div>
          <h2 className="journey-header-title">Your journey</h2>
          <p className="journey-header-sub">Step-by-step support from pre-arrival to life in Australia</p>
        </div>
      </div>

      {/* ── Stage Tabs ── */}
      <div className="journey-stage-tabs">
        {journeyStages.map(stage => (
          <button
            key={stage.id}
            className={`journey-tab ${activeStageId === stage.id ? 'tab-active' : ''}`}
            style={activeStageId === stage.id ? { '--tab-color': stage.color } : {}}
            onClick={() => { setActiveStageId(stage.id); }}
          >
            <span className="tab-emoji">{stage.emoji}</span>
            {stage.title}
          </button>
        ))}
      </div>

      <div className="journey-content">

        {/* ── Progress Card ── */}
        <div className="journey-progress-card" style={{ '--stage-color': currentStage.color }}>
          <div className="progress-card-top">
            <div>
              <p className="progress-card-title">{currentStage.title} progress</p>
              <p className="progress-card-sub">{completedCount} of {tasks.length} tasks complete</p>
            </div>
            <span className="progress-card-pct">{pct}%</span>
          </div>
          <div className="journey-progress-track">
            <div className="journey-progress-fill" style={{ width: `${pct}%`, background: currentStage.color }} />
          </div>
        </div>

        {/* ── What to do next ── */}
        {nextTask && (
          <div className="journey-next-card">
            <div className="next-card-eyebrow">
              <Sparkles size={13} /> What to do next
            </div>
            <h3 className="next-card-title">{nextTask.title}</h3>
            <p className="next-card-detail">{nextTask.detail.slice(0, 80)}…</p>
            <button
              className="next-card-cta"
              onClick={() => navigate(`/journey/task/${nextTask.id}`)}
            >
              View task <ArrowRight size={14} />
            </button>
          </div>
        )}

        {/* ── Sections ── */}
        {currentStage.sections.map(section => {
          const isClosed = collapsed[section.id];
          const sectionDone = section.tasks.filter(t => completed[t.id]).length;

          return (
            <div key={section.id} className={`journey-section-card ${section.isOvhcSection ? 'ovhc-section' : ''}`}>
              {/* Section Header */}
              <button className="section-header" onClick={() => toggleSection(section.id)}>
                <div className="section-header-left">
                  {section.isOvhcSection && <Shield size={16} className="section-ovhc-icon" />}
                  <span className="section-title">{section.title}</span>
                  <span className="section-count">{sectionDone}/{section.tasks.length}</span>
                </div>
                {isClosed ? <ChevronDown size={18} className="section-chevron" /> : <ChevronUp size={18} className="section-chevron" />}
              </button>

              {/* Task List */}
              {!isClosed && (
                <div className="section-task-list">
                  {section.tasks.map((task, idx) => {
                    const isDone = !!completed[task.id];

                    return (
                      <div key={task.id}>
                        {idx > 0 && <div className="task-divider" />}
                        <div className={`task-row ${isDone ? 'task-done' : ''} ${task.isOvhcTask ? 'task-ovhc' : ''}`}>
                          <button
                            className="task-checkbox"
                            onClick={() => toggleTask(task.id)}
                            aria-label={isDone ? 'Mark incomplete' : 'Mark complete'}
                          >
                            {isDone
                              ? <CheckCircle2 size={22} className="check-done" />
                              : <Circle size={22} className="check-empty" />
                            }
                          </button>
                          <button className="task-body" onClick={() => navigate(`/journey/task/${task.id}`)}>
                            <span className={`task-title ${isDone ? 'task-title-done' : ''}`}>{task.title}</span>
                            {task.isOvhcTask && (
                              <span className="task-ovhc-pill">OVHC Transition</span>
                            )}
                          </button>
                          <button className="task-expand-btn" onClick={() => navigate(`/journey/task/${task.id}`)}>
                            <ArrowRight size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default Journey;
