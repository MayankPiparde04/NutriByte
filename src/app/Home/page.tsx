// app/components/AnimatedCanvas.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search, Clock, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";

// Images for scrolling animations - add more for better looping effect
const foodImages = Array(5).fill("/Nutribyte-logo.png");
const mealPlanImages = Array(5).fill("/Nutribyte-logo.png");

export default function Home() {
  // Use InView hook for more efficient scroll animations
  const featuresRef = useRef<HTMLDivElement>(null);
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 });

  return (
    <main className="overflow-x-hidden w-full">
      {/* Hero Section - With scrolling images */}
      <section className="relative min-h-[90vh] bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden">
        {/* Subtle background pattern - optimized */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, #4CAF50 0.5px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative z-10  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 flex flex-col lg:flex-row items-center">
          {/* Hero content */}
          <motion.div
            className="flex-1 text-center lg:text-left lg:pr-8 mb-10 lg:mb-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Your <span className="text-green-400">Personalized</span>{" "}
              Nutrition Assistant
            </h1>
            <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto lg:mx-0">
              Track your meals, discover healthy recipes, and reach your
              nutrition goals with insights tailored just for you.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg">
                Get Started
              </Button>
              <Button
                variant="outline"
                className="border-white/20 text-white bg-black/10 hover:bg-white/10"
              >
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          {/* Scrolling images*/}
          <div className="flex-1 lg:flex lg:justify-end">
            <div className="relative h-[500px] w-full max-w-md grid grid-cols-2 gap-4 overflow-hidden">
              {/* Left column - top to bottom scrolling */}
              <div className="relative h-full overflow-hidden rounded-xl shadow-lg">
                <motion.div
                  className="absolute top-0 left-0 w-full flex flex-col gap-4"
                  animate={{ y: ["-50%", "0%"] }}
                  transition={{
                    duration: 30,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                >
                  {[...foodImages, ...foodImages].map((src, index) => (
                    <div
                      key={`food-${index}`}
                      className="relative h-60 w-full rounded-lg overflow-hidden"
                    >
                      <Image
                        src={src}
                        alt={`Healthy food ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 50vw, 20vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right column - bottom to top scrolling */}
              <div className="relative h-full overflow-hidden rounded-xl shadow-lg">
                <motion.div
                  className="absolute top-0 left-0 w-full flex flex-col gap-4"
                  animate={{ y: ["0%", "-50%"] }}
                  transition={{
                    duration: 30,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                >
                  {[...mealPlanImages, ...mealPlanImages].map((src, index) => (
                    <div
                      key={`meal-${index}`}
                      className="relative h-60 w-full rounded-lg overflow-hidden"
                    >
                      <Image
                        src={src}
                        alt={`Meal plan ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 50vw, 20vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider - simplified */}
        <div className="absolute bottom-0 left-0 right-0 h-12 overflow-hidden">
          <svg
            className="absolute bottom-0 w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.18,95.43,160.42,67.3,248.11,56.76,290.89,51.44,276.08,59.68,321.39,56.44Z"
              fill="#f9fafb"
            />
          </svg>
        </div>
      </section>

      {/* Features Section - Optimized */}
      <section ref={featuresRef} className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              NutriByte provides the tools you need to make informed food
              choices, track your progress, and achieve your health goals.
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
                    {index === 0 && (
                      <Search className="h-6 w-6 text-green-600" />
                    )}
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
        </div>
      </section>
    </main>
  );
}
