"use client"

import { useEffect, useRef } from "react"

/**
 * Stats data array - Contains key metrics and achievements
 */
const stats = [
  { number: "50K+", label: "Active Users" },
  { number: "10K+", label: "Businesses" },
  { number: "$5M+", label: "Transactions" },
  { number: "4.8★", label: "Average Rating" },
]

/**
 * Stats Component - Displays key platform metrics in a 4-column grid
 *
 * Features:
 * - Blue gradient background for visual impact
 * - 4 columns on desktop, 2 columns on mobile
 * - White text for contrast against blue background
 * - Staggered slide-in animations as stats enter viewport
 * - Large, bold numbers with supporting labels
 */
export default function Stats() {
  // Array of refs for individual stat items
  const statsRef = useRef<(HTMLDivElement | null)[]>([])

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
            }, index * 100) // 100ms delay between each stat
          }
        })
      },
      { threshold: 0.1 }, // Trigger when 10% of element is visible
    )

    // Observe all stat items
    statsRef.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    // Cleanup: disconnect observer when component unmounts
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-700">
      <div className="max-w-7xl mx-auto">
        {/* Stats Grid - 4 columns on desktop, 2 columns on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              ref={(el) => {
                statsRef.current[index] = el
              }}
              className="opacity-0 text-center text-white"
            >
              {/* Large stat number */}
              <div className="text-4xl sm:text-5xl font-bold mb-2">{stat.number}</div>

              {/* Stat label with lighter blue color */}
              <div className="text-blue-100 text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
