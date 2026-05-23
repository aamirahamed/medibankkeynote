import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle2, Circle, Lightbulb, ExternalLink, ArrowRight, Shield } from 'lucide-react';
import { taskDetails } from '../data/taskDetailData';
import './TaskDetail.css';

const TaskDetail = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});

  const data = taskDetails[taskId];

  useEffect(() => {
    const container = document.querySelector('.page-container');
    if (container) {
      container.scrollTo(0, 0);
    }
  }, [taskId]);

  if (!data) {
    return (
      <div className="task-detail-error">
        <h2>Task not found</h2>
        <button onClick={() => navigate('/journey')}>Back to Journey</button>
      </div>
    );
  }

  const toggleChecklist = (index) => {
    setCheckedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const isOvhcTask = taskId === 'si-18';

  return (
    <div className="task-detail-page">
      {/* Header */}
      <div className="task-detail-header">
        <button className="task-back-btn" onClick={() => navigate('/journey')}>
          <ArrowLeft size={24} />
        </button>
        <div className="task-header-content">
          {isOvhcTask && <div className="ovhc-badge"><Shield size={14} /> Transition Task</div>}
          <h1 className="task-detail-title">{data.title}</h1>
          <p className="task-summary">{data.summary}</p>
          <div className="task-meta">
            <span className="meta-item">
              <Clock size={16} /> {data.timeToComplete}
            </span>
            <span className={`meta-tag diff-${data.difficultyLevel.toLowerCase()}`}>
              {data.difficultyLevel}
            </span>
          </div>
        </div>
      </div>

      <div className="task-content">
        {/* Why it matters */}
        <section className="task-section why-matters-section">
          <h2>Why this matters</h2>
          <p>{data.whyItMatters}</p>
        </section>

        {/* Step by step */}
        <section className="task-section step-by-step-section">
          <h2>Step-by-step guide</h2>
          <div className="steps-container">
            {data.stepByStep.map((step, index) => (
              <div key={index} className="step-item">
                <div className="step-number">{index + 1}</div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Practical Tips */}
        <section className="task-section tips-section">
          <h2><Lightbulb size={20} className="section-icon text-yellow" /> Practical Tips</h2>
          <ul className="tips-list">
            {data.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </section>

        {/* What Most Students Do */}
        <section className="task-section insight-section">
          <h2>Behavioural Insight</h2>
          <div className="insight-card">
            <p>"{data.whatMostStudentsDo}"</p>
          </div>
        </section>

        {/* Resources */}
        {data.resources && data.resources.length > 0 && (
          <section className="task-section resources-section">
            <h2>Resources & Links</h2>
            <div className="resources-list">
              {data.resources.map((res, index) => (
                <a key={index} href={res.url} target="_blank" rel="noopener noreferrer" className="resource-item">
                  <span>{res.name}</span>
                  <ExternalLink size={16} />
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Checklist */}
        <section className="task-section checklist-section">
          <h2>Quick Checklist</h2>
          <div className="checklist-container">
            {data.checklist.map((item, index) => {
              const isChecked = checkedItems[index];
              return (
                <button
                  key={index}
                  className={`checklist-item ${isChecked ? 'checked' : ''}`}
                  onClick={() => toggleChecklist(index)}
                >
                  <div className="checklist-icon">
                    {isChecked ? <CheckCircle2 size={24} className="text-green" /> : <Circle size={24} className="text-gray" />}
                  </div>
                  <span className="checklist-text">{item}</span>
                </button>
              );
            })}
          </div>
        </section>
      </div>

      {/* Footer CTA */}
      <div className="task-footer">
        {isOvhcTask ? (
          <button 
            className="task-cta ovhc-cta-btn" 
            onClick={() => navigate('/ovhc-transition')}
          >
            <Shield size={20} /> Keep your benefits <ArrowRight size={20} />
          </button>
        ) : (
          <button 
            className={`task-cta ${isCompleted ? 'completed' : ''}`}
            onClick={() => {
              setIsCompleted(!isCompleted);
              // In a real app, this would update global state and redirect back
              setTimeout(() => navigate('/journey'), 600);
            }}
          >
            {isCompleted ? (
              <><CheckCircle2 size={20} /> Marked as complete</>
            ) : (
              'Mark as complete'
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskDetail;
