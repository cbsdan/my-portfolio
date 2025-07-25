import { useState, useEffect } from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import AnimatedBackground from './components/AnimatedBackground'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'skills', 'contact']
      const scrollPosition = window.scrollY + 100

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

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <ThemeProvider>
      <div className="portfolio">
        <AnimatedBackground />
        <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
        <main className="main-content">
          <Hero />
          <Projects />
          <About />
          <Skills />
          <Contact />
        </main>
        <footer className="footer">
          <div className="footer-content">
            <p>&copy; 2025 cbsdan. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}

export default App
