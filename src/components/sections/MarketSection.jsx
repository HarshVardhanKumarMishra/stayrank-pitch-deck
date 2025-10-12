import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, MapPin, Building, CheckCircle2 } from 'lucide-react';
import { Card, AnimatedCounter } from '../ui';
import { useIntersectionObserver, useImageLoad } from '../../hooks';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import pitchData from '../../data/pitchData';

const MarketSection = () => {
  const { elementRef, hasIntersected } = useIntersectionObserver();
  const marketData = pitchData.market;
  const { loaded: backgroundImageLoaded } = useImageLoad(marketData.backgroundImage);

  const marketGrowthData = [
    { year: '2023', value: 281.83 },
    { year: '2024', value: 320.45 },
    { year: '2025', value: 365.12 },
    { year: '2026', value: 416.89 },
    { year: '2027', value: 476.33 },
    { year: '2028', value: 541.70 }
  ];

  const segmentData = [
    { name: 'Hotels', value: 45, color: '#3b82f6' },
    { name: 'Homestays', value: 30, color: '#0ea5e9' },
    { name: 'Guest Houses', value: 15, color: '#22c55e' },
    { name: 'Others', value: 10, color: '#eab308' }
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
    <section id="market" className="section-padding bg-gradient-to-br from-trust-50 to-primary-50">
      <div className="container-custom">
        <motion.div
          ref={elementRef}
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-trust-100 px-4 py-2 rounded-full mb-6">
              <TrendingUp className="w-5 h-5 text-trust-600" />
              <span className="text-trust-700 font-semibold">Market Opportunity</span>
            </div>

            <h2 className="text-section-title font-bold font-heading text-gray-900 mb-6">
              {marketData.title}
            </h2>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <Card className="p-6 text-center">
                  <div className="text-3xl lg:text-4xl font-bold gradient-text mb-2">
                    {marketData.size.current}
                  </div>
                  <p className="text-gray-600 font-medium">Current Market Size</p>
                </Card>

                <Card className="p-6 text-center border-2 border-trust-200">
                  <div className="text-3xl lg:text-4xl font-bold text-trust-600 mb-2">
                    {marketData.size.projected}
                  </div>
                  <p className="text-gray-600 font-medium">Projected by 2028</p>
                </Card>

                <Card className="p-6 text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-safety-600 mb-2">
                    {marketData.size.growth}
                  </div>
                  <p className="text-gray-600 font-medium">Growth Opportunity</p>
                </Card>
              </div>
            </div>
          </motion.div>

          {backgroundImageLoaded && (
            <motion.div 
              variants={itemVariants}
              className="relative mb-16 rounded-2xl overflow-hidden"
            >
              <div className="relative h-64 lg:h-80">
                <img
                  src={marketData.backgroundImage}
                  alt="Elegant hotel lobby representing the luxury hospitality market"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-trust-900/60 to-primary-900/60"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white text-center p-8">
                  <div>
                    <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                      $541.70 Billion Market by 2028
                    </h3>
                    <p className="text-xl lg:text-2xl opacity-90 max-w-3xl">
                      India's hospitality industry is experiencing unprecedented growth
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <motion.div variants={itemVariants} className="mb-16">
            <Card className="p-8">
              <h3 className="text-2xl lg:text-3xl font-bold text-center text-gray-900 mb-8">
                Indian Hospitality Market Growth
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={marketGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="year" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip 
                      formatter={(value) => [`$${value}B`, 'Market Size']}
                      labelStyle={{ color: '#333' }}
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '2px solid #3b82f6',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="value" fill="url(#colorGradient)" radius={[4, 4, 0, 0]} />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#0ea5e9" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {marketData.stats.map((stat, index) => (
              <Card key={index} className="p-8 text-center" hover={true}>
                <div className="text-4xl lg:text-5xl font-bold gradient-text mb-4">
                  <AnimatedCounter
                    end={parseInt(stat.value.replace(/[^\d]/g, '')) || 0}
                    suffix={stat.value.includes('Crore') ? ' Cr' : stat.value.includes('Lakh') ? 'L+' : '+'}
                    formatter={(val) => {
                      if (val > 10000000) return (val/10000000).toFixed(1);
                      if (val > 100000) return (val/100000).toFixed(0);
                      if (val > 1000) return (val/1000).toFixed(0) + 'K';
                      return val;
                    }}
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {stat.label}
                </h3>
                <p className="text-gray-600 mb-2">
                  {stat.source}
                </p>
              </Card>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Market Segments</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={segmentData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {segmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Target Segments</h3>
              <div className="space-y-4">
                {segmentData.map((segment, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: segment.color }}
                      />
                      <span className="font-semibold text-gray-700">{segment.name}</span>
                    </div>
                    <span className="text-2xl font-bold" style={{ color: segment.color }}>
                      {segment.value}%
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="p-8 lg:p-12 bg-gradient-to-r from-trust-600 to-primary-600 text-white">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-3xl lg:text-4xl font-bold mb-6">
                    {marketData.validation.title}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-6 h-6 text-trust-200" />
                      <span className="text-lg">{marketData.validation.location}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Building className="w-6 h-6 text-trust-200" />
                      <span className="text-lg">{marketData.validation.methodology}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xl font-bold mb-4">Key Findings:</h4>
                  {marketData.validation.findings.map((finding, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle2 className="w-6 h-6 text-safety-300 flex-shrink-0 mt-0.5" />
                      <span className="text-lg">{finding}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MarketSection;
