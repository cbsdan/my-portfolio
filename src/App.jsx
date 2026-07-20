import { useState, useEffect } from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import AnimatedBackground from './components/AnimatedBackground'
import ThemeSwitcher from './components/ThemeSwitcher'
import SocialLinks from './components/SocialLinks'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('hero')
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'experience', 'projects', 'skills', 'contact']
      const scrollPosition = window.scrollY + 150

      setShowScrollTop(window.scrollY > 400)

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <ThemeProvider>
      <div className="portfolio">
        <AnimatedBackground />
        <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
        <main className="main-content">
          <Hero />
          <hr className="section-divider" />
          <Projects />
          <hr className="section-divider" />
          <About />
          <hr className="section-divider" />
          <Experience />
          <hr className="section-divider" />
          <Skills />
          <hr className="section-divider" />
          <Contact />
        </main>
        <footer className="footer">
          <div className="footer-content container">
            <p>&copy; {new Date().getFullYear()} Daniel Cabasa. Built with React.</p>
          </div>
        </footer>

        <SocialLinks activeSection={activeSection} />
        <ThemeSwitcher />

        <button
          className={`scroll-to-top ${showScrollTop ? 'visible' : ''}`}
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <i className="fa-solid fa-arrow-up"></i>
        </button>
      </div>
    </ThemeProvider>
  )
}

export default App
