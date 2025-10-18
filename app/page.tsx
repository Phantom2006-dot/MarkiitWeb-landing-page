"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Features from "@/components/features"
import Stats from "@/components/stats"
import Testimonials from "@/components/testimonials"
import About from "@/components/about"
import FAQ from "@/components/faq"
import CTA from "@/components/cta"
import Footer from "@/components/footer"

/**
 * Home Component - Main landing page for Markiit
 *
 * This is the root page component that orchestrates all sections of the landing page.
 * It manages scroll state to update the header styling as the user scrolls down the page.
 *
 * Features:
 * - Tracks scroll position to apply dynamic header styling
 * - Renders all major sections in a logical order
 * - Fully responsive and optimized for all screen sizes
 */
export default function Home() {
  // State to track if the page has been scrolled
  const [isScrolled, setIsScrolled] = useState(false)

  // Effect hook to listen for scroll events and update header styling
  useEffect(() => {
    const handleScroll = () => {
      // Update scroll state when user scrolls past the top of the page
      setIsScrolled(window.scrollY > 0)
    }

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll)

    // Cleanup: remove event listener when component unmounts
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* Header - Fixed navigation bar with logo and links */}
      <Header isScrolled={isScrolled} />

      {/* Hero Section - Main banner with headline and CTA buttons */}
      <Hero />

      {/* Features Section - Showcase of 4 main platform features */}
      <Features />

      {/* Stats Section - Key metrics and achievements */}
      <Stats />

      {/* Testimonials Section - User success stories and reviews */}
      <Testimonials />

      {/* About Section - Company mission and background */}
      <About />

      {/* FAQ Section - Searchable frequently asked questions with categories */}
      <FAQ />

      {/* CTA Section - Final call-to-action to download the app */}
      <CTA />

      {/* Footer - Links, newsletter signup, and company info */}
      <Footer />
    </main>
  )
}
