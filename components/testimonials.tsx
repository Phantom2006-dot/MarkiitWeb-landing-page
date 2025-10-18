"use client"

import { useEffect, useRef } from "react"
import { Star } from "lucide-react"

/**
 * Testimonials data array - Contains user success stories
 */
const testimonials = [
  {
    text: "Markiit transformed my small business. I went from selling locally to reaching customers nationwide in just weeks.",
    author: "Amina Bello",
    role: "Fashion Entrepreneur",
    initials: "AB",
  },
  {
    text: "The group savings feature helped my family save for our first home. We couldn't have done it without Markiit.",
    author: "Chukwudi Okoro",
    role: "Markiit User",
    initials: "CO",
  },
  {
    text: "As a content creator, Markiit Stage gave me the tools to monetize my audience directly. Game changer!",
    author: "Zainab Yusuf",
    role: "Digital Creator",
    initials: "ZY",
  },
]

/**
 * Testimonials Component - Displays user success stories in a 3-column grid
 *
 * Features:
 * - 3 testimonial cards with user quotes
 * - 5-star rating display for each testimonial
 * - User avatar with initials and name/role
 * - Staggered slide-in animations as cards enter viewport
 * - Hover effects with shadow transitions
 * - Responsive grid that stacks on mobile
 */
export default function Testimonials() {
  // Ref for section header to trigger animation
  const sectionRef = useRef<HTMLDivElement>(null)
  // Array of refs for individual testimonial cards
  const testimonialRefs = useRef<(HTMLDivElement | null)[]>([])

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

    // Observe all testimonial cards
    testimonialRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    // Cleanup: disconnect observer when component unmounts
    return () => observer.disconnect()
  }, [])

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header - Title and description */}
        <div ref={sectionRef} className="text-center mb-16 opacity-0">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our community
          </p>
        </div>

        {/* Testimonials Grid - 3 columns on desktop, responsive on smaller screens */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={(el) => {
                testimonialRefs.current[index] = el
              }}
              className="opacity-0 p-8 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              {/* 5-Star Rating Display */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Testimonial Quote */}
              <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.text}"</p>

              {/* Author Information - Avatar with initials and name/role */}
              <div className="flex items-center gap-3">
                {/* Avatar with user initials */}
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.initials}
                </div>

                {/* Author name and role */}
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
