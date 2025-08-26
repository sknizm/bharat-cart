'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle, ArrowRight } from 'lucide-react'

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  const faqs = [
    {
      question: "How long does it take to set up my online store?",
      answer: "Most businesses can set up their 2cd Site store in under 5 minutes. Our intuitive dashboard makes it easy to add products, set prices, and customize your store design. If you need assistance, our team is available to help you get started quickly."
    },
    {
      question: "Do I need technical skills to use 2cd Site?",
      answer: "No technical skills required! 2cd Site is designed for entrepreneurs and business owners of all technical levels. Our drag-and-drop interface and pre-built templates make it easy to create a professional online store without any coding knowledge."
    },
    {
      question: "Can I use my own domain name?",
      answer: "Absolutely! You can connect your existing domain (like shop.yourbrand.com) or we provide a free 2cd.site subdomain. Setting up a custom domain takes just a few clicks in your dashboard."
    },
    {
      question: "What payment methods do you support?",
      answer: "2cd Site integrates with all major payment gateways including UPI, Card, Razorpay, and more. You can accept credit cards, digital wallets, and other popular payment methods from customers worldwide."
    },
    {
      question: "How do I manage orders and inventory?",
      answer: "Our dashboard provides comprehensive order management tools. You can track orders, update orders levels, process orders, and generate sales reports—all from one simple interface that works on both desktop and mobile."
    },
    {
      question: "Is there customer support available?",
      answer: "Yes! We offer 24/7 customer support via email and live chat. Our dedicated support team is always ready to help you with any questions or issues you might encounter while running your online store."
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white to-green-50/70">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-4 px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium">
            <HelpCircle className="w-4 h-4 mr-2" />
            Support Center
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-5">
            Frequently <span className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">Asked Questions</span>
          </h2>
          <p className="md:text-xl text-sm text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need to know about starting and growing your online store
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-green-200 hover:shadow-sm"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-6 text-left bg-white hover:bg-green-50 transition-colors"
              >
                <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                {activeIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-green-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              {activeIndex === index && (
                <div className="p-6 bg-green-50 text-gray-700 border-t border-green-100">
                  <p className="leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Support CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-green-100 rounded-full px-6 py-3">
            <HelpCircle className="h-5 w-5 text-green-700" />
            <span className="text-green-700 font-medium">Still have questions?</span>
            <button className="text-green-700 font-semibold hover:underline inline-flex items-center">
              Contact our team <ArrowRight className="ml-1 w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}