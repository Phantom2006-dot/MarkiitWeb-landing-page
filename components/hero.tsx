"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

/**
 * Hero Component - Main banner section with headline and CTA buttons
 *
 * Features:
 * - Two-column layout: text content on left, image on right
 * - Slide-in animation from right to left when section comes into view
 * - Gradient background for visual appeal
 * - App store download buttons (Apple and Google Play)
 * - Responsive grid that stacks on mobile
 * - Intersection Observer for scroll-triggered animations
 */
export default function Hero() {
  // Ref for the content column to trigger animation
  const contentRef = useRef<HTMLDivElement>(null)
  // Ref for the image column to trigger animation
  const imageRef = useRef<HTMLDivElement>(null)

  // Effect hook to set up Intersection Observer for scroll animations
  useEffect(() => {
    // Create observer to detect when elements enter viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When element enters viewport, add slide-in animation class
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-in-right")
          }
        })
      },
      { threshold: 0.1 }, // Trigger when 10% of element is visible
    )

    // Observe both content and image refs
    if (contentRef.current) observer.observe(contentRef.current)
    if (imageRef.current) observer.observe(imageRef.current)

    // Cleanup: disconnect observer when component unmounts
    return () => observer.disconnect()
  }, [])

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Content Column - Headline, description, and CTA buttons */}
          <div ref={contentRef} className="opacity-0">
            {/* Badge - "Welcome to Markiit" with gradient background */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mb-6 border border-blue-200">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              <span className="text-sm font-semibold text-blue-700">Welcome to Markiit</span>
            </div>

            {/* Main Headline - Large gradient text */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight">
              Revolutionize Your Commerce Experience
            </h1>

            {/* Description - Supporting text explaining the platform */}
            <p className="text-lg text-gray-700 mb-8 leading-relaxed font-medium">
              Markiit combines selling, saving, and social features in one powerful platform. Join thousands of users
              transforming their financial and business lives.
            </p>

            {/* CTA Buttons - Download links for App Store and Play Store */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Apple App Store Button - Black background with white logo */}
              <a
                href="https://apps.apple.com/app/markiit"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all font-semibold"
              >
                <Image src="/apple-logo.png" alt="Apple" width={20} height={20} className="brightness-0 invert" />
                App Store
              </a>

              {/* Google Play Store Button - Blue background with white logo */}
              <a
                href="https://play.google.com/store/apps/details?id=com.markiit.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold"
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

          {/* Image Column - Hero image with gradient background effect */}
          <div ref={imageRef} className="opacity-0">
            <div className="relative">
              {/* Gradient blur background for depth effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-400 rounded-2xl blur-3xl opacity-30"></div>

              {/* Hero image - Woman using mobile app */}
              <img
                src="https://img.freepik.com/free-photo/smiling-african-businesswoman-using-smartphone-mobile-banking-financial-app_74855-2660.jpg"
                alt="Mobile App"
                className="relative w-full rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
