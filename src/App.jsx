import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import HeroSection from './components/sections/HeroSection';
import ProblemSection from './components/sections/ProblemSection';
import SolutionSection from './components/sections/SolutionSection';
import MarketSection from './components/sections/MarketSection';
import BusinessModelSection from './components/sections/BusinessModelSection';
import TractionSection from './components/sections/TractionSection';
import TeamSection from './components/sections/TeamSection';
import FinancialsSection from './components/sections/FinancialsSection';
import ContactSection from './components/sections/ContactSection';
import VoiceAssistant from './components/VoiceAssistant/VoiceAssistant';
import './index.css';

function App() {
  return (
    <AnimatePresence>
      <div className="App">
        <Navigation />

        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <HeroSection />
          <ProblemSection />
          <SolutionSection />
          <MarketSection />
          <BusinessModelSection />
          <TractionSection />
          <TeamSection />
          <FinancialsSection />
          <ContactSection />
        </motion.main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-trust-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">SR</span>
                  </div>
                  <h3 className="text-xl font-bold">StayRank</h3>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Revolutionary guest intelligence platform for the hospitality industry. 
                  Check before check-in.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="https://stayrank.com" className="hover:text-white transition-colors">Platform</a></li>
                  <li><a href="mailto:hello@stayrank.com" className="hover:text-white transition-colors">Contact</a></li>
                  <li><a href="#problem" className="hover:text-white transition-colors">About</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
                <div className="space-y-2 text-gray-400">
                  <p>hello@stayrank.com</p>
                  <p>stayrank.com</p>
                  <p>Lodging Innovations Pvt. Ltd.</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2025 StayRank, powered by Lodging Innovations Pvt. Ltd. All rights reserved.</p>
              <p>Designed and Developed by Harsh Vardhan Kumar Mishra</p>
            </div>
          </div>
        </footer>
        <VoiceAssistant />
      </div>
    </AnimatePresence>
  );
}

export default App;
