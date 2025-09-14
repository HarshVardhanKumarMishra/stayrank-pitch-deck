import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Shield, TrendingUp, Users } from 'lucide-react';
import { Button, AnimatedCounter } from '../ui';
import { smoothScrollTo } from '../../utils/helpers';
import { useTypingEffect } from '../../hooks';
import pitchData from '../../data/pitchData';

const HeroSection = () => {
  const { displayText, isTyping } = useTypingEffect(pitchData.company.tagline, 80);

  const handleCTAClick = () => {
    smoothScrollTo('problem', 80);
  };

  const stats = [
    { value: 50000, prefix: '₹', suffix: '+', label: 'Avg. Annual Loss Per Hotel' },
    { value: 80, suffix: '%', label: 'Hotels Need This Solution' },
    { value: 1000, suffix: '+', label: 'Properties Surveyed' },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-trust-50 pt-20 lg:pt-28">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-pattern opacity-5" />

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-primary-400 to-trust-400 rounded-full opacity-20"
        animate={{ y: [-20, 20, -20] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-safety-400 to-secondary-400 rounded-full opacity-20"
        animate={{ y: [20, -20, 20] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            {/* Company Badge */}
            <motion.div
              className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="w-6 h-6 bg-gradient-to-r from-primary-500 to-trust-500 rounded-full flex items-center justify-center">
                <Shield className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-700">
                {pitchData.company.foundedBy} presents
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="text-hero font-bold font-heading mb-6 text-gray-900"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="gradient-text">{pitchData.company.name}</span>
            </motion.h1>

            {/* Typed Subtitle */}
            <motion.div
              className="text-section-title font-semibold mb-6 text-gray-700 min-h-[1.2em]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {displayText}
              <motion.span
                className="text-primary-500"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {isTyping ? '|' : ''}
              </motion.span>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {pitchData.company.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <Button
                size="lg"
                onClick={handleCTAClick}
                icon={<ArrowRight className="w-5 h-5" />}
                className="text-lg px-8 py-4"
              >
                Explore the Solution
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => window.open('https://stayrank.com', '_blank')}
                icon={<Play className="w-5 h-5" />}
                className="text-lg px-8 py-4"
              >
                Watch Demo
              </Button>
            </motion.div>

            {/* Feature Icons */}
            <motion.div
              className="flex items-center justify-center lg:justify-start space-x-8 opacity-60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              <div className="flex items-center space-x-2">
                <Shield className="w-6 h-6 text-primary-500" />
                <span className="text-sm font-medium text-gray-600">Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-6 h-6 text-trust-500" />
                <span className="text-sm font-medium text-gray-600">Scalable</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-6 h-6 text-safety-500" />
                <span className="text-sm font-medium text-gray-600">Community-Driven</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Hero Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="relative image-overlay">
              <img
                src={pitchData.solution.heroImage}
                alt="Modern hotel lobby showcasing StayRank's target market"
                className="w-full h-96 lg:h-[500px] hero-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent rounded-xl"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-lg font-semibold mb-2">Modern Hospitality</p>
                <p className="text-sm opacity-90">Where safety meets excellence</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-3xl lg:text-4xl font-bold gradient-text mb-2">
                <AnimatedCounter
                  end={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  formatter={stat.value >= 1000 ? (val) => (val/1000).toFixed(1) + 'K' : null}
                />
              </div>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
