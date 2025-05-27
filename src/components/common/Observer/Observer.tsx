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

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          onIntersect();
          observer.unobserve(first.target);
        }
      },
      { threshold, rootMargin }
    );

    const currentRef = observerRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    // 컴포넌트 언마운트 시 정리
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [enabled, onIntersect, threshold, rootMargin]);

  return <div ref={observerRef} className={className} />;
};

export default Observer;
