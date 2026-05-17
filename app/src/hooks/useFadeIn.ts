import { useEffect, useRef } from 'react';

interface UseFadeInOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useFadeIn<T extends HTMLElement>(
  options: UseFadeInOptions = {}
) {
  const ref = useRef<T>(null);
  const { threshold = 0.15, rootMargin = '0px' } = options;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      const el = ref.current;
      if (el) {
        el.classList.add('visible');
        const children = el.querySelectorAll('.fade-in');
        children.forEach((child) => child.classList.add('visible'));
      }
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    const el = ref.current;
    if (!el) return;

    if (el.classList.contains('fade-in')) {
      observer.observe(el);
    }

    const children = el.querySelectorAll('.fade-in');
    children.forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}
