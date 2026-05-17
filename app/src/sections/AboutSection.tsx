import { useFadeIn } from '@/hooks/useFadeIn';

export function AboutSection() {
  const ref = useFadeIn<HTMLElement>({ threshold: 0.2 });

  return (
    <section
      id="about"
      ref={ref}
      className="w-full py-20 md:py-[120px] bg-dark"
    >
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Text content */}
          <div>
            <span className="fade-in text-xs uppercase tracking-[0.1em] text-accent-purple font-medium">
              About Me
            </span>

            <h2
              className="fade-in stagger-1 text-white mt-4 mb-6"
              style={{
                fontSize: 'clamp(32px, 5vw, 64px)',
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
              }}
            >
              Passionate about mobile experiences
            </h2>

            <div className="space-y-4">
              <p className="fade-in stagger-2 text-text leading-relaxed">
                I'm a junior React Native developer passionate about creating
                seamless cross-platform mobile experiences. I believe great apps
                combine clean, maintainable code with intuitive UI that users
                genuinely enjoy interacting with.
              </p>

              <p className="fade-in stagger-3 text-text leading-relaxed">
                My journey into mobile development started with a curiosity about
                how apps work under the hood. Today, I specialize in building
                performant cross-platform applications using React Native, focusing
                on smooth animations, offline capabilities, and accessibility.
              </p>

              <p className="fade-in stagger-4 text-text leading-relaxed">
                I'm constantly learning and exploring new tools in the React
                ecosystem. Currently deepening my knowledge in state management
                patterns, custom native module development, and advanced navigation
                architectures.
              </p>
            </div>
          </div>

          {/* Profile photo */}
          <div className="fade-in stagger-3 flex justify-center md:justify-end">
            <div className="relative max-w-[400px] w-full">
              <img
                src="/images/about-portrait.jpg"
                alt="Viktor Bereziak - React Native Developer"
                className="w-full rounded-2xl border border-border"
                style={{
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  aspectRatio: '3/4',
                  objectFit: 'cover',
                }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
