"use client";
import { useState } from "react";
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
import { div } from "motion/react-m";

export default function Signup() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [debug, setDebug] = useState<any>(null);

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
    if (!formData.email || !formData.password || !formData.fullname) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Sending registration request with data:", {
        ...formData,
        password: "****", // Hide actual password in logs
      });

      // Set a timeout for the request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await axios.post("/api/auth/register", formData, {
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      clearTimeout(timeoutId);

      console.log("Registration response:", response);

      // Store response data for debugging
      setDebug({
        status: response.status,
        data: response.data,
      });

      // Handle successful registration
      console.log("Registration successful", response.data);
      // You could redirect here or show a success message
    } catch (error: any) {
      console.error("Registration error:", error);

      // Detailed error logging
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);

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
        // The request was made but no response was received
        console.error("Error request:", error.request);
        setError("No response from server. Please check your connection.");

        setDebug({
          type: "Request error",
          request: "No response received",
        });
      } else if (error.message.includes("aborted")) {
        // Request was aborted (timeout)
        setError("Request timed out. Please try again.");

        setDebug({
          type: "Timeout",
          message: error.message,
        });
      } else {
        // Something else caused the error
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
              <Label htmlFor="fullname" className="text-sm text-gray-300">
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

            <LabelInputContainer className="mb-4">
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
                  minLength={8}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Must be at least 8 characters
              </p>
            </LabelInputContainer>
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
              <Link href="/login" className="text-emerald-400 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
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
