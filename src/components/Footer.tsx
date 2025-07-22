"use client";

import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Footer() {
  const SocialLink = ({
    href,
    label,
    icon,
  }: {
    href: string;
    label: string;
    icon: React.ReactNode;
  }) => (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className="rounded-full bg-gray-800 p-2 transition-colors hover:bg-green-500/20"
    >
      <a href={href} className="text-gray-400 hover:text-green-400">
        <span className="sr-only">{label}</span>
        {icon}
      </a>
    </motion.div>
  );

  const FooterLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a
      href={href}
      className="group flex items-center text-gray-300 transition-colors hover:text-green-400"
    >
      <span>{children}</span>
      <ArrowRight className="ml-1 h-3 w-0 opacity-0 transition-all group-hover:w-3 group-hover:opacity-100" />
    </a>
  );

  const ContactItem = ({
    icon,
    children,
  }: {
    icon: React.ReactNode;
    children: React.ReactNode;
  }) => (
    <div className="flex items-center space-x-3 text-gray-400">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800">
        {icon}
      </div>
      <span>{children}</span>
    </div>
  );

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      {/* Decorative accent */}
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-green-400/70 via-green-500/30 to-green-400/70" />

      <div className="mx-auto max-w-6xl px-4 pt-12 pb-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-5">
            <div className="mb-6 flex items-center">
              {/* <div className="mr-2 h-8 w-8 rounded-lg bg-gradient-to-br from-green-400 to-emerald-600" /> */}
              <Image
                src="/NutriByte-logo.png"
                alt="NutriByte Logo"
                width={32}
                height={32}
                className="mr-2  rounded-full"
              />
              <h3 className="text-2xl font-bold tracking-tight text-white">
                NutriByte
              </h3>
            </div>
            <p className="mb-6 text-gray-300 leading-relaxed">
              Your trusted companion for tracking nutrition and maintaining a
              healthy lifestyle. Make informed food choices with our
              comprehensive nutrition database.
            </p>
            <div className="flex space-x-3">
              <SocialLink
                href="#"
                label="Facebook"
                icon={<Facebook className="h-5 w-5" />}
              />
              <SocialLink
                href="#"
                label="Twitter"
                icon={<Twitter className="h-5 w-5" />}
              />
              <SocialLink
                href="#"
                label="Instagram"
                icon={<Instagram className="h-5 w-5" />}
              />
            </div>
          </div>

          {/* Links Section */}
          <div className="col-span-1 md:col-span-7">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
              {/* Quick Links */}
              <div className="flex flex-col">
                <h4 className="mb-4 text-lg font-semibold text-white">
                  Quick Links
                </h4>
                <div className="flex flex-col space-y-3">
                  <FooterLink href="/search">Food Search</FooterLink>
                  <FooterLink href="/tracker">Nutrition Tracker</FooterLink>
                  <FooterLink href="/recipes">Healthy Recipes</FooterLink>
                  <FooterLink href="/about">About Us</FooterLink>
                </div>
              </div>

              {/* Support */}
              <div className="flex flex-col">
                <h4 className="mb-4 text-lg font-semibold text-white">
                  Support
                </h4>
                <div className="flex flex-col space-y-3">
                  <FooterLink href="/contact">Contact Us</FooterLink>
                  <FooterLink href="/faq">FAQ</FooterLink>
                  <FooterLink href="/privacy">Privacy Policy</FooterLink>
                  <FooterLink href="/terms">Terms of Use</FooterLink>
                </div>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col">
                <h4 className="mb-4 text-lg font-semibold text-white">
                  Contact Us
                </h4>
                <div className="flex flex-col space-y-4">
                  <ContactItem icon={<Mail className="h-4 w-12" />}>
                    support@nutribyte.com
                  </ContactItem>
                  <ContactItem icon={<Phone className="h-4 w-4" />}>
                    +91 1234567890
                  </ContactItem>
                  <ContactItem icon={<MapPin className="h-4 w-4" />}>
                    Indore, India
                  </ContactItem>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        {/* <div className="mt-10 rounded-xl bg-gray-800/50 p-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <h4 className="text-lg font-semibold text-white">Subscribe to Our Newsletter</h4>
              <p className="text-gray-400">Get the latest nutrition tips and updates.</p>
            </div>
            <div className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-100 focus:border-green-500 focus:outline-none"
              />
              <Button className="bg-green-500 hover:bg-green-600">
                Subscribe
              </Button>
            </div>
          </div>
        </div> */}

        {/* Copyright */}
        <div className="mt-10 border-t border-gray-800 pt-6 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} NutriByte. All rights reserved. Made
            with
            <span className="mx-1 text-green-400">❤️</span>for your health.
          </p>
        </div>
      </div>
    </footer>
  );
}
