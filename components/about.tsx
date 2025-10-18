"use client"

import { useEffect, useRef } from "react"

/**
 * About Component - Company mission and background section
 *
 * Features:
 * - Two-column layout: image on left, content on right
 * - Slide-in animations for both columns when section enters viewport
 * - Gradient background effect behind image
 * - "Learn More" CTA button
 * - Responsive grid that stacks on mobile
 */
export default function About() {
  // Ref for content column to trigger animation
  const contentRef = useRef<HTMLDivElement>(null)
  // Ref for image column to trigger animation
  const imageRef = useRef<HTMLDivElement>(null)

  // Effect hook to set up Intersection Observer for scroll animations
  useEffect(() => {
    // Create observer to detect when elements enter viewport
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

    // Observe both content and image refs
    if (contentRef.current) observer.observe(contentRef.current)
    if (imageRef.current) observer.observe(imageRef.current)

    // Cleanup: disconnect observer when component unmounts
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image Column - About image with gradient background effect */}
          <div ref={imageRef} className="opacity-0 order-2 md:order-1">
            <div className="relative">
              {/* Gradient blur background for depth effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl blur-3xl opacity-20"></div>

              {/* About image - Family saving money concept */}
              <img
                src="https://img.freepik.com/free-photo/african-family-saving-money-piggy-bank-concept_23-2148765432.jpg"
                alt="About Markiit"
                className="relative w-full rounded-2xl shadow-2xl"
              />
            </div>
          </div>

          {/* Content Column - Company mission and description */}
          <div ref={contentRef} className="opacity-0 order-1 md:order-2">
            {/* Section Heading */}
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">About Markiit</h2>

            {/* First paragraph - Platform overview */}
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Markiit is more than just an app — it's a complete ecosystem that merges social networking, e-commerce,
              and financial empowerment into one seamless platform. Whether you're a small business owner, an
              entrepreneur, or an everyday user, Markiit gives you the tools to sell, save, and connect with others.
            </p>

            {/* Second paragraph - Company background and mission */}
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Founded with a vision to revolutionize how Africans connect, transact, and grow their businesses in the
              digital age, we've grown to serve thousands of users who rely on our platform to power their businesses,
              manage their finances, and connect with their communities.
            </p>

            {/* Learn More CTA Button */}
            <a
              href="#"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
