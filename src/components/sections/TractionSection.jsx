import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Award, TrendingUp, CheckCircle, MapPin } from 'lucide-react';
import { Card, AnimatedCounter, ProgressBar } from '../ui';
import { useIntersectionObserver } from '../../hooks';
import pitchData from '../../data/pitchData';

const TractionSection = () => {
  const { elementRef, hasIntersected } = useIntersectionObserver();
  const tractionData = pitchData.traction;

  const milestones = [
    { title: 'Market Research Completed', date: 'Q1 2024', status: 'completed' },
    { title: 'MVP Development', date: 'Q2 2024', status: 'completed' },
    { title: 'Pilot Program Launch', date: 'Q3 2024', status: 'in-progress' },
    { title: 'First 100 Hotels Onboarded', date: 'Q4 2024', status: 'upcoming' },
    { title: 'Series A Funding', date: 'Q1 2025', status: 'upcoming' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
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
    <section id="traction" className="section-padding bg-gradient-to-br from-primary-50 to-trust-50">
      <div className="container-custom">
        <motion.div
          ref={elementRef}
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-primary-100 px-4 py-2 rounded-full mb-6">
              <Target className="w-5 h-5 text-primary-600" />
              <span className="text-primary-700 font-semibold">Traction & Validation</span>
            </div>

            <h2 className="text-section-title font-bold font-heading text-gray-900 mb-6">
              {tractionData.title}
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Strong market validation and growing momentum across key metrics
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {tractionData.metrics.map((metric, index) => (
              <Card key={index} className="p-8 text-center" hover={true}>
                <div className="text-4xl lg:text-5xl font-bold gradient-text mb-4">
                  <AnimatedCounter
                    end={parseInt(metric.value.replace(/[^0-9]/g, '')) || 0}
                    suffix={metric.value.includes('+') ? '+' : metric.value.includes('%') ? '%' : ''}
                    prefix={metric.value.includes('₹') ? '₹' : ''}
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {metric.label}
                </h3>
                <p className="text-gray-600">
                  {metric.description}
                </p>
              </Card>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="mb-16">
            <Card className="p-8">
              <h3 className="text-2xl lg:text-3xl font-bold text-center text-gray-900 mb-12">
                Development Roadmap
              </h3>

              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-trust-500 hidden lg:block" />

                <div className="space-y-8">
                  {milestones.map((milestone, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-6"
                      initial={{ opacity: 0, x: -30 }}
                      animate={hasIntersected ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                        milestone.status === 'completed' 
                          ? 'bg-safety-500 text-white' 
                          : milestone.status === 'in-progress'
                          ? 'bg-secondary-500 text-white'
                          : 'bg-gray-300 text-gray-600'
                      }`}>
                        {milestone.status === 'completed' ? (
                          <CheckCircle className="w-8 h-8" />
                        ) : milestone.status === 'in-progress' ? (
                          <Target className="w-8 h-8" />
                        ) : (
                          <div className="w-3 h-3 bg-current rounded-full" />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                          <h4 className="text-xl font-bold text-gray-900 mb-2 lg:mb-0">
                            {milestone.title}
                          </h4>
                          <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                            milestone.status === 'completed'
                              ? 'bg-safety-100 text-safety-700'
                              : milestone.status === 'in-progress'
                              ? 'bg-secondary-100 text-secondary-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {milestone.date}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="p-8 lg:p-12 bg-gradient-to-r from-primary-600 to-trust-600 text-white">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-3xl lg:text-4xl font-bold mb-6">
                    Market Validation Complete
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-6 h-6 text-primary-200" />
                      <span className="text-lg">Himachal Pradesh Survey</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="w-6 h-6 text-primary-200" />
                      <span className="text-lg">1000+ Properties Contacted</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Award className="w-6 h-6 text-primary-200" />
                      <span className="text-lg">80%+ Problem Validation Rate</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-semibold">Problem Recognition</span>
                      <span className="text-2xl font-bold">80%</span>
                    </div>
                    <ProgressBar percentage={80} color="safety" height="h-3" />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-semibold">Willingness to Pay</span>
                      <span className="text-2xl font-bold">65%</span>
                    </div>
                    <ProgressBar percentage={65} color="secondary" height="h-3" />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-semibold">Early Adopter Interest</span>
                      <span className="text-2xl font-bold">45%</span>
                    </div>
                    <ProgressBar percentage={45} color="trust" height="h-3" />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TractionSection;
