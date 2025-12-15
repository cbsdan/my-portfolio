import { useEffect, useState } from 'react'
import resumePdf from '../assets/cbsdan-resume.pdf'

const Hero = () => {
  const [displayText, setDisplayText] = useState('')
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
    <section id="hero" className="hero-section">
      <div className="hero-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>

      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="greeting">Hi, I'm</span>
            <span className="name">Daniel Cabasa</span>
            <span className="role">{displayText}<span className="cursor">|</span></span>
          </h1>

          <p className="hero-description">
            I create beautiful, functional, and user-centered digital experiences.
            Passionate about building scalable web applications with modern technologies.
          </p>

          <div className="hero-buttons">
            <button
              className="btn btn-resume"
              onClick={downloadResume}
              title="Download my resume"
            >
              <i class="fa-solid fa-download"></i> &nbsp; Download Curriculum Vitae
            </button>
            <button
              className="btn btn-secondary btn-contact"
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            >
              <i class="fa-solid fa-phone"></i> &nbsp; Get In Touch
            </button>

          </div>
        </div>

        <div className="hero-image">
          <div className="profile-card">
            <div className="profile-avatar">
              <div className="avatar-placeholder">
                <span>
                  <img src="/logo.png" alt="Profile" className="avatar-image" />
                </span>
              </div>
            </div>
            <div className="profile-info">
              <h3>Software Developer</h3>
              <p>Building digital solutions</p>
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
            className="social-link"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <span className="social-icon"><i className={link.icon}></i></span>
            <span className="social-label">{link.name}</span>
          </a>
        ))}
      </div>

    </section>
  )
}

export default Hero
