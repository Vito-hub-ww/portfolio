import { useEffect, useState } from 'react';
import { ParticleCanvas } from '@/components/ParticleCanvas';

export function HeroSection() {
  const [showIndicator, setShowIndicator] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowIndicator(window.scrollY <= 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Particle background */}
      <ParticleCanvas />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(11,13,23,0.3) 0%, rgba(11,13,23,0.6) 70%, rgba(11,13,23,1) 100%)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-[900px] mx-auto px-6 py-20">
        {/* Greeting badge */}
        <div className="fade-in visible stagger-1 inline-block mb-6">
          <span
            className="text-xs uppercase tracking-[0.1em] font-medium px-4 py-2 rounded-full"
            style={{
              backgroundColor: 'rgba(139, 92, 246, 0.12)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              color: '#8B5CF6',
            }}
          >
            Hello, I'm
          </span>
        </div>

        {/* Name */}
        <h1
          className="fade-in visible stagger-2 text-white mb-4"
          style={{
            fontSize: 'clamp(40px, 8vw, 96px)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.04em',
          }}
        >
          Viktor Bereziak
        </h1>

        {/* Title */}
        <h2
          className="fade-in visible stagger-3 mb-4"
          style={{
            fontSize: 'clamp(24px, 3vw, 40px)',
            fontWeight: 600,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            color: '#00D8FF',
          }}
        >
          React Native Developer
        </h2>

        {/* Tagline */}
        <p className="fade-in visible stagger-4 text-text text-lg max-w-[560px] mb-10">
          Building cross-platform mobile apps with clean code and modern UI
        </p>

        {/* CTA Buttons */}
        <div className="fade-in visible stagger-5 flex flex-col sm:flex-row gap-4">
          <button className="btn-primary" onClick={() => scrollTo('#projects')}>
            View Projects
          </button>
          <button className="btn-secondary" onClick={() => scrollTo('#contact')}>
            Contact Me
          </button>
        </div>
      </div>

      {/* Mobile scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 z-10 md:hidden transition-opacity duration-300 ${
          showIndicator ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-pulse-indicator"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}
