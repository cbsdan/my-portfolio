import { useState, useEffect, useRef } from 'react'

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Touch handling for swipe gesture on mobile
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const projects = [
    {
      id: 1,
      title: 'GlycoFit: Prediabetes Lifestyle Risk Assessment',
      description:
        'A cross-platform mobile and web application for prediabetes risk management. Features AI-powered Food Scan, Sleep Tracking, and Google Sign-In authentication for both web and mobile platforms.',
      technologies: ['React Native', 'React', 'Python', 'Google Sign-In', 'AI/ML'],
      githubUrl: 'https://github.com/cbsdan/glycofit',
      liveUrl: 'https://glycofit.vercel.app',
      images: ['/project-images/GlycoFit1.png'],
      category: 'Web | Mobile',
    },
    {
      id: 2,
      title: 'Spherify: Team Collaboration & Project Management Platform',
      description:
        'A collaboration platform integrating Chats, Video Conferencing, File Sharing, and Task Management. Led a four-developer team using Agile/Scrum practices with real-time features via Socket.io.',
      technologies: ['MERN', 'Socket.io', 'Firebase', 'Google Cloud'],
      githubUrl: 'https://github.com/cbsdan-tup/spherify',
      liveUrl: 'https://spherify.vercel.app/',
      images: ['/project-images/Spherify-1.png'],
      category: 'Web',
    },
    {
      id: 3,
      title: 'Borrow My Wheels: Car Rental Platform',
      description:
        'A full-stack car rental platform for mobile and web users. Features Google Sign-In authentication, Firebase Cloud Messaging for notifications, and vehicle management with booking capabilities.',
      technologies: ['React Native', 'MERN', 'Google Sign-In', 'FCM'],
      githubUrl: 'https://github.com/cbsdan/borrow-my-wheels',
      liveUrl: null,
      images: [],
      category: 'Mobile',
    },
    {
      id: 4,
      title: 'Acadena: Decentralized Academic Records System',
      description:
        'A decentralized platform utilizing blockchain for managing academic records — secure, verifiable, and accessible for both students and institutions.',
      technologies: ['React', 'Motoko', 'Internet Identity', 'Blockchain'],
      githubUrl: 'https://github.com/cbsdan/Acadena',
      liveUrl: 'https://tcm44-raaaa-aaaab-qbzya-cai.icp0.io',
      images: ['/project-images/Acadena-2.png'],
      category: 'Web',
    },
    {
      id: 5,
      title: 'Intrusion Detection System',
      description:
        'A machine learning and deep learning-based IDS using LSTM and KNN algorithms to classify network attacks with the NSL-KDD dataset. Real-time attack classification and alerts.',
      technologies: ['Python', 'TensorFlow', 'Machine Learning', 'React'],
      githubUrl: 'https://github.com/cbsdan/intrusion-detection-system',
      liveUrl: null,
      images: ['/project-images/IDS-1.png'],
      category: 'AI/ML',
    },
    {
      id: 6,
      title: 'FoodScan: AI-Based Nutrient Estimation',
      description:
        'A mobile app estimating nutritional values from food images using dual AI pipelines: PyTorch ResNet50 deep learning model and Google Gemini API for vision-based nutrient analysis.',
      technologies: ['React Native', 'PyTorch', 'Python', 'ResNet50', 'Gemini API'],
      githubUrl: 'https://github.com/cbsdan/foodscan',
      liveUrl: null,
      images: [
        '/project-images/FoodScan1.png',
        '/project-images/FoodScan2.png',
        '/project-images/FoodScan3.png',
        '/project-images/FoodScan4.png',
        '/project-images/FoodScan5.png',
      ],
      category: 'AI/ML',
    },
    {
      id: 7,
      title: 'CookingMamau: Recipe & Cooking Web App',
      description:
        'A full-stack web app built with Laravel (PHP) for browsing, managing, and exploring food recipes. Demonstrates server-side MVC architecture with dynamic content rendering.',
      technologies: ['Laravel', 'PHP', 'JavaScript', 'Blade', 'CSS', 'SQL'],
      githubUrl: 'https://github.com/cbsdan/CookingMamau',
      liveUrl: null,
      images: [
        '/project-images/CookingMamau-1.png',
        '/project-images/CookingMamau-2.png',
        '/project-images/CookingMamau-3.png',
        '/project-images/CookingMamau-4.png',
        '/project-images/CookingMamau-5.png',
      ],
      category: 'Web',
    },
    {
      id: 8,
      title: "Army's Angels Integrated School Website",
      description:
        'A responsive school website built with HTML, CSS, and Bootstrap to showcase institutional information, academic offerings, and announcements. The project highlights Bootstrap\'s grid system, clean typography, and responsive component design.',
      technologies: ['HTML', 'CSS', 'Bootstrap'],
      githubUrl: 'https://github.com/cbsdan/aais-website',
      liveUrl: 'https://aais-website.vercel.app/',
      images: ['/project-images/AAIS-1.png', '/project-images/AAIS-2.png', '/project-images/AAIS-3.png'],
      category: 'Web',
    },
  ]

  const filters = ['All', 'Web', 'Mobile', 'AI/ML']

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => {
        if (activeFilter === 'Web') return p.category.includes('Web')
        if (activeFilter === 'Mobile') return p.category.includes('Mobile')
        if (activeFilter === 'AI/ML') return p.category.includes('AI/ML')
        return p.category === activeFilter
      })

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0)
  }, [activeFilter])

  // Navigation handlers
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredProjects.length)
  }

  // 8-Second Auto rotation timer
  useEffect(() => {
    if (isPaused || filteredProjects.length <= 1) return

    const timer = setInterval(() => {
      handleNext()
    }, 8000)

    return () => clearInterval(timer)
  }, [isPaused, filteredProjects.length, currentIndex])

  // Compute offset for card stacking
  const getCardOffset = (index) => {
    const total = filteredProjects.length
    if (total === 0) return 0
    let diff = index - currentIndex
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total
    return diff
  }

  // Touch Swipe handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    const distance = touchStartX.current - touchEndX.current
    if (distance > 50) {
      handleNext()
    } else if (distance < -50) {
      handlePrev()
    }
    touchStartX.current = 0
    touchEndX.current = 0
  }

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">Scroll to explore my recent work</p>
        </div>

        {/* Stacked Cards Carousel */}
        <div
          className="stacked-carousel-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button
            className="stacked-nav-btn prev"
            onClick={handlePrev}
            aria-label="Previous Project"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>

          <div className="stacked-carousel-container">
            {filteredProjects.map((project, index) => {
              const offset = getCardOffset(index)
              const isVisible = Math.abs(offset) <= 2

              if (!isVisible) return null

              const displayUrl = project.liveUrl
                ? project.liveUrl.replace(/^https?:\/\//, '')
                : project.githubUrl.replace(/^https?:\/\//, '')

              return (
                <div
                  key={project.id}
                  className={`stacked-card ${offset === 0 ? 'active' : ''}`}
                  data-offset={offset}
                  style={{
                    '--offset': offset,
                    '--abs-offset': Math.abs(offset),
                  }}
                  onClick={() => {
                    if (offset !== 0) {
                      setCurrentIndex(index)
                    } else {
                      const targetUrl = project.liveUrl || project.githubUrl
                      if (targetUrl) {
                        window.open(targetUrl, '_blank', 'noopener,noreferrer')
                      }
                    }
                  }}
                >
                  {/* Browser Bar Mockup */}
                  <div className="browser-bar">
                    <div className="browser-controls">
                      <span className="b-dot red"></span>
                      <span className="b-dot yellow"></span>
                      <span className="b-dot green"></span>
                    </div>
                    <div className="browser-url">
                      <svg
                        className="lock-icon"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                      <span className="url-text">{displayUrl}</span>
                    </div>
                  </div>

                  {/* Card Image */}
                  <div className="stacked-card-image">
                    {project.images.length > 0 ? (
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="card-img"
                      />
                    ) : (
                      <div className="card-img-placeholder">
                        <span className="placeholder-icon">💻</span>
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="stacked-card-content">
                    <div className="stacked-card-header">
                      <h3 className="stacked-card-title">{project.title}</h3>
                      {project.liveUrl ? (
                        <span className="stacked-status-badge live">LIVE</span>
                      ) : (
                        <span className="stacked-status-badge code">CODE</span>
                      )}
                    </div>

                    <p className="stacked-card-desc">{project.description}</p>

                    <div className="stacked-card-tech">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="stacked-tech-pill">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="stacked-card-actions">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="stacked-btn btn-code"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>📁</span> Code
                      </a>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="stacked-btn btn-demo"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>🚀</span> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <button
            className="stacked-nav-btn next"
            onClick={handleNext}
            aria-label="Next Project"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>

          {/* Indicators */}
          <div className="stacked-carousel-controls">
            <div className="stacked-indicators">
              {filteredProjects.map((_, idx) => (
                <button
                  key={idx}
                  className={`stacked-dot ${idx === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects

