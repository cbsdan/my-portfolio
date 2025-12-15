import { useState, useEffect } from 'react'

const VisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState(100)
  const [startDate] = useState('December 15, 2024')
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Get stored visitor data
    const storedData = localStorage.getItem('portfolioVisitorData')
    
    if (storedData) {
      const data = JSON.parse(storedData)
      // Check if this is a new session
      const lastVisit = sessionStorage.getItem('hasVisited')
      
      if (!lastVisit) {
        // New session - increment count
        const newCount = data.count + 1
        setVisitorCount(newCount)
        localStorage.setItem('portfolioVisitorData', JSON.stringify({
          ...data,
          count: newCount,
          lastVisit: new Date().toISOString()
        }))
        sessionStorage.setItem('hasVisited', 'true')
        setIsAnimating(true)
        setTimeout(() => setIsAnimating(false), 1000)
      } else {
        setVisitorCount(data.count)
      }
    } else {
      // First time - initialize with 100
      const initialData = {
        count: 100,
        startDate: 'December 15, 2024',
        lastVisit: new Date().toISOString()
      }
      localStorage.setItem('portfolioVisitorData', JSON.stringify(initialData))
      sessionStorage.setItem('hasVisited', 'true')
      setVisitorCount(100)
    }
  }, [])

  // Format number with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return (
    <div className="visitor-counter">
      <div className="visitor-counter-inner">
        <div className="counter-icon">
          <i className="fa-solid fa-eye"></i>
        </div>
        <div className="counter-content">
          <div className={`counter-number ${isAnimating ? 'pulse' : ''}`}>
            {formatNumber(visitorCount)}
          </div>
          <div className="counter-label">Portfolio Views</div>
          <div className="counter-since">Since {startDate}</div>
        </div>
        <div className="counter-glow"></div>
      </div>
    </div>
  )
}

export default VisitorCounter
