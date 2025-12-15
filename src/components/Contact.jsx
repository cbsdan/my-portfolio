import { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState({
    type: '', // 'success', 'error', 'loading'
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
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
        setStatus({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon.' })
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus({ type: 'error', message: data.message || 'Failed to send message. Please try again.' })
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Network error. Please check your connection and try again.' })
    }
  }

  const contactMethods = [
    {
      icon: "fa-brands fa-linkedin", 
      title: "LinkedIn",
      subtitle: "Connect with me",
      description: "Let's grow our network",
      action: "Connect",
      link: "https://linkedin.com/in/daniel-cabasa-519b13376"
    },
    {
      icon: "fa-brands fa-github",
      title: "GitHub", 
      subtitle: "Check out my code",
      description: "Explore my repositories",
      action: "Follow",
      link: "https://github.com/cbsdan"
    },
    {
      icon: "fa-brands fa-facebook",
      title: "Facebook",
      subtitle: "Follow my journey", 
      description: "Tech insights and updates",
      action: "Follow",
      link: "https://www.facebook.com/daniel.cabasa.14"
    }
  ]

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Let's Work Together</h2>
          <p className="section-subtitle">Ready to start your next project?</p>
        </div>
        
        <div className="contact-content">
          <div className="contact-info">
            
            {/* Contact Form */}
            <div className="contact-form-container">
              <h3><i className="fa-solid fa-paper-plane"></i> Send Me a Message</h3>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">
                    <i className="fa-solid fa-user"></i> Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">
                    <i className="fa-solid fa-envelope"></i> Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">
                    <i className="fa-solid fa-message"></i> Your Message
                  </label>
                  <textarea
                    id="message"
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
                    <i className={`fa-solid ${status.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
                    {status.message}
                  </div>
                )}
              </form>
            </div>
          </div>
          
          <div className="contact-methods">
            <div className="methods-grid">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-method"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="method-icon"><i className={method.icon}></i></div>
                  <div className="method-content">
                    <h4>{method.title}</h4>
                    <p className="method-subtitle">{method.subtitle}</p>
                    <p className="method-description">{method.description}</p>
                    <span className="method-action">{method.action} →</span>
                  </div>
                </a>
              ))}
            </div>
            
            {/* Direct Email Card */}
            <div className="direct-email-card">
              <div className="email-icon">
                <i className="fa-solid fa-envelope"></i>
              </div>
              <div className="email-content">
                <h4>Prefer Email?</h4>
                <p>You can also reach me directly at:</p>
                <a href="mailto:cabasadaniel1@gmail.com" className="email-link">
                  cabasadaniel1@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
