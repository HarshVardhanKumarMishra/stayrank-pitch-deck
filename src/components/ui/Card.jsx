import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '',
  hover = true,
  glass = false,
  gradient = false,
  onClick,
  ...props 
}) => {
  const baseClasses = 'rounded-xl transition-all duration-300';

  const variants = {
    default: 'bg-white shadow-lg border border-gray-100',
    glass: 'bg-white/10 backdrop-blur-md border border-white/20 shadow-xl',
    gradient: 'bg-gradient-to-br from-white to-gray-50 shadow-xl border border-gray-100'
  };

  const variant = glass ? 'glass' : gradient ? 'gradient' : 'default';
  const hoverClasses = hover ? 'hover:shadow-xl hover:scale-105' : '';
  const clickableClasses = onClick ? 'cursor-pointer' : '';

  const classes = `${baseClasses} ${variants[variant]} ${hoverClasses} ${clickableClasses} ${className}`;

  return (
    <motion.div
      className={classes}
      onClick={onClick}
      whileHover={hover ? { scale: 1.05, y: -5 } : {}}
      whileTap={onClick ? { scale: 0.95 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
