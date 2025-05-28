'use client';

import { useEffect, useRef } from 'react';
import { ObserverProps } from './type';

const Observer = ({
  onIntersect,
  threshold = 0.1,
  rootMargin = '0px',
  enabled = true,
  className = 'h-10 w-full',
}: ObserverProps) => {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;

    const target = observerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          onIntersect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [enabled, onIntersect, threshold, rootMargin]);

  return <div ref={observerRef} className={className} />;
};

export default Observer;
