import { useEffect, useState, useRef } from 'react'
import resumePdf from '../assets/cbsdan-resume.pdf'
import VisitorCounter from './VisitorCounter'

const Hero = () => {
  const [displayText, setDisplayText] = useState('')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)
  const fullText = 'Full Stack Developer'

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [])

  // 3D tilt effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      setMousePosition({ x, y })
    }

    const heroElement = heroRef.current
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [])

  const socialLinks = [
    { name: "GitHub", url: "https://github.com/cbsdan", icon: "fa-brands fa-github" },
    { name: "LinkedIn", url: "https://linkedin.com/in/daniel-cabasa-519b13376", icon: "fa-brands fa-linkedin" },
    { name: "Facebook", url: "https://facebook.com/daniel.cabasa.14", icon: "fa-brands fa-facebook" },
    { name: "Email", url: "mailto:cabasadaniel1@gmail.com", icon: "fa-solid fa-envelope" }
  ]

  const downloadResume = () => {
    const link = document.createElement('a')
    link.href = resumePdf
    link.download = 'cbsdan-resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section id="hero" className="hero-section" ref={heroRef}>
      <div className="hero-background">
        {/* 3D Floating geometric elements */}
        <div className="hero-3d-elements">
          <div 
            className="floating-cube cube-1"
            style={{
              transform: `translateZ(50px) rotateX(${mousePosition.y * 20}deg) rotateY(${mousePosition.x * 20}deg)`
            }}
          ></div>
          <div 
            className="floating-cube cube-2"
            style={{
              transform: `translateZ(30px) rotateX(${mousePosition.y * -15}deg) rotateY(${mousePosition.x * -15}deg)`
            }}
          ></div>
          <div 
            className="floating-sphere sphere-1"
            style={{
              transform: `translateZ(40px) translateX(${mousePosition.x * 30}px) translateY(${mousePosition.y * 30}px)`
            }}
          ></div>
          <div 
            className="floating-ring ring-1"
            style={{
              transform: `rotateX(60deg) rotateZ(${mousePosition.x * 45}deg)`
            }}
          ></div>
        </div>
        
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
        
        {/* Gradient mesh background */}
        <div className="gradient-mesh"></div>
      </div>

      <div className="hero-content">
        <div className="hero-text">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            <span>Available for opportunities</span>
          </div>
          
          <h1 className="hero-title">
            <span className="greeting">Hi, I'm</span>
            <span className="name glitch-text" data-text="Daniel Cabasa">Daniel Cabasa</span>
            <span className="role">{displayText}<span className="cursor">|</span></span>
          </h1>

          <p className="hero-description">
            I create beautiful, functional, and user-centered digital experiences.
            Passionate about building scalable web applications with modern technologies.
          </p>

          <div className="hero-buttons">
            <button
              className="btn btn-resume btn-3d"
              onClick={downloadResume}
              title="Download my resume"
            >
              <span className="btn-content">
                <i className="fa-solid fa-download"></i>
                <span>Download CV</span>
              </span>
              <span className="btn-glow"></span>
            </button>
            <button
              className="btn btn-secondary btn-contact btn-3d"
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="btn-content">
                <i className="fa-solid fa-paper-plane"></i>
                <span>Let's Talk</span>
              </span>
            </button>
          </div>
          
          {/* Tech stack pills */}
          <div className="tech-stack-preview">
            <span className="tech-pill">React</span>
            <span className="tech-pill">Node.js</span>
            <span className="tech-pill">MongoDB</span>
            <span className="tech-pill">+ more</span>
          </div>
        </div>

        <div className="hero-image">
          <div 
            className="profile-card glass-card"
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y * 10}deg) rotateY(${mousePosition.x * 10}deg)`
            }}
          >
            <div className="card-glow"></div>
            <div className="profile-avatar">
              <div className="avatar-ring">
                <div className="avatar-placeholder">
                  <img src="/logo.png" alt="Profile" className="avatar-image" />
                </div>
              </div>
            </div>
            <div className="profile-info">
              <h3>Software Developer</h3>
              <p>Building digital solutions</p>
            </div>
            <div className="profile-stats">
              <div className="stat">
                <span className="stat-value">3+</span>
                <span className="stat-label">Years</span>
              </div>
              <div className="stat">
                <span className="stat-value">10+</span>
                <span className="stat-label">Projects</span>
              </div>
            </div>
          </div>
          
          {/* Floating tech icons around profile */}
          <div className="floating-tech">
            <div className="tech-icon tech-react" title="React">
              <i className="fa-brands fa-react"></i>
            </div>
            <div className="tech-icon tech-node" title="Node.js">
              <i className="fa-brands fa-node-js"></i>
            </div>
            <div className="tech-icon tech-python" title="Python">
              <i className="fa-brands fa-python"></i>
            </div>
            <div className="tech-icon tech-git" title="Git">
              <i className="fa-brands fa-git-alt"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="social-links">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link glass-button"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <span className="social-icon"><i className={link.icon}></i></span>
            <span className="social-label">{link.name}</span>
          </a>
        ))}
      </div>
      
      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  )
}

export default Hero
