import { useEffect, useState, useRef } from 'react'
import resumePdf from '../assets/DOCabasa_CV.pdf'

const Hero = () => {
  const [displayText, setDisplayText] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)

  const roles = ['Full Stack Developer', 'MERN Stack Developer', 'Mobile App Developer', 'Software Engineer']

  // Typing effect with multiple roles
  useEffect(() => {
    const currentRole = roles[roleIndex]
    let timeout

    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1))
        }, 80)
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000)
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, 40)
      } else {
        setIsDeleting(false)
        setRoleIndex((prev) => (prev + 1) % roles.length)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, roleIndex])

  // 3D tilt effect
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

  const downloadResume = () => {
    const link = document.createElement('a')
    link.href = resumePdf
    link.download = 'DOCabasa_CV.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section id="hero" className="hero-section" ref={heroRef}>
      {/* 3D Floating geometric elements */}
      <div className="hero-3d-elements">
        <div
          className="floating-cube cube-1"
          style={{
            transform: `translateZ(50px) rotateX(${mousePosition.y * 20}deg) rotateY(${mousePosition.x * 20}deg)`,
          }}
        ></div>
        <div
          className="floating-cube cube-2"
          style={{
            transform: `translateZ(30px) rotateX(${mousePosition.y * -15}deg) rotateY(${mousePosition.x * -15}deg)`,
          }}
        ></div>
        <div
          className="floating-sphere sphere-1"
          style={{
            transform: `translateZ(40px) translateX(${mousePosition.x * 30}px) translateY(${mousePosition.y * 30}px)`,
          }}
        ></div>
        <div
          className="floating-ring ring-1"
          style={{
            transform: `rotateX(60deg) rotateZ(${mousePosition.x * 45}deg)`,
          }}
        ></div>
      </div>

      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="greeting">Hi, I'm</span>
            <span className="name">Daniel Cabasa</span>
            <span className="role">
              {displayText}
              <span className="cursor">|</span>
            </span>
          </h1>

          <p className="hero-description">
            A full-stack developer with hands-on experience in MERN stack and mobile application development.
            Experienced in leading teams and delivering functional web and mobile systems, focused on building
            scalable, user-centered software.
          </p>

          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={downloadResume} title="Download my resume">
              <i className="fa-solid fa-download"></i>
              <span>Download CV</span>
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            >
              <i className="fa-solid fa-paper-plane"></i>
              <span>Let's Talk</span>
            </button>
          </div>

        </div>

        <div className="hero-visual">
          <div
            className="profile-card glass-card"
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y * 10}deg) rotateY(${mousePosition.x * 10}deg)`,
            }}
          >
            <div className="card-glow"></div>
            <div className="profile-avatar">
              <div className="avatar-ring">
                <div className="avatar-placeholder">
                  <img src="/logo.png" alt="Daniel Cabasa" className="avatar-image" />
                </div>
              </div>
            </div>
            <div className="profile-info">
              <h3>Full Stack Developer</h3>
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

          {/* Floating tech icons */}
          <div className="floating-tech">
            <div className="tech-icon" title="React">
              <i className="fa-brands fa-react"></i>
            </div>
            <div className="tech-icon" title="Node.js">
              <i className="fa-brands fa-node-js"></i>
            </div>
            <div className="tech-icon" title="Python">
              <i className="fa-brands fa-python"></i>
            </div>
            <div className="tech-icon" title="Git">
              <i className="fa-brands fa-git-alt"></i>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Hero
