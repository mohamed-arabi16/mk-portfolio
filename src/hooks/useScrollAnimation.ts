import { useEffect, useRef } from 'react';

// Apple-style scroll animations
export const useScrollAnimation = () => {
  const elementsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    // Find all elements with scroll-animate class
    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observer.observe(el));

    elementsRef.current = Array.from(elements) as HTMLElement[];

    return () => {
      elementsRef.current.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return elementsRef;
};