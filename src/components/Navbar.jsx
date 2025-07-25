import { useState, useEffect } from 'react'
import { useTheme } from '../contexts/ThemeContext'

const Navbar = ({ activeSection, setActiveSection }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const { isDarkMode, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About', hideOnMobile: true },
    { id: 'skills', label: 'Skills', hideOnMobile: true },
    { id: 'contact', label: 'Contact' }
  ]

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setActiveSection(sectionId)
  }

  // Show theme toggle when scrolled down (not at top) or when not on hero section
  const showThemeToggle = isScrolled || activeSection !== 'hero'

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${activeSection === 'hero' ? 'on-hero' : ''}`}>
      <div className="nav-brand">
        <span className="brand-image">
          <img src="/favicon.png" alt="Logo" className="logo" />
        </span>
        <span className="brand-text">cbsdan</span>
        <span className="brand-dot">.</span>
      </div>
      <div className="nav-links">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`${activeSection === item.id ? 'active' : ''} ${item.hideOnMobile ? 'hide-mobile' : ''}`}
            onClick={() => scrollToSection(item.id)}
          >
            {item.label}
          </button>
        ))}
        {showThemeToggle && (
          <button className="theme-toggle" onClick={toggleTheme} title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}>
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
