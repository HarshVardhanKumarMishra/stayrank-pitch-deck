import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingDown, DollarSign, Users } from 'lucide-react';
import { Card, AnimatedCounter } from '../ui';
import { useIntersectionObserver, useImageLoad } from '../../hooks';
import pitchData from '../../data/pitchData';

const ProblemSection = () => {
  const { elementRef, hasIntersected } = useIntersectionObserver();
  const problemData = pitchData.problem;
  const { loaded: backgroundImageLoaded } = useImageLoad(problemData.backgroundImage);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="problem" className="section-padding bg-gradient-to-br from-red-50 to-orange-50">
      <div className="container-custom">
        <motion.div
          ref={elementRef}
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-red-100 px-4 py-2 rounded-full mb-6">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span className="text-red-700 font-semibold">Critical Industry Problem</span>
            </div>

            <h2 className="text-section-title font-bold font-heading text-gray-900 mb-6">
              {problemData.title}
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {problemData.subtitle}
            </p>
          </motion.div>

          {/* Problem Context with Background Image */}
          {backgroundImageLoaded && (
            <motion.div 
              variants={itemVariants}
              className="relative mb-16 rounded-2xl overflow-hidden"
            >
              <div className="relative h-64 lg:h-80">
                <img
                  src={problemData.backgroundImage}
                  alt="Luxury hotel setting showing the hospitality industry context"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-red-900/70 to-orange-900/70"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white text-center p-8">
                  <div>
                    <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                      The Hidden Crisis in Hospitality
                    </h3>
                    <p className="text-xl lg:text-2xl opacity-90 max-w-3xl">
                      Behind every beautiful hotel lies a significant challenge that costs the industry billions annually
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Key Statistics */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {problemData.statistics.map((stat, index) => (
              <Card key={index} className="p-8 text-center" hover={true}>
                <div className="text-4xl lg:text-5xl font-bold text-red-600 mb-4">
                  <AnimatedCounter
                    end={parseInt(stat.value.replace(/[^\d]/g, '')) || 50000}
                    prefix={stat.value.match(/^[^\d]*/)?.[0] || ''}
                    suffix={stat.value.match(/[^\d]*$/)?.[0] || ''}
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {stat.label}
                </h3>
                <p className="text-gray-600">
                  {stat.description}
                </p>
              </Card>
            ))}
          </motion.div>

          {/* Problem Details */}
          <motion.div variants={itemVariants} className="mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-center text-gray-900 mb-12">
              The Problems Hurting Hotels Daily
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {problemData.issues.map((issue, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group"
                >
                  <Card className="p-8 h-full hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl mb-4 flex-shrink-0">
                        {issue.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-3">
                          {issue.title}
                        </h4>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {issue.description}
                        </p>
                        {issue.examples && (
                          <div className="space-y-2">
                            <p className="text-sm font-semibold text-red-700">
                              Real Examples:
                            </p>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {issue.examples.map((example, idx) => (
                                <li key={idx} className="flex items-center space-x-2">
                                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0" />
                                  <span>{example}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Impact Statement */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl p-8 lg:p-12 text-center text-white"
          >
            <motion.div
              className="text-6xl lg:text-8xl font-bold mb-4 opacity-90"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ₹50,000+
            </motion.div>
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Average Annual Loss Per Hotel
            </h3>
            <p className="text-lg lg:text-xl opacity-90 max-w-3xl mx-auto">
              This is not just a number - it represents real financial pain that thousands of hotels face every year. It's time for a solution.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
