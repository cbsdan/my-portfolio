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
  const [selectedProject, setSelectedProject] = useState(null)
  const [isImageFullscreen, setIsImageFullscreen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const slideshowRef = useRef(null)
  const startX = useRef(0)
  const startY = useRef(0)
  const autoPlayRef = useRef(null)
  const manualTimeoutRef = useRef(null)

  const projects = [
    {
      id: 1,
      title: "Spherify: A Team Collaboration and Project Management Platform for Software Developers",
      description: "Integrating common tools such as Chats, Video Conferencing, File Sharing, and Task Management into a single platform that aims to solve the problem of Tool Fragmentation causing inefficiencies in workflows among software developers.",
      technologies: ["MERN", "Socket.io", "Firebase", "Google Cloud"],
      githubUrl: "https://github.com/cbsdan-tup/spherify",
      liveUrl: "https://spherify.vercel.app/",
      images: ["/project-images/Spherify-1.png"]
    },
    {
      id: 2,
      title: "Acadena: A Decentralized Academic Records System",
      description: "Acadena is a decentralized platform that utilize blockchain for managing academic records—secure, verifiable, and accessible for both students and institutions.",
      technologies: ["React", "Motoko", "Internet Identity", "Blockchain"],
      githubUrl: "https://github.com/cbsdan/Acadena",
      liveUrl: "https://tcm44-raaaa-aaaab-qbzya-cai.icp0.io",
      images: ["/project-images/Acadena-2.png"]
    },
    {
      id: 3,
      title: "Intrusion Detection System",
      description: "A machine learning and deep learning-based IDS that uses LSTM and KNN algorithms to classify network attacks using the NSL-KDD dataset. Users input potential intrusion parameters and receive real-time attack classification and alerts. The system aims to enhance cybersecurity by detecting anomalies and informing users to mitigate threats proactively.",
      technologies: ["Python", "TensorFlow", "Machine Learning", "React"],
      githubUrl: "https://github.com/cbsdan/intrusion-detection-system",
      liveUrl: null,
      images: ["/project-images/IDS-1.png"]
    },
    {
      id: 4,
      title: "FoodScan: AI-Based Nutrient Estimation from Food Images",
      description: "FoodScan is a mobile application that estimates nutritional values from food images using dual AI pipelines: a PyTorch-based ResNet50 deep learning model and Google Gemini API for vision-based nutrient analysis. It enables automated calorie and macronutrient estimation to support dietary tracking, fitness monitoring, and healthcare use cases.",
      technologies: ["React Native", "PyTorch", "Python", "ResNet50", "Gemini API", "REST API"],
      githubUrl: "https://github.com/cbsdan/foodscan",
      liveUrl: null,
      images: ["/project-images/FoodScan1.png", "/project-images/FoodScan2.png", "/project-images/FoodScan3.png", "/project-images/FoodScan4.png", "/project-images/FoodScan5.png"]
    },
    {
      id: 5,
      title: "CookingMamau: Recipe and Cooking Web App",
      description: "CookingMamau is a full-stack web application built with Laravel (PHP) and JavaScript that allows users to browse, manage, and explore food recipes. The project demonstrates server-side MVC architecture, database integration, and dynamic content rendering with modern frontend tools.",
      technologies: ["Laravel", "PHP", "JavaScript", "Blade", "CSS", "SQL"],
      githubUrl: "https://github.com/cbsdan/CookingMamau",
      liveUrl: null,
      images: ["/project-images/CookingMamau-1.png", "/project-images/CookingMamau-2.png", "/project-images/CookingMamau-3.png", "/project-images/CookingMamau-4.png", "/project-images/CookingMamau-5.png"] 
    },
    {
      id: 6,
      title: "Armys Angels Integrated School Website",
      description: "A responsive school website built using HTML, CSS, and Bootstrap to showcase institutional information, academic offerings, and announcements. The project highlights Bootstrap’s grid system, components, and responsive utilities to deliver a clean, accessible, and mobile-friendly layout for a secondary school.",
      technologies: ["HTML", "CSS", "Bootstrap"],
      githubUrl: "https://github.com/cbsdan/aais-website",
      liveUrl: "https://aais-website.vercel.app/",
      images: ["/project-images/AAIS-1.png", "/project-images/AAIS-2.png", "/project-images/AAIS-3.png"]
    }
  ]

  const featuredProjects = showAllProjects ? projects : projects.slice(0, 10) // Show 10 initially, all when expanded

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

  // Manual navigation functions with infinite scroll
  const goToNextSlide = () => {
    setCurrentSlide(curr => (curr + 1) % featuredProjects.length)
    handleManualNavigation()
  }

  const goToPrevSlide = () => {
    setCurrentSlide(curr => (curr - 1 + featuredProjects.length) % featuredProjects.length)
    handleManualNavigation()
  }

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

          if (diffX > 0) {
            // Swipe left - go to next (with infinite scroll)
            setCurrentSlide(prev => (prev + 1) % featuredProjects.length)
            setIsScrollLocked(true)
            handleManualNavigation()
            setTimeout(() => setIsScrollLocked(false), 700)
            startX.current = 0
            startY.current = 0
          } else if (diffX < 0) {
            // Swipe right - go to previous (with infinite scroll)
            setCurrentSlide(prev => (prev - 1 + featuredProjects.length) % featuredProjects.length)
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

  // Open project detail view
  const openProjectDetail = (project) => {
    setSelectedProject(project)
    setCurrentImageIndex(0)
    document.body.style.overflow = 'hidden'
  }

  // Close project detail view
  const closeProjectDetail = () => {
    setIsImageFullscreen(false)
    setCurrentImageIndex(0)
    setTimeout(() => {
      setSelectedProject(null)
      document.body.style.overflow = 'auto'
    }, 300)
  }

  // Navigate to next project in detail view (infinite scroll)
  const goToNextProject = () => {
    if (!selectedProject) return
    const currentIndex = projects.findIndex(p => p.id === selectedProject.id)
    const nextIndex = currentIndex < projects.length - 1 ? currentIndex + 1 : 0
    setSelectedProject(projects[nextIndex])
    setCurrentImageIndex(0)
  }

  // Navigate to previous project in detail view (infinite scroll)
  const goToPrevProject = () => {
    if (!selectedProject) return
    const currentIndex = projects.findIndex(p => p.id === selectedProject.id)
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : projects.length - 1
    setSelectedProject(projects[prevIndex])
    setCurrentImageIndex(0)
  }

  // Navigate to next image
  const goToNextImage = (e) => {
    e?.stopPropagation()
    if (!selectedProject || selectedProject.images.length <= 1) return
    setCurrentImageIndex(prev =>
      prev < selectedProject.images.length - 1 ? prev + 1 : 0
    )
  }

  // Navigate to previous image
  const goToPrevImage = (e) => {
    e?.stopPropagation()
    if (!selectedProject || selectedProject.images.length <= 1) return
    setCurrentImageIndex(prev =>
      prev > 0 ? prev - 1 : selectedProject.images.length - 1
    )
  }

  // Handle keyboard navigation
  useEffect(() => {
    if (!selectedProject) return

    const handleKeyPress = (e) => {
      if (e.key === 'Escape') closeProjectDetail()
      // When shift is held, navigate between projects
      if (e.shiftKey) {
        if (e.key === 'ArrowRight') goToNextProject()
        if (e.key === 'ArrowLeft') goToPrevProject()
      } else {
        // Otherwise navigate between images
        if (e.key === 'ArrowRight') goToNextImage()
        if (e.key === 'ArrowLeft') goToPrevImage()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [selectedProject, currentImageIndex])

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
              aria-label="Previous project"
            >
              <span>‹</span>
            </button>
            <button
              className="nav-button nav-button-next"
              onClick={goToNextSlide}
              aria-label="Next project"
            >
              <span>›</span>
            </button>

            <div className="stacked-cards">
              {featuredProjects.map((project, index) => {
                // Calculate circular position
                let position = index - currentSlide
                const totalProjects = featuredProjects.length

                // Normalize position for circular navigation
                if (position < -Math.floor(totalProjects / 2)) {
                  position += totalProjects
                } else if (position > Math.floor(totalProjects / 2)) {
                  position -= totalProjects
                }

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
                    onClick={() => position === 0 && openProjectDetail(project)}
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

        {/* Project Detail Modal */}
        {selectedProject && (
          <div className={`project-detail-overlay ${selectedProject ? 'active' : ''}`}>
            <div className="project-detail-backdrop" onClick={closeProjectDetail}></div>

            <div className="project-detail-container">
              {/* Close Button */}
              <button className="detail-close-btn" onClick={closeProjectDetail} aria-label="Close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Project Navigation - Bottom Bar */}
              <div className="detail-project-nav-bar">
                <button className="detail-nav-btn detail-prev-btn" onClick={goToPrevProject} aria-label="Previous project">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Previous</span>
                </button>
                <div className="project-counter">
                  <span>{projects.findIndex(p => p.id === selectedProject.id) + 1} / {projects.length}</span>
                </div>
                <button className="detail-nav-btn detail-next-btn" onClick={goToNextProject} aria-label="Next project">
                  <span>Next</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className={`project-detail-content ${isImageFullscreen ? 'image-fullscreen' : ''}`}>
                {/* Image Section */}
                <div className="detail-image-section">
                  {selectedProject.images.length > 0 ? (
                    <div className="detail-image-container">
                      {/* Image Navigation Buttons */}
                      {selectedProject.images.length > 1 && (
                        <>
                          <button
                            className="image-nav-btn image-prev-btn"
                            onClick={goToPrevImage}
                            aria-label="Previous image"
                          >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>
                          <button
                            className="image-nav-btn image-next-btn"
                            onClick={goToNextImage}
                            aria-label="Next image"
                          >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </>
                      )}

                      <div className="detail-image-wrapper">
                        <img
                          src={selectedProject.images[currentImageIndex]}
                          alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                          className="detail-project-image"
                        />
                      </div>

                      {/* Fullscreen Toggle Button */}
                      <button
                        className="fullscreen-toggle-btn"
                        onClick={() => setIsImageFullscreen(!isImageFullscreen)}
                        aria-label={isImageFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                      >
                        {isImageFullscreen ? (
                          <>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 9l6 6 6-6" />
                            </svg>
                            <span>Exit Fullscreen</span>
                          </>
                        ) : (
                          <>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                            </svg>
                            <span>Fullscreen</span>
                          </>
                        )}
                      </button>

                      {/* Image Indicators */}
                      {selectedProject.images.length > 1 && (
                        <div className="image-indicators">
                          {selectedProject.images.map((_, idx) => (
                            <button
                              key={idx}
                              className={`image-indicator ${idx === currentImageIndex ? 'active' : ''}`}
                              onClick={(e) => {
                                e.stopPropagation()
                                setCurrentImageIndex(idx)
                              }}
                              aria-label={`Go to image ${idx + 1}`}
                            />
                          ))}
                        </div>
                      )}

                      {/* Image Counter */}
                      {selectedProject.images.length > 1 && (
                        <div className="image-counter">
                          <span>{currentImageIndex + 1} / {selectedProject.images.length}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="detail-placeholder-image">
                      <span className="placeholder-icon">💻</span>
                      <p>No preview available</p>
                    </div>
                  )}
                </div>

                {/* Info Section */}
                <div className="detail-info-section">
                  <div className="detail-header">
                    <h2 className="detail-title">{selectedProject.title}</h2>
                    {selectedProject.liveUrl ? (
                      <span className="detail-status-badge live">Live</span>
                    ) : (
                      <span className="detail-status-badge development">Code only</span>
                    )}
                  </div>

                  <p className="detail-description">{selectedProject.description}</p>

                  <div className="detail-tech-section">
                    <h3 className="detail-section-title">Technologies</h3>
                    <div className="detail-tech-grid">
                      {selectedProject.technologies.map((tech, idx) => (
                        <span key={idx} className="detail-tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>

                  <div className="detail-links-section">
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="detail-btn detail-btn-github"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      <span>View Code</span>
                    </a>
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="detail-btn detail-btn-live"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects
