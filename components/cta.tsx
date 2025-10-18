"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

/**
 * CTA Component - Final call-to-action section to download the app
 *
 * Features:
 * - Large headline with compelling message
 * - Supporting description text
 * - Two download buttons (Apple App Store and Google Play Store)
 * - Slide-in animation when section enters viewport
 * - Blue gradient background for visual impact
 * - Responsive button layout that stacks on mobile
 */
export default function CTA() {
  // Ref for content to trigger animation
  const contentRef = useRef<HTMLDivElement>(null)

  // Effect hook to set up Intersection Observer for scroll animations
  useEffect(() => {
    // Create observer to detect when element enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When element enters viewport, add slide-in animation
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-in-right")
          }
        })
      },
      { threshold: 0.1 }, // Trigger when 10% of element is visible
    )

    // Observe content ref
    if (contentRef.current) observer.observe(contentRef.current)

    // Cleanup: disconnect observer when component unmounts
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-700">
      <div className="max-w-4xl mx-auto text-center">
        <div ref={contentRef} className="opacity-0">
          {/* Main CTA Headline */}
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Commerce Experience?
          </h2>

          {/* CTA Description */}
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Join thousands of users who are already benefiting from Markiit's powerful platform.
          </p>

          {/* Download Buttons - Flex container with responsive stacking */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Apple App Store Button - Black background with white logo */}
            <a
              href="https://apps.apple.com/app/markiit"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold"
            >
              <Image src="/apple-logo.png" alt="Apple" width={20} height={20} className="brightness-0 invert" />
              App Store
            </a>

            {/* Google Play Store Button - Blue background with white logo and border */}
            <a
              href="https://play.google.com/store/apps/details?id=com.markiit.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold border-2 border-white"
            >
              <Image src="/android-logo.png" alt="Play Store" width={20} height={20} className="brightness-0 invert" />
              Play Store
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
