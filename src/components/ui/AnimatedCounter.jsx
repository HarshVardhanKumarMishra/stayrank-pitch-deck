import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks';

const AnimatedCounter = ({ 
  end, 
  duration = 2000, 
  prefix = '', 
  suffix = '', 
  className = '',
  formatter = null 
}) => {
  const [count, setCount] = useState(0);
  const { elementRef, hasIntersected } = useIntersectionObserver();

  useEffect(() => {
    if (hasIntersected) {
      let startTime;
      let animationFrame;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);

        const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentCount = Math.floor(easeOutExpo * end);

        setCount(currentCount);

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => cancelAnimationFrame(animationFrame);
    }
  }, [hasIntersected, end, duration]);

  const displayValue = formatter ? formatter(count) : count.toLocaleString();

  return (
    <motion.span
      ref={elementRef}
      className={`font-bold ${className}`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={hasIntersected ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {prefix}{displayValue}{suffix}
    </motion.span>
  );
};

export default AnimatedCounter;
