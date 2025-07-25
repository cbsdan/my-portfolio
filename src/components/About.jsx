const About = () => {
  const stats = [
    { number: '3+', label: 'Years Experience' },
    { number: '10+', label: 'Projects Completed' },
  ]

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">Get to know me better</p>
        </div>

        <div className="about-content">
          <div className="about-text">
            <h3>Hello! I'm a passionate Full Stack Developer</h3>
            <p>
              I specialize in creating exceptional digital experiences that are fast,
              accessible, visually appealing, and responsive. My goal is to always
              build applications that provide meaningful and relevant experiences to users.
            </p>
            <p>
              I have experience working with modern technologies and frameworks,
              always eager to learn new tools and techniques to improve my craft.
              I enjoy the entire process of development, from planning and designing
              to solving complex problems and seeing the final product come to life.
            </p>

            <div className="about-highlights">
              <div className="highlight">
                <span className="highlight-icon">🎯</span>
                <div>
                  <h4>Problem Solver</h4>
                  <p>I love tackling complex challenges and finding elegant solutions</p>
                </div>
              </div>
              <div className="highlight">
                <span className="highlight-icon">🚀</span>
                <div>
                  <h4>Performance Focused</h4>
                  <p>Building fast, optimized applications is my priority</p>
                </div>
              </div>
              <div className="highlight">
                <span className="highlight-icon">🎨</span>
                <div>
                  <h4>Design Minded</h4>
                  <p>I believe great functionality should come with great design</p>
                </div>
              </div>
            </div>
          </div>

          <div className="about-stats">
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="about-image">
              <div className="image-placeholder">
                <img src="/my-solo-pic.jpg" alt="Profile" className="profile-image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
