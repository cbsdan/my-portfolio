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
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Calculate years of experience from September 2022
  const calculateYearsOfExperience = () => {
    const startDate = new Date(2022, 8, 1); // September 2022 (month is 0-indexed)
    const today = new Date();
    const yearsDifference = today.getFullYear() - startDate.getFullYear();
    const monthDifference = today.getMonth() - startDate.getMonth();
    
    // If we haven't reached the anniversary month yet, subtract 1 year
    const years = monthDifference < 0 ? yearsDifference - 1 : yearsDifference;
    
    // Return years with + if there are additional months
    return years > 0 ? `${years}+` : '0+';
  };

  const stats = [
    { number: calculateYearsOfExperience(), label: 'Years Experience', icon: 'fa-solid fa-calendar-check' },
    { number: '10+', label: 'Projects Completed', icon: 'fa-solid fa-folder-open' },
  ]

  const highlights = [
    {
      icon: 'fa-solid fa-bullseye',
      title: 'Problem Solver',
      description: 'I love tackling complex challenges and finding elegant solutions',
      color: 'var(--primary-color)'
    },
    {
      icon: 'fa-solid fa-rocket',
      title: 'Performance Focused',
      description: 'Building fast, optimized applications is my priority',
      color: 'var(--secondary-color)'
    },
    {
      icon: 'fa-solid fa-palette',
      title: 'Design Minded',
      description: 'I believe great functionality should come with great design',
      color: 'var(--accent-color)'
    }
  ]

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">
            <i className="fa-solid fa-user"></i> Get to know me
          </span>
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">Passionate about creating impactful digital experiences</p>
        </div>

        <div className={`about-content ${isVisible ? 'visible' : ''}`}>
          {/* Left side - Image and stats */}
          <div className="about-visual">
            <div className="about-image-wrapper">
              <div className="about-image glass-card">
                <div className="image-glow"></div>
                <img src="/my-solo-pic.jpg" alt="Daniel Cabasa" className="profile-image" />
                <div className="image-overlay"></div>
              </div>
              
              {/* Floating experience badge */}
              <div className="experience-badge glass-card">
                <div className="badge-content">
                  <span className="badge-number">10+</span>
                  <span className="badge-text">Projects <br/>Completed</span>
                </div>
              </div>
            </div>

            {/* Highlights */}
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
                  <h4 className="highlight-title">{item.title}</h4>
                  <p className="highlight-description">{item.description}</p>
                </div>
              ))}
            </div>
            {/* Stats grid */}
            {/* <div className="stats-grid">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="stat-card glass-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="stat-icon">
                    <i className={stat.icon}></i>
                  </div>
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div> */}
          </div>

          {/* Right side - Text content */}
          <div className="about-text">
            <div className="about-intro">
              <h3>Hello! I'm a passionate <span className="highlight-text">Full Stack Developer</span></h3>
              <p>
                Based in the Philippines, I specialize in creating exceptional digital experiences 
                that are fast, accessible, visually appealing, and responsive. My goal is to always
                build applications that provide meaningful and relevant experiences to users.
              </p>
              <p>
                I have experience working with modern technologies and frameworks,
                always eager to learn new tools and techniques to improve my craft.
                I enjoy the entire process of development, from planning and designing
                to solving complex problems and seeing the final product come to life.
              </p>
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
                <h5 className="degree-title">Bachelor of Science in Information Technology (BSIT)</h5>
                <p className="institution">
                  <i className="fa-solid fa-building-columns"></i>
                  Technological University of the Philippines - Taguig
                </p>
                <div className="honors-badge">
                  <i className="fa-solid fa-award"></i>
                  <span>Dean's Lister and President's Lister (2022-Present)</span>
                </div>
              </div>
            </div>

            {/* Fun facts or interests */}
            {/* <div className="about-interests">
              <h4>When I'm not coding, you'll find me:</h4>
              <div className="interests-list">
                <span className="interest-tag"><i className="fa-solid fa-gamepad"></i> Gaming</span>
                <span className="interest-tag"><i className="fa-solid fa-book"></i> Learning</span>
                <span className="interest-tag"><i className="fa-solid fa-music"></i> Listening to Music</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
