"use client"

import { useEffect, useRef, useState } from "react"
import { Search, Plus, Minus, Headphones } from "lucide-react"

/**
 * FAQ Item Interface - Structure for each FAQ question/answer
 */
interface FAQItem {
  question: string
  answer: string
  category: "general" | "users" | "businesses" | "events" | "security" | "other"
}

/**
 * FAQ data array - Contains all frequently asked questions organized by category
 */
const faqData: FAQItem[] = [
  // ... existing FAQ data ...
]

/**
 * Category configuration - Defines category names, IDs, and color styling
 */
const categoryConfig = [
  { id: "all", name: "All Questions", color: "bg-blue-100 text-blue-700 border border-blue-300" },
  { id: "general", name: "General", color: "bg-blue-100 text-blue-700 border border-blue-300" },
  { id: "users", name: "For Users", color: "bg-green-100 text-green-700 border border-green-300" },
  { id: "businesses", name: "For Businesses", color: "bg-orange-100 text-orange-700 border border-orange-300" },
  { id: "events", name: "Events & Hotels", color: "bg-amber-100 text-amber-700 border border-amber-300" },
  { id: "security", name: "Security & Payments", color: "bg-red-100 text-red-700 border border-red-300" },
  { id: "other", name: "Other", color: "bg-purple-100 text-purple-700 border border-purple-300" },
]

/**
 * FAQ Component - Searchable FAQ section with category filtering
 *
 * Features:
 * - Search functionality to filter questions by keyword
 * - Category filter buttons with color-coded badges
 * - Expandable/collapsible FAQ items with Plus/Minus icons
 * - Support CTA card with animated headphone icon
 * - Staggered slide-in animations as items enter viewport
 * - Responsive design that works on all screen sizes
 */
export default function FAQ() {
  // Ref for section header to trigger animation
  const sectionRef = useRef<HTMLDivElement>(null)
  // State for currently open FAQ item index
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  // State for search input value
  const [searchTerm, setSearchTerm] = useState("")
  // State for active category filter
  const [activeCategory, setActiveCategory] = useState("all")
  // Array of refs for FAQ items to trigger animations
  const faqRefs = useRef<(HTMLDivElement | null)[]>([])

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
            }, index * 50) // 50ms delay between each item
          }
        })
      },
      { threshold: 0.1 }, // Trigger when 10% of element is visible
    )

    // Observe section header
    if (sectionRef.current) observer.observe(sectionRef.current)

    // Observe all FAQ items
    faqRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    // Cleanup: disconnect observer when component unmounts
    return () => observer.disconnect()
  }, [])

  /**
   * Filter FAQ items based on search term and active category
   * Returns only items that match both search and category criteria
   */
  const filteredFaqs = faqData.filter((item) => {
    // Check if question or answer contains search term
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    // Check if item matches selected category
    const matchesCategory = activeCategory === "all" || item.category === activeCategory
    return matchesSearch && matchesCategory
  })

  /**
   * Get color styling for a specific category
   * @param categoryId - The category ID to get colors for
   * @returns Color class string for the category
   */
  const getCategoryColor = (categoryId: string) => {
    return categoryConfig.find((cat) => cat.id === categoryId)?.color || ""
  }

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Section Header - Title and description */}
        <div ref={sectionRef} className="text-center mb-12 opacity-0">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600">
            Find answers to common questions about Markiit, the all-in-one platform for selling, saving, and connecting.
          </p>
        </div>

        {/* Search Bar - Input field with search icon */}
        <div
          className="mb-8 opacity-0"
          ref={(el) => {
            if (el) faqRefs.current.push(el)
          }}
        >
          <div className="relative">
            {/* Search icon positioned inside input */}
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />

            {/* Search input field */}
            <input
              type="text"
              placeholder="Ask a question or search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Category Filter Buttons - Clickable tags to filter by category */}
        <div
          className="mb-8 flex flex-wrap gap-2 opacity-0"
          ref={(el) => {
            if (el) faqRefs.current.push(el)
          }}
        >
          {categoryConfig.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full transition-all text-sm font-medium ${
                // Active category shows color, inactive shows white with border
                activeCategory === category.id
                  ? category.color
                  : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* FAQ Items List - Expandable question/answer pairs */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((item, index) => (
              <div
                key={index}
                ref={(el) => {
                  faqRefs.current[index] = el
                }}
                className="opacity-0 bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-blue-300 transition-all hover:shadow-md"
              >
                {/* FAQ Item Header - Question and category badge with expand/collapse button */}
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  {/* Question text and category badge */}
                  <div className="flex items-center gap-3 flex-1 text-left">
                    <span className="font-semibold text-gray-900">{item.question}</span>
                    {/* Category badge with color coding */}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getCategoryColor(item.category)}`}
                    >
                      {categoryConfig.find((cat) => cat.id === item.category)?.name}
                    </span>
                  </div>

                  {/* Expand/Collapse Icon - Changes based on open state */}
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-blue-600 flex-shrink-0 ml-4" />
                  ) : (
                    <Plus className="w-5 h-5 text-blue-600 flex-shrink-0 ml-4" />
                  )}
                </button>

                {/* FAQ Item Answer - Shown when item is expanded */}
                {openIndex === index && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">{item.answer}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            // No results message with clear filters button
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No questions found.</p>
              <button
                onClick={() => {
                  setSearchTerm("")
                  setActiveCategory("all")
                }}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Support CTA Card - Encourages users to contact support */}
        <div
          className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 text-center opacity-0"
          ref={(el) => {
            if (el) faqRefs.current.push(el)
          }}
        >
          {/* Animated headphone icon */}
          <Headphones className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-jiggle" />

          {/* Support CTA heading */}
          <h3 className="text-xl font-bold text-gray-900 mb-2">Still have questions?</h3>

          {/* Support CTA description */}
          <p className="text-gray-600 mb-6">
            Can't find the answer you're looking for? Please reach out to our friendly team.
          </p>

          {/* Contact Support button */}
          <a
            href="#"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  )
}
