import { useFadeIn } from '@/hooks/useFadeIn';
import { projects } from '@/data/projects';

export function MobileProjectCards() {
  const ref = useFadeIn<HTMLDivElement>({ threshold: 0.1 });

  return (
    <div ref={ref} className="flex flex-col gap-8">
      {projects.map((project, index) => (
        <div
          key={project.id}
          className="fade-in bg-dark border border-border rounded-2xl overflow-hidden"
          style={{ transitionDelay: `${index * 0.15}s` }}
        >
          {/* Screenshot */}
          <div className="relative w-full" style={{ aspectRatio: '9/16', maxHeight: '500px' }}>
            <img
              src={project.image}
              alt={`${project.title} app screenshot`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-xl font-semibold text-white mb-2">
              {project.title}
            </h3>
            <p className="text-sm text-text leading-relaxed mb-4">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
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

            {/* GitHub link */}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-accent-cyan hover:underline transition-all duration-300"
            >
              View on GitHub &rarr;
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
