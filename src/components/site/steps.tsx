"use client";
import {
  Box,
  Globe,
  CreditCard,
  DollarSign,
  ArrowRight,
  Sparkles
} from "lucide-react"
import Link from "next/link"
import { handleContactClick } from "@/lib/utils"

const steps = [
  {
    label: "Add Your Products",
    description: "Upload your products with images, prices, and details in minutes.",
    icon: Box,
    bgColor: "bg-green-50"
  },
  {
    label: "Customize Your Store",
    description: "Personalize your storefront with themes and branding.",
    icon: Globe,
    bgColor: "bg-green-50"
  },
  {
    label: "Setup Payments",
    description: "Connect payment methods to start accepting orders.",
    icon: CreditCard,
    bgColor: "bg-green-50"
  },
  {
    label: "Launch & Grow",
    description: "Go live and start growing your online business.",
    icon: DollarSign,
    bgColor: "bg-green-50"
  }
]

export default function EcommercePlatform() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-green-50/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-4 px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium">
            <Sparkles className="w-4 h-4 mr-2" />
            No technical skills needed
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-5">
            <span className="relative">
              <span className="relative z-10">Launch Your Online Store</span>
              <span className="absolute bottom-2 left-0 w-full h-3 bg-green-200/60 -z-10"></span>
            </span>
            {' '}<br className="md:hidden"></br>in 4 Simple Steps
          </h2>
          <p className=" text-sm md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Create a <strong className="font-semibold text-green-700">professional ecommerce store</strong> in minutes.
            <br className="md:hidden"></br>
            Start selling your products online with zero hassle.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={index}
                className={`group ${step.bgColor} p-7 rounded-xl border border-gray-200 hover:border-green-300 shadow-sm hover:shadow-lg transition-all duration-300 text-center flex flex-col`}
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-lg mb-5 ${step.bgColor.replace('50', '100')} text-green-600 group-hover:scale-110 transition-transform mx-auto`}>
                  <Icon className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <div className="mb-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-800 font-semibold text-sm">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {step.label}
                </h3>
                <p className="text-gray-600 flex-grow">
                  {step.description}
                </p>
                <Link
                  href="/signup"
                  className="mt-4 text-sm font-medium text-green-600 hover:text-green-700 transition-colors inline-flex items-center justify-center"
                >
                  Get Started <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl shadow-lg text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition-all duration-300 hover:shadow-xl group"
          >
            Launch Your Online Store
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="mt-4 text-gray-500 text-sm flex items-center justify-center">
            Have questions?{' '}
            <button onClick={handleContactClick} className="text-green-600 hover:underline ml-1 flex items-center">
              Talk to our team <ArrowRight className="ml-1 w-4 h-4" />
            </button>
          </p>
        </div>
      </div>
    </section>
  )
}