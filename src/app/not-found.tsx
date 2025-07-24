"use client";

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-gray-100 p-4 min-w-full">
      <div className="flex flex-col justify-center p-4 mt-16 min-h-full">
        <div className="relative mb-12 flex justify-center">
          {/* Plate */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-64 h-64 md:w-80 md:h-80 bg-gray-900 rounded-full shadow-2xl flex items-center justify-center relative border-4 border-gray-800"
          >
            <div className="absolute inset-0 rounded-full border-8 border-gray-800"></div>

            {/* 404 text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-8xl font-bold text-gray-700"
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
                className="text-4xl absolute filter drop-shadow-lg"
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
            <div className="absolute inset-0 rounded-full border-2 border-gray-800"></div>
          </motion.div>

          {/* Fork and knife with glow effect */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 translate-x-16 text-4xl filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
          >
            🍴
          </motion.div>
        </div>

        {/* Error message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h1 className="text-4xl font-bold text-green-400 mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Looks like this page is missing from our nutrition menu.
          </p>
          <p className="text-gray-400 mb-8">
            The page you're looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => router.push("/")}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>

            <Button
              onClick={() => router.back()}
              variant="outline"
              className="border-green-600 text-green-400 hover:bg-green-950"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
        </motion.div>

        {/* Nutrition facts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 bg-gray-900 p-6 rounded-lg border border-gray-800 max-w-xs mx-auto"
        >
          <div className="text-xs border-b-2 border-green-500 pb-2">
            <div className="font-bold text-sm text-green-400">
              ERROR 404 FACTS
            </div>
            <div className="font-bold text-sm text-gray-400">
              Serving Size: 1 Missing Page
            </div>
          </div>
          <div className="pt-2 border-b border-gray-800">
            <div className="flex justify-between text-gray-300">
              <span className="font-bold">Frustration</span>
              <span>100%</span>
            </div>
          </div>
          <div className="pt-2 border-b border-gray-800">
            <div className="flex justify-between text-gray-300">
              <span>Page Content</span>
              <span>0g</span>
            </div>
          </div>
          <div className="pt-2 border-b border-gray-800">
            <div className="flex justify-between text-gray-300">
              <span>User Satisfaction</span>
              <span>0%</span>
            </div>
          </div>
          <div className="pt-2 text-xs italic text-gray-500">
            * We're working to improve your digital nutrition experience
          </div>
        </motion.div>
      </div>
    </div>
  );
}
