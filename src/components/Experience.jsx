import { useEffect, useRef, useState } from 'react'

const Experience = () => {
  const [visibleItems, setVisibleItems] = useState(new Set())
  const itemRefs = useRef([])

  const experiences = [
    {
      role: 'Tech Admin Intern',
      company: 'CIM Technologies Inc.',
      location: 'Makati City',
      period: 'February 2026 – August 2026',
      tasks: [
        'Automated internal forms, including email sending and product summary reports using JavaScript in Google Spreadsheet.',
        'Performed PC reformatting and Windows OS installations.',
        'Installed and configured software such as Autodesk products.',
        'Handled basic troubleshooting of software issues.',
      ],
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index)
            setVisibleItems((prev) => new Set([...prev, index]))
          }
        })
      },
      { threshold: 0.2 }
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle">Professional journey and hands-on work experience</p>
        </div>

        <div className="timeline">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`timeline-item ${visibleItems.has(index) ? 'visible' : ''}`}
              ref={(el) => (itemRefs.current[index] = el)}
              data-index={index}
            >
              <div className="timeline-dot"></div>
              <div className="timeline-card glass-card">
                <span className="timeline-date">
                  <i className="fa-solid fa-calendar"></i>
                  {exp.period}
                </span>
                <h3 className="timeline-role">{exp.role}</h3>
                <p className="timeline-company">
                  <i className="fa-solid fa-building"></i>
                  {exp.company} — {exp.location}
                </p>
                <ul className="timeline-tasks">
                  {exp.tasks.map((task, idx) => (
                    <li key={idx}>{task}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
