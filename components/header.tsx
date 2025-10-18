"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

/**
 * Header Component Props
 * @param isScrolled - Boolean indicating if the page has been scrolled
 */
interface HeaderProps {
  isScrolled: boolean
}

/**
 * Header Component - Fixed navigation bar for the landing page
 *
 * Features:
 * - Sticky positioning that stays at the top while scrolling
 * - Dynamic styling that changes based on scroll position
 * - Responsive mobile menu that toggles on small screens
 * - Logo with gradient text effect
 * - Navigation links to all major page sections
 * - Download CTA button
 *
 * @param isScrolled - Determines header background and shadow styling
 */
export default function Header({ isScrolled }: HeaderProps) {
  // State to manage mobile menu open/close
  const [isOpen, setIsOpen] = useState(false)

  // Navigation links array with labels and href anchors
  const navLinks = [
    { label: "Home", href: "#" },
    { label: "Features", href: "#features" },
    { label: "Stats", href: "#stats" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "About", href: "#about" },
    { label: "FAQ", href: "#faq" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        // Dynamic styling: solid white with shadow when scrolled, gradient background when at top
        isScrolled ? "bg-white shadow-lg" : "bg-gradient-to-r from-white via-blue-50 to-white/80 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section - Markiit branding with image and text */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/markiit-logo.png" alt="Markiit" width={40} height={40} className="w-10 h-10" />
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Markiit
            </span>
          </Link>

          {/* Desktop Navigation - Hidden on mobile, visible on medium screens and up */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 transition-colors font-semibold text-sm"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Button - Download button visible on medium screens and up */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://play.google.com/store/apps/details?id=com.markiit.app"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all font-semibold"
            >
              Download
            </a>
          </div>

          {/* Mobile Menu Toggle Button - Hamburger icon for mobile navigation */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6 text-gray-900" /> : <Menu className="w-6 h-6 text-gray-900" />}
          </button>
        </div>

        {/* Mobile Navigation Menu - Dropdown menu visible only on mobile when toggled */}
        {isOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-semibold"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://play.google.com/store/apps/details?id=com.markiit.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold text-center"
            >
              Download
            </a>
          </nav>
        )}
      </div>
    </header>
  )
}
