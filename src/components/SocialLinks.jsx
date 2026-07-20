const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/cbsdan', icon: 'fa-brands fa-github' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/daniel-cabasa-519b13376', icon: 'fa-brands fa-linkedin' },
  { name: 'Facebook', url: 'https://facebook.com/daniel.cabasa.14', icon: 'fa-brands fa-facebook' },
  { name: 'Email', url: 'mailto:cabasadaniel1@gmail.com', icon: 'fa-solid fa-envelope' },
]

const SocialLinks = ({ activeSection }) => {
  const isHidden = activeSection === 'contact'

  return (
    <div className={`fixed-social-links ${isHidden ? 'hidden' : ''}`} aria-label="Social Media Links">
      {socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed-social-link"
          aria-label={link.name}
        >
          <i className={link.icon}></i>
          <span className="social-tooltip">{link.name}</span>
        </a>
      ))}
    </div>
  )
}

export default SocialLinks
