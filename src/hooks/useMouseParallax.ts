import { useEffect, useRef } from 'react';

interface ParallaxOptions {
  strength?: number;
  element?: HTMLElement | null;
}

// Apple-style mouse parallax effect
export const useMouseParallax = ({ strength = 20, element }: ParallaxOptions = {}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targetElement = element || elementRef.current;
    if (!targetElement) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = targetElement.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) / rect.width;
      const deltaY = (e.clientY - centerY) / rect.height;
      
      const moveX = deltaX * strength;
      const moveY = deltaY * strength;
      
      targetElement.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    };

    const handleMouseLeave = () => {
      targetElement.style.transform = 'translate3d(0, 0, 0)';
    };

    document.addEventListener('mousemove', handleMouseMove);
    targetElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      targetElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, element]);

  return elementRef;
};