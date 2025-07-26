import { useState, useRef, useEffect } from 'react'

const ProjectCard = ({ project, index, isActive }) => (
  <div className={`project-card ${isActive ? 'active' : ''}`} style={{ animationDelay: `${index * 0.1}s` }}>
    <div className="project-image">
      {project.images.length > 0 ? (
        <div className="image-gallery">
          <img
            src={project.images[0]}
            alt={`${project.title} preview`}
            className="project-preview-image"
          />
          <div className="image-overlay">
            <div className="overlay-content">
              <h4>View Project</h4>
              <p>Click to explore</p>
            </div>
          </div>
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
      <div className="project-header">
        <h3 className="project-title" title={`${project.title}`}>{project.title}</h3>
        <div className="project-status">
          {project.liveUrl ? (
            <span className="status-badge live">Live</span>
          ) : (
            <span className="status-badge development">Code only</span>
          )}
        </div>
      </div>

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
          <span className="link-icon">📂</span>
          <span className="link-text">Code</span>
        </a>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link live"
          >
            <span className="link-icon">🚀</span>
            <span className="link-text">Live Demo</span>
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
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isManualNavigation, setIsManualNavigation] = useState(false)
  const slideshowRef = useRef(null)
  const startX = useRef(0)
  const startY = useRef(0)
  const autoPlayRef = useRef(null)
  const manualTimeoutRef = useRef(null)

  const projects = [
    {
      id: 1,
      title: "Acadena: A Decentralized Academic Records System",
      description: "Acadena is a decentralized platform that utilize blockchain for managing academic records—secure, verifiable, and accessible for both students and institutions.",
      technologies: ["React", "Motoko", "Internet Identity", "Blockchain"],
      githubUrl: "https://github.com/cbsdan/Acadena",
      liveUrl: "https://tcm44-raaaa-aaaab-qbzya-cai.icp0.io",
      images: ["/project-images/Acadena-2.png"]
    },
    {
      id: 2,
      title: "Spherify: A Team Collaboration and Project Management Platform for Software Developers",
      description: "Integrating common tools such as Chats, Video Conferencing, File Sharing, and Task Management into a single platform that aims to solve the problem of Tool Fragmentation causing inefficiencies in workflows among software developers.",
      technologies: ["MERN", "Socket.io", "Firebase", "Google Cloud"],
      githubUrl: "https://github.com/cbsdan-tup/spherify",
      liveUrl: "https://spherify.vercel.app/",
      images: ["/project-images/Spherify-1.png"]
    },
    {
      id: 3,
      title: "Intrusion Detection System",
      description: "A machine learning and deep learning-based IDS that uses LSTM and KNN algorithms to classify network attacks using the NSL-KDD dataset. Users input potential intrusion parameters and receive real-time attack classification and alerts. The system aims to enhance cybersecurity by detecting anomalies and informing users to mitigate threats proactively.",
      technologies: ["Python", "TensorFlow", "Machine Learning", "React"],
      githubUrl: "https://github.com/cbsdan/intrusion-detection-system",
      liveUrl: null,
      images: ["/project-images/IDS-1.png"]
    }
  ]

  const featuredProjects = showAllProjects ? projects : projects.slice(0, 5) // Show 5 initially, all when expanded

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || isManualNavigation) return

    const startAutoPlay = () => {
      // Clear any existing interval
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }

      autoPlayRef.current = setInterval(() => {
        // Don't auto-advance if manual navigation is active
        if (isManualNavigation || isScrollLocked) return

        setCurrentSlide(prev => {
          const nextSlide = prev + 1
          // Loop back to first slide when reaching the end
          return nextSlide >= featuredProjects.length ? 0 : nextSlide
        })
      }, 7000) // 7 seconds interval
    }

    const stopAutoPlay = () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
        autoPlayRef.current = null
      }
    }

    // Start auto-play
    startAutoPlay()

    // Pause auto-play when user hovers over slideshow
    const slideshowElement = slideshowRef.current
    if (slideshowElement) {
      slideshowElement.addEventListener('mouseenter', stopAutoPlay)
      slideshowElement.addEventListener('mouseleave', startAutoPlay)
      slideshowElement.addEventListener('touchstart', stopAutoPlay)
    }

    // Cleanup
    return () => {
      stopAutoPlay()
      if (slideshowElement) {
        slideshowElement.removeEventListener('mouseenter', stopAutoPlay)
        slideshowElement.removeEventListener('mouseleave', startAutoPlay)
        slideshowElement.removeEventListener('touchstart', stopAutoPlay)
      }
    }
  }, [isAutoPlaying, isManualNavigation, featuredProjects.length, isScrollLocked])

  // Helper function to handle manual navigation
  const handleManualNavigation = () => {
    setIsManualNavigation(true)

    // Clear any existing manual timeout
    if (manualTimeoutRef.current) {
      clearTimeout(manualTimeoutRef.current)
    }

    // Resume auto-play after 5 seconds of no manual interaction
    manualTimeoutRef.current = setTimeout(() => {
      setIsManualNavigation(false)
    }, 5000)
  }

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
    handleManualNavigation()
  }

  const goToPrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(curr => curr - 1)
    }
    handleManualNavigation()
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
              handleManualNavigation()
              setTimeout(() => setIsScrollLocked(false), 700)
            } else if (deltaY < 0 && currentSlide > 0) {
              // Scroll up - go to previous
              setCurrentSlide(curr => curr - 1)
              setIsScrollLocked(true)
              handleManualNavigation()
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
            handleManualNavigation()
            setTimeout(() => setIsScrollLocked(false), 700)
            startX.current = 0
            startY.current = 0
          } else if (diffX < 0 && currentSlide > 0) {
            // Swipe right - go to previous
            setCurrentSlide(prev => prev - 1)
            setIsScrollLocked(true)
            handleManualNavigation()
            setTimeout(() => setIsScrollLocked(false), 700)
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

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
      if (manualTimeoutRef.current) {
        clearTimeout(manualTimeoutRef.current)
      }
    }
  }, [])

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
                  transform = 'translateX(150px) translateY(20px) scale(0.95)'
                  opacity = 0.8
                  zIndex = 90
                } else if (position === -1) {
                  // Previous card (left stack) - show more of the card
                  className += ' prev'
                  transform = 'translateX(-150px) translateY(20px) scale(0.95)'
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
                onClick={() => {
                  setCurrentSlide(index)
                  handleManualNavigation()
                }}
              />
            ))}
          </div>

          {/* Show All Projects Toggle */}
          {
            projects.length > 5 && <div className="projects-toggle">
              <button
                className="btn btn-outline show-all-btn"
                onClick={handleShowAllToggle}
              >
                {showAllProjects ? 'Show Less Projects' : `Show All ${projects.length} Projects`}
              </button>
            </div>
          }

        </div>
      </div>
    </section>
  )
}

export default Projects
