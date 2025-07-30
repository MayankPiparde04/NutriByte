"use client";
import { useState, useEffect, useRef } from "react";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import axios from "axios";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconLock,
  IconMail,
} from "@tabler/icons-react";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [debug, setDebug] = useState<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Particle system setup
    const particles: Particle[] = [];
    const particleCount = 100;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = `rgba(${Math.floor(Math.random() * 150) + 100}, ${
          Math.floor(Math.random() * 10) + 15
        }, ${Math.floor(Math.random() * 155) + 20}, ${
          Math.random() * 0.5 + 0.1
        })`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create gradient background
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );
      gradient.addColorStop(0, "rgba(105, 23, 42, 0.8)"); // slate-900 with opacity
      gradient.addColorStop(0.5, "rgba(60, 78, 59, 0.8)"); // green-950 with opacity
      gradient.addColorStop(1, "rgba(15, 223, 42, 0.8)"); // slate-900 with opacity

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Draw connections between particles
      drawConnections();

      requestAnimationFrame(animate);
    };

    const drawConnections = () => {
      if (!ctx) return;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(74, 222, 128, ${(100 - distance) / 1000})`; // green-400 with distance-based opacity
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setDebug(null);

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Email and password are required");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Sending login request with email:", formData.email);

      // Set a timeout for the request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await axios.post("/api/auth/login", formData, {
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      clearTimeout(timeoutId);

      console.log("Login response:", response);

      // Store response data for debugging
      setDebug({
        status: response.status,
        data: response.data,
      });

      // Handle successful login
      console.log("Authentication successful", response.data);
      // You could redirect here or store authentication tokens
    } catch (error: any) {
      console.error("Login error:", error);

      // Detailed error logging
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);

        setError(
          error.response?.data?.message ||
            error.response?.data?.error ||
            `Server error: ${error.response.status}`
        );

        setDebug({
          type: "Response error",
          status: error.response.status,
          data: error.response.data,
        });
      } else if (error.request) {
        console.error("Error request:", error.request);
        setError("No response from server. Please check your connection.");

        setDebug({
          type: "Request error",
          request: "No response received",
        });
      } else if (error.message.includes("aborted")) {
        setError("Request timed out. Please try again.");

        setDebug({
          type: "Timeout",
          message: error.message,
        });
      } else {
        console.error("Error message:", error.message);
        setError("An unexpected error occurred. Please try again.");

        setDebug({
          type: "Unknown error",
          message: error.message,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-slate-900 via-green-950 to-slate-900">
      <div className="w-full max-w-md z-10">
        <div className="bg-black/40 rounded-2xl p-6 border border-white/10 shadow-xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Please sign in to continue to NutriByte
            </p>
          </div>

          {error && (
            <div className="mb-4 p-2 bg-red-500/20 border border-red-500/50 rounded-md text-red-200 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email" className="text-sm text-gray-300">
                Email Address
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-400">
                  <IconMail size={16} />
                </span>
                <Input
                  id="email"
                  placeholder="you@example.com"
                  type="email"
                  className="pl-9 h-9 bg-gray-900/50 border-gray-800 text-white"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </LabelInputContainer>

            <LabelInputContainer className="mb-6">
              <Label htmlFor="password" className="text-sm text-gray-300">
                Password
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-400">
                  <IconLock size={16} />
                </span>
                <Input
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  className="pl-9 h-9 bg-gray-900/50 border-gray-800 text-white"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </LabelInputContainer>

            <div className="flex justify-between items-center mb-5 text-xs">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="mr-2 h-3 w-3 rounded border-gray-700 bg-gray-800"
                />
                <label htmlFor="remember" className="text-gray-300">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-emerald-400 hover:text-emerald-300">
                Forgot password?
              </a>
            </div>

            <button
              className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-emerald-500 to-green-600 font-medium text-white shadow-lg shadow-green-700/20 hover:from-emerald-600 hover:to-green-700 transition-all duration-300 text-sm"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
              <BottomGradient />
            </button>
          </form>

          <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-30" />

          <div className="grid grid-cols-2 gap-3">
            <button
              className="group/btn shadow-sm relative flex h-9 items-center justify-center rounded-md bg-gray-800 px-3 text-xs font-medium text-white hover:bg-gray-700 transition-all duration-300"
              type="button"
            >
              <IconBrandGithub className="h-4 w-4 mr-2" />
              <span>GitHub</span>
            </button>
            <button
              className="group/btn shadow-sm relative flex h-9 items-center justify-center rounded-md bg-gray-800 px-3 text-xs font-medium text-white hover:bg-gray-700 transition-all duration-300"
              type="button"
            >
              <IconBrandGoogle className="h-4 w-4 mr-2" />
              <span>Google</span>
            </button>
          </div>

          <div className="text-center mt-5">
            <p className="text-gray-400 text-xs">
              Don't have an account?{" "}
              <Link href="/signup" className="text-emerald-400 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-1.5", className)}>
      {children}
    </div>
  );
};
