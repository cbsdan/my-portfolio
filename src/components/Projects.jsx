import { useState, useRef, useEffect } from 'react'

const ProjectCard = ({ project, index, isActive }) => (
  <div className={`project-card ${isActive ? 'active' : ''}`} style={{ animationDelay: `${index * 0.1}s` }}>
    <div className="project-image">
      {project.images.length > 0 ? (
        <div className="image-gallery">
          {project.images.map((img, idx) => (
            <img key={idx} src={img} alt={`${project.title} screenshot ${idx + 1}`} />
          ))}
        </div>
      ) : (
        <div className="placeholder-image">
          <div className="project-icon">
            <span>💻</span>
          </div>
          <div className="project-overlay">
            <h4>Preview Coming Soon</h4>
          </div>
        </div>
      )}
    </div>
    
    <div className="project-content">
      <h3 className="project-title">{project.title}</h3>
      <p className="project-description">{project.description}</p>
      
      <div className="project-tech">
        {project.technologies.map((tech, idx) => (
          <span key={idx} className="tech-tag">{tech}</span>
        ))}
      </div>
      
      <div className="project-links">
        <a 
          href={project.githubUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="project-link github"
        >
          <span>📂</span> Code
        </a>
        {project.liveUrl && (
          <a 
            href={project.liveUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="project-link live"
          >
            <span>🚀</span> Live Demo
          </a>
        )}
      </div>
    </div>
  </div>
)

const Projects = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isScrollLocked, setIsScrollLocked] = useState(false)
  const [showAllProjects, setShowAllProjects] = useState(false)
  const slideshowRef = useRef(null)
  const startX = useRef(0)
  const startY = useRef(0)
  
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce application with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
      githubUrl: "https://github.com/yourusername/ecommerce-platform",
      liveUrl: "https://your-ecommerce-demo.com",
      images: []
    },
    {
      id: 2,
      title: "Task Management API",
      description: "RESTful API for task management with authentication, real-time updates, and comprehensive documentation.",
      technologies: ["Node.js", "PostgreSQL", "JWT", "Socket.io"],
      githubUrl: "https://github.com/yourusername/task-management-api",
      liveUrl: null,
      images: []
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "Responsive weather application with location-based forecasts, interactive maps, and detailed weather analytics.",
      technologies: ["React", "TypeScript", "Weather API", "CSS Grid"],
      githubUrl: "https://github.com/yourusername/weather-dashboard",
      liveUrl: "https://your-weather-app.com",
      images: []
    },
    {
      id: 4,
      title: "Social Media Analytics",
      description: "Dashboard for analyzing social media performance with data visualization and automated reporting.",
      technologies: ["Vue.js", "Python", "D3.js", "FastAPI"],
      githubUrl: "https://github.com/yourusername/social-analytics",
      liveUrl: "https://your-analytics-app.com",
      images: []
    },
    {
      id: 5,
      title: "Real-time Chat App",
      description: "Modern chat application with real-time messaging, file sharing, and user presence indicators.",
      technologies: ["React", "Socket.io", "Node.js", "Redis"],
      githubUrl: "https://github.com/yourusername/chat-app",
      liveUrl: "https://your-chat-app.com",
      images: []
    },
    {
      id: 6,
      title: "Machine Learning Dashboard",
      description: "Interactive dashboard for visualizing ML model performance with real-time predictions and analytics.",
      technologies: ["Python", "TensorFlow", "React", "Flask"],
      githubUrl: "https://github.com/yourusername/ml-dashboard",
      liveUrl: "https://your-ml-dashboard.com",
      images: []
    }
  ]

  const featuredProjects = showAllProjects ? projects : projects.slice(0, 5) // Show 5 initially, all when expanded

  // Reset current slide when toggling show all projects
  const handleShowAllToggle = () => {
    setShowAllProjects(!showAllProjects)
    setCurrentSlide(0) // Reset to first slide
  }

  // Manual navigation functions
  const goToNextSlide = () => {
    if (currentSlide < featuredProjects.length - 1) {
      setCurrentSlide(curr => curr + 1)
    }
  }

  const goToPrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(curr => curr - 1)
    }
  }

  // Handle wheel event for scroll-based navigation (desktop only)
  useEffect(() => {
    const handleWheel = (e) => {
      if (!slideshowRef.current) return

      // Completely disable scroll navigation on mobile/tablet devices
      const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window || 
                      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      if (isMobile) return

      const slideshowRect = slideshowRef.current.getBoundingClientRect()
      const mouseY = e.clientY
      
      // Check if mouse is specifically over the slideshow area
      const isOverSlideshow = mouseY >= slideshowRect.top && 
                             mouseY <= slideshowRect.bottom &&
                             e.clientX >= slideshowRect.left && 
                             e.clientX <= slideshowRect.right

      if (isOverSlideshow) {
        if (!isScrollLocked) {
          const deltaY = e.deltaY
          
          // Check if we're at the boundaries and should allow main scroll
          const isAtLastSlide = currentSlide === featuredProjects.length - 1
          const isAtFirstSlide = currentSlide === 0
          
          // Allow main scroll if at boundaries
          if ((deltaY > 0 && isAtLastSlide) || (deltaY < 0 && isAtFirstSlide)) {
            // Don't prevent default - allow normal page scroll
            return true
          }
          
          // We're not at boundaries, handle slideshow navigation
          e.preventDefault()
          e.stopPropagation()
          e.stopImmediatePropagation()
          
          // Simple direct navigation - no accumulator to prevent double scrolling
          if (Math.abs(deltaY) > 10) { // Minimum scroll threshold
            if (deltaY > 0 && currentSlide < featuredProjects.length - 1) {
              // Scroll down - go to next
              setCurrentSlide(curr => curr + 1)
              setIsScrollLocked(true)
              setTimeout(() => setIsScrollLocked(false), 700)
            } else if (deltaY < 0 && currentSlide > 0) {
              // Scroll up - go to previous
              setCurrentSlide(curr => curr - 1)
              setIsScrollLocked(true)
              setTimeout(() => setIsScrollLocked(false), 700)
            }
          }
          
          // Return false to ensure no further event handling for slideshow navigation
          return false
        } else {
          // If scroll is locked, still prevent main scroll to avoid conflicts
          e.preventDefault()
          e.stopPropagation()
          e.stopImmediatePropagation()
          return false
        }
      }
    }

    // Use capture phase to intercept events earlier
    document.addEventListener('wheel', handleWheel, { passive: false, capture: true })

    return () => {
      document.removeEventListener('wheel', handleWheel, { capture: true })
    }
  }, [currentSlide, featuredProjects.length, isScrollLocked])

  // Handle touch events for mobile/tablet - horizontal swipes
  useEffect(() => {
    const handleTouchStart = (e) => {
      if (!slideshowRef.current) return
      
      const slideshowRect = slideshowRef.current.getBoundingClientRect()
      const touch = e.touches[0]
      
      // Check if touch is over the slideshow area
      const isOverSlideshow = touch.clientY >= slideshowRect.top && 
                             touch.clientY <= slideshowRect.bottom &&
                             touch.clientX >= slideshowRect.left && 
                             touch.clientX <= slideshowRect.right

      if (isOverSlideshow) {
        startX.current = touch.clientX
        startY.current = touch.clientY
      }
    }

    const handleTouchMove = (e) => {
      if (!slideshowRef.current || startX.current === 0) return

      const slideshowRect = slideshowRef.current.getBoundingClientRect()
      const touch = e.touches[0]
      
      // Check if touch is still over the slideshow area
      const isOverSlideshow = touch.clientY >= slideshowRect.top && 
                             touch.clientY <= slideshowRect.bottom &&
                             touch.clientX >= slideshowRect.left && 
                             touch.clientX <= slideshowRect.right

      if (isOverSlideshow && !isScrollLocked) {
        const currentX = touch.clientX
        const currentY = touch.clientY
        const diffX = startX.current - currentX
        const diffY = startY.current - currentY
        
        // Check if it's more horizontal than vertical movement
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 60) {
          e.preventDefault()
          e.stopPropagation()
          
          if (diffX > 0 && currentSlide < featuredProjects.length - 1) {
            // Swipe left - go to next
            setCurrentSlide(prev => prev + 1)
            setIsScrollLocked(true)
            setTimeout(() => setIsScrollLocked(false), 700) // Match scroll transition duration
            startX.current = 0
            startY.current = 0
          } else if (diffX < 0 && currentSlide > 0) {
            // Swipe right - go to previous
            setCurrentSlide(prev => prev - 1)
            setIsScrollLocked(true)
            setTimeout(() => setIsScrollLocked(false), 700) // Match scroll transition duration
            startX.current = 0
            startY.current = 0
          }
        }
      }
    }

    const handleTouchEnd = () => {
      startX.current = 0
      startY.current = 0
    }

    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [currentSlide, featuredProjects.length, isScrollLocked])

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">Scroll to explore my recent work</p>
          {/* Scroll Hint
          <div className="scroll-hint">
            <p className="desktop-hint">Hover over the cards and scroll to navigate through projects</p>
            <p className="mobile-hint">Swipe left or right to navigate through projects</p>
            <div className="scroll-animation">
              <div className="scroll-wheel"></div>
            </div>
          </div> */}
        </div>
        
        {/* Stacked Projects Slideshow */}
        <div className="projects-slideshow" ref={slideshowRef}>
          <div className="slideshow-container">
            {/* Manual Navigation Buttons */}
            <button 
              className="nav-button nav-button-prev"
              onClick={goToPrevSlide}
              disabled={currentSlide === 0}
              aria-label="Previous project"
            >
              <span>‹</span>
            </button>
            <button 
              className="nav-button nav-button-next"
              onClick={goToNextSlide}
              disabled={currentSlide === featuredProjects.length - 1}
              aria-label="Next project"
            >
              <span>›</span>
            </button>

            <div className="stacked-cards">
              {featuredProjects.map((project, index) => {
                const position = index - currentSlide

                let className = 'stacked-card'
                let zIndex = 50
                let transform = ''
                let opacity = 0

                if (position === 0) {
                  // Current card (front)
                  className += ' current'
                  transform = 'translateX(0) translateY(0) scale(1)'
                  zIndex = 100
                  opacity = 1
                } else if (position === 1) {
                  // Next card (right stack) - show more of the card
                  className += ' next'
                  transform = 'translateX(120px) translateY(20px) scale(0.95)'
                  opacity = 0.8
                  zIndex = 90
                } else if (position === -1) {
                  // Previous card (left stack) - show more of the card
                  className += ' prev'
                  transform = 'translateX(-120px) translateY(20px) scale(0.95)'
                  opacity = 0.8
                  zIndex = 90
                } else if (position > 1) {
                  // Cards further to the right (hidden)
                  className += ' far-next'
                  transform = 'translateX(200px) translateY(60px) scale(0.8)'
                  opacity = 0
                  zIndex = 10
                } else if (position < -1) {
                  // Cards further to the left (hidden)
                  className += ' far-prev'
                  transform = 'translateX(-200px) translateY(60px) scale(0.8)'
                  opacity = 0
                  zIndex = 10
                }

                return (
                  <div
                    key={project.id}
                    className={className}
                    style={{
                      transform,
                      opacity,
                      zIndex,
                      transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                      pointerEvents: position === 0 ? 'auto' : 'none'
                    }}
                  >
                    <ProjectCard 
                      project={project} 
                      index={index} 
                      isActive={position === 0}
                    />
                  </div>
                )
              })}
            </div>
          </div>
          
          {/* Slide Indicators */}
          <div className="slide-indicators">
            {featuredProjects.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
          
          {/* Progress Bar */}
          <div className="slide-progress">
            <div 
              className="progress-bar"
              style={{ 
                width: `${((currentSlide + 1) / featuredProjects.length) * 100}%`
              }}
            />
          </div>

          {/* Show All Projects Toggle */}
          <div className="projects-toggle">
            <button 
              className="btn btn-outline show-all-btn"
              onClick={handleShowAllToggle}
            >
              {showAllProjects ? 'Show Less Projects' : `Show All ${projects.length} Projects`}
            </button>
            <p className="projects-count">
              Showing {featuredProjects.length} of {projects.length} projects
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Projects
