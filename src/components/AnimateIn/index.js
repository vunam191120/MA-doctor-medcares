import React, { useRef, useState, useEffect } from 'react';

// Animations
const FadeInLeft = ({ children, className, transition }) => (
  <AnimateIn
    className={className}
    from={{ transform: 'translateX(-100px)', opacity: 0 }}
    to={{ transform: 'translateX(0)', opacity: 1 }}
    transition={transition}
  >
    {children}
  </AnimateIn>
);

const FadeInRight = ({ children, className, transition }) => (
  <AnimateIn
    className={className}
    from={{ transform: 'translateX(100px)', opacity: 0 }}
    to={{ transform: 'translateX(0)', opacity: 1 }}
    transition={transition}
  >
    {children}
  </AnimateIn>
);

const FadeInUp = ({ children, className, transition }) => (
  <AnimateIn
    className={className}
    from={{ transform: 'translateY(100px)', opacity: 0 }}
    to={{ transform: 'translateY(0)', opacity: 1 }}
    transition={transition}
  >
    {children}
  </AnimateIn>
);

const FadeInDown = ({ children, className, transition }) => (
  <AnimateIn
    className={className}
    from={{ transform: 'translateY(-100px)', opacity: 0 }}
    to={{ transform: 'translateY(0)', opacity: 1 }}
    transition={transition}
  >
    {children}
  </AnimateIn>
);

const ScaleInTop = ({ children, className, transition }) => (
  <AnimateIn
    className={className}
    from={{ transform: 'scale(0)', transformOrigin: '50% 0', opacity: 0 }}
    to={{ transform: 'scale(1)', transformOrigin: '50% 0', opacity: 1 }}
    transition={transition}
  >
    {children}
  </AnimateIn>
);

const ScaleInCenter = ({ children, className, transition }) => (
  <AnimateIn
    className={className}
    from={{ transform: 'scale(0)', transformOrigin: '50% 50%', opacity: 0 }}
    to={{ transform: 'scale(1)', transformOrigin: '50% 50%', opacity: 1 }}
    transition={transition}
  >
    {children}
  </AnimateIn>
);

// Function check element is on screen
const useElementOnScreen = (ref, rootMargin = '10%') => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    let observerContainer = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
        }
      },
      { rootMargin }
    );

    if (ref.current) {
      observerContainer = ref.current;
      observer.observe(observerContainer);
    }

    return () => {
      if (observerContainer) {
        observer.unobserve(observerContainer);
      }
    };
  }, [ref, rootMargin]);

  return isIntersecting;
};

export default function AnimateIn({
  from,
  to,
  children,
  className,
  transition,
}) {
  const ref = useRef();
  const onScreen = useElementOnScreen(ref);

  return (
    <div
      ref={ref}
      className={`${className} container-animation`}
      style={
        onScreen
          ? {
              ...transition,
              ...to,
            }
          : {
              ...transition,
              ...from,
            }
      }
    >
      {children}
    </div>
  );
}

export const Animate = {
  FadeInDown,
  FadeInUp,
  FadeInLeft,
  FadeInRight,
  ScaleInTop,
  ScaleInCenter,
};

AnimateIn.defaultProps = {
  transition: { transition: '1000ms ease-in-out' },
  className: '',
};
