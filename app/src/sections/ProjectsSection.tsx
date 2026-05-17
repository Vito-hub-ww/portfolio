import { useState, Suspense, useRef, useEffect, useCallback } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useFadeIn } from '@/hooks/useFadeIn';
import { CardScrollGalleryWrapper } from '@/components/CardScrollGallery';
import { MobileProjectCards } from '@/components/MobileProjectCards';
import { projects } from '@/data/projects';

function ProjectInfoPanel({ activeIndex }: { activeIndex: number }) {
  const project = projects[activeIndex] || projects[0];

  return (
    <div className="pointer-events-none max-w-[400px]">
      <h3
        className="text-white mb-3 transition-opacity duration-300"
        style={{
          fontSize: 'clamp(28px, 4vw, 48px)',
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          mixBlendMode: 'overlay',
        }}
      >
        {project.title}
      </h3>
      <p className="text-text text-base mb-4 transition-opacity duration-300">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-4 pointer-events-auto">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-1 rounded-md"
            style={{
              backgroundColor: 'rgba(139, 92, 246, 0.12)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              color: '#8B5CF6',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-semibold text-accent-cyan hover:underline transition-all duration-300 pointer-events-auto inline-block"
      >
        View on GitHub &rarr;
      </a>
    </div>
  );
}

export function ProjectsSection() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useFadeIn<HTMLDivElement>({ threshold: 0.2 });

  const handleActiveChange = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '100px' }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="w-full relative bg-dark overflow-hidden"
    >
      {/* Section label */}
      <div
        ref={labelRef}
        className="absolute top-20 left-6 md:left-16 z-20"
      >
        <span className="fade-in text-xs uppercase tracking-[0.1em] text-accent-purple font-medium">
          Featured Work
        </span>
      </div>

      {isDesktop ? (
        /* Desktop: 3D Canvas Gallery */
        <div className="relative" style={{ height: '200vh' }}>
          {isInView && (
            <Suspense
              fallback={
                <div className="sticky top-0 w-full h-screen flex items-center justify-center">
                  <div className="text-muted">Loading 3D gallery...</div>
                </div>
              }
            >
              <CardScrollGalleryWrapper onActiveChange={handleActiveChange} />
            </Suspense>
          )}

          {/* Info overlay */}
          <div
            className="sticky top-0 w-full h-screen pointer-events-none z-10"
          >
            <div className="absolute bottom-20 left-6 md:left-16">
              <ProjectInfoPanel activeIndex={activeIndex} />
            </div>
          </div>
        </div>
      ) : (
        /* Mobile: Static card layout */
        <div className="py-20 px-6">
          <div className="mb-12">
            <span className="text-xs uppercase tracking-[0.1em] text-accent-purple font-medium">
              Featured Work
            </span>
            <h2
              className="text-white mt-4"
              style={{
                fontSize: 'clamp(28px, 5vw, 48px)',
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
              }}
            >
              My Projects
            </h2>
          </div>
          <MobileProjectCards />
        </div>
      )}
    </section>
  );
}
