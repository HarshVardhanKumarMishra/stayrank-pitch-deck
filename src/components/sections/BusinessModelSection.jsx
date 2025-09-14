import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Repeat, Crown, TrendingUp } from 'lucide-react';
import { Card, ProgressBar } from '../ui';
import { useIntersectionObserver } from '../../hooks';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import pitchData from '../../data/pitchData';

const BusinessModelSection = () => {
  const { elementRef, hasIntersected } = useIntersectionObserver();
  const businessData = pitchData.businessModel;

  const revenueData = [
    { name: 'Subscription', value: 45, color: '#3b82f6' },
    { name: 'Per-Transaction', value: 30, color: '#0ea5e9' },
    { name: 'Premium Features', value: 20, color: '#22c55e' },
    { name: 'Partnerships', value: 5, color: '#eab308' }
  ];

  const projectedRevenue = [
    { month: 'M1', subscription: 50, transaction: 20, premium: 10 },
    { month: 'M3', subscription: 150, transaction: 80, premium: 40 },
    { month: 'M6', subscription: 400, transaction: 200, premium: 120 },
    { month: 'M12', subscription: 800, transaction: 450, premium: 300 },
    { month: 'M18', subscription: 1200, transaction: 600, premium: 450 },
    { month: 'M24', subscription: 1800, transaction: 800, premium: 600 }
  ];

  const iconMap = {
    'Subscription Model': <Repeat className="w-8 h-8" />,
    'Per-Transaction Fee': <DollarSign className="w-8 h-8" />,
    'Premium Features': <Crown className="w-8 h-8" />,
    'Partnership Revenue': <DollarSign className="w-8 h-8" /> // Fixed: replaced Handshake with DollarSign
  };

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
    <section id="business-model" className="section-padding bg-gradient-to-br from-safety-50 to-secondary-50">
      <div className="container-custom">
        <motion.div
          ref={elementRef}
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-safety-100 px-4 py-2 rounded-full mb-6">
              <TrendingUp className="w-5 h-5 text-safety-600" />
              <span className="text-safety-700 font-semibold">Business Model</span>
            </div>

            <h2 className="text-section-title font-bold font-heading text-gray-900 mb-6">
              {businessData.title}
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Multiple revenue streams ensuring sustainable growth and scalability
            </p>
          </motion.div>

          {/* Revenue Streams */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {businessData.streams.map((stream, index) => (
              <Card key={index} className="p-8 h-full" hover={true}>
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-safety-500 to-primary-500 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                    {iconMap[stream.name] || <DollarSign className="w-8 h-8" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {stream.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {stream.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-700 mb-1">Pricing:</p>
                    <p className="text-lg font-bold text-safety-600">{stream.pricing}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-700 mb-1">Target:</p>
                    <p className="text-gray-900">{stream.target}</p>
                  </div>
                </div>
              </Card>
            ))}
          </motion.div>

          {/* Revenue Distribution */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Revenue Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={revenueData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {revenueData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Revenue Breakdown</h3>
              <div className="space-y-6">
                {revenueData.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-700">{item.name}</span>
                      <span className="text-xl font-bold" style={{ color: item.color }}>
                        {item.value}%
                      </span>
                    </div>
                    <ProgressBar
                      percentage={item.value}
                      color={item.color === '#3b82f6' ? 'primary' : item.color === '#22c55e' ? 'safety' : 'trust'}
                      height="h-3"
                    />
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Revenue Projection */}
          <motion.div variants={itemVariants} className="mb-16">
            <Card className="p-8">
              <h3 className="text-2xl lg:text-3xl font-bold text-center text-gray-900 mb-8">
                24-Month Revenue Projection (₹K)
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={projectedRevenue}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip 
                      formatter={(value, name) => [`₹${value}K`, name]}
                      labelStyle={{ color: '#333' }}
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '2px solid #22c55e',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="subscription" stackId="a" fill="#3b82f6" name="Subscription" />
                    <Bar dataKey="transaction" stackId="a" fill="#0ea5e9" name="Transaction" />
                    <Bar dataKey="premium" stackId="a" fill="#22c55e" name="Premium" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>

          {/* Key Metrics */}
          <motion.div variants={itemVariants}>
            <Card className="p-8 lg:p-12 bg-gradient-to-r from-safety-600 to-primary-600 text-white">
              <h3 className="text-3xl lg:text-4xl font-bold text-center mb-12">
                Projected Key Metrics
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold mb-2">₹2.5Cr</div>
                  <p className="text-xl opacity-90">ARR by Year 2</p>
                </div>

                <div className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold mb-2">4,000+</div>
                  <p className="text-xl opacity-90">Properties by Year 3</p>
                </div>

                <div className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold mb-2">65%</div>
                  <p className="text-xl opacity-90">Gross Margin</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BusinessModelSection;
