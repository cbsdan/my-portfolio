const SkillCard = ({ category, skills, icon, index }) => (
  <div className="skill-card glass-card" style={{ animationDelay: `${index * 0.1}s` }}>
    <div className="skill-card-glow"></div>
    <div className="skill-header">
      <div className="skill-icon">{icon}</div>
      <h3>{category}</h3>
    </div>
    <div className="skill-tags">
      {skills.map((skill, idx) => (
        <div 
          key={idx} 
          className="skill-tag"
          style={{ animationDelay: `${(index * 0.1) + (idx * 0.05)}s` }}
        >
          <span className="skill-tag-icon">
            <i className={skill.icon}></i>
          </span>
          <span className="skill-tag-name">{skill.name}</span>
        </div>
      ))}
    </div>
  </div>
)

const Skills = () => {
  // Based on resume: React, HTML/CSS, JavaScript, Bootstrap, Node.js, Express.js, Python, Motoko
  // MongoDB, MySQL, Firebase, Git, Google Cloud, Vercel, Postman, Figma
  const skillCategories = [
    {
      category: "Frontend",
      icon: <i className="fa-solid fa-palette"></i>,
      skills: [
        { name: "React", icon: "fa-brands fa-react" },
        { name: "JavaScript", icon: "fa-brands fa-js" },
        { name: "HTML5", icon: "fa-brands fa-html5" },
        { name: "CSS3", icon: "fa-brands fa-css3-alt" },
        { name: "Bootstrap", icon: "fa-brands fa-bootstrap" }
      ]
    },
    {
      category: "Backend", 
      icon: <i className="fa-solid fa-server"></i>,
      skills: [
        { name: "Node.js", icon: "fa-brands fa-node-js" },
        { name: "Express.js", icon: "fa-brands fa-node" },
        { name: "Python", icon: "fa-brands fa-python" },
        { name: "Motoko", icon: "fa-solid fa-infinity" }
      ]
    },
    {
      category: "Database",
      icon: <i className="fa-solid fa-database"></i>, 
      skills: [
        { name: "MongoDB", icon: "fa-solid fa-leaf" },
        { name: "MySQL", icon: "fa-solid fa-database" },
        { name: "Firebase", icon: "fa-solid fa-fire" }
      ]
    },
    {
      category: "Tools & Cloud",
      icon: <i className="fa-solid fa-cloud"></i>,
      skills: [
        { name: "Git", icon: "fa-brands fa-git-alt" },
        { name: "GitHub", icon: "fa-brands fa-github" },
        { name: "Google Cloud", icon: "fa-brands fa-google" },
        { name: "Vercel", icon: "fa-solid fa-triangle-exclamation" },
        { name: "Postman", icon: "fa-solid fa-paper-plane" },
        { name: "Figma", icon: "fa-brands fa-figma" }
      ]
    }
  ]

  const certifications = [
    { name: "iThink Hackathon PBW 2025", issuer: "ICP Philippines", year: "2025", icon: "fa-solid fa-trophy" },
    { name: "Responsive Web Design", issuer: "freeCodeCamp", year: "2022", icon: "fa-solid fa-certificate" },
  ]
  
  const currentlyLearning = [
    { name: "Machine Learning", icon: "fa-solid fa-brain", progress: 45 },
    { name: "Blockchain/Web3", icon: "fa-solid fa-link", progress: 60 },
    { name: "Cloud Architecture", icon: "fa-solid fa-cloud", progress: 35 }
  ]

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">
            <i className="fa-solid fa-code"></i> What I Know
          </span>
          <h2 className="section-title">Technical Skills</h2>
          <p className="section-subtitle">Technologies and tools I work with to bring ideas to life</p>
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
            <div className="certifications glass-card">
              <h3><i className="fa-solid fa-award"></i> Certifications & Achievements</h3>
              <div className="cert-list">
                {certifications.map((cert, index) => (
                  <div key={index} className="cert-item">
                    <div className="cert-icon">
                      <i className={cert.icon}></i>
                    </div>
                    <div className="cert-info">
                      <h4>{cert.name}</h4>
                      <p>{cert.issuer} • {cert.year}</p>
                    </div>
                    <div className="cert-badge">
                      <i className="fa-solid fa-check-circle"></i>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="learning glass-card">
              <h3><i className="fa-solid fa-rocket"></i> Currently Learning</h3>
              <div className="learning-items">
                {currentlyLearning.map((item, index) => (
                  <div key={index} className="learning-item">
                    <div className="learning-icon">
                      <i className={item.icon}></i>
                    </div>
                    <div className="learning-info">
                      <span className="learning-name">{item.name}</span>
                      <div className="learning-progress-bar">
                        <div 
                          className="learning-progress" 
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
