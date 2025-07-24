// app/components/AnimatedCanvas.tsx
"use client";

import { useRef } from "react";
import { Search, Clock, Activity } from "lucide-react";
import { motion, useInView } from "framer-motion";
import HomeHero from "@/components/HomeHero";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  // Use InView hook for more efficient scroll animations
  const featuresRef = useRef<HTMLDivElement>(null);
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 });

  return (
    <main className="overflow-x-hidden w-full">
      <HomeHero />

      {/* Features Section - Optimized */}
      <section ref={featuresRef} className="container px-24 py-16 bg-gray-50">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            Take Control of Your Nutrition
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={featuresInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            NutriByte provides the tools you need to make informed food choices,
            track your progress, and achieve your health goals.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature Cards - Using one component for all three */}
          {["Food Database", "Meal Tracking", "REE Calculator"].map(
            (title, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 10 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  {index === 0 && <Search className="h-6 w-6 text-green-600" />}
                  {index === 1 && <Clock className="h-6 w-6 text-blue-600" />}
                  {index === 2 && (
                    <Activity className="h-6 w-6 text-purple-600" />
                  )}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {title}
                </h3>
                <p className="text-gray-600">
                  {index === 0 &&
                    "Access our database of foods with detailed nutritional information."}
                  {index === 1 &&
                    "Easily log your meals and track your daily calorie and nutrient intake."}
                  {index === 2 &&
                    "Calculate your energy expenditure and get personalized recommendations."}
                </p>
              </motion.div>
            )
          )}
        </div>
      </section>
      {/* How it works  */}
      <HowItWorks />
    </main>
  );
}
