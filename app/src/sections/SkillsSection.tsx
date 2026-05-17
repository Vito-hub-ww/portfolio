import { useFadeIn } from '@/hooks/useFadeIn';

const skills = [
  {
    name: 'React Native',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="2" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(0 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      </svg>
    ),
  },
  {
    name: 'JavaScript',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <rect x="2" y="2" width="20" height="20" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <text x="12" y="16.5" textAnchor="middle" fontSize="11" fontWeight="600" fill="currentColor">JS</text>
      </svg>
    ),
  },
  {
    name: 'React Navigation',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 7 12 12 16 14" />
        <path d="M17.5 6.5L19 5" />
      </svg>
    ),
  },
  {
    name: 'Redux',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16.63 11.77c.15-.27.24-.57.24-.89 0-1.1-.9-2-2-2s-2 .9-2 2c0 .32.09.62.24.89C10.35 12.53 8.5 14.64 8.5 17.2c0 2.76 2.24 5 5 5s5-2.24 5-5c0-2.56-1.85-4.67-3.87-5.43z" />
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10" strokeDasharray="4 2" />
      </svg>
    ),
  },
  {
    name: 'REST API',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="6" width="8" height="6" rx="1" />
        <rect x="14" y="12" width="8" height="6" rx="1" />
        <path d="M10 9h3l-1.5 3H14" />
        <path d="M6 18v-3" />
        <circle cx="6" cy="20" r="1" />
        <circle cx="18" cy="4" r="1" />
      </svg>
    ),
  },
  {
    name: 'Git',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M6 9v6" />
        <path d="M9 6h6a3 3 0 013 3v3" />
        <path d="M15 12v3" />
      </svg>
    ),
  },
  {
    name: 'Mobile UI Design',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <rect x="2" y="2" width="20" height="20" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <text x="12" y="16.5" textAnchor="middle" fontSize="11" fontWeight="600" fill="currentColor">TS</text>
      </svg>
    ),
  },
];

export function SkillsSection() {
  const ref = useFadeIn<HTMLElement>({ threshold: 0.15 });

  return (
    <section
      id="skills"
      ref={ref}
      className="w-full py-20 md:py-[120px] bg-navy"
      style={{
        borderTop: '1px solid transparent',
        borderImage: 'linear-gradient(to right, transparent, #1E293B, transparent) 1',
      }}
    >
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 lg:px-16 text-center">
        <span className="fade-in text-xs uppercase tracking-[0.1em] text-accent-blue font-medium">
          Tech Stack
        </span>

        <h2
          className="fade-in stagger-1 text-white mt-4 mb-4"
          style={{
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
          }}
        >
          Technologies I Work With
        </h2>

        <p className="fade-in stagger-2 text-text max-w-[520px] mx-auto mb-12">
          These are the core tools and technologies I use to bring mobile app
          ideas to life.
        </p>

        {/* Skills grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className={`fade-in skill-badge justify-center text-white text-sm font-medium`}
              style={{ transitionDelay: `${0.3 + index * 0.05}s` }}
            >
              {skill.icon}
              <span>{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
