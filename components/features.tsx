"use client"

import { useEffect, useRef } from "react"
import { ShoppingCart, DollarSign, Calendar, Video } from "lucide-react"

/**
 * Features data array - Contains all feature cards information
 * Each feature has: icon, title, description, and gradient colors
 */
const features = [
  {
    icon: ShoppingCart,
    title: "Sell with Ease",
    description:
      "Launch your digital storefront in minutes, manage inventory, and accept payments seamlessly with our intuitive platform.",
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50",
  },
  {
    icon: DollarSign,
    title: "Smart Savings",
    description: "Create private or group savings goals with automated contributions and financial tracking tools.",
    gradient: "from-indigo-500 to-blue-500",
    bgGradient: "from-indigo-50 to-blue-50",
  },
  {
    icon: Calendar,
    title: "Event Booking",
    description: "Discover and book events, hotels, and services from verified providers with transparent pricing.",
    gradient: "from-purple-500 to-indigo-500",
    bgGradient: "from-purple-50 to-indigo-50",
  },
  {
    icon: Video,
    title: "Markiit Stage",
    description:
      "Build your audience with our integrated content platform featuring videos, posts, and live streaming.",
    gradient: "from-pink-500 to-purple-500",
    bgGradient: "from-pink-50 to-purple-50",
  },
]

/**
 * Features Component - Displays 4 main platform features in a grid
 *
 * Features:
 * - 4-column grid on desktop, 2 columns on tablet, 1 column on mobile
 * - Each feature card has icon, title, and description
 * - Staggered slide-in animations as cards enter viewport
 * - Hover effects with scale and shadow transitions
 * - Color-coded gradient backgrounds for visual distinction
 */
export default function Features() {
  // Ref for section header to trigger animation
  const sectionRef = useRef<HTMLDivElement>(null)
  // Array of refs for individual feature cards
  const featureRefs = useRef<(HTMLDivElement | null)[]>([])

  // Effect hook to set up Intersection Observer for scroll animations
  useEffect(() => {
    // Create observer to detect when elements enter viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          // When element enters viewport, add slide-in animation with staggered delay
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("animate-slide-in-right")
            }, index * 100) // 100ms delay between each card
          }
        })
      },
      { threshold: 0.1 }, // Trigger when 10% of element is visible
    )

    // Observe section header
    if (sectionRef.current) observer.observe(sectionRef.current)

    // Observe all feature cards
    featureRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    // Cleanup: disconnect observer when component unmounts
    return () => observer.disconnect()
  }, [])

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-blue-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header - Title and description */}
        <div ref={sectionRef} className="text-center mb-16 opacity-0">
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Powerful Features for Everyone
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
            Markiit offers a comprehensive suite of tools designed to empower your financial and business activities
          </p>
        </div>

        {/* Features Grid - 4 columns on desktop, responsive on smaller screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                ref={(el) => {
                  featureRefs.current[index] = el
                }}
                className={`opacity-0 p-8 bg-gradient-to-br ${feature.bgGradient} rounded-xl border border-gray-200 hover:border-transparent hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 group`}
              >
                {/* Icon Container - Gradient background with hover scale effect */}
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Feature Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>

                {/* Feature Description */}
                <p className="text-gray-700 leading-relaxed font-medium">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
