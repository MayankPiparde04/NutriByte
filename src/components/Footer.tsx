'use client';

import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  const SocialLink = ({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) => (
    <Button variant="ghost" size="icon" asChild className="text-gray-400 hover:text-green-400">
      <a href={href}>
        <span className="sr-only">{label}</span>
        {icon}
      </a>
    </Button>
  );

  const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Button variant="link" asChild className="text-gray-300 hover:text-green-400 h-auto p-0">
      <a href={href}>{children}</a>
    </Button>
  );

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-green-400 mb-4">NutriByte</h3>
            <p className="text-gray-300 mb-4">
              Your trusted companion for tracking nutrition and maintaining a healthy lifestyle.
              Make informed food choices with our comprehensive nutrition database.
            </p>
            <div className="flex space-x-4">
              <SocialLink
                href="#"
                label="Facebook"
                icon={<Facebook className="h-6 w-6" />}
              />
              <SocialLink
                href="#"
                label="Twitter"
                icon={<Twitter className="h-6 w-6" />}
              />
              <SocialLink
                href="#"
                label="Instagram"
                icon={<Instagram className="h-6 w-6" />}
              />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col space-y-2">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/search">Food Search</FooterLink>
              <FooterLink href="/tracker">Nutrition Tracker</FooterLink>
              <FooterLink href="/recipes">Healthy Recipes</FooterLink>
              <FooterLink href="/about">About Us</FooterLink>
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <div className="flex flex-col space-y-2">
              <FooterLink href="/help">Help Center</FooterLink>
              <FooterLink href="/contact">Contact Us</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/terms">Terms of Service</FooterLink>
              <FooterLink href="/faq">FAQ</FooterLink>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-400">
            <Button variant="ghost" className="flex items-center justify-start">
              <Mail className="h-4 w-4 mr-2" />
              support@nutribyte.com
            </Button>
            <Button variant="ghost" className="flex items-center justify-start">
              <Phone className="h-4 w-4 mr-2" />
              +1 (555) 123-4567
            </Button>
            <Button variant="ghost" className="flex items-center justify-start">
              <MapPin className="h-4 w-4 mr-2" />
              San Francisco, CA
            </Button>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} NutriByte. All rights reserved. Made with ❤️ for your health.
          </p>
        </div>
      </div>
    </footer>
  );
}