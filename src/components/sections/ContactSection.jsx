import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, ExternalLink, Calendar } from 'lucide-react';
import { Card, Button } from '../ui';
import { useIntersectionObserver } from '../../hooks';

const ContactSection = () => {
  const { elementRef, hasIntersected } = useIntersectionObserver();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    const mailtoLink = `mailto:hello@stayrank.com?subject=Investment Inquiry from ${formData.name}&body=${formData.message}`;
    window.open(mailtoLink);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
    <section id="contact" className="section-padding bg-gradient-to-br from-gray-900 via-primary-900 to-trust-900 text-white">
      <div className="container-custom">
        <motion.div
          ref={elementRef}
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Mail className="w-5 h-5 text-secondary-300" />
              <span className="text-secondary-200 font-semibold">Get In Touch</span>
            </div>

            <h2 className="text-section-title font-bold font-heading mb-6">
              Ready to Transform Hospitality?
            </h2>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Join us in revolutionizing guest intelligence and making hospitality safer for everyone. Let's discuss how StayRank can benefit your investment portfolio.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <Card className="p-8 bg-white/10 backdrop-blur-md border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Schedule a Meeting
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Company/Organization
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                      placeholder="Your company name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                      placeholder="Tell us about your interest in StayRank..."
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="secondary"
                    size="lg"
                    className="w-full"
                    icon={<Send className="w-5 h-5" />}
                  >
                    Send Message
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              <Card className="p-8 bg-white/10 backdrop-blur-md border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Contact Information
                </h3>

                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-secondary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm">Email us at</p>
                      <a 
                        href="mailto:hello@stayrank.com"
                        className="text-secondary-300 font-semibold hover:text-secondary-200 transition-colors"
                      >
                        hello@stayrank.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ExternalLink className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm">Visit our platform</p>
                      <a 
                        href="https://stayrank.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-300 font-semibold hover:text-primary-200 transition-colors"
                      >
                        stayrank.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-trust-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm">Based in</p>
                      <p className="text-trust-300 font-semibold">India</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-8 bg-white/10 backdrop-blur-md border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Quick Actions
                </h3>

                <div className="space-y-4">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => window.open('https://stayrank.com', '_blank')}
                    className="w-full border-white/30 text-white hover:bg-white hover:text-gray-900"
                    icon={<ExternalLink className="w-5 h-5" />}
                  >
                    Visit Live Platform
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => window.open('mailto:hello@stayrank.com?subject=Demo Request', '_blank')}
                    className="w-full border-white/30 text-white hover:bg-white hover:text-gray-900"
                    icon={<Calendar className="w-5 h-5" />}
                  >
                    Request Demo
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div variants={itemVariants} className="text-center mt-16">
            <Card className="p-8 lg:p-12 bg-gradient-to-r from-secondary-600 to-primary-600 border-none">
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Join the Hospitality Revolution
              </h3>
              <p className="text-xl text-secondary-100 mb-8 max-w-2xl mx-auto">
                Together, we can make hospitality safer, more profitable, and future-ready. The opportunity is now.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="safety"
                  size="xl"
                  onClick={() => window.open('mailto:hello@stayrank.com?subject=Investment Interest', '_blank')}
                  className="px-12 py-4 text-lg"
                >
                  Invest in StayRank
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
