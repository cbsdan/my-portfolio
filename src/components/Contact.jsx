const Contact = () => {
  const contactMethods = [
    {
      icon: "📧",
      title: "Email",
      subtitle: "cabasadaniel1@gmail.com",
      description: "Send me an email anytime!",
      action: "Send Email",
      link: "mailto:cabasadaniel1@gmail.com"
    },
    {
      icon: "💼", 
      title: "LinkedIn",
      subtitle: "Connect with me",
      description: "Let's grow our network",
      action: "Connect",
      link: "https://linkedin.com/in/daniel-cabasa-519b13376"
    },
    {
      icon: "🔗",
      title: "GitHub", 
      subtitle: "Check out my code",
      description: "Explore my repositories",
      action: "Follow",
      link: "https://github.com/cbsdan"
    },
    {
      icon: "👍",
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
            <div className="contact-text">
              <h3>Get In Touch</h3>
              <p>
                I'm always interested in new opportunities, collaborations, and exciting projects. 
                Whether you have a question or just want to say hi, I'll do my best to get back to you!
              </p>
              
              <div className="contact-details">
                <div className="contact-detail">
                  <span className="detail-icon">📍</span>
                  <div>
                    <h4>Location</h4>
                    <p>Taguig City, Philippines</p>
                  </div>
                </div>
                <div className="contact-detail">
                  <span className="detail-icon">⏰</span>
                  <div>
                    <h4>Response Time</h4>
                    <p>Usually within 24 hours</p>
                  </div>
                </div>
                <div className="contact-detail">
                  <span className="detail-icon">💬</span>
                  <div>
                    <h4>Languages</h4>
                    <p>English, Filipino</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="contact-cta">
              <h3>Ready to start a conversation?</h3>
              <div className="cta-buttons">
                <a 
                  href="mailto:cabasadaniel1@gmail.com" 
                  className="btn btn-primary btn-large"
                >
                  <span>📧</span> Send me an email
                </a>
              </div>
            </div>
          </div>
          
          <div className="contact-methods">
            <div className="methods-grid">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.link}
                  target={method.link.startsWith('mailto:') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className="contact-method"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="method-icon">{method.icon}</div>
                  <div className="method-content">
                    <h4>{method.title}</h4>
                    <p className="method-subtitle">{method.subtitle}</p>
                    <p className="method-description">{method.description}</p>
                    <span className="method-action">{method.action} →</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
