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
          style={{ animationDelay: `${index * 0.1 + idx * 0.05}s` }}
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
  const skillCategories = [
    {
      category: 'Frontend',
      icon: <i className="fa-solid fa-palette"></i>,
      skills: [
        { name: 'React', icon: 'fa-brands fa-react' },
        { name: 'React Native', icon: 'fa-brands fa-react' },
        { name: 'JavaScript', icon: 'fa-brands fa-js' },
        { name: 'HTML5', icon: 'fa-brands fa-html5' },
        { name: 'CSS3', icon: 'fa-brands fa-css3-alt' },
        { name: 'jQuery', icon: 'fa-solid fa-code' },
        { name: 'Bootstrap', icon: 'fa-brands fa-bootstrap' },
      ],
    },
    {
      category: 'Backend',
      icon: <i className="fa-solid fa-server"></i>,
      skills: [
        { name: 'Node.js', icon: 'fa-brands fa-node-js' },
        { name: 'Express.js', icon: 'fa-brands fa-node' },
        { name: 'PHP', icon: 'fa-brands fa-php' },
        { name: 'Laravel', icon: 'fa-brands fa-laravel' },
        { name: 'Python', icon: 'fa-brands fa-python' },
        { name: 'Motoko', icon: 'fa-solid fa-infinity' },
      ],
    },
    {
      category: 'Database',
      icon: <i className="fa-solid fa-database"></i>,
      skills: [
        { name: 'MongoDB', icon: 'fa-solid fa-leaf' },
        { name: 'MySQL', icon: 'fa-solid fa-database' },
        { name: 'Firebase', icon: 'fa-solid fa-fire' },
      ],
    },
    {
      category: 'Tools & Platforms',
      icon: <i className="fa-solid fa-cloud"></i>,
      skills: [
        { name: 'Git', icon: 'fa-brands fa-git-alt' },
        { name: 'GitHub', icon: 'fa-brands fa-github' },
        { name: 'VS Code', icon: 'fa-solid fa-code' },
        { name: 'Postman', icon: 'fa-solid fa-paper-plane' },
        { name: 'Insomnia', icon: 'fa-solid fa-moon' },
        { name: 'Figma', icon: 'fa-brands fa-figma' },
      ],
    },
  ]

  const certifications = [
    {
      name: 'iThink Hackathon PBW 2025',
      issuer: 'ICP Philippines',
      year: '2025',
      icon: 'fa-solid fa-trophy',
    },
    {
      name: 'Introduction to Generative AI & Prompt Engineering',
      issuer: 'Microcredential',
      year: '2025',
      icon: 'fa-solid fa-certificate',
    },
    {
      name: 'Responsive Web Design',
      issuer: 'freeCodeCamp',
      year: '2022',
      icon: 'fa-solid fa-certificate',
    },
  ]

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <div className="section-header">
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

        </div>
      </div>
    </section>
  )
}

export default Skills
