import { useState, useRef, useEffect } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState({
    type: '',
    message: '',
  })
  const [isVisible, setIsVisible] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false)
      }
    }

    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isModalOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ type: 'loading', message: 'Sending message...' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus({
          type: 'success',
          message: "Message sent successfully! I'll get back to you soon.",
        })
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus({
          type: 'error',
          message: data.message || 'Failed to send message. Please try again.',
        })
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.',
      })
    }
  }

  const contactMethods = [
    {
      icon: 'fa-brands fa-linkedin',
      title: 'LinkedIn',
      subtitle: "Let's connect professionally",
      action: 'Connect',
      link: 'https://linkedin.com/in/daniel-cabasa-519b13376',
      color: 'linear-gradient(135deg, #0077b5, #00a0dc)',
    },
    {
      icon: 'fa-brands fa-github',
      title: 'GitHub',
      subtitle: 'Check out my code',
      action: 'Follow',
      link: 'https://github.com/cbsdan',
      color: 'linear-gradient(135deg, #333, #6e5494)',
    },
    {
      icon: 'fa-brands fa-facebook',
      title: 'Facebook',
      subtitle: 'Follow my journey',
      action: 'Follow',
      link: 'https://www.facebook.com/daniel.cabasa.14',
      color: 'linear-gradient(135deg, #1877f2, #42a5f5)',
    },
  ]

  return (
    <section id="contact" className="contact-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Let's Work Together</h2>
          <p className="section-subtitle">Have a project in mind? Let's create something amazing!</p>
        </div>

        <div className={`contact-content ${isVisible ? 'visible' : ''}`}>
          <div className="contact-methods">
            <div className="methods-grid">
              {/* Primary Send Message Trigger Card */}
              <div
                className="contact-method message-trigger-card glass-card"
                onClick={() => setIsModalOpen(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setIsModalOpen(true)}
              >
                <div className="method-icon message-icon">
                  <i className="fa-solid fa-paper-plane"></i>
                </div>
                <div className="method-content">
                  <h4>Send Me a Message</h4>
                  <p className="method-subtitle">Direct inquiry form</p>
                  <span className="method-action">
                    Open Form <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </div>
              </div>

              {/* Social Contact Cards */}
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-method glass-card"
                  style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                >
                  <div className="method-icon" style={{ background: method.color }}>
                    <i className={method.icon}></i>
                  </div>
                  <div className="method-content">
                    <h4>{method.title}</h4>
                    <p className="method-subtitle">{method.subtitle}</p>
                    <span className="method-action">
                      {method.action} <i className="fa-solid fa-arrow-right"></i>
                    </span>
                  </div>
                </a>
              ))}

              {/* Direct Email Card */}
              <a
                href="mailto:cabasadaniel1@gmail.com"
                className="contact-method direct-email-card glass-card"
                style={{ animationDelay: '0.4s' }}
              >
                <div className="method-icon email-icon">
                  <i className="fa-solid fa-at"></i>
                </div>
                <div className="method-content">
                  <h4>Prefer Email?</h4>
                  <p className="method-subtitle">cabasadaniel1@gmail.com</p>
                  <span className="method-action">
                    Send Mail <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form Popup Modal */}
        {isModalOpen && (
          <div className="contact-modal-overlay" onClick={() => setIsModalOpen(false)}>
            <div className="contact-modal-container glass-card" onClick={(e) => e.stopPropagation()}>
              <button
                className="contact-modal-close"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close modal"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>

              <div className="contact-info">
                <div className="contact-form-container">
                  <div className="form-header">
                    <div className="form-icon">
                      <i className="fa-solid fa-paper-plane"></i>
                    </div>
                    <h3>Send Me a Message</h3>
                    <p>I'll get back to you within 24 hours</p>
                  </div>
                  <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="contact-name">
                        <i className="fa-solid fa-user"></i> Your Name
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="contact-email">
                        <i className="fa-solid fa-envelope"></i> Your Email
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="contact-message">
                        <i className="fa-solid fa-message"></i> Your Message
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Hi Daniel, I'd like to discuss a project..."
                        rows="5"
                        required
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary btn-submit"
                      disabled={status.type === 'loading'}
                    >
                      {status.type === 'loading' ? (
                        <>
                          <i className="fa-solid fa-spinner fa-spin"></i> Sending...
                        </>
                      ) : (
                        <>
                          <i className="fa-solid fa-paper-plane"></i> Send Message
                        </>
                      )}
                    </button>

                    {status.message && (
                      <div className={`form-status ${status.type}`}>
                        <i
                          className={`fa-solid ${
                            status.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'
                          }`}
                        ></i>
                        {status.message}
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Contact
