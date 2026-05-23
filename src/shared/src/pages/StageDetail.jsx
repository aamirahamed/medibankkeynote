import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Circle, ChevronRight, Play, RotateCcw } from 'lucide-react';
import { journeyStages } from '../data/journeyData';
import './StageDetail.css';

const StageDetail = () => {
  const navigate = useNavigate();
  const { stageId } = useParams();

  // Local task state (mirrors data, allows toggling status)
  const stage = journeyStages.find(s => s.id === stageId);
  const [taskStatuses, setTaskStatuses] = useState(() => {
    const map = {};
    stage?.tasks.forEach(t => { map[t.id] = t.status; });
    return map;
  });

  if (!stage) {
    navigate('/journey');
    return null;
  }

  const tasks = stage.tasks;
  const total = tasks.length;
  const completed = Object.values(taskStatuses).filter(s => s === 'completed').length;
  const progressPct = total > 0 ? Math.round((completed / total) * 100) : 0;

  const statusConfig = {
    'not-started': { label: 'Not started', labelClass: 'status-todo', ctaLabel: 'Start', ctaClass: 'cta-start' },
    'in-progress': { label: 'In progress', labelClass: 'status-progress', ctaLabel: 'Continue', ctaClass: 'cta-continue' },
    'completed': { label: 'Completed', labelClass: 'status-done', ctaLabel: 'Review', ctaClass: 'cta-done' },
  };

  return (
    <div className="stage-detail-page">
      {/* Header */}
      <div className="stage-detail-header">
        <button className="stage-back-btn" onClick={() => navigate('/journey')}>
          <ArrowLeft size={22} />
        </button>
        <div className="stage-header-content">
          <div className="stage-header-eyebrow">Pre-Arrival · Stage 1</div>
          <h1 className="stage-header-title">{stage.title}</h1>
          <p className="stage-header-sub">{stage.description}</p>
        </div>
      </div>

      {/* Progress */}
      <div className="stage-progress-section">
        <div className="stage-progress-bar-row">
          <span className="stage-progress-count">{completed} of {total} tasks completed</span>
          <span className="stage-progress-pct" style={{ color: 'var(--medibank-red)' }}>{progressPct}%</span>
        </div>
        <div className="stage-progress-track">
          <div className="stage-progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      {/* Task List */}
      <div className="stage-tasks-list">
        {tasks.map((task, index) => {
          const status = taskStatuses[task.id];
          const cfg = statusConfig[status];
          const Icon = task.icon;

          return (
            <div
              key={task.id}
              className={`stage-task-card ${status === 'in-progress' ? 'task-card-progress' : status === 'completed' ? 'task-card-done' : ''}`}
              onClick={() => navigate(`/journey/${stageId}/task/${task.id}`)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && navigate(`/journey/${stageId}/task/${task.id}`)}
            >
              <div className="task-card-left">
                <div className="task-step-number">
                  {status === 'completed' ? (
                    <CheckCircle2 size={22} className="task-check-icon" />
                  ) : (
                    <span className="task-number-badge">{index + 1}</span>
                  )}
                </div>
                <div
                  className="task-icon-circle"
                  style={{ background: task.iconBg, color: task.iconColor }}
                >
                  <Icon size={20} />
                </div>
              </div>

              <div className="task-card-body">
                <div className="task-card-header-row">
                  <h3 className={`task-card-title ${status === 'completed' ? 'task-title-strikethrough' : ''}`}>
                    {task.title}
                  </h3>
                  <ChevronRight size={18} className="task-card-chevron" />
                </div>
                <p className="task-card-desc">{task.description}</p>

                <div className="task-card-footer">
                  <span className={`task-status-label ${cfg.labelClass}`}>
                    {status === 'in-progress' && <span className="status-dot" />}
                    {cfg.label}
                  </span>
                  <button
                    className={`task-action-btn ${cfg.ctaClass}`}
                    onClick={e => {
                      e.stopPropagation();
                      navigate(`/journey/${stageId}/task/${task.id}`);
                    }}
                  >
                    {status === 'completed' ? (
                      <><RotateCcw size={13} /> {cfg.ctaLabel}</>
                    ) : status === 'in-progress' ? (
                      <><Play size={13} /> {cfg.ctaLabel}</>
                    ) : (
                      <><Play size={13} /> {cfg.ctaLabel}</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="stage-bottom-tip">
        <p>Complete all tasks to unlock <strong>Arrival (First 30 Days)</strong> 🇦🇺</p>
      </div>
    </div>
  );
};

export default StageDetail;
