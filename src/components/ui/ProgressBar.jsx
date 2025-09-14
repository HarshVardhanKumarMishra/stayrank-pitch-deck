import React from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks';

const ProgressBar = ({ 
  percentage, 
  color = 'primary', 
  height = 'h-2', 
  className = '',
  showPercentage = false,
  label = ''
}) => {
  const { elementRef, hasIntersected } = useIntersectionObserver();

  const colors = {
    primary: 'from-primary-500 to-primary-600',
    trust: 'from-trust-500 to-trust-600',
    safety: 'from-safety-500 to-safety-600',
    secondary: 'from-secondary-500 to-secondary-600'
  };

  return (
    <div ref={elementRef} className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          {showPercentage && (
            <span className="text-sm font-medium text-gray-500">{percentage}%</span>
          )}
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full ${height} overflow-hidden`}>
        <motion.div
          className={`${height} bg-gradient-to-r ${colors[color]} rounded-full`}
          initial={{ width: 0 }}
          animate={hasIntersected ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
