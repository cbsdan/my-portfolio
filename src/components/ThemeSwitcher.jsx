import { useState, useRef, useEffect } from 'react'
import { useTheme, themes } from '../contexts/ThemeContext'

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const panelRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="theme-switcher-wrapper" ref={panelRef}>
      <button
        className="theme-switcher-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change theme"
        title="Change theme"
      >
        <i className="fa-solid fa-palette"></i>
      </button>

      <div className={`theme-switcher-panel ${isOpen ? 'open' : ''}`}>
        <h4>Choose Theme</h4>
        {themes.map((t) => (
          <button
            key={t.id}
            className={`theme-option ${theme === t.id ? 'active' : ''}`}
            onClick={() => {
              setTheme(t.id)
              setIsOpen(false)
            }}
          >
            <div className={`theme-color-preview preview-${t.id}`}></div>
            <span className="theme-option-name">{t.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ThemeSwitcher
