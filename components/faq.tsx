"use client"

import { useEffect, useRef, useState } from "react"
import { Search, Plus, Minus, Headphones } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
  category: "general" | "users" | "businesses" | "events" | "security" | "other"
}

const faqData: FAQItem[] = [
  {
    question: "What is Markiit?",
    answer:
      "Markiit is an all-in-one platform that combines social media, e-commerce, fintech, and savings. It allows users to shop, save money, run businesses, sell products, host events, book hotels, send money, and connect socially—all in one app.",
    category: "general",
  },
  {
    question: "Who can use Markiit?",
    answer:
      "Anyone can use Markiit—individuals, businesses, event organizers, hotels, and service providers. Whether you want to save money, run a store, connect with friends, or grow your brand, Markiit has something for you.",
    category: "general",
  },
  {
    question: "Is Markiit free to use?",
    answer:
      "Yes! Creating an account is free. Some premium features (like hotel subscriptions, business ads, or boosted pages) may come with small fees.",
    category: "general",
  },
  {
    question: "How do I create a Markiit account?",
    answer:
      "You can download the Markiit app from the Play Store (and later App Store). Sign up using your phone number or email and set up your profile.",
    category: "users",
  },
  {
    question: "Can I save money with Markiit?",
    answer:
      "Yes! Markiit has Private Savings (for personal goals) and Group Savings (where friends or groups save together).",
    category: "users",
  },
  {
    question: "How do I buy products on Markiit?",
    answer:
      "Browse through stores or professional profiles, add products to your cart, and checkout securely using Markiit Wallet or other supported payment methods.",
    category: "users",
  },
  {
    question: "Can I send money to friends?",
    answer: "Yes, you can send and receive money instantly using Markiit Wallet.",
    category: "users",
  },
  {
    question: "How will I receive my goods after buying on Markiit?",
    answer:
      "Markiit provides secure delivery through trusted logistics partners. Once you place an order, you can track your delivery inside the app until it arrives at your doorstep.",
    category: "users",
  },
  {
    question: "How can I sell on Markiit?",
    answer:
      "Simply register your business inside the app, set up your Markiit Store or Markiit Stage, upload your products/services, and start selling.",
    category: "businesses",
  },
  {
    question: "What is the difference between Markiit Store and Markiit Stage?",
    answer:
      "Markiit Store → For businesses selling products/services.\n\nMarkiit Stage → For creators, influencers, and brands to post, grow followers, and monetize (like a Facebook page or TikTok profile).",
    category: "businesses",
  },
  {
    question: "Does Markiit charge commissions on sales?",
    answer:
      "Yes, Markiit may charge small transaction fees to keep the platform running. Rates are kept low to support small businesses.",
    category: "businesses",
  },
  {
    question: "How do businesses deliver products to customers?",
    answer:
      "Businesses can choose to use Markiit's logistics system or partner with their own delivery providers. Markiit helps manage pickup, tracking, and secure delivery to customers.",
    category: "businesses",
  },
  {
    question: "Can I buy event tickets on Markiit?",
    answer: "Yes. You can buy tickets directly from event organizers on the platform.",
    category: "events",
  },
  {
    question: "How does hotel booking work?",
    answer:
      "Hotels on Markiit list their rooms. You can view availability, book rooms, and even request airport pickup or transport via Markiit Drive.",
    category: "events",
  },
  {
    question: "Is my money safe on Markiit?",
    answer:
      "Yes. Markiit uses bank-level security and escrow protection to ensure your savings and transactions are secure.",
    category: "security",
  },
  {
    question: "What payment methods does Markiit support?",
    answer:
      "You can fund your Markiit Wallet using debit/credit cards, bank transfers, or supported payment gateways (like Flutterwave).",
    category: "security",
  },
  {
    question: "What happens if my order is not delivered?",
    answer:
      "Markiit uses an Escrow system. Funds are only released to the seller when the order is confirmed as delivered.",
    category: "security",
  },
  {
    question: "Can I advertise on Markiit?",
    answer: "Yes. Businesses can run ads and promotions to reach more customers.",
    category: "other",
  },
  {
    question: "Does Markiit work offline?",
    answer:
      "You need internet access to use Markiit, but we're working on making some savings and wallet features available via USSD in the future.",
    category: "other",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can contact Markiit support directly through the Help Center in the app or via our website's Contact Us page.",
    category: "other",
  },
]

const categoryConfig = [
  { id: "all", name: "All Questions", color: "bg-blue-100 text-blue-700 border border-blue-300" },
  { id: "general", name: "General", color: "bg-blue-100 text-blue-700 border border-blue-300" },
  { id: "users", name: "For Users", color: "bg-green-100 text-green-700 border border-green-300" },
  { id: "businesses", name: "For Businesses", color: "bg-orange-100 text-orange-700 border border-orange-300" },
  { id: "events", name: "Events & Hotels", color: "bg-amber-100 text-amber-700 border border-amber-300" },
  { id: "security", name: "Security & Payments", color: "bg-red-100 text-red-700 border border-red-300" },
  { id: "other", name: "Other", color: "bg-purple-100 text-purple-700 border border-purple-300" },
]

export default function FAQ() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const faqRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("animate-slide-in-right")
            }, index * 50)
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    faqRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  const filteredFaqs = faqData.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === "all" || item.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryColor = (categoryId: string) => {
    return categoryConfig.find((cat) => cat.id === categoryId)?.color || ""
  }

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div ref={sectionRef} className="text-center mb-12 opacity-0">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600">
            Find answers to common questions about Markiit, the all-in-one platform for selling, saving, and connecting.
          </p>
        </div>

        {/* Search Bar */}
        <div
          className="mb-8 opacity-0"
          ref={(el) => {
            if (el) faqRefs.current.push(el)
          }}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Ask a question or search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Category Filters */}
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
                activeCategory === category.id
                  ? category.color
                  : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
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
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 text-left">
                    <span className="font-semibold text-gray-900">{item.question}</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getCategoryColor(item.category)}`}
                    >
                      {categoryConfig.find((cat) => cat.id === item.category)?.name}
                    </span>
                  </div>
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-blue-600 flex-shrink-0 ml-4" />
                  ) : (
                    <Plus className="w-5 h-5 text-blue-600 flex-shrink-0 ml-4" />
                  )}
                </button>

                {openIndex === index && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">{item.answer}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
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

        {/* Support CTA */}
        <div
          className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 text-center opacity-0"
          ref={(el) => {
            if (el) faqRefs.current.push(el)
          }}
        >
          <Headphones className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-jiggle" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Still have questions?</h3>
          <p className="text-gray-600 mb-6">
            Can't find the answer you're looking for? Please reach out to our friendly team.
          </p>
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
