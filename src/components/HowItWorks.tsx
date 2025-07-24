'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Cpu, BarChart3, FileImage, Table, FileText, FileSpreadsheet, Eye, TrendingUp, CheckCircle } from 'lucide-react';

export default function HowItWorks() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const steps = [
    {
      number: "1",
      title: "Upload Your File",
      description: "Send an image, table, PDF or Excel file — REE understands them all.",
      icon: Upload,
      supportIcons: [FileImage, Table, FileText, FileSpreadsheet],
      gradient: "from-blue-500 to-cyan-500",
      position: "left"
    },
    {
      number: "2",
      title: "Let REE Decode It",
      description: "Our AI extracts, analyzes and organizes nutritional information.",
      icon: Cpu,
      supportIcons: [Eye, TrendingUp],
      gradient: "from-purple-500 to-pink-500",
      position: "right"
    },
    {
      number: "3",
      title: "Get Instant Insights",
      description: "See visual charts, dietary flags, and get smart suggestions from REE.",
      icon: BarChart3,
      supportIcons: [CheckCircle, TrendingUp],
      gradient: "from-emerald-500 to-teal-500",
      position: "left"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const stepVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  };

  const connectionVariants = {
    hidden: { 
      pathLength: 0,
      opacity: 0
    },
    visible: { 
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.5, ease: "easeInOut" },
        opacity: { duration: 0.5 }
      }
    }
  };

  const getPathD = () => {
    if (isMobile) {
      return "M300 100 L300 900";  // Straight line for mobile
    }
    return `M300 100 
            C 600 100, 900 200, 900 400
            C 900 600, 300 500, 300 800
            C 300 850, 600 900, 600 900`; // Original S-curve
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-700 via-green-900 to-slate-700 py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Smart Food Analysis,{' '}
            <span className="bg-gradient-to-r from-blue-400 via-green-400 to-cyan-400 bg-clip-text text-transparent">
              Simplified.
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Transform any food data into actionable insights with our intelligent 3-step process
          </p>
        </motion.div>

        {/* S-Flow Container */}
        <motion.div 
          className="relative"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Updated SVG Path for smoother S-curve */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none z-0" 
            viewBox="0 0 1200 1000"
            preserveAspectRatio="xMidYMid meet"
            style={{ height: '120vh' }}
          >
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.6 }} />
                <stop offset="50%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.6 }} />
                <stop offset="100%" style={{ stopColor: '#06b6d4', stopOpacity: 0.6 }} />
              </linearGradient>
            </defs>
            <motion.path
              d={getPathD()}
              stroke="url(#pathGradient)"
              strokeWidth={isMobile ? "2" : "4"}
              fill="none"
              variants={connectionVariants}
              className="drop-shadow-lg"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Steps Container - Updated spacing for mobile */}
          <div className="relative z-10 space-y-16 md:space-y-24">
            {steps.map((step, index) => {
              const MainIcon = step.icon;
              
              return (
                <motion.div
                  key={index}
                  variants={stepVariants}
                  className={`flex items-center justify-center ${
                    step.position === 'right' ? 'md:justify-end md:pr-20' : 'md:justify-start md:pl-20'
                  }`}
                >
                  <div className={`relative group ${step.position === 'right' ? 'md:flex-row-reverse' : ''} flex flex-col md:flex-row items-center gap-8`}>
                    {/* Content Card */}
                    <motion.div 
                      className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-md border border-white/20 shadow-2xl"
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <div className="flex items-center mb-4">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                          {step.number}
                        </div>
                        <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                      </div>
                      
                      <p className="text-gray-200 text-lg mb-6 leading-relaxed">
                        {step.description}
                      </p>
                      
                      {/* Support Icons */}
                      <div className="flex gap-3">
                        {step.supportIcons.map((SupportIcon, iconIndex) => (
                          <motion.div
                            key={iconIndex}
                            className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 transition-all"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <SupportIcon size={20} />
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Main Icon Circle */}
                    <motion.div 
                      className={`relative w-32 h-32 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-2xl`}
                      whileHover={{ 
                        scale: 1.1,
                        rotate: 360
                      }}
                      transition={{ 
                        scale: { type: "spring", stiffness: 300, damping: 20 },
                        rotate: { duration: 0.8, ease: "easeInOut" }
                      }}
                    >
                      {/* Glow Effect */}
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.gradient} blur-xl opacity-50 scale-110`}></div>
                      
                      {/* Icon */}
                      <MainIcon className="text-white z-10 relative" size={48} />
                      
                      {/* Pulse Animation */}
                      <motion.div
                        className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.gradient} opacity-30`}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.1, 0.3]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Floating Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${10 + i * 20}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
    
        </motion.div>
      </div>
    </div>
  );
}



