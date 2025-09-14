import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, PieChart as PieChartIcon, BarChart3 } from 'lucide-react';
import { Card, AnimatedCounter } from '../ui';
import { useIntersectionObserver } from '../../hooks';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import pitchData from '../../data/pitchData';

const FinancialsSection = () => {
  const { elementRef, hasIntersected } = useIntersectionObserver();
  const financialData = pitchData.financials;

  const revenueProjection = financialData.revenue.map(item => ({
    year: item.year,
    revenue: item.arr / 100000, // Convert to lakhs
    customers: item.customers
  }));

  const fundingUse = financialData.funding.use;

  const colors = ['#3b82f6', '#0ea5e9', '#22c55e', '#eab308'];

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
    <section id="financials" className="section-padding bg-gradient-to-br from-secondary-50 to-primary-50">
      <div className="container-custom">
        <motion.div
          ref={elementRef}
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-secondary-100 px-4 py-2 rounded-full mb-6">
              <BarChart3 className="w-5 h-5 text-secondary-600" />
              <span className="text-secondary-700 font-semibold">Financial Projections</span>
            </div>

            <h2 className="text-section-title font-bold font-heading text-gray-900 mb-6">
              {financialData.title}
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Strong growth trajectory with clear path to profitability and scalability
            </p>
          </motion.div>

          {/* Key Financial Metrics */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="p-8 text-center" hover={true}>
              <div className="text-4xl lg:text-5xl font-bold gradient-text mb-4">
                <AnimatedCounter
                  end={24}
                  suffix=" Cr"
                  prefix="₹"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Projected ARR (Year 5)
              </h3>
              <p className="text-gray-600">
                Annual Recurring Revenue
              </p>
            </Card>

            <Card className="p-8 text-center" hover={true}>
              <div className="text-4xl lg:text-5xl font-bold text-safety-600 mb-4">
                <AnimatedCounter
                  end={4000}
                  suffix="+"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Target Customers
              </h3>
              <p className="text-gray-600">
                Properties by Year 5
              </p>
            </Card>

            <Card className="p-8 text-center" hover={true}>
              <div className="text-4xl lg:text-5xl font-bold text-trust-600 mb-4">
                <AnimatedCounter
                  end={65}
                  suffix="%"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Gross Margin
              </h3>
              <p className="text-gray-600">
                Industry-leading profitability
              </p>
            </Card>
          </motion.div>

          {/* Revenue Projection Chart */}
          <motion.div variants={itemVariants} className="mb-16">
            <Card className="p-8">
              <h3 className="text-2xl lg:text-3xl font-bold text-center text-gray-900 mb-8">
                5-Year Revenue Projection (₹ Lakhs)
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueProjection}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="year" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip 
                      formatter={(value, name) => [
                        name === 'revenue' ? `₹${value}L` : value,
                        name === 'revenue' ? 'Revenue' : 'Customers'
                      ]}
                      labelStyle={{ color: '#333' }}
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '2px solid #3b82f6',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#3b82f6" 
                      strokeWidth={4}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>

          {/* Funding Requirements */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Funding Ask</h3>
              <div className="text-center mb-8">
                <div className="text-5xl lg:text-6xl font-bold gradient-text mb-4">
                  {financialData.funding.ask}
                </div>
                <p className="text-xl text-gray-600">Total Funding Required</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-primary-50 rounded-lg">
                  <span className="font-semibold text-gray-700">Series A Round</span>
                  <span className="text-xl font-bold text-primary-600">₹2 Cr</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-700">Valuation</span>
                  <span className="text-xl font-bold text-gray-900">₹15 Cr</span>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Use of Funds</h3>
              <div className="h-64 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={fundingUse}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="percentage"
                      label={({ category, percentage }) => `${category}: ${percentage}%`}
                    >
                      {fundingUse.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-3">
                {fundingUse.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: colors[index % colors.length] }}
                      />
                      <span className="font-medium text-gray-700">{item.category}</span>
                    </div>
                    <span className="font-bold text-gray-900">
                      ₹{(item.amount / 10000000).toFixed(1)}Cr
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Financial Highlights */}
          <motion.div variants={itemVariants}>
            <Card className="p-8 lg:p-12 bg-gradient-to-r from-secondary-600 to-primary-600 text-white">
              <h3 className="text-3xl lg:text-4xl font-bold text-center mb-12">
                Investment Highlights
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 mx-auto mb-4 text-secondary-200" />
                  <div className="text-3xl font-bold mb-2">12x</div>
                  <p className="text-secondary-100">Revenue Multiple (5 years)</p>
                </div>

                <div className="text-center">
                  <DollarSign className="w-12 h-12 mx-auto mb-4 text-secondary-200" />
                  <div className="text-3xl font-bold mb-2">18 months</div>
                  <p className="text-secondary-100">Runway with Current Funding</p>
                </div>

                <div className="text-center">
                  <PieChartIcon className="w-12 h-12 mx-auto mb-4 text-secondary-200" />
                  <div className="text-3xl font-bold mb-2">35%</div>
                  <p className="text-secondary-100">Net Profit Margin (Year 3)</p>
                </div>

                <div className="text-center">
                  <BarChart3 className="w-12 h-12 mx-auto mb-4 text-secondary-200" />
                  <div className="text-3xl font-bold mb-2">₹6K</div>
                  <p className="text-secondary-100">Average Revenue Per User</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinancialsSection;
