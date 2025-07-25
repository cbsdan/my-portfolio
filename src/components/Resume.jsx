const Resume = () => {
  const experience = [
    {
      title: "Senior Full Stack Developer",
      company: "Tech Company",
      period: "2023 - Present",
      description: "Led development of scalable web applications using React and Node.js"
    },
    {
      title: "Frontend Developer",
      company: "Startup Inc",
      period: "2022 - 2023", 
      description: "Built responsive user interfaces and improved user experience"
    }
  ]

  const education = [
    {
      degree: "Bachelor of Computer Science",
      school: "University Name",
      period: "2018 - 2022",
      description: "Focused on software engineering and web development"
    }
  ]

  return (
    <section id="resume" className="resume-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Resume</h2>
          <p className="section-subtitle">My professional journey</p>
        </div>
        
        <div className="resume-content">
          <div className="resume-timeline">
            <div className="timeline-section">
              <h3 className="timeline-title">
                <span className="timeline-icon">💼</span>
                Experience
              </h3>
              {experience.map((exp, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <h4>{exp.title}</h4>
                    <h5>{exp.company}</h5>
                    <span className="timeline-period">{exp.period}</span>
                    <p>{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="timeline-section">
              <h3 className="timeline-title">
                <span className="timeline-icon">🎓</span>
                Education
              </h3>
              {education.map((edu, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <h4>{edu.degree}</h4>
                    <h5>{edu.school}</h5>
                    <span className="timeline-period">{edu.period}</span>
                    <p>{edu.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="resume-download">
            <div className="download-card">
              <div className="pdf-preview">
                <div className="pdf-placeholder">
                  <span className="pdf-icon">📄</span>
                  <p>Resume Preview</p>
                  <small>Upload your PDF to /public/resume.pdf</small>
                </div>
                <iframe 
                  src="/resume.pdf" 
                  className="pdf-viewer"
                  title="Resume PDF"
                  onError={(e) => e.target.style.display = 'none'}
                />
              </div>
              
              <div className="download-actions">
                <a 
                  href="/resume.pdf" 
                  download="YourName_Resume.pdf" 
                  className="btn btn-primary"
                >
                  <span>📥</span> Download PDF
                </a>
                <a 
                  href="/resume.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-secondary"
                >
                  <span>👁️</span> View Full Screen
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Resume
