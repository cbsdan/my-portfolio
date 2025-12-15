import { useState, useEffect } from 'react'
import { useTheme } from '../contexts/ThemeContext'

const Navbar = ({ activeSection, setActiveSection }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isDarkMode, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'hero', label: 'Home', icon: 'fa-solid fa-home' },
    { id: 'projects', label: 'Projects', icon: 'fa-solid fa-folder' },
    { id: 'about', label: 'About', icon: 'fa-solid fa-user', hideOnMobile: true },
    { id: 'skills', label: 'Skills', icon: 'fa-solid fa-code', hideOnMobile: true },
    { id: 'contact', label: 'Contact', icon: 'fa-solid fa-envelope' }
  ]

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setActiveSection(sectionId)
    setIsMobileMenuOpen(false)
  }

  // Show theme toggle when scrolled down (not at top) or when not on hero section
  const showThemeToggle = isScrolled || activeSection !== 'hero'

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${activeSection === 'hero' ? 'on-hero' : ''}`}>
      <div className="nav-brand" onClick={() => scrollToSection('hero')}>
        <span className="brand-image">
          <img src="/favicon.png" alt="Logo" className="logo" />
        </span>
        <span className="brand-text">cbsdan</span>
        <span className="brand-dot">.</span>
      </div>

      <div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-link ${activeSection === item.id ? 'active' : ''} ${item.hideOnMobile ? 'hide-mobile' : ''}`}
            onClick={() => scrollToSection(item.id)}
          >
            <span className={`nav-indicator`}>{item.label}</span>
            <span className={`nav-text ${item.hideOnMobile ? 'hide-mobile' : ''}`}>{item.label}</span>
          </button>
        ))}

        {showThemeToggle && (
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
          >
            <div className="toggle-icon">
              {isDarkMode ? (
                <i className="fa-solid fa-sun"></i>
              ) : (
                <i className="fa-solid fa-moon"></i>
              )}
            </div>
          </button>
        )}

      </div>

      
    </nav>
  )
}

export default Navbar
