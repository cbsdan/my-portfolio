const SkillCard = ({ category, skills, icon, index }) => (
  <div className="skill-card" style={{ animationDelay: `${index * 0.1}s` }}>
    <div className="skill-header">
      <div className="skill-icon">{icon}</div>
      <h3>{category}</h3>
    </div>
    <div className="skill-list">
      {skills.map((skill, idx) => (
        <div key={idx} className="skill-item">
          <span className="skill-name">{skill}</span>
          <div className="skill-bar">
            <div 
              className="skill-progress" 
              style={{ 
                animationDelay: `${(index * 0.1) + (idx * 0.05)}s`,
                '--width': `${Math.floor(Math.random() * 30) + 70}%`
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  </div>
)

const Skills = () => {
  const skillCategories = [
    {
      category: "Frontend",
      icon: "🎨",
      skills: ["React", "HTML/CSS", "JavaScript", "Bootstrap"]
    },
    {
      category: "Backend", 
      icon: "⚙️",
      skills: ["Node.js", "Python", "Express.js", "Motoko"]
    },
    {
      category: "Database",
      icon: "🗄️", 
      skills: ["MongoDB", "MySQL", "Firebase"]
    },
    {
      category: "Tools & Cloud",
      icon: "☁️",
      skills: ["Git", "Google Cloud", "Vercel", "Postman", "Figma"]
    }
  ]

  const certifications = [
    { name: "iThink Hackathon PBW 2025", issuer: "ICP PH", year: "2025" },
    { name: "Web Design Certification", issuer: "freecodecamp", year: "2022" },
  ]

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Technical Skills</h2>
          <p className="section-subtitle">Technologies I work with</p>
        </div>
        
        <div className="skills-content">
          <div className="skills-grid">
            {skillCategories.map((category, index) => (
              <SkillCard 
                key={category.category}
                category={category.category}
                skills={category.skills}
                icon={category.icon}
                index={index}
              />
            ))}
          </div>
          
          <div className="skills-extras">
            <div className="certifications">
              <h3>Certifications</h3>
              <div className="cert-list">
                {certifications.map((cert, index) => (
                  <div key={index} className="cert-item">
                    <div className="cert-info">
                      <h4>{cert.name}</h4>
                      <p>{cert.issuer} • {cert.year}</p>
                    </div>
                    <div className="cert-badge">✓</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="learning">
              <h3>Currently Learning</h3>
              <div className="learning-items">
                <div className="learning-item">
                  <span className="learning-icon">🤖</span>
                  <span>Machine Learning</span>
                </div>
                <div className="learning-item">
                  <span className="learning-icon">🔗</span>
                  <span>Blockchain</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
