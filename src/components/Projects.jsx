import { useState } from 'react';
import { projects } from '../data/projects';

const filters = [
  { key: 'all', label: 'All' },
  { key: 'fullstack', label: 'Full Stack' },
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' }
];

export default function Projects({ onViewDetail }) {
  const [active, setActive] = useState('all');

  const filtered = active === 'all' ? projects : projects.filter(p => p.category === active);

  return (
    <section className="section projects" id="projects">
      <div className="container">
        <div className="section-header">
          <p className="section-label">What I've Built</p>
          <h2 className="section-title">My <span className="accent">Projects</span></h2>
          <div className="section-line"></div>
        </div>

        <div className="projects-filter">
          {filters.map(f => (
            <button
              key={f.key}
              className={`filter-btn${active === f.key ? ' active' : ''}`}
              onClick={() => setActive(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filtered.map(p => (
            <div className="project-card" key={p.id} data-category={p.category}>
              <div className="project-image" onClick={() => onViewDetail(p.id)} style={{ cursor: 'pointer' }}>
                <img
                  src={p.image}
                  alt={p.title}
                  onError={e => {
                    e.currentTarget.src = p.placeholder;
                  }}
                />
                <div className="project-overlay">
                  <button
                    className="overlay-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewDetail(p.id);
                    }}
                  >
                    <i className="fas fa-eye"></i> View Details
                  </button>
                </div>
              </div>
              <div className="project-body">
                <div className="project-tags">
                  {p.tags.map(t => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <h3
                  className="project-title"
                  onClick={() => onViewDetail(p.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {p.title}
                </h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-actions">
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm"
                    >
                      <i className="fas fa-external-link-alt"></i> Live Demo
                    </a>
                  )}
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost btn-sm"
                  >
                    <i className="fab fa-github"></i> GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
