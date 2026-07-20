import { useEffect, useRef, useState } from 'react'

const About = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }
    return () => observer.disconnect()
  }, [])

  const highlights = [
    {
      icon: 'fa-solid fa-users',
      title: 'Team Leader',
      description: 'Experienced in leading dev teams and applying Agile/Scrum practices',
      color: 'var(--primary)',
    },
    {
      icon: 'fa-solid fa-rocket',
      title: 'Full Stack',
      description: 'Building end-to-end solutions from frontend to backend and mobile',
      color: 'var(--secondary)',
    },
    {
      icon: 'fa-solid fa-brain',
      title: 'AI Enthusiast',
      description: 'Interested in integrating machine learning features into applications',
      color: 'var(--accent)',
    },
  ]

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">About Me</h2>
        </div>

        <div className={`about-content ${isVisible ? 'visible' : ''}`}>
          {/* Left side - Image and highlights */}
          {/* <div className="about-visual">
            <div className="about-image-wrapper">
              <div className="about-image glass-card">
                <div className="image-glow"></div>
                <img src="/my-solo-pic.jpg" alt="Daniel Cabasa" className="profile-image" />
                <div className="image-overlay"></div>
              </div>

              <div className="experience-badge glass-card">
                <div className="badge-content">
                  <span className="badge-number">10+</span>
                  <span className="badge-text">
                    Projects <br />
                    Completed
                  </span>
                </div>
              </div>
            </div>

            <div className="about-highlights">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="highlight-card glass-card"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="highlight-icon" style={{ background: item.color }}>
                    <i className={item.icon}></i>
                  </div>
                  <div>
                    <h4 className="highlight-title">{item.title}</h4>
                    <p className="highlight-description">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div> */}

          {/* Right side - Text content */}
          <div className="about-text">
            <div className="about-intro">
              <h3>
                Hello! I'm a passionate <span className="highlight-text">Full Stack Developer</span>
              </h3>
              <div className="about-description">
                <p>
                  Based in Taguig City, Philippines, I specialize in building functional web and mobile
                  applications using the MERN stack. I'm experienced in leading development teams and
                  delivering complete systems from e-commerce platforms to collaboration tools.
                </p>
                <p>
                  My interests extend to integrating machine learning features and blockchain technology.
                  I enjoy the entire development lifecycle, from planning and designing architecture to
                  solving complex problems and seeing the final product come to life.
                </p>
              </div>
            </div>

            {/* Education Section */}
            <div className="education-section glass-card">
              <div className="education-header">
                <div className="education-icon">
                  <i className="fa-solid fa-graduation-cap"></i>
                </div>
                <h4>Education</h4>
              </div>
              <div className="education-content">
                <h5 className="degree-title">Bachelor of Science in Information Technology</h5>
                <p className="institution">
                  <i className="fa-solid fa-building-columns"></i>
                  Technological University of the Philippines - Taguig
                </p>
                <p className="institution" style={{ marginBottom: '8px' }}>
                  <i className="fa-solid fa-calendar"></i>
                  September 2022 – September 2026
                </p>
                <p className="institution" style={{ marginBottom: '8px' }}>
                  <i className="fa-solid fa-award"></i>
                  Dean's and President's Lister
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
