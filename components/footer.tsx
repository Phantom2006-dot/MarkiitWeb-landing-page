"use client"

import type React from "react"

import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

/**
 * Footer Component - Main footer section with links, newsletter, and company info
 *
 * Features:
 * - Newsletter subscription form
 * - App download buttons (Apple and Google Play)
 * - Social media links
 * - Multiple link sections (Product, Company, Support, Legal)
 * - Responsive grid layout
 * - Copyright and legal links at bottom
 */
export default function Footer() {
  // Get current year for copyright notice
  const currentYear = new Date().getFullYear()
  // State for newsletter email input
  const [email, setEmail] = useState("")
  // State to show subscription success message
  const [subscribed, setSubscribed] = useState(false)

  /**
   * Footer links organized by section
   * Each section contains an array of link labels
   */
  const footerLinks = {
    product: ["Features", "Download", "Pricing", "Roadmap"],
    company: ["About", "Blog", "Careers", "Contact"],
    support: ["Support", "Email", "Phone", "Address"],
    legal: ["Privacy", "Terms", "Security"],
  }

  /**
   * Handle newsletter subscription form submission
   * Shows success message and clears input after 3 seconds
   */
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // Show success message
      setSubscribed(true)
      // Clear email input
      setEmail("")
      // Hide success message after 3 seconds
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Grid - 6 columns on desktop, responsive on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-12 mb-12">
          {/* Brand and Newsletter Section - 2 columns on desktop */}
          <div className="md:col-span-2">
            {/* Logo and Brand Name */}
            <div className="flex items-center gap-2 mb-4">
              <Image src="/markiit-logo.png" alt="Markiit" width={40} height={40} />
            </div>

            {/* Brand Description */}
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              The all-in-one platform for selling, saving, and connecting. Powered by Marvora.
            </p>

            {/* Newsletter Subscription Section */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Stay Updated</h4>
              <p className="text-gray-600 text-sm mb-3">
                Subscribe for the latest updates on new features, promotions, and marketplace trends.
              </p>

              {/* Newsletter Form */}
              <form onSubmit={handleSubscribe} className="flex gap-2">
                {/* Email Input */}
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  required
                />

                {/* Subscribe Button */}
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm"
                >
                  Subscribe
                </button>
              </form>

              {/* Success Message - Shows after subscription */}
              {subscribed && <p className="text-green-600 text-sm mt-2">✓ Thanks for subscribing!</p>}
            </div>

            {/* App Download Section */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Download App</h4>
              <div className="flex gap-3">
                {/* Apple App Store Button */}
                <a
                  href="#"
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-semibold"
                >
                  <Image src="/apple-logo.png" alt="Apple" width={20} height={20} className="brightness-0 invert" />
                  App Store
                </a>

                {/* Google Play Store Button */}
                <a
                  href="#"
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                >
                  <Image
                    src="/android-logo.png"
                    alt="Play Store"
                    width={20}
                    height={20}
                    className="brightness-0 invert"
                  />
                  Play Store
                </a>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex gap-3">
              {/* Twitter Link */}
              <a
                href="#"
                className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>

              {/* Instagram Link */}
              <a
                href="#"
                className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>

              {/* Facebook Link */}
              <a
                href="#"
                className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>

              {/* LinkedIn Link */}
              <a
                href="#"
                className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Links Section */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links Section */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links Section */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links Section */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom Section - Copyright and legal links */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright Notice */}
            <p className="text-gray-600 text-sm">© {currentYear} Marvora Inc. All rights reserved.</p>

            {/* Footer Bottom Links */}
            <div className="flex gap-6">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
