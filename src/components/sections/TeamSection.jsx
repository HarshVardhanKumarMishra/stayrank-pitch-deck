import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Briefcase, GraduationCap, Linkedin, Mail } from 'lucide-react';
import { Card } from '../ui';
import { useIntersectionObserver, useImageLoad } from '../../hooks';
import pitchData from '../../data/pitchData';

const TeamMemberCard = ({ member, index }) => {
  const { loaded, error } = useImageLoad(member.image);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <Card className="team-card-enhanced text-center">
        <div className="relative mb-6">
          {/* Team Member Photo */}
          <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full border-4 border-primary-100">
            {loaded && !error ? (
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full team-photo object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-primary-500 to-trust-500 flex items-center justify-center">
                <Users className="w-16 h-16 text-white" />
              </div>
            )}
          </div>

          {/* Loading/Error States */}
          {!loaded && !error && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="spinner"></div>
            </div>
          )}
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {member.name}
        </h3>

        <p className="text-primary-600 font-semibold mb-4">
          {member.role}
        </p>

        <p className="text-gray-600 mb-6 leading-relaxed">
          {member.experience}
        </p>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Expertise
          </h4>
          <div className="flex flex-wrap gap-2 justify-center">
            {member.expertise.map((skill, skillIndex) => (
              <span
                key={skillIndex}
                className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-center space-x-4 mt-6">
          <motion.button
            className="p-2 rounded-lg bg-trust-100 text-trust-600 hover:bg-trust-200 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Linkedin className="w-5 h-5" />
          </motion.button>
          <motion.button
            className="p-2 rounded-lg bg-primary-100 text-primary-600 hover:bg-primary-200 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Mail className="w-5 h-5" />
          </motion.button>
        </div>
      </Card>
    </motion.div>
  );
};

const TeamSection = () => {
  const { elementRef, hasIntersected } = useIntersectionObserver();
  const teamData = pitchData.team;
  const { loaded: teamImageLoaded } = useImageLoad(teamData.teamImage);

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
    <section id="team" className="section-padding bg-gradient-to-br from-trust-50 to-primary-50">
      <div className="container-custom">
        <motion.div
          ref={elementRef}
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-trust-100 px-4 py-2 rounded-full mb-6">
              <Users className="w-5 h-5 text-trust-600" />
              <span className="text-trust-700 font-semibold">Our Team</span>
            </div>

            <h2 className="text-section-title font-bold font-heading text-gray-900 mb-6">
              {teamData.title}
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              A passionate team with deep industry expertise and proven track record in hospitality and technology
            </p>

            {/* Team Culture Image */}
            {teamImageLoaded && (
              <motion.div
                className="relative max-w-4xl mx-auto mb-16"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={hasIntersected ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="image-overlay rounded-2xl overflow-hidden">
                  <img
                    src={teamData.teamImage}
                    alt="StayRank team celebrating success"
                    className="w-full h-64 lg:h-80 hospitality-image"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">Team StayRank</h3>
                    <p className="text-lg opacity-90">Building the future of hospitality safety together</p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Team Members */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {teamData.members.map((member, index) => (
              <TeamMemberCard key={index} member={member} index={index} />
            ))}
          </motion.div>

          {/* Team Strengths */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-safety-500 to-safety-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Industry Expertise
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Combined 40+ years of experience in hospitality, technology, and business operations
              </p>
            </Card>

            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Proven Track Record
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Successfully built and scaled technology solutions in the hospitality sector
              </p>
            </Card>

            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-trust-500 to-trust-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Continuous Learning
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Committed to staying ahead of industry trends and technological advancements
              </p>
            </Card>
          </motion.div>

          {/* Advisory Board */}
          <motion.div variants={itemVariants}>
            <Card className="p-8 lg:p-12 bg-gradient-to-r from-trust-600 to-primary-600 text-white">
              <h3 className="text-3xl lg:text-4xl font-bold text-center mb-12">
                Advisory Board & Mentors
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Hotel Industry Veterans</h4>
                  <p className="text-primary-100">
                    Former executives from leading hotel chains providing strategic guidance
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Briefcase className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Technology Advisors</h4>
                  <p className="text-primary-100">
                    Tech leaders with experience in scaling B2B SaaS platforms
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
