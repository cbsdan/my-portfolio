import React from 'react';
import './AnimatedBackground.css';

const AnimatedBackground = () => {
  return (
    <div className="animated-background">
      {/* Floating geometric shapes */}
      <div className="floating-shapes">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i} 
            className={`shape shape-${i % 4}`}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Gradient orbs */}
      <div className="gradient-orbs">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className={`orb orb-${i % 3}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`
            }}
          />
        ))}
      </div>

      {/* Particle dots */}
      <div className="particles">
        {[...Array(50)].map((_, i) => (
          <div 
            key={i} 
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${20 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Code-like moving lines */}
      <div className="code-lines">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i} 
            className="code-line"
            style={{
              top: `${10 + i * 12}%`,
              animationDelay: `${i * 2}s`
            }}
          >
            <span className="code-text">
              {i % 4 === 0 && 'const developer = { skills: ["React", "Node.js"] };'}
              {i % 4 === 1 && 'function buildAmazingThings() { return innovation; }'}
              {i % 4 === 2 && 'import creativity from "limitless-imagination";'}
              {i % 4 === 3 && 'export default PassionateDeveloper;'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackground;
