import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Zap, Shield, Database, AlertCircle, FileCheck, Sparkles } from 'lucide-react';
import { Card, Button } from '../ui';
import { useIntersectionObserver, useImageLoad } from '../../hooks';
import pitchData from '../../data/pitchData';

const SolutionSection = () => {
  const { elementRef, hasIntersected } = useIntersectionObserver();
  const solutionData = pitchData.solution;
  const { loaded: checkInImageLoaded } = useImageLoad(solutionData.checkInImage);

  const iconMap = {
    '🎯': <Zap className="w-8 h-8" />,
    '🚨': <AlertCircle className="w-8 h-8" />,
    '📊': <Database className="w-8 h-8" />,
    '🔍': <Shield className="w-8 h-8" />,
    '📝': <FileCheck className="w-8 h-8" />,
    '⚡': <Sparkles className="w-8 h-8" />
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
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
    <section id="solution" className="section-padding bg-gradient-to-br from-primary-50 via-white to-trust-50">
      <div className="container-custom">
        <motion.div
          ref={elementRef}
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-primary-100 px-4 py-2 rounded-full mb-6">
              <CheckCircle className="w-5 h-5 text-primary-600" />
              <span className="text-primary-700 font-semibold">Revolutionary Solution</span>
            </div>

            <h2 className="text-section-title font-bold font-heading text-gray-900 mb-6">
              {solutionData.title}
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {solutionData.subtitle}
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Transforming Guest Check-in Experience
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our OCR-based system revolutionizes the traditional check-in process, making it faster, 
                safer, and more intelligent. Real-time risk assessment ensures you know your guests before they check-in.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-safety-500" />
                  <span className="text-gray-700">Instant ID verification in seconds</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-safety-500" />
                  <span className="text-gray-700">Real-time guest behavior database lookup</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-safety-500" />
                  <span className="text-gray-700">Automated compliance documentation</span>
                </div>
              </div>
            </div>

            {checkInImageLoaded && (
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                animate={hasIntersected ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="image-overlay rounded-2xl overflow-hidden">
                  <img
                    src={solutionData.checkInImage}
                    alt="Modern hotel check-in process with StayRank technology"
                    className="w-full h-80 hospitality-image"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h4 className="text-lg font-semibold mb-1">Smart Check-in</h4>
                    <p className="text-sm opacity-90">Technology meets hospitality</p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {solutionData.features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="p-8 h-full text-center group hover:shadow-2xl transition-all duration-500">
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-r from-primary-500 to-trust-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {iconMap[feature.icon] || <Zap className="w-8 h-8" />}
                  </motion.div>

                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {feature.description}
                  </p>

                  <div className="inline-flex items-center space-x-2 bg-safety-100 px-3 py-1 rounded-full">
                    <CheckCircle className="w-4 h-4 text-safety-600" />
                    <span className="text-sm font-semibold text-safety-700">
                      {feature.benefit}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="mb-16">
            <Card className="p-8 lg:p-12 bg-gradient-to-r from-primary-600 to-trust-600 text-white">
              <div className="text-center mb-8">
                <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                  {solutionData.uniqueValue.title}
                </h3>
                <p className="text-xl opacity-90">
                  {solutionData.uniqueValue.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {solutionData.uniqueValue.points.map((point, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={hasIntersected ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <CheckCircle className="w-6 h-6 text-safety-300 flex-shrink-0" />
                    <span className="text-lg">{point}</span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <Card className="p-8 lg:p-12 bg-white border-2 border-primary-200">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                See StayRank in Action
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Experience how our platform transforms guest management and eliminates risks in real-time.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  onClick={() => window.open('https://stayrank.com', '_blank')}
                  className="px-8 py-4"
                >
                  Visit Live Platform
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.open('mailto:hello@stayrank.com', '_blank')}
                  className="px-8 py-4"
                >
                  Request Demo
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionSection;
