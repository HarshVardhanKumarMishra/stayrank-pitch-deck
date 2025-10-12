import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useScrollPosition } from '../hooks';
import { smoothScrollTo } from '../utils/helpers';
import Button from './ui/Button';
import pitchData from '../data/pitchData';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollPosition } = useScrollPosition();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsScrolled(scrollPosition > 50);
  }, [scrollPosition]);

  const navItems = [
    { label: 'Problem', href: 'problem' },
    { label: 'Solution', href: 'solution' },
    { label: 'Market', href: 'market' },
    { label: 'Business Model', href: 'business-model' },
    { label: 'Traction', href: 'traction' },
    { label: 'Team', href: 'team' },
    { label: 'Financials', href: 'financials' }
  ];

  const handleNavClick = (href) => {
    smoothScrollTo(href, 80);
    setIsOpen(false);
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 lg:w-12 lg:h-12 overflow-hidden rounded-lg">
              <img 
                src={pitchData.company.logo} 
                alt="StayRank Logo"
                className="w-full h-full object-contain logo-image"
              />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold gradient-text font-heading">
                {pitchData.company.name}
              </h1>
              <p className="text-xs text-gray-600 hidden sm:block">
                Guest Intelligence Platform
              </p>
            </div>
          </motion.div>

          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          <div className="hidden lg:block">
            <Button
              onClick={() => handleNavClick('contact')}
              size="sm"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Get Started
            </Button>
          </div>

          <motion.button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden bg-white border-t shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container-custom py-4">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <motion.button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className="text-left text-gray-700 hover:text-primary-600 font-medium py-2 transition-colors duration-200"
                    whileHover={{ x: 10 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
                <div className="pt-4 border-t">
                  <Button
                    onClick={() => handleNavClick('contact')}
                    size="sm"
                    className="w-full"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
