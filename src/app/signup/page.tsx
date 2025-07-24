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
  IconUser,
} from "@tabler/icons-react";

export default function Signup() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
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
        this.color = `rgba(${
          Math.floor(Math.random() * 100) + 100
        }, ${Math.floor(Math.random() * 100) + 155}, ${
          Math.floor(Math.random() * 55) + 200
        }, ${Math.random() * 0.5 + 0.1})`;
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
      gradient.addColorStop(0, "rgba(15, 23, 42, 0.8)"); // slate-900 with opacity
      gradient.addColorStop(0.5, "rgba(6, 78, 59, 0.8)"); // green-950 with opacity
      gradient.addColorStop(1, "rgba(15, 23, 42, 0.8)"); // slate-900 with opacity

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

    try {
      const response = await axios.post("/api/auth/register", formData);
      console.log("Registration successful", response.data);
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
      console.error("Registration failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-black">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full -z-10"
      />

      <div className="w-full max-w-md z-10">
        <div className="backdrop-blur-sm bg-black/30 rounded-2xl p-6 border border-white/10 shadow-xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent">
              Create Account
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Join NutriByte for a healthier lifestyle
            </p>
          </div>

          {error && (
            <div className="mb-4 p-2 bg-red-500/20 border border-red-500/50 rounded-md text-red-200 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <LabelInputContainer className="mb-3">
              <Label
                htmlFor="fullname"
                className="text-sm text-gray-300"
              >
                Full Name
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-400">
                  <IconUser size={16} />
                </span>
                <Input
                  id="fullname"
                  placeholder="Your name"
                  type="text"
                  className="pl-9 h-9 bg-gray-900/50 border-gray-800 text-white"
                  value={formData.fullname}
                  onChange={handleChange}
                  required
                />
              </div>
            </LabelInputContainer>

            <LabelInputContainer className="mb-3">
              <Label
                htmlFor="email"
                className="text-sm text-gray-300"
              >
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

            <LabelInputContainer className="mb-4">
              <Label
                htmlFor="password"
                className="text-sm text-gray-300"
              >
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
                  minLength={8}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Must be at least 8 characters
              </p>
            </LabelInputContainer>

            <button
              className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-emerald-500 to-green-600 font-medium text-white shadow-lg shadow-green-700/20 hover:from-emerald-600 hover:to-green-700 transition-all duration-300 text-sm"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create account"}
              <BottomGradient />
            </button>

            <p className="text-xs text-gray-500 mt-3 text-center">
              By creating an account, you agree to our{" "}
              <a
                href="#"
                className="text-emerald-400 hover:underline"
              >
                Terms
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-emerald-400 hover:underline"
              >
                Privacy Policy
              </a>
            </p>
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
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-emerald-400 hover:underline"
              >
                Sign in
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
