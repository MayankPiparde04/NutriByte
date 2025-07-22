"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  // Food items that will form our 404 visualization
  const foodItems = [
    { id: 1, emoji: "🥦", delay: 0, x: -20 }, // Broccoli
    { id: 2, emoji: "🍎", delay: 0.1, x: 20 }, // Apple
    { id: 3, emoji: "🥑", delay: 0.2, x: -15 }, // Avocado
    { id: 4, emoji: "🥕", delay: 0.3, x: 15 }, // Carrot
    { id: 5, emoji: "🍋", delay: 0.4, x: -10 }, // Lemon
    { id: 6, emoji: "🍌", delay: 0.5, x: 10 }, // Banana
    { id: 7, emoji: "🫐", delay: 0.6, x: -5 }, // Blueberries
    { id: 8, emoji: "🍇", delay: 0.7, x: 5 }, // Grapes
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      {/* Animated plate with 404 formed by food */}
      <div className="relative mb-8">
        {/* Plate */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-64 h-64 md:w-80 md:h-80 bg-white rounded-full shadow-xl flex items-center justify-center relative"
        >
          <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>

          {/* 404 text formed with food */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-8xl font-bold text-gray-300"
          >
            404
          </motion.div>

          {/* Food items bouncing around */}
          {foodItems.map((food) => (
            <motion.div
              key={food.id}
              initial={{ y: -100, opacity: 0, x: food.x }}
              animate={{
                y: [null, 0, -10, 0],
                opacity: 1,
                x: [null, food.x, food.x - 5, food.x],
              }}
              transition={{
                delay: food.delay,
                y: { duration: 0.5, ease: "easeOut" },
                opacity: { duration: 0.3 },
                x: {
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 2 + food.delay,
                  ease: "easeInOut",
                },
              }}
              className="text-4xl absolute"
              style={{
                top: `${30 + Math.random() * 40}%`,
                left: `${30 + Math.random() * 40}%`,
                zIndex: 10,
              }}
            >
              {food.emoji}
            </motion.div>
          ))}

          {/* Plate rim highlight */}
          <div className="absolute inset-0 rounded-full border-2 border-gray-200"></div>
        </motion.div>

        {/* Fork and knife */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-16 text-4xl"
        >
          🍴
        </motion.div>
      </div>

      {/* Error message */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center max-w-md"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Oops! Page Not Found
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Looks like this page is missing from our nutrition menu.
        </p>
        <p className="text-gray-500 mb-8">
          The page you're looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-2"
          >
            <Home size={18} />
            Back to Home
          </Button>

          <Button
            onClick={() => router.back()}
            variant="outline"
            className="flex items-center gap-2 border-green-500 text-green-600 hover:bg-green-50"
          >
            <RefreshCw size={18} />
            Go Back
          </Button>
        </div>
      </motion.div>

      {/* Nutrition facts */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-16 bg-white p-4 rounded-lg border border-gray-200 max-w-xs"
      >
        <div className="text-xs border-b-2 border-black pb-1">
          <div className="font-bold text-sm">ERROR 404 FACTS</div>
          <div className="font-bold text-sm">Serving Size: 1 Missing Page</div>
        </div>
        <div className="pt-1 border-b border-gray-300">
          <div className="flex justify-between">
            <span className="font-bold">Frustration</span>
            <span>100%</span>
          </div>
        </div>
        <div className="pt-1 border-b border-gray-300">
          <div className="flex justify-between">
            <span>Page Content</span>
            <span>0g</span>
          </div>
        </div>
        <div className="pt-1 border-b border-gray-300">
          <div className="flex justify-between">
            <span>User Satisfaction</span>
            <span>0%</span>
          </div>
        </div>
        <div className="pt-1 text-xs italic">
          * We're working to improve your digital nutrition experience
        </div>
      </motion.div>
    </div>
  );
}
